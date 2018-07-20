<template>
	<div id="Shopmanagement" v-on:scroll="scroll_1()">

		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">商铺管理</h1>
		</header>
		
		<div class="mui-content">
		    
		    <div class="box_1">
		    	<div>
		    		<img :src="ShopDetail.mainlogo"/>
		    	</div>
		    	<div>
		    		<div class="shopName">
		    			店铺名称: {{ShopDetail.shopname}}
		    			<i class="mui-icon mui-icon-help mui-pull-right" @click="change_Agreement(true)"></i>
		    		</div>
		    		<div class="reputation_1">卖家信誉：
		    			<i v-for="(x,index) in icon_xingxing" :class="{'icon-xingxing':index<=ShopDetail.creditrating,'icon-star':index>ShopDetail.creditrating}" class="icon iconfont"></i>
		    		</div>
		    		<div class="">店铺地址: {{ShopDetail.companyaddress}}</div>
		    	</div>
		    </div>
		    
		    <ul class="box_2">
		    	<li>
		    		<div>今日成交总额</div>
		    		<div>{{ShopToday.rental}}</div>
		    	</li>
		    	<li>
		    		<div>今日订单数量</div>
		    		<div>{{ShopToday.num ? ShopToday.num : 0}}</div>
		    	</li>
		    	<li>
		    		<div>今日访客</div>
		    		<div>20</div>
		    	</li>
		    </ul>
			
			<div class="box_3">
				<ul>
					<router-link :to="'StoreDetails?id='+shopId">
						<li>
							<div class="icon_box bg_8a2be1"><i class="icon iconfont icon-dianpu"></i></div>
							<div class="text_1">店铺信息</div>
						</li>
					</router-link>
					<router-link to="CommodityControl">
					<!--<a @click="Commodity_management()" href="javascript:;">-->
						<li>
							<div class="icon_box bg_5bb85d"><i class="icon iconfont icon-icon-add-person"></i></div>
							<div class="text_1">商品管理</div>
						</li>
					<!--</a>-->
					</router-link>
					<a href="#/shopOrder">
						<li>
							<div class="icon_box bg_ff2c00"><i class="icon iconfont icon-dingdanguanli"></i></div>
							<div class="text_1">订单管理</div>
						</li>
					</a>
					<router-link to='commentList'>
						<li>
							<div class="icon_box bg_30afd5"><i class="icon iconfont icon-huaduo"></i></div>
							<div class="text_1">评论管理</div>
						</li>
					</router-link>
				</ul>
				<ul>
					<a href="#/Subaccount">
						<li>
							<div class="icon_box bg_02cdd1"><i class="icon iconfont icon-08_zizhanghaoguanli"></i></div>
							<div class="text_1">子账号</div>
						</li>
					</a>
					<router-link to="Extension">
						<li>
							<div class="icon_box bg_ffa500"><i class="icon iconfont icon-msnui-market"></i></div>
							<div class="text_1">推广</div>
						</li>
					</router-link>
					<router-link to="ShopMembers">
						<li>
							<div class="icon_box bg_6296ec"><i class="icon iconfont icon-huiyuan"></i></div>
							<div class="text_1">会员</div>
						</li>
					</router-link>
					<router-link to="Assets">
						<li>
							<div class="icon_box bg_eb1177"><i class="icon iconfont icon-meiyuan5"></i></div>
							<div class="text_1">资产</div>
						</li>
					</router-link>
				</ul>
			</div>
			
			<div class="box_4">
			<!--mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary-->
				<div class="mui-segmented-control mui-segmented-control-inverted tab_1" :class="{'fixed':fixed}">
					<a class="mui-control-item mui-active" href="#item1">待发货</a>
					<a class="mui-control-item" href="#item2">已发货</a>
					<a class="mui-control-item" href="#item3">已完成</a>
					<a class="mui-control-item" href="#item4">已关闭</a>
				</div>
				<div class="mui-segmented-control mui-segmented-control-inverted tab_1" v-show="fixed">
					<a class="mui-control-item mui-active" href="#item1">待发货</a>
					<a class="mui-control-item" href="#item2">已发货</a>
					<a class="mui-control-item" href="#item3">已完成</a>
					<a class="mui-control-item" href="#item4">已关闭</a>
				</div>
				<div id="item1" class="mui-control-content mui-active">
					<ul class="box_5">
						<li v-for="x in obj_2.list">
							<header class="header_1">
								<!--<span class="mui-pull-right">待发货</span>-->
								<!--<div>客户:张三</div>-->
								<div>联系方式：{{x.buyer}}</div>
								<div>收货地址：{{x.shipTo}}</div>
							</header>
							<ul class="product_1">
								<li>
									<div class="img_box">
										<img :src="x.pImg"/>
									</div>
									<div class="text_1">
										<div class="goods_name">{{x.productName}}</div>
										<div class="goodsTotal">
											<span>总额</span>
											<font>￥{{x.goodsTotal}}</font>
											<i>{{x.paymentTypeName}}</i>
										</div>
										<div class="giftWayTotal">
											<span>优惠</span>
											<font>
												{{x.giftWayTotal}}
											</font>
											<span>{{x.giftWay ? '现金券' : 'HB'}}</span>
											<!--<i>现金券</i>-->
										</div>
									</div>
								</li>
							</ul>
							<div class="footer_1">
								<span class="time_1">下单时间：{{x.date}}</span>
								<!--<button class="mui-btn">查看物流</button>-->
								<button @click="Deliver_goods(x)" class="mui-btn mui-btn-warning mui-btn-outlined">发货</button>
							</div>
						</li>
					</ul>
					<div v-if="obj_2.list.length==0" class="mui-text-center nocontent">
						<img src="@/assets/img/1524726123.jpg"/>
						<div>还没有相关消息</div>
					</div>
					<div class="mui-text-center loading_1" v-show="obj_2.list.length!=0 && obj_2.loading==0">
						————&nbsp;我是有底线的&nbsp;————
					</div>
				</div>
				
				<div id="item2" class="mui-control-content">
					<ul class="box_5">
						<li v-for="x in obj_3.list">
							<header class="header_1">
								<!--<span class="mui-pull-right">待发货</span>-->
								<!--<div>客户:张三</div>-->
								<div>联系方式：{{x.buyer}}</div>
								<div>收货地址：{{x.shipTo}}</div>
							</header>
							<ul class="product_1">
								<li>
									<div class="img_box">
										<img :src="x.pImg"/>
									</div>
									<div class="text_1">
										<div class="goods_name">{{x.productName}}</div>
										<div class="goodsTotal">
											<span>总额</span>
											<font>￥{{x.goodsTotal}}</font>
											<i>{{x.paymentTypeName}}</i>
										</div>
										<div class="giftWayTotal">
											<span>优惠</span>
											<font>
												{{x.giftWayTotal}}
											</font>
											<span>{{x.giftWay ? '现金券' : 'HB'}}</span>
											<!--<i>现金券</i>-->
										</div>
									</div>
								</li>
							</ul>
							<div class="footer_1">
								<span class="time_1">下单时间：{{x.date}}</span>
								<button @click="logistics(x)" class="mui-btn">查看物流</button>
								<!--<button class="mui-btn mui-btn-warning mui-btn-outlined">发货</button>-->
							</div>
						</li>
					</ul>
					<div v-if="obj_3.list.length==0" class="mui-text-center nocontent">
						<img src="@/assets/img/1524726123.jpg"/>
						<div>还没有相关消息</div>
					</div>
					<div class="mui-text-center loading_1" v-show="obj_3.list.length!=0 && obj_3.loading==0">
						————&nbsp;我是有底线的&nbsp;————
					</div>
				</div>
				
				<div id="item3" class="mui-control-content">
					<ul class="box_5">
						<li v-for="x in obj_5.list">
							<header class="header_1">
								<!--<span class="mui-pull-right">待发货</span>-->
								<!--<div>客户:张三</div>-->
								<div>联系方式：{{x.buyer}}</div>
								<div>收货地址：{{x.shipTo}}</div>
							</header>
							<ul class="product_1">
								<li>
									<div class="img_box">
										<img :src="x.pImg"/>
									</div>
									<div class="text_1">
										<div class="goods_name">{{x.productName}}</div>
										<div class="goodsTotal">
											<span>总额</span>
											<font>￥{{x.goodsTotal}}</font>
											<i>{{x.paymentTypeName}}</i>
										</div>
										<div class="giftWayTotal">
											<span>优惠</span>
											<font>
												{{x.giftWayTotal}}
											</font>
											<span>{{x.giftWay ? '现金券' : 'HB'}}</span>
											<!--<i>现金券</i>-->
										</div>
									</div>
								</li>
							</ul>
							<div class="footer_1">
								<span class="time_1">下单时间：{{x.date}}</span>
								<button  @click="logistics(x)" class="mui-btn">查看物流</button>
								<!--<button class="mui-btn mui-btn-warning mui-btn-outlined">发货</button>-->
							</div>
						</li>
					</ul>
					<div v-if="obj_5.list.length==0" class="mui-text-center nocontent">
						<img src="@/assets/img/1524726123.jpg"/>
						<div>还没有相关消息</div>
					</div>
					<div class="mui-text-center loading_1" v-show="obj_5.list.length!=0 && obj_5.loading==0">
						————&nbsp;我是有底线的&nbsp;————
					</div>
				</div>
				
				<div id="item4" class="mui-control-content">
					<ul class="box_5">
						<li v-for="x in obj_4.list">
							<header class="header_1">
								<!--<span class="mui-pull-right">待发货</span>-->
								<!--<div>客户:张三</div>-->
								<div>联系方式：{{x.buyer}}</div>
								<div>收货地址：{{x.shipTo}}</div>
							</header>
							<ul class="product_1">
								<li>
									<div class="img_box">
										<img :src="x.pImg"/>
									</div>
									<div class="text_1">
										<div class="goods_name">{{x.productName}}</div>
										<div class="goodsTotal">
											<span>总额</span>
											<font>￥{{x.goodsTotal}}</font>
											<i>{{x.paymentTypeName}}</i>
										</div>
										<div class="giftWayTotal">
											<span>优惠</span>
											<font>
												{{x.giftWayTotal}}
											</font>
											<span>{{x.giftWay ? '现金券' : 'HB'}}</span>
											<!--<i>现金券</i>-->
										</div>
									</div>
								</li>
							</ul>
							<div class="footer_1">
								<span class="time_1">下单时间：{{x.date}}</span>
								<button  @click="logistics(x)" class="mui-btn">查看物流</button>
								<!--<button class="mui-btn mui-btn-warning mui-btn-outlined">发货</button>-->
							</div>
						</li>
					</ul>
					<div v-if="obj_4.list.length==0" class="mui-text-center nocontent">
						<img src="@/assets/img/1524726123.jpg"/>
						<div>还没有相关消息</div>
					</div>
					<div class="mui-text-center loading_1" v-show="obj_4.list.length!=0 && obj_4.loading==0">
						————&nbsp;我是有底线的&nbsp;————
					</div>
				</div>
			</div>
			
			<form @submit.prevent="form_1()" class="box_6" v-show="show_address">
					<header>发货信息</header>
					<div class="">
						<label>物流公司</label>
						<div class="input_box">
							<select name="" v-model="Pending_delivery.expressname">
								<option v-for="x in logistics_list" :value="x">{{x}}</option>
							</select>
							<i class="icon iconfont icon-xiala"></i>
						</div>
					</div>
					<div>
						<label>物流单号</label>
						<div class="input_box">
							<input type="text" required="" pattern=".*[^ ].*" v-model="Pending_delivery.expressnum"/>
						</div>
					</div>
					<div>
						<label>运费</label>
						<div>
							<input type="number" step="0.01" required=""  v-model="Pending_delivery.freight"/>
						</div>
					</div>
					<div class="footer_1">
						<button @click="cancel_1()" type="button">取消</button>
						<button type="submit">提交</button>
					</div>
			</form>
			
			<div class="Agreement_mask" :class="{'active':Agreement_mask}">
				<header class="mui-text-center">
					<i @click="change_Agreement(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>
						加盟合作协议
					</div>
				</header>
				<div class="Agreement_content">
					<JoinAgreement :zidingyi="userInfo.realName"></JoinAgreement>
				</div>
			</div>
			
		</div>
	
		<div class="Not_open" v-show="Not_open">
			<div>
			您未开通此业务
			<br /><br />
			即将自动跳转到首页
			</div>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	import JoinAgreement from '@/components/JoinAgreement'
	export default{
		components:{
			JoinAgreement
		},
		data:function(){
			
			return{
				mask:{},		//遮罩框
				Pending_delivery:{
					expressname:'顺丰速运',
//					expressname：'',		//快递名称 
//					expressnum：'',		//快递号 
//					freight：''			//运费
				},	//待发货
				show_address:false,		//显示发货框
				logistics_list:['顺丰速运','百世快递','中通快递','申通快递','圆通速递','韵达速递','邮政快递包裹','EMS','天天快递','京东物流','优速快递','德邦','快捷快递','宅急送','TNT快递'],
				shopId:1,
				fixed:false,
				show_index:0,
				icon_xingxing:[0,1,2,3,4],
				ShopDetail:{},				//商铺详细信息
				ShopToday:{},
				//1待付款2待发货3待收货4已关闭5已完成6已评论7待评论
				obj_2:{				//待发货
					pageIndex:1,
					loading:1,		//0表示没有数据1表示加载中2表示加载完成
					list:[]
				},
				obj_3:{				//已发货
					pageIndex:1,
					loading:1,
					list:[]
				},
				obj_5:{				//已完成
					pageIndex:1,
					loading:1,
					list:[]
				},
				obj_4:{				//已关闭
					pageIndex:1,
					loading:1,
					list:[]
				},
				Agreement_mask:false,	//协议是否显示
				Not_open:false,
				userInfo:{},	//用户基本信息
			}
		},
		methods:{
			//打开协议
			change_Agreement(x){
				this.Agreement_mask=x;
			},
			//查看物流
			logistics(x){
				console.log(x);
				if(x.expressnum=='' || x.expressnum==null){
					mui.toast('此订单没有物流信息',{ duration:'long', type:'div' });
				}else{
					this.$router.push('/logistics?expNo='+x.expressnum+'&expName='+x.expressCompanyName);
				}
			},
			//添加物流信息
			form_1(){
				console.log('提交',this.Pending_delivery);
				this.show_address=false;
				this.mask.close();//关闭遮罩
				http('post','/mall/mobile/order/orderDelivery',this.Pending_delivery,this.orderDelivery_return);
			},
			//发货
			Deliver_goods(x){
				console.log(x)
				var this_1=this
				this.Pending_delivery.orderId=x.orderId
				mui.confirm('是否有物流信息','提示',['没有','有'],function(e){
					console.log(e)
					if(e.index==1){
						this_1.show_address=true;
						this_1.mask.show();//显示遮罩
					}else{
						var obj=new Object();
							obj.orderId=x.orderId;
							obj.expressname='';		//快递名称 
							obj.expressnum='';		//快递号 
							obj.freight='';			//运费
							console.log(obj)
						http('post','/mall/mobile/order/orderDelivery',obj,this.orderDelivery_return)
					}
				})
			},
			orderDelivery_return(x){
				console.log(x);
				mui.toast(x.msg,{ duration:'long', type:'div' });
				this.obj_2.pageIndex=1;
				this.obj_2.list=[];
				this.pageSellerOrder(2);
			},
			//取消
			cancel_1(){
				this.show_address=false;
				this.mask.close();//关闭遮罩
			},
//			Commodity_management:function(){
//				mui.toast('此功能暂未开放！',{ duration:2000, type:'div' })
//			}
			//带分页的查询商家订单
			pageSellerOrder(x){
				var this_1=this;
				var obj=new Object();
					obj.shopId=this.shopId;
					obj.page=this['obj_'+x].pageIndex;
					obj.orderStatus=x;
					obj.status=x;
				http('post','/mall/mobile/order/pageSellerOrder',obj,pageSellerOrder_return)
				function pageSellerOrder_return(y){
					console.log('查询商家订单',x,y);
					this_1['obj_'+x].loading= y.data.order.length==0 ? 0 : 2;
					this_1['obj_'+x].list=this_1['obj_'+x].list.concat(y.data.order);
				}
			},
			scroll_1(){
				var box_4_top=$('#Shopmanagement .box_4').offset().top;
				this.fixed= box_4_top<44;
				var nDivHight = $('#Shopmanagement').outerHeight();
				var nScrollTop = $('#Shopmanagement')[0].scrollTop;
				var nScrollHight = $('#Shopmanagement')[0].scrollHeight;
     			
				var arr=[2,3,5,4];
				if(nDivHight+nScrollTop>=nScrollHight-40 && this['obj_'+arr[this.show_index]].loading==2){
					this['obj_'+arr[this.show_index]].loading=1
					console.log('获取数据');
					this['obj_'+arr[this.show_index]].pageIndex++
					this.pageSellerOrder(arr[this.show_index])
				}
			}
		},
		mounted:function(){
			var this_1=this;
			
			if(!localStorage.getItem("ids")){
				this_1.Not_open=true
				setTimeout(function(){
					this_1.$router.push('/home');
				},2000)
			}else{
				//查询店铺基本信息
				http('post','/platform/cmembers/userInfo',{'uId':localStorage.getItem("ids")},userInfo)
				//判断用户是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
			}
			function isShop(x){
				console.log('判断用户是否是商家',x);
				if(!x.success){
//					mui.toast('您还不是商家！',{ duration:'long', type:'div' });
					this_1.Not_open=true
					setTimeout(function(){
						this_1.$router.push('/home');
					},2000)
				}else{
					this_1.Not_open=false
					this_1.shopId=x.message; 
					//查询商铺详细信息
					http('post','/mall/mobile/shop/showShop',{'id':this_1.shopId},showShop_return);
					//查询商铺今日相关信息
					http('post','/mall/mobile/shop/findShopToday',{'id':this_1.shopId},findShopToday_return);
					
					
					this_1.pageSellerOrder(2);		//1待付款2待发货3待收货4已关闭5已完成6已评论7待评论
					this_1.pageSellerOrder(3);
					this_1.pageSellerOrder(5);
					this_1.pageSellerOrder(4);
				}
			}
			
			function userInfo(x){
				console.log('用户基本信息',x);
				this_1.userInfo=x.data;
			}
			
			function showShop_return(x){
				console.log('查询商铺详细信息',x);
				this_1.ShopDetail=x.shop
			}
			
			function findShopToday_return(x){
				console.log('查询商铺今日相关信息',x);
				this_1.ShopToday=x
			}
			
			
			mui("#Shopmanagement .box_4 .tab_1").on("tap","a",function(){
				this_1.show_index=$(this).index();
			});
			
			this.mask = mui.createMask(function(){
				console.log('点击了关闭');
				this_1.show_address=false;
			});
			
//			mask.show();//显示遮罩
//			mask.close();//关闭遮罩
			
		},
		created:function(){
			
		}
	}
</script>

<style>
	#Shopmanagement{
		height: 100%;
		overflow: auto;
	}
	
	#Shopmanagement .Not_open{
		background: #FFFFFF;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 10;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	
	#Shopmanagement .Agreement_mask{
 		position: fixed;
 		width: 100%;
 		height: 100%;
 		left: 100%;
 		top: 0px;
 		background: #FFFFFF;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#Shopmanagement .Agreement_mask.active{
 		left: 0px;
 	}
	#Shopmanagement .Agreement_mask>header{
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #CCCCCC;
		background: #FFFFFF;
		position: relative;
		z-index: 1;
	}
	#Shopmanagement .Agreement_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#Shopmanagement .Agreement_content{
		padding:42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}
	
	
	#Shopmanagement .loading_1{
		padding: 0.2rem;
		color: #828282;
	}
	
	#Shopmanagement .box_6{
		position: fixed;
		top: 25%;
		left: 0px;
		width: 100%;
		z-index: 999;
		background: #FFFFFF;
	}
	#Shopmanagement .box_6>header{
		font-size: 0.3rem;
		padding: 0.2rem;
		border-bottom: 1px solid #CCCBCB;
		text-align: center;
	}
	#Shopmanagement .box_6 input{
		padding: 0px 15px ;
		margin: 0px;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, .2);
		font-size: 0.26rem;
		height: 0.6rem;
	}
	#Shopmanagement .box_6>div{
	}
	#Shopmanagement .box_6 label{
		padding: 0.2rem 0.1rem 0px;
		font-size: 0.28rem;
		display: inline-block;
	}
	#Shopmanagement .box_6 .input_box{
		position: relative;
	}
	#Shopmanagement .box_6 .input_box>i{
		position: absolute;
		right: 13px;
		top: 13px;
		color: #9a9a9a;
	}
	#Shopmanagement .box_6 select{
		margin: 0px;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, .2) !important;
	}
	#Shopmanagement .box_6 .footer_1{
		padding: 0.4rem 0.24rem 0.2rem;
		display: flex;
	}
	#Shopmanagement .box_6 .footer_1 button{
		flex-grow: 1;
		height: 0.8rem;
		border:none;
	}
	#Shopmanagement .box_6 .footer_1 button:nth-child(1){
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		background: #f0f0f0;
		color: #8c8c8c;
	}
	#Shopmanagement .box_6 .footer_1 button:nth-child(2){
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
		background: #00a2e9;
		color: #FFFFFF;
	}
	
	
	#Shopmanagement .mui-bar{
		background: #00a2e9;
	}
	#Shopmanagement .mui-title{
		color: #FFFFFF;
	}
	#Shopmanagement .mui-bar a{
		color: #FFFFFF;
	}
	
	#Shopmanagement .box_5{
		background: #FFFFFF;
		margin: 0px 0px 0.2rem;
	}
	#Shopmanagement .box_5>li{
		border-bottom: 0.2rem solid #efeff4;
	}
	#Shopmanagement .box_5 .header_1{
		padding: 0.2rem;
		font-size: 0.26rem;
		line-height: 0.4rem;
	}
	#Shopmanagement .box_5 .header_1>span{
		color: #ff7e26;
	}
	#Shopmanagement .box_5 .product_1{
		background: #efefef;
		padding: 0px 0.2rem;
	}
 	#Shopmanagement .box_5 .product_1>li{
 		display: flex;
 		padding: 0.2rem 0px;
 		border-bottom: 1px solid #FFFFFF;
 	}
	#Shopmanagement .box_5 .product_1 .img_box{
		width: 1.6rem;
		height: 1.6rem;
		flex-shrink: 0;
		margin: 0px 0.2rem 0px 0px;
	}
	#Shopmanagement .box_5 .product_1 .img_box>img{
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	#Shopmanagement .box_5 .product_1 .text_1{
		flex-grow: 1;
	}
	#Shopmanagement .box_5 .goods_name{
		font-size: 0.3rem;
		margin: 0.1rem 0px 0.1rem;
	}
	#Shopmanagement .box_5 .goodsTotal{
		margin: 0px 0px 2px 0px;
	}
	#Shopmanagement .box_5 .goodsTotal>span,
	#Shopmanagement .box_5 .goodsTotal>i{
		font-size: 0.26rem;
	}
	#Shopmanagement .box_5 .goodsTotal>i{
		padding: 2px 5px;
		border:1px solid #92928d;
		display: inline-block;
	}
	#Shopmanagement .box_5 .goodsTotal>font{
		font-size: 0.36rem;
		color: red;
	}
	#Shopmanagement .box_5 .giftWayTotal>span,
	#Shopmanagement .box_5 .giftWayTotal>i{
		font-size: 0.26rem;
	}
	#Shopmanagement .box_5 .giftWayTotal>i{
		padding: 2px 5px;
		border:1px solid #92928d;
	}
	#Shopmanagement .box_5 .giftWayTotal>font{
		font-size: 0.36rem;
	}
	#Shopmanagement .box_5 .footer_1{
		display: flex;
		padding: 0.2rem;
		align-items: center;
	}
	#Shopmanagement .box_5 .footer_1>span{
		flex-grow: 1;
		font-size: 0.26rem;
	}
	#Shopmanagement .box_5 .footer_1 button{
		margin: 0px 0px 0px 5px;
		font-size: 0.24rem;
	}
	
	#Shopmanagement .box_4 .fixed{
		position: fixed;
		width: 100%;
		top: 44px;
		left: 0px;
		z-index: 1;
	}
	
	#Shopmanagement .box_4{
		margin: 0.2rem 0px 0px 0px;
	}
	#Shopmanagement .box_4 .mui-segmented-control{
		background: #ffffff;
		border-bottom: 1px solid #cccccc;
	}
	#Shopmanagement .box_4 .mui-control-item{
		line-height: 0.96rem;
		font-size: 0.22;
		letter-spacing: 1px;
		color: #656565;
	}
	#Shopmanagement .box_4 .nocontent{
		padding: 0.7rem 0px 1rem;
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #656565;
	}
	#Shopmanagement .box_4 .nocontent img{
		width: 2.2rem;
		margin-bottom: 0.5rem;
	}
	
	#Shopmanagement .box_3{
		background: #FFFFFF;
		margin: 0.2rem 0px 0px 0px ;
		padding: 0.25rem 0.2rem 0.26rem;
	}
	#Shopmanagement .box_3 ul{
		/*display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;*/
		display: inline-flex;
		display: -webkit-inline-flex;
		justify-content: space-between;
		width: 100%;
		text-align: center;
	}
	#Shopmanagement .box_3 ul:nth-child(1){
		margin: 0px 0px 0.37rem 0px;
	}
	/*#Shopmanagement .box_3 ul>a:nth-child(1){
		text-align: left;
	}
	#Shopmanagement .box_3 ul>a:last-child{
		text-align: right;
	}*/
	#Shopmanagement .box_3 .icon_box{
		height: 0.88rem;
		width: 0.88rem;
		display: inline-block;
		border-radius: 100%;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.5rem;
		margin: 0px 0px 0.19rem 0px;
	}
	#Shopmanagement .box_3 .text_1{
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #656565;
		min-width: 1rem;
	}
	#Shopmanagement .box_3 .bg_8a2be1{
		background: #8a2be1;
	}
	#Shopmanagement .box_3 .bg_5bb85d{
		background:#5bb85d;
	}
	#Shopmanagement .box_3 .bg_ff2c00{
		background: #ff2c00;
	}
	#Shopmanagement .box_3 .bg_30afd5{
		background: #30afd5;
	}
	#Shopmanagement .box_3 .bg_02cdd1{
		background: #02cdd1;
	}
	#Shopmanagement .box_3 .bg_ffa500{
		background: #ffa500;
	}
	#Shopmanagement .box_3 .bg_6296ec{
		background: #6296ec;
	}
	#Shopmanagement .box_3 .bg_eb1177{
		background: #eb1177;
	}
	
	
	
	
	
	#Shopmanagement .box_2{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		background: #FFFFFF;
		padding: 0.16rem 0px 0.33rem;
		color: ;
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #4d4d4d;
		text-align: center;
	}
	#Shopmanagement .box_2 li{
		width: 33.3%;
		padding: 0.13rem 0px 0px;
	}
	#Shopmanagement .box_2 li>div:nth-child(1){
		margin: 0px 0px 0.16rem;
	}
	#Shopmanagement .box_2 li:nth-child(2){
		border-left: 1px solid #cccccc;
		border-right: 1px solid #cccccc;
	}
	
	
	#Shopmanagement .box_1{
		background: #FFFFFF;
		padding: 0.2rem 0.23rem 0px 0.23rem;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
	}
	#Shopmanagement .box_1>div:nth-child(1){
		width: 1.46rem;
		height: 1.46rem;
		background-color: #CCCBCB;
		border-radius: 5px;
		overflow: hidden;
		border: 1px solid #EEEEEE;
	}
	#Shopmanagement .box_1>div:nth-child(1) img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#Shopmanagement .box_1>div:nth-child(2){
		flex-grow:1;
		padding: 0.17rem  0px 0px 0.22rem;
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #656565;
	}
	#Shopmanagement .box_1 .reputation_1{
		margin: 0.1rem 0px;
	}
	#Shopmanagement .box_1 .reputation_1 i{
		color: #F0BA14;
	}
	#Shopmanagement .box_1 .shopName i{
		font-size: 0.36rem;
		color: red;
	}
	
</style>