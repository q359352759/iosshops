<template>
	<div id="Elated">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <!--<h1 class="mui-title">-->
		    	<!--收藏夹-->
		    <div class="box_1">
		    	<div class="mui-segmented-control mui-segmented-control-inverted">
				    <a class="mui-control-item mui-active" href="#Elated_item1">宝贝</a>
				    <a class="mui-control-item" href="#Elated_item2">店铺</a>
				</div>
			</div>
		    <!--</h1>-->
		</header>
		<div class="mui-content">
		    <div id="Elated_item1" class="mui-control-content mui-active">
		    	<div class="no_Elated" v-if="baby_list.count==0">还没有收藏商品</div>
		    	<ul class="box_2">
		    		<li v-for="x in baby_list.list">
		    			<div class="img_1" @click="go(x,0)">
		    				<img v-if="x.imagepath.length>0" :src="x.imagepath[0]"/>
		    				<span v-if="x.imagepath.length==0">暂无图片</span>
		    			</div>
		    			<div class="text_1" @click="go(x,0)">
		    				<div class="title_1">{{x.productname}}</div>
		    				<div class="Price_1">￥{{x.minsaleprice}}</div>
		    			</div>
		    			<i @click="delete_1(x,0)" class="delete_1 mui-icon mui-icon-trash"></i>
		    		</li>
		    	</ul>
		    </div>
			<div id="Elated_item2" class="mui-control-content">
				<div class="no_Elated" v-if="shop_list.count==0">还没有收藏店铺</div>
				<ul class="box_3">
					<li v-for="x in shop_list.list">
						<div @click="go(x,1)">
							<div class="img_box">
								<img :src="x.logo"/>
							</div>
							<div class="title_1">{{x.shopname}}</div>
						</div>
						<div class="delete_1" @click="delete_1(x,1)">
							<i class=" mui-icon mui-icon-trash"></i>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc.js'
	export default{
		data:function(){
			return{
				userId:localStorage.ids ? localStorage.ids : '',	//用户ID
				shop_list:{			//收藏的商铺
					count:0,
					list:[]
				},		
				baby_list:{			//收藏的商品
					count:0,
					list:[]
				},
				show_type:0,		//显示的类型  1店铺 0 商品
			}
		},
		filters:{
			
		},
		methods:{
			go(x,y){
//				console.log(x)
//				return
				if(y==0){
					this.$router.push('/commodity?id='+x.productid);
				}else{
					this.$router.push('/ShopDetails?id='+x.shopid);
				}
			},
			//查询用户收藏夹的信息
			//zlwymaster/mall/mobile/favorites/findfavorites
			findfavorites(x){
				var obj=new Object();
					obj.id=this.userId;
					obj.type=x;		//type 1店铺 0 商品
				http('post','/mall/mobile/favorites/findfavorites',obj,x==0 ? this.Elated_baby : this.Elated_shop)
			},
			Elated_baby(x){
				console.log('收藏的宝贝',x);
				for (var i = 0; i < x.list.length; i++) {
					x.list[i].imagepath=x.list[i].imagepath ? x.list[i].imagepath.split(',') : []
				}
				this.baby_list=x
			},
			Elated_shop(x){
				console.log('喜欢的商铺',x);
				for (var i = 0; i < x.list.length; i++) {
					x.list[i].imagepath=x.list[i].imagepath ? x.list[i].imagepath.split(',') : [];
				}
				this.shop_list=x
			},
			//取消收藏
			delete_1(x,y){
				var this_1=this;
				var obj=new Object();
					obj.mid=this.userId;
					obj.id=y==0 ? x.productid : x.shopid
					obj.type=y		// 1店铺 0商品 
				//用户取消收藏的方法
				mui.confirm('确定删除？','提示',['取消','确定'],function(e){
					if(e.index==1){
						http('post','/mall/mobile/favorites/cancelfavorites',obj,y==0 ? this_1.delete_bady : this_1.delete_shop)
					}
				})
			},
			delete_bady(x){
				console.log('取消了商品',x);
				 this.findfavorites(0);
			},
			delete_shop(x){
				console.log('取消了店铺',x);
				 this.findfavorites(1);
			}
		},
		beforeCreate: function () {
//          console.log('创建前状态');
        },
        created: function () {
//          console.log('创建完毕状态');
            this.findfavorites(1);
            this.findfavorites(0);
            
        },
        beforeMount: function () {
//          console.log('挂载前状态');
        },
        mounted: function () {
//          console.log('挂载结束状态');
            mui("#Elated .box_1>div").on("tap","a",function(e){
            	console.log($(this).index())
            });
        },
        
	}
</script>

<style>
	#Elated .no_Elated{
		padding: 0.2rem;
		color: #535354;
		text-align: center;
	}
	
	#Elated .box_3{
		display: flex;
		flex-wrap: wrap;
		justify-content:space-around;
		padding:0px 0.1rem;
	}
	#Elated .box_3>li{
		width: 50%;
		flex: 50%;
		padding: 0.2rem 0.1rem;
		flex-grow: inherit;
		position: relative;
	}
	#Elated .box_3>li>div{
		background: #FFFFFF;
		height: 100%;
	}
	#Elated .box_3 .img_box{
		height: 3.3rem;
	}
	#Elated .box_3 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#Elated .box_3 .title_1{
		padding: 0.1rem;
		font-size: 0.28rem;
		color: #1F1F1F;
	}
	#Elated .box_3  .delete_1{
		position: absolute;
		right: 10px;
		top: 15px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #F00B0D;
		color: #FFFFFF;
		text-align: center;
		
	}
	#Elated .box_3  .delete_1 i{
		line-height: 20px;
		font-size: 0.34rem;
	}
	
	
	#Elated .box_2>li{
		display: flex;
		background: #FFFFFF;
		margin: 0px 0px 0.2rem 0px;
		padding: 0.2rem;
		position: relative;
	}
	#Elated .box_2 .img_1{
		width: 2.4rem;
		height: 2.4rem;
		flex-shrink: 0;
		background: #EEEEEE;
		margin: 0px 0.15rem 0px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#Elated .box_2 .img_1>span{
		font-size: 20px;
		color: #7b7b7b;
	}
	#Elated .box_2 .img_1>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	#Elated .box_2 .text_1{
		flex-grow: 1;
		position: relative;
		padding: 0px 0px 10px 0px;
	}
	#Elated .box_2 .title_1{
		font-size: 0.28rem;
		color: #3d3f45;
	}
	#Elated .box_2 .Price_1{
		color: #ff5000;
		font-size: 0.36rem;
		position: absolute;
		left: 0px;
		bottom: 0px;
	}
	#Elated .box_2 .delete_1{
		position: absolute;
		right: 12px;
		bottom: 12px;
		font-size: 0.4rem;
		color: #848484;
	}
	
	
	
	#Elated .box_1{
		position: relative;
		height: 100%;
		width:50% ;
		margin: 0px auto;
		font-size: 0.26rem;
	}
	#Elated .box_1 .mui-segmented-control{
		height: 30px;
		border: 1px solid #007aff;
		border-radius: 3px;
	}
	#Elated .box_1 .mui-segmented-control .mui-control-item{
		line-height: 28px;
	}
	#Elated .box_1 .mui-control-item.mui-active{
		border: none;
		color: #FFFFFF;
		background: #007aff;
	}
</style>