define(function(require){var e=require("jquery");require("../common");require("regex");var s=require("layer.m/1.6/layer.m"),t=e("#phone"),a=e("#password"),l=e("#repassword"),r=e("#forgot_submit"),n=e("#valid_code"),o=e("#btnSendSms"),i=e("#div_voice_sms"),c=e("#btnSendVoiceSms"),f="",d="",u="",h="",p,m,v=e("#div_voice_sms_tips");s.closeAll();s.open({type:2,shadeClose:false,content:"加载中..."});e(function(){e("#header h1").text("找回密码");t.blur(function(){var s=e(this).val();if(e.trim(s)==""){f=e(this).attr("nullmsg")}else if(!qtyd_regex.phone(s)){f=e(this).attr("errormsg")}else{f=""}if(f==""){e.ajax({url:"/utils/check_mobile",data:{type:"phone",param:s},type:"POST",dataType:"json",cache:false,async:false,success:function(e){if(e.code==1e4){f="手机号码还未注册"}else{f=""}}})}if(f!=""){y(f,1);return false}}).keydown(function(e){var s=e.charCode?e.charCode:e.keyCode;return s>=48&&s<=57||s>=96&&s<=105||s==8||s==46||s==39||s==37||s==110});a.blur(function(){var s=e(this).val();if(e.trim(s)==""){d=e(this).attr("nullmsg")}else if(!(s.length>=6&&s.length<=24)){d=e(this).attr("errormsg")}else{d=""}if(d!=""){y(d,1);return false}});l.blur(function(){var s=e(this).val();if(s!=a.val()){h=e(this).attr("errormsg")}else{h=""}if(h!=""){y(h,1);return false}});n.blur(function(){var s=e(this).val();if(e.trim(s)==""){u="请输入短信验证码"}else if(!qtyd_regex.number(s)){u="短信验证码格式错误"}else{u=""}if(u==""){e.ajax({url:"/async/check_valicode",data:{valicode:s,phone:t.val(),sms_type:"forget_password"},type:"POST",dataType:"json",cache:false,async:false,success:function(e){if(e.code!=1e4){u="短信验证码错误"}else{u=""}}})}if(u!=""){y(u,1);return false}});o.click(function(){g(0)});c.click(function(){g(1)});r.click(function(){t.trigger("blur");if(f!=""){return false}a.trigger("blur");if(d!="")return false;l.trigger("blur");if(h!=""){return false}n.trigger("blur");if(u!=""){return false}s.open({type:2,shadeClose:false,content:"数据提交中..."});e.ajax({url:"/phone/user/update_pwd",type:"POST",data:{phone:t.val(),password:a.val(),repassword:a.val(),valicode:n.val()},cache:false,dataType:"json",success:function(e){if(e.code==1e4){s.open({content:'<div class="tac"><i class="qtydfont c-success ft25">&#xe61b;</i><p class="c-999 mt5">密码重置成功，请您重新登录</p></div>',btn:["好"],style:"min-width:300px;",shadeClose:false,yes:function(){window.location.href="/phone/user/login.html";return false}})}else{y(e.msg,3);return false}},error:function(){y("抱歉，密码重置异常",1);return false}})});s.closeAll()});function y(e,t){s.closeAll();s.open({content:e,type:1,style:"padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;",shadeClose:false,shade:false,time:t})}function g(a){t.trigger("blur");if(f!=""){return false}s.closeAll();s.open({content:"验证码发送中...",type:2,shadeClose:false});e.ajax({url:"/async/send_sms",type:"POST",data:{phone:t.val(),sms_type:"forget_password",op_type:a},dataType:"JSON",cache:false,success:function(e){s.closeAll();if(e.code==1e4){p=e.data.time;if(m)clearInterval(m);i.hide();v.hide().html("");if(a==1){v.show().html("请注意接听来电，验证码将在来电中播报......")}m=setInterval(function(){o.attr("disabled",true).text(p+"秒后重新发送").addClass("disabled");p=p-1;if(p<0){clearInterval(m);v.hide().html("");i.show();o.attr("disabled",false).text("短信验证码").removeClass("disabled")}},1e3)}else{y(e.msg,3)}return false},error:function(){y("网络异常，发送短信验证码失败，请重试",1);return false}})}});