define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),
        common = require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    module.exports = {
        del_bank: function (bank_id) {
            if (bank_id > 0) {
                layer.open({
                    content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">确定要删除此银行卡么?</p></div>',
                    btn: ['确定', '取消'],
                    shadeClose: false,
                    style: 'min-width:300px;',
                    yes: function () {
                        layer.closeAll();
                        layer.open({
                            type: 2,
                            shadeClose: false,
                            content: '删除中...'
                        });
                        $.ajax({
                            url: "/phone/account/del_bank/" + bank_id,
                            type: "GET",
                            cache: false,
                            data: {},
                            dataType: "json",
                            success: function (result) {
                                if (result.code == 100000) {
                                    layer.closeAll();
                                    layer.open({
                                        content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">删除成功</p></div>',
                                        btn: ['好'],
                                        style: 'min-width:300px;',
                                        shadeClose: false,
                                        yes: function () {
                                            window.location.reload();
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
                                    show_error("删除失败，失败原因：<br>" + result.msg, 3);
                                    return false;
                                }
                            },
                            error: function () {
                                show_error("抱歉，删除失败", 1);
                                return false;
                            }
                        });
                    }, no: function () {
                    }
                });
            } else {
                show_error("无此银行卡", 1);
                return false;
            }
        }
    };

    $(function () {
        $("#header").html('<a href="/phone/account/" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
            '<h1 class="primary-title">银行卡列表</h1>' +
            '<a href="/phone/account/bank_add" class="a-right-link"><i class="qtydfont">&#xe62d;</i></a>');

        $(".btn-delete").each(function () {
            $(this).click(function () {
                module.exports.del_bank($(this).attr("data"));
            });
        });

        $('#j-bank-add').click(function () {
            window.location.href = '/phone/account/bank_add';
            return false;
        });

        $("a[name='open_quick_pay_a']").each(function () {
            $(this).click(function () {
                var id = $(this).attr("data");
                return open_quick_pay(id);
            });
        });

        layer.closeAll();
    });

    function open_quick_pay(bank_id) {
        var update_start_time = $("#bank_update_start_time_" + bank_id),
            update_end_time = $("#bank_update_end_time_" + bank_id),
            update_channel = $("#bank_update_channel_" + bank_id);

        if (update_start_time.val() != "" && update_end_time.val() != "" && update_channel.val().indexOf("quick_bind") > -1) {
            var start_date = new Date(update_start_time.val()).getTime(),
                end_date = new Date(update_end_time.val()).getTime(),
                now = new Date().getTime();

            if (start_date <= now && end_date >= now) {
                layer.closeAll();
                layer.open({
                    content: '该行于' + update_start_time.val() + '至' + update_end_time.val() + '进行系统升级，请稍后再试！',
                    btn: ['知道了'],
                    shadeClose: false
                });
                return false;
            }
        }

        window.location.href = "/phone/account/bank_add2/" + bank_id + "?add_type=1";
        return false;
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