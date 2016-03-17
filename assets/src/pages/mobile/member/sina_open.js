define(function (require) {
    // 加载jQuery
    var $ = require('jquery'), layer = require('layer.m/1.6/layer.m');
    require("regex");
    require('../common');

    var real_name = $("#real_name"),
        card_id = $("#card_id"),
        sina_open_submit = $("#sina_open_submit"),
        real_name_error = '', card_id_error = "";

    $(function () {
        $("#header h1").text("开通新浪存钱罐");
        $("#header a").eq(0).attr("href", "/phone/account/").html('<i class="qtydfont">&#xe623;</i>返回');

        real_name.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                real_name_error = $(this).attr("nullmsg");
            } else {
                real_name_error = "";
            }
            if (real_name_error != "") {
                show_error(real_name_error, 1);
                return false;
            }
        });

        card_id.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                card_id_error = $(this).attr("nullmsg");
            } else if (!qtyd_regex.card_id_reg(value)) {
                card_id_error = $(this).attr("errormsg");
            } else {
                card_id_error = "";
            }
            if (card_id_error == "") {
                $.ajax({
                    type: "post",
                    url: "/phone/mine/check_saving_pot_allow",
                    cache: false,
                    data: {
                        "card_id": value
                    },
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if (result.code == 1) {
                            card_id_error = "";
                        } else {
                            card_id_error = "该身份证号不允许开通新浪支付存钱罐（可能已经开通）";
                        }
                    }, error: function () {
                        card_id_error = "该身份证号不允许开通新浪支付存钱罐（可能已经开通）";
                    }
                });
            }
            if (card_id_error != "") {
                show_error(card_id_error, 3);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 88 || char_code == 120 || char_code == 110);
        });

        sina_open_submit.click(function () {
            real_name.trigger("blur");
            if (real_name_error != "")
                return false;
            card_id.trigger("blur");
            if (card_id_error != "")
                return false;
            layer.open({
                type: 2,
                shadeClose: false,
                content: "开通中..."
            });
            $.ajax({
                url: "/phone/mine/sina_open",
                data: {
                    "real_name": real_name.val(),
                    "card_id": card_id.val()
                },
                type: "post",
                cache: false,
                dataType: "json",
                success: function (result) {
                    if (result.code == 100000) {
                        layer.closeAll();
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">恭喜，开通成功</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                if (result.activity != "") {
                                    window.location.href = result.activity;
                                    return false;
                                }
                                window.location.href = "/phone/mine/novice_packs";
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
                        show_error("开通失败，失败原因：" + result.msg, 3);
                        return false;
                    }
                }, error: function () {
                    show_error("开通失败", 1);
                    return false;
                }
            });
        });

        layer.closeAll();
    });

    $('#j-user-protocol').click(function () {
        var protocol = layer.open({
            type: 1,
            content: '<div class="protocol-head">存钱罐服务协议</div><div class="protocol-cont" style="height:' + document.documentElement.clientHeight + 'px; box-sizing: border-box;"><div id="user-protocol" style="overflow: auto; height:100%; "></div></div><div class="protocol-foot"><button class="btn-primary closediy">同意</button></div>',
            style: 'width:100%; overflow:auto; height:' + document.documentElement.clientHeight + 'px;',
            success: function (olayer) {
                var cla = 'getElementsByClassName';
                olayer[cla]('closediy')[0].onclick = function () {
                    layer.close(protocol)
                }
            }
        });
        $("#user-protocol").load("/welcome/saving_pot_service_protocol_box");
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
