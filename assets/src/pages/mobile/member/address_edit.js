define(function (require, exports, module) {
    // 加载jQuery
    var $ = require('jquery');

    // 加载layerm
    var layer = require('layer.m/1.6/layer.m');
    require('../common');
    require("area");
    require('regex');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    /**
     * 删除银行卡
     * @param id
     */
    function del_address(id) {
        if (id > 0) {
            layer.closeAll();
            layer.open({
                content: '<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">确定要删除此地址么?</p></div>',
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
                        url: "/phone/mine/del_address/" + id,
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
                                        window.location.href = "/phone/mine/address";
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
            show_error("抱歉，无此地址", 1);
        }
    }

    var address_id = $("#address_id"),
        user_name = $("#user_name"),
        phone = $("#phone"),
        province_select = $("#province_select"),
        city_select = $("#city_select"),
        zone_select = $("#zone_select"),
        user_address = $("#user_address"),
        cb_default = $("#cb_default"),
        btnSubmit = $("#btnSubmit"),
        user_name_error = '', phone_error = '', user_address_error = '',
        area_id = $("#area_id");

    $(function () {
        var title = "新增地址";
        $("#header").html('<a href="/phone/mine/address" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
            '<h1 class="primary-title">' + title + '</h1>');
        if (parseInt(area_id.val()) > 0) {
            title = "修改地址";
            $("#header").html('<a href="/phone/mine/address" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>' +
                '<h1 class="primary-title">' + title + '</h1>' +
                '<a href="javascript:void(0);" id="del_a" class="a-right-link">删除</a>');

            $("#del_a").bind("click", function () {
                del_address(address_id.val());
                return false;
            });
        }

        get_area(area_id.val());

        province_select.change(function () {
            get_area($(this).val());
        });

        city_select.change(function () {
            get_area(province_select.val() + "_" + $(this).val());
        });

        user_name.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                user_name_error = "收件人不能为空";
            } else {
                user_name_error = "";
            }
            if (user_name_error != "") {
                show_error(user_name_error, 1);
                return false;
            }
        });

        phone.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                phone_error = "请输入收件人联系电话";
            } else if (!qtyd_regex.phone(value)) {
                phone_error = "收件人联系电话格式错误";
            } else {
                phone_error = '';
            }
            if (phone_error != "") {
                show_error(phone_error, 1);
                return false;
            }
        }).keydown(function (e) {
            var char_code = e.charCode ? e.charCode : e.keyCode;
            return ((char_code >= 48 && char_code <= 57) || (char_code >= 96 && char_code <= 105) || char_code == 8 || char_code == 46 || char_code == 39 || char_code == 37 || char_code == 9);
        });

        user_address.blur(function () {
            var value = $(this).val();
            if ($.trim(value) == "") {
                user_address_error = "请输入收件人详细地址";
            } else {
                user_address_error = "";
            }
            if (user_address_error == "") {
                $.ajax({
                    url: "/utils/get_value_length",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "str": value
                    },
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data.length > 150) {
                            user_address_error = "收货地址为150个字符或者50个汉字";
                            show_error(user_address_error, 1);
                            return false;
                        } else {
                            user_address_error = "";
                        }
                    }
                });
            } else {
                show_error(user_address_error, 1);
                return false;
            }
        });

        btnSubmit.click(function () {
            user_name.trigger("blur");
            if (user_name_error != "") {
                return false;
            }
            phone.trigger("blur");
            if (phone_error != "") {
                return false;
            }
            user_address.trigger("blur");
            if (user_address_error != "") {
                return false;
            }
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: "数据提交中..."
            });
            $.ajax({
                url: "/phone/mine/address_edit",
                type: "POST",
                data: {
                    "address_id": address_id.val(),
                    "user_name": user_name.val(),
                    "action": parseInt(address_id.val()) > 0 ? "update" : "add",
                    "user_mobile": phone.val(),
                    "user_address": user_address.val(),
                    "area_id": province_select.val() + "_" + city_select.val() + "_" + zone_select.val(),
                    "address_default": cb_default.prop("checked") ? 1 : 0
                },
                cache: false,
                dataType: "json",
                success: function (json) {
                    if (json.code == 100000) {
                        layer.closeAll();
                        var _content = "";
                        if (parseInt(address_id.val()) > 0) {
                            _content = '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">更新地址成功</p></div>';
                        } else {
                            _content = '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">添加地址成功</p></div>';
                        }
                        layer.open({
                            content: _content,
                            shadeClose: false,
                            style: 'min-width:300px;',
                            btn: ['好'],
                            yes: function () {
                                window.location.href = "/phone/mine/address";
                                return false;
                            }
                        });
                    } else if (json.code >= 110023 && json.code <= 110026) {
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
                    } else if (json.code == 930019) { //新浪异常
                        window.location.href = "/phone/error/sina_error";
                        return false;
                    } else {
                        show_error("抱歉，操作失败，原因：" + json.msg);
                        return false;
                    }
                }, error: function () {
                    show_error("抱歉，操作失败，请重新尝试", 1);
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