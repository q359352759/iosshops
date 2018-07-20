<template>
	<div id="commodity">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">商品详情</h1>
		</header>
		<div class="mui-content">
			<div id="" class="mui-slider" >
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="javascript:;">
							<img v-if="product.imagepath" :src="product.imagepath[0]">
						</a>
					</div>
					<!-- 第一张 -->
					<div class="mui-slider-item" v-for="x in product.imagepath">
						<a href="#">
							<img :src="x">
						</a>
					</div>
					
					<div class="mui-slider-item">
						<a href="javascript:;">
							<img v-if="product.imagepath" :src="product.imagepath[product.imagepath.length-1]">
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator" v-if="product.imagepath" v-show="product.imagepath.length>1">
					<div class="mui-indicator" :class="{'mui-active':index==0}" v-for="(x,index) in product.imagepath"></div>
				</div>
			</div>
		</div>
		<div class="box_2">
			<header>{{product.productname}}</header>
			<div class="Price_1">
				<span class="Price_2 mui-pull-left">￥{{product.minsaleprice}}</span>
				<span class="Give mui-pull-left">赠{{product.minsaleprice*product.scalenum/100}}HB<sup>{{product.scalenum}}</sup></span>
				<!--<span class="scalenum mui-pull-left">分润{{product.scalenum}}%</span>-->
				<span class="SalesVolume mui-pull-right">月销{{query.salecounts!='null' ? query.salecounts : 0}}笔</span>
				<div class="mui-clearfix"></div>
			</div>
			<ul class="type_list">
				<li><span class="Label_1">包邮</span></li>
				<li class="mui-text-right"><span class="address_1">官方直营</span></li>
			</ul>
		</div>
		
		<ul class="mui-table-view box_3">
			<li @click="openEject(true)" class="mui-table-view-cell">
				<a href="javascript:;" class="mui-navigate-right">
					颜色/规格
				</a>
			</li>
		</ul>
		
		<div class="box_4">
			<header>宝贝评价({{Evaluat.count}}) <a @click="open_6(true)" class="mui-pull-right">更多评论<i class="mui-icon mui-icon-arrowright"></i></a></header>
			<ul class="comment_box">
				<li class="" v-for="x in Evaluat.list">
						<div class="user_Head_portrait mui-pull-left"><img src="@/assets/img/group_03.jpg"/></div>
						<div class="user_name mui-pull-left">
							<div>{{x.membername  | anonymous}}
								<span>铂金会员</span>
							</div>
						</div>
						<div class="time_1 mui-pull-right">{{x.evaluationtime | time_difference}}</div>
						<div class="mui-clearfix"></div>
						<div class="text_1">
							{{x.evaluationcontent}}
							<img v-for="y in x.evaluationphoto" :src="y"/>
						</div>
				</li>
			</ul>
		</div>
		
		<div class="box_5">
			<div class="mui-pull-left img_box">
				<img :src="shop.mainlogo" />
			</div>
			<div class="Label_1 mui-pull-right">
				<span>全部宝贝</span>
				<span @click="go()">进店逛逛</span>
			</div>
			<div class="store_name ">
				<font>{{shop.shopname}}</font>
				<span>工商认证</span>
			</div>
			<div class="mui-clearfix"></div>
			<ul class="Label_2">
				
				<li :class="{'type_1':shop.creditrating>=4,'type_2':shop.creditrating<4 && shop.creditrating>=3,'type_3':shop.creditrating<3}">
					宝贝描述<span>{{shop.creditrating}}</span>
					<font v-show="shop.creditrating>4">高</font>
					<font v-show="shop.creditrating>=3 && shop.creditrating<4">中</font>
					<font v-show="shop.creditrating<3">低</font>
				</li>
				<li class="mui-text-center" :class="{'type_1':shop.creditrating>=4,'type_2':shop.creditrating<4 && shop.creditrating>=3,'type_3':shop.creditrating<3}">
					卖家服务<span>{{shop.creditrating}}</span>
					<font v-show="shop.creditrating>4">高</font>
					<font v-show="shop.creditrating>=3 && shop.creditrating<4">中</font>
					<font v-show="shop.creditrating<3">低</font>
				</li>
				<li class="mui-text-right" :class="{'type_1':shop.creditrating>=4,'type_2':shop.creditrating<4 && shop.creditrating>=3,'type_3':shop.creditrating<3}">
					物流服务<span>{{shop.creditrating}}</span>
					<font v-show="shop.creditrating>4">高</font>
					<font v-show="shop.creditrating>=3 && shop.creditrating<4">中</font>
					<font v-show="shop.creditrating<3">低</font>
				</li>
			</ul>
		</div>
		
		<div class="box_7" v-if="product.particulars && product.particulars!=''" v-html="product.particulars"></div>
		
		
		<ul class="footer">
			<li class="narrow_1 dianpu active" @click="go()">
				<i class="icon iconfont icon-dianpu"></i>
				<span>店铺</span>
			</li>			
			<li class="narrow_1 xiaoxi">
				<i class="icon iconfont icon-xiaoxi"></i>
				<span>消息</span>
			</li>
			<li @click="change_Favorites()" class="narrow_1 shouchang " :class="{'active':Favorites}">
				<i class="icon iconfont icon-xingxing"></i>
				<span>{{Favorites ? '取消收藏' : '收藏'}}</span>
			</li>
			<li class="btn_box">
				<div class="btn_1">
					<div @click="openEject(true)">加入购入车</div>
					<div @click="openEject(true)">立即购买</div>
				</div>
			</li>
		</ul>
		
		<div class="Eject" :class="{'open_1':Eject_open}">
			<!--遮罩-->
			<div class="Eject_mask" @click="openEject(false)"></div>
			<!--内容-->
			<div class="Eject_box">
				<div class="close_1" @click="openEject(false)"><i class="mui-icon mui-icon-closeempty"></i></div>
				<div class="Eject_header">
					<div class="img_box mui-pull-left">
						<!--<img :src="Specifications.showpic"/>-->
						<img v-if="lastSize.showpic" :src="lastSize.showpic"/>
						<img v-if="!lastSize.showpic && product.imagepath && product.imagepath.length>0" :src="product.imagepath[0]"/>
					</div>
					<ul class="text_1">
						<!--<li>￥{{Specifications.saleprice}}</li>
						<li>库存{{Specifications.stock}}</li>
						<li>已选择：<span>{{Specifications.color}}</span>   <span>0{{Specifications.size}}</span></li>-->
						<li>￥{{lastSize.saleprice ? lastSize.saleprice : product.minsaleprice}}</li>
						<li>库存{{lastSize.stock}}</li>
						<li>已选择：<span>{{lastSize.color}}</span><span>{{lastSize.size}}</span></li>
					</ul>
					<div class="mui-clearfix"></div>
				</div>
				<div class="Eject_body">
					<ul class="type_list">
						<li v-if="findskusList.length>0">
							<header>颜色</header>
							<div>
								<span @click="change_findskus(0,$index)" v-for="(x,$index) in findskusList" :class="{'active':$index==numlist[0]}">
									{{x.color}}
								</span>
							</div>
						</li>
						<li v-if="findskusList[numlist[0]]">
							<header>尺寸</header>
							<div>
								<span @click="change_findskus(1,$index)" v-for="(x,$index) in findskusList[numlist[0]].data" :class="{'active':$index==numlist[1]}">
									{{x.size}}
								</span>
							</div>
						</li>
						<li v-if="findskusList[numlist[0]] && findskusList[numlist[0]].data[numlist[1]]">
							<header>价格</header>
							<div>
								<span @click="change_last(x)" v-for="x in findskusList[numlist[0]].data[numlist[1]].data" :class="{'active':x==lastSize}">
									{{x.saleprice}}
								</span>
							</div>
						</li>
					</ul>
					<div class="Number_1">
						<header>数量</header>
						<div class="mui-numbox">
							<button @click="change_quantity(1)" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
							<input @blur="change_quantity(3)" v-model.number="quantity"  min="1" :max="Specifications.stock" class="mui-input-numbox" type="number" />
							<button @click="change_quantity(2)" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
						</div>
					</div>
				</div>
				<div class="Eject_footer">
					<div @click="add_cart()">加入购物车</div>
					<div @click="purchase()">立即购买</div>
				</div>
			</div>
		</div>
		
		<div class="box_6" :class="{'active':box_6show}">
			<header class="">
				<i class="mui-icon mui-icon-arrowleft" @click="open_6(false)"></i>
				评价
			</header>
			<ul class="comment_box" v-on:scroll="scroll($event)">
				<li class="" v-for="x in Evaluat_2.list">
						<div class="user_Head_portrait mui-pull-left"><img src="@/assets/img/group_03.jpg"/></div>
						<div class="user_name mui-pull-left">
							<div>{{x.membername  | anonymous}}
								<span>会员</span>
							</div>
						</div>
						<div class="time_1 mui-pull-right">{{x.evaluationtime | time_difference}}</div>
						<div class="mui-clearfix"></div>
						<div class="text_1">
							{{x.evaluationcontent}}
							<img v-for="y in x.evaluationphoto" :src="y"/>
						</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		components:{
		},
		data:function(){
			return{
				findskusList:[],	//新的产品规格
				numlist:[0,0,0,0,0],
				lastSize:{},	//最好选的规格 也就是价格这个地方
				
				Eject_open:false,	//是否显示选择规格
				query:{},			//浏览器参数
				product:{},			//商品
				productsku:{},		//产品规格
				shop:{},			//店铺
				pageIndex:1,		//评论页码
				pageSize:10,		//评论每页大小
				Evaluat:{			//用户评论
					list:[],
					pagesize:0,
					count:0,
				},
				Evaluat_2:{			//跟多评论
					list:[],
					pagesize:0,
					count:0,
				},
				Specifications:{},	//所选规格
				quantity:1,			//购买数量
				box_6show:false,		//跟多评论是否显示
				userId:localStorage.ids ? localStorage.ids : '',	//用户ID
				Favorites:false,		//是否被收藏
			}
		},
		filters:{
			anonymous(x){
				return '**'+x.substring(1,x.length)
			},
			//计算时间差
			time_difference(y){
				var d1 = new Date(y);
				var d2 = new Date();
//				return parseInt(d2 - d1)/1000/60/60 + '小时'	//差距多少天
				if(parseInt(d2 - d1)/1000/60/60/24 > 1){
					return y;
				}else if(parseInt(d2 - d1)/1000/60/60/24 < 1 && parseInt(d2 - d1)/1000/60/60 > 1){
					var xiaoshi=parseInt(d2 - d1)/1000/60/60;
					return Math.ceil(xiaoshi)+'小时前';
				}else{
					var fenzhong=parseInt(d2 - d1)/1000/60;
					return Math.ceil(fenzhong)+'分钟前';
				}
			}
		},
		methods:{
			//选择规格
			change_findskus(x,y){
				var numlist=this.numlist
				for(var i=0;i<numlist.length;i++){
					if(x==i){
						numlist[i]=y;
					}else if(x<i){
						numlist[i]=0;
					}
				}

				this.numlist=[]
				this.numlist=numlist;
				this.lastSize=this.findskusList[this.numlist[0]].data[this.numlist[1]].data[0]
				console.log(this.lastSize)
//				this.$set(items, 'nowindex', !items.nowindex);
			},
			change_last(x){
				this.lastSize=x
			},
			//立即购买
			purchase(){
				if(this.userId){
//					if(!this.lastSize.autoid){
//						mui.toast('此商品未设置规格无法购买',{ duration:'long', type:'div' });
//					}else{
						//c 产品Id s规格id q数量
//						sessionStorage.commodity0516=JSON.stringify([{'c':this.query.id,'s':this.Specifications.id,'q':this.quantity}])
						var obj=new Object();
							obj.c=this.query.id		//产品Id
							obj.s=this.lastSize.autoid ? this.lastSize : '';
							obj.q=this.quantity;
						sessionStorage.commodity0516=JSON.stringify([obj])
						this.$router.push('/Orders');
//					}
				}else{
					this.$router.push('/login');
				}
			},
			//进店看看	
			go(){
				this.$router.push('/ShopDetails?id='+this.shop.id);
			},
			//加入购入车			
			add_cart(){
				if(this.userId){
					var obj=new Object();
						obj.userId=this.userId;
						obj.productId=this.query.id;	//产品Id
						obj.skuId=this.lastSize.autoid ? JSON.stringify(this.lastSize) : '';//规格
						obj.count=this.quantity		//数量
						obj.price=this.lastSize.saleprice ? this.lastSize.saleprice : this.product.minsaleprice;	//价格
						obj.operator=0				//操作类型 0:新增 1:修改 2:删除
						obj.id='';
					http('post','/mall/mobile/shoppingCart/cart',{data:JSON.stringify(obj)},this.cart_return);
					//获取用户购物车列表
//					http('get','/mall/mobile/shoppingCart/'+this.userId,'',this.shoppingCart_return);
				}else{
					this.$router.push('/login');
				}
			},
			shoppingCart_return(x){
				console.log('获取购物车',x);
				var obj=new Object();
					obj.userId=this.userId;
					obj.productId=this.query.id;		//产品Id
					obj.skuId=this.lastSize.autoid ? this.lastSize.autoid : '';	//规格
					obj.count=this.quantity				//数量
					obj.price=10;		//价格
				if(x==null){
					console.log('没有购物车');
					obj.operator=0				//操作类型 0:新增 1:修改 2:删除
					obj.id='';
				}else{
					console.log('有购物车');
					var product=x[0].product;
						obj.operator=0;
						obj.id='';
				}
				console.log(obj)
				http('get','/mall/mobile/shoppingCart/'+this.userId,'',this.shoppingCart_return);
			},
			cart_return(x){
				console.log(x);
				if(x.success){
					mui.toast('加入购物车成功',{ duration:2000, type:'div' })
				}else{
					mui.toast(x.msg,{ duration:2000, type:'div' })
				}
				this.Eject_open=false
			},
			//选择规格
			openEject:function(x){
				this.Eject_open=x;
			},
			open_6(x){
				this.box_6show=x
			},
			//选择数量
			change_quantity(x){
				if(x==1){
					if(this.quantity>1){
						this.quantity--
					}
				}else if(x==2){
//					if(this.quantity<this.lastSize.stock){
						this.quantity++
//					}
				}else{
					if(this.quantity>this.lastSize.stock){
						this.quantity=this.lastSize.stock
					}
//					if(this.quantity>this.Specifications.stock){
//						this.quantity=this.Specifications.stock
//					}
				}
			},
			//选择规格
			change_Specifications(x){
				this.Specifications=x
				if(this.quantity>this.Specifications.stock){
					this.quantity=this.Specifications.stock;
				}
			},
			//查看商品详细信息
			findProductIndex(){
				//this.query.id
				console.log(this.query.id)
				http('post','/mall/mobile/product/findProductIndex',{'id':this.query.id},this.findProductIndex_returun);
			},
			findProductIndex_returun(x){
				console.log('查看商品详细信息',x);
				this.product=x.product;
				this.product.imagepath=this.product.imagepath.split(',');
				this.productsku=x.productsku;		//规格
				this.Specifications=x.productsku.length>1 ? x.productsku[0] : {};	//默认一个所选规格
				this.shop=x.shop;
				setTimeout(function(){
					$('#commodity .box_7').find('img').each(function(){
						$(this).removeAttr('height')
					})
				},1000)
			},
			//商品id查询用户评价
			findEvaluatById(){
				http('post','/mall/mobile/evaluat/findEvaluatByProduct',{'id':this.query.id,'number':1,'size':2},this.findEvaluatById_return)
			},
			findEvaluatById_return(x){
				console.log('获取用户评论',x);
				for(var i=0;i<x.list.length;i++){
					x.list[i].evaluationphoto=x.list[i].evaluationphoto.split(',');
				}
				this.Evaluat=x;
			},
			//获取更多评论
			findEvaluatById_2(){
				http('post','/mall/mobile/evaluat/findEvaluatByProduct',{'id':this.query.id,'number':this.pageIndex,'size':this.pageSize},this.findEvaluatById_return_2)
			},
			findEvaluatById_return_2(x){
				console.log('更多评论',x);
				for(var i=0;i<x.list.length;i++){
					x.list[i].evaluationphoto=x.list[i].evaluationphoto.split(',');
				}
				this.Evaluat_2.pagesize=x.pagesize;
				this.Evaluat_2.list=this.Evaluat_2.list.concat(x.list);
			},
			//滚动条事件
			scroll(e){
				var nDivHight = $(e.target).outerHeight();
				var nScrollHight = $(e.target)[0].scrollHeight;
     			var nScrollTop = $(e.target)[0].scrollTop;
				console.log(nScrollTop,nDivHight,nScrollHight)
				
     			if(nScrollTop + nDivHight >= nScrollHight && this.pageIndex<this.Evaluat_2.pagesize){
					this.pageIndex++;
					this.findEvaluatById_2();
				}
			},
			//判断商品或店铺是否被当前登录用户收藏
			isFavorites(){
				var obj={
						mid:this.userId,
						id:this.query.id,
						type:0		// 1店铺0商品 
					}
				http('post','/mall/mobile/favorites/isFavorites',obj,this.isFavorites_return)
			},
			isFavorites_return(x){
				console.log('是否被收藏',x);
				this.Favorites=x;
			},
			//改变收藏状态
			change_Favorites(){
				var obj=new Object();
					obj.mid=this.userId
					obj.id=this.query.id;
					obj.type=0		// 1店铺0商品 
				if(!this.Favorites){
					//添加到收藏的方法
					http('post','/mall/mobile/favorites/addFav',obj,this.change_Favorites_return)
				}else{
					//用户取消收藏的方法
					http('post','/mall/mobile/favorites/cancelfavorites',obj,this.change_Favorites_return)
				}
				this.Favorites=!this.Favorites
			},
			change_Favorites_return(x){
				console.log(x)
//				mui.toast(x.msg,{ duration:2000, type:'div' })
			},
			findskus(){
				http('post','/mall/mobile/product/findskus',{'id':this.query.id},this.findskus_return)
			},
			findskus_return(x){
				
				var list=[];
				for(var i=0;i<x.length;i++){
					var obj_1=new Object();
						obj_1.color=x[i].color.color;
						obj_1.data=[];
					var sizeList=x[i].sizeList;
					for(var j=0;j<sizeList.length;j++){
						var obj_2=new Object();
							obj_2.size=sizeList[j].size.size;
							obj_2.data=sizeList[j].versionList;;
						obj_1.data.push(obj_2);
					}
					list.push(obj_1)
				}
				this.findskusList=list;
				console.log('规格',list);
				if(this.findskusList[this.numlist[0]] && this.findskusList[this.numlist[0]].data[this.numlist[1]]){
					this.lastSize=this.findskusList[this.numlist[0]].data[this.numlist[1]].data[0]
				}
			}
			
		},
		created:function(){
			this.query=this.$route.query;
//			this.query.id='d78aeeff14e84675a16048e8599d6ac8';
			this.findProductIndex();	//查看商品详细信息
			this.findEvaluatById();		//商品id查询用户评价
			this.findEvaluatById_2();	//更多评论
			this.isFavorites();			//是否被被收藏
			
			this.findskus();	//获取规格
		},
		mounted:function(){
			mui('#commodity .mui-slider').slider({
				swipeBack:true, 	//启用右滑关闭功能
			  	interval:2000		//自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	}
	
</script>

<style>
	.cb{
		clear: both;
	}
	
	#commodity .box_7{
		background: #FFFFFF;
		padding: 0.1rem 0.2rem;
	    margin: 0.2rem 0px 0px
	}
	#commodity .box_7 img{
		max-width: 100%;
	}
	
	#commodity .box_6{
		z-index: 10;
		position: fixed;
		top: 0px;
		left: 100%;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-ms-transition: all 0.3s;
		-o-transition: all 0.3s;
		transition: all 0.3s;
	}
	#commodity .box_6.active{
		left: 0px;
	}
	#commodity .box_6>header{
		text-align: center;
		position: relative;
		height: 44px;
		line-height: 44px;
		border-bottom: 1px solid #CCCCCC;
		z-index: 1;
		background: #FFFFFF;
	}
	#commodity .box_6>header i{
		position: absolute;
		top: 9px;
		left: 9px;
	}
	#commodity .box_6 .comment_box{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		padding: 44px 0px 0px;
		overflow: scroll;
	}
	
	
	#commodity .Eject{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 1;
		display: none;
	}
	#commodity .Eject.open_1{
		display: block;
	}
	#commodity .Eject.open_1 .Eject_mask{
		background: rgba(0,0,0,0.5);
	}
	#commodity .Eject .Eject_mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0);
		-webkit-transition: all 2s;
		-moz-transition: all 2s;
		-ms-transition: all 2s;
		-o-transition: all 2s;
		transition: all 2s;
	}
	#commodity .Eject.open_1 .Eject_box{
		bottom: 0px;
	}
	#commodity .Eject .Eject_box{
		position: absolute;
		width: 100%;
		height: 80%;
		bottom: 100%;
		left: 0px;
		background: #FFFFFF;
		padding: 10px;
		-webkit-transition: all 3s;
		-moz-transition: all 3s;
		-ms-transition: all 3s;
		-o-transition: all 3s;
		transition: all 3s;
	}
	#commodity .Eject .Eject_header{
		position: relative;
		border-bottom: 1px solid #CCCBCB;
		padding: 0px 0px 5px 0px;
	}
	#commodity .Eject .img_box{
		width: 2rem;
		height: 2rem;
		border: 1px solid rgba(0,0,0,.1);
		background: #FFFFFF;
		margin: -0.8rem 5px 0px 0px;
	}
	#commodity .Eject .img_box img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#commodity .Eject .text_1{
		font-size: 0.28rem;
	}
	#commodity .Eject .text_1>li:nth-child(1){
		color: red;
	}
	#commodity .Eject .close_1{
		position: absolute;
		right: 10px;
		top: -13px;
		width: 26px;
		height: 26px;
		/*border: 1px solid #5C5C5C;*/
		text-align: center;
		border-radius: 100%;
		z-index: 1;
		background: #ff5400;
		color: #FFFFFF;
	}
	#commodity .Eject .Number_1>header{
		font-size: 0.28rem;
    	padding: 5px 0px;
	}
	#commodity .Eject .Number_1>ul{
		display: flex;
	}
	#commodity .Eject .Number_1>ul>li{
		height: 0.6rem;
		margin-right: 5px;
	}
	#commodity .Eject .Number_1>ul>li>span{
		display: block;
		width: 18px;
		height: 14px;
		border: 1px solid #CCCCCC;
	}
	#commodity .Eject .Number_1>ul>li>span:nth-child(1){
		margin-bottom: 2px;
	}
	#commodity .Eject .Number_1>ul>li>span>i{
		font-size: 16px;
		display: block;
		line-height: 10px;
	}
	#commodity .Eject .Number_1 input{
		height: 0.6rem;
		width: 2rem;
		margin: 0px;
		padding: 0px;
	}
	
	#commodity .Eject .type_list>li{
		border-bottom: 1px solid #8E8E8E;
	}
	#commodity .Eject .type_list header{
		font-size: 0.28rem;
		padding: 5px 0px;
	}
	#commodity .Eject .type_list>li>div>span{
	    display: inline-block;
	    border: 1px solid #f5f5f5;
	    background-color: #f5f5f5;
	    padding: 5px 10px;
	    border-radius: 3px;
	    font-size: 0.24rem;
	    margin: 0 8px 8px 0;
	    color: #555;
	}
	#commodity .Eject .type_list>li>div>span.active{
		background: red;
		color: #FFFFFF;
	}
	#commodity .Eject .Eject_footer{
		position: absolute;
		width: 100%;
		bottom: 0px;
		left: 0px;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
	}
	#commodity .Eject .Eject_footer>div{
		width: 50%;
		padding: 10px;
		color: #FFFFFF;
		text-align: center;
		font-size: 0.28rem;
	}
	#commodity .Eject .Eject_footer>div:nth-child(1){
		background: #FF9500;
	}
	#commodity .Eject .Eject_footer>div:nth-child(2){
		background: #FF0036;
	}
	
	
	
	#commodity{
		padding: 0px 0px 60px 0px;
	}
	#commodity .footer{
		position: fixed;
		width: 100%;
		bottom: 0px;
		left: 0px;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		text-align: center;
		background: #FFFFFF;
		padding: 5px 0px;
		border-top: 1px solid #CCCBCB;
	}
	#commodity .footer>li{
		flex-grow: 1;
	}
	#commodity .footer .narrow_1{
		font-size: 0.24rem;
		color: #5D5D5D;
		padding: 0.04rem 0px 0px 0px;
		width: 60px;
	}
	#commodity .footer .narrow_1 i{
		height: 0.44rem;
		display: inline-block;
		font-size: 0.38rem;
		margin-bottom: 0.02rem;
	}
	/*#commodity .footer .dianpu i{
		font-size: 0.38rem;
	}
	#commodity .footer .xiaoxi i{
		font-size: 0.38rem;
	}
	#commodity .footer .shouchang i{
		font-size: 0.38rem;
	}*/
	#commodity .footer .active i{
		color: #F84D08;
	}
	
	#commodity .footer .btn_box{
		width: 200px;
		padding: 0px 5px;
		max-width: 200px;
	}
	#commodity .footer>li>span{
		display: block;
	}
	
	#commodity .footer .btn_1{
		border-radius: 0.8rem;
		overflow: hidden;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;		
	}
	#commodity .footer .btn_1>div{
		width: 50%;
		color: #FFFFFF;
		height: 0.8rem;
		line-height: 0.82rem;
		font-size: 0.28rem;
	}
	#commodity .footer .btn_1>div:nth-child(1){
		background: #FF9701;
	}
	#commodity .footer .btn_1>div:nth-child(2){
		background: #FE4A02;
	}
	
	
	#commodity .box_5{
		background: #FFFFFF;
		padding: 0.1rem 0.2rem;
		margin: 0.2rem 0px 0px;
	}
	#commodity .box_5 .img_box{
		width: 1.2rem;
		height: 1.2rem;
		margin: 0px 0.2rem 0px 0px;
	}
	#commodity .box_5 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#commodity .box_5 .store_name{
		font-size: 0.28rem;
		margin: 0.2rem 0px 0px 0px;
	}
	#commodity .box_5 .store_name>font{
		display: block;
		margin: 0px 0px 5px 0px;
	}
	#commodity .box_5 .store_name>span{
		display: inline-block;
	    padding: 0px 5px;
	    color: red;
	    border: 1px solid red;
	    font-size: 0.24rem;
	    height: 0.34rem;
	    line-height: 0.32rem;
	    border-radius: 0.34rem;
	    color: #FFFFFF;
	    background: red;
	}
	#commodity .box_5 .Label_1{
		margin: 0.2rem 0px 0px 0px;
	}
	#commodity .box_5 .Label_1>span:nth-child(1){
		display: inline-block;
		color: #FF4808;
		height: 0.48rem;
		font-size: 0.26rem;
		line-height: 0.5rem;
		border-radius: 0.48rem;
		padding: 0px 5px;
		border: 1px solid #FF4808;
	}
	#commodity .box_5 .Label_1>span:nth-child(2){
		display: inline-block;
		background: #FF4808;
		color: #FFFFFF;
		height: 0.48rem;
		font-size: 0.26rem;
		line-height: 0.5rem;
		border-radius: 0.48rem;
		padding: 0px 5px;
		border: 1px solid #FF4808;
	}
	#commodity .box_5 .Label_2{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		font-size: 0.24rem;
		margin: 5px 0px;
		color: #6b6b6b;
	}
	#commodity .box_5 .Label_2>li{
		width: 33.3%;
	}
	#commodity .box_5 .Label_2>li span{
		margin: 0px 5px;
	}
	/*高*/
	#commodity .box_5 .Label_2>li.type_1 font,
	#commodity .box_5 .Label_2>li.type_1 span{
		color: #D04D18;
	}
	/*中*/
	#commodity .box_5 .Label_2>li.type_2 font,
	#commodity .box_5 .Label_2>li.type_2 span{
		color: #908604;
	}
	/*低*/
	#commodity .box_5 .Label_2>li.type_3 font,
	#commodity .box_5 .Label_2>li.type_3 span{
		color: #54B6A1;
	}
	
	

	#commodity .box_4{
		padding: 0px 0.2rem;
		background: #FFFFFF;
	}
	#commodity .box_4>header{
		color: #333333;
		font-size: 0.3rem;
		padding: 8px 0px 0px;
	}
	#commodity .box_4>header i{
		font-size: inherit;
	}
	
	#commodity .box_4 .comment_box{
		padding: 5px 0px 20px;
	}
	#commodity .box_6 .comment_box>li,
	#commodity .box_4 .comment_box>li{
		/*display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;*/
		border-top: 1px solid #CCCBCB;
		padding: 5px 0px 5px;
	}
	#commodity .box_6 .comment_box .user_Head_portrait,
	#commodity .box_4 .comment_box .user_Head_portrait{
		width: 0.8rem;
		height: 0.8rem;
		margin: 0px 5px 0px 0px;
	}
	#commodity .box_6 .comment_box .user_Head_portrait>img,
	#commodity .box_4 .comment_box .user_Head_portrait>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 100%;
	}
	#commodity .box_6 .comment_box .user_name,
	#commodity .box_4 .comment_box .user_name{
		color: #333333;
		font-size: 0.30rem;
		font-weight: bold;
	}
	#commodity .box_6 .comment_box .user_name span,
	#commodity .box_4 .comment_box .user_name span{
		color: #C09459;
		display: block;
		font-size: 0.26rem;
		font-weight: 100;
	}
	#commodity .box_6 .comment_box .time_1,
	#commodity .box_4 .comment_box .time_1{
		font-size: 0.24rem;
		color: #b7b7b7;
		margin: 10px 0px 0px 0px;
	}
	#commodity .box_6 .comment_box .text_1,
	#commodity .box_4 .comment_box .text_1{
		width: 100%;
		padding: 0px 0px 0px 0.8rem;
		color: #000000;
		font-size: 0.24rem;
	}
	#commodity .box_6 .comment_box .text_1 img,
	#commodity .box_4 .comment_box .text_1 img{
		/*max-width: 0.8rem;
		max-height: 0.8rem;*/
		width: 0.8rem;
		height: 0.8rem;
		margin: 0px 5px;
		object-fit: cover;
		vertical-align: text-top;
	}
	
	#commodity .box_3{
		margin: 0.2rem 0px;
		font-weight: bold;
		color: #525252;
	}
	
	#commodity .box_2{
		background: #FFFFFF;
	}
	#commodity .box_2>header{
		font-size: 0.36rem;
		padding: 7px 0.2rem 6px;
		font-weight: bold;
	}
	#commodity .box_2 .Price_1{
		color: #D62B00;
		padding: 0px 0.2rem 5px;
	}
	#commodity .box_2 .Price_2{
		padding-top: 2px;
	}
	#commodity .box_2 .Give{
		display: inline-block;
		padding: 3px 0px 2px 5px;
		margin: 0px 0px 0px 5px;
		border: 1px solid #D62B00;
		border-radius: 3px;
		font-size: 0.26rem;
	}
	#commodity .box_2 .Give sup{
		background: #D62B00;
		color: #FFFFFF;
		padding: 0px 2px;
	}
	#commodity .box_2 .scalenum{
		display: inline-block;
		padding: 0px 5px 0px;
		margin: 0px 0px 0px 5px;
		border: 1px solid #D62B00;
		background: #D62B00;
		color: #FFFFFF;
		border-radius: 3px;
		font-size: 0.26rem;
		height: 0.48rem;
		line-height: 0.48rem;
		border-radius: 0.48rem;
	}
	#commodity .box_2 .SalesVolume{
		margin: 5px 0px 0px;
		color: #a5a5a5;
	}
	#commodity .box_2 .type_list{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;
		color: #737277;
		font-size: 0.26rem;
		padding: 1px 0.2rem;
	}
	#commodity .box_2 .type_list>li{
		width: 50%;
		padding: 0.1rem 0px;
	}
	#commodity .box_2 .type_list .Label_1{
		display: inline-block;
	    padding: 0px 5px;
	    color: red;
	    border: 1px solid red;
	    font-size: 0.24rem;
	    height: 0.34rem;
	    line-height: 0.32rem;
	    border-radius: 0.34rem;
	}
	#commodity .box_2 .type_list .address_1{
		display: inline-block;
	    padding: 0px 5px;
	    color: red;
	    border: 1px solid red;
	    font-size: 0.24rem;
	    height: 0.34rem;
	    line-height: 0.32rem;
	    border-radius: 0.34rem;
	    color: #FFFFFF;
	    background: red;
	}
	
	#commodity .mui-slider{
		/*background: #FFFFFF;*/
		height: 4rem;
		border-bottom: 1px solid #CCCCCC;
	}
	#commodity .mui-slider a{
		height: 4rem;
	}
	#commodity .mui-slider a>img{
		width: 100%;
		height: 100%;
		-o-object-fit: contain;
		object-fit: contain;
	}
</style>