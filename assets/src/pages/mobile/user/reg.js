define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载mobile公共js
    require('../common');

    require("regex");

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m'),
        phone = $("#phone"),
        password = $("#password"),
        reg_submit = $("#reg_submit"),
        valid_code = $("#valid_code"),
        btnSendSms = $("#btnSendSms"),
        invite_user = $("#invite_user"),
        ff = $("#ff"),
        track_id = $("#track_id"),
        from_url = $("#from_url"),
        ip = $("#ip"),
        invite_code = $("#invite_code"),
        btnSendVoiceSms = $("#btnSendVoiceSms"),//发送语音验证码
        img_valid_code = $("#img_valid_code"),//图形验证码
        div_voice_sms = $("#div_voice_sms"),//显示语音验证码
        t, hand, phone_error = "", password_error = "",
        valid_code_error = "", invite_user_error = "",
        div_voice_sms_tips = $("#div_voice_sms_tips");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("注册");

        phone.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                phone_error = $(this).attr("nullmsg");
            } else if (!qtyd_regex.phone(value)) {
                phone_error = $(this).attr("errormsg");
            } else {
                phone_error = "";
            }
            if (phone_error != "") {
                show_error(phone_error, 1);
                return false;
            }
            $.ajax({
                url: "/utils/check_mobile",
                data: {
                    "type": "phone",
                    "param": value
                },
                type: "POST",
                dataType: "JSON",
                cache: false,
                success: function (data) {
                    if (data.code != 10000) {
                        phone_error = "手机号码已经存在";
                    } else {
                        phone_error = "";
                        if (data.show_img_code) { //用户改变了手机号码
                            if (hand) {
                                window.clearInterval(hand);
                            }
                            img_valid_code.show();
                            btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                            btnSendSms.hide();
                            valid_code.val("");
                            valid_code_error = "";
                            div_voice_sms.hide();
                        }
                    }
                    if (phone_error != "") {
                        show_error(phone_error, 1);
                        return false;
                    }
                }
            });

        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });
        password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                password_error = $(this).attr("nullmsg");
            } else if (!(value.length >= 6 && value.length <= 24)) {
                password_error = $(this).attr("errormsg");
            } else {
                password_error = "";
            }
            if (password_error != "") {
                show_error(password_error, 1);
                return false;
            }
        });
        invite_user.blur(function () {
            var value = $(this).val();
            if ($.trim(value) != '') {
                $.ajax({
                    url: "/utils/check_mobile",
                    data: {
                        type: "phone",
                        param: value
                    },
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data.code == 10000) {
                            invite_user_error = "邀请人号码还未注册";
                            show_error(invite_user_error, 1);
                            return false;
                        } else {
                            invite_user_error = "";
                        }
                    }
                });
            }
        });
        valid_code.blur(function () {
            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            var value = $(this).val();
            if (img_valid_code.is(":visible")) {
                if ($.trim(value) == "") {
                    valid_code_error = "请输入图形验证码";
                } else {
                    valid_code_error = "";
                }
                if (valid_code_error == "") {
                    $.ajax({
                        url: "/utils/check_img_valid_code",
                        data: {
                            "valid_code": value
                        },
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        success: function (json) {
                            if (json.code != 10000) {
                                valid_code_error = "图形验证码错误";
                                show_error(valid_code_error, 1);
                                return false;
                            } else {
                                valid_code_error = "";

                                img_valid_code.hide();
                                btnSendSms.show();
                                valid_code.val("");

                                send_sms(0);
                                return false;
                            }
                        }, error: function () {
                            show_error("图形验证码错误", 1);
                            return false;
                        }
                    });
                }
                if (valid_code_error != "") {
                    show_error(valid_code_error, 1);
                    return false;
                }
            }
            else {
                if ($.trim(value) == "") {
                    valid_code_error = "请输入验证码";
                } else if (!qtyd_regex.number(value)) {
                    valid_code_error = "验证码格式错误";
                } else {
                    valid_code_error = "";
                }
                if (valid_code_error == "") {
                    $.ajax({
                        url: "/async/check_valicode",
                        data: {
                            "valicode": value,
                            "phone": phone.val(),
                            "sms_type": "registered"
                        },
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        async: false,
                        success: function (data) {
                            if (data.code != 10000) {
                                valid_code_error = "验证码错误";
                            } else {
                                valid_code_error = "";
                            }
                        }
                    });
                }
                if (valid_code_error != "") {
                    show_error(valid_code_error, 1);
                    return false;
                }
            }
        }).on("input", function () {
            var value = $(this).val();
            if ($.trim(value).length == 4) {
                if (img_valid_code.is(":visible")) {
                    $.ajax({
                        url: "/utils/check_img_valid_code",
                        data: {
                            "valid_code": value
                        },
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        async: true,
                        success: function (json) {
                            if (json.code != 10000) {
                                valid_code_error = "验证码错误";
                                show_error(valid_code_error, 1);
                                return false;
                            } else {
                                valid_code_error = "";
                                img_valid_code.hide();
                                btnSendSms.show();
                                valid_code.val("");
                                send_sms(0);
                                return false;
                            }
                        }, error: function () {
                            show_error("验证码错误", 1);
                            return false;
                        }
                    });
                }
            }
        });

        img_valid_code.click(function () {
            $(this).attr("src", "/admin/verify?_r=" + Math.random());
        });

        //发送验证码
        btnSendSms.click(function () {
            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            send_sms(0);
        });
        /**
         * 发送语音验证码
         */
        btnSendVoiceSms.on("click", function () {
            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            send_sms(1);
        });

        reg_submit.click(function () {
            if (valid_code_error != "") {
                show_error(valid_code_error, 1);
                return false;
            }

            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            password.trigger("blur");
            if (password_error != "") {
                return false;
            }
            valid_code.trigger("blur");
            if (valid_code_error != "") {
                return false;
            }
            invite_user.trigger("blur");
            if (invite_user_error != "") {
                show_error(invite_user_error, 1);
                return false;
            }

            layer.open({
                type: 2,
                shadeClose: false,
                content: '数据提交中...'
            });
            $.ajax({
                url: "/phone/user/reg",
                type: "POST",
                data: {
                    "phone": phone.val(),
                    "password": password.val(),
                    "invite_user": invite_user.val(),
                    "repassword": password.val(),
                    "valicode": valid_code.val(),
                    "ff": ff.val(),
                    "trackid": track_id.val(),
                    "fromurl": from_url.val(),
                    "invite_code": invite_code.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        if (parseInt(result.register_info.tenthousand_reward) > 0) {
                            layer.open({
                                content: '<div class="peculiar-user"><a href="/phone/account/sina_open"><img src="/assets/src/images/moblie/peculiar_user.png"><span>恭喜您获得万里挑一<br>第<em>' + (parseInt(result.register_info.reg_rank) / 10000) + '</em>万位注册用户红包</span></a></div>',
                                type: 1,
                                style: 'padding: 0; background-color:transparent; box-shadow: none; ',
                                shadeClose: false
                            });
                        } else {
                            layer.open({
                                content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">恭喜，注册成功</p></div>',
                                shadeClose: false,
                                style: 'min-width:300px;',
                                btn: ['好'],
                                yes: function () {
                                    window.location.href = "/phone/account/sina_open";
                                    return false;
                                }
                            });
                        }
                    } else {
                        show_error("抱歉，注册失败", 1);
                        if (hand)
                            clearInterval(hand);
                        btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        return false;
                    }
                }, error: function () {
                    show_error("抱歉，注册异常", 1);
                    if (hand)
                        clearInterval(hand);
                    btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                    return false;
                }
            });
        });
        layer.closeAll();
    });

    function show_error(msg, timeout) {
        layer.closeAll();
        layer.open({
            content: msg,
            type: 1,
            style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
            shadeClose: false,
            shade: false,
            time: timeout
        });
    }

    function send_sms(op_type) {
        layer.closeAll();
        layer.open({
            type: 2,
            shadeClose: false,
            content: "系统处理中..."
        });

        if (hand) {
            window.clearInterval(hand);
        }
        btnSendSms.attr("disabled", true).text("短信验证码");

        $.ajax({
            type: 'POST',
            cache: false,
            url: '/async/send_sms',
            dataType: 'JSON',
            data: {
                "phone": phone.val(),
                "sms_type": "registered",
                "op_type": op_type,
                "trackid": track_id.val(),
                "ip": ip.val()
            },
            success: function (res) {
                layer.closeAll();
                if (res.code == 10000) {
                    t = res.data.time;
                    if (hand)
                        clearInterval(hand);

                    div_voice_sms.hide();
                    div_voice_sms_tips.hide().html('');

                    if (op_type == 1) {
                        div_voice_sms_tips.show().html('请注意接听来电，验证码将在来电中播报......');
                    }

                    //显示倒计时
                    hand = setInterval(function () {
                        btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                        t -= 1;
                        if (t < 0) {
                            clearInterval(hand);
                            div_voice_sms_tips.hide().html('');
                            div_voice_sms.show();
                            btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        }
                    }, 1000);

                    valid_code_error = "";
                } else {
                    valid_code_error = res.msg;
                    show_error(valid_code_error, 1);
                    btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                }
                return false;
            },
            error: function () {
                valid_code_error = "网络异常，发送短信验证码失败，请重试";
                show_error(valid_code_error, 1);
                btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
            }
        });
    }

    $('#j-user-protocol').click(function () {
        var protocol = layer.open({
            type: 1,
            content: '<div class="protocol-head">祺天优贷注册协议</div><div class="protocol-cont" style="height:' + document.documentElement.clientHeight + 'px; box-sizing: border-box;"><div id="user-protocol" style="overflow: auto; height:100%; "></div></div><div class="protocol-foot"><button class="btn-primary closediy">同意</button></div>',
            style: 'width:100%; overflow:auto; height:' + document.documentElement.clientHeight + 'px;',
            success: function (olayer) {
                var cla = 'getElementsByClassName';
                olayer[cla]('closediy')[0].onclick = function () {
                    layer.close(protocol)
                }
            }
        });
        $("#user-protocol").load("/phone/user/reg_protocol.html");
    });
});