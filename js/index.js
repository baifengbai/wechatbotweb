$(function(){
	var totlePercent = 65;
	var dotPercent;
	var mySwiper = new Swiper('.swiper-container',{
		mousewheelControl : true,
		keyboardControl : true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
        speed:1000,
		onInit: function(swiper){
			dotPercent = totlePercent/($(".swiper-slide").length - 1);
			$(".go_btn_dot").css("top",(dotPercent*swiper.activeIndex)+"%");
		},
		onSlideNextStart: function(swiper){
			$(".go_btn_dot").css("top",(dotPercent*swiper.activeIndex)+"%");
			if(swiper.activeIndex == ($(".swiper-slide").length - 1)){
				$("#page"+(swiper.activeIndex+1)+" footer").addClass("UpMove");
			}else{
				$("#page"+(swiper.activeIndex+1)+" footer").removeClass("UpMove");
			}
		},
		onSlidePrevStart: function(swiper){
			$(".go_btn_dot").css("top",(dotPercent*swiper.activeIndex)+"%");
			$("#page"+$(".swiper-slide").length+" footer").removeClass("UpMove");
		}
	})
});	