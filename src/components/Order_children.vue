<template>

		<li class="box_2">
				<header>{{shop.shopname}}</header>
				<div class="content_1">
					<div class="img_box">
						<img v-if="Specifications.showpic" :src="Specifications.showpic"/>
						<img v-if="!Specifications.showpic && product.imagepath && product.imagepath.length>0" :src="product.imagepath[0]"/>
					</div>
					<div class="text_1">
						<div>{{product.productname}}</div>
						<div v-if="Specifications.color">规格：<span>{{Specifications.color}} | {{Specifications.size}} | {{Specifications.versionstr}}</span></div>
					</div>
					<div class="right_1">
						<div>￥{{Specifications.saleprice ? Specifications.saleprice : product.minsaleprice}}</div>
						<span>x{{query.q}}</span>
					</div>
				</div>
				<ul class="mui-table-view">
				        <li class="mui-table-view-cell">
				        	<a class="mui-navigate-right">
				               	配送方式 <span class="mui-pull-right">包邮</span>
				        	</a>
				        </li>
				        <li class="mui-table-view-cell">
				            <a class="mui-navigate-right">
				            	运费险<span class="mui-pull-right">卖家送，确认收货前可赔</span>
				            </a>
				        </li>
				        <li class="input_1">
				        	<div>给卖家留言：</div>
				        	<div>
				        		<input type="text" name="" id="" value="" placeholder="选填:填写内容已和卖家协商确认" />
				        	</div>
				        </li>
				   </ul>
			</li>

</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		props:{
			test:{
//				type:String,	这个可以不写
				required:true
			},
		},
		name:'orderchildren',
		components:{},
		data:function(){
			return{
				product:{},		//产品
//				productsku:[],		//规格
				Specifications:{},	//所选规格
				shop:{},			//店铺
				query:{},			//传递的参数
				//后面修改的
				findskusList:[],	//产品规格
			}
		},
		filters:{},
		methods:{
			//查看商品详细信息
			findProductIndex(){
//				console.log(this.query.c)
				http('post','/mall/mobile/product/findProductIndex',{'id':this.query.c},this.findProductIndex_returun);
			},
			findProductIndex_returun(x){
				console.log('查看商品详细信息',x);
				var this_1=this
				x.product.imagepath=x.product.imagepath=='' ? [] : x.product.imagepath.split(',');
				this.product=x.product;	//产品详情
				this.shop=x.shop;	//店铺

				
				var obj={};
					obj.number=this.query.q;		//数量
					
					obj.productId=this.query.c;		//当页产品 Id
					obj.skuId=this.query.s;			//规格Id
					obj.cartId=this.query.cartId ? this.query.cartId :'';	//购物项目Id 主要在购物车跳转到这里的提现
					if(this.Specifications.saleprice){	//如果规格存在
						//当前产品获得的Hb
						obj.giftTotal=this.query.q*this.Specifications.saleprice*this.product.scalenum/100;	
						//当页合计金额
						obj.Price=this.query.q*this.Specifications.saleprice;
					}else{
						//当页合计金额
						obj.Price=this.query.q*this.product.minsaleprice;
						//当前产品获得的Hb
						obj.giftTotal=this.query.q*this.product.minsaleprice*this.product.scalenum/100
					}
					
					console.log('当前产品的HB',obj.giftTotal);
				this.$emit('shoudao',obj);

			},
		},
		mounted:function(){
//			query:{				//url参数
//					c:'',			//产品Id
//					s:'',			//规格
//					q:0,			//购买数量
//				},
			this.query=this.test	//这个test是上面接收参数的那个。。其实可以不这样写。
			this.Specifications=this.query.s;
			this.findProductIndex();		//查看商品详细信息
			
			console.log(this.query)
		},
		created:function(){
		},
		watch:{
		
		}
	}
</script>

<style>
</style>