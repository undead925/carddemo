define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m');
    // 加载mobile公共js
    require('./common');

    var calc_money = $("#calc_money"), calc_day = $("#calc_day"), calc_total_money = $("#calc_total_money"),
        calc_apr = $("#calc_apr"), calc_money_error = "", calc_day_error = "", calc_apr_error = "", btnCalc = $("#btnCalc"), btnClear = $("#btnClear"),
        money_regex = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/, day_regex = /^[1-9][0-9]{0,2}$/;

    $(function () {
        $("#header h1").text("收益计算器");

        calc_money.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                calc_money_error = "请输入投资金额";
            } else if (!money_regex.test(value)) {
                calc_money_error = "金额必须为数字，小数点后不超过2位";
            } else {
                calc_money_error = "";
            }
            if (calc_money_error != "") {
                show_error(calc_money_error, 3);
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 9 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110 || char_code == 190);
        });
        calc_day.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                calc_day_error = "请输入收益期限";
            } else if (!day_regex.test(value)) {
                calc_day_error = "请输入有效的收益期限";
            } else {
                calc_day_error = "";
            }
            if (calc_day_error != "") {
                show_error(calc_day_error, 3);
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 9 || char_code == 46 || char_code == 39 || char_code == 37);
        });
        calc_apr.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                calc_apr_error = "请输入年化利率";
            } else if (!money_regex.test(value)) {
                calc_apr_error = "年化利率必须为数字，小数点后不超过2位";
            } else if (parseFloat(value) > 36) {
                calc_apr_error = "年化利率不能超过36%";
            } else {
                calc_apr_error = "";
            }
            if (calc_apr_error != "") {
                show_error(calc_apr_error, 3);
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 9 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110 || char_code == 190);
        });

        btnCalc.click(function () {
            calc_apr.trigger("blur");
            if (calc_apr_error != "") {
                return false;
            }
            calc_day.trigger("blur");
            if (calc_day_error != "") {
                return false;
            }
            calc_money.trigger("blur");
            if (calc_money_error != "") {
                return false;
            }
            //收益=利率/360*投资总额*收益期限
            var temp = parseFloat(calc_apr.val()) / 100 / 360 * parseFloat(calc_money.val()) * parseInt(calc_day.val());
            calc_total_money.text(temp.toFixed(2));
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