<template>
	<div id="shopsList">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">{{titleName}}</h1>
		</header>
		<!--<div class="mui-content">-->
		    <div class="box_2">
				<div class="left" v-on:click="left_1()"><i class="mui-icon mui-icon-arrowleft"></i></div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				    <div class="mui-scroll">
				        <a @click="go('餐饮',6)" href="index.html#/shopsList?name=餐饮&id=6" class="mui-control-item mui-active"><div class="img"><img src="@/assets/img/1524832441.jpg"/></div>餐饮</a>
				        <a @click="go('娱乐',2)" href="index.html#/shopsList?name=娱乐&id=2" class="mui-control-item"><div class="img"><img src="@/assets/img/1524832853.jpg"/></div>娱乐</a>
				        <a @click="go('休闲',1)" href="index.html#/shopsList?name=休闲&id=1" class="mui-control-item"><div class="img"><img src="@/assets/img/1524832959.jpg"/></div>休闲</a>
				        <a @click="go('酒店',7)" href="index.html#/shopsList?name=酒店&id=7" class="mui-control-item"><div class="img"><img src="@/assets/img/1524833027.jpg"/></div>酒店</a>
				        <a @click="go('丽人',4)" href="index.html#/shopsList?name=丽人&id=4" class="mui-control-item"><div class="img"><img src="@/assets/img/1524833085.jpg"/></div>丽人</a>
				        <a @click="go('汽车',3)" href="index.html#/shopsList?name=汽车&id=3" class="mui-control-item"><div class="img"><img src="@/assets/img/1524833127.jpg"/></div>汽车</a>
				        <a @click="go('培训',5)" href="index.html#/shopsList?name=培训&id=5" class="mui-control-item"><div class="img"><img src="@/assets/img/1524833173.jpg"/></div>培训</a>
				        <!--<a class="mui-control-item"><div class="img"><img src="@/assets/img/1524833232.jpg"/></div>保健</a>
				        <a class="mui-control-item"><div class="img"><img src="@/assets/img/1524833267.jpg"/></div>宠物</a>-->
				        <!--<a class="mui-control-item"><div class="img"><img src="@/assets/img/1524833297.jpg"/></div>更多</a>-->
				    </div>
				</div>
				<div class="right mui-hidden" v-on:click="right_1()"><i class="mui-icon mui-icon-arrowright"></i></div>
			</div>
			<div class="box_3">
				<select name="" v-model="shop" v-for="(item,index) in categoryname" v-if="len>0"  @change="change(item.id,shop)">
					<option class="shop_option" selected="selected">二级分类</option>
					<option class="shop_option" value="0" >{{item.categoryname}}</option>
				</select>
				<select name="" v-if="len==0">
					<option class="shop_option" value="none">二级分类</option>
				</select>
				<select name="" v-model="types" @change="distance(types)">
					<option selected="selected" value="附近">附近</option>
					<option value="1">1KM以内</option>
					<option value="5">5KM以内</option>
				</select>
				<select name="" v-model="type" id="select_Sorting"  @change="Sorting(type)">
					<option selected="selected">排序</option>
					<option  value="0">时间排序</option>
					<option value="1">销量排序</option>
					<option value="2">好评率</option>
				</select>
				<select name="">
					<option value="">筛选</option>
					<option value="">好评</option>
					<option value="">热门</option>
				</select>
				<div class="cb"></div>
			</div>
			<div class="box_4">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="(item,index) in data">
				            <img class="mui-media-object mui-pull-left" :src="item.mainlogo" @click="ShopDetails(item)">
				            <div class="mui-media-body">
				            	<div class="right">
				            		<img src="@/assets/img/CustomerService.png"/>
				            		<img src="@/assets/img/Sincerity.png"/>
				            	</div>
				            	<div class="left">
				            		<div class="title_1">{{item.shopname}}</div>
				            		
				               		<div class="address_1" @click="go_map(item.latitude,item.longitude,item.companyaddress)" ><i class="mui-icon mui-icon-location"></i><span>{{item.companyaddress}}</span></div>	
				                	<div class="address_2"><span><i class="mui-icon mui-icon-paperplane"></i>{{item.distance}}公里</span><span class="volume">月销：<font>{{item.num? item.num:0}}</font>笔</span></div>
				                	
				                	<div class="Stars" v-if="item.shopname.creditrating==0 || item.shopname.creditrating==null">信誉
				            			<i class="mui-icon mui-icon-star"></i>
				            		</div>
				            		<div class="Stars" v-if="item.shopname.creditrating==1">信誉
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            		</div>
				            		<div class="Stars" v-if="item.shopname.creditrating==2">信誉
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            		</div>
				            		<div class="Stars" v-if="item.shopname.creditrating==3">信誉
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            		</div>
				            		<div class="Stars" v-if="item.shopname.creditrating==4">信誉
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            			<i class="mui-icon mui-icon-star"></i>
				            		</div>
				            	</div>
				            </div>
				    </li>
				</ul>
			</div>
			<div v-if="data.length==0" class="mui-text-center">暂无数据</div>
		<!--</div>-->
	</div>	
</template>
<script>
	import $ from "jquery"
	import {axios,ajaxs} from '@/assets/fc'
	export default{
		components:{
			
		},
		data:function(){
			return{
				titleName:'',	//类型名称
				data:[],
				categoryname:[],//二级分类
				latitude:"",//经度
				longitude:"",//纬度
				id:"",	
				type:"排序",
				types:"附近",
				shop:"二级分类",
				pointlng:"",//我的经度
				pointlat:"",//我的维度
				len:""
			}
		},
		methods:{
			go(x,y){
				this.titleName=x;
				this.id=y
				this.get_BMap();
				this.categoryname=[]//二级分类
				ajaxs("post",liupeilin_ip+"/mall/mobile/shopcategory/findTwoidByOneid",{'id':this.id},this.resfts)
			},
			//筛选附近商铺
			distance:function(types){
				var data = this.data;
				console.log(data[0].distance>types)
				if(types!=="附近"){
					console.log(data[0].distance,types)
					for(var i=1;i<data.length-1;i++){
						if(data[i].distance>types){
							data = data.splice(i,1)
							console.log(data)
						}	
					}	
				}
				this.data = data;
			},
			ShopDetails:function(x){
				console.log(x)
				this.$router.push("/ShopDetails?id="+x.id)
			},
			left_1:function(){
				
			},
			right_1:function(){
				
			},
			 Rad:function(d){  
			    return d * Math.PI / 180.0;
			}, 
			//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度  
			GetDistance:function(lat1,lng1,lat2,lng2){ 
				var _this = this;
			    var radLat1 = _this.Rad(lat1);  
			    var radLat2 = _this.Rad(lat2);  
			    var a = radLat1 - radLat2;  
			    var b = _this.Rad(lng1) - _this.Rad(lng2);  
			    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));  
			    s = s * 6378.137; // 地球半径，千米;  
			    //输出为公里
			    s = Math.round(s * 10000) / 10000;  
			    //单位修改为米,取整 
			    //s = Math.round(s * 1000) / 1; 
			    //s=s.toFixed(4);  
			    s = parseInt(s);
			    return s;  
			},
			//列表返回值
			resft:function(res){
				 var _this = this;
				 var lg;
				 var lt;
				 var pointA;
				 var pointB;
				 var computer;
				 var mile;
//				 console.log(this.pointlng,this.pointlat,11)
				for(var i=0;i<res.length;i++){
					//使用方法  
					pointA = new BMap.Point(res[i].longitude,res[i].latitude);  
					pointB = new BMap.Point(_this.pointlng,_this.pointlat); 
					mile = _this.GetDistance(pointA.lat, pointA.lng, pointB.lat, pointB.lng);  
					res[i].distance = mile					
				}
				this.data=res;
				console.log(this.data)
			},
			go_map:function(latitude,longitude,companyaddress){
				var latitude=latitude;
				var longitude=longitude
				var pointlat=pointlat;
				var pointlng=pointlng;
				var companyaddress=companyaddress;
				//console.log(companyaddress)
				var data={
					latitude:latitude,
					longitude:longitude,
					companyaddress:companyaddress
				}
				console.log(data)
				this.$router.push({name:'map',params:{data:data}});
			},
			//分类返回值
			resfts:function(res){
				console.log(res,"二级分类")
				this.categoryname = res
				this.len = this.categoryname.length;
			},
			change:function(id,shop){
				var data={id:id}	
				if(shop==0){
					$.ajax({
						type:"post",
						url:liupeilin_ip+"/mall/mobile/shop/findShopByTwoId",
						data:data,
						success:function(res){
							console.log(res);										
							_this.data=res.data;
						},
						error:function(res){
						}
					});
				}
					
			},
			Sorting:function(type){
				var id=this.id
				var _this=this
				var order=0
				if(type==0 || type==1 ||type==2){
					order=type;
					var data={
						order:order,
						onecategoryid:id,
						twocategoryid:""
					}
					//商铺排序
					$.ajax({
						type:"post",
						url:liupeilin_ip+"/mall/mobile/shop/shopScreeningOfSorting",
						data:data,
						success:function(res){
							_this.data=$.extend(true,_this.data,res);
						},
						error:function(res){
							
						}
					});
				}
			},
			get_BMap(){
				var _this=this
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r){
					if(this.getStatus() == BMAP_STATUS_SUCCESS){
						var mk = new BMap.Marker(r.point);
						_this.pointlng = r.point.lng
						_this.pointlat = r.point.lat
						ajaxs("post",liupeilin_ip+"/mall/mobile/shop/findShopByCategoryId",{'id':_this.id},_this.resft)
					}else {
	//					alert('failed'+this.getStatus());
					}
				},{enableHighAccuracy: true})
//				console.log(_this.pointlng,9090)
			}
		},
		beforeCreate:function(){
			
		},
		mounted:function(){
//			console.log(this.$route.query.name)
			var _this = this;
			
			this.titleName=this.$route.query.name;	//商品名称
			this.id=this.$route.query.id;	//商品Id;
			//获取分类
			ajaxs("post",liupeilin_ip+"/mall/mobile/shopcategory/findTwoidByOneid",{'id':this.id},this.resfts)
			
			//获取我的经纬度
			this.get_BMap();
			
			mui('.mui-scroll-wrapper').scroll({
				scrollY: true, //是否竖向滚动
				scrollX: false, //是否横向滚动
				startX: 0, //初始化时滚动至x
				startY: 0, //初始化时滚动至y
				indicators: true, //是否显示滚动条
				deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
				bounce: true //是否启用回弹
			});
			
			//添加滚动条结束事件	上方的左右滚动事件
			var scrollTimer
			const timeout = 400;
			var curscroll=0;
			var muiScrollWrapper_w=$('.mui-scroll-wrapper').width();	//区域滚动最外城宽度
			var muiScroll_W=$('.mui-scroll').width();					//区域滚动的宽度
			var muiControlItem_W=$('.mui-control-item').outerWidth();	//a标签的宽度
			
			document.querySelector('.mui-scroll-wrapper').addEventListener('scroll', function(e) {
			  	curscroll = e.detail.x;
			  	clearTimeout(scrollTimer);
  				scrollTimer = setTimeout(handler, timeout);
			});
			function handler(){
//				console.log('滚动结束',curscroll);
				//左边箭头
				if(curscroll==0){
					mui('#shopsList .box_2 .right')[0].classList.add('mui-hidden');
				}else{
					mui('#shopsList .box_2 .right')[0].classList.remove('mui-hidden');
				}
				//右边箭头 +2是为了防止小数点的错误
				if(curscroll<muiScrollWrapper_w-muiScroll_W+2){
					mui('#shopsList .box_2 .left')[0].classList.add('mui-hidden');
				}else{
					mui('#shopsList .box_2 .left')[0].classList.remove('mui-hidden');
				}
			}
			
			
			console.log(this.pointlng,9090)
		},
	}
</script>
<style>
	
	#shopsList{
		background: #ffffff;
		padding: 1px 0px 56px;
		height: 100%;
	}
	
	#shopsList .Loading{
		padding: 0.1rem 0px;
		font-size: 0.28rem;
		color: #757575;
	}
	#shopsList .Loading i{
		margin-right: 10px;
	}
	#shopsList .Loading i:before{
		animation: Loading 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	.cb{
		clear: both;
	}
	#shopsList .box_4 .mui-media-object{
		width: 2.57rem;
		margin-right: 0.35rem;
		/*height: 90px;*/
		height: 1.93rem;
		max-width: none;
	}
	#shopsList .box_4 .mui-media-body .left{
		margin-right: 0.7px;
		overflow: hidden;
	}
	#shopsList .box_4 .mui-media-body .right{
		float: right;
		padding-top: 0.33rem;
	}
	#shopsList .box_4 .mui-media-body .right img{
		display: block;
		width: 0.45rem;
	}
	#shopsList .box_4 .mui-media-body .right img:nth-child(2){
		margin-top: 0.47rem;
	}
	#shopsList .box_4 .mui-media-body .title_1{
		/*font-size: 16px;*/
		font-size: 0.27rem;
		font-weight: bold;
		letter-spacing: 3px;
		margin-bottom: 0.2rem;
	}
	#shopsList .box_4 .mui-media-body i{
		font-size: 0.18rem;
	}
	#shopsList .box_4 .mui-media-body .address_1{
		font-size: 0.18rem;
		color: #404040;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 0.23rem;
	}
	#shopsList .box_4 .mui-media-body .address_1 span{
		margin: 0px 0.05rem;
	}
	#shopsList .box_4 .mui-media-body .address_2{
		font-size: 0.18rem;
		color: #404040;
		margin-bottom: 0.23rem;
	}
	#shopsList .box_4 .mui-media-body .address_2 span:nth-child(1){
		width: 40%;
		display: inline-block;
	}
	#shopsList .box_4 .mui-media-body .address_2 i{
		/*font-size: 14px;*/
		font-size: 0.28rem;
	}
	#shopsList .box_4 .mui-media-body .address_2 .volume{
		font-size: 0.12rem;
	}
	#shopsList .box_4 .mui-media-body .address_2 .volume font{
		color: red;
	}
	#shopsList .box_4 .mui-media-body .Stars{
		color: #404040;
		font-size: 0.18rem;
	}
	#shopsList .box_4 .mui-media-body .Stars i{
		color: #f8a300;
		font-size: 0.18rem;
	}
	#shopsList .box_3{
		padding-right: 10px;
	}
	#shopsList .box_3 select{
		width: 25%;
		float: left;
		-webkit-appearance:menulist-button;
		padding: 0.2rem 0px 0.2rem 0.2rem;
		text-align: center;
		border: none;
	}
	
	#shopsList .box_2{
		height: 1.6rem;
		margin:1.2rem 0px 0px;
		padding: 0px 0.4rem 0px;
		position: relative;
	}
	#shopsList .box_2 .left{
		position: absolute;
		left: 0px;
		top: 0px;
		/*line-height: 80px;*/
		line-height: 1.6rem;
		z-index: 1;
	}
	#shopsList .box_2 .left i,
	#shopsList .box_2 .right i{
		font-weight: bold;
	}
	#shopsList .box_2 .right{
		position: absolute;
		right: 0px;
		top: 0px;
		/*line-height: 80px;*/
		line-height: 1.6rem;
		z-index: 1;
	}
	#shopsList .box_2 .mui-segmented-control.mui-scroll-wrapper{
		height: 100%;
		border-bottom: 1px solid #E0DFE3;
	}
	#shopsList .box_2 .mui-scroll{
		height: 100%;
	}
	#shopsList .box_2 .mui-control-item.mui-active{
		color: #000000;
		border-bottom: none;
	}
	#shopsList .box_2 .mui-control-item{
		/*padding:0px 15px;*/
		padding:0px 0.3rem;
	}
	#shopsList .box_2 .mui-control-item .img{
		background-size:6.2rem auto;
		width: 0.7rem;
		height: 0.7rem;
	}
	#shopsList .box_2 .mui-control-item .img>img{
		width: 100%;
		height: 100%;
	}
	
	
</style>