function loadingPlus(arr, callback) {
	var imgs = [];
	var index = 0;
	for(var i = 0; i < arr.length; i++) {
		var imgObj = new Image();
		imgObj.src = "../images/page1/" + arr[i];
		imgObj.onload = function() {
			index++;
			var percent = parseInt((index / arr.length) * 100);
			$(".loading_bar").css({
				"width":percent + "%"
			})
			
			if(percent>=60){
//				alert("test");
//				return;
			}
			imgs.push(this);
			if(index == arr.length) {
				//全部加载完毕
				$("#loading").remove();
				callback && callback();
			}
		}
	}
}