define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载mobile公共js
    require('../common');
    require("regex");
    //var wx = require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m'),
        unbind_submit_weixin = $("#unbind_submit_weixin"),
        login_submit_weixin = $("#login_submit_weixin"),
        reg_submit_weixin = $("#reg_submit_weixin"),
        user_name = $("#user_name"),
        password = $("#password"),
        valid_code = $("#valid_code"),
        btnSendSms = $("#btnSendSms"),
        invite_user = $("#invite_user"),
        phone = $("#phone"),
        phone_error = "", password_error = "", valid_code_error = "", invite_user_error = "", user_name_error = "";

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header a").eq(0).text("");
        $(".icon-primary-nav").hide();

        if (user_name != undefined) {
            user_name.blur(function () {
                var value = $(this).val();
                var msg = "";
                if ($.trim(value) == "") {
                    msg = "请输入手机号码";
                } else if (!qtyd_regex.phone(value)) {
                    msg = "手机号码格式不正确";
                }
                if (msg == "") {
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
                                msg = "手机号码还未注册";
                            }
                        }
                    });
                }
                if (msg != "") {
                    user_name_error = msg;
                    show_error(msg);
                    return false;
                } else {
                    user_name_error = "";
                }
            });
        }

        if (password != undefined) {
            password.blur(function () {
                var value = $(this).val();
                var msg = "";
                if ($.trim(value) == "") {
                    msg = $(this).attr("nullmsg");
                } else if (!(value.length >= 6 && value.length <= 24)) {
                    msg = $(this).attr("errormsg");
                }
                if (msg != "") {
                    password_error = msg;
                    show_error(msg);
                    return false;
                } else {
                    password_error = "";
                }
            });
        }

        if (invite_user != undefined) {
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
                                show_error(invite_user_error);
                                return false;
                            } else {
                                invite_user_error = "";
                            }
                        }
                    });
                }
            });
        }


        if (valid_code != undefined) {
            valid_code.blur(function () {
                var value = $(this).val();
                var msg = "";
                if ($.trim(value) == "") {
                    msg = "请输入短信验证码";
                } else if (!qtyd_regex.number(value)) {
                    msg = "短信验证码格式错误";
                }
                if (msg == "") {
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
                                msg = "短信验证码错误";
                            } else {
                                msg = "";
                            }
                        }
                    });
                }
                if (msg != "") {
                    valid_code_error = msg;
                    show_error(msg);
                    return false;
                } else {
                    valid_code_error = "";
                }
            }).keydown(function (e) {
                var char_code = e.charCode ? e.charCode : e.keyCode;
                return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
            });
        }

        if (btnSendSms != undefined) {
            var t, hand;
            btnSendSms.click(function () {
                phone.trigger("blur");
                if (phone_error != "")
                    return false;
                $.ajax({
                    type: 'POST',
                    cache: false,
                    async: false,
                    url: '/async/send_sms',
                    dataType: 'json',
                    data: {
                        "phone": phone.val(),
                        "sms_type": "registered"
                    },
                    success: function (res) {
                        if (res.code == 10000) {
                            t = res.data.time;
                            if (hand)
                                clearInterval(hand);
                            hand = setInterval(function () {
                                btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                                t -= 1;
                                if (t < 0) {
                                    clearInterval(hand);
                                    btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                                }
                            }, 1000);

                        } else {
                            show_error("发送验证码失败");
                            return false;
                        }
                    },
                    error: function () {
                        show_error("网络异常，发送短信验证码失败，请重试");
                        return false;
                    }
                });
            });
        }

        if (unbind_submit_weixin != undefined) {
            unbind_submit_weixin.click(function () {
                layer.open({
                    type: 2,
                    shadeClose: false,
                    content: '正在提交申请...'
                });
                $.ajax({
                    url: "/phone/weixin/unbindDo",
                    type: "POST",
                    data: {
                        "weixinid": $("#weixinid").val(),
                    },
                    cache: false,
                    dataType: "json",
                    success: function (result) {
                        if (result.weixin_retCode == 60014) {
                            show_error('解除绑定成功');
                            WeixinJSBridge.call('closeWindow');
                            return false;
                        } else {
                            show_error('解除绑定失败');
                            WeixinJSBridge.call('closeWindow');
                            return false;
                        }
                    }, error: function () {
                        show_error("登录异常");
                    }
                });
            });
            
        }

        if (login_submit_weixin != undefined) {
            login_submit_weixin.click(function () {
                $("#user_name").trigger("blur");
                if (user_name_error != "") {
                    return;
                }
                $("#password").trigger("blur");
                if (password_error != "")
                    return;

                layer.open({
                    type: 2,
                    shadeClose: false,
                    content: '登录中...'
                });
                $("#login-form").submit();
            });
        }


        if (reg_submit_weixin != undefined) {
            reg_submit_weixin.click(function () {
                $("#phone").trigger("blur");
                if (phone_error != "") {
                    return false;
                }
                $("#password").trigger("blur");
                if (password_error != "")
                    return false;

                $("#valid_code").trigger("blur");
                if (valid_code_error != "") {
                    return false;
                }
                $("#invite_user").trigger("blur");
                if (invite_user_error != "") {
                    return false;
                }
                layer.open({
                    type: 2,
                    shadeClose: false,
                    content: '数据提交中...'
                });
                $("#reg-form").submit();
            });
        }
        layer.closeAll();
    });

    function show_error(msg) {
        layer.closeAll();
        layer.open({
            content: msg,
            type: 1,
            style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
            shadeClose: false,
            shade: false,
            time: 1
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