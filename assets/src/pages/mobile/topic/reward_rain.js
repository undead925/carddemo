define(function (require) {
    var $ = require('jquery'),
    //加载弹层
    layer = require('layer.m/1.6/layer.m');

    $(function(){
        var click_counter = 0;  //点击计数器
        var empty_counter = 0;  //未中奖计数器
        var red_envelope = 0;   //中奖计数器
        var type_A = 0;         //红包计数器
        var type_B = 0;         //红包券计数器
        var rain_status = true; //能否参与本场红包雨
        var game_no = $("#game_no").val();       //红包雨场次
        var rain_stop = true;   //本页面的红包雨是否已停止
        var device_port = $("#device_port").val(); //来源
        var count_down_status = false;
        var url = "";
        countDown($("#sys_time").val(), $("#between_time").val());

        function countDown(time, between_time) {
            var sys_second = time;
            var timer = setInterval(function () {
                if (sys_second > 0) {
                    sys_second -= 1;
                    if(sys_second <= 10){
                        if(typeof($(".btn-login").attr("href")) == "undefined"){
                            $(".game-countdown").show();
                            $(".game-countdown span").html(sys_second);
                            count_down_status = true;
                        }
                    }
                    var hour = Math.floor((sys_second / 3600) % 24);
                    var minute = Math.floor((sys_second / 60) % 60);
                    var second = Math.floor(sys_second % 60);
                    var html = "距"+game_no+"活动开始：";
                    html += "<span>"+(hour < 10 ? "0" + hour : hour)+"</span>时";
                    html += "<span>"+(minute < 10 ? "0" + minute : minute)+"</span>分";
                    html += "<span>"+(second < 10 ? "0" + second : second)+"</span>秒";
                    $(".count-down").html(html);
                }else{
                    if(count_down_status){
                       $(".game-countdown").hide(); 
                    }
                    if(rain_status){
                        $(".count-down").html(game_no+"红包雨活动进行中");
                        check_rain();
                    }
                    sys_second -= 1;
                    if(sys_second <= between_time){
                        if(game_no == "第三场"){
                            if(rain_stop){
                                if(device_port != "ios" && device_port != "android"){
                                    url = "/";
                                }else{
                                    url = "app:home";
                                }
                                layer.open({
                                    type: 1,
                                    content: '<div class="layer-result over"><h2 class="layer-result-title">活动已结束，<br>更多精彩正在继续！</h2><div class="layer-result-pic"><img src="/assets/src/topic/reward_rain/images/over_bg.png" class="w-100"></div><a href="'+url+'" class="btn-result">去看看</a></div>',
                                    style: 'width: 90%; background-color: transparent;',
                                    shadeClose: false
                                });
                                clearInterval(timer);
                            }
                        }else{
                            if(rain_stop){
                               window.location.reload();
                               return false;
                            }
                        }
                    }
                }
            }, 1000);
        }

        function check_rain(){
            if(typeof($(".btn-login").attr("href")) == "undefined"){
                $.ajax({
                    url:"/phone/zt/check_rain_status",
                    type:"GET",
                    cache:false,
                    data:{},
                    dataType:"JSON",
                    async:false,
                    success:function(json){
                        if(json.status == 0){
                            if(json.code == 11000){
                                $(".count-down").html("您本场获得 红包"+json.reward_sum+"个，红包券"+json.reward_coupon_sum+"个");
                            }else{
                                $(".count-down").html(game_no+"红包雨活动进行中");
                                // console.log(json.msg);
                            }
                        }else if(json.status == 1){
                            rain_stop = false;
                            if(count_down_status){
                                rain();
                            }else{
                                count_down_status = false;
                                var i = 3; 
                                $(".game-countdown").show();
                                $(".game-countdown span").html(i);
                                var counting = setInterval(function(){
                                    i--;
                                    $(".game-countdown span").html(i);
                                    if(i <= 0){
                                        $(".game-countdown").hide();
                                        clearInterval(counting);
                                        rain();
                                    }
                                }, 1000) 
                            }      
                        }
                        rain_status = false;
                    },
                    error:function(){

                    }
                });
            }
        }

        // 抓红包
        function rain(){
            $(".game").removeClass("hide");
            var start_time = new Date().getTime();
            var counter = 1;
            var pic_arr = new Array("reward_11.png", "reward_21.png", "reward_31.png", "reward_41.png", "reward_51.png");
            var boom_pic_arr = new Array("reward_12.png", "reward_22.png", "reward_32.png", "reward_42.png", "reward_52.png");
            var rain = setInterval(function() {
                var end_time = new Date().getTime();
                var temp_time = end_time - start_time;
                $(".countdown").html((30 - parseInt(temp_time/1000)) + "s");
                var pic_index = parseInt(Math.random() * 100 % 5);
                if ( temp_time >= 30000) {
                    if(red_envelope > 0){
                        if(device_port != "ios" && device_port != "android"){
                            url = "/phone/account/reward_tickets";
                        }else{
                            url = "app:userReward";
                        }
                        layer.open({
                            type: 1,
                            content: '<div class="layer-result"><h2 class="layer-result-title">恭喜您本场获得了</h2><div class="layer-result-pic"><img src="/assets/src/topic/reward_rain/images/hongbao_bg.png" class="hongbao"><ul><li>红包: '+type_A+'个</li><li>红包券: '+type_B+'张</li></ul></div><a href="'+url+'" class="btn-result">查看战果</a></div>',
                            style: 'width: 90%; background-color: transparent;',
                            shadeClose: false
                        });
                    }else{
                        if(game_no == "第一场"){
                            layer.open({
                                type: 1,
                                content: '<div class="layer-result"><h2 class="layer-result-title">手太慢，没有抓住有奖红包！</h2><div class="layer-result-tips">下场活动<span class="c-red">15:00</span>开始，记得来哦！</div><div class="layer-result-pic"><img src="/assets/src/topic/reward_rain/images/miss_bg.png" class="w-100"></div><a href="###" class="btn-result">回到会场</a></div>',
                                style: 'width: 90%; background-color: transparent;',
                                shadeClose: false
                            });
                            $(".btn-result").bind("click", function(){
                                window.location.reload();
                            })
                        }else if(game_no == "第二场"){
                            layer.open({
                                type: 1,
                                content: '<div class="layer-result"><h2 class="layer-result-title">真是可惜呀，换个姿势再抓！</h2><div class="layer-result-tips">下场活动<span class="c-red">20:00</span>开始，记得来哦！</div><div class="layer-result-pic"><img src="/assets/src/topic/reward_rain/images/miss_bg.png" class="w-100"></div><a href="###" class="btn-result">回到会场</a></div>',
                                style: 'width: 90%; background-color: transparent;',
                                shadeClose: false
                            });
                            $(".btn-result").bind("click", function(){
                                window.location.reload();
                            })
                        }else if(game_no == "第三场"){
                            if(device_port != "ios" && device_port != "android"){
                                url = "/";
                            }else{
                                url = "app:home";
                            }
                            layer.open({
                                type: 1,
                                content: '<div class="layer-result over"><h2 class="layer-result-title">活动已结束，<br>更多精彩正在继续！</h2><div class="layer-result-pic"><img src="/assets/src/topic/reward_rain/images/over_bg.png" class="w-100"></div><a href="'+url+'" class="btn-result">去看看</a></div>',
                                style: 'width: 90%; background-color: transparent;',
                                shadeClose: false
                            });
                        }
                    }
                    rain_info_cache();
                    clearInterval(rain);
                } else {
                    var top = parseInt(Math.random() * 100);
                    var html = "";
                    if (top >= 50) {
                        html = "<div id='" + counter + "' class='reward-gift' style='opacity:1;bottom:" + (100 - top) + "%;";
                    } else {
                        html = "<div id='" + counter + "' class='reward-gift' style='opacity:1;top:" + top + "%;";
                    }
                    var left = parseInt(Math.random() * 100);
                    if (left >= 50) {
                        html += "right:" + (100 - left) + "%;background: url(/assets/src/topic/reward_rain/images/"+pic_arr[pic_index]+") no-repeat center top;background-size: 100%;' data='"+boom_pic_arr[pic_index]+"'></div>";
                    } else {
                        html += "left:" + left + "%;background: url(/assets/src/topic/reward_rain/images/"+pic_arr[pic_index]+") no-repeat center top;background-size: 100%;' data='"+boom_pic_arr[pic_index]+"'></div>";
                    }
                    $(".game").append(html);
                    $("#" + counter).bind("touchstart", function() {
                        click_counter++;
                        if(red_envelope < 3){
                            if(parseInt(Math.random()*100) >= 90){
                                rain_envelope();
                            }else{
                                empty_counter++;
                                if(empty_counter>=10){
                                    rain_envelope();
                                }
                            }
                        }
                        var id = $(this).attr("id");
                        $(this).unbind("touchstart");
                        $(this).stop();
                        $(this).css("background-image", "url(/assets/src/topic/reward_rain/images/"+$(this).attr("data")+")");
                        $(this).css("opacity", 1);
                        setTimeout(function() {
                            $("#" + id).remove();
                        }, 1500);
                    })
                    $("#" + counter).animate({
                        opacity: "0"
                    }, {
                        duration: 3000,
                        queue: false,
                        complete: function() {
                            $(this).remove();
                        }
                    });
                    counter++;
                }
            }, 1000);
        }

        function rain_envelope(){
            $.ajax({
                url:"/phone/zt/give_rain_reward",
                type:"GET",
                cache:false,
                data:{},
                dataType:"JSON",
                async:false,
                success:function(json){
                    if(json.status == 0){
                        // console.log(json.msg);
                    }else if(json.status == 1){
                        red_envelope++;
                        $(".reward-number span").html(red_envelope+"个");
                        empty_counter = 0;
                        if(json.type == "reward"){
                            type_A++;
                        }else if(json.type == "reward_coupons"){
                            type_B++;
                        }
                    }
                },
                error:function(){

                }
            });
        }

        function rain_info_cache(){
            var index = 0;
            if(game_no == "第一场"){
                index = 1;
            }else if(game_no == "第二场"){
                index = 2;
            }else if(game_no == "第三场"){
                index = 3;
            }
            $.ajax({
                url:"/phone/zt/rain_info_cache",
                type:"GET",
                cache:false,
                data:{
                    index : index,
                    click_sum : click_counter,
                    reward_sum : type_A,
                    reward_coupon_sum : type_B
                },
                dataType:"JSON",
                async:false,
                success:function(json){

                },
                error:function(){
                    
                }
            });
        }

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

        // 滚动方法
        (function($) {
            $.fn.textSlider = function(settings) {
                settings = jQuery.extend({
                    speed: "normal",
                    line: 2,
                    timer: 3000
                }, settings);
                return this.each(function() {
                    $.fn.textSlider.scllor($(this), settings);
                });
            };
            $.fn.textSlider.scllor = function($this, settings) {
                var ul = $("ul:eq(0)", $this);
                var timerID;
                var li = ul.children();
                var liHight = $(li[0]).height();
                var upHeight = 0 - settings.line * liHight; //滚动的高度；
                var scrollUp = function() {
                    ul.animate({
                        marginTop: upHeight
                    }, settings.speed, function() {
                        for (i = 0; i < settings.line; i++) {
                            ul.find("li:first", $this).appendTo(ul);
                        }
                        ul.css({
                            marginTop: 0
                        });
                    });
                };
                var autoPlay = function() {
                    timerID = window.setInterval(scrollUp, settings.timer);
                };
                var autoStop = function() {
                    window.clearInterval(timerID);
                };
                //事件绑定
                ul.hover(autoStop, autoPlay).mouseout();
            };
        })(jQuery);

        // 执行英雄榜滚动
        $(document).ready(function() {
            $(".world-heroes-roll").textSlider({
                line: 1,
                speed: 500,
                timer: 3000
            });
        });

        // 活动规则
        $(".a-rule").click(function(){
            var rewardRain = layer.open({
                type: 1,
                content: '<div class="layer-result rule"><i class="closediy" style=""></i><h2>★ 活动规则 ★</h2><ol><li>活动时间：2016年2月18日11:00、15:00、20:00；</li><li>活动期间，用户点击活动页面中“红包君”，即有机会获得祺福红包；</li><li>参与资格：新老用户均可参加，不限场次；</li><li>活动所领取的红包（券），有效期截止2月19日23:59:59。<span class="c-red">红包攻略：</span><ol><li>遇到红包君，立马抓即可！</li><li>牢记下一场抓红包时间预告。</li><li>每个活动整点后15分钟为抓红包的有效时间。</li></ol></li></ol><p>如有疑问请拨打客服热线：<span class="c-red">400-720-1188</span>。<br>本次活动最终解释权归祺天优贷所有。</p></div>',
                style: 'width: 90%; background-color: transparent;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('closediy')[0].onclick = function(){
                        layer.close(rewardRain)
                    }
                }
            });
        });
    })
});