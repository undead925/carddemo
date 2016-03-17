define(function (require) {
    // 加载jQuery
    var $ = require('jquery');

    require("regex");
    require("jquery.qrcode.min");

    // 加载画圈js
    var asPieProgress = require('asPieProgress'),
        layer = require('layer.m/1.6/layer.m'),
        common = require('../common'),
        go_detail = $("#go_detail"),//查看项目详情
        borrow_submit = $("#borrow_submit"),
        invest_percent = $("#invest_percent"),
        borrow_id = $("#borrow_id"),
        borrow_name = $("#borrow_name"),
        left_time = $("#left_time"),
        invest_submit = $("#invest_submit"),
        money = $("#money"),
        reward_id = $("#reward_id"),
        reward_select = $("#reward_select"),
        coupon_id = $("#coupon_id"),
        coupon_select = $("#coupon_select"),
        auto = $("#btnAuto"),
        total_money = $("#total_money"),
        mini_num = $("#mini_num"),
        user_balance = $("#user_balance"),
        invest_balance = $("#invest_balance"),
        pay_password = $("#pay_password"),
        type = $("#type"),//标识是投资首页还是投资页
        money_error = "", pay_password_error = "",
        borrow_type = $("#borrow_type"), reward_url = $("#reward_url");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    //获取选中红包的金额
    function get_selected_reward() {
        var temp = 0;
        if (reward_id.val() != "") {
            reward_select.find("option").each(function () {
                var id = $(this).attr("value");
                if (id == reward_id.val()) {
                    temp = parseFloat($(this).attr("data"));
                    return temp;
                }
            });
        }
        return temp;
    }

    //计算利息
    function calc() {
        var user_reward = get_selected_reward();
        var _money = 0;
        if (money.val() != "") {
            _money = parseFloat(money.val());
        }
        total_money.text((_money + user_reward).toFixed(2));
    }

    function clear() {
        total_money.text("0.00");
    }

    $(function () {
        $("#header h1").text(borrow_name.val());
        if (type.val() == "index" || type.val() == "") {
            $("#header a").eq(0).attr("href", "/phone/borrow/borrow_list").html('<i class="qtydfont">&#xe623;</i>返回');
        } else {
            $("#header a").eq(0).attr("href", "/phone/borrow/index/" + borrow_id.val()).html('<i class="qtydfont">&#xe623;</i>返回');
        }

        if (parseInt(left_time.val()) > 0) {
            countDown(left_time.val(), borrow_submit);
        } else {
            borrow_submit.bind("click", function () {
                go_invest(borrow_id.val());
            });
        }
        $(".project-progress").asPieProgress({
            namespace: 'pieProgress'
        }).asPieProgress("go", invest_percent.val());

        money.blur(function () {
            clear();
            money_error = "";
            var value = $(this).val();
            if ($.trim(value) == "") {
                money_error = "请输入投资金额";
            } else if (!qtyd_regex.money(value)) {
                money_error = "金额必须为数字,且小数位数不能超过2位";
            } else if (parseFloat(value) <= 0) {
                money_error = "请输入有效金额";
            } else {
                var _money = parseFloat(value);
                var user_reward = parseFloat(get_selected_reward());
                var _user_balance = parseFloat(user_balance.val());
                var _invest_balance = parseFloat(invest_balance.val());
                var mininum = parseInt(mini_num.val());

                if (_money > _user_balance) {
                    money_error = "投资金额不能大于可用余额";
                }
                else if (_money + user_reward > _invest_balance) {
                    money_error = "投资总额不能大于标的可投金额";
                }
                else if (_money + user_reward < mininum) {
                    money_error = "投资总额必须大于" + mininum;
                }
                else if (_invest_balance > mininum && _invest_balance < 2 * mininum && (_money + user_reward) < _invest_balance) {
                    money_error = '尾单必须一次性投满';
                }
                else if (_invest_balance - (_money + user_reward) > 0 && _invest_balance - (_money + user_reward) < mininum) {
                    money_error = '请全部认购，或至少留下' + mininum;
                }
                else {
                    money_error = "";
                }
            }
            if (money_error != "") {
                show_error(money_error, 1);
                return false;
            }
            calc();
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 190 || char_code == 110);
        });
        if (borrow_type.val() != 248) {
            money.val("");
        }

        /**
         * 自动填写
         */
        auto.click(function () {
            var user_reward = 0;
            var _user_balance = parseFloat(user_balance.val());
            var _invest_balance = parseFloat(invest_balance.val());
            //获得最大红包
            var temp = 0;
            reward_select.find("option").each(function () {
                var data = $(this).attr("data");
                if (data != "") {
                    var reward = parseFloat(data);
                    var value = $(this).val();
                    //判断当前红包是否大于可投金额
                    if (reward < _invest_balance) { //所选红包小于可投金额
                        if (reward > temp) {
                            temp = reward;
                            reward_id.val(value);
                            reward_select.val(value);
                            user_reward = reward;
                        }
                    }
                }
            });

            temp = 0;
            coupon_select.find("option").each(function () {
                var data = $(this).attr("data");
                if (data != "") {
                    var coupon = parseFloat(data);
                    var value = $(this).val();
                    if (coupon > temp) {
                        temp = coupon;
                        coupon_id.val(value);
                        coupon_select.val(value);
                    }
                }
            });

            var remain_money = _invest_balance - user_reward;//标可投金额-红包金额
            if (remain_money > _user_balance) {
                money.val(_user_balance.toFixed(2));
            } else {
                money.val(remain_money.toFixed(2));
            }
            calc();
        });

        reward_select.change(function () {
            reward_id.val($(this).val());
            calc();
        });

        coupon_select.change(function () {
            coupon_id.val($(this).val());
        });

        pay_password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                pay_password_error = "请输入支付密码";
            } else {
                pay_password_error = "";
            }
            if (pay_password_error != "") {
                show_error(pay_password_error, 1);
                return false;
            }
        });

        invest_submit.click(function () {
            money.trigger("blur");
            if (money_error != "") {
                return false;
            }
            pay_password.trigger("blur");
            if (pay_password_error != "") {
                return false;
            }
            var _money = parseFloat(money.val());
            var user_reward = get_selected_reward();

            var t_money = _money + user_reward;
            //计算总额
            if (t_money > parseFloat(invest_balance.val())) {
                show_error("投资总额不能大于标可投金额", 1);
                return false;
            }
            if (t_money < parseInt(mini_num.val())) {
                show_error("投资总额必须大于" + mini_num.val(), 1);
                return false;
            }
            $(this).attr("disabled", true);

            var current_index = layer.open({
                type: 2,
                shadeClose: false,
                content: "系统处理中..."
            });

            $.ajax({
                url: "/phone/borrow/tender",
                type: "POST",
                dataType: "json",
                cache: false,
                data: {
                    "borrow_id": borrow_id.val(),
                    "invest_money": t_money,
                    "paypassword": pay_password.val(),
                    "reward_id": reward_id.val(),
                    "coupon_id": coupon_id.val()
                },
                success: function (result) {
                    invest_submit.attr("disabled", false);
                    if (result.code == 100000) {
                        if (result.user_tendered == 1 && result.have_reward == 0) { //当天投资并且未领取红包
                            layer.close(current_index);
                            //生成邀请好友二维码
                            if (reward_url.val() != "") {
                                var render_type = "";
                                if ('undefined' == typeof(document.body.style.maxHeight)) {
                                    render_type = "table";
                                } else {
                                    render_type = "canvas";
                                }
                                $("#reward_qrcode").qrcode({
                                    render: render_type,
                                    width: 125,
                                    height: 125,
                                    correctLevel: 0,
                                    text: reward_url.val(),
                                    src: "/assets/dist/images/moblie/reward.png"
                                });
                                $("#success_dialog").removeClass("hide");
                            }
                        } else {
                            var _content = '恭喜，投资成功' + (result.reward > 0 ? "，获得" + result.reward + "元红包" : "");
                            if (borrow_type.val() == 248) {
                                _content = "恭喜您，11元现金稍后发放到您的账户，请注意查收。";
                            }
                            layer.open({
                                shadeClose: false,
                                content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">' + _content + '</p></div>',
                                btn: ['继续投资', '查看记录'],
                                style: 'min-width:300px;',
                                yes: function () {
                                    window.location.href = "/phone/borrow/borrow_list";
                                    return false;
                                }, no: function () {
                                    window.location.href = "/phone/account/invest_log/bidding";
                                    return false;
                                }
                            });
                        }
                    } else if (result.code >= 110023 && result.code <= 110026) {
                        layer.open({
                            shadeClose: false,
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else if (result.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    } else {
                        show_error("投资失败，失败原因：" + result.msg, 3);
                    }
                    return false;
                }, error: function () {
                    invest_submit.attr("disabled", false);
                    show_error("投资失败", 1);
                    return false;
                }
            });
        });

        layer.closeAll();
    });

    function go_invest(borrow_id) {
        window.location.href = "/phone/borrow/borrow_detail/" + borrow_id;
        return false;
    }

    /**
     * 倒计时
     * @param time
     * @param obj
     */
    function countDown(time, obj) {
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
                //倒计时结束，刷新页面
                obj.text("立即投资").removeClass("countdown").unbind("click").bind("click", function () {
                    go_invest(borrow_id.val());
                });
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