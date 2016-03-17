define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header h1").text("我的年化券");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');
    });
});
