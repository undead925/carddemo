define(function (require) {
    var $ = require('jquery'), layer = require('layer.m/1.6/layer.m'),
        cur_page = 2, pages = parseInt($("#total_pages").val()), message_list = $("#message_list");

    $(function () {
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
                    url: "/phone/zt/birthday_20160118_message_list/" + cur_page + "/1/",
                    type: "GET",
                    data: {},
                    dataType: "json",
                    cache: false,
                    async: false,
                    success: function (result) {
                        layer.closeAll();
                        var list = result.silver_list.list, length = list.length, htmlContent = '', temp = '';
                        if (length > 0) {
                            for (var i = 0; i < length; i++) {
                                var nick_name = list[i].nick_name;
                                if (nick_name == "" || nick_name == null) {
                                    nick_name = list[i].username;
                                }
                                temp = '<dl><dt>【恭喜#' + nick_name + '#获得1枚银币】<em>' + list[i].addtime + '</em></dt><dd>' + list[i].user_message + '</dd></dl>';
                                htmlContent += temp;
                            }
                            cur_page++;
                            message_list.append(htmlContent);
                        }
                    },
                    error: function () {
                        layer.closeAll();
                    }
                });
            }
        });
    });
});