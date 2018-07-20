<template>
	<div id="Invoice">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">
		    	<div>
		    		<span class="active">手工做单</span>
		    		<a href="#/InvoiceList">手工单记录</a>
		   		</div>
		    </h1>
		    
		</header>
		<div class="mui-content">
		    <form @submit.prevent="form_1()" class="mui-input-group form_1">
					<div class="mui-input-row">
						<label>会员</label>
						<input type="text" required="" v-model="phone" placeholder="会员手机号" />
					</div>
					<div class="mui-input-row">
						<label>金额</label>
						<input type="text" min="0" class="mui-input-clear" v-model="total_fee" placeholder="请输入金额" />
					</div>
					<div class="mui-input-row">
						<label>让利</label>
						<input type="text" readonly="" v-model="Make_profit" class="mui-input-clear"/>
					</div>
					
					<div class="radio_box mui-input-row">
						<div class="mui-input-row mui-radio mui-left">
							<label>HB</label>
							<input v-model="chargetype" value="1" name="radio1" type="radio">
						</div>
						<div class="mui-input-row mui-radio mui-left">
							<label>现金券</label>
							<input v-model="chargetype" value="4" name="radio1" type="radio" >
						</div>
					</div>
					<div class="mui-button-row">
						<button type="submit" class="mui-btn mui-btn-primary">确认</button>&nbsp;&nbsp;
						<button type="button" @click="go()" class="mui-btn mui-btn-danger">取消</button>
					</div>
					
				</form>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc'
	export default{
		name:'',
		data(){
			return{
				openid:localStorage.openid,
				chargetype:1,	//充值类型：1:hb充值，2:lb充值,3:商家为会员充值,4:现金券支付
				total_fee:'',	//金额
				phone:'',	//会员手机号
				shopId:'',	//店铺id
				shop:{},	//店铺信息
			}
		},
		computed:{
			Make_profit(){		//显示让利的金额
				var money='';
				if(this.total_fee && this.shop.contractratio){
					money=this.total_fee*this.shop.contractratio/100;
				}
				return money
			}
		},
		methods:{
			go(){
				window.history.back();
			},
			//店铺为消费者做单
			form_1(){
				console.log(this.chargetype)
				var obj=new Object();
					obj.openid=this.openid;
					obj.chargetype=this.chargetype;
					obj.total_fee=this.total_fee;
					obj.phone=this.phone;
					obj.shopId=this.shopId;
				if(this.chargetype==4){
					if(this.total_fee%1==0){
						http('post','/platform/weixinpay/shopFromMemberhbOrder',obj,this.shopFromMemberhbOrder)
					}else{
						mui.toast('请输入整数金额',{ duration:2000, type:'div' })
					}
				}else{
					http('post','/platform/weixinpay/shopFromMemberhbOrder',obj,this.shopFromMemberhbOrder)
				}
			},
			shopFromMemberhbOrder(x){
				var this_1=this;
//				console.log(x)
				if(x.status=='error'){
					mui.alert(x.description,'提示',function(){},'div')
				}else if(x.status==0){
					wx.chooseWXPay({
						timestamp: x.data.timeStamp, 		// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: x.data.nonceStr, // 支付签名随机串，不长于 32 位
						package: x.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
						signType: x.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
						paySign: x.data.paySign, // 支付签名
						success: function (res) {
							// 支付成功后的回调函数
							var obj=new Object();
								obj.phone=this_1.phone;
								obj.shopid=this_1.shopId;
								obj.chargetype= this_1.chargetype;
								obj.orderid = x.data.orderid;
								obj.manuorderId= x.data.manuorderId
	//						alert(JSON.stringify(obj))
							http('post','/platform/weixinpay/sjpay_notify',obj,this_1.sjpay_notify)
						}
					});
				}else{
					mui.alert(x.message,'提示',function(){
						if(x.message=='现金券下单成功'){
							window.history.back();
						}
					},'div')
				}
			},
			sjpay_notify(x){
				if(x.code==10000){
					mui.alert('做单成功！','提示',function(){
						window.history.back();
					},'div')
				}else{
					mui.toast(x.description,{ duration:2000, type:'div' })
				}
			}
			
		},
		mounted(){
			var this_1=this;
//			console.log(this.$route)
			this.shopId=this.$route.query.id	? this.$route.query.id : '';	
			//查询商家基本信息
			http('post','/mall/mobile/shop/showShop',{'id':this.shopId},showShop)
			function showShop(x){
				console.log('店铺基本信息',x);
				this_1.shop=x.shop;
			}
		},
		
	}
</script>

<style>
	#Invoice{
		height: 100%;
	}
	#Invoice .form_1{
		margin-top: 0.4rem;
	}
	#Invoice .radio_box{
		display: flex;
		justify-content:center;
	}
	
	#Invoice .Record{
		position: absolute;
		right: 5px;
		top: 9px;
		z-index: 1;
	}
	
	#Invoice .mui-title>div{
		display: flex;
		border: 1px solid #007aff;
		border-radius: 30px;
		height: 30px;
		line-height: 30px;
		margin: 7px auto;
		width: 200px;
		overflow: hidden;
	}
	#Invoice .mui-title>div>*{
		width: 50%;
		font-size: 14px;
	}
	#Invoice .mui-title>div>.active{
		color: #FFFFFF;
		background: #007aff;
	}
	

</style>