define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header").html('<a href="/more.html" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
            '<h1 class="primary-title">公司简介</h1>');
    });
});