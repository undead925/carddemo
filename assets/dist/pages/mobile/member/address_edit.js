define(function(require,exports,module){var e=require("jquery");var s=require("layer.m/1.6/layer.m");require("../common");require("area");require("regex");s.closeAll();s.open({type:2,shadeClose:false,content:"加载中..."});function a(a){if(a>0){s.closeAll();s.open({content:'<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">确定要删除此地址么?</p></div>',btn:["确定","取消"],shadeClose:false,style:"min-width:300px;",yes:function(){s.closeAll();s.open({type:2,shadeClose:false,content:"删除中..."});e.ajax({url:"/phone/mine/del_address/"+a,type:"GET",cache:false,data:{},dataType:"json",success:function(e){if(e.code==1e5){s.closeAll();s.open({content:'<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">删除成功</p></div>',btn:["好"],style:"min-width:300px;",shadeClose:false,yes:function(){window.location.href="/phone/mine/address";return false}})}else if(e.code>=110023&&e.code<=110026){s.closeAll();s.open({content:'<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',btn:["好"],style:"min-width:300px;",shadeClose:false,yes:function(){window.location.href="/phone/user/login.html";return false}})}else if(e.code==930019){window.location.href="/phone/error/sina_error";return false}else{y("删除失败，失败原因：<br>"+e.msg,3);return false}},error:function(){y("抱歉，删除失败",1);return false}})},no:function(){}})}else{y("抱歉，无此地址",1)}}var l=e("#address_id"),n=e("#user_name"),t=e("#phone"),r=e("#province_select"),i=e("#city_select"),c=e("#zone_select"),o=e("#user_address"),d=e("#cb_default"),f=e("#btnSubmit"),u="",h="",p="",v=e("#area_id");e(function(){var m="新增地址";e("#header").html('<a href="/phone/mine/address" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>'+'<h1 class="primary-title">'+m+"</h1>");if(parseInt(v.val())>0){m="修改地址";e("#header").html('<a href="/phone/mine/address" class="a-back"><i class="qtydfont">&#xe623;</i>返回</a>'+'<h1 class="primary-title">'+m+"</h1>"+'<a href="javascript:void(0);" id="del_a" class="a-right-link">删除</a>');e("#del_a").bind("click",function(){a(l.val());return false})}get_area(v.val());r.change(function(){get_area(e(this).val())});i.change(function(){get_area(r.val()+"_"+e(this).val())});n.blur(function(){var s=e(this).val();if(e.trim(s)==""){u="收件人不能为空"}else{u=""}if(u!=""){y(u,1);return false}});t.blur(function(){var s=e(this).val();if(e.trim(s)==""){h="请输入收件人联系电话"}else if(!qtyd_regex.phone(s)){h="收件人联系电话格式错误"}else{h=""}if(h!=""){y(h,1);return false}}).keydown(function(e){var s=e.charCode?e.charCode:e.keyCode;return s>=48&&s<=57||s>=96&&s<=105||s==8||s==46||s==39||s==37||s==9});o.blur(function(){var s=e(this).val();if(e.trim(s)==""){p="请输入收件人详细地址"}else{p=""}if(p==""){e.ajax({url:"/utils/get_value_length",type:"POST",dataType:"json",data:{str:s},cache:false,async:false,success:function(e){if(e.length>150){p="收货地址为150个字符或者50个汉字";y(p,1);return false}else{p=""}}})}else{y(p,1);return false}});f.click(function(){n.trigger("blur");if(u!=""){return false}t.trigger("blur");if(h!=""){return false}o.trigger("blur");if(p!=""){return false}s.closeAll();s.open({type:2,shadeClose:false,content:"数据提交中..."});e.ajax({url:"/phone/mine/address_edit",type:"POST",data:{address_id:l.val(),user_name:n.val(),action:parseInt(l.val())>0?"update":"add",user_mobile:t.val(),user_address:o.val(),area_id:r.val()+"_"+i.val()+"_"+c.val(),address_default:d.prop("checked")?1:0},cache:false,dataType:"json",success:function(e){if(e.code==1e5){s.closeAll();var a="";if(parseInt(l.val())>0){a='<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">更新地址成功</p></div>'}else{a='<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">添加地址成功</p></div>'}s.open({content:a,shadeClose:false,style:"min-width:300px;",btn:["好"],yes:function(){window.location.href="/phone/mine/address";return false}})}else if(e.code>=110023&&e.code<=110026){s.closeAll();s.open({content:'<div class="tac"><i class="qtydfont c-warning ft25">&#xe630;</i><p class="c-999 mt5">登陆超时，请重新登录</p></div>',btn:["好"],style:"min-width:300px;",shadeClose:false,yes:function(){window.location.href="/phone/user/login.html";return false}})}else if(e.code==930019){window.location.href="/phone/error/sina_error";return false}else{y("抱歉，操作失败，原因："+e.msg);return false}},error:function(){y("抱歉，操作失败，请重新尝试",1);return false}})});s.closeAll()});function y(e,a){s.closeAll();s.open({content:e,type:1,style:"padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;",shadeClose:false,shade:false,time:a})}});