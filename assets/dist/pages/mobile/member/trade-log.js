define(function(require){var e=require("jquery"),a=require("../common"),t=e("#account_type"),n=require("layer.m/1.6/layer.m");n.closeAll();n.open({type:2,shadeClose:false,content:"加载中..."});e(function(){var a="";if(t.val()=="recharge"){a="充值"}else if(t.val()==""){a="交易记录"}else if(t.val()=="cash"){a="提现"}else if(t.val()=="tender"){a="投资"}else if(t.val()=="repayment_receive"){a="还款"}else{a="交易记录"}e("#header a").eq(0).attr("href","/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');e("#header h1").attr("id","j-trade-nav").html(a+'<i id="j-trade-nav-i" class="qtydfont ml5">&#xe61f;</i>'+'<nav class="trade-nav">'+'<a href="/phone/account/trade_log" '+(t.val()==""?"class='current'":"")+">全 部</a>"+'<a href="/phone/account/trade_log?account_type=recharge" '+(t.val()=="recharge"?"class='current'":"")+">充 值</a>"+'<a href="/phone/account/trade_log?account_type=cash" '+(t.val()=="cash"?"class='current'":"")+">提 现</a>"+'<a href="/phone/account/trade_log?account_type=tender" '+(t.val()=="tender"?"class='current'":"")+">投 资</a>"+'<a href="/phone/account/trade_log?account_type=repayment_receive" '+(t.val()=="repayment_receive"?"class='current'":"")+">还 款</a>"+"</nav>");var r=e("#j-trade-nav"),c=e(".trade-nav");r.click(function(){if(!c.is(":visible")){c.slideDown();e("#j-trade-nav").find("i").eq(0).html("&#xe62e;")}else{c.slideUp();r.find("i").eq(0).html("&#xe61f;")}});e(document).bind("click",function(a){var t=e(a.target);if(t.attr("id")!="j-trade-nav"&&t.attr("id")!="j-trade-nav-i"){c.slideUp();r.find("i").eq(0).html("&#xe61f;")}});n.closeAll()})});