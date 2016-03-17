define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        common = require('../common'),
        asPieProgress = require('asPieProgress');

    require('touchslide/1.1/touchslide');

    $(function () {
        TouchSlide({
            slideCell: "#focus",
            titCell: ".head ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell: ".body ul",
            effect: "leftLoop",
            autoPlay: true,//自动播放
            autoPage: true, //自动分页
            switchLoad: "_src" //切换加载，真实图片路径为"_src"
        });

        $(".project-progress").asPieProgress({
            namespace: 'pieProgress'
        }).asPieProgress("go", '60');
    });
});