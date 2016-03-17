define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    var layer = require('layer.m/1.6/layer.m');
    // 加载微信分享
    var wx = require('weixinshare');

	$(function(){
		$(".btn-open-gift").click(function(){
            $(this).addClass("shake");
            setTimeout(function(){
                $(".btn-open-gift").removeClass("shake");
            },1000); 
            if($(this).hasClass("start")){
                var dialogShare = layer.open({
                    type: 1,
                    content: '<div class="dialog-box dialog-tips"><i class="closediy"></i><i class="icon-decorate"></i><div class="dialog-tips-info"><img src="/assets/dist/topic/gift_money/images/tips_text.png"></div></div>',
                    style: 'width: 90%; background-color: transparent;',
                    success: function (olayer) {
                        var cla = 'getElementsByClassName';
                        olayer[cla]('closediy')[0].onclick = function(){
                            layer.close(dialogShare)
                        }
                    }
                });
            }else if($(this).hasClass("tomorrow")){
                show_error("今天的红包已派完，明天再来领吧！", 2000);
                setTimeout(function(){
                    layer.closeAll();
                },1500);
            }else if($(this).hasClass("over")){
                window.location.href = $("#base_url").val();
            }else{
                window.location.href = "/phone/zt/get_new_year_reward?code=" + $("#code").val() ;
            }
		});

		$(".btn-rules").click(function(){
            var dialogShare = layer.open({
                type: 1,
                content: '<div class="dialog-box dialog-rules"><i class="closediy"></i><i class="icon-decorate"></i><h2>活动规则</h2><ol><li>领取红包时间：除夕到初六每天0:00-23:00</li><li>红包券有效期：领取日当天</li><li>红包券仅限用于在祺天优贷投资(新手标除外）</li></ol><p>活动最终解释权归祺天优贷所有<br> 其他疑问，请咨询祺天优贷官方客服：<br>400-720-1188</p></div>',
                style: 'width: 90%; background-color: transparent;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('closediy')[0].onclick = function(){
                        layer.close(dialogShare)
                    }
                }
            });
        });
	});

    function show_error(msg, timeout) {
        layer.closeAll();
        layer.open({
            content: msg,
            type: 1,
            style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
            shadeClose: false,
            shade: false,
            time: timeout
        });
    }
});