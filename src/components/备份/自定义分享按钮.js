$('.js_container').on('click','.weui-jiaj-video',function(){
    //从绑定的属性中获取值
    var item = $(this).attr('share-data');
    if(item) item = JSON.parse(item);
    
    // "1" 朋友圈  "2"朋友
    var getVideoId = item.videoId;
    // 当前页面url
    var curUrl = location.href.split('#')[0];
    // 分享模式
    var getRecommendMode = "1";
    
    var shareData = {
        videoId:getVideoId,
        url:curUrl,
        recommendMode:getRecommendMode
    };
    
    var getVideoName = item.videoName;
    var getCoverUrl = item.coverUrl;
    var getForwardUrl = item.forwardUrl;

    data = JSON.stringify(shareData);
    $.ajax({
        type:"post",
        url:shareVideo().replace("{userId}", userId),
        data:data,
        dataType:'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            //拿到返回的id
            var getAppId = data.appId;
            var getTimestamp = data.timestamp;
            var getNonceStr = data.nonceStr;
            var getSignature = data.signature;
            
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: getAppId, // 必填，公众号的唯一标识
                timestamp: getTimestamp, // 必填，生成签名的时间戳
                nonceStr: getNonceStr, // 必填，生成签名的随机串
                signature: getSignature,// 必填，签名，见附录1
                jsApiList: [  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ] 
            });
            
            wx.ready(function(){
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: getVideoName, // 分享标题
                    link: getForwardUrl, // 分享链接
                    imgUrl: getCoverUrl, // 分享图标
                    success: function () { 
                        // 用户确认分享后执行的回调函数
                        weui.toast('分享成功');
                    },
                    cancel: function () { 
                        // 用户取消分享后执行的回调函数
                        weui.toast('取消分享');
                    }
                });
                //分享到朋友
                wx.onMenuShareAppMessage({
                    title: getVideoName, // 分享标题
                    desc: getVideoName, // 分享描述
                    link: getForwardUrl, // 分享链接
                    imgUrl: getCoverUrl, // 分享图标
                    type: 'video', // 分享类型,music、video或link，不填默认为link
                    dataUrl: getForwardUrl, // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () { 
                        // 用户确认分享后执行的回调函数
                         weui.toast('分享成功');
                    },
                    cancel: function () { 
                        // 用户取消分享后执行的回调函数
                        weui.toast('取消分享');
                    }
                });
                //检查微信接口是否调用成功
                wx.checkJsApi({
                   jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                   success: function(res) {
                       // 以键值对的形式返回，可用的api值true，不可用为false
                       // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                   }
                });
            });
        },
        error: function(data) {
            
        }
    });
})