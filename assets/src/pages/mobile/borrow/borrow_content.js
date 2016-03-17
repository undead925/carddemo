define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载mobile公共js
    var common = require('../common'),
        fancybox = require("fancybox/jquery.fancybox"),
        slide = require("superslide/2.1.1/superslide"),
        borrow_name = $("#borrow_name"),
        borrow_id = $("#borrow_id"),
        nav_calc = $("#nav_calc"),
        calc_url = $("#calc_url"), layer = require('layer.m/1.6/layer.m');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        nav_calc.attr("href", "javascript:;");
        $("#header h1").text(borrow_name.val());
        $("#header a").eq(0).attr("href", "/phone/borrow/index/" + borrow_id.val()).html('<i class="qtydfont">&#xe623;</i>返回');

        $(".bid-company-scroll").slide({mainCell: ".scrollWrap ul", effect: "leftLoop", vis: 5});
        $(".bid-detail-pic-scroll").slide({mainCell: ".scrollWrap ul", effect: "leftLoop", vis: 4});
        $(".fancybox li a").attr("rel", "fancybox-button").fancybox();
        $(".fancybox-pledge a").attr("rel", "fancybox-btn").fancybox();

        nav_calc.click(function () {
            var width = $(document).width(), height = $(document).height();
            layer.open({
                title: "收益计算器",
                content: '<iframe scrolling="no" width="100%" height="' + height * 0.5 + '" allowtransparency="true" class="layui-layer-load" frameborder="0" src="' + calc_url.val() + '"></iframe>',
                shadeClose: false,
                shade: true,
                type: 1,
                style: "width:100%"
            });
        });

        layer.closeAll();
    });
});