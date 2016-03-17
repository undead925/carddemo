define(function (require) {
    function get_full_path() {
        //获取地址的全路径，如： http://localhost:8080/project/request/index.php
        return window.document.location.href;
    }

    function get_request_path() {
        //获取主机地址之后的目录，如： /project/request/index.php
        return window.document.location.pathname;
    }

    function get_project_root_path() {
        //获取项目根路径，如： http://localhost:8080
        return get_full_path().substring(0, get_full_path().indexOf(get_request_path()));
    }

    // 加载jQuery
    var $ = require('jquery'), regex = require("regex"),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('../common');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });
    // 加载微信分享
    var wx = require('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');

    var timestamp = "", nonceStr = "", signature = "", appid = "",
        share_url = encodeURIComponent(get_project_root_path() + "/topic/travel.html"),
        share_title = "祺天优贷邀您免费旅行 报名火热进行中", share_content = "您旅行我买单，五条旅游线路投票就送红包！跟着小祺免费去旅行吧！",
        share_img_url = get_project_root_path() + '/assets/dist/topic/return_banquet/images/return_banquet_2016.jpg';
    $.ajax({
        url: "/phone/weixin/getShareInfo?url=" + encodeURIComponent(get_full_path()),
        async: false,
        dataType: 'json',
        success: function (data, status) {
            nonceStr = data.random;
            timestamp = data.timestamp;
            signature = data.signature;
            appid = data.appid;
            registerWeiXin();
        },
        error: function (data, status, e) {
            alert(e);//弹出错误信息
        }
    });

    function registerWeiXin() {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ]
        });
    }

    var enurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + share_url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

    wx.ready(function () {
        wx.hideAllNonBaseMenuItem();
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareAppMessage({
            title: share_title,
            desc: share_content,
            link: enurl,
            imgUrl: get_project_root_path() + '/assets/dist/topic/return_banquet/images/return_banquet_2016.jpg',
            trigger: function (res) {

            },
            success: function (res) {
                alert('分享成功');
            },
            cancel: function (res) {
                alert('您取消了分享');
            },
            fail: function (res) {

            }
        });
        wx.onMenuShareTimeline({ //分享到朋友圈
            title: share_title,
            desc: share_content,
            link: enurl,
            imgUrl: get_project_root_path() + '/assets/dist/topic/return_banquet/images/return_banquet_2016.jpg',
            trigger: function (res) {
            },
            success: function (res) {
                alert('分享成功');
                window.location.href = "/topic/travel.html?device_port=" + Obj.device_port + "&redis_key=" + Obj.redis_key;
                return false;
            },
            cancel: function (res) {
                alert('您取消了分享');
            },
            fail: function (res) {
            }
        });
    });

    var Obj = {
        user_id: parseInt($("#user_id").val()),
        device_port: $("#device_port").val(),
        redis_key: $("#redis_key").val(),
        a_apply: $("#a_apply"),
        is_vote: parseInt($("#is_vote").val()),
        is_sign_up: parseInt($("#is_sign_up").val()),
        tour_items: $("li.tour-item"),
        route_id: parseInt($("#route_id").val()),
        real_name: $("#realname"),
        start_origin: $("#start_origin"),
        contact_phone: $("#contact_phone"),
        sign_up_a: $("#sign_up_a"),
        user_tendered: parseInt($("#user_tendered").val()),
        url: "/phone/user/login.html?&device_port=" + $("#device_port").val() + "&redis_key=" + $("#redis_key").val() + "&refer=" + window.location.href,
        show_layer: function (msg, btn_text, type) {
            var _self = this, class_str = "tips-info-line";
            if (type == "share" || type == "home" || type == "sign_up") {
                class_str = "tips-info";
            }
            layer.closeAll();
            var layerOpen = layer.open({
                type: 1,
                shadeClose: false,
                content: '<div class="tips-layer"><img src="/assets/dist/topic/return_banquet/images/layer_info_bg.png"><div class="' + class_str + '">' + msg + '</div><a href="javascript:;" class="btn-layer">' + btn_text + '</a><div></div></div>',
                style: ' max-width: 560px; min-width:300px; background-color: transparent; box-shadow:none;',
                success: function (olayer) {
                    var cla = 'getElementsByClassName';
                    olayer[cla]('btn-layer')[0].onclick = function () {
                        if (type == "reload") {
                            window.location.reload(true);
                        } else if (type == "invest") {
                            if (_self.device_port.toString().toLowerCase() == "ios" || _self.device_port.toString().toLowerCase() == "android") {
                                window.location.href = "app:borrow_list";
                            } else {
                                window.location.href = "/phone/borrow/borrow_list";
                            }
                        } else if (type == "login") {
                            if (_self.device_port.toString().toLowerCase() == "ios" || _self.device_port.toString().toLowerCase() == "android") {
                                window.location.href = "app:login";
                            } else {
                                window.location.href = _self.url;
                            }
                        } else if (type == "share") {
                            if (_self.device_port.toString().toLowerCase() == "ios" || _self.device_port.toString().toLowerCase() == "android") {
                                window.location.href = 'app:share:{"title":"' + share_title + '","content":"' + share_content + '","img":"' + share_img_url + '","url":"' + share_url + '","type":["wxtimeline"]}';
                            } else {
                                _self.weixin_share();
                            }
                        } else if (type == "index") {
                            window.location.href = "/topic/travel.html?device_port=" + _self.device_port + "&redis_key=" + _self.redis_key;
                        } else if (type == "home") {
                            window.location.href = "app:home";
                        } else if (type == "sign_up") {
                            if (_self.user_tendered > 0) {
                                window.location.href = "/phone/zt/return_banquet_2016_sign_up?device_port=" + _self.device_port + "&redis_key=" + _self.redis_key;
                            } else {
                                _self.show_layer("投资一次，即可报名！", "去投资", "invest");
                            }
                        }
                        else {
                            layer.close(layerOpen);
                        }
                        return false;
                    }
                }
            });
        }, show_error: function (msg, timeout) {
            layer.closeAll();
            layer.open({
                content: msg,
                type: 1,
                style: 'padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;',
                shadeClose: false,
                shade: false,
                time: timeout
            });
        },
        close_layer: function () {
            layer.closeAll();
        },
        login: function () {
            this.show_layer("投票赢红包！", "登录", "login");
        }, vote: function (obj, route_id) { //投票
            var _self = this;
            Obj.close_layer();
            layer.open({
                type: 2,
                shadeClose: false,
                content: '数据处理中...'
            });
            $.ajax({
                url: "/phone/zt/travel_vote",
                data: {
                    "route_id": route_id
                }, type: "POST", dataType: "JSON", cache: false,
                success: function (result) {
                    Obj.close_layer();

                    if (result.code == 10000) {
                        var _text = "0";
                        if (result.reward_info != undefined) {
                            _text = result.reward_info.reward_amount;
                        }
                        _self.show_layer("投票成功！<br/>您已赢得" + _text + "元红包券！", "去报名", "sign_up");
                    } else if (result.code == 51004) {
                        _self.show_layer("请您先登录！", "登录", "login");
                    } else {
                        _self.show_error(result.msg, 3);
                    }
                }
            });
        }, sign_up: function () { //报名
            var _self = this;
            if ($.trim(_self.real_name.val()) == "") {
                _self.show_error("请输入真实姓名", 1);
                return false;
            }
            if ($.trim(_self.start_origin.val()) == "") {
                _self.show_error("请输入始发地", 1);
                return false;
            }
            if ($.trim(_self.contact_phone.val()) == "") {
                _self.show_error("请输入真实手机号码", 1);
                return false;
            } else if (!qtyd_regex.phone(_self.contact_phone.val())) {
                _self.show_error("手机号码格式错误", 1);
                return false;
            }
            Obj.close_layer();
            layer.open({
                type: 2,
                shadeClose: false,
                content: '提交处理中...'
            });
            $.ajax({
                url: "/phone/zt/travel_sign_up",
                data: {
                    "realname": _self.real_name.val(),
                    "start_origin": _self.start_origin.val(),
                    "contact_phone": _self.contact_phone.val()
                }, type: "POST", dataType: "JSON", cache: false,
                success: function (result) {
                    Obj.close_layer();
                    if (result.code == 10000) {
                        if (window.location.href.indexOf("m.qtyd.com") > -1 || window.location.href.indexOf("mm.qtyd.com") > -1 || _self.device_port.toString().toLowerCase() == "ios" || _self.device_port.toString().toLowerCase() == "android") {
                            _self.show_layer("报名成功！<br/>期待4月18日旅行名单公布！", "回到首页", "home");
                        } else {
                            _self.show_layer("报名成功！<br/>期待4月18日旅行名单公布！", "分享到朋友圈", "share");
                        }
                    } else if (result.code == 51004) {
                        _self.show_layer("请您先登录！", "登录", "login");
                    } else {
                        _self.show_error("亲，请按规则填写报名哦！", 2);
                    }
                }
            });
        }, init: function () {
            var _self = this;
            if (_self.user_id <= 0) {
                _self.tour_items.find("a").each(function () {
                    $(this).click(function () {
                        _self.login();
                    });
                });
                _self.a_apply.click(function () {
                    _self.login();
                });
            } else {
                if (_self.is_vote > 0) { //已经投票
                    if (_self.user_tendered <= 0) { //未投资过
                        _self.a_apply.click(function () {
                            _self.show_layer("投资一次，即可报名！", "去投资", "invest");
                        });
                        _self.tour_items.find("a").each(function () {
                            $(this).click(function () {
                                _self.show_layer("投资一次，即可报名！", "去投资", "invest");
                            });
                        });
                    } else {
                        if (_self.is_sign_up > 0) { //已经报名
                            _self.a_apply.click(function () {
                                _self.show_layer("您已经报过名！", "知道了", "close");
                            });
                        } else {
                            _self.tour_items.find("a").each(function () {
                                $(this).click(function () {
                                    if ($(this).hasClass("btn-apply")) {
                                        window.location.href = "/phone/zt/return_banquet_2016_sign_up/" + "?&device_port=" + _self.device_port + "&redis_key=" + _self.redis_key;
                                        return false;
                                    }
                                });
                            });
                            _self.a_apply.click(function () {
                                window.location.href = "/phone/zt/return_banquet_2016_sign_up/?&device_port=" + _self.device_port + "&redis_key=" + _self.redis_key;
                                return false;
                            });
                        }
                    }
                } else {
                    _self.tour_items.find("a").each(function () {
                        $(this).click(function () {
                            _self.vote($(this), $(this).attr("data"));//投票
                        });
                    });
                    _self.a_apply.click(function () {
                        _self.show_layer("请先投票，再报名！", "知道了", "");
                    });
                }
            }
            _self.contact_phone.keydown(function (e) {
                var char_code = e.charCode ? e.charCode : e.keyCode;
                return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 110);
            });
            _self.sign_up_a.on("click", function () {
                _self.sign_up();
            });
        }, weixin_share: function () {
            this.show_layer("点击右上角，分享到朋友圈", "知道了", "index");
        }
    };
    $(function () {
        Obj.init();
        Obj.close_layer();
    });
});