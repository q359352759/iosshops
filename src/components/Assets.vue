<template>
	<div id="Assets">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">资产</h1>
		</header>
		
		<div class="mui-content">
		    <ul class="box_1">
		    	<li @click="change_type('true')" :class="{'active':type=='true'}">
		    		<header class="mui-text-center">现金券</header>
		    		<div>
		    			<div  class="mui-text-right">
		    				<p class="title_1">赠送</p>
		    				<span class="money_1">{{Property.casegive}}元</span>
		    			</div>
		    			<div>
		    				<p class="title_1">收入</p>
		    				<span class="money_1">{{Property.caseget}}元</span>
		    			</div>
		    		</div>
		    	</li>
		    	<li  @click="change_type('false')" :class="{'active':type=='false'}">
		    		<header class="mui-text-center">佣金</header>
		    		<div>
		    			<div  class="mui-text-right">
		    				<p class="title_1">累计</p>
		    				<span class="money_1">{{Property.shopAccount.hbbalance}}元</span>
		    			</div>
		    			<div>
		    				<p class="title_1">结算</p>
		    				<span class="money_1">{{Property.hbgive}}元</span>
		    			</div>
		    		</div>
		    	</li>
		    	<li>
		    		<header class="mui-text-center">余额</header>
		    		<div>
		    			<div  class="mui-text-right">
		    				<p class="title_1">余额</p>
		    				<span class="money_1">{{Property.shopAccount.balance}}元</span>
		    			</div>
		    			<div>
		    				<p><a @click="change_active(true)" class="title_2">充值</a></p>
		    				<a @click="change_drawing(true)" class="title_2">提现</a>
		    			</div>
		    		</div>
		    	</li>
		    </ul>
		
			<ul class="box_2">
				<li>
					<div>类型</div>
					<div>金额</div>
					<div>时间</div>
				</li>
				<li v-for="x in filterList">
					<div>{{x.getWay=='true' ? '现金':'HB'}}</div>
					<div>{{x.hborcash}}{{x.getWay=='true' ? '元':'HB'}}</div>
					<div>{{x.orderDate | date_time}}</div>
				</li>
				<div v-if="filterList.length==0" class="No_data">暂无数据</div>
			</ul>
		
			<form class="box_3" :class="{'active':show_box_3}" @submit.prevent="form_1()">
				<div class="header_1">
					<i @click="change_active(false)" class="mui-icon mui-icon-arrowleft"></i>
					<span>充值</span>
				</div>
				<ul>
					<li class="title_1">充值金额</li>
					<li class="input_box">
						<span>￥</span>
						<input type="number" min="0.1" step="0.01" v-model="number_1" required="" placeholder="输入充值金额" name="" id="" value="" />
					</li>
				</ul>
				<div class="btn_1">
					<button type="submit" :disabled="!number_1" class="mui-btn">下一步</button>
				</div>
			</form>
		
		</div>
		
		<form  @submit.prevent="Settlement_ok()" class="drawing" :class="{'active':drawing_show}">
			<div class="header_1">
				<i @click="change_drawing(false)" class="mui-icon mui-icon-arrowleft"></i>
				<span>提现</span>
			</div>
			<div  class="radio1_box">
				<div class="mui-input-row mui-radio mui-left">
					<label>余额</label>
					<input v-model="chargetype" value="1" name="radio1" type="radio">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>现金券</label>
					<input v-model="chargetype" value="2" name="radio1" type="radio" >
				</div>
			</div>						
			<ul>
				<li class="title_1">提现金额</li>
				<li class="text_1">
					<span>￥</span>
					<input type="text" v-model="money"/>
				</li>
				<!--<li class="footer_1">可提现金额{{Settlement_list[9] | toFixed}}</li>-->
			</ul>
			<ul>
				<li class="title_1">提现密码</li>
				<li class="text_1 input_box">
					<input type="password" required="" v-model="pwd" placeholder="请输入提现密码" />
				</li>
			</ul>
			<button class="btn_1">48小时内到账,确认提现</button>
		</form>
	</div>
</template>

<script>
	import {http,dateFtt} from "@/assets/fc"
	export default{
			components:{},
			data:function(){	
				return{
					drawing_show:false,	//提现框
					show_box_3:false,	//充值界面
					type:'',
					shopId:1,
					//资产
					Property:{
						shopAccount:{},
						list:[]
					},
					shoppingList: [
			            "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter"
			        ],
			        key: "",
			        number_1:'',	//充值金额
			        pwd:'',			//提现密码
			        userInfo:{},	//用户基本信息
			        uId:localStorage.ids,
			        chargetype:1, 	//提现类型，1余额，2 现金券
					money:'',		//提现金额
				}
			},
			filters:{
				date_time(time){
					return dateFtt(time,'yyyy-MM-dd hh:mm')
				},
				
			},
			computed:{
		        filterList(){
		        	var type=this.type;
		        	var list=this.Property.list;
		        	return list.filter(function (x){
		        		return x.getWay.indexOf(type) !=-1;
		        	})
		        }
			},
			methods:{
				//提交提现
				Settlement_ok(){
									//会员提现申请接口	
//					var obj=new Object();
//						obj.memberid=localStorage.ids;
//						obj.openid=localStorage.openid;
//						obj.nickname=this.userInfo.nick;
//						obj.amount=this.money;
//						obj.applytype=3		//提现类型  1:余额提现，2:红包提现，3:结算提现，4:股东提现,5:现金券提现，6:乐币提现,7商家余额提现
//						obj.pwd=this.pwd;
//						console.log(obj)
//					http('post','/hb/zlApplywithdraw/withDrawsls',obj,this.withDrawsls_return)
					if(this.chargetype==1){
						//店铺余额提现
						var obj=new Object();
							obj.shopId=this.shopId;
							obj.openId=localStorage.openid;
							obj.HBScore=this.money;
							obj.applytype=1	//提现类型  1:余额提现，2:红包提现，3:结算提现，4:股东提现，6:乐币提现，7：商家HB提现
							obj.paypwd= this.pwd;
						http('post','/mall/mobile/shopAccount/HBApplyWithdraw',obj,this.HBApplyWithdra_return);
						
					}else{
						//店铺结算现金卷提现
						var obj=new Object();
							obj.shopId=this.shopId;
							obj.pwd=this.pwd;
							obj.db=this.money;
							obj.openId=localStorage.openid;
						http('post','/mall/mobile/shopAccount/ticketWithdraw',obj,this.ticketWithdraw_return)
					}
				},
				HBApplyWithdra_return(x){
					console.log('店铺余额提现',x)
					var this_1=this;
					if(x.code==10000){
						mui.alert('提现申请成功，24小时内到账！','提示', function() {
							this_1.drawing_show=false;
						},function(){}, 'div');
						this.findProperty();
					}else{
						mui.alert(x.description,'提示', function() {
						},function(){}, 'div');
					}
				},
				ticketWithdraw_return(x){
					console.log('店铺结算现金卷提现',x);
					mui.alert(x.msg,'提示', function() {
						
					},function(){}, 'div');
					this.findProperty();
					if(x.success){
						this.drawing_show=false;
					}
				},
//				withDrawsls_return(x){
//					console.log(x)
//					mui.alert(x.description+x.data,'提示', function() {
//						console.log(1)
//					},function(){}, 'div');
//					this.findProperty();
//				},
				//点击结算提现
				change_drawing(x){
					this.drawing_show=x
				},
				//显示充值界面
				change_active(x){
					this.show_box_3=x
				},
				//商家余额充值的方法
				form_1(){
					var obj=new Object();
						obj.openid=localStorage.openid;
						obj.shopid=this.shopId;
						obj.total_fee=this.number_1;	//充值金额
					http('post','/platform/weixinpay/shopBalance',obj,this.shopBalance_retun)
				},
				shopBalance_retun(x){
					console.log(x);
					var this_1=this;
					if(x.code!=10000){
						mui.toast(x.description,{duration:2000, type:'div' })
					}else{
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
										obj.orderid = x.data.orderid;
										obj.shopid=this_1.shopId;
//										alert(JSON.stringify(obj))
									http('post','/platform/weixinpay/shopBalance_notify',obj,this_1.shopBalance_notify)
	//							}
							}
						});
					}
				},
				shopBalance_notify(x){
//					alert(JSON.stringify(x));
					if(x.code==10000){
						mui.toast('充值成功！',{ duration:2000, type:'div' })
						this.show_box_3=false;
						this.findProperty();
					}else{
						mui.toast(x.description,{ duration:2000, type:'div' })
					}
				},
				//改变类型
				change_type(x){
					this.type= this.type==x ? '' :x;
				},
				//查询商家资产信息
				findProperty(){
					http('post','/mall/mobile/shopAccount/findProperty',{'id':this.shopId},this.findProperty_return)
				},
				findProperty_return(x){
					console.log('查询商家资产信息',x);
					this.Property=x
				},
				//获取用户基本信息
				get_userInfo(){
					http('post','/platform/cmembers/userInfo',{'uId':this.uId},this.userInfo_return)
				},
				userInfo_return(x){
					console.log('用户基本信息',x);
					this.userInfo=x.data;
				}
			},
			mounted:function(){
				var this_1=this
				//判断用户是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
				function isShop(x){
					console.log('判断用户是否是商家',x);
					if(!x.success){
						mui.toast('您还不是商家！',{ duration:'long', type:'div' });
					}else{
						this_1.shopId=x.message; 
						//查询商家资产信息
						this_1.findProperty();
						//用户基本信息
						this_1.get_userInfo();
					}
				}
				
				
				
			}
	}
</script>

<style>
	#Assets .drawing.active{
 		top: 0px;
 		opacity: 1;
 	}
 	#Assets .drawing .radio1_box{
 		background: #FFFFFF;
 		margin: 0.2rem 0px;
 		display: flex;
 		justify-content: center;
 	}
 	
 	#Assets .drawing{
 		opacity: 0;
 		position: fixed;
 		top: 100%;
 		left: 0%;
 		width: 100%;
 		height: 100%;
 		background: #ececec;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#Assets .drawing>ul{
 		background: #FFFFFF;
 		margin: 0.2rem 0px;
 		padding: 0px 15px;
 	}
 	#Assets .drawing>ul>li{
 		padding: 5px;
 		display: flex;
 		align-items: center;
 	}
 	#Assets .drawing>ul>li input{
 		margin: 0px;
 		padding: 0px;
 		border: none;
 		
 		height: auto;
 	}
 	#Assets .drawing>ul>li.input_box input{
 		border-bottom: 1px solid #C9C9CE;
 	}
 	#Assets .drawing>ul>li.text_1{
 		padding: 10px 15px;
 		color: #2d2d2d;
 	}
 	#Assets .drawing .btn_1{
 		width: 90%;
 		margin: 0.2rem auto;
 		display: block;
 		background: #0087ff;
 		color: #FFFFFF;
 	}
	#Assets .drawing .header_1{
		background: #FFFFFF;
		padding: 8px;
 	}
 	#Assets .drawing .header_1 i{
 		color: #0b7ed2;
 	}
 	#Assets .drawing .header_1 span{
 		display: inline-block;
 		padding: 0px 15px;
 		border-left: 1px solid #CCCCCC;
 	}
	
	
	
	#Assets .box_3{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 100%;
		z-index: 10;
		background: #fbfbfb;
		transition: all 0.5s;
	}
	#Assets .box_3.active{
		left: 0px;
	}
	#Assets .box_3 .header_1{
		background: #FFFFFF;
		padding: 5px;
		border-bottom: 1px solid #cccccc;
		line-height: 30px;
		margin-bottom: 0.2rem;
	}
	#Assets .box_3 .header_1 span{
		border-left: 1px solid #cccccc;
		padding: 0px 10px;
	}
	#Assets .box_3 ul{
		background: #FFFFFF;
		border-top:1px solid #CCCCCC ;
		border-bottom:1px solid #CCCCCC ;
	}
	#Assets .box_3 ul>li{
		padding: 15px 20px;
	}
	#Assets .box_3 ul .input_box{
		display: flex;
		font-size: 25px;
	}
	#Assets .box_3 ul input{
		border: none;
		margin: 0px;
		padding: 0px;
		height: auto;
		font-size: 20px;
		margin-left: 5px;
		color: #272727;
	}
	#Assets .box_3 .btn_1{
		padding: 30px 15px;
	}
	#Assets .box_3 .btn_1 button{
		width: 100%;
		/*background:#99CCF2;*/
		background: #0092ff;
		color: #FFFFFF;
	}
	
	
	#Assets .No_data{
		text-align: center;
		padding: 0.2rem;
		font-size: 0.26rem;
		color: #7d7d7d;
	}
	#Assets .box_2{
		margin: 0.2rem 0px 0px;
	}
	#Assets .box_2>li{
		background: #FFFFFF;
		margin: 0.1rem 0px 0px;
		padding: 0.2rem 0px;
		display: flex;
		font-size: 0.24rem;
		text-align: center;
		position: relative;
	}
	#Assets .box_2>li:after,
	#Assets .box_2>li:before{
		position: absolute;
		width: 1px;
		height: 60%;
		top: 20%;
		content: '';
		background: #B3B3B3;
	}
	#Assets .box_2>li:before{
		right: 33.3%;
	}
	#Assets .box_2>li:after{
		left: 33.3%;
	}
	#Assets .box_2>li>div{
		width: calc(100% / 3);
	}
	
	
	#Assets .box_1{
		display: flex;
		background: #FFFFFF;
		margin: 0.2rem 0px;
	}
	#Assets .box_1>li{
		width:33.3%;
		padding: 0.2rem 0px 0.16rem;
		position: relative;
		border-bottom: 2px solid #FFFFFF;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
	}
	#Assets .box_1>li.active{
		border-bottom: 2px solid #00a2e9;
	}
	#Assets .box_1>li:after{
		position: absolute;
		top: 20%;
		left: 0px;
		height: 60%;
		width: 1px;
		content: '';
		background: #c5c5c5;
	}
	#Assets .box_1>li:nth-child(1):after{
		display: none;
	}
	#Assets .box_1>li>header{
		font-size: 0.3rem;
		height: 0.5rem;
		line-height: 0.5rem;
		margin: 0px 0px 0.16rem 0px;
	}
	#Assets .box_1>li>div{
		display: flex;
	}
	#Assets .box_1>li>div>div{
		width: 50%;
		padding: 0px 0.2rem;
		position: relative;
		white-space: nowrap;
		overflow: auto;
	}
	#Assets .box_1>li>div>div:nth-child(1):after{
		position: absolute;
		width: 1px;
		height: 60%;
		right: 0px;
		top: 20%;
		content: '';
		background:#F1EFF0 ;
	}
	#Assets .box_1 .title_1{
		color: #9C9C9C;
		font-size: 0.22rem;
	}
	#Assets .box_1 .money_1{
		font-size: 0.26rem;
		color: #EE0000;	
	}
	#Assets .box_1 .title_2{
		font-size: 0.22rem;
		color: #0EA5EA;
	}
	#Assets .box_1 p{
		margin: 0px 0px 0.1rem 0px;
	}
	
	
	
	#Assets .mui-bar{
		background: #00a2e9;
	}
	#Assets .mui-title{
		color: #FFFFFF;
	}
	#Assets .mui-bar a{
		color: #FFFFFF;
	}
</style>