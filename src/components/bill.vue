<template>
	<div>
		<div id="bill">
			<header class="mui-bar mui-bar-nav">
			    <a @click="go_1()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">快速买单</h1>
			</header>
			<div class="banner" v-if="userid==''">
				<img v-on:click="showpacket()" src="@/assets/img/894997369988792767.jpg"/>
			</div>	

					<div class="content">
						<form @submit.prevent="confirm()">
							<p> <b>付款给：</b>{{title}}</p>
							<div class="money">
								<ul>
									<li class="border">
										<div>消费金额：</div>
										<div>
											<input required="" type="number" min="0.01" max="20000" step="0.01" v-on:blur="chang_Total()" v-model="Total" placeholder="0" />
										</div>
									</li>
									<li>
										<div>让利金额：</div>
										<div>
										<input readonly="" type="text" name="" v-model="profit" />
										</div>
									</li>
								</ul>
							</div>
							<div class="method">
								<div class="top">
									<label>让利方式：</label>
									<input class="left1" required="" v-model="type_1" value="1" type="radio" name="name_1"/>&nbsp;<label>HB</label>
									<input class="left2" required="" v-model="type_1" value="2" type="radio" name="name_1" />&nbsp;<label>现金券</label>
								</div>
								<div class="total">
									<h1>￥
										<span v-show="type_1==1">{{Total}}</span>
										<span v-show="type_1==2 && Total!==''">{{Total-profit}}</span>
										元 </h1>
									<p v-show="type_1==1">本单获得红利分润{{profit}}个HB</p>
									<p v-show="type_1==2">本次消费省钱{{profit}}元</p>
								</div>
								<button type="submit">确认支付</button>
							</div>
						</form>
					</div>	

		</div>
			
			<model v-show="modelShow" v-on:shoudao='modelsd' :zidingyi="model_type"></model>
			<!--支付成功-->
			<finish v-show="finishShow" v-on:shoudao='finishsd' :zidingyi="Total_type"></finish>
			<!--领取红包-->
			<packet v-show="packetShow" v-on:shoudao='packetsd' :zidingyi="Total_type"></packet>
			<!--微信弹出框-->
			<!--好像目前没什么用-->
			<weixin v-show="wxShow" v-on:shoudao='wxsd' :zidingyi="Total_type"></weixin>
	</div>
</template>
<script>
	import {http} from '@/assets/fc';
	import model from './model';
	import weixin from './wx';			//微信
	import packet from './packet';	//红包
	import finish from './finish';	//支付成功
	export default{
		name:"bill",
		components:{
				model,
				packet,
				weixin,
				finish
			},
			data:function(){
				return{
					Total:'',	//消费金额
					profit:'',	//让利金额
					type_1:1,			//让利方式 1表示hb2表示现金券
					Total_type:[1,2,3],		//分别表示总价，让利方式，
					payment:false,		//确认支付
					modelShow:false,	//弹出框底层
					finishShow:false,	//支付成功
					packetShow:false,	//领取红包
					wxShow:false,		//微信弹出框
					model_type:'packetShow',	//弹出框类型
					title:'',		//店铺或者分享者名称
					shop_info:{},		//店铺基本信息
					openid:localStorage.openid,	//用户openid
					userid:localStorage.ids ? localStorage.ids : '',
					shangyiye:'',	//上一页url
				}
			},
			methods:{
				//返回上一页
				go_1(){
					
					if(this.shangyiye && this.shangyiye!=''){
						this.$router.push('/'+this.shangyiye)
					}else{
						window.history.back();
					}
				},
				//修改金额
				chang_Total:function(){
					//contractratio 让利比例
					if(this.Total=='' || this.Total<0){
						this.profit='';
					}else{
						var thisprofit=this.Total*this.shop_info.shop.contractratio/100;
						this.profit=thisprofit.toFixed(2);
					}
					
				},
				//领取红包弹出框
				showpacket:function(){
					this.model_type='packetShow';
					this.modelShow=true;
					this.packetShow=true
//					this.Total_type=[this.Total,this.type_1]
				},
				//提交
				confirm:function(){
//					this.model_type='finishShow';
//					this.modelShow=true;
//					this.finishShow=true
//					this.Total_type=[this.Total,this.type_1]
					
					//用户到店消费微信下单接口
					var obj=new Object();
						obj.openid=this.openid;
						obj.shopPhone=this.shop_info.shop.companyphone
						obj.payWay=this.type_1==2 ?	0 : 1;	//让利方式 0:现金券 1:hb
						obj.remark='';
						obj.memberid=this.userid;
						obj.xfPrice=this.Total;		//消费金额
						obj.rlPrice=this.profit;
					http('post','/platform/weixinpay/memberOrder',obj,this.memberOrder_return)
				},
				memberOrder_return(x){
					console.log('用户到店消费微信下单接口',x);
					var this_1= this;
					if(x.code==10000){
						wx.chooseWXPay({
							timestamp: x.data.timeStamp, 		// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
							nonceStr: x.data.nonceStr, // 支付签名随机串，不长于 32 位
							package: x.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
							signType: x.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
							paySign: x.data.paySign, // 支付签名
							success: function (res) {
								// 支付成功后的回调函数
	//							if(res.errMsg=='chooseWXPay:ok'){
//								alert(JSON.stringify(res));
								
									//会员到店消费支付成功的回调方法
									var obj=new Object();
										obj.orderid = x.data.orderid;
//										alert(JSON.stringify(obj))
									http('post','/platform/weixinpay/memberpay_notify',obj,this_1.memberpay_notify)
	//							}
							}
						});
					}
				},
				memberpay_notify(x){
//					alert(JSON.stringify(x));
					this.model_type='finishShow';
					this.modelShow=true;
					this.finishShow=true
					this.Total_type=[this.Total,this.type_1]
				},
				
				modelsd:function(x){
					console.log('bill.vue收到了参数model的参数');
//					this.payment=false;
					this.wxShow=false;
					this.modelShow=false;
					this.finishShow=false;
					this.packetShow=false;
				},
				finishsd:function(x){
					console.log('bill.vue收到了参数finish的参数');
				},
				packetsd:function(x){
					console.log('bill.vue收到了参数packet的参数',x);
					if(x=='wx'){
						this.model_type='wx';
						this.wxShow=true;
						this.packetShow=false;
					}else{
						this.modelShow=false;
						this.finishShow=false;
						this.packetShow=false;
					}
				},
				wxsd:function(x){
					console.log('wx.vue收到了参数packet的参数',x);
				}
			},
			mounted: function(){
				var this_1=this;
				if(this.userid==''){
					this.modelShow=true		//弹出框底层
					this.packetShow=true	//领取红包
				}
				
				var this_1=this;
				this.type=this.$route.query.type ? this.$route.query.type : '';
				this.memId=this.$route.query['amp;Inviterid'] ? this.$route.query['amp;Inviterid'] : '';		//商铺Id
				this.shangyiye=this.$route.query.url ? this.$route.query.url : ''; //返回的地址
				//查询商家基本信息
				http('post','/mall/mobile/shop/showShop',{'id':this.memId},showShop_return)
				function showShop_return(x){
					console.log('查询商家基本信息',x);
					this_1.shop_info=x
				}
				
				
				
				//扫描二维码后,返回送红包者的名称
				var obj=new Object();
					obj.id=this.memId;
					obj.type=this.type	 	//0合伙人,1区域代理,2商家4,个人
					
				http('post','/agent/manager/area/getHbName',obj,getHbName)
				function getHbName(x){
					console.log('返回送红包者的名称',x)
					this_1.title=x;
				}
			},
		}
</script>
<style>
	#bill{
		padding: 44px 0px 0px 0px;
		background-color:#f7f8fa;
		height:100%;
		box-sizing: border-box;
	}
	#bill .header{
		width:100%;height:0.8rem;background-color:#1d93f3;font-size:0.2rem;padding-top:0.24rem;box-sizing: border-box;color:#FFFFFF;
					font-size:0.35rem;
		}
	#bill .header span{
		margin-left:0.17rem;
	}
	#bill i{font-style:normal;}
	#bill .banner img{width:100%;}
	#bill .content{
		width:90%;font-size:0.2rem;
		margin: 0.2rem auto;
	}
	#bill .content p{width:100%;height:0.65rem;line-height:0.65rem;font-size:0.3rem;text-align:-webkit-auto;}
	#bill .money{text-align:-webkit-auto;width:100%;height:2rem;border:1px solid #efefef;font-size:0.2rem;border-top-left-radius:0.15rem;
					border-top-right-radius:0.15rem;}
	#bill .money ul{height:100%;width:100%;}	
	#bill .money span{color:#3d9de9;}
	#bill .money .border{border-bottom:1px solid #EFEFEF;}			
	#bill .money ul li{
		height:50%;
		line-height:1rem;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
	}
	#bill .money ul li input{
		background: none;
		border: none;
	}
	
	#bill .method .left1{margin-left:0.2rem;}	
	#bill .method .left2{margin-left:0.72rem;}				
	#bill .method{text-align:-webkit-auto;margin-top:0.05rem;border:1px solid #EFEFEF;}
	#bill .method input{vertical-align:middle;background-color:#2d8fda;}
	#bill .method .top{
		height:1rem;line-height:1rem;border-bottom:1px solid #EFEFEF;
	}
	#bill .method .total{text-align: center;}
	#bill .method .total h1{margin-top:0.83rem;font-size:0.7rem;}
	#bill .method .total p{margin-top:0.34rem;text-align: center;color: #6b6b6b;}
	#bill .method button{width:90%;height:0.9rem;background-color:#1d93f3;border-radius:0.25rem;color:#FFFFFF;margin-top:0.3rem;margin-left:5%;
							box-shadow:0 0 5px #eeedf2;}
	

</style>