<template>
	<div id="ShopDetails">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">商家详情页</h1>
		    <a class="icon iconfont icon-qr-code mui-pull-right QR_Code" @click="QR_Code()"></a>
		</header>
		<div class="mui-content" v-on:scroll="scroll_1()">
		
			<div class="box_2">
				<div class="right_1 mui-pull-right">去领取<i class="mui-icon mui-icon-arrowright"></i></div>
				<div class="center_1">你有<span>100</span>元新人红包待领取</div>
			</div>
		
			<div class="box_3">
				<ul class="shop">
					<li class="mui-pull-left" >
						<img @click="show_mask(1)" v-if="shop_info.photo" :src="shop_info.photo[0]">
						<img v-if="!shop_info.photo" :src="shop_info.shop.mainlogo"/>
						<div v-if="shop_info.photo" class="title_1">共{{shop_info.photo ? shop_info.photo.length : 0}}张</div>
					</li>
					<li class="">
						<div class="right_1 mui-pull-right mui-text-center">
				            <div>分润 </div>
				            <div>{{shop_info.shop.contractratio}}%</div>
				        </div>
				        <div class="left_1">
				           	<div class="title_1">{{shop_info.shop.shopname}}</div>
				            <div class="title_2"><span>测试地方特色小吃点</span><span>人均17元</span></div>	
				           	<div class="operation_1">
				           		<span @click="change_Favorites()"><i class="mui-icon mui-icon-plusempty"></i>{{Favorites ? '取消收藏' : '收藏'}}</span>
				           		<a v-if="shop_info.shop.companyphone" :href="'#/bill?amp;Inviterid='+shop_info.shop.id+'&type=2'">付款</a>
				           	</div>
				         </div>
					</li>
					<li class="mui-clearfix"></li>
				</ul>
				<div class="address_1">
					<a v-if="shop_info.shop.companyphone" class="Telephone mui-pull-right" :href="'tel:'+shop_info.shop.companyphone">
						<div><i class="mui-icon mui-icon-phone"></i></div>
						电话
					</a>
					<div class="address_2">
						<i class="mui-icon mui-icon-location"></i>{{shop_info.shop.companyaddress}}
					</div>
					<div class="titme_1">
						营业时间：
						<span v-if="shop_info.shop.starttime || shop_info.shop.closingtime">{{shop_info.shop.starttime}}~{{shop_info.shop.closingtime}}</span>
						<span v-if="!shop_info.shop.starttime && !shop_info.shop.closingtime">商家暂未设定</span>
					</div>
				</div>
			</div>
		
			<div class="Recommend" v-show="Recommend_list.length!=0">
				<header>
					<!--<a class="mui-icon mui-icon-arrowright mui-pull-right"></a>-->
					<i class="mui-icon mui-icon-image"></i>
					推荐单品（{{Broadcast_img.length}}）
				</header>
				
				<div class="swiper_1 swiper-container">
				    <div class="swiper-wrapper">
				      	
				    </div>
			  	</div>
			  	
			</div>
		
			<ul class="evaluate">
				<li class="mui-pull-left">
					<div>客户评价：{{evaluate.count}}</div>
					<div>满意度</div>
					<div class="Number">{{evaluate.count==0 ? 100 : (evaluate.chaozan+evaluate.manyi)/evaluate.count*100}}%</div>
					<span>根据用户评分计算</span>
				</li>
				<li class="mui-pull-left">
					<div class="ProgressBar">
						<div>超赞</div>
						<div><div :style="'width:'+(evaluate.count==0 ? 0 : evaluate.chaozan/evaluate.count*100)+'%'"></div></div>
						<div>{{evaluate.chaozan>999 ? '999+' : evaluate.chaozan}}</div>
					</div>
					<div class="ProgressBar">
						<div>满意</div>
						<div><div :style="'width:'+(evaluate.count==0 ? 0 : evaluate.manyi/evaluate.count*100)+'%'"></div></div>
						<div>{{evaluate.manyi>999 ? '999+' : evaluate.manyi}}</div>
					</div>
					<div class="ProgressBar">
						<div>一般</div>
						<div><div :style="'width:'+(evaluate.count==0 ? 0 : evaluate.yiban/evaluate.count*100)+'%'"></div></div>
						<div>{{evaluate.yiban>999 ? '999+' : evaluate.yiban}}</div>
					</div>
					<div class="ProgressBar">
						<div>不满</div>
						<div><div :style="'width:'+(evaluate.count==0 ? 0 : evaluate.buman/evaluate.count*100)+'%'"></div></div>
						<div>{{evaluate.buman>999 ? '999+' : evaluate.buman}}</div>
					</div>
				</li>
				<li class="mui-clearfix"></li>
			</ul>
		
			<ul class="comment">
				<li class="header_1">评论</li>
				<li class="Prompt_1" v-if="comment_list.length==0">暂无评论</li>
				<li v-for="x in comment_list">
					<img class="mui-pull-left user_HeadPortrait" :src="x.memberPhoto"/>
					<div>
						<header>{{x.membername | anonymous}}</header>
						<div class="level"><i class="mui-icon mui-icon-info"></i>{{comment_type[x.answeraescription]}}</div>
						<div class="text">{{x.evaluationcontent}}</div>
						<div class="img_list">
							<div v-for="y in x.evaluationphoto"><img :src="y"/></div>
						</div>
					</div>
				</li>
			</ul>
			<!--<div class="mui-text-center" v-show="pageIndex>=pagesize">——我是有底线的——</div>-->
			<div class="mui-text-center Loading" v-show="loading">
				<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
			</div>
		</div>
		
		
		<div class="img_mask">
			<div class="mask" @click="show_mask(0)"></div>
			<div class="swiper-container_box">
				<div class="swiper_2 swiper-container">
				    <div class="swiper-wrapper">
				      	<!--<div class="swiper-slide">
				      		<a href="javascrupt:;" class="swiper_box_1">
				      			<img src="" id="imgView"/>
								<span>力推</span>
								<div>招牌花蹄</div>
				      		</a>
				      	</div>-->
				    </div>
			  	</div>
			</div>
		</div>
		
		<div class="QR_Code_mask" v-show="QR_Code_mask">
			<img :src="QR_Code_url"/>
		</div>
		
	</div>
</template>

<script>
	//mui时间插件
	import '@/assets/mui/css/mui.picker.css';
	import '@/assets/mui/js/mui.picker';
	import {http} from '@/assets/fc';
	export default{
		data:function(){
			return{
				url1:require( "../assets/img/homegreen.jpg"), //上面的url1访问不到data里面的数据require
				url2:"img/ic_tab_home_normal.png",
				setect:'Home',
				shopId:1,				//这个1是测试的 下面有给予赋值
				shop_info:{				//商家基本信息
					'photo':[],			//轮播图片
					'shop':{}			//
				},
				Broadcast_img:[],		//推荐单品轮播
				evaluate:{},			//用户评价
				pageIndex:1,			//评论页码
				pagesize:0,				//最大页数
				comment_list:[],		//评论列表
				comment_type:['非常差','差','一般','好','非常好'],
				loading:false,
				swiper_1:'',	//弹出框轮播
				userId:localStorage.ids ? localStorage.ids : '',	//用户ID
				Favorites:false,		//是否被收藏
				Recommend_list:[],		//推荐单品
				QR_Code_url:'',			//二维码
				QR_Code_mask:false,		//显示
				mask:{},				//遮罩层
			}
		},
		filters:{
			anonymous(x){
				return '**'+x.substring(1,x.length)
			},
		},
		methods:{
			//获取二维码
			QR_Code(){
				var obj=new Object();
					obj.id=this.shopId;
					obj.fixurl='http://m.hzjifen.com/shops/dist/index.html#/bill?type=2&Inviterid='+this.shopId;
					obj.type=2;		//0合伙人,1区域代理,2商家4,个人
//				http('post','/agent/manager/area/getSellerEncode',obj,this.getSellerEncode_return)
				http('get','/agent/manager/area/index',obj,this.getSellerEncode_return)
			},
			getSellerEncode_return(x){
				console.log('获取二维码',x);
				this.QR_Code_url=x.data.url
				this.QR_Code_mask=true;
				this.mask.show();//显示遮罩
			},
//			getvalue:function(n){
//				this.setect=n
//			},
			//显示弹出框
			show_mask:function(x){
				var this_1=this;
				if(x==0){
					$('#ShopDetails .img_mask').fadeOut(100)
				}else if(x==1){
					$('#ShopDetails .img_mask').fadeIn(100,function(){
						var list=[];
						var x=this_1.shop_info.photo;
						for(var i=0;i<x.length;i++){
							var a='<div class="swiper-slide">'+
										'<a href="javascrupt:;" class="swiper_box_1">'+
						      				'<img src="'+x[i]+'"/>'+
			//								'<span>力推</span>'+
			//								'<div>'+x[i].productname+'</div>'+
						      			'</a>'+
						      		'</div>'
						    list.push(a)
						};
						
						this_1.swiper_1.virtual.cache=[];
			    		this_1.swiper_1.virtual.slides=list
			    		
						this_1.swiper_1.virtual.update();
						this_1.swiper_1.init();
						this_1.swiper_1.slideTo(0,0);							
					})
				}
			},
			//根据店铺id查询用户评论
			findEvaluat(){
				http('post','/mall/mobile/evaluat/findEvaluat',{'id':this.shopId,'number':this.pageIndex},this.findEvaluat_return)
			},
			findEvaluat_return(x){
				for(var i=0;i<x.list.length;i++){
					x.list[i].evaluationphoto=x.list[i].evaluationphoto.split(',')
				}
				console.log('根据店铺id查询用户评论',x);
				this.comment_list=this.comment_list.concat(x.list);
				this.pagesize=x.pagesize;
				this.loading=false;
			},
			//改变收藏状态
			change_Favorites(){
					var obj=new Object();
						obj.mid=this.userId;
						obj.id=this.shopId;
						obj.type=1		// 1店铺 0商品 
				if(!this.Favorites){
					//添加到收藏的方法
					http('post','/mall/mobile/favorites/addFav',obj,this.change_Favorites_return)
				}else{
					console.log('用户取消收藏的方法')
					//用户取消收藏的方法
					http('post','/mall/mobile/favorites/cancelfavorites',obj,this.change_Favorites_return)
				}
				this.Favorites=!this.Favorites
			},
			change_Favorites_return(x){
				console.log(x)
//				mui.toast(x ? '设置成功':'设置失败',{ duration:2000, type:'div' })
			},
			scroll_1(){
				var nDivHight = $('#ShopDetails .mui-content').outerHeight();
				var nScrollHight = $('#ShopDetails .mui-content')[0].scrollHeight;
     			var nScrollTop = $('#ShopDetails .mui-content')[0].scrollTop;
     			if(nScrollTop + nDivHight >= nScrollHight){
//					console.log('到达底部')
					if(!this.loading && this.pageIndex<this.pagesize){
						this.pageIndex++;
						this.loading=true;
						this.findEvaluat();
					}
				}
			}
		},
		mounted:function(){
			
			var this_1=this;
			this.shopId=this.$route.query.id;
			
			this.mask = mui.createMask(function(){
				this_1.QR_Code_mask=false;
			});//callback为用户点击蒙版时自动执行的回调；
//			mask.show();//显示遮罩
//			mask.close();//关闭遮罩
			
			//查询商家基本信息
			http('post','/mall/mobile/shop/showShop',{'id':this.shopId},showShop_return)
			function showShop_return(x){
				console.log('查询商家基本信息',x);
				this_1.shop_info=x
			}
			
			//根据店铺id查询用户评价
			http('post','/mall/mobile/evaluat/findEvaluatIndex',{'id':this.shopId},findEvaluatIndex_return)
			function findEvaluatIndex_return(x){
				console.log('根据店铺id查询用户评价',x)
				this_1.evaluate=x;
			}
			//根据店铺id查询用户评价
			this.findEvaluat()
			
			//判断商品或店铺是否被当前登录用户收藏
				var obj={
						mid:this.userId,
						id:this.shopId,
						type:1		// 1店铺 0 商品 
					}
			http('post','/mall/mobile/favorites/isFavorites',obj,isFavorites_return)
			function isFavorites_return(x){
				console.log('是否被收藏',x);
				this_1.Favorites=x;
			}
			
			
			//推荐单品
			var swiper = new Swiper('#ShopDetails .swiper_1', {
	//				initialSlide:0,	//初始化显示第几个
//					loop : true,	//循环
			      	slidesPerView :4,
			      	spaceBetween : 6, //间距
			    	autoplay:true,
			    	init: false,
			    	virtual:true,
			    });
			//根据店铺id查询推荐单品
			http('post','/mall/mobile/product/findRecommendProduct',{'id':this_1.shopId},findRecommendProduct_return)
			function findRecommendProduct_return(x){
				console.log('店铺id查询推荐单品',x);
				for(var i=0;i<x.length;i++){
					x[i].imagepath_1=x[i].imagepath=='' ? '' : x[i].imagepath.split(',')[0];
				}
				
				this_1.Broadcast_img=x;
				tp(x)
			}
			function tp(x){
				this_1.Recommend_list=x
				var list=[];
				for(var j=0;j<3;j++){
					for(var i=0;i<x.length;i++){
						var html='<a href="javascrupt:;" index="'+i+'" class="swiper_box">'+
				      				'<img src="'+x[i].imagepath_1+'"/>'+
									'<span>力推</span>'+
									'<div>'+x[i].productname+'</div>'+
				      			'</a>';
				      	list.push(html)
					}
				}
				setTimeout(function(){
					swiper.virtual.cache=[];
				    swiper.virtual.slides=list
				    swiper.init();
				},200)
			};
			
			//弹出框
			this.swiper_1 = new Swiper('.swiper_2', {
						      	slidesPerView:2,
								speed:10,
								effect: 'coverflow',
							    grabCursor: true,
							    coverflowEffect: {
							        rotate: 0,
							        stretch: 130,
				//			        depth: 200,
							        modifier: 1,
							        slideShadows : true,
							    },
							    centeredSlides: true,
							    
							    cache:false,
							    init: false,
			    				virtual:true,
						    })
			
			//点击推荐单品
			$('#ShopDetails .swiper_1').on('click','.swiper_box',function(){
				var index=$(this).attr('index')
				$('#ShopDetails .img_mask').fadeIn(100,function(){
						var list=[];
						var x=this_1.Broadcast_img;
						for(var i=0;i<x.length;i++){
							var a='<div class="swiper-slide">'+
										'<a href="javascrupt:;" class="swiper_box_1">'+
						      				'<img src="'+x[i].imagepath_1+'"/>'+
											'<span>力推</span>'+
											'<div>'+x[i].productname+'</div>'+
						      			'</a>'+
						      		'</div>'
							list.push(a)
						}
						this_1.swiper_1.virtual.cache=[];
			    		this_1.swiper_1.virtual.slides=list
			    		this_1.swiper_1.virtual.update();
						this_1.swiper_1.init();
						this_1.swiper_1.slideTo(index,0);
					})
			})

	
			
		},
		watch:{
		}
	}	
</script>

<style>
	.cb{
		clear: both;
	}
	#ShopDetails{
		/*padding: 44px 0px 60px 0px;*/
		/*padding: 0.88rem 0px 60px 0px;*/
		height: 100%;
	}
	
	#ShopDetails .Loading{
		padding: 0.1rem 0px;
	}
	#ShopDetails .Loading i{
		margin-right: 10px;
	}
	#ShopDetails .Loading i:before{
		animation: Loading 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	
	#ShopDetails .QR_Code_mask{
		height: 8rem;
    	width: 6rem;
    	position: fixed;
    	top: 0px;
    	left: 0px;
    	bottom: 0px;
    	right: 0px;
    	margin: auto;
    	z-index: 999;
    	text-align: center;
	}
	#ShopDetails .QR_Code_mask>img{
		max-width: 100%;
		max-height: 100%;
	}
	#ShopDetails .mui-content{
		height: 100%;
		overflow: auto;
		padding-bottom: 70px;
	}
	
	#ShopDetails .QR_Code{
		font-size: 0.36rem;
		margin:12px 12px 0px 0px;
	}
	
	#ShopDetails .img_mask{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		z-index: 10;
		display: none;
	}
	#ShopDetails .img_mask .mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	#ShopDetails .img_mask .swiper_2{
		position: absolute;
		width: 100%;
		height:200px;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
	#ShopDetails .img_mask .swiper_box_1{
		/*height: 4rem;*/
		height: 100%;
		display: block;
	}

	
	
	/*评论*/
	#ShopDetails .comment{
		background: #FFFFFF;
		padding:0px 0.3rem 0.3rem;
	}
	#ShopDetails .comment .header_1{
		padding: 0.3rem 0px;
		border-bottom: 1px solid #CCCCCC;
		font-size: 0.32rem;
		font-weight: bold;
	}
	#ShopDetails .comment .Prompt_1{
		text-align: center;
		color: #8e8585;
		font-size: 0.26rem;
		margin-bottom: 0px;
	}
	#ShopDetails .comment .user_HeadPortrait{
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
	}
	#ShopDetails .comment>li{
		margin-bottom: 0.2rem;
	}
	#ShopDetails .comment>li>div{
		padding: 0px 0px 0px 1.2rem;
	}
	#ShopDetails .comment>li>div>header{
		font-size: 0.24rem;
		color: #858585;
		margin-bottom: 0.1rem;
	}
	#ShopDetails .comment .level{
		display: inline-block;
		background: #fce994;
		padding: 0px 3px;
		margin-bottom: 5px;
		border-bottom-left-radius: 0.48rem;
		border-top-left-radius: 0.48rem;
		font-size: 0.24rem;
	}
	#ShopDetails .comment .level i{
		color: #ffbf4b;
		font-size: 0.36rem;
	}
	#ShopDetails .comment .text{
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
		font-size: 12px;
	}
	
	#ShopDetails .comment .img_list{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	
	#ShopDetails .comment .img_list>div{
		width: 30%;
		height: 1.5rem;
		padding: 0.1rem;
	}
	#ShopDetails .comment .img_list>div>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	
	
	
	/*评价*/
	#ShopDetails .evaluate{
		margin: 0.2rem 0px;
		background: #FFFFFF;
		padding: 0.3rem 0px;
	}
	#ShopDetails .evaluate>li:nth-child(1){
		width: 40%;
		border-right: 1px solid #ebebeb;
		text-align: center;
		font-size: 0.24rem;
	}
	#ShopDetails .evaluate>li:nth-child(1)>div{
		margin-bottom: 0.1rem;
	}
	#ShopDetails .evaluate>li:nth-child(1) .Number{
		color: #f85d6b;
		font-size: 0.4rem;
	}
	#ShopDetails .evaluate>li:nth-child(1) span{
		color: #8e8e8e;
	}
	#ShopDetails .evaluate>li:nth-child(2){
		width: 60%;
		padding:0px 0px 0px 10px ;
	}
	#ShopDetails .evaluate>li:nth-child(2) .ProgressBar{
		display: flex;
		margin-bottom: 5px;
	}
	#ShopDetails .evaluate>li:nth-child(2) .ProgressBar>div:nth-child(1){
		width: 20%;
		font-size: 0.24rem;
	}
	#ShopDetails .evaluate>li:nth-child(2) .ProgressBar>div:nth-child(2){
		width: 60%;
		height: 5px;
		background: #b7b7b7;
		margin-top: 5px;
	}
	#ShopDetails .evaluate>li:nth-child(2) .ProgressBar>div:nth-child(3){
		width: 20%;
		padding: 0px 0px 0px 3px;
		font-size: 12px;
		color: #848484;
	}
	#ShopDetails .evaluate>li:nth-child(2) .ProgressBar>div:nth-child(2)>div{
		background: #fbc429;
		height: 100%;
	}
	
	#ShopDetails .Recommend{
		margin: 0.2rem 0px;
		background: #FFFFFF;
		padding: 0px 0.25rem 10px;
	}
	#ShopDetails .Recommend header{
		padding: 0.3rem 0.1rem;
		font-size: 0.32rem;
		font-weight: bold;
	}
	#ShopDetails .Recommend header i{
		font-size: 0.44rem;
	}
	#ShopDetails .Recommend header a{
		color: #bbbbbb;
	}
	
	#ShopDetails .swiper_box{
		display: block;
		height: 1.7rem;
	}
	#ShopDetails .swiper_box_1>img,
	#ShopDetails .swiper_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#ShopDetails .swiper_box_1>span,
	#ShopDetails .swiper_box>span{
		position: absolute;
	    top: 0px;
	    left: 0px;
	    background: #e66864;
	    color: #FFFFFF;
	    border-bottom-right-radius: 5px;
	    padding: 0.04rem 0.12rem;
	    font-size: 0.24rem;
	}
	#ShopDetails .swiper_box_1>div,
	#ShopDetails .swiper_box>div{
		width: 100%;
	    padding: 0.1rem 0px;
	    text-align: center;
	    position: absolute;
	    bottom: 0px;
	    left: 0px;
	    color: #FFFFFF;
	    background: rgba(0,0,0,0.5);
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
		font-size: 0.26rem;
	}
	
	
	#ShopDetails .box_3{
		background: #FFFFFF;
		padding: 0.3rem 0.25rem 0px 0.25rem;
		margin-bottom: 0.2rem;
	}
	#ShopDetails .box_3 .shop>li:nth-child(1){
		width: 2.5rem;
		height: 1.8rem;
		position: relative;
		margin-right: 0.3rem;
	}
	#ShopDetails .box_3 .shop>li:nth-child(1) .title_1{
		position: absolute;
		right: 0.06rem;
		bottom: 0.06rem;
		color: #FFFFFF;
		background: rgba(0,0,0,0.5);
		padding: 0.06rem 0.1rem;
		font-size: 0.24rem;
	}
	#ShopDetails .box_3 .shop>li:nth-child(1) img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#ShopDetails .box_3 .shop .right_1{
		color: #FFFFFF;
		background: #ff6065;
		padding:0px 3px;
		letter-spacing: 2px;
		font-size: 0.24rem;
		margin-left: 5px;
	}
	#ShopDetails .box_3 .shop .right_1>div{
		padding: 0.16rem 0.06rem;
	}
	#ShopDetails .box_3 .shop .right_1>div:nth-child(1){
		border-bottom: 1px solid #FFFFFF;
	}
	#ShopDetails .box_3 .shop .left_1 .title_1{
		font-size: 0.28rem;
		font-weight: bold;
		margin-bottom: 0.1rem;
	}
	#ShopDetails .box_3 .shop .left_1 .title_2{
		font-size: 0.24rem;
		color: #8c8c8c;
		margin-bottom: 0.1rem;
	}
	#ShopDetails .box_3 .shop .left_1 .title_2 span{
		margin-right: 3px;
	}

	#ShopDetails .box_3 .shop .left_1 .operation_1>a,
	#ShopDetails .box_3 .shop .left_1 .operation_1>span{
		display: inline-block;
		font-size: 0.28rem;
	}
	#ShopDetails .box_3 .shop .left_1 .operation_1>span:nth-child(1){
		color: #fd5e63;
	}
	#ShopDetails .box_3 .shop .left_1 .operation_1>span:nth-child(1) i{
		font-weight: bold;
		font-size: 0.4rem;
		width: 0.4rem;
	}
	#ShopDetails .box_3 .shop .left_1 .operation_1>a{
		float: right;
	}
	#ShopDetails .box_3 .shop .left_1 .operation_1>a,
	#ShopDetails .box_3 .shop .left_1 .operation_1>span:nth-child(2){
		
		background: #fd5e63;
		padding: 2px 0.3rem;
		color: #FFFFFF;
		border-radius: 0.6rem;
	}
	#ShopDetails .box_3 .address_1{
		padding: 0.2rem 0px 0.2rem 0.6rem;
		margin-top: 0.3rem;
		border-top: 1px solid #CCCCCC;
	}
	#ShopDetails .box_3 .address_1 .Telephone{
		color: #000000;
		font-size: 0.24rem;
		margin: 5px 0px 0px 0px;
	}
	#ShopDetails .box_3 .address_1 .Telephone i{
		font-size: 0.52rem;
	}
	#ShopDetails .box_3 .address_1 .address_2{
		font-size: 0.28rem;
		padding-left: 0.6rem;
		position: relative;
		margin-bottom: 0.2rem;
	}
	#ShopDetails .box_3 .address_1 .address_2 i{
		position: absolute;
		top: 0px;
		left: 0px;
		font-size: 0.4rem;
	}
	#ShopDetails .box_3 .address_1 .titme_1{
		font-size: 0.28rem;
		padding-left: 0.6rem;
	}
	
	#ShopDetails .box_2{
		background: red;
		padding: 0.4rem 0px;
		text-align: center;
		color: #fee6e7;
	}
	#ShopDetails .box_2 span{
		color: #feca00;
	}

</style>