define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载mobile公共js
    require('../common');

    require("regex");

    // 分页滑动
    var swiper = require('jquery.swiper.min');
    $(function () {
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });
    });

    // 全局对话框
    var layer = require('layer.m/1.6/layer.m'),
        hand, valid_code_error = "",
        phone = $("#phone"),
        phone_error = "",
        sms_type = "",
        btnSendSms = $("#btnSendSms"),
        btnSendVoiceSms = $("#voice_sms"),
        sms = $("#sms"),
        valid_code = $("#valid_code"),
        btn_li = $("#btn_li"), t, login_pwd = $("#login_pwd"), password_error = "";

    $(function () {
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
                async: false,
                success: function (data) {
                    if (data.code != 10000) {
                        sms_type = "5002";
                    } else {
                        sms_type = "5001";
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
        //首页领取按钮
        $("#index_btn_submit").click(function () {
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "系统处理中..."
            });
            var is_error = false;
            $.ajax({
                url: "/phone/zt/get_time",
                type: "POST",
                dataType: "JSON",
                cache: false,
                async: false,
                success: function (result) {
                    if (result.code != 10000) {
                        is_error = true;
                        layer.closeAll();
                        layer.open({
                            content: result.msg,
                            shadeClose: false,
                            btn: ['去祺天优贷'],
                            style: 'min-width:300px;',
                            yes: function () {
                                window.location.href = "/";
                                return false;
                            }
                        });
                    }
                    return false;
                }
            });
            if (!is_error) {
                phone.trigger("blur");
                if (phone_error != "") {
                    return false;
                }
                window.location.href = "/phone/zt/send_sms?trackid=" + $("#trackid").val() + "&invite_code=" + $("#invite_code").val() + "&phone=" + phone.val() + "&sms_type=" + sms_type;
                return false;
            }
        });

        sms.click(function () {
            send_sms(0);
        });
        btnSendVoiceSms.click(function () {
            send_sms(1);
        });
        //验证码验证
        valid_code.blur(function () {
            var value = $(this).val();
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
                        "phone": $("#phone_num").val(),
                        "sms_type": $("#sms_type").val()
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
        });
        //输入短信验证码领取红包按钮
        $("#btn_submit").click(function () {
            valid_code.trigger("blur");
            if (valid_code_error == "") {
                layer.closeAll();
                layer.open({
                    type: 2,
                    shadeClose: false,
                    content: "系统处理中..."
                });
                $.ajax({
                    url: "/phone/zt/get_reward",
                    data: {
                        "phone": $("#phone_num").val(),
                        "sms_type": $("#sms_type").val(),
                        "valicode": valid_code.val(),
                        "trackid": $("#trackid").val(),
                        "invite_code": $("#invite_code").val()
                    },
                    type: "POST",
                    dataType: "text",
                    cache: false,
                    async: false,
                    success: function (json) {
                        var result = $.parseJSON(json);
                        if (result.code == 10000) {
                            window.location.href = result.url;
                        } else if (result.code == 53006) {
                            show_error(result.msg, 2);
                            window.location.href = "/activity/qifu1018.html";
                        } else {
                            show_error(result.msg, 2);
                        }
                        return false;
                    }, error: function () {
                        show_error("领取红包失败，请重试", 2);
                        return false;
                    }
                });
            } else {
                return false;
            }
        });
        login_pwd.blur(function () {
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

        $("#set_pwd").click(function () {
            login_pwd.trigger("blur");
            if (password_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "系统处理中..."
            });
            $.ajax({
                url: "/phone/zt/change_psw",
                data: {
                    "password": login_pwd.val()
                },
                type: "POST",
                dataType: "JSON",
                cache: false,
                async: false,
                success: function (result) {
                    if (result.code == 10000) {
                        window.location.href = "/phone/mine/sina_open?url=/phone/account/reward_tickets";
                    } else {
                        show_error(result.msg, 2);
                    }
                    return false;
                }, error: function () {
                    show_error("密码设置失败，请重试", 2);
                    return false;
                }
            });
        });


        $("#btn-share").click(function () {
            var dialogShare = layer.open({
                type: 1,
                content: '<div class="dialog-share"><i class="closediy"></i><i class="icon-guide"></i>成功邀请好友领取，<br>再得一个8.88元红包奖励。<br>赶紧分享吧！</div>',
                style: 'background-color: transparent; box-shadow: none;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('closediy')[0].onclick = function () {
                        layer.close(dialogShare)
                    }
                }
            });
        });

        $("#btn-share-succeed").click(function () {
            var dialogShareSucceed = layer.open({
                type: 1,
                content: '<div class="dialog-succeed"><i class="closediy"></i><p>好友通过您分享的活动页面进行注册，</p><p>好友获得<span>60</span>元新手大礼包，</p><p>您获得<span>5</span>元红包奖励；</p><p>好友投资≥1000元，</p><p>您再获得<span>50</span>元红包奖励。</p><a href="" class="btn-use">立即使用</a></div>',
                style: 'background-color: transparent; box-shadow: none;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('closediy')[0].onclick = function () {
                        layer.close(dialogShareSucceed)
                    }
                }
            });
        });

        sms.trigger("click");
    });
    //发送验证码页面提交
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

        if (op_type == 1) {
            btnSendVoiceSms.off("click");
        }

        $.ajax({
            type: 'POST',
            cache: false,
            url: '/async/send_sms',
            dataType: 'JSON',
            data: {
                "phone": $("#phone_num").val(),
                "sms_type": $("#sms_type").val(),
                "op_type": op_type,
                "trackid": $("#trackid").val(),
                "ip": $("#ip").val()
            },
            success: function (res) {
                layer.closeAll();
                if (res.code == 10000) {
                    $(".btn-wrap").hide();
                    btn_li.show();
                    t = res.data.time;
                    if (hand)
                        clearInterval(hand);

                    //显示倒计时
                    hand = setInterval(function () {
                        btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                        t -= 1;
                        if (t < 0) {
                            clearInterval(hand);
                            $(".btn-wrap").show();
                            btn_li.hide();
                            btnSendVoiceSms.on("click", function () {
                                send_sms(1);
                            });
                        }
                    }, 1000);

                    valid_code_error = "";
                } else {
                    valid_code_error = res.msg;
                    show_error(valid_code_error, 1);
                    btnSendVoiceSms.on("click", function () {
                        send_sms(1);
                    });
                }
            },
            error: function () {
                valid_code_error = "网络异常，发送短信验证码失败，请重试";
                show_error(valid_code_error, 1);
                btnSendVoiceSms.on("click", function () {
                    send_sms(1);
                });
            }
        });
    }

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
});