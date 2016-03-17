define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m');

    require('../common');

    var img_valid_code = $("#img_valid_code"),
        exchange_code = $("#exchange_code"),
        btnSubmit = $("#btnSubmit"),
        valid_code = $("#valid_code"),
        valid_code_error = "",
        exchange_code_error = "";

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text("红包券兑换");
        $("#header a").eq(0).attr("href", "/phone/account/reward_tickets").html('<i class="qtydfont">&#xe623;</i>返回');

        img_valid_code.click(function () {
            $(this).attr("src", "/admin/verify?_r=" + Math.random());
        });

        valid_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                valid_code_error = "请输入验证码";
            } else {
                valid_code_error = "";
            }
            if (valid_code_error == "") {
                $.ajax({
                    url: "/utils/check_img_valid_code",
                    data: {
                        "valid_code": value
                    },
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (json) {
                        if (json.code != 10000) {
                            valid_code_error = "验证码错误";
                        } else {
                            valid_code_error = "";
                        }
                    }, error: function () {
                        valid_code_error = "验证码错误";
                    }
                });
            }
            if (valid_code_error != "") {
                show_error(valid_code_error, 1);
                return false;
            }
        });
        exchange_code.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                exchange_code_error = "请输入兑换码";
            } else {
                exchange_code_error = "";
            }
            if (exchange_code_error != "") {
                show_error(exchange_code_error, 1);
                return false;
            }
        });
        btnSubmit.click(function () {
            exchange_code.trigger("blur");
            if (exchange_code_error != "") {
                return false;
            }
            valid_code.trigger("blur");
            if (valid_code_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: '兑换中...'
            });
            $.ajax({
                url: "/phone/account/reward_exchange",
                type: "POST",
                data: {
                    "exchange_code": exchange_code.val()
                },
                dataType: "json",
                cache: false,
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">兑换成功</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.href = "/phone/account/reward_tickets";
                                return false;
                            }
                        });
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
                        show_error("兑换失败，失败原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("兑换失败", 1);
                    return false;
                }
            });
        });

        layer.closeAll();
    });

    /**
     * 显示错误信息
     * @param msg
     * @param timeout
     */
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