// JavaScript Document

//jquery本身扩展方法  封装小工具 不依赖对象，可以独立运行的
$.extend({
	
	//判断屏幕
	half_screen:function(obj){
		var screen_h=$(window).height();//
		var scrollTop=$(window).scrollTop();//滚动条高度
		var top=obj.offset().top;
		return top>(screen_h/2+scrollTop)? true:false; //下：ture  上：false
	},
	
	
	sum:function(){
		var a=0
		for(var i=0; i<arguments.length; i++){
			a+=arguments[i];
		};
		return a;
	},
	
	
	//模态层
	modal:function(){
		var oM=$('<div class="modal"></div>');
		$(document.body).append(oM);
		return function(){
			oM.remove();
		};
	},
	
	//错误弹框
	errBox:function(opt){
		//默认值
		var def={
			txt:"出错了！",
			w:300,
			drag:true,
		};
		
		//合并的值
		var op=$.extend({},def,opt);
		
		var del_moda=$.modal();
		var oBox=$('<div class="errBox" style="width:'+op.w+'px"><p>'+op.txt+'</p><button type="button">确定</button></div>');
		$(document.body).append(oBox);
		
		oBox.showCenter();
		/*if(op.drag){
			oBox.drag();
		}*/
		
		
		oBox.children('button').click(function(){
			oBox.remove();
			del_moda();
		});
		return oBox;
		
		
	},
});

//-----------------------------------------------------------------------

//jquery包装的“对象”扩展方法  可以链式操作

$.fn.extend({
	
	//中心显示
	showCenter:function(){
		//alert(this);   //this指向 jquery包装的对象
		return this.each(function(){
			$(this).show();
			var _this=$(this);
			function run(){
				var l=( $(window).width()-_this.outerWidth())/2;
				var t=($(window).height()-_this.outerHeight())/2;
				_this.css({"left":l,"top":t});
			};
			run();
			$(window).resize(run);
		});
	},
	
	//拖拽
	drag:function(title){
		return this.each(function(){
			title=title || $(this);
			var _this=$(this);
			title.mousedown(function(ev){
				var offset=_this.offset();
				var disX=ev.pageX-offset.left; //x方向偏移
				var disY=ev.pageY-offset.top; //y方向
				
				//鼠标按下  为document绑定move事件-----------------------------
				$(document).bind("mousemove",function(ev){
					var l=ev.pageX-disX;
					var t=ev.pageY-disY;
					
					if(l<0){
						l=0;
					}
					if(t<0){
						t=0;
					};
					
					var s_w=$(window).width();//屏幕宽度
					var s_h=$(window).height();
					if(l>s_w-_this.outerWidth()){
						l=s_w-_this.outerWidth()
					};
					if(t>s_h-_this.outerHeight()){
						t=s_h-_this.outerHeight()
					};
					
					_this.css({"left":l,"top":t});
				});
				
				//鼠标抬起，解绑move事件------------------------------
				$(document).mouseup(function(){
					$(document).unbind('mousemove');
				});
				
				//取消默认事件（阻止圈选文字）--------------------------------
				return false;
			});	
		});
	},
	
	//checkAll
	checkAll:function(elms){
		
		return this.each(function(){
			var _this=$(this);
			_this.click(function(){//x全选
				elms.prop('checked',$(this).prop('checked'))
			});
			
			
			elms.click(function(){
				var n=0;
				elms.each(function(){//每次点击 都计算一次是否全选
					$(this).prop('checked') ? n++:n--;
				});
				
				/*if(n==elms.length){
					_this.prop('checked',true)	
				}else{
					_this.prop('checked',false)
				}*/
				_this.prop('checked',n==elms.length ? true :false)
			
			});
		});
	
	},
	
	
	
	//选项卡插件
	tab:function(opt){
		
		//默认值-----------------------------------
		var def={
			autoRun:true,
			speed:1000,
			
		};
		//新的设定值替换默认值---------------------------------------
		var op=$.extend({},def,opt);
		
		
		//----------------------------------------
		return this.each(function(){

			var timer;
			var i=0;
			var _this=$(this);
			var oUl=_this.find('.tabList');
			var aLi=oUl.children();
			var tabItem=_this.find('.tabItem');
			aLi.click(function(){
				$(this).addClass('tab-active').siblings().removeClass('tab-active');
				tabItem.eq($(this).index()).addClass('page-act').siblings().removeClass('page-act');
				i=$(this).index();
			});
			//----------------------------------------			
			if(op.autoRun){
				function auto(){
					
					timer=setInterval(function(){
						i++;
						if(i==aLi.length){
							i=0;
						};
						aLi.eq(i).addClass('tab-active').siblings().removeClass('tab-active');
						tabItem.eq(i).addClass('page-act').siblings().removeClass('page-act');
					},op.speed);
				};
				
				auto();
				
				//----------------------------------------
				_this.hover(
					function(){
						clearInterval(timer);
					},
					function(){
						auto();
					}
				);
			};
			
			
			
			
		});
	},
	
	//滚轮
	mouseWheel:function(fn){
		return this.each(function(){
			if(window.navigator.userAgent.indexOf('Firefox')!=-1){
				 this.addEventListener('DOMMouseScroll',wheelFn,true);
			}else{
				this.onmousewheel=wheelFn;
			};
			function wheelFn(ev){
				ev=ev||event;
				var direct=ev.wheelDelta ? ev.wheelDelta<0 : ev.detail>0;
				fn && fn(direct);//将direct作为参数传递出去
				if(window.event){//IE
					ev.returnValue = false; //ie 阻止默认事件
					return false;//ie9 以上阻止回车
				}
				else{
					ev.preventDefault();//DOM2级 阻止默认事件 firefox
				}
			};
		})
	},
	
	
	
	
})












