define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),
        common = require('../common'),
        is_old_data = $("#is_old_data"),
        phone = $("#phone");

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    $(function () {
        $("#header h1").text(phone.val());

        $('#j-total-rate').click(function () {
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">加权收益率综合计算了您过往的每笔投资收益和红包利益。</p></div>',
                style: 'font-size: 14px; min-width:300px;',
                shadeClose: false,
                btn: ['知道了']
            });
        });
        if (is_old_data.val() == 1) {
            layer.closeAll();
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">您还有资金未迁移到新浪存钱罐，是否跳转到网页端进行迁移？</p></div>',
                btn: ['好', '暂时不'],
                style: 'min-width:300px;',
                shadeClose: false,
                no: function () {

                },
                yes: function () {
                    window.location.href = "/phone/mine/sina_cash_move";
                    return false;
                }
            });
        }

        layer.closeAll();
    });
});