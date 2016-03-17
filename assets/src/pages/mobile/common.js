define(function (require) {
    var $ = require('jquery');

    $("#icon-primary-nav").click(function () {
        if ($(".primary-nav-group").css("display") == "none") {
            $(".primary-nav-group").slideDown();
        }
        else {
            $(".primary-nav-group").slideUp();
        }
    });
    $("#m").bind("click", function (e) {
        var tar = $(e.target);
        if (tar.attr("id") != "icon-primary-nav") {
            $(".primary-nav-group").slideUp();
        }
    });
});
