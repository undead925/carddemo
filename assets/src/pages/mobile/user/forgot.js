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
        repassword = $("#repassword"),
        forgot_submit = $("#forgot_submit"),
        valid_code = $("#valid_code"),
        btnSendSms = $("#btnSendSms"),
        div_voice_sms = $("#div_voice_sms"), btnSendVoiceSms = $("#btnSendVoiceSms"),
        phone_error = "", password_error = "", valid_code_error = "", repassword_error = "",
        t, hand, div_voice_sms_tips = $("#div_voice_sms_tips");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("找回密码");

        phone.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                phone_error = $(this).attr("nullmsg");
            } else if (!qtyd_regex.phone(value)) {
                phone_error = $(this).attr("errormsg");
            } else {
                phone_error = "";
            }
            if (phone_error == "") {
                $.ajax({
                    url: "/utils/check_mobile",
                    data: {
                        "type": "phone",
                        "param": value
                    },
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data.code == 10000) {
                            phone_error = "手机号码还未注册";
                        } else {
                            phone_error = "";
                        }
                    }
                });
            }
            if (phone_error != "") {
                show_error(phone_error, 1);
                return false;
            }
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
        repassword.blur(function () {
            var value = $(this).val();
            if (value != password.val()) {
                repassword_error = $(this).attr("errormsg");
            } else {
                repassword_error = "";
            }
            if (repassword_error != "") {
                show_error(repassword_error, 1);
                return false;
            }
        });
        valid_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                valid_code_error = "请输入短信验证码";
            } else if (!qtyd_regex.number(value)) {
                valid_code_error = "短信验证码格式错误";
            } else {
                valid_code_error = "";
            }
            if (valid_code_error == "") {
                $.ajax({
                    url: "/async/check_valicode",
                    data: {
                        "valicode": value,
                        "phone": phone.val(),
                        "sms_type": "forget_password"
                    },
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data.code != 10000) {
                            valid_code_error = "短信验证码错误";
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

        btnSendSms.click(function () {
            send_sms(0);
        });

        //发送语音验证码
        btnSendVoiceSms.click(function () {
            send_sms(1);
        });

        forgot_submit.click(function () {
            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            password.trigger("blur");
            if (password_error != "")
                return false;

            repassword.trigger("blur");
            if (repassword_error != "") {
                return false;
            }

            valid_code.trigger("blur");
            if (valid_code_error != "") {
                return false;
            }

            layer.open({
                type: 2,
                shadeClose: false,
                content: '数据提交中...'
            });
            $.ajax({
                url: "/phone/user/update_pwd",
                type: "POST",
                data: {
                    "phone": phone.val(),
                    "password": password.val(),
                    "repassword": password.val(),
                    "valicode": valid_code.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 10000) {
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">密码重置成功，请您重新登录</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else {
                        show_error(result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("抱歉，密码重置异常", 1);
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
        phone.trigger("blur");
        if (phone_error != "") {
            return false;
        }

        layer.closeAll();
        layer.open({
            content: "验证码发送中...",
            type: 2,
            shadeClose: false
        });

        $.ajax({
            url: "/async/send_sms",
            type: "POST",
            data: {
                "phone": phone.val(),
                "sms_type": "forget_password",
                "op_type": op_type
            },
            dataType: "JSON",
            cache: false,
            success: function (result) {
                layer.closeAll();
                if (result.code == 10000) {
                    t = result.data.time;
                    if (hand)
                        clearInterval(hand);

                    div_voice_sms.hide();
                    div_voice_sms_tips.hide().html('');

                    if (op_type == 1) {
                        div_voice_sms_tips.show().html('请注意接听来电，验证码将在来电中播报......');
                    }

                    hand = setInterval(function () {
                        btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                        t = t - 1;
                        if (t < 0) {
                            clearInterval(hand);
                            div_voice_sms_tips.hide().html('');
                            div_voice_sms.show();
                            btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        }
                    }, 1000);
                } else {
                    show_error(result.msg, 3);
                }
                return false;
            }, error: function () {
                show_error("网络异常，发送短信验证码失败，请重试", 1);
                return false;
            }
        });
    }
});