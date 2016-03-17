define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery'), layer = require('layer.m/1.6/layer.m');
    require("regex");
    require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var nick_name = $("#nick_name"),
        nick_name_error = "",
        nick_name_submit = $("#nick_name_submit");

    $(function () {
        $("#header h1").text("设置昵称");
        $("#header a").eq(0).attr("href", "/phone/mine/safety").html('<i class="qtydfont">&#xe623;</i>返回');

        nick_name.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                nick_name_error = "请输入昵称";
            } else {
                nick_name_error = "";
            }
            if (nick_name_error == "") {
                $.ajax({
                    url: "/phone/mine/check_user_nickname",
                    type: "POST",
                    data: {
                        "nick_name": value
                    },
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (result) {
                        if (result.code == 100000) {
                            nick_name_error = "";
                        } else {
                            nick_name_error = result.msg;
                        }
                    }
                });
                if (nick_name_error != "") {
                    show_error(nick_name_error, 3);
                    return false;
                }
            } else {
                show_error(nick_name_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            if (char_code == 13) {
                nick_name_submit.trigger("click");
            }
        });
        nick_name_submit.click(function () {
            nick_name.trigger("blur");
            if (nick_name_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "数据提交中..."
            });
            $.ajax({
                url: "/phone/mine/nick_name",
                type: "POST",
                data: {
                    "nick_name": nick_name.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">修改昵称成功</p>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/mine/safety";
                                return false;
                            }
                        });
                    } else if (result.code >= 110023 && result.code <= 110026) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else if (result.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    } else {
                        show_error(result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("修改昵称失败", 1);
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