function showTipFn(e){error.style.display="block",err.innerText=e,setTimeout(function(){error.style.display="none"},1500)}var companyName="",count="",username="",tel="",alias="",code="",isVip=common.getUrlParam("isVip")?decodeURIComponent(common.getUrlParam("isVip")):"",qyname=document.getElementsByClassName("qyname")[0],qynumber=document.getElementsByClassName("qynumber")[0],nameDiv=document.getElementsByClassName("name")[0],telDiv=document.getElementsByClassName("tel")[0],wechat=document.getElementsByClassName("wechat")[0],codeDiv=document.getElementsByClassName("code")[0],error=document.getElementById("error"),err=document.getElementsByClassName("err")[0],checkFn=function(){companyName=qyname.value,count=qynumber.value,username=nameDiv.value,tel=telDiv.value,alias=wechat.value,code=codeDiv.value;var e=/^1\d{10}$/,n=/^\d+$/;return""==companyName?(showTipFn("请输入企业名称"),!1):""==count?(showTipFn("请输入企业群数量"),!1):n.test(count)?""==username?(showTipFn("请输入联系人姓名"),!1):""==alias?(showTipFn("请输入联系微信"),!1):""==tel?(showTipFn("请输入手机号码"),!1):e.test(tel)?""!=code||(showTipFn("请输入短信验证码"),!1):(showTipFn("手机号码格式不正确"),!1):(showTipFn("企业群数量只输入数字即可"),!1)},reg=function(){if(checkFn()){var e=(Date.parse(new Date),{companyName:companyName,count:count,username:username,tel:tel,alias:alias,vCode:code});mui.ajax({url:common.apihost+"/openApi/setCompany",data:e,dataType:"json",contentType:"application/json",type:"post",timeout:1e4,success:function(e){console.log(e),3==e.code?showTipFn("请输入正确的信息"):0==e.code?mui.alert("申请成功，我们会尽快联系您！",function(){"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?WeixinJSBridge.call("closeWindow"):(companyName=qyname.value="",count=qynumber.value="",username=name.value="",tel=telDiv.value="",alias=wechat.value="")}):showTipFn(e.msg)}})}},telFn=function(){var e=/^1\d{10}$/;/[^\u4e00-\u9fa5]/.test(telDiv.value)?e.test(telDiv.value)||showTipFn("请输入正确的手机号"):showTipFn("请输入正确的手机号")},qynumberFn=function(){var e=/^[1-9]\d*$/;/[^\u4e00-\u9fa5]/.test(qynumber.value)?e.test(qynumber.value)||showTipFn("请输入正确的企业数量"):showTipFn("请输入正确的企业数量")},getCodeFlag=!0;mui(".get-code")[0].onclick=function(){if(getCodeFlag){if(""==mui(".tel")[0].value)return void showTipFn("请输入手机号码！");if(!/^1\d{10}$/.test(mui(".tel")[0].value))return void showTipFn("手机号码格式不正确");getCodeFlag=!1,mui(".get-code")[0].innerText="获取中…",mui.ajax({url:common.apihost+"/openApi/sendVCode",data:{tel:mui(".tel")[0].value},dataType:"json",contentType:"application/json",type:"post",timeout:1e4,success:function(e){if(console.log(e),0==e.code){var n=null,t=60,o=function(){console.log("time",t),mui(".get-code")[0].innerText=t+"s",t<=0?(clearInterval(n),mui(".get-code")[0].innerText="获取验证码",getCodeFlag=!0):t--};n=setInterval(o,1e3)}else e.code,mui.toast(e.msg,{duration:"short",type:"div"}),getCodeFlag=!0,mui(".get-code")[0].innerText="获取验证码"}})}};