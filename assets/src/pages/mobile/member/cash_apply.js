define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m');
    require('../common');
    require("regex");

    // 加载mobile公共js
    var common = require('../common'),
        money = $("#money"),
        pay_password = $("#pay_password"),
        available_money = $("#available_money"),
        bank_id = $("#bank_id"),
        cash_apply_submit = $("#cash_apply_submit"),
        is_exists_bank = $("#is_exists_bank"),
        pay_pwd = $("#pay_pwd"),
        single_limit = $("#single_limit");//单笔限额

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var money_error = '', pay_password_error = "";
    $(function () {
        $("#header h1").text("提现");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');

        if (parseInt(pay_pwd.val()) == 0) {
            layer.closeAll();
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">您还没设置支付密码，立即去设置</p></div>',
                shadeClose: false,
                btn: ['好'],
                style: 'min-width:300px;',
                yes: function () {
                    window.location.href = "/phone/mine/pay_pwd";
                    return false;
                }
            });
            return false;
        }

        if (parseInt(is_exists_bank.val()) == 0) {
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">您还没有可用银行卡，请您添加</p></div>',
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
                var flag = false;
                var id = quick_banks.eq(i).attr("id");
                var bank_tips = $("#bank_tips_" + id);
                if (bank_tips.val() == "") {
                    quick_banks.eq(i).addClass("selected");
                    bank_id.val(quick_banks.eq(i).attr("id"));
                    break;
                }
            }
        }

        money.blur(function () {
            var value = $(this).val(), _available_money = parseFloat(available_money.val().replace(",", ""));

            if (!qtyd_regex.money(value)) {
                money_error = "金额必须为数字，小数点后不超过2位";
            } else if (parseFloat(value) > _available_money) {
                money_error = "超过最大可提现金额";
            } else if (parseFloat(value) <= 0) {
                money_error = "请输入有效金额";
            } else if (parseFloat(value) > parseFloat(single_limit.val())) {
                money_error = "单笔最大提现金额为" + single_limit.val() + "元";
            } else {
                money_error = "";
            }
            if (money_error != "") {
                show_error(money_error, 2);
                return false;
            } else {
                money_error = "";
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 190 || char_code == 110);
        });
        pay_password.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                pay_password_error = "必须输入支付密码";
                show_error(pay_password_error, 1);
                return false;
            }
            pay_password_error = "";
        });
        cash_apply_submit.click(function () {
            if (bank_id.val() == "") {
                show_error("请选择提现银行卡", 1);
                return false;
            }
            money.trigger("blur");
            if (money_error != "")
                return false;
            pay_password.trigger("blur");
            if (pay_password_error != "") {
                return false;
            }

            layer.open({
                type: 2,
                shadeClose: false,
                content: '提现中...'
            });
            $.ajax({
                url: "/phone/account/cash_apply",
                type: "POST",
                data: {
                    "amount": money.val(),
                    "bank_id": bank_id.val(),
                    "pay_pwd": pay_password.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: "<div class=\"tac\"><i class=\"qtydfont c-success ft25\">&#xe61b;</i><p class=\"c-999 mt5\">申请提现成功，等待银行处理</p></div>",
                            btn: ['查看提现记录'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/account/trade_log?account_type=cash_apply";
                                return false;
                            }
                        });
                    } else if (result.code >= 110023 && result.code <= 110026) {
                        layer.closeAll();
                        layer.open({
                            content: "<div class=\"tac\"><i class=\"qtydfont c-warning ft25\">&#xe630;</i><p class=\"c-999 mt5\">登陆超时，请重新登录</p>",
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
                        show_error("提现申请失败，原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("提现申请失败，请稍后再试", 1);
                    return false;
                }
            });
        });

        $("section[name='quick_bank']").each(function () {
            $(this).click(function () {
                module.exports.change_bank($(this).attr("id"));
            });
        });
        $("section[name='safety_bank']").each(function () {
            $(this).click(function () {
                module.exports.change_bank($(this).attr("id"));
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

    module.exports = {
        change_bank: function (bank_id) {
            var obj = $("#" + bank_id);
            obj.addClass("selected");
            obj.siblings().removeClass("selected");
            var bank_tips = $("#bank_tips_" + bank_id);
            var tips = $("#tips");
            if (bank_tips.val() == "") {
                $("#bank_id").val(bank_id);
                tips.addClass("hide").html("");
                money.attr("disabled", false);
                pay_password.attr("disabled", false);
                cash_apply_submit.attr("disabled", false).removeClass("disabled");
            }
            else {
                tips.removeClass("hide").html(bank_tips.val());
                $("#bank_id").val("");
                money.attr("disabled", true);
                pay_password.attr("disabled", true);
                cash_apply_submit.attr("disabled", true).addClass("disabled");
            }
        }
    };

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