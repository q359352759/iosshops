<template>
	<div>
		<div id="wx2">
			<center>
				<div id="wx_p">
					<p>{{shop_info.shop.shopname}}</p>
				</div>	
				<div class="wx_text">
					<h1>支付成功</h1>
					<p>
						<span v-show="type==1">(消费{{Total}}元)</span>
						<span v-show="type==2">(消费{{Total-profit}}元)</span>
					</p>
					<p>2018.5.3  13:52:12</p>
				</div>
				<div class="yes">
					<img src="@/assets/img/finish_06.jpg" />
				</div>
				<div class="wx_money">
					<img src="../assets/img/20180424102156.jpg" />
					<div class="text">
						<span>{{type==1?'分润':"省钱"}}</span>
						<span>{{profit}}{{type==1 ? 'HB':'元'}}</span>
					</div>
				</div>
				<div class="wx_pj">
					<span>评价</span>
					<font>
						<i v-for="(x,index) in icon_star_list" v-on:click="change_active(x,index)" :class="{'active':x.active}" class="icon iconfont icon-star"></i>
					</font>
					<a :href="'#/ShopEvaluation?id='+shop_info.shop.id" class="fin_11">
						<img class="" src="@/assets/img/finish_11.jpg" />
					</a>
				</div>
				<div class="wx_tuijian">
					<p>热门商铺推荐 </p>
				</div>
					<div class="mui_slider_box">
						<span class="le"><<</span>
						<div id="" class="mui-slider" >
							<div class="mui-slider-group mui-slider-loop">
								<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
								<div v-if="creening.length!=0" class="mui-slider-item mui-slider-item-duplicate">
									<a :href="'#/ShopDetails?id='+creening[0].id" class="">
										<img :src="creening[0].mainlogo">
									</a>
								</div>
								<!-- 第一张 -->
								<div class="mui-slider-item" v-for="x in creening">
									<a :href="'#/ShopDetails?id='+x.id" class="">
										<img :src="x.mainlogo">
									</a>
								</div>
								
								<!--最好一张-->
								<div v-if="creening.length!=0" class="mui-slider-item">
									<a :href="'#/ShopDetails?id='+creening[creening.length-1].id" class="">
										<img :src="creening[creening.length-1].mainlogo">										
									</a>
								</div>
							</div>
						</div>
						<span class="ri">>></span>
					</div>
				
			</center>
		</div>
	</div>
</template>
<script>
	import {http} from '@/assets/fc';
	export default{
		name:'finish',
		props: ['zidingyi'],
			components:{		
			},
			data:function(){
				return{
					Total:'',
					profit:'',
					type:1,
					icon_star_list:[
						{'id':0,'active':true},
						{'id':1,'active':true},
						{'id':2,'active':true},
						{'id':3,'active':true},
						{'id':4,'active':true}
					],
					memId:'',		//分享者id或者店铺id
					shop_info:{		//店铺基本信息
						shop:{}
					},
					creening:[],	//热门店铺
				}
			},		
			methods:{
//				change_active:function(x,y){
//					console.log(x);
//					var icon_star_list=this.icon_star_list;
//						for(var i=0;i<icon_star_list.length;i++){
//							icon_star_list[i].active=false;
//							if(i<=y){
//								icon_star_list[i].active=true;
//							}
//						}
//				}
			},
			created(){
				
			},
			mounted: function(){
				var this_1=this;
//				this.type=this.$route.query.type ? this.$route.query.type : '';
				this.memId=this.$route.query['amp;Inviterid'] ? this.$route.query['amp;Inviterid'] : '';
				//查询商家基本信息
				http('post','/mall/mobile/shop/showShop',{'id':this.memId},showShop_return)
				function showShop_return(x){
					console.log('查询商家基本信息',x);
					this_1.shop_info=x
				}
				
				//获取热门店铺
				http('post','/mall/mobile/shop/findShopByTime',{'size':6},shopcreening)
				function shopcreening(x){
					console.log('热门店铺',x);
					this_1.creening=x;
					setTimeout(function(){
						mui('.mui-slider').slider({
							swipeBack:true, //启用右滑关闭功能
						  	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
						});
					},10)
				}
				
				
//				mui('.mui-scroll-wrapper').scroll({
//					scrollY: true, //是否竖向滚动
//					 scrollX: false, //是否横向滚动
//					 startX: 0, //初始化时滚动至x
//					 startY: 0, //初始化时滚动至y
//					 indicators: true, //是否显示滚动条
//					 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
//					 bounce: true //是否启用回弹
//				});
				
			},
			watch:{
				//这个是监听事件可以不写也能收到数据
			  	zidingyi:function(x){
			  		console.log('finish.vue收到数据',x);
			  		this.type=x[1]
			  		this.Total=x[0]
			  		var thisprofit=x[0]*this.shop_info.contractratio/100
			  		this.profit=thisprofit.toFixed(1);
			  	}
			}
			
 }
	
</script>
<style>
	i{font-style:normal;}
	#wx2{width:91%;
		padding-bottom: 0.3rem;
		background-color:#FFFFFF;position: absolute;
		top: 20%;left:5%;border-radius:0.2rem;font-size:0.2rem;
		z-index: 10;
	}
	#wx2 #wx_p{color:#00a2e7;font-size:0.35rem;margin-top:2%;}
	#wx2 .wx_text h1{color:#323232;margin-top:3%;}
	#wx2 .wx_text p:nth-child(2){color:#828282;font-size:0.33rem;margin-top:2%;}
	#wx2 .wx_text p:nth-child(3){color:#828282;font-size:0.1rem;margin-top:2%;}
	#wx2 .wx_pj span{
		vertical-align: middle;
		font-size: 0.24rem;
		color:#838383;
	}
	#wx2 .wx_pj font i{
		font-size: 0.28rem;
		margin: 0px 1px;
		/*color: #F5EB31;*/
	}
	#wx2 .wx_pj font i.active{
		color: #afb317;
	}
	#wx2 .wx_pj .fin_11{
		vertical-align: middle;
		margin-left:7%;
		width: 1.5rem;
		height: 1.5rem;
		display: inline-block;
		position: relative;
	}
	#wx2 .wx_pj .fin_11>img{
		position: absolute;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		margin: auto;
		width: 100%;
		max-height: 100%;
		animation:fin_11_animation 1s infinite;
	}
	@keyframes fin_11_animation{
		0%{width: 100%;}
		100%{width:90%}
	}
	
	
	#wx2 .yes{position:absolute;top:13%;left:11%;width:0.66rem;height:0.66rem;}
	#wx2 .yes img{max-height:0.66rem;max-width:0.66rem;}
	#wx2 .wx_money{position:absolute;top:4%;left:74%;width:1.5rem;height:1.5rem;}
	#wx2 .wx_money img{max-height:1.5rem;max-width:1.5rem;}
	#wx2 .wx_money .text{
		position: absolute;
		top: 13px;
		left: 4px;
		width: 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 0.27rem;
		font-weight: bold;
		transform: rotate(45deg);
	}
	#wx2 .wx_money .text span{
		display: block;
	}
	
	#wx2 .wx_pj img:nth-child(2){
		width:1.9rem;
		height:0.38rem;
		vertical-align: middle;
		margin-left:3%;
	}	
	#wx2 .wx_tuijian p{
		font-size: 0.28rem;
	    background: #CCCCCC;
	    padding: 0.05rem 0px;
	    letter-spacing: 0.1rem;
	}
	#wx2 .mui_slider_box{
		padding: 0px 0.4rem;
	}
	#wx2 .mui-slider-item{
		width: 50%;
	}
	#wx2 .mui-slider-item>a{
		padding: 0.1rem;
		height: 2.09rem;
	}
	#wx2 .mui-slider-item>a img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 1px solid #cccbcb;
	}
	
	
	
	
	
	
	
	#wx2 .mui-scroll-wrapper{
		position: absolute;
		top:69%;
		left:0%;
		height: 2.09rem;
	}
	#wx2 .mui-scroll{
		height: 100%;
	}
	#wx2 .mui-scroll-wrapper img{
		/*width:44%;*/
		width: 2.89rem;
		height: 2.09rem;
	}
	#wx2 .le{position: absolute;left:1%;top:80%;font-size:0.25rem;}
	#wx2 .ri{position: absolute;left:95%;top:80%;font-size:.25rem;}
</style>