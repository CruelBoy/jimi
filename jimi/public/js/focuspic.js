
// window.onload 兼容
function documentReady(fn){
    //w3c方法
    if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);
    else{
        //ie8以下
        document.attachEvent('onreadystatechange', function (){//IE兼容
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
    }
};



/*焦点图*/
documentReady(function(){
    var oDiv=document.getElementById("pic_roll");
    var aUl=oDiv.getElementsByTagName("ul");
    var aImage=aUl[0].getElementsByTagName('li');
    var aBtn=aUl[1].getElementsByTagName('li');
    var timer=null;
    var n=0;
    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].index=i;
        aBtn[i].onclick=function(){
            set(this.index);
            n=this.index; // 解决自动切换时点击焦点，焦点不改变，依旧按原来序列递增的问题
        }
    };
    var timer=setInterval(fn,1500);
    function fn(){
        set(n);
        n++;
        if(n==aBtn.length){
            n=0;
        }
    }
    function set(num){
        for (var i = 0; i < aBtn.length; i++) {
            aBtn[i].className="";
            aImage[i].className="";
        };
        aBtn[num].className="active2";
        aImage[num].className="active1";
    }
    oDiv.onmouseover=function(){
        clearInterval(timer)
    }
    oDiv.onmouseout=function(){
        timer=setInterval(fn,1500);
    }    
})


documentReady(function(){
    /*侧边栏*/
    var aChannel=document.getElementsByClassName("channel");        
    var aLi=document.getElementsByClassName("main_li"); 
    for (var i = 0; i < aLi.length; i++) {
       aLi[i].index=i;
       aLi[i].onmouseover=function(){
                    
          for (var j = 0; j < aChannel.length; j++) {
            aChannel[this.index].style.display="block";
          };
       }
         aLi[i].onmouseout=function(){
            for (var j = 0; j < aChannel.length; j++) {
                 aChannel[this.index].style.display="none";
            };
         }            
    };    
})




/*--------楼层滚动-------*/
documentReady(function(){
    var LocationFloorList=document.getElementsByClassName('fixed_nav')[0];    
    var aLi=LocationFloorList.getElementsByTagName('li');  
    console.log(aLi.length)  
    var aFloor=document.getElementsByClassName('floor');    
    var arr=[];
        
    //-------------------------------------------------
        
    for(var i=0; i<aFloor.length; i++){
        var json={};
        json.name=i;
        json.offsetTop=aFloor[i].offsetTop;
        arr.push(json);
    };
    //console.log(arr)    
    window.onscroll=function(){
        //显示楼层编号-------------------------------------------------
        var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrolltop)
        if(scrolltop>800){
            LocationFloorList.style.display='block';
        }else{
            LocationFloorList.style.display='none';
        };
        
        // 根据楼层滚动位置，定位编号------------------------------------------------
        var last_arr=[];
        for(var j=0; j<arr.length; j++){
            if(arr[j].offsetTop<scrolltop+400){//400为接近屏幕的敏感区
                last_arr.push(arr[j].name);
            }
        };
        
        // console.log(last_arr)
        var li_index=last_arr[last_arr.length-1];

        for(var l=0; l<aFloor.length; l++){
            aLi[l].className='';
        };
        //页面上部如果有内容，没有楼层会放入新数组，产生错误
        last_arr.length==0 ?aLi[0].className='ac':aLi[li_index].className='ac';
    };
    
    //点击编号，跳转到相对楼层-----------------------------------------------
    for(var i=0; i<aFloor.length; i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){
            var start=document.documentElement.scrollTop || document.body.scrollTop;
            var end=arr[this.index].offsetTop;
            move(start,end)
        }
    };
    //move-------------------------------------------------------
    var timer;
    function move(start,end){
        var dis=end-start;
        var count=parseInt(1500/30);
        var n=0;
        clearInterval(timer);
        timer=setInterval(function(){
            n++;
            var a=1-n/count;
            var step_dis=start+dis*(1-a*a*a*a);
            //window.scrollTo(0,step_dis);
            // if(document.body.scrollTop){document.body.scrollTop=step_dis;}            

            document.body.scrollTop ? document.body.scrollTop=step_dis : document.documentElement.scrollTop=step_dis;
            if(n==count){
                clearInterval(timer);
            };
        },30)
    };    
})

    

    




