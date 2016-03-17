define(function (require) {
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

    var email = $("#email"),
        email_submit = $("#email_submit"),
        email_error = "",
        email_status = $("#email_status"),
        header = $("#header");

    $(function () {
        if (email_status.val() != "") {
            if (email_status.val() == "0") {
                header.find("h1").eq(0).text("激活邮箱");
            } else {
                header.find("h1").eq(0).text("修改邮箱");
            }
        } else {
            header.find("h1").eq(0).text("设置邮箱");
        }

        header.find("a").eq(0).attr("href", "/phone/mine/safety").html('<i class="qtydfont">&#xe623;</i>返回');

        email.blur(function () {
            if (!qtyd_regex.email($.trim($(this).val()))) {
                email_error = "邮箱地址格式错误";
                show_error(email_error, 1);
                return false;
            }
            else {
                email_error = "";
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            if (char_code == 13) {
                email_submit.trigger("click");
            }
        });
        email_submit.click(function () {
            email.trigger("blur");
            if (email_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "数据提交中..."
            });

            $.ajax({
                url: "/phone/mine/email",
                type: "POST",
                data: {
                    "email": email.val()
                },
                dataType: "JSON",
                cache: false,
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">验证邮件已经发送到您的邮箱，请您到邮箱进行验证</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/mine/safety";
                                return false;
                            }
                        });
                    } else {
                        show_error("邮件发送失败，失败原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("邮件发送失败", 1);
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