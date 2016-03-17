define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery'), layer = require('layer.m/1.6/layer.m');
    require("regex");
    require('../common');

    var old_password = $("#old_password"),
        password = $("#password"),
        repassword = $("#repassword"),
        update_pwd_submit = $("#update_pwd_submit"),
        old_password_error = "", password_error = "", repassword_error = "";

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("登录密码");
        $("#header a").eq(0).attr("href", "/phone/mine/safety").html('<i class="qtydfont">&#xe623;</i>返回');

        old_password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                old_password_error = "请输入原密码";
            } else {
                old_password_error = "";
            }
            if (old_password_error != "") {
                show_error(old_password_error, 1);
                return false;
            }
        });

        password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                password_error = "请输入新登录密码";
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

        update_pwd_submit.click(function () {
            old_password.trigger("blur");
            if (old_password_error != "")
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
                    "old_password": old_password.val(),
                    "password": password.val(),
                    "repassword": repassword.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">登录密码修改成功，请您重新登录</p></div>',
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
                    show_error("登录密码修改失败", 1);
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