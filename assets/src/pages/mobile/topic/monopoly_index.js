define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        var car_type = 0;
        $(".left-car").click(function () {
            if (!$(this).hasClass("select")) {
                car_type = 1;
                $(this).addClass("select");
                $(".right-car").removeClass("select");
                $(".select-number").html("");
                $(".btn-submit").addClass("select");
                if ($(".btn-submit").attr("status") == "2") {
                    if (parseInt($(this).find("span").attr("data")) <= 0) {
                        $(".btn-submit").unbind("click");
                        $(".select-number").append("选择GTR-跑车可参与<em>0</em>次，加满能量再来吧！");
                        $(".btn-submit").html("立即投资");
                        $(".btn-submit").bind("click", function(){
                            window.location = "/phone/borrow/borrow_list";
                        });
                    }else{
                        $(".select-number").append("选择GTR-跑车可参与<em>" + $(this).find("span").attr("data") + "</em>次");
                    }
                }
            }
        });

        $(".right-car").click(function () {
            if (!$(this).hasClass("select")) {
                car_type = 2;
                $(this).addClass("select");
                $(".left-car").removeClass("select");
                $(".select-number").html("");
                $(".btn-submit").addClass("select");
                if ($(".btn-submit").attr("status") == "2") {                
                    if (parseInt($(this).find("span").attr("data")) <= 0) {
                        $(".btn-submit").unbind("click");
                        $(".select-number").append("选择F1-超跑可参与<em>0</em>次，加满能量再来吧！");
                        $(".btn-submit").html("立即投资");
                        $(".btn-submit").bind("click", function(){
                            window.location = "/phone/borrow/borrow_list";
                        });
                    } else {
                       $(".select-number").append("选择F1-超跑可参与<em>" + $(this).find("span").attr("data") + "</em>次"); 
                    }
                }
            }
        });

        $(".btn-submit").click(function () {
            if ($(this).hasClass("select")) {
                if (car_type == 1 || car_type == 2) {
                    var device_port = "";
                    if($(this).attr("data") != ""){
                        device_port = "&device_port=" + $(this).attr("data");
                    }
                    window.location = "/phone/zt/monopoly_game?car_type=" + car_type + device_port;
                    return false;
                }
                if($(this).attr("data") != "" && typeof($(this).attr("href")) == "undefined"){
                    window.location = $(this).attr("data");
                    return false;
                }
            }
        });

        $("#my_logs").click(function () {
            if (typeof($(this).find("a").attr("href")) == "undefined") {
                $(this).addClass("current");
                $("#new_logs").removeClass("current");
                $("#my_list").removeClass("hide");
                $("#new_list").addClass("hide");
            }
        });

        $("#new_logs").click(function () {
            $(this).addClass("current");
            $("#my_logs").removeClass("current");
            $("#my_list").addClass("hide");
            $("#new_list").removeClass("hide");
        });

        layer.closeAll();
    });
});