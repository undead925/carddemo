define(function (require) {
    // 加载jQuery
    var $ = require('jquery'), asPieProgress = require('asPieProgress'), common = require('../common');

    $(document).bind("click", function (e) {
        var tar = $(e.target);
        if (tar.attr("id") != "j-project-nav") {
            $(".project-nav").slideUp();
            $("#j-project-nav").children().html('&#xe61f;');
        }
    });

    $(function () {
        $(".project-progress").asPieProgress({
            namespace: 'pieProgress'
        }).asPieProgress("go", '60');

        $(".p-item-progress .pie_progress").asPieProgress({
            namespace: 'pieProgress'
        }).asPieProgress("go", '60');

        $("#j-project-nav").click(function () {
            if ($(".project-nav").css("display") == "none") {//隐藏
                $(".project-nav").slideDown();
                $("#j-project-nav").children().html('&#xe62e;');
            }
            else {
                $(".project-nav").slideUp();
                $("#j-project-nav").children().html('&#xe61f;');
            }
        });
    });
});