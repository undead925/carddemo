define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m');
    // 加载mobile公共js
    require('./common');

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    var type = $("#type"), total_count = $("#total_count"), total_page = $("#total_page"), notice_list = $("#notice_list"),
        header = $("#header"), nid = $("#nid");
    $(function () {
        header.find("h1").eq(0).text("详细内容");
        header.find("a").eq(0).attr("href", "/phone/article/article_list/" + nid.val()).html('<i class="qtydfont">&#xe623;</i>返回');

        if (type.val() == "list") {
            if (nid.val() == "media") {
                header.find("h1").eq(0).text("媒体报道");
            } else if (nid.val() == "notice" || nid.val() == "") {
                header.find("h1").eq(0).text("官方公告");
            }
            header.find("a").eq(0).attr("href", "/more.html").html('<i class="qtydfont">&#xe623;</i>返回');

            var cur_page = 2, pages = total_page.val();

            $(window).scroll(function () {
                var marginBot = 0;
                if (document.compatMode === "CSS1Compat") {
                    marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
                } else {
                    marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
                }
                if (marginBot <= 100) {
                    if (cur_page > pages) {
                        return false;
                    }
                    layer.closeAll();
                    layer.open({
                        content: "数据加载中",
                        type: 2,
                        shadeClose: false
                    });
                    $.ajax({
                        url: "/phone/article/article_list/" + nid.val() + "/" + cur_page + "/1/",
                        type: "GET",
                        data: {},
                        dataType: "json",
                        cache: false,
                        async: false,
                        success: function (result) {
                            layer.closeAll();
                            var borrow_list = result.article_list, htmlContent = "", temp = "", class_str = "",
                                cur_date = new Date().Format("yyyy-MM-dd");
                            if (typeof(borrow_list) != "undefined") {
                                var length = borrow_list.length;
                                for (var i = 0; i < length; i++) {
                                    if (cur_date == borrow_list[i].article_info.addtime) {
                                        class_str = " notice-item-new";
                                    } else {
                                        class_str = "";
                                    }
                                    temp = '<a href="/phone/article/article_detail/' + nid.val() + "/" + borrow_list[i].article_info.id + '" class="notice-item' + class_str + '">';
                                    if (nid.val() == "notice") {
                                        temp += '<h2><i class="qtydfont">&#xe664;</i>' + borrow_list[i].article_info.name + '</h2>';
                                    } else {
                                        if (class_str != "") {
                                            temp += '<h2><i class="qtydfont">&#xe664;</i>' + borrow_list[i].article_info.name + '</h2>';
                                        } else {
                                            temp += '<h2>' + borrow_list[i].article_info.name + '</h2>';
                                        }
                                    }
                                    temp += '<p class="note">' + borrow_list[i].article_info.abstract + '<em>more</em></p><time class="time">' + borrow_list[i].article_info.addtime + '</time></a>';
                                    htmlContent += temp;
                                }
                                notice_list.append(htmlContent);
                                cur_page++;
                            }
                        },
                        error: function () {
                            layer.closeAll();
                        }
                    });
                }
            });
        }
    });
});