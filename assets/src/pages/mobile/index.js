define(function (require) {
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('./common'),
        asPieProgress = require('asPieProgress'),//加载圆圈插件
        invest_percent = $("#invest_percent"),
        left_time = $("#left_time"),
        btnSubmit = $("#btnSubmit"),
        borrow_id = $("#borrow_id"),
        is_sign_up = parseInt($("#is_sign_up").val());//是否已经签到

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    require('touchslide/1.1/touchslide');

    $(function () {
        if (is_sign_up == 1) {
            $("#header").find("a").eq(0).attr("href", "javascript:;").text("已签到");
        }

        if (parseInt(left_time.val()) > 0) {
            btnSubmit.unbind("click").bind("click", function () {
                layer.closeAll();
                layer.open({
                    content: "项目还未开始，敬请期待",
                    type: 1,
                    style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
                    shadeClose: false,
                    shade: false,
                    time: 1
                });
                return false;
            });
            countDown(left_time.val(), btnSubmit, borrow_id.val());
        }
        /**
         * 图片滚动
         */
        TouchSlide({
            slideCell: "#focus",
            titCell: ".head ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell: ".body ul",
            effect: "leftLoop",
            autoPlay: true,//自动播放
            autoPage: true, //自动分页
            switchLoad: "_src" //切换加载，真实图片路径为"_src"
        });
        /**
         * 圆圈
         */
        $(".project-progress").asPieProgress({
            namespace: 'pieProgress'
        }).asPieProgress("go", invest_percent.val());

        layer.closeAll();

        /**
         * 抓红包引导层

         var rewardRain = layer.open({
            type: 1,
            content: '<a href="###" style="display:block; margin:0; padding:0; max-width:600px; min-width:260px; text-align:center;"><i class="closediy" style=" display: block; position: absolute; z-index: 500; right: 5px; top: -15px; width: 30px; height: 30px;"><img src="/assets/src/topic/reward_rain/images/reward_show_close.png" style="width:100%;"></i><img src="/assets/src/topic/reward_rain/images/reward_show.jpg" style="width:100%;"></a>',
            style: 'padding: 0 20px; text-align: center; background-color: transparent; box-shadow: none;',
            success: function (olayer) {
                var cla = 'getElementsByClassName';
                olayer[cla]('closediy')[0].onclick = function(){
                    layer.close(rewardRain)
                }
            }
        });
         */
    });

    /**
     * 倒计时
     * @param time
     * @param obj
     * @param id
     */
    function countDown(time, obj, id) {
        var sys_second = time;
        var timer = setInterval(function () {
            if (sys_second > 0) {
                sys_second -= 1;
                var hour = Math.floor((sys_second / 3600) % 24);
                var minute = Math.floor((sys_second / 60) % 60);
                var second = Math.floor(sys_second % 60);
                obj.text((hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second));
            } else {
                clearInterval(timer);
                obj.removeClass("countdown").text('立即投资');
                obj.unbind("click").bind("click", function () {
                    window.location.href = "/phone/borrow/borrow_detail/" + id;
                });
            }
        }, 1000);
    }
});