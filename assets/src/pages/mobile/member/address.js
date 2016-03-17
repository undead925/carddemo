define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header").html('<a href="/phone/mine/safety" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
            '<h1 class="primary-title">联系地址</h1>' +
            '<a href="/phone/mine/address_edit" class="a-right-link"><i class="qtydfont">&#xe62d;</i></a>');
    });
});