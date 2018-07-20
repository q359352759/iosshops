<template>
	<div id="Shopping">
		<!--<header class="mui-bar mui-bar-nav">
		    <h1 class="mui-title">惠众商城</h1>
		</header>-->
		<div class="mui-content">
					<div id="" class="mui-slider" >
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<img src="@/assets/img/shops_3.jpg">
								</a>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<a href="#">
									<img src="@/assets/img/taobao_1.jpg">
								</a>
							</div>
							<div class="mui-slider-item">
								<a href="#">
									<img src="@/assets/img/shops_2.jpg">
								</a>
							</div>
							<div class="mui-slider-item">
								<a href="#">
									<img src="@/assets/img/shops_3.jpg">
								</a>
							</div>
							
							<div class="mui-slider-item">
								<a href="#">
									<img src="@/assets/img/taobao_1.jpg">
								</a>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>
			<div class="fixed" :class="{'active':fixed}">
				<ul class="box_1">
					<li :class="{'active':type_class==1}" @click="type_1(1)">全部宝贝</li>
					<li :class="{'active':type_class==2}" @click="type_1(2)">新品</li>
					<li :class="{'active':type_class==3}" @click="type_1(3)">促销</li>
					<li :class="{'active':type_class==4}" @click="type_1(4,true)" class="classification">
						{{type_obj_3.name ? type_obj_3.name : '分类'}}
					</li>
				</ul>
				<!--3及联动-->
				<div class="box_3">
					<div class="linkage_1" :class="{'active':linkage_show}">
						<ul>
							<li @click="Starting_linkage(index,0,0)" :class="{'active':type_obj_1==x}" v-for="(x,index) in typelist_1">{{x.name}}</li>
						</ul>
						<ul>
							<li @click="Starting_linkage(false,index,0)" :class="{'active':type_obj_2==x}" v-for="(x,index) in typelist_2">{{x.name}}</li>
						</ul>
						<ul>
							<li @click="Starting_linkage(false,false,index,true)" :class="{'active':type_obj_3==x}" v-for="(x,index) in typelist_3">{{x.name}}</li>
						</ul>
					</div>
				</div>
				
				<ul class="box_2">
					<li :class="{'active':sort_1==0}" v-on:click="change_sort(0)">综合</li>
					<li :class="{'active':sort_1==1}" v-on:click="change_sort(1)">销量</li>
					<li :class="{'active':sort_1==2}" v-on:click="change_sort(2)">价格</li>
				</ul>
			</div>
			<div class="fixed_mask" v-show="fixed"></div>
			
			<div class="box_4_list_2">
				<!--<router-link :to="'commodity?id='+x.id+'&salecounts='+x.salecounts" v-for="x in commodity_list">-->
				<a :href="'#/commodity?id='+x.id+'&salecounts='+x.salecounts" v-for="x in commodity_list">
					<div class="img_box">
						<img v-if="x.imagepath.length>0" :src="x.imagepath[0]"/>
						<span v-if="x.imagepath.length==0">暂无图片</span>
					</div>
					<div class="text_1">
						<div class="title_1">{{x.productname}}</div>
						<div>
							<span class="Label_1 mui-pull-left">包邮</span>
							<span class="address_1 mui-pull-right">官方直营</span>
							<div class="mui-clearfix"></div>
						</div>
						<div class="Price_1">
							<!--<i class="icon iconfont icon-renminbi1688"></i>-->
							<span>￥{{x.minsaleprice}}</span>
							<s class="">
								<!--<i class="icon iconfont icon-renminbi1688"></i>98-->
								￥{{x.marketprice}}
							</s>
							<font class="mui-pull-right">
								<b class="Sale_1">销</b>{{x.salecounts}}
							</font>
						</div>
					</div>
				</a>
				<!--</router-link>-->
			</div>
			
		</div>
	</div>
</template>

<script>
	import {http,base64_splicing} from '@/assets/fc'
	export default{
		components:{
		},
		data:function(){
			return{
				fixed:false,			//是否定位
				linkage_show:false,		//分类是否显示
				type_class:1,			//分类类型	全部宝贝 新品 促销 分类
				createMask:'',			//遮罩层
				typelist_1:[],			//分类1级别
				typelist_2:[],			//分类2级
				typelist_3:[],			//分类3级
				type_obj_1:{},				//类型1
				type_obj_2:{},				//类型2
				type_obj_3:{},				//类型3
				sort_1:0,				//排序条件 0:综合 1:销售 2:价格
				commodity_list:[],		//商品清单
				first:true
			}
		},
		methods:{
			type_1(x,y){
				this.type_class=x;
				if(x==1){
					this.findselfSupporting();		//查询平台自营商品
					this.type_obj_3={};
				}else if(x==2){
					this.findNewProduct();			//查询平台自营新品
				}
				if(y){
					this.createMask.show();
					this.linkage_show=true
				}else{
					this.createMask.close();
					this.linkage_show=false
				}
			},
			//排序类型
			change_sort(x){
				this.sort_1=x;
				this.findselfSupporting();
			},
			//整理数据
			Starting_linkage(x,y,z,l){
				if(x!==false){
					this.type_obj_1=this.typelist_1[x]
					this.typelist_2=this.type_obj_1.child;
				}
				if(y!==false){
					this.type_obj_2=this.typelist_2[y]
					this.typelist_3=this.type_obj_2.child;
				}
				if(z!==false){
					this.type_obj_3=this.typelist_3[z];
				}
				if(l){
					this.createMask.close();
					this.linkage_show=false;
				}
				if(!this.first){
					this.findProductByCategory();
				}else{
					this.first=false
				}
			},
			//查询平台自营商品
			//提交参数 type : 排序条件 0:综合 1:销售 2:价格
			findselfSupporting(){
				http('get','/mall/mobile/product/findselfSupporting',{'type':this.sort_1,'size':100},this.findProduct_return)
			},
			findProduct_return(x){
				for(var i=0;i<x.length;i++){
					x[i].imagepath=x[i].imagepath=='' ? [] : x[i].imagepath.split(',')
				}
				this.commodity_list=x
				console.log('商品返回值',x)
			},
			//查询平台自营新品
			//1.	http://localhost:8080/zlwymaster/mall/mobile/product/findNewProduct
			findNewProduct(){
				http('get','/mall/mobile/product/findNewProduct','',this.findProduct_return);
			},
			//根据商品分类查询自营商品
			findProductByCategory(){
				console.log(this.type_obj_3)
				http('post','/mall/mobile/product/findProductByCategory',{'id':this.type_obj_3.id},this.findProduct_return);
			}
			
		},
		mounted:function(){
			var this_1=this;
			
			//查询平台自营商品
		 	this.findselfSupporting();
			
			//商品分类数据
			http('get','/mall/mobile/productCategory','',productCategory);
			function productCategory(x){
				console.log('分类',x)
				this_1.typelist_1=x.data;
				this_1.Starting_linkage(0,0,false);
			}
			
			var fixed_top=$('#Shopping .fixed').offset().top;
			$('#Shopping').scroll(function(){
				var wt=$(this).scrollTop();
//				console.log(wt)
				if(wt>fixed_top){
//					console.log('定位');
					this_1.fixed=true
				}else{
//					console.log('取消定位');
					this_1.fixed=false
				}
				
			})
			
			this.createMask = mui.createMask(function(){
				this_1.linkage_show=false
			});//callback为用户点击蒙版时自动执行的回调；
//			mask.show();//显示遮罩

			
			mui('#Shopping .mui-slider').slider({
				swipeBack:true, //启用右滑关闭功能
//			  	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			
			
		},
		created:function(){

		}
	}
</script>

<style>
	
	#Shopping .fixed_mask{
		height: 77px;
	}
	#Shopping .fixed{
		position: relative;
		z-index: 999;
	}
	#Shopping .fixed.active{
		position: fixed;
		width: 100%;
		top: 0px;
	}
	#Shopping{
		padding: 0px 0px 60px 0px;
		height: 100%;
		overflow: auto;
	}
	
	#Shopping .box_3{
		position: relative;
	}
	#Shopping .box_3 .linkage_1{
		position: absolute;
		width: 100%;
		background: #FFFFFF;
		z-index: 1;
		display: flex;
		height: 0px;
		-webkit-transition: all 1s;
		-moz-transition: all 1s;
		-ms-transition: all 1s;
		-o-transition: all 1s;
		transition: all 1s;
	}
	#Shopping .box_3 .linkage_1.active{
		height:400px;
	}
	#Shopping .box_3 .linkage_1>ul{
		width: calc(100% / 3);
		overflow: auto;
	}
	#Shopping .box_3 .linkage_1>ul:nth-child(1){
		background: #e4e4e4;
	}
	#Shopping .box_3 .linkage_1>ul:nth-child(2){
		background: #f5f5f5;
	}
	#Shopping .box_3 .linkage_1>ul:nth-child(1) li.active{
		background: #FFFFFF;
	}
	#Shopping .box_3 .linkage_1>ul:nth-child(2) li.active{
		background: #FFFFFF;
	}
	#Shopping .box_3 .linkage_1>ul:nth-child(3) li.active{
		color: red;
	}
	#Shopping .box_3 .linkage_1>ul li{
		padding: 0.1rem 0.2rem;
		font-size: 0.28rem;
		border-bottom: 1px solid #EEEEEE;
	}
	
	
	/*#Shopping .box_2{
		padding: 0px 5px;
		background: #FFFFFF;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
	}*/
	#Shopping .box_4_list_2{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 5px;
	}
	#Shopping .box_4_list_2 a{
		width: 50%;
		display: block;
		padding: 5px;
		color: #000000;
	}
	#Shopping .box_4_list_2 a .text_1{
		background: #FFFFFF;
		padding:5px;
		border-top: 1px solid #CCCCCC;
	}
	#Shopping .box_4_list_2 .img_box{
		height: 3.2rem;
		background: #e4e4e4;
		display: flex;
		justify-content: center;
	    align-items: center;
	    color: #797979;
	    font-size: 25px;
	}
	#Shopping .box_4_list_2 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#Shopping .box_4_list_2 .title_1{
		padding: 0px 0px 5px;
		font-size: 0.28rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#Shopping .box_4_list_2 .Label_1{
		display: inline-block;
		padding: 0px 3px;
		color: red;
		border: 1px solid red;
		font-size: 0.24rem;
		height: 0.34rem;
		line-height: 0.34rem;
		border-radius: 0.26rem;
	}
	#Shopping .box_4_list_2 .address_1{		
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
	#Shopping .box_4_list_2 .Price_1{
		font-size: 0.24rem;
		margin: 5px 0px 0px;
		color: #DA580C;
	}
	#Shopping .box_4_list_2 .Price_1 span{
		font-size: 0.3rem;
	}
	#Shopping .box_4_list_2 .Price_1 s,
	#Shopping .box_4_list_2 .Price_1 font{
		color: #9F9F9F;
	}
	#Shopping .box_4_list_2 .Price_1 .Sale_1{
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
	
	
	
	#Shopping .box_1,
	#Shopping .box_2{
		padding: 0px 5px;
		background: #FFFFFF;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		font-size: 0.26rem;
	}
	#Shopping .box_2 li{
		padding: 10px 0px;
		width: 33.3%;
		text-align: center;
		position: relative;
	}
	#Shopping .box_2 li.active{
		color: #DE4606;
	}
	
	
	
	#Shopping .box_1{
		border-bottom: 3px solid #efeff4;
	}
	#Shopping .box_1 li{
		padding: 10px 0px;
		/*width: 25%;*/
		text-align: center;
		position: relative;
		white-space: nowrap;
		flex-grow: 1;
	}
	#Shopping .box_1 li.active:after{
		content: '';
		position: absolute;
		width: 100%;
		height: 3px;
		background: #FF3B00;
		bottom: 0px;
		left: 0px;
/*		box-shadow: 0px 0px 0px 0px #FF3B00;*/
	}
	
	#Shopping .mui-slider-item img{
		height: 2.44rem;
		width: 100%;
		object-fit: cover;
	}
	
</style>