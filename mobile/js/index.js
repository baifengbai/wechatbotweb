$(function(){
	//  ≈‰“≥√Ê
    var changefont = function(){
        var client_width = document.body.clientWidth;
        var standard_width = 375;
        var res = (client_width/standard_width) * 10;
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:" + res.toFixed(2) + "px");
    }
    window.onload = changefont;
    window.onresize = changefont;
	
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		onInit: function(swiper){
			$(".page_"+(swiper.activeIndex+1)+" .cont_weg_1").addClass("right_move_hide");
		},
		onSlideNextStart: function(swiper){
			if(swiper.activeIndex == 1){
				$(".link_up").show();
				$(".page_2 .cont_weg_2").addClass("right_move_hide");
				$(".page_2 .cont_dialog").addClass("right_move_hide");
			}
			else if(swiper.activeIndex == 2){
				$(".link_up").show();
				$(".page_3 .cont_weg_3").addClass("left_move_hide");
			}
			else if(swiper.activeIndex == 3){
				$(".link_up").show();
				$(".page_4 .cont_weg_4").addClass("scale_hide");
				$(".page_4 .cont_pic").addClass("scale_hide");
			}
			else if(swiper.activeIndex == 4){
				$(".link_up").hide();
				$(".page_5 .cont_weg_5").addClass("left_move_hide");
				$(".page_5 .cont_dialog").addClass("left_move_hide");
			}
		},
		onSlidePrevStart: function(swiper){
			$(".link_up").show();
		}
    });
});