<template>
	<div id="app">
		<!--<transition name="fade" mode='out-in'>-->
			<router-view v-on:shoudao='sd' :zidingyi="chuandiText"></router-view>
		<!--</transition>-->
		<!--底部导航-->
		<keep-alive>
			<router-view name="tabbar" :zidingyi="chuandiText"></router-view>
		</keep-alive>
		
		<follow v-if="!follow_show"></follow>
		
		<div id="progressbar_box">
			<div class="mui-text-center">0%</div>
			<div id="progressbar_1" class="mui-progressbar">
				<span></span>
			</div>
		</div>

	</div>
</template>

<script>
	import { http, base64_splicing ,isweixn,GetRequest} from '@/assets/fc';
	import	follow	from '@/components/follow'
	export default {
		components:{
			follow
		},
		name: 'app',
		data() {
			return {
				'chuandiText': '还没有传递',
				follow_show:true,		//是否关注
			}
		},
		methods: {
			sd: function(x) {
				this.shoudaoText = x
				console.log('Appvue收到了参数', x)
				this.setec = x
				this.chuandiText = x
			}
		},
		mounted: function() {
			mui("#progressbar_1").progressbar({
				progress: 0
			}).show();
			//		$('#progressbar_box').show();
			//		$('#progressbar_box').children().eq(0).html(num+'%');
			//		mui("#progressbar_1").progressbar().setProgress(per);
		},
		created: function() {
			var this_1=this;
			console.log('当前路由',this.$route.path)
			var path=this.$route.path;
			
			http('post','/platform/JSSDK/judgeIsFollow',{'openid':localStorage.openid},judgeIsFollow)
			function judgeIsFollow(x){
//				console.log('是否关注',x)
				if(path=='/Home'){
					console.log('是否关注',x)
					this_1.follow_show=x;
//					this_1.follow_show=false;	//不显示
				}
			}
			
			
			//获取url参数
			var url_data=GetRequest();
				if(!sessionStorage.url){
					sessionStorage.url=window.location.href;	//保留跳转前的页面
				}
			if((!localStorage.weixin_user || !localStorage.openid || localStorage.openid=='undefined') && isweixn()){
				window.location.href='authorization.html';
			}else{
//				console.log(localStorage.weixin_user)
			}
			
			console.log('获取授权之前的页面地址',sessionStorage.url)
			var jsApiList=[
					'onMenuShareTimeline',	//分享到朋友圈
					'onMenuShareAppMessage',	//分享给朋友
//					'onMenuShareQQ',		//分享到QQ
//					'onMenuShareWeibo',		//分享到腾讯微博
//					'onMenuShareQZone',	//分享到QQ空间
//					'startRecord',		// 音频接口开始录音接口
//					'stopRecord',		//音频接口停止录音接口
//					'onVoiceRecordEnd',	//监听录音自动停止接口
//					'playVoice',		//播放语音接口		
//					'pauseVoice',		//暂停播放接口
//					'stopVoice',		//停止播放接口
//					'onVoicePlayEnd',	//监听语音播放完毕接口
//					'uploadVoice',		//上传语音接口
//					'downloadVoice',	//下载语音接口
//					'chooseImage',		//没法对本地选择的图片进行预览（chooseImage接口本身就支持预览，不需要额外支持）		
//					'previewImage',		//预览图片接口
//					'uploadImage',		//上传图片接口
//					'downloadImage',	//下载图片接口
//					'translateVoice',	//智能接口	识别音频并返回识别结果接口
//					'getNetworkType',	//设备信息 获取网络状态接口
//					'openLocation',		//地理位置 使用微信内置地图查看位置接口
//					'getLocation',		//获取地理位置接口
//					'hideOptionMenu',	//不知道什么接口
//					'showOptionMenu',	//不知道什么接口
//					'hideMenuItems',	//批量隐藏功能按钮接口
//					'showMenuItems',	//批量显示功能按钮接口
//					'hideAllNonBaseMenuItem',	//隐藏所有非基础按钮接口
//					'showAllNonBaseMenuItem',	//显示所有功能按钮接口
//					'closeWindow',		//关闭当前网页窗口接口
					'scanQRCode',		//调起微信扫一扫接口
					'chooseWXPay',		//发起一个微信支付请求
//					'openProductSpecificView',	//跳转微信商品页接口
//					'addCard',			//批量添加卡券接口
//					'chooseCard',		//拉取适用卡券列表并获取用户选择信息
//					'openCard'			//查看微信卡包中的卡券接口
			]
			
//			$.ajax({
//				type:"get",
//				data:{'url':location.href.split('#')[0]},
//				url:"http://122.114.179.196:81/weixin/public/index.php/index/index/index",
//				async:true,
//				success:function(x){
//					console.log(x)
//					var x=JSON.parse(x)
//					wx.config({
//			          debug: false,
//			          appId:x.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
//			          timestamp:x.timestamp, // 必填，生成签名的时间戳
//			          nonceStr: x.nonceStr, // 必填，生成签名的随机串
//			          signature: x.signature,// 必填，签名，见附录1
//			          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
//			          jsApiList: jsApiList
//			       });
//				}
//			});
//			
//			http('get','/platform/JSSDK/getAccessToken','',getAccessToken)
//			function getAccessToken(x){
//				console.log('getAccessToken测试接口',x)
//			}
			
			
			http('get','/platform/JSSDK/signtrue',{'url':location.href.split('#')[0]},signtrue)
			function signtrue(x){
				console.log('获取签名',x)
				if(x.code==10000){
					wx.config({
			          	debug: false,
			          	appId:x.data.appId, 			// 和获取Ticke的必须一样------必填，公众号的唯一标识
			          	timestamp:x.data.timestamp, 	// 必填，生成签名的时间戳
			          	nonceStr: x.data.nonceStr, 		// 必填，生成签名的随机串
			          	signature: x.data.signature,	// 必填，签名，见附录1
			          	//需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
			          	jsApiList: jsApiList
			       });
				}else{
					mui.toast(x.description);
				}
			}
			
			
		}
	}
</script>

<style>
	.Loading{
		padding: 0.1rem 0px;
		font-size: 0.28rem;
		color: #757575;
	}
	.Loading i{
		margin-right: 10px;
	}
	.Loading i:before{
		animation: Loading 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	
	.cb{
		clear: both;
	}
	#progressbar_box {
		position: fixed;
		top: 0%;
		left: 0px;
		width: 100%;
		height: 100%;
		padding: 60% 15px 0px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.4);
		padding-top: 60%;
		color: #FFFFFF;
		display: none;
	}
	
	#progressbar_1 {
		height: 4px;
		background: #FFFFFF;
	}
	
	.mui-toast-container {
		bottom: 50%;
	}
	
	.clear:after {
		clear: both;
		content: '';
		display: block;
	}
	
	em {
		font-style: normal;
	}
	
	i {
		font-style: normal;
	}
	
	html,
	body,
	#app {
		height: 100%;
	}
	
	body {
		line-height: inherit;
	}
	
	p {
		color: #000000;
	}
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	ul,
	li {
		list-style: none;
	}
	#app{
		height:100%;
	}
	
	.fade-enter {
		opacity: 0
	}
	
	.fade-enter-active {
		transition: opacity 0.5s;
	}
	.fade-leave {
		opacity: 1
	}
	.fade-leave-active {
		transition: opacity 0.3s;
	}
</style>