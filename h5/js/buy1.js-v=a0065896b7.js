var account = "",
clickFlag = !0,
timer, redirFlag = !0,
couponId = 0,
buyVip = function() {
    this.redirectUrl = common.getUrlParam("url") ? decodeURIComponent(common.getUrlParam("url")) : "https://goodexist.com/h5/js/yet_buy.html",
    this.page = mui("body")[0].getAttribute("data-id"),
    this.cid = common.getUrlParam("cid") ? common.getUrlParam("cid") : "0",
    this.id = common.getUrlParam("id") ? common.getUrlParam("id") : "0",
    this.pid = common.getUrlParam("pid"),
    this.defaultId = "2",
    mui("#account")[0].innerHTML = common.nickName,
    this.init()
};
buyVip.prototype = {
    init: function() {
        this.checkWeiXin() && wxsdk.start(),
        "0" != this.id ? this.getCouponInfo() : (this.couponShow2(), this.getGroupList()),
        this.event()
    },
    event: function() {
        var o = this;
        console.log('common.getUrlParam("url")', common.getUrlParam("cid"));
        var t = sessionStorage.getItem("url");
        if (t) {
            var n = {
                title: "title",
                url: "../html/buy.html" + location.search
            };
            window.history.pushState(n, n.title, n.url),
            window.onpopstate = function(o) {
                sessionStorage.removeItem("url"),
                location.href = t
            },
            window.onbeforeunload = function() {
                sessionStorage.removeItem("url")
            }
        }
        mui(".content-price-wrap").on("tap", ".content-price-inner",
        function() {
            for (var t = 0; t < mui(".content-price-inner").length; t++) mui(".content-price-inner")[t].classList.remove("active");
            this.classList.add("active");
            var n = this.getAttribute("data-day"),
            e = this.getAttribute("data-pid");
            o.couponShow2(e),
            _hmt.push(["_trackEvent", o.page, "click", "套餐-" + n]),
            console.log("套餐-" + n)
        }),
        mui(".explain-text").on("tap", ".toCustomerSrv",
        function() {
            _hmt.push(["_trackEvent", "购买页", "跳转", "联系客服"]),
            location.href = common.customerSrv
        }),
        mui(".explain-title").on("tap", "#linkUrl",
        function() {
            _hmt.push(["_trackEvent", o.page, "click", "更多玩法"]),
            sessionStorage.removeItem("url"),
            location.href = "../html/lifeAssistant2.html"
        }),
        mui(".explain").on("tap", "li",
        function() {
            _hmt.push(["_trackEvent", o.page, "click", "更多玩法图标"]),
            sessionStorage.removeItem("url"),
            location.href = "../html/lifeAssistant2.html"
        }),
        mui("body").on("tap", ".mask,.popup-close",
        function() {
            mui(".mask")[0].style.display = "none",
            mui(".popup")[0].style.display = "none"
        }),
        mui(".coupon-wrap").on("tap", ".coupon-inner",
        function() {
            console.log("===============");
            var o = mui(".content-price-inner.active")[0];
            console.log("activePro", o);
            var t = o.getAttribute("data-id"),
            n = location.href; - 1 != n.indexOf("&id") ? n = n.split("&id")[0] : -1 != n.indexOf("?id") && (n = n.split("?id")[0]),
            -1 != n.indexOf("&pid") ? n = n.split("&pid")[0] : -1 != n.indexOf("?pid") && (n = n.split("?pid")[0]),
            sessionStorage.setItem("backUrl", n),
            sessionStorage.removeItem("url"),
            location.href = "https://goodexist.com/h5/html/coupon.html?pid=" + t + "&backUrl=" + encodeURIComponent(n)
        }),
        mui(".popup").on("tap", ".popup-btn",
        function() {
            _hmt.push(["_trackEvent", o.page, "click", "海报领取优惠券"]);
            var t = location.href; - 1 != t.indexOf("&cid") ? t = t.split("&cid")[0] : -1 != t.indexOf("?cid") && (t = t.split("?cid")[0]),
            sessionStorage.setItem("backUrl", t),
            sessionStorage.removeItem("url"),
            location.href = "https://goodexist.com/h5/html/coupon.html?backUrl=" + encodeURIComponent(t)
        }),
        this.checkWeiXin() ? mui(".mui-content").on("tap", "#buy_btn",
        function() {
            o.wxBuy()
        }) : mui(".mui-content").on("tap", "#buy_btn,#buy_btn2",
        function() {
            _hmt.push(["_trackEvent", o.page, "click", "购买按钮-非微信打开"]),
            console.log(o.page + "-购买按钮-非微信打开"),
            mui.toast("请在微信购买", {
                duration: "stort",
                type: "div"
            })
        })
    },
    wxBuy: function() {
        var o = this;
        if (_hmt.push(["_trackEvent", o.page, "click", "购买按钮"]), o.loadingDiv(), clickFlag) {
            if (!mui(".content-price-inner.active")[0]) return void mui.toast("请稍后再试！", {
                duration: "stort",
                type: "div"
            });
            clickFlag = !1;
            var t = mui(".content-price-inner.active")[0].getAttribute("data-id"),
            n = Date.parse(new Date) / 1e3,
            e = {
                version: common.version,
                unionid: common.unionid,
                openid: common.openid,
                time: n,
                uid: common.uid,
                productId: t,
                orderType: 0,
                couponId: couponId || 0
            },
            i = common.encrypt(e);
            e.token = i,
            mui.ajax({
                url: common.apihost + "/orders/generateJsWxpayOrder",
                data: e,
                dataType: "json",
                contentType: "application/json",
                type: "post",
                success: function(t) {
                    o.hideLoadingDiv(),
                    clickFlag = !0,
                    0 == t.code ? wxsdk.wxPay(t,
                    function() {
                        mui.toast("购买成功！", {
                            duration: "stort",
                            type: "div"
                        }),
                        o.redirectUrl && (redirFlag && mui.later(function() {
                            sessionStorage.removeItem("url"),
                            location.href = o.redirectUrl
                        },
                        1e3), redirFlag = !1)
                    },
                    function() {
                        mui.toast("购买失败！", {
                            duration: "stort",
                            type: "div"
                        })
                    },
                    function() {
                        mui.toast("网络异常！", {
                            duration: "stort",
                            type: "div"
                        })
                    },
                    function() {}) : 17 == t.code ? (clickFlag = !0, sessionStorage.removeItem("url"), location.href = "../html/sellOut.html") : (clickFlag = !0, mui.toast(t.msg, {
                        duration: "stort",
                        type: "div"
                    }))
                },
                error: function(o, t, n) {
                    clickFlag = !0,
                    console.log(t),
                    mui.toast(t + "网络异常！", {
                        duration: "stort",
                        type: "div"
                    })
                }
            })
        }
    },
    checkWeiXin: function() {
        return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
    },
    isRight: function() {
        var o = Date.parse(new Date) / 1e3,
        t = {
            version: common.version,
            unionid: common.unionid,
            uid: common.uid,
            isVip: 1,
            time: o
        },
        n = common.encrypt(t);
        t.token = n,
        mui.ajax({
            url: common.apihost + "/newWeChat/isRight",
            data: t,
            dataType: "json",
            type: "post",
            timeout: 1e4,
            contentType: "application/json",
            success: function(o) {
                20 == o.code && (sessionStorage.removeItem("url"), location.href = "../html/sellOut.html?v=" + common.version)
            },
            error: function(o, t, n) {
                console.log(t)
            }
        })
    },
    loadingDiv: function() {
        mui("#loadingDiv")[0].style.display = "block"
    },
    hideLoadingDiv: function() {
        mui("#loadingDiv")[0].style.display = "none"
    },
    trim: function(o) {
        return o.replace(/(^\s*)|(\s*$)/g, "")
    },
    getGroupList: function() {
        var o = this,
        t = Date.parse(new Date) / 1e3,
        n = {
            version: common.version,
            unionid: common.unionid,
            openid: common.openid,
            time: t,
            uid: common.uid
        },
        e = common.encrypt(n);
        n.token = e,
        mui.ajax({
            url: common.apihost + "/product/getProducts",
            data: n,
            dataType: "json",
            type: "post",
            timeout: 1e4,
            headers: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                if ("0" == t.code) {
                    var n = t.data,
                    e = "";
                    if (common.isArray(n) && n.length > 0) {
                        var i = 0;
                        for (var c in n) {
                            var a = function(t) {
                                switch (console.log("groupInfoId", t), t) {
                                case 8:
                                    sty = {
                                        style: "",
                                        txt: "",
                                    default:
                                        "1" == o.defaultId,
                                        pid: "1"
                                    };
                                    break;
                                case 7:
                                    sty = {
                                        style: "blo",
                                        txt: "省32元",
                                    default:
                                        "2" == o.defaultId,
                                        pid: "2"
                                    };
                                    break;
                                case 10:
                                    sty = {
                                        style: "",
                                        txt: "省165元",
                                    default:
                                        "3" == o.defaultId,
                                        pid: "3"
                                    }
                                }
                                return sty
                            } ( + n[c].id);
                            n[c].id == o.pid || !o.pid && a.
                        default ? e += '<li class="content-price-inner active" data-pid="' + a.pid + '" data-id="' + n[c].id + '" data-day="' + n[c].productName + '">': e += '<li class="content-price-inner" data-pid="' + a.pid + '" data-id="' + n[c].id + '" data-day="' + n[c].productName + '">',
                            e += "<div>" + n[c].productName + '<p><span class="content-price"><span class = "symbol">￥</span>' + n[c].fee.toFixed(0) + "</span></p></div>",
                            e += '<span class="content-label"><img src="../img/chek.png"/*tpa=https://goodexist.com/h5/img/chek.png*/ /></span>',
                            e += '<span class="recommend-label ' + a.style + '"><img src="../img/recommend.png"/*tpa=https://goodexist.com/h5/img/recommend.png*/ /></span>',
                            e += '<p class="explin_text">' + a.txt + "</p>",
                            e += "</li>",
                            i++
                        }
                    }
                    mui(".content-price-wrap")[0].innerHTML = e,
                    o.isRight()
                }
            },
            error: function(o, t, n) {
                console.log(t)
            }
        })
    },
    getCoupon: function() {
        var o = this,
        t = Date.parse(new Date) / 1e3,
        n = {
            version: common.version,
            time: t,
            unionid: common.unionid,
            uid: common.uid
        },
        e = common.encrypt(n);
        n.token = e,
        mui.ajax({
            url: common.apihost + "/coupon/getUserCoupon",
            data: n,
            dataType: "json",
            contentType: "application/json",
            type: "post",
            timeout: 1e4,
            success: function(t) {
                console.log("aaaa", t);
                var n = "";
                0 == t.code ? (o.couponInfo = t.data, o.couponShow(o.cid), 0 == t.data.length && (mui(".mask")[0].style.display = "block", mui(".popup")[0].style.display = "block")) : (n = '<div class="coupon-inner noSelect"><span class="select-icon"></span>使用<span class="red">二狗优惠券</span></div>', mui(".coupon-wrap")[0].innerHTML = n)
            }
        })
    },
    couponShow: function(o) {
        var t = this.couponInfo;
        if (!t && t.length <= 0) couponHtml = '<div class="coupon-inner noSelect"><span class="select-icon"></span>使用<span class="red">二狗优惠券</span></div>',
        couponId = 0;
        else {
            var n;
            if ("1" == o) for (var e = 0; e < t.length; e++)"1" == t[e].cid && (n = t[e]);
            else for (var i = 0,
            e = 0; e < t.length; e++)"1" != t[e].cid && t[e].cid != o || Number(t[e].money) > i && (i = Number(t[e].money), n = t[e]);
            n ? (couponHtml = '<div class="coupon-inner select"><span class="select-icon"></span>使用<span class="red">减' + n.money + "元</span>" + n.title + "</div>", couponId = n.id) : (couponHtml = '<div class="coupon-inner noSelect"><span class="select-icon"></span>使用<span class="red">二狗优惠券</span></div>', couponId = 0)
        }
        mui(".coupon-wrap")[0].innerHTML = couponHtml
    },
    getCouponInfo: function() {
        var o = this,
        t = Date.parse(new Date) / 1e3,
        n = {
            version: common.version,
            time: t,
            unionid: common.unionid,
            uid: common.uid,
            couponId: o.id
        },
        e = common.encrypt(n);
        n.token = e,
        mui.ajax({
            url: common.apihost + "/coupon/getUserCouponInfo",
            data: n,
            dataType: "json",
            contentType: "application/json",
            type: "post",
            timeout: 1e4,
            success: function(t) {
                console.log("aaaa", t);
                if (0 == t.code) {
                    var n = o.couponInfo = t.data;
                    o.defaultId = "5" == n.cid ? "1": "3" == n.cid || "7" == n.cid ? "3": "2",
                    o.couponShow2(o.defaultId)
                } else mui(".select-text")[0].innerHTML = "";
                o.getGroupList()
            }
        })
    },
    couponShow2: function(o) {
        var t = this,
        n = t.couponInfo,
        e = "";
        if (n && ("1" == n.cid || "2" == n.cid && "2" == o || "3" == n.cid && "3" == o || "4" == n.cid || "5" == n.cid && "1" == o || "6" == n.cid && "2" == o || "7" == n.cid && "3" == o)) {
            if ("1" == n.cid || "2" == n.cid || "3" == n.cid) {
                e = ("1" == n.cid ? "全场": "2" == n.cid ? "100天": "365天") + n.money + "元红包券"
            } else e = "4" == n.cid ? "王二狗" + n.discount + "折优惠券": n.title;
            couponId = n.id
        } else couponId = 0;
        mui(".select-text")[0].innerHTML = e
    }
},
new buyVip;