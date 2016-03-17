define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    var layer = require('layer.m/1.6/layer.m');
    // 加载微信分享
    var wx = require('weixinshare');

    $(function(){
    	$(".btn-vote").click(vote);
    	$(".btn-pic").click(show_img);

    	$(".rule").click(function(){
	    	var d = layer.open({
	            type: 1,
	            content: '<div class="active-notes"><i class="closediy"></i><h2>活动说明</h2><dl><dt class="mb10">投票时间：2016年3月1日0点 - 3月13日12点止</dt></dl><dl><dt>投票规则：</dt><dd>1.祺天优贷老用户直接进入微信投票系统进行投票。</dd><dd>2.新用户须关注微信公众号再进行投票。</dd><dd>3.每个账号限投一次。</dd></dl><dl><dt>活动奖励：</dt><dd>第1名：双人豪华游大礼包</dd><dd>第2-3名：520红包券（和心爱的TA分享）</dd><dd>第4-10名：131.4红包券（和心爱的TA分享）</dd></dl></div>',
	            style: 'box-shadow: none; width: 90%; padding: 20px; background-color: transparent; ',
	            success: function (olayer) {
	                var cla = 'getElementsByClassName';
	                olayer[cla]('closediy')[0].onclick = function(){
	                    layer.close(d)
	                }
	            }
	        });
	    });
	    
	    $(window).scroll(function (){
			//距离顶部多少高度显示按钮
            var marginBot = 0;
            if (document.compatMode === "CSS1Compat") {
                marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
            }else{
                marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
            }
            if (marginBot <= 200) {
            	if(parseInt($("#offset").val()) + 8 > 64){
            		return false;
            	}
            	$.ajax({
					url : "/phone/zt/get_lover_vote_inf",
					type : "POST",
					data : { 
						offset : $("#offset").val()
					},
					dataType : "JSON",
					cache : false,
					async : false,
					success : function(result){
						if(result.code == 10000){
							$("#offset").val(result.offset);
							for(var i in result.lovers){
								var lover = result.lovers[i];
								var html = "";
								html += "<li>";
								html += "<div class='vote-item'>";
								html += "<i class='number'>";
								if(lover.id < 10){
									html += "0"+ lover.id + "号</i>";
								}else{
									html += lover.id + "号</i>";
								}
								html += "<img src='"+ lover.img_src +"'' class='btn-pic'>";
								html += "<p class='manifesto'>";
								html += "<span>爱情宣言：</span>";
								html += lover.description;
								html += "</p>";
								var status = "";
								if($("#weixin_attention").val() == "true"){
									if($("#vote_status").val() == "false"){
										status = "disabled";
									}
								}
								html += "<a href='javascript:;' class='btn-vote "+status+"' attention='"+$("#weixin_attention").val()+"' cpno='"+lover.id+"'>投票（"+lover.votes+"）</a>"
								html += "</div>";
								html += "</li>";
								$("#lover_list").append(html);
							}
							$(".btn-vote").each(function(){
								$(this).unbind("click");
								$(this).bind("click", vote);
							})
							$(".btn-pic").each(function(){
								$(this).unbind("click");
								$(this).bind("click", show_img);
							})
						}
					},
					error : function(){
						show_msg("系统繁忙，请稍后再试", 1500);
					}
				})
	        }
	    })

		function vote(){
    		if($(this).attr("attention") == "true"){
    			//投票
    			if(!$(this).hasClass("disabled")){
    				var _self = $(this);
    				layer.open({
                        content: "处理中",
                        type: 2,
                        shadeClose: false
                    });
    				$.ajax({
    					url : "/phone/zt/love_voteDo",
    					type : "POST",
    					data : { 
    						"cpno" : _self.attr("cpno")
    					},
    					dataType : "JSON",
    					cache : false,
    					async : true,
    					success : function(result){
    						layer.closeAll();
    						if(result.code == 10000){
    							_self.html("投票（"+result.sum+"）");
    							$(".btn-vote").each(function(){
    								$(this).addClass("disabled");
    							})
    							$("#vote_status").val("false");
    							show_msg("投票成功", 1500);
    						}else{
    							show_msg(result.msg, 1500);
    						}
    					},
    					error : function(){
    						show_msg("系统繁忙，请稍后再试", 1500);
    					}
    				})
    			}
    		}else{
		    	var d = layer.open({
		            type: 1,
		            content: '<div class="active-notes"><i class="closediy"></i><h2>三步，去投票</h2><div class="active-notes-info"><div class="qrcode"><img src="/assets/dist/topic/love_vote/images/qrcode.png"></div><ul><li>1.长按二维码，关注QTYD；</li><li>2.点击“我的账号”；</li><li>3.点击“情人节投票”。</li></ul></div></div>',
		            style: 'box-shadow: none; width: 90%; padding: 20px; background-color: transparent; ',
		            success: function (olayer) {
		                var cla = 'getElementsByClassName';
		                olayer[cla]('closediy')[0].onclick = function(){
		                    layer.close(d)
		                }
		            }
		        });
		    }
	    }

	    function show_img(){
    		var url = $(this).attr("src");
	    	var d = layer.open({
	            type: 1,
	            content: '<div class="active-notes big-pic"><i class="closediy"></i><img src="'+url+'" alt=""></div>',
	            style: 'box-shadow: none; width: 90%; padding: 20px; background-color: transparent; ',
	            success: function (olayer) {
	                var cla = 'getElementsByClassName';
	                olayer[cla]('closediy')[0].onclick = function(){
	                    layer.close(d)
	                }
	            }
	        });
	    }

	    function show_msg(msg, timeout) {
	        layer.closeAll();
	        layer.open({
	            content: msg,
	            type: 1,
	            style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
	            shadeClose: false,
	            shade: false
	        });
			setTimeout(function(){
				layer.closeAll();
			}, timeout);
	    }
    });

});