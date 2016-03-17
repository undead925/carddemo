define(function (require, exports, module) {
    var jQuery = require('jquery'), regex = require("regex"),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('../common'),
        webuploader = require('webuploader/webuploader');

    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });
    var Obj = {
        nick_name: $("#nick_name"),
        income: $("#income"),
        education: $("#education"),
        professional: $("#professional"),
        marry: $("#marry"),
        child: $("#child"),
        linkman: $("#linkman"),
        phone: $("#phone"),
        yanglao: $("#yanglao"),
        renshou: $("#renshou"),
        id_address: $("#id_address"),
        address: $("#address"),
        header: $("#header"),
        is_error: false,
        img_url: $("#img_url"),
        file_size: 3072 * 102400,//文件3M
        thumbnailWidth: 30,
        thumbnailHeight: 30,
        init: function () {
            var _self = this;
            _self.linkman.blur(function () {
                if ($.trim($(this).val()) != "") {
                    $.ajax({
                        url: "/phone/mine/check_link_man",
                        data: {
                            "link_man": _self.linkman.val()
                        },
                        type: "POST",
                        dataType: "JSON",
                        cache: false,
                        success: function (result) {
                            if (result.code == 10000) {
                                _self.is_error = false;
                            } else {
                                _self.is_error = true;
                                _self.show_error(result.msg, 1);
                            }
                        }
                    });
                }
            });
            _self.phone.blur(function () {
                if ($.trim($(this).val()) != "") {
                    if (!qtyd_regex.phone($(this).val())) {
                        _self.is_error = true;
                        _self.show_error("紧急联系人手机号码格式错误", 1);
                        return false;
                    } else {
                        $.ajax({
                            url: "/phone/mine/check_link_phone",
                            type: "POST",
                            data: {
                                "link_phone": _self.phone.val()
                            },
                            dataType: "JSON",
                            cache: false,
                            success: function (result) {
                                if (result.code == 10000) {
                                    _self.is_error = false;
                                } else {
                                    _self.is_error = true;
                                    _self.show_error(result.msg, 1);
                                    return false;
                                }
                            }
                        });
                    }
                }
            });
            _self.header.html('<a href="javascript:history.back();" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a><h1 class="primary-title">我的资料</h1><a class="a-right-link" id="btnSave" href="javascript:;">保存</a>');
            $("#btnSave").click(function () {
                _self.linkman.trigger("blur");
                if (_self.is_error) {
                    return false;
                }
                _self.phone.trigger("blur");
                if (_self.is_error) {
                    return false;
                }
                _self.on_save();
            });
            //上传图片插件背景
            $(".webuploader-pick").css("background-color", "#FFFFFF");
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
        }, on_save: function () {
            layer.closeAll();
            layer.open({
                type: 2,
                shadeClose: false,
                content: '保存中...'
            });
            var _self = this;
            $.ajax({
                url: "/phone/mine/my_info_do",
                type: "POST",
                dataType: "JSON",
                cache: false,
                data: {
                    "nick_name": _self.nick_name.val(),
                    "img_url": _self.img_url.val(),
                    "marriage": _self.marry.val(),
                    "child": _self.child.val(),
                    "yanglao": _self.yanglao.val(),
                    "renshou": _self.renshou.val(),
                    "education": _self.education.val(),
                    "id_address": _self.id_address.val(),
                    "address": _self.address.val(),
                    "income": _self.income.val(),
                    "professional": _self.professional.val(),
                    "linkman": _self.linkman.val(),
                    "link_phone": _self.phone.val()
                },
                success: function (result) {
                    layer.closeAll();
                    if (result.code == 100000) {
                        layer.open({
                            content: '<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">保存成功</p></div>',
                            shadeClose: false,
                            style: 'min-width:300px;',
                            btn: ['好'],
                            yes: function () {
                                window.location.href = "/phone/account/";
                                return false;
                            }
                        });
                    } else {
                        _self.show_layer(result.msg, 2);
                    }
                }, error: function () {
                    _self.show_layer("数据保存异常", 2);
                }
            });
        }
    };

    var options = {
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '/assets/dist/lib/webuploader/Uploader.swf',
        // 文件接收服务端。
        server: $("#base_url").val() + '/phone/mine/my_info_image_upload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: {
            id: $("#litpic"),
            multiple: false
        },
        chunkRetry: 3,//网络错误，允许自动重传3次
        threads: 1,//上传并发数。允许同时最大上传进程数
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        sendAsBinary: false,
        fileSizeLimit: Obj.file_size //默认3M
    };

    var uploader = WebUploader.create(options);
    //图片上传完毕，获取服务器返回值
    uploader.on("uploadAccept", function (obj, ret) {
        if (ret.code == 10000) {
            $("#litpic").find("img").eq(0).attr("src", $("#pic_url").val() + ret.image);
            $("#img_url").val(ret.image);
        } else {
            Obj.show_error(ret.msg, 2);
        }
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        layer.closeAll();
        layer.open({
            type: 2,
            shadeClose: false,
            content: '当前上传' + percentage * 100 + '%'
        });
    });
    //文件开始上传之前(选择文件后)
    uploader.on("beforeFileQueued", function (file) {
        if (options.fileSizeLimit < file.size) {
            Obj.show_error("头像文件超过限制（3M以内）", 2);
            return false;
        }
    });
    //文件上传完成
    uploader.on('uploadComplete', function (file) {
        layer.closeAll();
    });
    $(function () {
        Obj.init();
        layer.closeAll();
    });
});