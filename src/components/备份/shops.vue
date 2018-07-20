<template>
	<div id="book">
		<header class="mui-bar mui-bar-nav">
		    <!--<a class="mui-icon mui-icon-settings mui-icon-left-nav mui-pull-left"></a>-->    			    
		    <i class="scanning icon iconfont icon-saomiao mui-pull-left" @click="saoyisaos()"></i>
		    <h1 class="mui-title">
				<div class="query">
					<i class="mui-icon mui-icon-search"></i>
					<input type="text" name="" id="" value="" />
				</div>
		    </h1>
		    <!--<a href="" class="mui-pull-right">></a>-->
		    <!--<a href="" class="mui-icon mui-icon-bars mui-icon-right-nav mui-pull-right"></a>-->
		    <!--<i @click="erwei(),hidden()"  class="gengduo icon iconfont icon-qr-code mui-pull-right"></i>-->
		</header>
		<div id="slider" class="mui-slider" >
			<div class="mui-slider-group mui-slider-loop">
				<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a>
						<img src="@/assets/img/shops_3.jpg">
					</a>
				</div>
				<!-- 第一张 -->
				<div class="mui-slider-item">
					<a href="#/Promote?type=1">
						<img src="@/assets/img/shops_1.jpg">
					</a>
				</div>
				<div class="mui-slider-item">
					<a href="#/Promote?type=2">
						<img src="@/assets/img/shops_2.jpg">
					</a>
				</div>
				<div class="mui-slider-item">
					<a>
						<img src="@/assets/img/shops_3.jpg">
					</a>
				</div>
				
				<div class="mui-slider-item">
					<a href="#/Promote?type=1">
						<img src="@/assets/img/shops_1.jpg">
					</a>
				</div>
			</div>
			<div class="mui-slider-indicator">
				<div class="mui-indicator mui-active"></div>
				<div class="mui-indicator"></div>
				<div class="mui-indicator"></div>
			</div>
		</div>
		<ul class="list_1 type_1">
			<a href="#/shopsList?name=休闲&id=1"><li><div><img src="@/assets/img/1524832959.jpg"/></div>休闲</li></a>
			<a href="#/shopsList?name=娱乐&id=2" ><li><div><img src="@/assets/img/1524832853.jpg"/></div>娱乐</li></a>
			<a href="#/shopsList?name=汽车&id=3" ><li><div><img src="@/assets/img/1524833127.jpg"/></div>汽车</li></a>
			<a href="#/shopsList?name=丽人&id=4" ><li><div><img src="@/assets/img/1524833085.jpg"/></div>丽人</li></a>
			<a href="#/shopsList?name=培训&id=5"><li><div><img src="@/assets/img/1524833173.jpg"/></div>培训</li></a>
		</ul>
		<ul class="list_1 type_2">
			<a href="#/shopsList?name=餐饮&id=6"><li><div><img src="@/assets/img/1524832441.jpg"/></div>餐饮</li></a>
			<a href="#/shopsList?name=酒店&id=7"><li><div><img src="@/assets/img/1524833027.jpg"/></div>酒店</li></a>
			<a href="#/shopsList?name=旅游&id=8"><li><div><img src="@/assets/img/1524833232.jpg"/></div>旅游</li></a>
			<a href="#/shopsList?name=家具&id=9"><li><div><img src="@/assets/img/1524833267.jpg"/></div>家具</li></a>
			<a href="#/shopsList?name=婚庆&id=10"><li><div><img src="@/assets/img/1524833297.jpg"/></div>更多</li></a>
		</ul>
		
		<div class="box_3">
			<div></div>
			<img src="@/assets/img/894997369988792767.jpg"/>
			<!--<div class="title">惠众会员专属</div>
			<div class="text">新人100元现金券福利</div>
			<a href="" class="btn_1">立即领取</a>-->
		</div>
		<div class="box_4">
			<header>
				<i class="fire_1 icon iconfont icon-huo"></i>&nbsp;热门商铺
				<a href="#/shopsList?name=更多商铺&&id=10" class="mui-pull-right">更多<i class="mui-icon mui-icon-arrowright"></i></a>
			</header>
			<ul class="box_4_list">
				
				<div class="swiper_1 swiper-container">
				    <div class="swiper-wrapper">
				      	
				    </div>
			  	</div>
			</ul>
			
			<header>
				<i class="fire_1 icon iconfont icon-huo"></i>&nbsp;热门商品
				<a href="#/Shopping" class="mui-pull-right">更多 <i class="mui-icon mui-icon-arrowright"></i></a>
			</header>
			<div class="box_4_list_2">
				<a v-for="(item,index) in findselfSupporting" :href="'#/commodity?id='+item.id" >
					<div class="img_box">
						<img :src="item.imagepath"/>
					</div>
					<div class="text_1">
						<div class="title_1">{{item.productname}}</div>
						<div>
							<span class="Label_1 mui-pull-left">包邮</span>
							<span class="address_1 mui-pull-right">官方直营</span>
							<div class="cb"></div>
						</div>
						<div class="Price_1">
							<i class="icon iconfont icon-renminbi1688"></i>
							<span>{{item.minsaleprice}}</span>
							<s class=""><i class="icon iconfont icon-renminbi1688"></i>{{item.marketprice}}</s>
							<font class="mui-pull-right">
								<b class="Sale_1">销</b>{{item.salecounts}}
							</font>
						</div>
					</div>
				</a>

			</div>
		</div>
		<!--<router-view></router-view>-->
			<!--<div @click="pengyou">
				分享到朋友圈
			</div>-->
		<!--<router-view></router-view>-->
			<!--<div @click="pengyou">
				分享到朋友圈
			</div>-->
		<!--<router-view></router-view>-->
		<sao :class="{weixinone:bool}"  ></sao>
		<model :class="{weixinone:bool}" @click.native="erwei(),none()"></model>
	</div>
</template>

<script>
	import {ajaxs,http} from '@/assets/fc'
	import model  from "./model_shops";
	import sao  from "./sao";
	export default{
		components:{
			model,
			sao
		},
		data:function(){
			return{
				nowindex:1,
				bool:true,
				url:"",
				appId:"",// 和获取Ticke的必须一样------必填，公众号的唯一标识
				timestamp:"",// 必填，生成签名的时间戳
				nonceStr:"",// 必填，生成签名的随机串
				signature:"",// 必填，签名，见附录1
				img:"../../static/img/redbao.png",//分享图片
				creening:"",//热门商铺
				findselfSupporting:"",	//热门商品
				pointlng:"",//我的经度
				pointlat:""//我的维度
			}
		},
		methods:{
			test(){
				console.log(1213)
			},
			//扫一扫
			saoyisaos(){
				
				wx.scanQRCode({
   					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    				scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    				success: function (res) {
                    //alert(JSON.stringify(res))
					}
				});
			},
			//进店看看
			go:function(id){	
				console.log(id)
				this.$router.push('/ShopDetails?id='+id);
			
			},
			config:function(res){
					console.log(res)
					var _this = this;
					_this.appId =res.data.appId
					_this.timestamp =res.data.timestamp
					_this.nonceStr =res.data.nonceStr
					_this.signature =res.data.signature
					this.wxs()
					
			},
			user:function(res){
				console.log(res,12345678);
				var _this = this;
				//返回CweixUser对象
				//判断用户是否同意授权
				if(res.code == 10009){
					mui.alert("请先同意授权信息!")
					return;
				}else if(res.code == 1000){
					_this.openid = res.data.openid //获取领取者的openid
				}
			},
			codess:function(res){
				console.log(res);
//				console.log(res.data);
				var code = res.data;
				//获取用户openId
				var data={
					code:code
				}
				ajaxs("post",liupeilin_ip+"/platform/redirec/index",data,this.user)
			},
			erwei:function(){
				this.bool=!this.bool;			
			},
			hidden:function(){
				var body = document.getElementsByTagName('body')[0];
				body.style.overflow='hidden'
			},
			none:function(){
				var body = document.getElementsByTagName('body')[0];
				body.style.overflow='visible'
			},
			//判断是否是微信公众号内打开
			is_weixn(){
				var ua = navigator.userAgent.toLowerCase();
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {
			        return true;
			    } else {
			        return false;
			    }
			},

			//获取所有店铺图片
			getShopImg:function(res){
				console.log('获取所有店铺图片',res)
			},
			//获取所有平台图片
			getImg:function(res){
				console.log('获取所有平台图片',res)
			},
			//获取所有活动图片
			getActivityImg:function(res){
				console.log('获取所有活动图片',res)
			},
			//上传图片
			adImg:function(res){
				console.log('根据店铺id获取图片',res)
			},
			Supporting:function(res){
				console.log('热门商品',res)
				this.findselfSupporting = res
			}
		},
		mounted:function(){
			
			var _this=this
			var swiper = new Swiper('#book .swiper_1',{
	//				initialSlide:0,	//初始化显示第几个
					loop : true,	//循环
					autoplay:true,
			      	slidesPerView :3,
			      	spaceBetween : 6, //间距
//			    	autoplay:true,
//			    	init: false,
			    	virtual:true,
//			    	lazyLoading:false
					lazy: {
					    loadPrevNext: true,
					    loadPrevNext:true,
					},
			});
			    
			//热门商铺  size:每页大小
			http('post','/mall/mobile/shop/findShopByTime',{'size':10},shopcreening);
			function shopcreening(res){
				_this.creening = res
				console.log('热门商铺',res);
				tp();
			}
			
			function tp(){
				var x=_this.creening
				var list=[];
				for(var i=0;i<x.length;i++){
					var html='<a href="#/ShopDetails?id='+x[i].id+'">'+
			      				'<img src="'+x[i].mainlogo+'"/>'+
								'<div>'+x[i].shopname+'</div>'+
			      			'</a>';
			      	list.push(html)
				}
				swiper.virtual.cache=[];
			    swiper.virtual.slides=list
			    swiper.virtual.update();
//			    swiper.init();
			};
			
			mui('.mui-slider').slider({
				swipeBack:true, //启用右滑关闭功能
			  	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			//获取热门商品
			http('post','/mall/mobile/product/findselfSupporting',{'type':1,'size':10},this.Supporting);
			
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					_this.pointlng = r.point.lng;
					_this.pointlat = r.point.lat;
				}
				else {
					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})


		
			
		},
		created:function(){}
	}
</script>

<style>
	#book #model{opacity:0.9;}
	#book .weixinone{display: none;}
	.cb{
		clear: both;
	}
	
	#book .line_1{
		height: 7px;
	}
	
	#book .scanning,
	#book .gengduo{
		margin-top: 0.2rem;
		font-size: 0.48rem;
		color: #ffffff;
	}
	#book>header{
		background: #164265;
		opacity: 0.9;
	}
	
	#book .query{
		background: #ffffff;
		margin: 7px 7px 0px;
		/*border-radius: 30px;*/	
		border-radius: 0.6rem;
		position: relative;
		overflow: hidden;
		/*height: 30px;*/
		height: 0.6rem;
	}
	#book .query>input{
		height: 100%;
		float: left;
		border: none;
		margin-bottom: 0px;
		/*padding-left: 40px;*/
		padding-left: 0.7rem;
	}
	#book .query i{
		position: absolute;
		top: 6px;
		left: 8px;
		/*font-size: 18px;*/
		font-size: 0.36rem;
	}
	
	
	#book{
		background: #EEEEEE;
		/*padding: 44px 0px 67px;*/
		padding: 0.88rem 0px 1.34rem;
	}
	#book .box_4 header{
		font-size: 0.26rem;
		letter-spacing: 1px;
		color: #333333;
		height:1.22rem;
		line-height:1.22rem;
		text-align: center;
	}
	#book .mui-segmented-control.mui-scroll-wrapper .mui-control-item{
		padding: 0 0.2rem;
	}
	#book .mui-segmented-control .mui-control-item{
		line-height: none;
	}
	#book  .mui-control-item .img{
		margin-top: 0.3rem;
	}
	#book .box_4 header a{
		color:#000000;
		font-size:0.2rem;
	}
	#book .mui-segmented-control .mui-control-item{
		line-height: none;
	}
	#book .box_4 header .fire_1{
		color: #e11117;
		font-size: 0.26rem;
	}
	#book .box_4 header i{
		font-size: 0.16rem;
	}
	#book .box_4 .mui-scroll img{
		width:2.35rem;
		height:2.51rem;
	}
	#book .box_4 .box_4_list{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		background: #FFFFFF;
		/*height:3.5rem;*/
		padding: 0.3rem 0px 0.3rem;
	}
	#book .box_4 .box_4_list a{
		height: 100%;
		color: #000000;
		text-align: center;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	#book .box_4 .box_4_list a img{
		width: 2.35rem;
   		height: 2.51rem;
		object-fit: cover;
	}
	
	
	#book .mui-segmented-control.mui-scroll-wrapper .mui-scroll{
		height:100%;
	}
	#book .mui-segmented-control.mui-scroll-wrapper{
		height:100%;
	}
	
	#book .box_4_list_2{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	#book .box_4_list_2 a{
		width: 50%;
		display: block;
		padding: 5px;
		color: #000000;
	}
	#book .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
		color:#000000;
		border-bottom: none;
	}
	#book .mui-control-item span{
		display: inline-block;
		width: 100%;
		overflow: hidden;    
		text-overflow:ellipsis;    
		white-space: nowrap;
	}
	#book .box_4_list_2 a .text_1{
		background: #FFFFFF;
		padding:5px;
	}
	#book .box_4_list_2 .img_box{
		height: 3.2rem;
	}
	#book .box_4_list_2 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#book .box_4_list_2 .title_1{
		padding: 0px 0px 5px;
		font-size: 0.28rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#book .box_4_list_2 .Label_1{
		display: inline-block;
		padding: 0px 3px;
		color: red;
		border: 1px solid red;
		font-size: 0.24rem;
		height: 0.34rem;
		line-height: 0.34rem;
		border-radius: 0.26rem;
	}
	#book .box_4_list_2 .address_1{		
		display: inline-block;
		padding: 0px 3px;
		color: red;
		border: 1px solid red;
		font-size: 0.24rem;
		height: 0.34rem;
		line-height: 0.34rem;
		border-radius: 0.26rem;
		color: #FFFFFF;
		background: red;
	}
	#book .box_4_list_2 .Price_1{
		font-size: 0.24rem;
		margin: 5px 0px 0px;
		color: #DA580C;
	}
	#book .box_4_list_2 .Price_1 span{
		font-size: 0.3rem;
	}
	#book .box_4_list_2 .Price_1 s,
	#book .box_4_list_2 .Price_1 font{
		color: #9F9F9F;
	}
	#book .box_4_list_2 .Price_1 .Sale_1{
		background: #0198e9;
    	width: 14px;
    	height: 14px;
    	border-radius: 2px;
    	color: #FFFFFF;
    	line-height: 14px;
    	display: inline-block;
    	text-align: center;
    	font-weight: 100;
    	margin-right: 2px;
	}
	
	
	
	#book .box_3{
		/*height: 1.32rem;
		background-image:url('../../static/img/20180423135833.jpg');
		background-size: cover;
		text-align: center;*/
		padding: 0.1rem 5px 0.1rem;
		position: relative;
	}
	#book .box_3>div{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	#book .box_3>img{
		width: 100%;
	}
	
	#book .mui-slider .mui-slider-group .mui-slider-item img{
		/*height: 3.1rem;*/
		object-fit: cover;
	}
	#book .list_1{
		font-size: 0.22rem;
		background: #FFFFFF;
		padding: 0.26rem 0px 0px;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		/*换行*/
		flex-wrap:wrap;
		/*项目的放大比例*/
		flex-grow:0;
		justify-content: space-between;
	}
	#book .list_1.type_2{
		padding-bottom: 0.26rem;		
	}
	#book .list_1 a{
		width: 0.85rem;
		color: #000000;
		text-align: center;
	}
	#book .list_1 li>div{
		width: 0.86rem;
		height: 0.86rem;
		margin: 0px auto 5px;
		border-radius: 100%;
	}
	#book .list_1 li>div img{
		width: 100%;
		height: 100%;
	}
	
	/*#book .type_1>a:nth-child(1) li>div{
		background-position:-0.2rem -0.2rem;
	}
	#book .type_1>a:nth-child(2) li>div{
		background-position:-1.56rem -0.2rem;
	}
	#book .type_1>a:nth-child(3) li>div{
		background-position:-3rem -0.2rem;
	}
	#book .type_1>a:nth-child(4) li>div{
		background-position:-4.4rem -0.2rem;
	}
	#book .type_1>a:nth-child(5) li>div{
		background-position:-5.8rem -0.2rem;
	}
	#book .type_2>a:nth-child(1) li>div{
		background-position:-0.2rem -1.6rem;
	}
	#book .type_2>a:nth-child(2) li>div{
		background-position:-1.56rem -1.6rem;
	}
	#book .type_2>a:nth-child(3) li>div{
		background-position:-2.96rem -1.6rem;
	}
	#book .type_2>a:nth-child(4) li>div{
		background-position:-4.4rem -1.6rem;
	}
	#book .type_2>a:nth-child(5) li>div{
		background-position:-5.78rem -1.6rem;
	}*/
</style>