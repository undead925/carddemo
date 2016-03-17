define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require("jquery.qrcode.min");
    require('../common');

    var invite_url = $("#invite_url"),
        qr_code = $("#qr_code");

    $(function () {
        $("#header h1").text("邀请好友");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');

        var render_type = "";
        if ('undefined' == typeof(document.body.style.maxHeight)) {
            render_type = "table";
        } else {
            render_type = "canvas";
        }
        qr_code.qrcode({
            render: render_type,
            width: 125,
            height: 125,
            correctLevel: 0,
            text: invite_url.val(),
            src: "/favicon.ico"
        });
    });
});