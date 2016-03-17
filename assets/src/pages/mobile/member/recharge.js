define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),
        common = require('../common');

    require("regex");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var money = $("#money"),
        valid_code = $("#valid_code"),
        bank_id = $("#bank_id"),
        btnSendSms = $("#btnSendSms"),
        record_no = $("#record_no"),
        recharge_submit = $("#recharge_submit"),
        first_money = $("#first_money"),
        limit_day_money = $("#limit_day_money"),
        limit_one_money = $("#limit_one_money"),
        is_exists_bank = $("#is_exists_bank"),
        money_error = '', valid_code_error = "";

    $(function () {
        $("#header h1").text("充值");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');

        $('#j-bank-list-more').click(function () {
            $('.bank-list-item').show();
        });

        if (parseInt(is_exists_bank.val()) == 0) {
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">您还没有可用快捷卡，请您添加</p></div>',
                shadeClose: false,
                btn: ['好'],
                style: 'min-width:300px;',
                yes: function () {
                    window.location.href = "/phone/account/bank_add";
                    return false;
                }
            });
            return false;
        }

        var safety_bank = $("section[name='safety_bank']");
        if (safety_bank.length > 0) {
            var first_obj = safety_bank.eq(0);
            if (first_obj.hasClass("selected")) {
                first_obj.addClass("selected");
                bank_id.val(first_obj.attr("id"));
            }
        }
        var quick_banks = $("section[name='quick_bank']");
        if (quick_banks.length > 0) {
            for (var i = 0; i < quick_banks.length; i++) {
                var id = quick_banks.eq(i).attr("id");
                var bank_tips = $("#bank_tips_" + id);
                if (bank_tips.val() == "") {
                    var result = quick_banks.eq(i).attr("data").split('_');
                    first_money.text(result[0]);
                    limit_day_money.text(result[2]);
                    limit_one_money.text(result[1]);

                    quick_banks.eq(i).addClass("selected");
                    bank_id.val(quick_banks.eq(i).attr("id"));
                    break;
                }
            }
        }

        money.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                money_error = "必须输入充值金额";
            }
            else if (!qtyd_regex.money(value)) {
                money_error = "金额必须为数字，小数点后不超过2位";
            } else if (parseFloat(value) < 1.01) {
                money_error = "最小充值金额为1.01元";
            } else {
                money_error = "";
            }
            if (money_error != "") {
                show_error(money_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110 || char_code == 190);
        });
        valid_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                valid_code_error = "请输入短信验证码";
            } else if (!qtyd_regex.valid_code(value)) {
                valid_code_error = "验证码格式错误，应为6位纯数字";
            } else {
                valid_code_error = "";
            }
            if (valid_code_error != "") {
                show_error(valid_code_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });
        var t = 120, hand;
        btnSendSms.click(function () {
            if (bank_id.val() == "") {
                show_error("请选择充值银行卡", 1);
                return false;
            }
            money.trigger("blur");
            if (money_error != "") {
                return false;
            }
            layer.open({
                type: 2,
                shadeClose: false,
                content: "短信发送中..."
            });
            $.ajax({
                url: "/phone/account/recharge",
                type: "POST",
                data: {
                    "money": money.val(),
                    "bank_id": bank_id.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        record_no.val(result.record_no);
                        layer.closeAll();
                        if (hand)
                            clearInterval(hand);
                        hand = setInterval(function () {
                            btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                            t -= 1;
                            if (t < 0) {
                                btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                                clearInterval(hand);
                                t = 120;
                            }
                        }, 1000);
                    } else if (result.code >= 110023 && result.code <= 110026) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else if (result.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    } else {
                        show_error("发送验证码失败，原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("发送验证码失败，请稍后再试", 1);
                    return false;
                }
            });
        });
        recharge_submit.click(function () {
            if (bank_id.val() == "") {
                show_error("请选择充值银行卡", 1);
                return false;
            }
            money.trigger("blur");
            if (money_error != "")
                return false;
            valid_code.trigger("blur");
            if (valid_code_error != "")
                return false;
            layer.open({
                type: 2,
                shadeClose: false,
                content: '充值中...'
            });
            $.ajax({
                url: "/phone/account/recharge2",
                type: "POST",
                data: {
                    "money": money.val(),
                    "bank_id": bank_id.val(),
                    "valid_code": valid_code.val(),
                    "record_no": record_no.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">充值成功</p></div>',
                            btn: ['投资', '查看'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/borrow/borrow_list";//跳转到中间页
                                return false;
                            }, no: function () {
                                window.location.href = "/phone/account/trade_log?account_type=recharge";
                                return false;
                            }
                        });
                    } else if (result.code == 930028 || result.code == 930020) {
                        record_no.val(result.record_no);

                        t = 120;
                        show_error(result.msg, 3);
                        if (hand)
                            clearInterval(hand);
                        hand = setInterval(function () {
                            btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                            t -= 1;
                            if (t < 0) {
                                btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                                clearInterval(hand);
                                t = 120;
                            }
                        }, 1000);
                    } else if (result.code >= 110023 && result.code <= 110026) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/user/login.html";
                                return false;
                            }
                        });
                    } else if (result.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    } else {
                        show_error("充值失败，原因：" + result.msg, 3);
                        if (hand)
                            clearInterval(hand);
                        t = 120;
                        btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        return false;
                    }
                }, error: function () {
                    show_error("充值失败，请稍后再试", 1);
                    return false;
                }
            });
        });

        $("section[name='quick_bank']").each(function () {
            $(this).click(function () {
                change_bank($(this).attr("id"));
            });
        });

        $('#j-protocol').click(function () {
            var protocol = layer.open({
                type: 1,
                content: '<div class="protocol-head">新浪支付快捷支付使用协议</div><div class="protocol-cont" style="height:' + document.documentElement.clientHeight + 'px; box-sizing: border-box;"><div id="user-protocol" style="overflow: auto; height:100%; "></div></div><div class="protocol-foot"><button class="btn-primary closediy">同意</button></div>',
                style: 'width:100%; overflow:auto; height:' + document.documentElement.clientHeight + 'px;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('closediy')[0].onclick = function () {
                        layer.close(protocol)
                    }
                }
            });
            $("#user-protocol").load("/welcome/sina_pay_quick_service_protocol_box");
        });

        layer.closeAll();
    });

    /**
     * 选择银行卡
     * @param bank_id
     * @returns {boolean}
     */
    function change_bank(bank_id) {
        var obj = $("#" + bank_id);
        var result = obj.attr("data").split('_');
        obj.addClass("selected");
        obj.siblings().removeClass("selected");
        first_money.text(result[0]);
        limit_day_money.text(result[2]);
        limit_one_money.text(result[1]);
        var tips = $("#tips");
        var bank_tips = $("#bank_tips_" + bank_id);
        if (bank_tips.val() == "") {
            $("#bank_id").val(bank_id);
            tips.addClass("hide").html("");
            money.attr("disabled", false);
            valid_code.attr("disabled", false);
            btnSendSms.attr("disabled", false).removeClass("disabled");
            recharge_submit.attr("disabled", false).removeClass("disabled");
        } else {
            tips.removeClass("hide").html(bank_tips.val());
            $("#bank_id").val("");
            //禁用所有按钮
            money.attr("disabled", true);
            valid_code.attr("disabled", true);
            btnSendSms.attr("disabled", true).addClass("disabled");
            recharge_submit.attr("disabled", true).addClass("disabled");
        }
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