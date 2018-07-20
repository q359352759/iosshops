<template>
	<div id="order">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">我的订单</h1>
		</header>
		<nav>
				<ul class="clear">
					<li><a @click="change_nowindex(1)" :class="{active:nowindex==1}">全部</a></li>
					<li><a @click="change_nowindex(2)" :class="{active:nowindex==2}">待付款</a></li>
					<li><a @click="change_nowindex(3)" :class="{active:nowindex==3}">待发货</a></li>
					<li><a @click="change_nowindex(4)" :class="{active:nowindex==4}">待收货</a></li>
					<li><a @click="change_nowindex(5)" :class="{active:nowindex==5}">待评论</a></li>
					<li><a @click="change_nowindex(6)" :class="{active:nowindex==6}">已评论</a></li>
					<li><a @click="change_nowindex(7)" :class="{active:nowindex==7}">已关闭</a></li>
					<li><a @click="change_nowindex(8)" :class="{active:nowindex==8}">已完成</a></li>
				</ul>
		</nav>
		<div class="box_1" v-if="nowindex==1">
			<!--全部-->
				<div class="content" v-for="x in all_list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<button v-if="x.buttonType!=0" @click="logistics(x)" type="button" class="mui-btn mui-btn-outlined ri">查看快递 </button>
							<button @click="payment(x)" v-if="x.buttonType==0" type="button" class="mui-btn mui-btn-warning mui-btn-outlined">马上支付</button>
							<button v-if="x.buttonType==3" type="button" class="mui-btn mui-btn-warning mui-btn-outlined">确认收货</button>
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="all_list.length==0" class="loading mui-text-center">暂无数据</div>
		</div>
		<!--待付款-->
		<div class="box_1" v-if="nowindex==2" v-on:scroll="scroll_1(1)">
			<div class="content" v-for="x in list_1.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<!--<button type="button" @click="logistics(x)" class="mui-btn mui-btn-outlined ri">查看快递 </button>-->
							<button @click="payment(x)"  type="button" class="mui-btn mui-btn-warning mui-btn-outlined">马上支付</button>
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			
			<div v-if="list_1.Loading==0 && list_1.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_1.Loading==0 && list_1.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>
		<!--待发货-->
		<div class="box_1" v-if="nowindex==3" v-on:scroll="scroll_1(2)">
			<div class="content" v-for="x in list_2.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<button type="button" class="mui-btn mui-btn-outlined ri">提醒发货</button>
							<!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">确认收货</button>-->
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_2.Loading==0 && list_2.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_2.Loading==0 && list_2.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>
		<!--待收货-->
		<div class="box_1" v-if="nowindex==4" v-on:scroll="scroll_1(3)">
			<div class="content" v-for="x in list_3.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<button type="button" @click="logistics(x)" class="mui-btn mui-btn-outlined ri">查看快递 </button>
							<button type="button" @click="Collect_goods(x)" class="mui-btn mui-btn-warning mui-btn-outlined">确认收货</button>
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_3.Loading==0 && list_3.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_3.Loading==0 && list_3.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>
		<!--待评论-->
		<div class="box_1" v-if="nowindex==5" v-on:scroll="scroll_1(7)">
			<div class="content" v-for="x in list_7.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<button type="button" class="mui-btn mui-btn-outlined ri">删除</button>
							<a :href="'#/orderComment?id='+x.identId">
								<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">评论</button>
							</a>
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_7.Loading==0 && list_7.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_7.Loading==0 && list_7.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>
		<!--已评论-->
		<div class="box_1" v-if="nowindex==6" v-on:scroll="scroll_1(6)">
			<div class="content" v-for="x in list_6.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<!--<button type="button" @click="logistics(x)" class="mui-btn mui-btn-outlined ri">查看快递 </button>-->
							<!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">评论</button>-->
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_6.Loading==0 && list_6.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_6.Loading==0 && list_6.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>
		<!--已关闭-->
		<div class="box_1" v-if="nowindex==7" v-on:scroll="scroll_1(4)">
			<div class="content" v-for="x in list_4.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<!--<button type="button" @click="logistics(x)" class="mui-btn mui-btn-outlined ri">查看快递 </button>-->
							<!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">评论</button>-->
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_4.Loading==0 && list_4.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_4.Loading==0 && list_4.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>		
		<!--已完成-->
		<div class="box_1" v-if="nowindex==7" v-on:scroll="scroll_1(5)">
			<div class="content" v-for="x in list_5.list">
					<div class="heade">
						<div class="heade_l">
							<!--<img src="" />-->
							<span>{{x.shopName}}</span>
						</div>
						<div class="heade_r">
							{{type[x.buttonType]}}
						</div>
					</div>
					<div class="item" v-for="y in x.goodsList">
						<div class="right">
							<div class="right_t clear">
								<div class="right_t_l">
									<p>{{y.goodsName}}</p>
									<span v-for="goodsFeature in y.goodsFeature">{{goodsFeature}}</span>
								</div>
								<div class="right_t_r">
									<div class="right_t_r_r">
										<p>￥{{y.goodsPrice[0]}}</p>
										<span>x{{y.goodsNumber}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="left">
							<img :src="y.goodsImg" />
						</div>
						<div class="mui-clearfix"></div>
					</div>
					<div class="footer_1">
						<div class="right_b mui-pull-right">
							<!--<button type="button" @click="logistics(x)" class="mui-btn mui-btn-outlined ri">查看快递 </button>-->
							<!--<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">评论</button>-->
						</div>
						<p class="times">下单时间:{{x.date}}</p>
						<div class="mui-clearfix"></div>
					</div>
				</div>
			<div v-if="list_5.Loading==0 && list_5.list.length==0" class="loading mui-text-center">暂无数据</div>
			<div v-if="list_5.Loading==0 && list_5.list.length!=0" class="loading mui-text-center">———— 我是有底线的 ————</div>
		</div>		
	</div>
</template>

<script>
	import $ from "jquery";
	import axios from 'axios';
	import {http,ajaxs} from '@/assets/fc'
	export default{
		components:{},
		data:function(){
			return{
				nowindex:1,
				type:{'-1':'状态异常','0':'待付款','1':'待收货','2':'待评论'},	//1待收货,0待付款,2待评论
				userId:localStorage.getItem("ids"),
				pageIndex_0:1,		//所有
				all_list:[],					//所有订单
				pageIndex_1:1,		//待付款		//1待付款2待发货3待收货4已关闭5已完成6已评论7待评论
				list_1:{
					list:[],
					Loading:1,		//0表示没有更多1表示加载中，2表示加载完成
				},
				pageIndex_2:1,		//待发货
				list_2:{
					list:[],
					Loading:1,
				},
				pageIndex_3:1,		//待收货
				list_3:{
					list:[],
					Loading:1,
				},
				pageIndex_7:1,		//待评论
				list_7:{
					list:[],
					Loading:1,
				},
				pageIndex_6:1,		//已评论
				list_6:{
					list:[],
					Loading:1,
				},
				pageIndex_4:1,		//已关闭
				list_4:{
					list:[],
					Loading:1,
				},
				pageIndex_5:1,		//已完成
				list_5:{
					list:[],
					Loading:1,
				}
			}
		},
		methods:{
			payment(x){
				mui.toast('此功能暂未开放',{ duration:2000, type:'div' })
			},
			//确认收货
			Collect_goods(x){
				console.log(x)
				var this_1=this
				mui.confirm('确认收货？','提示',['我在考虑下','确定'],function(e){
					if(e.index==1){
						http('post','/mall/mobile/order/orderReceipt',{'orderId':x.identId},this_1.orderReceipt_return)
					}
				})
			},
			orderReceipt_return(x){
				console.log(x);
				this.pageIndex_3=1;
				this.pageIndex_7=1;
				this.list_3={
					list:[],
					Loading:1,
				}
				this.list_7={
					list:[],
					Loading:1,
				}
				this.get_type_order(3);
		 		this.get_type_order(7);
			},
			//查看物流
			logistics(x){
				if(x.expressnum=='' || x.expressnum==null){
					mui.toast('此订单没有物流信息',{ duration:'long', type:'div' });
				}else{
					this.$router.push('/logistics?expNo='+x.expressnum+'&expName='+x.expressCompanyName);
				}
			},
			//点击却换选项
			change_nowindex(x){
				this.nowindex=x;
			},
			//查询用户的所有订单
			get_all_order(){
				http('post','/mall/mobile/order',{userId:this.userId},this.all_order_return)
			},
			all_order_return(x){
				console.log('用户所有订单',x);
				this.all_list=x.data
			},
			//待分页的查询订单列表
			get_type_order(x){
					var this_1=this;
					var obj=new Object();
						obj.memberId=this.userId;
						obj.page=this['pageIndex_'+x];
						obj.orderStatus=x
					http('post','/mall/mobile/order/pageMemberOrder',obj,order_return);
					function order_return(y){
						console.log('待分页的查询订单列表',x,y);
						if(y.data.length==0){
							this_1['list_'+x].Loading=0
						}else{
							this_1['list_'+x].Loading=2
						}
						this_1['list_'+x].list=this_1['list_'+x].list.concat(y.data);
						
					}
			},
			scroll_1(x){
				if(this['list_'+x].Loading==2){
					this['pageIndex_'+x]++;
					this.get_type_order(x);
				}
			}
		 },
		 created:function(){
		 	this.get_all_order();	//查询用户的所有订单
		 	this.get_type_order(1);	//订单状态 1待付款2待发货3待收货4已关闭5已完成6已评论7待评论
		 	this.get_type_order(2);
		 	this.get_type_order(3);
		 	this.get_type_order(7);
		 	this.get_type_order(6);
		 	this.get_type_order(4);
		 	this.get_type_order(5);
		 	
		 	
		 	console.log(localStorage.getItem("ids"))
		 	var index =this.$route.params.id;
		 	if(index){
		 		this.nowindex = index;
		 	}
		}
	}
</script>

<style>
	#order{
		padding: 1px 0px 0px;
	}
	#order .loading{
		padding: 0.2rem 0px;
		font-size: 0.3rem;
		color: #565656;
	}
	#order .box_1{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		padding: 80px 0px 0px;
		overflow: auto;
	}
	#order .mui-bar-nav{background-color:#00a2ea;}
	#order .times{
		color:#5e5e5e;font-size: 0.2rem;
		margin: 0.2rem 0px 0px;
	}
	#order a{color:white;}
	#order p{margin-bottom:0;}
	#order h1{color:white;}
	#order nav{
		z-index: 1;
		position: relative;
		margin-top:44px;background-color:white;height:0.8rem;border-bottom: 1px solid #e5e5e5;
	}
	#order nav ul{
		white-space: nowrap;
		overflow: auto;
	}
	#order nav ul li{
		width: 75px;
		display: inline-block;
		text-align: center;line-height:0.8rem;
	}
	#order nav ul li a{color:#403f44;padding-bottom: 0.1rem;}
	#order .active{border-bottom: 3px solid #ff4a04;color: #ff4a04;}
	#order .content{
		margin-top:10px;
		background-color: white;position: relative;
	}
	#order .content .footer_1{
		padding: 0.2rem 0.2rem;
	}
	#order .content .heade{
		padding: 0px 0.2rem;
		width:100%;height:0.9rem;line-height:0.9rem;}
	#order .content .heade .heade_l span{color:#5e5e5e;font-size:0.3rem;}
	#order .content .heade .heade_l img{width:0.5rem;height:0.5rem;vertical-align: middle;margin-right:0.08rem;}
	#order .content .heade .heade_r{float: right;color:#ff7e26;font-size:0.3rem;}
	#order .content .heade .heade_l{float: left;}
	#order .content .item{
		background: #f5f5f5;
 	   	padding: 0.1rem 0.2rem;
 	   	border-bottom: 1px solid #ffffff;
	}
	#order .content .item .left{width:30%;float: right;}
	#order .content .item .left img{
		width:1.55rem;height:1.55rem;
		object-fit: cover;
	}
	#order .content .item .right{width:70%;float:right;}
	#order .content .item .right .right_t_l{width:70%;float: left;}
	#order .content .item .right .right_t_l p{overflow:hidden;height:0.75rem;text-overflow: ellipsis;} 
	#order .content .item .right .right_t_l span{
		margin-right: 5px;
		color:#ad505b;border:1px solid #ad505b;border-radius: 0.05rem;font-size:0.3rem;margin-top:0.05rem;
	}
	#order .content .item .right .right_t_r{width:30%;float: left;}
	#order .content .item .right .right_t_r .right_t_r_r{float: right;color:#a1a1a1;}
	#order .content .item .right .right_t_r span{float: right;margin-top:0.05rem;}
	#order .right_b .ri{margin-right:0.1rem;}
</style>