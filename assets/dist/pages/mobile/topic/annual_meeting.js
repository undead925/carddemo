define(function(require){var e=require("jquery"),l=require("layer.m/1.6/layer.m");l.closeAll();l.open({type:2,shadeClose:false,content:"加载中..."});require("touchslide/1.1/touchslide");e(function(){TouchSlide({slideCell:"#interact",titCell:".head ul",mainCell:".body ul",effect:"leftLoop",autoPlay:true,autoPage:true,switchLoad:"_src"});l.closeAll()})});