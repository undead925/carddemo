define(function (require) {

    // 加载jQuery
    var $ = require('jquery');
    // 加载微信JS SDK
    var wx = require('http://res.wx.qq.com/open/js/jweixin-1.1.0.js');
    if(wx == undefined)
        wx = require('https://res.wx.qq.com/open/js/jweixin-1.1.0.js');

    var url = "";
    var title = "" ;
    var dist = "" ;
    var imageurl = "" ;

    var timestamp = "" ;
    var nonceStr = "" ;
    var signature = "" ;
    var appid = "" ;
    
    $.ajax({
        url:"/phone/weixin/getShareInfo?url=" + encodeURIComponent(getFullPath()),
        async:false,    // false为同步 ，true为异步
        dataType: 'json',
        success : function (data, status){
            nonceStr = data.random ;
            timestamp = data.timestamp ;
            signature = data.signature ;
            appid = data.appid ;
            registerWeiXin();
        },
        error: function(data, status, e){
            alert(e);
        }
    });

    function registerWeiXin(){
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
    
    wx.ready(function(){
        
        url = encodeURIComponent(getProjectRootPath() + $("#url").val() );
        url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        title = $("#title").val() ;
        desc = $("#desc").val() ;
        imageurl = getProjectRootPath() + $("#imageurl").val() ;

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
          title: title ,
          desc: desc ,
          link: url ,
          imgUrl: imageurl ,
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
        title: title ,
        desc: desc ,
        link: url ,
        imgUrl: imageurl ,
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
    });

    // wx.checkJsApi({
    //     jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    //     success: function(res) {
    //         // 以键值对的形式返回，可用的api值true，不可用为false
    //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    //         alert(res);
    //     }
    // });

    
    // wx.error(function(res){
    //   alert("验证失败");
    //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    // });

    function getFullPath(){
        //获取地址的全路径，如： http://localhost:8080/project/request/index.php  
        return window.document.location.href ;
    }

    function getProjectRootPath(){
        //获取项目根路径，如： http://localhost:8080
       // return getFullPath().indexOf(getRequestPath());
        return localhostPaht = getFullPath().substring(0,getFullPath().indexOf(getRequestPath()));
    }

    function getRequestPath(){
        //获取主机地址之后的目录，如： /project/request/index.php   
        return window.document.location.pathname ;
    }

    return wx ;
})