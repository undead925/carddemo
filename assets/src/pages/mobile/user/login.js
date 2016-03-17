define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载mobile公共js
    require('../common');

    require("regex");

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m'),
        user_name = $("#login_phone"),
        password = $("#login_password"),
        login_submit = $("#login_submit"),
        user_name_error = "", password_error = "",
        refer = $("#refer"),
        error_msg = $("#error_msg"), track_id = $("#track_id");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("登录");

        if (error_msg.val() != "") {
            show_error(error_msg.val(), 3);
        }
        user_name.focusout(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                user_name_error = "请输入手机号码";
            } else if (!qtyd_regex.phone(value)) {
                user_name_error = "手机号码格式不正确";
            } else {
                user_name_error = "";
            }
            if (user_name_error == "") {
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
                            user_name_error = "手机号码还未注册";
                        } else {
                            user_name_error = "";
                        }
                    }, error: function () {
                        user_name_error = "手机号码还未注册";
                    }
                });
            }
            if (user_name_error != "") {
                show_error(user_name_error, 1);
                return false;
            }
        }).focusin(function () {
            $(this).val("");
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });
        password.focusout(function () {
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
        }).focusin(function () {
            $(this).val("");
        });
        login_submit.click(function () {
            user_name.trigger("blur");
            if (user_name_error != "") {
                return;
            }
            password.trigger("blur");
            if (password_error != "")
                return;

            layer.open({
                type: 2,
                shadeClose: false,
                content: '登录中...'
            });
            $.ajax({
                url: "/phone/user/login",
                type: "POST",
                data: {
                    "user_name": user_name.val(),
                    "password": password.val(),
                    "refer": refer.val(),
                    "is_remember": $("#cb_remember").prop("checked") ? "1" : "0",
                    "track_id": track_id.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        if (result.refer != "") {
                            window.location.href = result.refer;
                        } else {
                            window.location.href = "/phone/account/";
                        }
                        return false;
                    } else {
                        show_error(result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("登录异常", 1);
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
});