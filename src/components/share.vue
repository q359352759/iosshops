<template>
	<div id="share" v-show="share_show">
		<div class="mask" v-on:click="change_share()"></div>
		<!--<div class="fenxiangzhiyin">
			<div class="mui-text-right"><i class="icon iconfont icon-fenxiangzhiyin"></i></div>
			<div>分享领红包</div>
		</div>-->
		<div class="content_1">
			<img src="@/assets/img/share_bg.png"/>
			<div class="text_1">
				<button class="share" @click="share()">
					立即分享
				</button>
				<!--<span>每天限领一次</span>-->
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import {ajaxs,http} from "../assets/fc.js";
	export default{
		props: ['zidingyi'],	//接收父级传递的参数
		name:"share",
		components:{
			
		},
		data:function(){
			return{
				model_type:'',
				share_show:false,	//是否显示分享
				userId:localStorage.getItem('ids') && localStorage.getItem('ids')!='undefined' ? localStorage.getItem('ids') : '',
				share_obj:{},		//分享对象
				openid:localStorage.getItem('openid') ? localStorage.getItem('openid') : '',
				shares:{},	//分享权限
			}
		},
		methods:{
			//分享
			change_share(){
				this.share_show=false;
				this.$emit('shoudao',this.share_show);
			},
			shareGetDb_return(x){
				console.log('分享得现金券信息接口',x)
				if(x.code==10000){
					this.share_obj=x.data;
//					this.share();
				}
			},
			getDB(x){
//				{'code':666,data:0,'description':'具体内容','status':'success'}
				mui.alert(x.description,'提示',function() {
					location.reload();
				},function(){}, 'div');
			},
			shareAction(sb, bh){
				var this_1=this;
				if(!sb || !sb.s) {
					console.log('取消分享')
					return;
				}
				var msg = {
						title:this.share_obj.title,
						content: this.share_obj.title,
						href:'http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?Inviterid='+this.userId,
						extra: {
							scene: sb.x
						},
						thumbs:['../../static/logo.png'],	//分享消息的缩略图，类型为Array；
						pictures:['../../static/logo.png']
					};
				console.log(JSON.stringify(msg));
//				http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?Inviterid=3251d05517a6424889369a08f2781d6e
//				return;
				// 发送分享
				if(sb.s.authenticated) {
					console.log('已授权')
				 	this.shareMessage(msg, sb.s);
				} else {
					console.log('未授权');
					sb.s.authorize(function() {
						this_1.shareMessage(msg, sb.s);
					}, function(e) {
						console.log('认证授权失败：' + e.code + ' - ' + e.message);
					});
				}
			
			},
			shareMessage(msg, s){
				console.log(JSON.stringify(msg))
				var this_1=this;
				s.send(msg, function(){
					console.log('分享到"' + s.description + '"成功！');
					http('post','/platform/zlShareGetDb/getDB',{'uId':this_1.userId},this_1.getDB);
				}, function(e) {
					console.log('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
				});
			},
			//点击分享
			share(){
				var this_1=this;
				var shareBts = [];
				//创建弹出分享弹出框
				var ss = this.shares['weixin'];
				if(ss && ss.nativeClient){
					shareBts.push({
						title: '微信朋友圈',
						s: ss,
						x: 'WXSceneTimeline'
					})
					shareBts.push({
						title: '微信好友',
						s: ss,
						x: 'WXSceneSession'
					})
				}
				ss = this.shares['qq'];
				if(ss && ss.nativeClient){
					shareBts.push({
						title: 'QQ',
						s: ss
					});
				}
				// 弹出分享列表
				shareBts.length > 0 ? plus.nativeUI.actionSheet({
					title: '分享到',
					cancel: '取消',
					buttons: shareBts
				}, function(e) {
//					console.log(JSON.stringify(e));
					if(e.index>0){
						this_1.shareAction(shareBts[e.index - 1], true);
					}
				}) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
				
			},
			
		},
		mounted:function(){
			var this_1=this;
			if(window.plus){
				plusReady();
			}else{
				document.addEventListener("plusready",plusReady,false);
			}
			function plusReady(){
				 //在这里调用plus api
				plus.share.getServices(function(s) {
					this_1.shares = {};
					for(var i in s) {
						var t = s[i];
						this_1.shares[t.id] = t;
					}
				}, function(e){
					console.log('获取分享服务列表失败：' + e.message)
				});
			}
	           

		},
		created:function(){
			var this_1=this;
//			//分享得现金券信息接口
			http('post','/platform/zlShareGetDb/shareGetDb',{'uId':this.userId},this.shareGetDb_return);
		},
		watch:{
			//这个是监听事件可以不写也能收到数据
			zidingyi:function(x){
				console.log('share.vue收到数据',x);
				this.share_show=x;
			}
		}
	}
</script>

<style>
	#share .fenxiangzhiyin{
		position: absolute;
    	top: 10px;
    	right: 15px;
    	color: #ffffff;
    	animation: fenxiangzhiyin 1s linear infinite ;
	}
	#share .fenxiangzhiyin i{
		font-size: 0.8rem;
	}
	@keyframes fenxiangzhiyin{
		from{opacity: 0;}
		to{opacity: 1;}
	}
	
	
	#share{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 2;
		display: flex;
	}
	#share .mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 0px;
		left: 0px;
	}
	#share .content_1{
		/*background: none;*/
		position: relative;
		z-index: 1;
		margin: auto;
		top: -40px;
	}
	#share .content_1>img{
		width: 100%;
		object-fit: cover;
	}
	#share .content_1 .text_1{
		position: absolute;
		/*top: 440px;*/
		left: 0px;
		right: 0px;
		bottom: 0.4rem;
		text-align: center;
		width: 70%;
		display: flex;
		justify-content: center;
		margin: 0px auto ;
		/*background: #fb4d32;*/
	}
	#share .content_1 .text_1 .share{
		padding: 0px;
		border: none;
		display: inline-block;
		/*background: url(../assets/img/246960216428256640.png);*/
		background-size:cover;
		/*width: 125px;*/
		width: 2.5rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 0.6rem;
		text-align: center;
		color: #FA4534;
		
	}
	#share .content_1 .text_1 span{
		font-size: 0.26rem;
		padding-top: 0.3rem;
		color: #FFFFFF;
		margin-left: 0.2rem;
	}
	
</style>