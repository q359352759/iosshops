<template>
	<div id="map_1">
		<div class="address" v-show="bool">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">地图</h1>
			</header>
			<div class="mui-content">
			    <div id="container"></div>
			</div>
			<nav>
				<a class="tab-item left">
					<span class="icon icon-clock"></span>
					<span @click="map_1">到这里去</span>
				</a>
				<a class="tab-item right">
					<span class="icon icon-phone"></span>
					<span>联系商家</span>
				</a>
			</nav>
		</div>
		<div class="map" v-show="!bool">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="go()"></a>
			    <h1 class="mui-title">地图</h1>
			</header>
			<div class="map_content clear">
				<div id="container"></div>
				<div class="buttons-tab">
					<a class="tab-link button" id="walks" :class="{active:nowindex==1}" @click="nowindex=1,walk()">步行路线</a>
					<a class="tab-link button" id="cats" :class="{active:nowindex==2}" @click="nowindex=2,cat()">驾车路线</a>
					<a class="tab-link button" id="buss" :class="{active:nowindex==3}" @click="nowindex=3,bus()">公交路线</a>
				</div>
				<div class="content-block">
					<div id="tabs">
						<div class="tab-1">
							<div id="panel"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	export default{
		components:{
			
		},
		data:function(){
			return{
				map_x:'104.03345564904',//商铺经度
				map_y:'30.652769786378',//商铺维度
				pointlng:"",			//我的经度
				pointlat:"",				//我的维度
				bool:true,
				nowindex:1,
				address:"",//我的详细地址
				companyaddress:""//店铺详细地址
			}
		},
		methods:{
//			to:function(){
//				this.$router.go(-1);
//			},
			go:function(){
				this.bool=!this.bool
			},
			walk:function(){
				//百度地图步行路线规划
				var map = new BMap.Map("container");
				console.log(map)
				map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat),11);
				var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "panel", autoViewport: true}});
				walking.search(this.address,this.companyaddress);

			},
			map_1:function(){
				this.bool=!this.bool
				//document.getElementById("walks").click();
				//console.log(document.getElementById('cats'))
				var _this = this;
				$(document).ready(function (){
					var walks = $('#walks');
					console.log(walks,8989);
					 walks.click();
					 console.log(walks.click());
					 _this.walk();
				});
				 
				
				 //walks.click();
				 
			},
			cat:function(){
				// 百度地图驾车路线
					//console.log(999)
					var addre = this.address;
					console.log(this.address)
					var map = new BMap.Map("container");
					map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat), 11);			
					var p1 = new BMap.Point(this.pointlng,this.pointlat);
					var p2 = new BMap.Point(this.map_x,this.map_y);			
					var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
					driving.search(p1, p2);	
						// 百度地图
						var map = new BMap.Map("container");
						map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat), 12);				
						var transit = new BMap.DrivingRoute(map, {
							renderOptions: {
								map: map,
								panel: "panel",
								enableDragging : true, //起终点可进行拖拽
								autoViewport: true
							},  
						});
						transit.search(this.address,this.companyaddress);
						
			},
			bus:function(){
					// 百度地图公交路线
					var map = new BMap.Map("container");            // 创建Map实例
					map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat), 12);
					var p1 = new BMap.Point(this.pointlng,this.pointlat);
					var p2 = new BMap.Point(this.map_x,this.map_y);
					var transit = new BMap.TransitRoute(map, {
						renderOptions: {map: map}
					});
					transit.search(p1, p2);
						// 百度地图公交路线结果面板
						var map = new BMap.Map("container");
						map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat), 12);
					
						var transit = new BMap.TransitRoute(map, {
							renderOptions: {map: map, panel: "panel",autoViewport: true}
						});		
						transit.search(this.address,this.companyaddress);

			}
		},
		mounted:function(){
			//获取店铺经纬度
			var _this=this
			this.map_y = this.$route.params.data.latitude;
			this.map_x =  this.$route.params.data.longitude;
			this.companyaddress =  this.$route.params.data.companyaddress;
			
			
			    var map = new BMap.Map("container");
			    var point = new BMap.Point(this.map_x,this.map_y);
			    map.centerAndZoom(point,12);
			
			    var geolocation = new BMap.Geolocation();
			    geolocation.getCurrentPosition(function(r){
			    	console.log(r.point,"大大")
			    	var stati = this.getStatus()
			    	//根据经纬度获取地理位置
			        if(stati == 0){
			        	console.log("看")
			            var mk = new BMap.Marker(r.point);
			            var point = new BMap.Point(r.point.lng,r.point.lat)
			            var gc = new BMap.Geocoder();
			            console.log("看1")
			            gc.getLocation(point, function(rs){  	  
			               var addComp = rs.addressComponents; 
			               
			               _this.address = rs.address;//弹出所在地址
			               console.log(_this.address);//地址信息
			            });
			        }else {
//			            alert('failed'+this.getStatus());
			        }        
			    },{enableHighAccuracy: true})
			
			var geolocation = new BMap.Geolocation();
			  geolocation.getCurrentPosition(function (r){
			  		//console.log(r);
			  })
			//获取我的经纬度
			var _this=this
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					//map.addOverlay(mk);
					//map.panTo(r.point);
					_this.pointlng=r.point.lng
					_this.pointlat=r.point.lat
				}
				else {
//					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
			
//				var map = new BMap.Map("container");
//				console.log(map)
//				map.centerAndZoom(new BMap.Point(this.pointlng,this.pointlat),11);
//				var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "panel", autoViewport: true}});
//				walking.search("成都市", "眉山市");
//				console.log(walking,121231)		
//					// 百度地图API功能	
//			this.walk();
		},
	}
</script>
<style>
	#map_1 #mui-content{
		width:100%;height:90%;
	}
	#map_1 #container{
		height:500px;
		width:100%;
	}
	#container{height:300px;width:100%;}
	#panel,#panel table{width:100%;font-size:12px;}
	#panel,#panel table{width:100%;}
	#container{width:100%;height:300px;}
	#map_1 nav .tab-item{position: fixed;bottom: 0;}
	#map_1 nav .left{left:10%;background-color: #f40;border-bottom-left-radius:0.5rem;border-top-left-radius:0.5rem;}
	#map_1 nav .right{right:10%;background-color:#ff8c3d;border-bottom-right-radius: 0.5rem;border-top-right-radius: 0.5rem;}
	#map_1 nav a{height:1rem;width:40%;background-color:orange;display: inline-block;text-align: center;line-height:1rem;}
	#map_1 nav a span{color:white;}
	
	#map_1 .map{position: absolute;top: 0;left:0;z-index: 3;width:100%;height:100%;}
	
	#map_1 .map .map_content{margin-top:44px;}
	#map_1 .map .map_content .buttons-tab{width:100%;height:1rem;background-color:white;}
	#map_1 .map .map_content .buttons-tab .active{color:orangered;border-bottom:2px solid  orangered;}
	#map_1 .map .map_content .tab-link{width:calc(100% /3);display: block;text-align: center;line-height:1rem;float: left;color:#5f646e;border-bottom: 1px solid #C0C0C0;}
	#map_1 .map .content-block{padding:0 0.75rem;box-sizing: border-box;background-color:white;margin:0.3rem 0 ;}
	#map_1 .sel_n .sel_body_name{height:30px;}
	#map_1 .sel_n1{width:100%;}
</style>


