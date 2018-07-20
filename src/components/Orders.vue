<template>
	<div id="Orders">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">订单详情</h1>
		</header>
		<div class="mui-content">
		    <ul>
				<div v-for="x in list">
					<orderchildren v-on:shoudao='shudao_1' v-bind:test="x"></orderchildren>
				</div>
			</ul>
			
			<ul class="mui-table-view box_3">
		        <li class="mui-table-view-cell">
		            	<span>消费方式</span>
		            	<div class="mui-pull-right input_1">
		            		<select name="" v-model="giftWay">
		            			<option value="0">HB</option>
		            			<option value="1">现金券</option>
		            		</select>
		            	</div>
		        </li>
		        <li class="mui-table-view-cell">
		           	获得HB
		           	<span class="mui-pull-right">{{Total_giftTotal}}</span>
		        </li>
		        <li class="mui-table-view-cell">
		        	支付方式
		        	<div class="mui-pull-right input_1">
		        		<select name="" v-model="payType">
		        			<option value="1">微信支付</option>
		        			<!--<option value="2">线下支付</option>
		        			<option value="3">货到付款</option>-->
		        		</select>
		        	</div>
		        </li>
		    </ul>
		    
		    <ul v-if="!address.address" class="mui-table-view address_1">
		        <li class="mui-table-view-cell">
		            <a href="#/site" class="mui-navigate-right">
		           		还没有收货地址请前往添加
		            </a>
		        </li>
			</ul>
			
			<ul  class="box_1" @click="open_1(true)">
				<li><i class="mui-icon mui-icon-location"></i></li>
				<li>
					<div class="mui-pull-right">{{address.phone}}</div>
					<div>
						收货人：{{address.shipto}}
					</div>
					<div>收货地址：{{address.address}}</div>
					<div></div>
				</li>
				<li>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
			
			<ul class="footer">
				<li>共<span>{{Total_number}}</span>件，总金额
					<span v-if="giftWay==0">￥{{Total_Price}}</span>
					<span v-if="giftWay==1">￥{{Cash_method}}</span>
				</li>
				<li @click="place_order()">提交订单</li>
			</ul>
		</div>
		
		<div class="address_list" :class="{'active':open_address}">
			<header>
				<i @click="open_1(false)" class="mui-icon mui-icon-arrowleft"></i>
				管理收货地址
			</header>
			<ul class="cnentent_1">
				<li @click="change_address(x)" v-for="x in address_list" :class="{'active':x==address}">
					<div class="left_1">
						<div>
							收货人：{{x.shipto}}<span class="mui-pull-right">{{x.phone}}</span>
						</div>
						<div>{{x.address}}</div>
					</div>
					<div class="right_1"> <i class="mui-icon mui-icon-checkmarkempty"></i></div>
				</li>
			</ul>
			<a href="#/addres" class="footer_1">
				新增收货地址
			</a>
		</div>
	</div>
</template>

<script>
	
//	sessionStorage.commodity0516 
//	格式为  转json [
//			{c:产品id,
//			s:规格Id,
//			q:购买数量
//			cartId:''	//购物项id 没有就不传
//			},
//		]
	import orderchildren from '@/components/Order_children' 
	import {http} from '@/assets/fc';
	export default{
		components:{
			orderchildren
		},
		data:function(){
			return{
				uerid:localStorage.ids,
				open_address:false,		//是否显示收货地址列表
				address:{},				//收货地址
				product:{},			//产品
//				productsku:[],		//规格
				Specifications:{},	//所选规格
				shop:{},			//店铺
				address_list:[],	//收货地址列表
				Total_number:0,		//总数量
				Total_Price:0,		//总价格
				Total_giftTotal:0,	//Hb总和
				list:JSON.parse(sessionStorage.commodity0516),		//给orderchildren组件的参数
				place_list:[],		//生成订单的列表
				giftWay:0,  		//消费方式 : 0:hb  1:现金券 默认0
				payType:1,			//支付类型   1线上支付 2线下支付 3货到付款（ 储存的是数字值）	
				tijiao_number:0,	//提交订单数量
				Cash_method:0		//选择现金券的金额
			}
		},
		filters:{},
		methods:{
					
			orderSubmit(x){
				console.log('订单在线支付,提交订单',x)
			},
			//提交订单
			place_order(){
				var this_1=this;
				console.log(this.place_list)
				
				//订单在线支付,提交订单
				var obj=new Object();
					obj.productId=this.place_list[0].productId
					obj.adId=this.address.ids;
					obj.userid=this.uerid;
					obj.giftWay=this.giftWay	// 0:hb  1:现金券
					obj.giftTotal='';	//加价
					obj.payType=this.payType;	//支付类型 0 默认状态 1线上支付 2线下支付 3货到付款（ 储存的是数字值）
					obj.openId=localStorage.openid ? localStorage.openid : '';
					obj.totalAmount=this.giftWay==0 ? this.place_list[0].Price : this.place_list[0].Price-this.place_list[0].giftTotal;
					obj.skuId=this.place_list[0].skuId ? JSON.stringify(this.place_list[0].skuId) : '';
					obj.cartId=this.place_list[0].cartId
				http('post','/platform/weixinpay/orderSubmit',{'data':JSON.stringify(obj)},this.orderSubmit)
				return
				
//				生成订单的方法
				var place_list=this.place_list;
				for(var i=0;i<place_list.length;i++){
					var obj=place_list[i];
						obj.adId=this_1.address.ids;	//用户收货地址信息id,默认为空,
						obj.userid=this_1.uerid;	
						obj.giftWay=this_1.giftWay	// 0:hb  1:现金券
						obj.payType=this_1.payType;	//支付类型 0 默认状态 1线上支付 2线下支付 3货到付款（ 储存的是数字值）
						obj.openId=localStorage.openid ? localStorage.openid : '';
						obj.totalAmount=this_1.giftWay==0 ? place_list[i].Price : place_list[i].Price-place_list[i].giftTotal;
						console.log(obj);
					http('post','/mall/mobile/order/buyOrder',{data:JSON.stringify(obj)},this.place_order_return);
				}
				
//					wx.chooseWXPay({
//						timestamp: x.data.timeStamp, 		// 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//						nonceStr: x.data.nonceStr, // 支付签名随机串，不长于 32 位
//						package: x.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//						signType: x.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//						paySign: x.data.paySign, // 支付签名
//						success: function (res) {
//							// 支付成功后的回调函数
//						},
//						fail: function(res) {
//				            //接口调用失败时执行的回调函数。
//				        },
//				        complete: function(res) {
//				            //接口调用完成时执行的回调函数，无论成功或失败都会执行。
//				        },
//				        cancel: function(res) {
//				            //用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
//				        },
//				        trigger: function(res) {
//				            //监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
//				        }
//					});
				
			},
			place_order_return(x){
				if(x.success){
					this.tijiao_number++;
					if(this.place_list.length==this.tijiao_number){
						mui.toast('提交成功',{ duration:2000, type:'div'});
						//如果提交成功就删除
//						sessionStorage.removeItem('commodity0516')
						this.$router.push('/order');
					}
				}else{
					mui.toast(x.msg,{ duration:2000, type:'div' })			
				}
				console.log('提交订单',x)
			},
			//打开选择收货地址
			open_1(x){
				this.open_address=x
			},
			//选择地址
			change_address(x){
				this.address=x
				this.open_address=false
			},

			//获取收货地址
			addressList(){
				http('post','/platform/sysShippingAddress/addressList?uId='+this.uerid,'',this.addressList_return)
			},
			addressList_return(x){
				console.log('收货地址列表',x);
				var this_1=this
				this.address_list=x.data;
				if(x.data.length>0){
					this_1.address=x.data[0];
					for(var i=0;i<x.data.length;i++){
						if(x.data[i].isdefault){
							this_1.address=x.data[i];
						}
					}
				}
			},
			//收到参数
			shudao_1(x){
				console.log('收到参数',x);
				this.Total_number+=x.number;
				this.Total_Price+=x.Price;		//总金额
				this.Total_giftTotal+=x.giftTotal;	//获取Hb
				var Cash_method=this.Total_Price-this.Total_giftTotal 
				this.Cash_method+=parseFloat(Cash_method.toFixed(2));	//使用现金券的金额
				this.place_list.push(x);
			}
		},
		mounted:function(){
			var this_1=this;
			this.addressList();				//收货地址
		},
		created:function(){
			
		},
	}
</script>

<style>
	#Orders{
		font-size: 0.28rem;
		padding: 0px 0px 60px 0px;
	}
	
	#Orders .address_list{
		position: fixed;
		z-index: 10;
		width: 100%;
		height: 100%;
		left: 100%;
		top: 0px;
		background: #FFFFFF;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
	}
	#Orders .address_list.active{
		left: 0px;
	}
	#Orders .address_list header{
		position: relative;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border-bottom: 1px solid #CCCCCC;
		z-index: 1;	
	}
	#Orders .address_list header i{
		position: absolute;
		top: 9px;
		left: 9px;
	}
	#Orders .address_list .cnentent_1{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		padding: 44px 0px 44px;
		overflow: auto;
	}
	#Orders .address_list .cnentent_1>li{
		display: flex;
		padding: 15px;
		border-bottom: 1px solid #CCCCCC;
		color: #5e6b85;
	}
	#Orders .address_list .cnentent_1>li.active{
		background: #5e6b85;
		color: #FFFFFF;
	}
	#Orders .address_list .cnentent_1>li.active .right_1 i{
		display: inline-block;
	}
	#Orders .address_list .cnentent_1>li .left_1{
		flex-grow: 1;
	}
	#Orders .address_list .cnentent_1>li .left_1>div:nth-child(1){
		font-size: 0.32rem;
	}
	#Orders .address_list .cnentent_1>li .left_1>div:nth-child(2){
		font-size: 0.24rem;
	}
	#Orders .address_list .cnentent_1>li .right_1{
		width: 50px;
		text-align: center;
	}
	#Orders .address_list .cnentent_1>li .right_1 i{
		font-size: 50px;
		width: 30px;
		height: 30px;
		line-break: 30px;
		display: none;
	}
	
	#Orders .address_list .footer_1{
		position: absolute;
		width: 100%;
		height: 44px;
		bottom: 0px;
		left: 0px;
		line-height: 44px;
		text-align: center;
		background: #f50;
		color: #FFFFFF;
	}
	
	
		
	#Orders .address_1{
		margin-bottom: 0.2rem;
		margin-top: 0.2rem;
	}
	
	#Orders .footer{
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 1.1rem;
		display: flex;
		line-height: 1.1rem;
		border-top: 1px solid #CCCCCC;
		background: #FFFFFF;
	}
	#Orders .footer>li:nth-child(1){
		flex-grow: 1;
		text-align: right;
		padding: 0px 10px 0px 0px;
	}
	#Orders .footer>li:nth-child(1)>span{
		font-size: 0.32rem;
		color: #f50;
		font-weight: bold;
	}
	#Orders .footer>li:nth-child(2){
		background: #f50;
		color: #FFFFFF;
		/*padding: 0px 22px;*/
		width: 2.2rem;
		text-align: center;
		font-size: 0.32rem;
	}
	
	#Orders .box_3 .input_1 select{
		margin: 0px;
		padding: 0px;
		border: none;
		-webkit-appearance: menulist;
		-moz-appearance: menulist;
		appearance: menulist;
	}
	
	
	#Orders .box_2{
		background: #FFFFFF;
		color: #666666;
		margin: 0px 0px 0.2rem 0px;
	}
	#Orders .box_2 header{
		padding: 9px;
		font-size: 0.28rem;
	}
	#Orders .box_2 .content_1{
		display: flex;
		background: #f5f5f5;
		padding: 9px;
	}
	#Orders .box_2 .content_1 .img_box{
		width: 1.8rem;
		min-width: 1.8rem;
		height: 1.8rem;
		margin: 0px 9px 0px 0px;
	}
	#Orders .box_2 .content_1 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#Orders .box_2 .content_1 .text_1{
		flex-grow: 1;
	}
	#Orders .box_2 .content_1 .text_1>div:nth-child(2){
		font-size: 0.26rem;
		margin: 3px 0px 0px 0px;
		color: #adadad;
	}
	#Orders .box_2 .content_1 .right_1{
		margin: 0px 0px 0px 6px;
		white-space: nowrap;
		text-align: right;
	}
	#Orders .box_2 .content_1 .right_1>div:nth-child(1){
		color: #f50;
		font-weight: bold;
		font-size: 0.32rem;
	}
	#Orders .box_2 .input_1{
		display: flex;
		padding: 0px 15px;
		height: 40px;
		line-height: 40px;
	}
	#Orders .box_2 .input_1>div:nth-child(2){
		flex-grow: 1;
	}
	#Orders .box_2 .input_1 input{
		margin: 0px ;
		padding: 0px;
		border: none;
		font-size: 0.28rem;
		height: 40px;
	}
	
	
	#Orders .box_1{
		padding: 15px 9px;
	    margin-bottom: 9px;
	    margin-top: 0.2rem;
	    background-color: #fff;
	    -webkit-box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
	    -ms-box-shadow: 0 1px 0 0 rgba(0,0,0,.2),0 .5px 0 0 rgba(0,0,0,.3);
	   	box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
	   	display: flex;
	}
	#Orders .box_1>li:nth-child(1),
	#Orders .box_1>li:nth-child(3){
		display: flex;
		align-items: center;
	}
	#Orders .box_1>li:nth-child(2){
		flex-grow: 1;
		padding:0px 5px;
		font-size: 0.3rem;
		color: #666666;
	}
	
	
	
	
</style>