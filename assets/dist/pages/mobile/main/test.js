define(function(require){
    require("jquery");
    var grow=document.getElementById('grow-div');
    var userdata={
        level:1,
        score:3556,
        maxLevel:7,
        name:"\u5c11\u5e74\u5f20\u4e09\u4e30"



    };

    grow.addEventListener('touchstart',growtouchstart);
    grow.addEventListener('touchmove',growtouchmove);
    grow.addEventListener('touchend',growtouchend);
    var growtouchx;
    var left;
    var offsetleft;
    var offsetright;
    function growtouchstart(e){
        event.preventDefault();
        console.log(e.touches[0].clientX);
        growtouchx=e.touches[0].clientX;
        console.log($("#grow-ul").css("left"));
        left=$("#grow-ul").css("left");
        left = left=="auto"? 0 : left.replace("px","")-0;
        console.log(left);

    }
    function growtouchmove(e){
        event.preventDefault();
        var x=e.changedTouches[0].clientX;
        var deltax=x-growtouchx;
        if(((left+deltax)<$("#body").width()/2)&&((left+deltax)>(-$("#grow-ul").width()+$("#body").width()/2))){
            $("#grow-ul").css("left",left+deltax+"px");
        }


    }
    function growtouchend(e){
        event.preventDefault();
        left=$("#grow-ul").css("left");
        left = left=="auto"? 0 : left.replace("px","")-0;
        console.log(left);
        if(offsetleft>0){
            if(left>offsetleft){
                $("#grow-ul").animate({"left":offsetleft+"px"},300,"swing");
            }
            else if(left<offsetright){
                $("#grow-ul").animate({"left":offsetright+"px"},300,"swing");
            }
        }
        else{
            if(left>0){
                $("#grow-ul").animate({"left":0},300,"swing");
            }
            else if(left<offsetright){
                $("#grow-ul").animate({"left":offsetright+"px"},300,"swing");
            }
        }

    }
    $(document).ready(function (){
        var bodyWidth=$("#body").width();
        var growHeight=bodyWidth/750*200;
        var itemWidth=bodyWidth/750*114;
        var userWidth=bodyWidth/750*245;
        var levelWidth=bodyWidth/750*60;
        var itemfontvWidth=bodyWidth/750*45;
        var itemfontnWidth=bodyWidth/750*24;
        var usertxWidth=bodyWidth/750*142;
        var usertxRight=bodyWidth/750*28;
        var usertxTop=bodyWidth/750*25;
        var url="usertx.jpg";
        $("#grow-div").css("height",growHeight+"px");

        var greyBg=$(" <div style='width:100%;height:100%;position: absolute;background-color: rgb(219,219,219);z-index: 500;'></div>");
        var goldenBg=$(" <div style='width:0%;height:100%;position: absolute;background-color: rgb(255,215,0);z-index: 500;'></div>");
        greyBg.appendTo("#grow-ul");
        goldenBg.appendTo("#grow-ul");



        for(var i=1;i<=userdata.maxLevel;i++){
            if(i==userdata.level){
                var user=$("<li class='level-user'></li>");
                user.css("height",growHeight+"px");
                user.css("width",userWidth+"px");
                user.appendTo("#grow-ul");
                user.append("<div style='position: absolute;background-image:url("+url+");background-size: 100% 100%; border-radius: 300px; -moz-border-radius: 300px;-webkit-border-radius: 300px;width:"+usertxWidth+"px;height: "+usertxWidth+"px;line-height: "+usertxWidth*1.4+"px;right: "+usertxRight+"px;top: "+usertxTop+"px;text-align:center;font-family: Cambria;font-style: italic;font-weight: bold;color:rgb(255,241,0)'><span style='font-size:"+itemfontvWidth*2+"px;'>v</span><span style='font-size:"+itemfontnWidth*2+"px;'>"+i+"</span></div>")

            }
            else{
                var item=$("<li class='level-item'></li>");
                item.css("height",growHeight+"px");
                item.css("width",itemWidth+"px");
                item.appendTo("#grow-ul");
                item.append("<div style='width:"+levelWidth+"px;height: "+growHeight*0.92+"px;line-height: "+growHeight*0.92+"px;text-align:center;display: inline-block;position: absolute;right: 0;font-family: Cambria;font-style: italic;font-weight: bold;color:rgb(163,163,163)'><span style='font-size:"+itemfontvWidth+"px;'>v</span><span style='font-size:"+itemfontnWidth+"px;'>"+i+"</span></div>");
            }

        }
        offsetleft=bodyWidth/2-itemWidth*userdata.level-itemWidth*0.32;
        offsetright=bodyWidth-(userdata.maxLevel-1)*itemWidth-userWidth;
        $("#grow-ul").css("width",(userdata.maxLevel-1)*itemWidth+userWidth+"px");
        $("#grow-ul").css("left",offsetleft+"px");
        goldenBg.animate({"width":"70%"},2500,"swing");

        var username=$(".user-name");
        var userscore=$(".user-score");
        username.append(userdata.name);
        userscore.append("<div style='float: left'>\u5f53\u524d\u6210\u957f\u503c:<span style='color: rgb(255,241,0)'>3556</span></div><div style='float: right'>\u5230\u8fbeV3\u8fd8\u9700\u8981:<span style='color: rgb(255,241,0)'>3556</span></div>")


    });
});
