define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        common = require('../common'),
        account_type = $("#account_type"),
        layer = require('layer.m/1.6/layer.m');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });
    $(function () {
        var temp = "";
        if (account_type.val() == "recharge") {
            temp = "充值";
        } else if (account_type.val() == "") {
            temp = "交易记录";
        } else if (account_type.val() == "cash") {
            temp = "提现";
        } else if (account_type.val() == "tender") {
            temp = "投资";
        } else if (account_type.val() == "repayment_receive") {
            temp = "还款";
        } else {
            temp = "交易记录";
        }

        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');
        $("#header h1").attr("id", "j-trade-nav").html(temp + '<i id="j-trade-nav-i" class="qtydfont ml5">&#xe61f;</i>' +
            '<nav class="trade-nav">' +
            '<a href="/phone/account/trade_log" ' + (account_type.val() == "" ? "class='current'" : "") + '>全 部</a>' +
            '<a href="/phone/account/trade_log?account_type=recharge" ' + (account_type.val() == "recharge" ? "class='current'" : "") + '>充 值</a>' +
            '<a href="/phone/account/trade_log?account_type=cash" ' + (account_type.val() == "cash" ? "class='current'" : "") + '>提 现</a>' +
            '<a href="/phone/account/trade_log?account_type=tender" ' + (account_type.val() == "tender" ? "class='current'" : "") + '>投 资</a>' +
            '<a href="/phone/account/trade_log?account_type=repayment_receive" ' + (account_type.val() == "repayment_receive" ? "class='current'" : "") + '>还 款</a>' +
            '</nav>');

        var j_trade_nav = $("#j-trade-nav"),
            trade_nav = $(".trade-nav");

        j_trade_nav.click(function () {
            if (!trade_nav.is(":visible")) {//隐藏
                trade_nav.slideDown();
                $("#j-trade-nav").find("i").eq(0).html('&#xe62e;');
            }
            else {
                trade_nav.slideUp();
                j_trade_nav.find("i").eq(0).html('&#xe61f;');
            }
        });
        $(document).bind("click", function (e) {
            var tar = $(e.target);
            if (tar.attr("id") != "j-trade-nav" && tar.attr("id") != "j-trade-nav-i") {
                trade_nav.slideUp();
                j_trade_nav.find("i").eq(0).html('&#xe61f;');
            }
        });

        layer.closeAll();
    });
});