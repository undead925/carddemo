define(function (require) {
    // 加载jQuery
    require('jquery');
    require('./common');

    $(function () {
        $("#header").find("h1").eq(0).html('App下载');
    });
});