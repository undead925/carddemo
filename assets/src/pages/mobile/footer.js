define(function (require) {
    var $ = require('jquery'),
        nav_calc = $("#nav_calc"),
        layer = require("layer.m/1.6/layer.m"),
        calc_apr = $("#calc_apr"),
        calc_day = $("#calc_day"),
        nav_sign_up = $("#nav_sign_up");

    $(function () {
        nav_calc.click(function () {
            var width = $(document).width(), height = $(document).height();
            layer.closeAll();
            layer.open({
                title: "收益计算器",
                content: '<iframe scrolling="no" width="100%" height="' + (height * 0.5 > 500 ? 500 : height * 0.5) + '" allowtransparency="true" class="layui-layer-load" frameborder="0" src="/phone/welcome/calc?apr=' + (calc_apr.val() == undefined ? '' : calc_apr.val()) + '&day=' + (calc_day.val() == undefined ? '' : calc_day.val()) + '"></iframe>',
                shadeClose: false,
                shade: true,
                type: 1,
                style: "width:100%"
            });
        });

        nav_sign_up.click(function () {
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: '数据处理中...'
            });
            $.ajax({
                url: "/phone/user/user_sign_up",
                type: "GET",
                dataType: "JSON",
                cache: false,
                data: {},
                success: function (result) {
                    layer.closeAll();
                    if (result.code == 10000) {
                        var temp = "成长值<span style='color:rgb(249,249,0);'>+" + result.sign_up_info.growth_value + "</span><br/>您连续签到 <span style='color:rgb(249,249,0);'>" + result.sign_up_info.insign_days + "</span> 天，明日签到可获得 <span style='color:rgb(249,249,0);'>" + result.sign_up_info.tomorrow_growth + "</span> 成长值";
                        show_error(temp, 2);
                        setTimeout(function () {
                            window.location.reload(true);
                            return false;
                        }, 2000);
                    } else {
                        show_error(result.msg, 1);
                    }
                }
            });

            function show_error(msg, timeout) {
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
    });
});