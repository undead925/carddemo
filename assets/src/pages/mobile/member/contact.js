define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header").html('<a href="/more.html" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
            '<h1 class="primary-title">联系我们</h1>');

        var map = new BMap.Map("map");
        var point = new BMap.Point(120.103029,30.316632);
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    });
});