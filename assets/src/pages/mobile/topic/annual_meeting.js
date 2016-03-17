define(function (require) {
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m');//加载弹层

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });
    // require('html5media.min');
    require('touchslide/1.1/touchslide');


    $(function () {
        /**
         * 图片滚动
         */
        TouchSlide({
            slideCell: "#interact",
            titCell: ".head ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell: ".body ul",
            effect: "leftLoop",
            autoPlay: true,//自动播放
            autoPage: true, //自动分页
            switchLoad: "_src" //切换加载，真实图片路径为"_src"
        });

        layer.closeAll();
    });
});