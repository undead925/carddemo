define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        common = require('../common'),
        layer = require('layer.m/1.6/layer.m');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("新浪存钱罐");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');

        $('#go_sina').click(function () {
            var w = window.open();
            $.ajax({
                url: '/phone/account/sina_info',
                type: "get",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.code == 100000) {
                        w.location = data.visit_url;
                        return false;
                    } else if (data.code >= 110023 && data.code <= 110026) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',
                            btn: ['好'],
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else if (data.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    }
                }
            });
        });

        layer.closeAll();
    });
});
