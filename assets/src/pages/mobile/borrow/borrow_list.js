define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        asPieProgress = require('asPieProgress'),//加载圆圈
        layer = require('layer.m/1.6/layer.m'),//加载layer
        borrow_type = $("#borrow_type"),
        borrow_num = $("#borrow_num"),
        page_size = $("#page_size"),
        order_column = $("#order_column"),
        order_value = $("#order_value"),
        user_id = $("#user_id"),
        temp = "";

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        if (borrow_type.val() == "" || borrow_type.val() == "0") {
            temp = "全部项目";
        } else if (borrow_type.val() == "1") {
            temp = "新手标";
        } else if (borrow_type.val() == "246") {
            temp = "新车贷";
        } else if (borrow_type.val() == "245") {
            temp = "祺天车贷";
        } else if (borrow_type.val() == "247") {
            temp = "祺天房贷";
        } else if (borrow_type.val() == "565") {
            temp = "票据贷";
        } else {
            temp = "全 部";
        }

        var header = '<a href="/phone/user/" class="a-left-link hide">注册</a>' +
            '<h1 class="primary-title" id="j-project-nav">' + temp + '<i id="j-project-nav-i" class="qtydfont ml5">&#xe61f;</i></h1>' +
            '<nav class="project-nav">' +
            '<a data="0" href="/phone/borrow/borrow_list?borrow_type=0"' + ((borrow_type.val() == "0" || borrow_type.val() == "") ? 'class="current"' : '') + '>全部项目</a>' +
            '<a data="1" href="/phone/borrow/borrow_list?borrow_type=1"' + (borrow_type.val() == "1" ? 'class="current"' : '') + '>新手标</a>' +
            '<a data="246" href="/phone/borrow/borrow_list?borrow_type=246"' + (borrow_type.val() == "246" ? 'class="current"' : '') + '>新车贷</a>' +
            '<a data="245" href="/phone/borrow/borrow_list?borrow_type=245"' + (borrow_type.val() == "245" ? 'class="current"' : '') + '>祺天车贷</a>' +
            '<a data="247" href="/phone/borrow/borrow_list?borrow_type=247"' + (borrow_type.val() == "247" ? 'class="current"' : '') + '>祺天房贷</a>' +
            '<a data="247" href="/phone/borrow/borrow_list?borrow_type=565"' + (borrow_type.val() == "565" ? 'class="current"' : '') + '>票据贷</a>' +
            '</nav><span class="icon-primary-nav qtydfont" id="icon-primary-nav">&#xe603;</span>' +
            '<nav class="primary-nav-group">';
        header += '<a href="/phone/welcome"><i class="qtydfont">&#xe604;</i>首页</a>';
        if (user_id.val() <= 0) {
            header += '<a href="/phone/user/login.html"><i class="qtydfont">&#xe60d;</i>登录</a>' +
                '<a href="/phone/user/reg/"><i class="qtydfont">&#xe667;</i>注册</a>' +
                '<a id="nav_calc" href="javascript:void(0);"><i class="qtydfont">&#xe663;</i>收益计算器</a>';
        } else {
            header += '<a href="/phone/account/recharge"><i class="qtydfont">&#xe613;</i>充值</a>' +
                '<a href="/phone/account/cash_apply"><i class="qtydfont">&#xe60f;</i>提现</a>' +
                '<a href="/phone/borrow/borrow_list"><i class="qtydfont">&#xe60e;</i>投资</a>' +
                '<a id="nav_calc" href="javascript:void(0);"><i class="qtydfont">&#xe663;</i>收益计算器</a>' +
                '<a href="/phone/user/logout.html"><i class="qtydfont">&#xe618;</i>安全退出</a>';
        }
        $("#header").html(header);

        $("#icon-primary-nav").click(function () {
            if ($(".primary-nav-group").css("display") == "none") {
                $(".primary-nav-group").slideDown();
            }
            else {
                $(".primary-nav-group").slideUp();
            }
        });
        $(document).bind("click", function (e) {
            var tar = $(e.target);
            if (tar.attr("id") != "icon-primary-nav") {
                $(".primary-nav-group").slideUp();
            }
        });

        $("a[name='prepare']").each(function () {
            $(this).click(function () {
                layer.closeAll();
                show_error("项目还未开始，敬请期待", 2);
                return false;
            });
        });

        $("#nav_calc").click(function () {
            var width = $(document).width(), height = $(document).height();
            layer.closeAll();
            layer.open({
                title: "收益计算器",
                content: '<iframe scrolling="no" width="100%" height="' + (height * 0.5 > 500 ? 500 : height * 0.5) + '" allowtransparency="true" class="layui-layer-load" frameborder="0" src="/phone/welcome/calc?apr=&day="></iframe>',
                shadeClose: false,
                shade: true,
                type: 1,
                style: "width:100%"
            });
        });

        var j_project_nav = $("#j-project-nav"),
            project_nav = $(".project-nav");

        j_project_nav.click(function () {
            if (!project_nav.is(":visible")) {//隐藏
                project_nav.slideDown();
                j_project_nav.children().html('&#xe62e;');
            }
            else {
                project_nav.slideUp();
                j_project_nav.children().html('&#xe61f;');
            }
        });

        $(document).bind("click", function (e) {
            var tar = $(e.target);
            if (tar.attr("id") != "j-project-nav" && tar.attr("id") != "j-project-nav-i") {
                project_nav.slideUp();
                j_project_nav.children().html('&#xe61f;');
            }
        });

        var cur_page = 2,
            total = borrow_num.val(),
            pages = total / page_size.val();
        pages = Math.ceil(pages);

        $(window).scroll(function () {
            var marginBot = 0;
            if (document.compatMode === "CSS1Compat") {
                marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
            } else {
                marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
            }
            if (marginBot <= 100) {
                if (cur_page > pages) {
                    return false;
                }
                layer.closeAll();
                layer.open({
                    content: "数据加载中",
                    type: 2,
                    shadeClose: false
                });
                $.ajax({
                    url: "/phone/borrow/borrow_list/" + cur_page + "?format=json&borrow_type=" + borrow_type.val() + "&order_column=" + order_column.val() + "&order_value=" + order_value.val(),
                    type: "GET",
                    data: {},
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (result) {
                        layer.closeAll();
                        var borrow_list = result.borrow_list;
                        var htmlContent = "";
                        if (typeof(borrow_list) != "undefined") {
                            var length = borrow_list.length;
                            for (var i = 0; i < length; i++) {
                                var borrow_info = borrow_list[i].borrow_info, class_str = "", temp = "";
                                if (borrow_info.operate == "已满标") {
                                    class_str = "finish";
                                } else if (borrow_info.operate == "已还款") {
                                    class_str = "repayment";
                                } else if (borrow_info.new_hand == 1) {
                                    class_str = "novice";
                                } else if (borrow_info.apr >= 16) {
                                    class_str = "welfare";
                                }
                                var str = "";
                                if (borrow_info.invest_balance > 0) {
                                    str = "可投金额:  ¥ " + borrow_info.invest_balance;
                                } else {
                                    str = "项目金额:  ¥ " + borrow_info.loan_amount;
                                }

                                temp = '<a left_time="0" borrow_id="' + borrow_info.id + '" invest_percent="' + borrow_info.invent_percent + '" operate="' + borrow_info.operate + '" class="project-item ' + class_str + '">' +
                                    '<dl>' +
                                    '<dd class="c-primary"><span class="ft25">' + borrow_info.apr + '</span> %</dd>' +
                                    '<dt>年利率</dt>' +
                                    '</dl>' +
                                    '<dl>' +
                                    '<dd><span class="ft18">' + borrow_info.loan_period.num + '</span>' + borrow_info.loan_period.unit + '</dd>' +
                                    '<dt>期限</dt>' +
                                    '</dl>' +
                                    '<div class="p-item-progress">' +
                                    '<div class="pie_progress" role="progressbar" data-goal="100" data-barcolor="#f0494f"' +
                                    'data-fillcolor="#fff" data-barsize="6" aria-valuemax="100">' +
                                    '<div class="project-time"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<h3 class="ft14">' + borrow_info.borrow_name + '<span class="c-999 ft12">' + str + '</span></h3>' +
                                    '</a>';
                                htmlContent += temp;
                            }
                            cur_page++;
                            $(".project-list").append(htmlContent);

                            $(".project-list a").each(function () {
                                draw_all($(this));
                            });
                        }
                    },
                    error: function () {
                        layer.closeAll();
                    }
                });
            }
        });

        $(".project-list a").each(function () {
            draw_all($(this));
        });

        layer.closeAll();
    });

    function draw_all(obj) {
        var operate = obj.attr("operate");
        var left_time = obj.attr("left_time");
        var invest_percent = obj.attr("invest_percent");
        var borrow_id = obj.attr("borrow_id");
        var project_time = obj.find(".project-time").eq(0);//倒计时层
        var pie_progress = obj.find(".pie_progress").eq(0);
        if (left_time > 0) {
            draw_pie_progress(pie_progress, 0);
            countDown(left_time, project_time, borrow_id);
        } else {
            if (operate == "已满标" || operate == "已还款") {
                pie_progress.attr("data-barcolor", "#999");
                project_time.addClass("c-999");
            }
            draw_pie_progress(pie_progress, invest_percent);
            project_time.html(operate);
            obj.attr("href", "/phone/borrow/index/" + borrow_id);
        }
    }

    function draw_pie_progress(obj, percent) {
        obj.asPieProgress({namespace: "pieProgress"}).asPieProgress("go", percent);
    }

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
                obj.html((hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second));
            } else {
                clearInterval(timer);
                obj.html("立即投资");
                var parent = obj.parent().parent().parent();
                parent.unbind("click");
                parent.attr("href", "/phone/borrow/index/" + id).unbind("click");
            }
        }, 1000);
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