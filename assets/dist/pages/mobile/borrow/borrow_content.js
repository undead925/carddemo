define(function(require){var e=require("jquery");var l=require("../common"),a=require("fancybox/jquery.fancybox"),o=require("superslide/2.1.1/superslide"),r=e("#borrow_name"),t=e("#borrow_id"),c=e("#nav_calc"),n=e("#calc_url"),i=require("layer.m/1.6/layer.m");i.closeAll();i.open({type:2,shadeClose:false,content:"加载中..."});e(function(){c.attr("href","javascript:;");e("#header h1").text(r.val());e("#header a").eq(0).attr("href","/phone/borrow/index/"+t.val()).html('<i class="qtydfont">&#xe623;</i>返回');e(".bid-company-scroll").slide({mainCell:".scrollWrap ul",effect:"leftLoop",vis:5});e(".bid-detail-pic-scroll").slide({mainCell:".scrollWrap ul",effect:"leftLoop",vis:4});e(".fancybox li a").attr("rel","fancybox-button").fancybox();e(".fancybox-pledge a").attr("rel","fancybox-btn").fancybox();c.click(function(){var l=e(document).width(),a=e(document).height();i.open({title:"收益计算器",content:'<iframe scrolling="no" width="100%" height="'+a*.5+'" allowtransparency="true" class="layui-layer-load" frameborder="0" src="'+n.val()+'"></iframe>',shadeClose:false,shade:true,type:1,style:"width:100%"})});i.closeAll()})});