define(function (require) {
    // 加载jQuery
    var $ = require('jquery'), qrcode = require("jquery.qrcode.min"), layer_m = require('layer.m/1.6/layer.m'), reward_success = $("#reward_success"), card_type = $("#card_type"), reward_dialog = $("#reward_dialog"),
        reward_dialog_close = $("#reward_dialog_close"), reward_tips = $("#reward_tips"), reward_username = $("#reward_username"), reward_nick_name = $("#reward_nick_name"),
        btnSubmit = $("#btnSubmit"), user_message = $("#user_message"), look_gold = $("#look-gold"), render_code = $("#render_code"), render_code_content = $("#render_code_content"),
        words_length = $("#words_length"), device_port = $("#device_port"), cur_index, user_id = $("#user_id"), address_default = $("#address_default");

    if ($.trim(card_type.val()) == "") {
        layer_m.closeAll();
        cur_index = layer_m.open({
            type: 2,
            shadeClose: false,
            content: '加载中...'
        });
    }

    $(function () {
        if ($.trim(card_type.val()) != "") {
            if (reward_success.val() == 1) {  //领取成功
                if (reward_nick_name.val() != "") {
                    reward_tips.html('恭喜您帮<span>#' + reward_nick_name.val() + '#</span>打开红包，周年庆更多好礼等您来拆。');
                } else {
                    reward_tips.html('恭喜您帮<span>#' + reward_username.val() + '#</span>打开红包，周年庆更多好礼等您来拆。');
                }
            } else if (reward_success.val() == 2) { //已获得红包
                reward_tips.text("您的好友已经获取到红包了哦！");
            } else if (reward_success.val() == 3) {
                reward_tips.text("好可惜，活动结束了呢！");
                $("#a_birthday").hide();
            } else if (reward_success.val() == -1) {
                reward_tips.text("抱歉，红包拆开失败！");
            } else {
                reward_tips.html('');
            }
            if (reward_tips.html() != "") {
                var dialogShareSucceed = layer_m.open({
                    type: 1,
                    shadeClose: false,
                    content: reward_dialog.html(),
                    style: 'box-shadow: none; border-radius: 0;',
                    success: function (olayer) {
                        var cla = 'getElementsByClassName';
                        olayer[cla]('btn-primary')[0].onclick = function () {
                            layer_m.close(dialogShareSucceed);
                        }
                    }
                });
            }
        } else {
            if (parseInt(user_id.val()) > 0 && parseInt(address_default.val()) <= 0) { //已登录但无默认地址
                layer_m.open({
                    content: '<div class="tac"><p class="c-999 mt5">奖品会自动发货至默认地址，快去设置哦~</p></div>',
                    btn: ['去设置'],
                    style: 'min-width:300px;',
                    shadeClose: false,
                    yes: function () {
                        window.location.href = '/phone/mine/address?device_port=' + device_port.val();
                        return false;
                    }
                });
            }
        }

        if (render_code_content.val() != undefined && render_code_content.val() != "") {
            //显示二维码
            var render_type = "";
            if ('undefined' == typeof(document.body.style.maxHeight)) {
                render_type = "table";
            } else {
                render_type = "canvas";
            }
            var render_img = '/favicon.ico';
            if (render_code_content.val().toString().indexOf('anniversary') > -1) {
                render_img = '/assets/dist/images/moblie/reward.png';
            }
            render_code.qrcode({
                render: render_type,
                width: 148,
                height: 148,
                correctLevel: 0,
                text: render_code_content.val(),
                src: render_img
            });
        }
        /**
         * 一重礼说明
         */
        $("#get-explain").click(function () {
            var dialogShare = layer_m.open({
                type: 1,
                shadeClose: false,
                content: '<div class="explain-dialog"><img src="/assets/dist/topic/birthday/images/get_explain.png"><ol><li>1月19日11点公布中奖名单；</li><li>公布名单后，小祺将在7个工作日内安排纪念币发放；</li><li>纪念币将按照默认收货地址发放，如需修改，请联系客服并提供订单号。</li></ol><a class="btn-primary btn-closediy">知道了</a></div>',
                style: 'box-shadow: none; border-radius: 0;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('btn-closediy')[0].onclick = function () {
                        layer_m.close(dialogShare);
                    }
                }
            });
        });
        /**
         * 二重礼说明
         */
        $("#reward-split").click(function () {
            var dialogShare = layer_m.open({
                type: 1,
                shadeClose: false,
                content: '<div class="explain-dialog"><img src="/assets/dist/topic/birthday/images/get_explain.png"><ol><li>活动结束后，小祺将在7个工作日内安排纪念币发放；</li><li>纪念币将按照默认收货地址发放，如需修改，请联系客服并提供订单号。</li></ol><a class="btn-primary btn-closediy">知道了</a></div>',
                style: 'box-shadow: none; border-radius: 0;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('btn-closediy')[0].onclick = function () {
                        layer_m.close(dialogShare);
                    }
                }
            });
        });
        /**
         * 第三重礼领奖说明
         */
        $("#reward-explain").click(function () {
            var dialogShareSucceed = layer_m.open({
                type: 1,
                shadeClose: false,
                content: '<div class="explain-dialog"><img src="/assets/dist/topic/birthday/images/reward_explain.png"><ol><li>红包使用时间：1月19日-1月22日；</li><li>红包领取说明：祺友成功投资获得二维码后，需邀请好友扫描，即可拆开红包，每个用户仅限一次。</li></ol><a class="btn-primary btn-closediy">知道了</a></div>',
                style: 'box-shadow: none; border-radius: 0;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('btn-closediy')[0].onclick = function () {
                        layer_m.close(dialogShareSucceed);
                    }
                }
            });
        });

        $(".qtyd-recommend-info").click(function () {
            window.location.href = '/phone/zt/birthday_20160118_message_list?device_port=' + device_port.val();
            return false;
        });

        $("a.btn-more").click(function () {
            if (look_gold.hasClass("ellipsis")) {
                look_gold.removeClass("ellipsis");
                $(this).html("收起&gt;&gt;");
            } else {
                look_gold.addClass('ellipsis');
                $(this).html("查看全文&gt;&gt;");
            }
        });

        user_message.bind("input propertychange", function () {
            var retainLength = 200 - $(this).val().length;
            if (retainLength < 0) {
                words_length.text("0");
                $(this).val($(this).val().substr(0, 200));
                return false;
            } else {
                words_length.text(retainLength);
            }
        }).blur(function () {
            if ($.trim($(this).val()) == "") {
                show_error("请输入话题，有机会赢得1枚金币哦", 2);
                return false;
            }
        });

        btnSubmit.click(function () {
            if ($.trim(user_message.val()) == "") {
                show_error("请输入话题，有机会赢得1枚金币哦", 2);
                return false;
            }
            $(this).attr("disabled", "disabled").text("发布中");
            $.ajax({
                url: "/phone/zt/birthday_20160118_messageDo",
                type: "POST",
                dataType: "JSON",
                data: {
                    "message": user_message.val(),
                    "device_port": device_port.val()
                },
                cache: false,
                success: function (result) {
                    if (result.code == 10000) {
                        layer_m.closeAll();
                        layer_m.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">话题发布成功</p></div>',
                            btn: ['好'],
                            style: 'min-width:300px;',
                            shadeClose: false,
                            yes: function () {
                                window.location.reload(true);
                                return false;
                            }
                        });
                    } else if (result.code == 51004) {
                        show_error("请您先登录", 2);
                        window.location.href = "/phone/user/login.html?refer=/activity/anniversary.html";
                    } else {
                        show_error(result.msg, 3);
                        btnSubmit.removeAttr("disabled").text("发布");
                    }
                    return false;
                }
            });
        });

        if ($.trim(card_type.val()) == "") {
            if (parseInt(user_id.val()) > 0 && parseInt(address_default.val()) <= 0) {

            } else {
                layer_m.closeAll(cur_index);
            }
        }
    });
    /**
     * 显示错误信息
     * @param msg
     * @param timeout
     */
    function show_error(msg, timeout) {
        layer_m.closeAll();
        layer_m.open({
            content: msg,
            type: 1,
            style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
            shadeClose: false,
            shade: false,
            time: timeout
        });
    }
});