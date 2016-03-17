define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    require('../common');

    var header = $("#header"), borrow_id = parseInt($("#borrow_id").val()), tender_id = parseInt($("#tender_id").val());

    $(function () {
        header.html('<a href="javascript:history.back();" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a><h1 class="primary-title">投资详情</h1><a class="a-right-link" href="/phone/account/invest_pdf_download/' + tender_id + '/' + borrow_id + '">协议书</a>');
    });
});