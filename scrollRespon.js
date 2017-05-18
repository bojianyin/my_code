;(function($){
	class navBar{
		constructor(json){
			this.timer=null;
			this.iNow=0;
			this.off=true;
			this.ary;
			this.computed(json);
			this.events(json);
		}
		events(json){
			$(document).scroll(()=>{
				if(this.off){
					this.response(json);	
				}else{
					return ;
				}
			})
			$(json.navControl).each((index,e)=>{
				$(e).click(()=>{
					this.off=false;
					this.iNow=index;
					$(e).addClass("act").siblings().removeClass("act");
					this.transfer(json);
				})
			})
		}
		transfer(json){
			clearInterval(this.timer);
			var speed;
			this.timer=setInterval(()=>{
				speed=($(json.container).eq(this.iNow).offset().top-$(document).scrollTop())/4;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(speed==0){
					clearInterval(this.timer);
					this.off=true;
				}else{
					scrollBy(0,speed);
				}
			},26)
		}
		computed(json){
			this.ary=function(){
				var arr=[];
				$.each($(json.container),function(idx,e){
					arr.push(e.offsetTop);
				})
				return arr;
			}();
		}
		response(json){
			let scol=$(document).scrollTop();
			if(scol>=this.ary[this.iNow+1]){
				this.iNow++;
				$(json.navControl).eq(this.iNow).addClass("act").siblings().removeClass("act");
			}
			if(scol<=this.ary[this.iNow]){
				if(this.iNow==0){
					this.iNow=0
				}else{
					this.iNow--;	
				}
				$(json.navControl).eq(this.iNow).addClass("act").siblings().removeClass("act");
			}
		}
	}
	
	new navBar({
		navControl:".kuai>.con>div"
		,container:".cons>div"
	});
})(jQuery)
