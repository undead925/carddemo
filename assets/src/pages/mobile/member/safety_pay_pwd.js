define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m');
    require("regex");
    require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var valid_code = $("#valid_code"),
        password = $("#password"),
        repassword = $("#repassword"),
        pay_pwd_submit = $("#pay_pwd_submit"),
        btnSendSms = $("#btnSendSms"),
        phone = $("#phone"), div_voice_sms = $("#div_voice_sms"), btnSendVoiceSms = $("#btnSendVoiceSms"),
        valid_code_error = "", password_error = "", repassword_error = "",
        t, hand, div_voice_sms_tips = $("#div_voice_sms_tips");

    $(function () {
        $("#header h1").text("支付密码");
        $("#header a").eq(0).attr("href", "/phone/mine/safety").html('<i class="qtydfont">&#xe623;</i>返回');

        valid_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                valid_code_error = "必须输入手机验证码";
            } else {
                valid_code_error = "";
            }
            if (valid_code_error != "") {
                show_error(valid_code_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });

        password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                password_error = "请输入新支付密码";
            } else if (!(value.length >= 6 && value.length <= 24)) {
                password_error = "6-24位字符，区分大小写";
            }
            else {
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
                repassword_error = "两次密码输入不一致";
                show_error(repassword_error, 1);
                return false;
            } else {
                repassword_error = "";
            }
        });

        btnSendSms.click(function () {
            send_sms(0);
        });
        btnSendVoiceSms.click(function () {
            send_sms(1);
        });

        pay_pwd_submit.click(function () {
            valid_code.trigger("blur");
            if (valid_code_error != "")
                return false;
            password.trigger("blur");
            if (password_error != "")
                return false;
            repassword.trigger("blur");
            if (repassword_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                "content": "更新中...",
                type: 2,
                shadeClose: false
            });
            $.ajax({
                url: "",
                type: "POST",
                data: {
                    "valicode": valid_code.val(),
                    "password": password.val(),
                    "repassword": repassword.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">支付密码修改成功</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/mine/safety";
                                return false;
                            }
                        });
                    } else {
                        show_error(result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("支付密码修改失败", 1);
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
            content: "验证码发送中...",
            type: 2,
            shadeClose: false
        });
        btnSendSms.attr("disabled", true).addClass("disabled");
        $.ajax({
            url: "/async/send_sms",
            type: "POST",
            data: {
                "phone": phone.val(),
                "sms_type": "forget_paypassword",
                "op_type": op_type
            },
            dataType: "JSON",
            cache: false,
            success: function (result) {
                if (result.code == 10000) {
                    t = result.data.time;
                    if (hand)
                        clearInterval(hand);

                    div_voice_sms.hide();
                    div_voice_sms_tips.hide().html('');

                    if (op_type == 1) {
                        div_voice_sms_tips.show().html('请注意接听来电，验证码将在来电中播报......');
                    }

                    layer.closeAll();
                    hand = setInterval(function () {
                        btnSendSms.text(t + "秒后重新发送");
                        t = t - 1;
                        if (t < 0) {
                            clearInterval(hand);
                            div_voice_sms_tips.hide().html('');
                            div_voice_sms.show();

                            btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        }
                    }, 1000);
                } else {
                    show_error("验证码发送失败，失败原因：" + result.msg, 3);
                    btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                    return false;
                }
            }, error: function () {
                show_error("网络异常，发送短信验证码失败，请重试", 1);
                btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                return false;
            }
        });
    }
});