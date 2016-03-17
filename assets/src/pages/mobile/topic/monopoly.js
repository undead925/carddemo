define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('../common'),
        asPieProgress = require('asPieProgress');//加载圆圈插件

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });
    //汽车属性
    var car_type = 1,		//汽车类型
        run_status = false, //汽车状态
        oil_status = false, //油门状态
        oil_sum = 20,        //总油量
        speed_up = 0,		//汽车加速间隔
        min_speed = 50,		//初始最低车速(固定)
        max_speed = 1,		//最高车速
        slow_down = 0, 		//汽车刹车距离
        oil_percent = 0;	//油箱油量

    //赛跑相关
    var roll = 3,			//汽车将跑的圈数
        time = 0,			//加速时间
        prize_index = 0,	//奖品顺序
        prize_distance = 0,	//奖品在最后一圈的位置
        run_distance = 0,	//已跑路程
        all_distance = 0;	//总路程

    //初始化属性
    var bg_img_height = 0,
        car_img_height = 0,
        game_height = 0,
        prize_img = "";

    //赛道初始位置
    var origin_img_height = 0, origin_top_upper = 0, origin_top_down = 0, end_top_upper = 0, random_distance = 0, speed;

    $(function () {
        car_road_init();
        init();
        $("#car_run").click(function () {
            if (!run_status) {
                var start_flag = false;
                $("#count_down").find("img").css("width", "0%")
                    .attr("src", "/assets/dist/topic/monopoly/img/go3.png")
                    .find("img").show();
                layer.open({
                    type: 2,
                    shadeClose: false,
                    content: '加载中...'
                });
                $.ajax({
                    url: "/phone/zt/monopoly_lottery",
                    type: "POST",
                    data: {
                        car_type: car_type
                    },
                    cache: false,
                    async: false,
                    dataType: "json",
                    success: function (result) {
                        layer.closeAll();
                        console.log(result);
                        if (result.code == 10000) {
                            prize_index = result.position;
                            prize_img = result.pic;
                            start_flag = true;
                        } else {
                            show_error(result.msg, 5);
                        }
                    },
                    error: function (error) {
                        show_error("抱歉，系统发生异常", 5);
                    }
                });
                if (start_flag) {
                    clearInterval(oil_status);
                    oil_status = false;
                    roll = parseInt(oil_sum / 20) + 2;
                    random_distance = (oil_sum / 20 - roll + 2) * 120 + 30;
                    prize_distance = Math.floor((228 * (prize_index - 1) + 684 + random_distance) * bg_img_height / origin_img_height);
                    // console.log("礼物"+prize_distance);
                    // console.log("单圈"+bg_img_height);

                    $(this).hide();
                    $("#count_down").find("img").animate({height: "100%", width: "100%"}, 1000);
                    setTimeout(function () {
                        $("#count_down").find("img").css("width", "0%");
                        $("#count_down").find("img").attr("src", "/assets/dist/topic/monopoly/img/go2.png");
                        $("#count_down").find("img").animate({height: "100%", width: "100%"}, 1000);
                    }, 1500);
                    setTimeout(function () {
                        $("#count_down").find("img").css("width", "0%");
                        $("#count_down").find("img").attr("src", "/assets/dist/topic/monopoly/img/go1.png");
                        $("#count_down").find("img").animate({height: "100%", width: "100%"}, 1000);
                    }, 3000);
                    setTimeout(function () {
                        $("#count_down").find("img").css("width", "0%");
                        $("#count_down").find("img").attr("src", "/assets/dist/topic/monopoly/img/go.png");
                        $("#count_down").find("img").animate({height: "100%", width: "100%"});
                    }, 4500);
                    setTimeout(function () {
                        $("#count_down").find("img").css("width", "0%");
                        $("#count_down").find("img").attr("src", "/assets/dist/topic/monopoly/img/go.png");
                        $("#count_down").find("img").animate({height: "100%", width: "100%"}, {
                            duration: 1000,
                            queue: false,
                            complete: start_game()
                        });
                    }, 6000);
                }
            }
        });
        layer.closeAll();
    });

    function start_game() {
        $("#count_down").find("img").hide();
        all_distance = (roll - 2) * bg_img_height + (bg_img_height - game_height + $(".car").position().top) + prize_distance;
        run_status = setTimeout(shift_up, min_speed);
    }

    var roll_flag = false;
    //汽车移动
    function moving() {
        $(".roller").each(function () {
            var speed;
            var top = -($(this).parent().offset().top - $(this).eq(0).offset().top) + 10;
            if (top >= game_height) {
                top = origin_top_down;
                roll_flag = true;
            }else{
                if(roll_flag){
                    top = origin_top_upper;
                    roll_flag = false;
                }
            }
            $(this).css("top", top);
        });
        run_distance += 10;
        oil_percent = (100 - run_distance / all_distance * 100) * (oil_sum / 100).toFixed(2);
        $(".energy-bar").css("height", oil_percent + "%");
    }

    //汽车加速
    function shift_up() {
        if ((run_distance + slow_down) >= all_distance) {
            // if(roll == roll_count){
            shift_down();
            return false;
        } else {
            moving();
            if (min_speed != max_speed) {
                if (min_speed < 25) {
                    speed = 10;
                } else {
                    speed = speed_up;
                }
                if (time % speed == 0) {
                    min_speed--;
                }
                time++;
            }
            run_status = setTimeout(shift_up, min_speed);
        }
    }

    //var sum = 0;
    //汽车停止
    function shift_down() {
        moving();
        //sum += 5;
        if (min_speed <= 50) {
            if (min_speed < 25) {
                speed = 10;
            } else {
                speed = speed_up;
            }
            if (time % speed == 0) {
                min_speed++;
            }
            time++;
            run_status = setTimeout(shift_down, min_speed);
        } else {
            // console.log(sum);
            run_status = true;
            time = 0;
            $(".energy-bar").css("height", "0%");
            check_position();
            $(".gift-box").find("img").attr("src", "/assets/dist/topic/monopoly/img/gift/" + prize_img);
            setTimeout(function () {
                $(".gift-layer").removeClass("hide");
            }, 2000);
            return false;
        }
    }

    //汽车、跑道信息初始化
    function car_road_init() {
        car_type = $("#car_type").val();
        if (car_type == 1) {
            speed_up = 4;
            max_speed = 5;
            slow_down = 3030;
            origin_img_height = 3420;
        } else if (car_type == 2) {
            speed_up = 2;
            max_speed = 1;
            slow_down = 2930;
            origin_img_height = 4104;
        }
    }

    //其他信息初始化
    function init() {
        run_status = false;
        oil_sum = 20;
        min_speed = 50;
        oil_percent = 0;

        roll = 3;
        time = 0;
        prize_index = 0;
        prize_distance = 0;
        run_distance = 0;
        all_distance = 0;

        game_height = $(".roller").parent().height();
        bg_img_height = $("#roller1").find("img").height();
        car_img_height = $(".car").find("img").height();
        //赛道初始位置初始化
        $("#roller1").css("top", game_height - bg_img_height);
        $("#roller2").css("top", game_height - bg_img_height * 2);
        origin_top_upper = -($(".roller").parent().offset().top - $(".roller").eq(0).offset().top);
        origin_top_down = -($(".roller").parent().offset().top - $(".roller").eq(1).offset().top);

        //进度条初始化
        clearInterval(oil_status);
        oil_status = false;
        $(".energy-bar").css("height", "30%");
        var oil_flag = true;
        oil_status = setInterval(function () {
            if (oil_flag) {
                oil_sum += 1;
                if (oil_sum == 100) {
                    oil_flag = false;
                }
            } else {
                oil_sum -= 1;
                if (oil_sum == 30) {
                    oil_flag = true;
                }
            }
            $(".energy-bar").css("height", oil_sum + "%");
        }, 15);
    }

    //初始化
    $("#init").click(function () {
        init();
        $("#car_run").show();
    });

    $(window).resize(function () {
        if (run_status == false && time == 0 && prize_index == 0) {
            init();
        } else if ((run_status != false && time != 0) || (prize_index != 0 && run_status == false)) {
            clearTimeout(run_status);
            $("#count_down").find("img").hide();
            run_status = false;
            min_speed = max_speed;
            roll = 2;
            time = 0;

            game_height = $(".roller").parent().height();
            bg_img_height = $("#roller1").find("img").height();
            car_img_height = $(".car").find("img").height();
            $("#roller1").css("top", game_height - bg_img_height);
            $("#roller2").css("top", game_height - bg_img_height * 2);
            //赛道初始位置初始化
            origin_top_upper = -($(".roller").parent().offset().top - $(".roller").eq(0).offset().top);
            origin_top_down = -($(".roller").parent().offset().top - $(".roller").eq(1).offset().top);

            prize_distance = Math.floor((228 * (prize_index - 1) + 684 + 100) * bg_img_height / origin_img_height);
            run_distance = 0;
            all_distance = (roll - 1) * bg_img_height - $(".car").position().top + prize_distance;
            oil_percent = 50;
            $(".energy-bar").css("height", "50%");
            shift_up();
        } else if (run_status == true && time == 0) {
            game_height = $(".roller").parent().height();
            bg_img_height = $("#roller1").find("img").height();
            car_img_height = $(".car").find("img").height();
            var a = 684 * bg_img_height / origin_img_height + $(".car").position().top - game_height;   //车子和第一个奖品的相对距离
            $("#roller1").css("top", game_height - bg_img_height + a + ((prize_index - 1) * 228 + random_distance) * bg_img_height / origin_img_height);
            $("#roller2").css("top", game_height - bg_img_height * 2 + a + ((prize_index - 1) * 228 + random_distance) * bg_img_height / origin_img_height);
        }
    });

    function check_position() {
        game_height = $(".roller").parent().height();
        bg_img_height = $("#roller1").find("img").height();
        car_img_height = $(".car").find("img").height();
        var a = 684 * bg_img_height / origin_img_height + $(".car").position().top - game_height;   //车子和第一个奖品的相对距离
        $("#roller1").css("top", game_height - bg_img_height + a + ((prize_index - 1) * 228 + random_distance) * bg_img_height / origin_img_height);
        $("#roller2").css("top", game_height - bg_img_height * 2 + a + ((prize_index - 1) * 228 + random_distance) * bg_img_height / origin_img_height);
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
});