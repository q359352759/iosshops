<template>
	<div id="orderComment">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">评论</h1>
		</header>
		<div class="mui-content">
		    <ul class="box_1">
		    	<li v-for="x in products">
		    		<div class="shop">
			    		<div class="img_box">
			    			<img :src="x.imagepath"/>
			    		</div>
			    		<div class="text_1">{{x.productname}}</div>
		    		</div>
		    		<div class="evaluate">
		    			<div class="xingxing">
		    				宝贝评分：
		    				<i @click="products_score(x,y)" v-for="y in score_list" :class="{'icon iconfont icon-xingxing active':x.score>=y,'icon iconfont icon-star':x.score<y}" class=""></i>
		    			</div>
		    			<textarea v-model="x.evaluationContent" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧"></textarea>
		    		</div>
		    	</li>
		    </ul>
		    
		    <div class="box_2" v-show="products.length>0">
		    	<header>
		    		<i class="icon iconfont icon-dianpu"></i>
		    		店铺评分
		    	</header>
		    	<div>
		    		店铺评分
		    		<span>
						<i @click="change_score('shop_score',x)" v-for="x in score_list" :class="{'icon iconfont icon-xingxing active':shop_score>=x,'icon iconfont icon-star':shop_score<x}" class=""></i>
		    		</span>
		    	</div>
		    	<div>
		    		物流服务
		    		<span>
		    			<i @click="change_score('logistics_score',x)" v-for="x in score_list" :class="{'icon iconfont icon-xingxing active':logistics_score>=x,'icon iconfont icon-star':logistics_score<x}" class=""></i>
		    		</span>
		    	</div>
		    	<div class="anonymous">
		    				<span @click="change_isAnonymity()" class="circular" :class="{'active':isAnonymity==1}">
		    					<i class="mui-icon mui-icon-checkmarkempty"  ></i>
		    				</span>
		    				<span>匿名提交</span>
		    				<span class="mui-pull-right">你的评价能帮助其他小伙伴哟</span>
		    	</div>
		    </div>
		    
		    <div class="box_3" v-show="products.length>0">
		    	<!--<button>取消</button>-->
		    	<button @click="Submission()">提交</button>
		    </div>
		    
		    <div style="padding: 0.2rem;" class="mui-text-center">没有找到相关信息</div>
		</div>
	</div>
</template>

<script>	
	import {http} from '@/assets/fc';
	export default{
		components:{},
		data(){
			const getId=()=>{
				return this.$route.query.id;
			};
			return{
				userId:localStorage.ids,
				OrderId:getId(),
				score_list:[0,1,2,3,4],		//
				shop_score:4,				//店铺评分
				logistics_score:4,			//物流评分
				products:[],				//产品列表
				order:{},					//订单信息
				isAnonymity:0,				//是否匿名 0表示不是1表示是
			}
		},
		methods:{
			//提交
			Submission(){
				var this_1=this;
				var products=this.products;
				var arr=[];
				for(var i=0;i<products.length;i++){
					var obj={};
						obj.shopId=products[i].shopid;
						obj.productId=products[i].id
						obj.memberId=this_1.userId;
						obj.evaluationContent=products[i].evaluationContent ? products[i].evaluationContent : '';
						obj.evaluationPhoto='';
						obj.answerAescription=products[i].score;		//商品评价
						obj.logisticsService=this_1.logistics_score;
						obj.serviceAttitude=this_1.shop_score;
						obj.isAnonymity=this_1.isAnonymity;
						obj.orderid=products[i].orderid
					arr.push(obj)
				}
				console.log(arr);
				http('post','/mall/mobile/order/orderEvaluat',{'data':JSON.stringify(arr)},this.orderEvaluat)
			},
			orderEvaluat(x){
				console.log(x);
				if(x){
					mui.toast('评论成功',{ duration:2000, type:'div' })
					this.$router.go(-1)
				}else{
					mui.toast('评论失败',{ duration:2000, type:'div' })
				}
			},
			//是否匿名
			change_isAnonymity(){
				this.isAnonymity=this.isAnonymity==0 ? 1:0;
			},
			//商品评分
			products_score(x,y){
				x.score=y
			},
			//改变店铺评分
			change_score(x,y){
				this[x]=y
			},
			//根据订单id查询订单的方法
			findOrderById(){
//				http('post','/mall/mobile/order/findOrderById',{'id':this.OrderId},this.findOrderById_return)
				http('post','/mall/mobile/order/findOrderById',{'id':'201805231447273906115'},this.findOrderById_return)
				
			},
			findOrderById_return(x){
				console.log('查询订单',x);
				for(var i=0;i<x.products.length;i++){
					x.products[i].score=4
				}
				this.products=x.products;
				this.order=x.order;
			}
		},
		mounted:function(){
			console.log(this.$route)
//			console.log(this.OrderId)
			this.findOrderById();
			
			
		},
		created:function(){
		 	
		}
	}
</script>

<style>
	#orderComment .box_3{
		padding: 0.2rem 0.4rem;
	}
	#orderComment .box_3>button{
		width: 100%;
		background: #1751d8;
		color: #FFFFFF;
		border-radius: 30px;
	}
	
	
	
	#orderComment .box_2{
		background: #FFFFFF;
		padding:0px 0.2rem;
	}
	#orderComment .box_2>header{
		padding: 0.2rem 0px;
		border-bottom: 1px solid #CCCBCB;
		font-size: 0.28rem;
		margin: 0px 0px 0.2rem;
	}
	#orderComment .box_2>div{
		padding: 0px 0px 0.2rem;
		font-size: 0.26rem;
	}
	#orderComment .box_2 i.active{
		color: #ff5000;
	}
	
	#orderComment .box_1>li{
		background: #FFFFFF;
		margin: 0px 0px 0.2rem 0px;
		padding: 0.2rem;
	}
	#orderComment .box_1 .shop{
		display: flex;
		padding: 0px 0px 5px 0px;
		border-bottom: 1px solid #CCCBCB;
	}
	#orderComment .box_1 .img_box{
		width: 1.4rem ;
		height: 1.4rem;
		border: 1px solid #c0c0c0;
		padding: 4px;
		flex-shrink: 0;
		margin: 0px 0.2rem 0px 0px;
	}
	#orderComment .box_1 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#orderComment .box_1 .text_1{
		font-size: 0.28rem;
		color: #2e3235;
	}
	#orderComment .box_1 .xingxing{
		padding: 0.2rem 0px;
		font-size: 0.26rem;
		color: #2e3235;
		border-bottom: 1px solid #c0c0c0;
	}
	#orderComment .box_1 .xingxing>i.active{
		color:#ff5000;
	}
	#orderComment .box_1 textarea{
		padding: 0px;
		border: none;
		margin: 0.2rem 0px 0px;
		font-size: 0.26rem;
		min-height: 1.4rem;
		/*border-bottom: 1px solid #c0c0c0;*/
	}
	#orderComment .box_2 .anonymous{
		font-size: 0.26rem;
		line-height: 32px;
		border-top: 1px solid #CCCCCC;
		padding: 0.2rem;
	}
	#orderComment .box_2 .circular{
		width: 22px;
		height: 22px;
		display: inline-block;
		border-radius: 100%;
		border:1px solid #c0c0c0;
		text-align: center;
		line-height: 22px;
	}
	#orderComment .box_2 .circular i{
		font-size: 20px;
	}
	#orderComment .box_2 .circular.active{
		background: #ff5302;
		color: #FFFFFF;
		border: 1px solid #ff5302;
	}
	
	
</style>