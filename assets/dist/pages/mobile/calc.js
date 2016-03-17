define(function(require){var e=require("jquery"),r=require("layer.m/1.6/layer.m");require("./common");var a=e("#calc_money"),t=e("#calc_day"),l=e("#calc_total_money"),n=e("#calc_apr"),o="",i="",c="",f=e("#btnCalc"),s=e("#btnClear"),d=/(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/,u=/^[1-9][0-9]{0,2}$/;e(function(){e("#header h1").text("收益计算器");a.blur(function(){var r=e(this).val();if(e.trim(r)==""){o="请输入投资金额"}else if(!d.test(r)){o="金额必须为数字，小数点后不超过2位"}else{o=""}if(o!=""){v(o,3)}}).keydown(function(e){var r=e.charCode?e.charCode:e.keyCode;return r>=48&&r<=57||r>=96&&r<=105||r==8||r==9||r==46||r==39||r==37||r==110||r==190});t.blur(function(){var r=e(this).val();if(e.trim(r)==""){i="请输入收益期限"}else if(!u.test(r)){i="请输入有效的收益期限"}else{i=""}if(i!=""){v(i,3)}}).keydown(function(e){var r=e.charCode?e.charCode:e.keyCode;return r>=48&&r<=57||r>=96&&r<=105||r==8||r==9||r==46||r==39||r==37});n.blur(function(){var r=e(this).val();if(e.trim(r)==""){c="请输入年化利率"}else if(!d.test(r)){c="年化利率必须为数字，小数点后不超过2位"}else if(parseFloat(r)>36){c="年化利率不能超过36%"}else{c=""}if(c!=""){v(c,3)}}).keydown(function(e){var r=e.charCode?e.charCode:e.keyCode;return r>=48&&r<=57||r>=96&&r<=105||r==8||r==9||r==46||r==39||r==37||r==110||r==190});f.click(function(){n.trigger("blur");if(c!=""){return false}t.trigger("blur");if(i!=""){return false}a.trigger("blur");if(o!=""){return false}var e=parseFloat(n.val())/100/360*parseFloat(a.val())*parseInt(t.val());l.text(e.toFixed(2))})});function v(e,a){r.closeAll();r.open({content:e,type:1,style:"padding:10px 15px; background-color:rgba(0,0,0,0.5); color:#fff; border:none;",shadeClose:false,shade:false,time:a})}});