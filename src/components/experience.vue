<template>
	<div id="experience">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">内部体验</h1>
		</header>
		<div class="mui-content">
			<form @submit.prevent="form_1()" class="box_1">
					<ul class="">
				    	<li class="header_1">当前可用体验余额：{{maxnumber}}元</li>
				    	<li class="title_1">体验金额：</li>
				    	<li class="money_1">
				    		<input type="number" min="0" :max="maxnumber" v-model="total_fee" required="" placeholder="输入金额" />
				    	</li>
				    	<li class="btn_1">
				    		<button type="submit" class="btn">立即体验</button>
				    	</li>
				   </ul>
		    </form>
		    <div class="box_2" style="height: 500px;overflow: auto;">
		    	返回值
		    </div>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		name:'',
		data(){
			return{
				openid:localStorage.openid,
				total_fee:'',				//充值金额
				userId:localStorage.ids,
				maxnumber:0,				//剩余体验金额
				w:null,	
				pays:{},
			}
		},
		methods:{
			form_1(){
				var this_1=this
				this.w = plus.nativeUI.showWaiting();
				//结果为 alipay 支付宝 wxpay 微信
				var id='wxpay';
				//appid
				var appid='HBuilder'
				var url='http://demo.dcloud.net.cn/payment/?payid='+id+'&appid='+appid+'&total='+this.total_fee
				$.ajax({
					type:"get",
					url:url,
					success:function(x){
						console.log(x);
						$('.box_2').append('<div>----- 请求订单成功 -----</div>')
						$('.box_2').append('<div>'+JSON.stringify(x)+'</div>');
						this_1.w.close();
						this_1.w = null;
						
						plus.payment.request(this_1.pays[id], x, function(result) {
							$('.box_2').append('<div>----- 支付成功 -----</div>')
							$('.box_2').append('<div>' + JSON.stringify(result) + '</div>')
							plus.nativeUI.alert('支付成功：感谢你的支持，我们会继续努力完善产品。', function() {
								back();
							}, '捐赠');
						}, function(e) {
							$('.box_2').append('<div>----- 支付失败 -----</div>')
							$('.box_2').append('<div>' + '[' + e.code + ']：' + e.message + '</div>')
							plus.nativeUI.alert('更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html', null, '支付失败：' + e.code);
						});
						
					}
				});
				
				//Hb,商家Hb充值
				var obj=new Object();
					obj.openid=this.openid 		//用户openid
					obj.chargetype=1			//充值类型 1:hb充值 4:商家HB充值
					obj.total_fee=this.total_fee 			//充值金额
					obj.memberid=this.userId	//用户id
					obj.isexperience=0			//是否是体验金0:是 1:不是 	
//				http('post','/platform/weixinpay/hblbOrder',obj,this.hblbOrder_return)
			},
			hblbOrder_return(x){
				console.log(x);
				var this_1=this;
				if(x.code==10000){
					wx.chooseWXPay({
						timestamp: x.data.timeStamp, 		// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: x.data.nonceStr, // 支付签名随机串，不长于 32 位
						package: x.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: x.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: x.data.paySign, // 支付签名
						success: function (res) {
							// 支付成功后的回调函数
//							alert(JSON.stringify(res))
//							if(res.errMsg=='chooseWXPay:ok'){
								//hb充值成功后回调方法
								var obj=new Object();
									obj.userid=this_1.userId;
									obj.orderid= x.data.orderid;
									obj.chargetype=1				 //1 hb充值 4商家hb充值 
//									alert(JSON.stringify(obj))
								http('post','/platform/weixinpay/hbpay_notify',obj,this_1.hbpay_notify)
//							}
						},
					});
				}else{
					mui.toast(x.description,{ duration:2000, type:'div' })
				}
			},
			hbpay_notify(x){
//				alert(JSON.stringify(x));
				this.findExperience();
			},
			//查询当前用户还可以体验的金额
			findExperience(){
				http('post','/hb/hbDistribution/lastExperience',{'memberid':this.userId},this.findExperience_return)
			},
			findExperience_return(x){
				console.log('查询当前用户还可以体验的金额',x)
				this.maxnumber=x
			}
		},
		mounted(){
			var this_1=this;
			//查询当前用户还可以体验的金额
			this.findExperience();
			
			// 获取支付通道
			plus.payment.getChannels(function(channels) {
				console.log(JSON.stringify(channels))
				//		打印结果为
				//		[{"id":"alipay","description":"支付宝","serviceReady":true},{"id":"wxpay","description":"微信","serviceReady":true}]
				var txt = '支付通道信息：';
				for(var i in channels) {
					var channel = channels[i];
					this_1.pays[channel.id] = channel;
				}
			}, function(e) {
				$('.box_2').append('<div>' + 获取支付通道失败 + e.message + '</div>')
			});
		},
		created(){
			
		}
	}
</script>

<style>
	#experience{
		height: 100%;
	}
	#experience .mui-content{
		height: 100%;
	}
	#experience .box_1{
		height: 100%;
		background-image: url('../assets/img/893645114956839482.jpg');
		background-size:cover;
		padding: 1px 0px;
		display: block;
	}
	#experience .box_1 ul{
		margin: 2.6rem 0.82rem 0px;
		padding: 1px;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
		text-align: center;
	}
	#experience .box_1 .header_1{
		font-size: 0.24rem;
		letter-spacing: 0px;
		color: #b2b2b2;
		padding: 0.45rem 0px 0px;
	}
	#experience .box_1 .title_1{
		font-size: 0.43rem;
		letter-spacing: 0px;
		color: #3fcfc2;
		margin: 1.32rem 0px 0px;
	}
	#experience .box_1 .money_1{
		margin: 0.46rem 0px 0px;
		text-align: center;
	}
	#experience .box_1 .money_1 input{
		width: 2.45rem;
		border: none;
		background: none;
		border-bottom: 1px solid #3fcfc2;
		text-align: center;
		font-size: 0.24rem;
		color: rgba(0, 0, 0, 0.5);
		padding: 0px;
		margin: 0px;
		border-radius: 0px;
		height: auto;
	}
	#experience .box_1 .btn_1{
		margin: 1.7rem 0px 0.38rem;
		text-align: center;
	}
	#experience .box_1 .btn_1 button{
		width: 2rem;
		height: 0.62rem;
		background-color: #18a56a;
		border-radius: 5px;
		border: none;
		font-size: 0.36rem;
		color: #ffffff;
		padding: 0px;
	}
	
	
</style>
