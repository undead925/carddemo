define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    $(function () {
        $("#header h1").text("赚积分");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');
    });

    $(window).scroll(function() {
        var fixToolbar = $("#integral-footer-fixed");
        if (fixToolbar.length==1)
        {
	        var headerH = 20;
	        var scrollTop = $(document).scrollTop();
	        if( scrollTop >= headerH ){
	            fixToolbar.slideDown();
	        }else if( scrollTop < headerH ){
	            fixToolbar.slideUp();
	        }
        }
    });
});