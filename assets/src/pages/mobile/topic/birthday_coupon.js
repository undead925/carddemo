define(function (require) {
    // 加载jQuery
    var $ = require('jquery'),
        layer = require('layer.m/1.6/layer.m'),//加载弹层
        common = require('../common');

    // 加载微信分享
    var wx = require('weixinshare');

    var url = encodeURIComponent(getProjectRootPath() + "/phone/zt/birthday_coupon" );
    var enurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb064da906d7e2418&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";


    layer.closeAll();
    layer.open({
        type: 2,
        shadeClose: false,
        content: '加载中...'
    });

    var nullAnswerFlag = true;
    $(function () {
        if($("#answer_btn").html() !== "undefined"){
            $("#answer_btn").bind("click", function(){
                var answer = $("#answer").val();
                $("#answer").val("");
                $("#answer").focus();
                //检查用户的输入内容
                if($.trim(answer) === ""){
                    if(nullAnswerFlag){
                        chatme("亲，答案不能为空哦！");
                        nullAnswerFlag = false;
                        $("#answer").blur() ;
                    }
                    return false;
                }
                answer_question(answer);
            })
        }
        $("html,body").animate({scrollTop:$("html")[0].scrollHeight},500);
        
    });


    

    wx.ready(function(){
        
        wx.hideAllNonBaseMenuItem();
        //wx.hideOptionMenu();
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage','menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });
        // wx.hideMenuItems({
        //     menuList: ['menuItem:share:qq','menuItem:share:weiboApp','menuItem:share:facebook','menuItem:share:QZone'
        //     'menuItem:openWithQQBrowser','menuItem:openWithSafari','menuItem:share:email'
        //     ,'menuItem:share:brand'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        // });
        
        wx.onMenuShareAppMessage({
          title: '我的第一次，仅献给您！',
          desc: '领张年化券，理财收益更多咯。',
          link: enurl ,
          imgUrl: getProjectRootPath() + '/assets/dist/topic/coupon/images/wxshare.jpg',
          trigger: function (res) {
            //alert('用户点击发送给朋友');
          },
          success: function (res) {
            alert('分享成功');
          },
          cancel: function (res) {
            alert('您取消了分享');
          },
          fail: function (res) {
            //alert(JSON.stringify(res));
          }
        });

      wx.onMenuShareTimeline({
        title: '我的第一次，仅献给您！',
        desc: '领张年化券，理财收益更多咯。',
        link: enurl,
        imgUrl: getProjectRootPath() + '/assets/dist/topic/coupon/images/wxshare.jpg',
        trigger: function (res) {
          //alert('用户点击分享到朋友圈');
        },
        success: function (res) {
            alert('分享成功');
        },
        cancel: function (res) {
            alert('您取消了分享');
        },
        fail: function (res) {
         // alert(JSON.stringify(res));
        }
      });
      layer.closeAll();
    });

    //回答问题
    function answer_question(answer){

        $.ajax({
            url:"/phone/zt/birthday_answer",
            type:"get",
            data:{
                answer : answer
            },
            async:false,
            dataType:"JSON",
            success:function(result){
                if(result.code == 10000){
                   $("#answer").blur() ;
                    chatuser(answer);
                    chatme(result.answer);
                    if(result.coupon_state == 1){
                        $(".fixed-send").html('<a href="'+result.url+'" class="btn-send btn-send-all">去使用</a>');
                    }else{
                        if(result.count == 8){
                            $(".fixed-send").html('<a href="'+result.url+'" class="btn-send btn-send-all">去看看</a>');
                        }
                    }
                }else{
                    $("#answer").blur() ;
                }
            },
            error:function(){
                alert("系统出错，请稍后再试。");
            }
        })
    }

    //添加用户回答
    function chatuser(answer){
        var html = '';
        html += '<li class="chatuser">';
        html += '<img src="' + $("#user_img").val() + '">';
        html += '<div class="chatsay">';
        html += '<div class="chatsay-info">' + answer + '</div>';
        html += '</div>';
        html += '</li>';
        $(".chatview").append(html);
        nullAnswerFlag = true;
        $("html,body").animate({scrollTop:$("html")[0].scrollHeight},500);

    }

    //添加小祺回答
    function chatme(answer){
        var html = '';
        html += '<li class="chatme">';
        html += '<img src="/assets/src/topic/coupon/images/default_avatar.png">';
        html += '<div class="chatsay">';
        html += '<div class="chatsay-info">' + answer + '</div>';
        html += '</div>';
        html += '</li>';
        $(".chatview").append(html);
        $("html,body").animate({scrollTop:$("html")[0].scrollHeight},500);
    }


    function getFullPath(){
        //获取地址的全路径，如： http://localhost:8080/project/request/index.php
        return window.document.location.href ;
    }

    function getProjectRootPath(){
        //获取项目根路径，如： http://localhost:8080
        return localhostPaht = getFullPath().substring(0,getFullPath().indexOf(getRequestPath()));
    }

    function getRequestPath(){
        //获取主机地址之后的目录，如： /project/request/index.php
        return window.document.location.pathname ;
    }
});