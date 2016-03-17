define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m');

    require("regex");

    require("area");

    require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var bank_add_submit = $("#bank_add_submit"),
        province_select = $("#province_select"),
        city_select = $("#city_select"),
        bank_code = $("#bank_code"),
        bank_account = $("#bank_account"),
        refer = $("#refer"),
        bank_account_error = "", phone_no_error = "", valid_code_error = "",
        phone_no = $("#phone_no"),
        valid_code = $("#valid_code"),
        open_quick_submit = $("#open_quick_submit"),
        btnSendSms = $("#btnSendSms"),
        record_no = $("#record_no"),
        add_type = $("#add_type"),
        bank_limit = $("#bank_limit"),
        bankLimits = "";

    $(function () {
        if (typeof(bank_limit.val()) != "undefined" && bank_limit.val() != "") {
            bankLimits = $.parseJSON(bank_limit.val());
            bank_code.change(function () {
                var value = $(this).val();
                if (value.length > 0) {
                    for (var i = 0; i < bankLimits.length; i++) {
                        var update_start_time = bankLimits[i].bank_info.update_start_time,
                            update_end_time = bankLimits[i].bank_info.update_end_time,
                            bank_channel = bankLimits[i].bank_info.bank_channel;

                        if (bankLimits[i].bank_info.bank_code == value) {
                            if (update_start_time != "" && update_end_time != "" && (containsStr(bank_channel, '|', "quick_bind") || containsStr(bank_channel, '|', "bank_bind"))) {
                                var start_date = new Date(update_start_time).getTime(),
                                    end_date = new Date(update_end_time).getTime(),
                                    now = new Date().getTime();

                                if (start_date <= now && end_date >= now) {
                                    layer.closeAll();
                                    layer.open({
                                        content: '该行于' + update_start_time + '至' + update_end_time + '进行系统升级，请稍后再试！',
                                        btn: ['知道了'],
                                        shadeClose: false
                                    });
                                    bank_code.val("");
                                    return false;
                                }
                            }
                        }
                    }
                }
            });
        }
        if (add_type.val() == 1 || add_type.val() == 2) {
            $("#header h1").text("开通快捷卡");
        }
        else {  //添加银行卡第一步
            $("#header h1").text("添加银行卡");
        }

        $("#header a").eq(0).attr("href", "/phone/account/bank_list").html('<i class="qtydfont">&#xe623;</i>返回');

        get_area(0);

        province_select.change(function () {
            var area_id = $(this).children("option:selected").val();
            var data = "area_id=" + area_id;
            $.ajax({
                url: "/async/area_non_tree",
                cache: false,
                dataType: "json",
                data: data,
                type: "POST",
                success: function (json) {
                    bind_area(json);
                }
            });
        });

        bank_account.blur(function () {
            var value = $(this).val();
            if (!qtyd_regex.bank_account(value)) {
                bank_account_error = "银行卡号格式错误";
            }
            else
                bank_account_error = "";

            if (bank_account_error != "") {
                show_error(bank_account_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });

        bank_add_submit.click(function () {
            if (bank_code.val() == "") {
                show_error("请选择所属银行", 1);
                return false;
            }
            bank_account.trigger("blur");
            if (bank_account_error != "") {
                show_error(bank_account_error, 1);
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "数据处理中..."
            });
            $.ajax({
                url: "/phone/account/bank_add",
                type: "POST",
                cache: false,
                data: {
                    "bank_code": bank_code.val(),
                    "bank_account": bank_account.val(),
                    "province_id": province_select.val(),
                    "city_id": city_select.val(),
                    "refer": refer.val()
                },
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        window.location.href = result.redirect_url;
                        return false;
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
                        show_error("添加银行卡失败，失败原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("添加失败", 1);
                    return false;
                }
            });
        });

        phone_no.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                phone_no_error = $(this).attr("nullmsg");
            } else if (!qtyd_regex.phone(value)) {
                phone_no_error = $(this).attr("errormsg");
            } else {
                phone_no_error = "";
            }
            if (phone_no_error != "") {
                show_error(phone_no_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
        });

        valid_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                valid_code_error = $(this).attr("nullmsg");
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
            phone_no.trigger("blur");
            if (phone_no_error != "") {
                show_error(phone_no_error, 1);
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "短信发送中..."
            });
            $.ajax({
                url: "/phone/account/bank_add2_send_sms",
                type: "POST",
                data: {
                    "phone_no": phone_no.val(),
                    "record_no": record_no.val()
                },
                dataType: "json",
                cache: false,
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
                        show_error("发送验证码失败，原因：<br>" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("发送验证码失败", 1);
                    return false;
                }
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
            $("#user-protocol").load("/welcome/sina_pay_service_protocol_box");
        });

        /**
         * 开通快捷支付
         */
        open_quick_submit.click(function () {
            phone_no.trigger("blur");
            if (phone_no_error != "") {
                show_error(phone_no_error, 1);
                return false;
            }
            valid_code.trigger("blur");
            if (valid_code_error != "") {
                show_error(valid_code_error, 1);
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "数据提交中..."
            });
            $.ajax({
                url: "/phone/account/bank_add2",
                type: "POST",
                data: {
                    "phone_no": phone_no.val(),
                    "record_no": record_no.val(),
                    "valid_code": valid_code.val(),
                    "refer": refer.val()
                },
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        var _content = "";
                        if (add_type.val() == 1) {
                            _content = '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">开通快捷卡成功</p></div>';
                        } else {
                            _content = '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">添加快捷卡成功</p></div>';
                        }
                        layer.open({
                            content: _content,
                            shadeClose: false,
                            style: 'min-width:300px;',
                            btn: ['充值', '查看'],
                            yes: function () {
                                window.location.href = "/phone/account/recharge";
                                return false;
                            }, no: function () {
                                window.location.href = "/phone/account/bank_list";
                                return false;
                            }
                        });
                    } else if (result.code == 900004 || result.code == 930016) { //重新发送验证码
                        record_no.val(result.record_no);

                        show_error(result.msg, 3);
                        if (hand)
                            clearInterval(hand);
                        t = 120;
                        hand = setInterval(function () {
                            btnSendSms.attr("disabled", true).text(t + "秒后重新发送").addClass("disabled");
                            t -= 1;
                            if (t < 0) {
                                btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                                clearInterval(hand);
                                t = 120;
                            }
                        }, 1000);
                        return false;
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
                        show_error("开通快捷支付失败，原因：" + result.msg, 3);
                        if (hand)
                            clearInterval(hand);
                        btnSendSms.attr("disabled", false).text("短信验证码").removeClass("disabled");
                        clearInterval(hand);
                        t = 120;
                        return false;
                    }
                }, error: function () {
                    show_error("开通快捷支付失败", 1);
                    return false;
                }
            });
        });

        layer.closeAll();
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

    function containsStr(source_str, explodeChar, sub_str) {
        if (source_str == '' || explodeChar == '' || sub_str == '')
            return false;
        source_str = source_str.toLocaleString();
        sub_str = sub_str.toLocaleString();

        var arr = source_str.split(explodeChar);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == sub_str) {
                return true;
            }
        }
        return false;
    }
});