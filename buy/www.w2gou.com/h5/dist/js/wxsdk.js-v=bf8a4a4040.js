var wxsdk=function(){return{start:function(e){e||(e=["hideOptionMenu","showOptionMenu","hideMenuItems","closeWindow","chooseWXPay","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","getNetworkType"]);var n=encodeURIComponent(window.location.href);mui.ajax({type:"post",async:!1,url:common.apihost+"/otherPay/getConfig",contentType:"application/json",dataType:"json",data:{url:n},success:function(n){var i=n.data,o=i.appId,a=i.nonceStr,t=i.timestamp,s=i.signature;wx.config({debug:!1,appId:o,timestamp:t,nonceStr:a,signature:s,jsApiList:e}),wx.error(function(){mui.toast("配置出错！",{duration:"stort",type:"div"})})}})},hideMenu:function(){wx.ready(function(){wx.hideOptionMenu()})},showMenu:function(){wx.ready(function(){wx.showOptionMenu()})},hideCopyUrl:function(){wx.ready(function(){wx.hideMenuItems({menuList:["menuItem:copyUrl"],success:function(e){console.log("已隐藏")},fail:function(e){console.log(JSON.stringify(e))}})})},closeWindow:function(){wx.ready(function(){wx.closeWindow()})},wxPay:function(e,n,i,o,a){var t=e.data.jsApiParameters;jsApiParam=JSON.parse(t),wx.ready(function(){var e=!0;try{wx.chooseWXPay({timestamp:jsApiParam.timeStamp,nonceStr:jsApiParam.nonceStr,package:jsApiParam.package,signType:jsApiParam.signType,paySign:jsApiParam.paySign,success:function(a){e=!1,"chooseWXPay:ok"==a.errMsg?n():"chooseWXPay:cancel"==a.errMsg||"chooseWXPay:fail"==a.errMsg?i():o()},cancel:function(){e=!1,i()},fail:function(){e=!1,i()},complete:function(n){e=!1,"chooseWXPay:ok"==n.errMsg||"chooseWXPay:cancel"==n.errMsg||"chooseWXPay:fail"==n.errMsg||o()}})}catch(e){alert(e)}setTimeout(function(){e&&a()},2e3)})},wxShare:function(e){var e=e?{share_title:e.share_title||"王二狗",share_desc:e.share_desc||"内含智能二狗的N种玩法，点击对应图标了解。",share_img:e.share_img||common.imgapi+"/share_logo.png",share_link:e.share_link||location.href}:{share_title:"如何在群里玩转王二狗",share_desc:"内含智能二狗的N种玩法，点击对应图标了解。",share_img:common.imgapi+"/share_logo.png",share_link:"https://www.w2gou.com/h5/lifeAssistant2.html"},n=e.share_title,i=e.share_desc,o=e.share_img,a=e.share_link;wx.ready(function(){wx.getNetworkType({success:function(e){e.networkType},fail:function(e){}}),wx.onMenuShareAppMessage({title:n,desc:i,link:a,imgUrl:o,trigger:function(e){},success:function(e){success()},cancel:function(e){fail()},fail:function(e){fail()}}),wx.onMenuShareTimeline({title:i,link:a,imgUrl:o,trigger:function(e){},success:function(e){success()},cancel:function(e){fail()},fail:function(e){fail()}}),wx.onMenuShareQQ({title:n,desc:i,link:a,imgUrl:o,trigger:function(e){},success:function(e){success()},cancel:function(e){fail()},fail:function(e){fail()}}),wx.onMenuShareWeibo({title:n,desc:i,link:a,imgUrl:o,trigger:function(e){},success:function(e){success()},cancel:function(e){fail()},fail:function(e){fail()}})})}}}();