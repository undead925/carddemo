define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header h1").text("更多");
        $("#header a").eq(0).html('');
    });
});