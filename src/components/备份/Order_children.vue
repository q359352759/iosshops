<template>

		<li class="box_2">
				<header>{{shop.shopname}}</header>
				<div class="content_1">
					<div class="img_box">
						<img :src="Specifications.showpic"/>
					</div>
					<div class="text_1">
						<div>{{product.productname}}</div>
						<div>规格：<span>{{Specifications.color}} {{Specifications.size}}</span></div>
					</div>
					<div class="right_1">
						<div>￥{{Specifications.saleprice}}</div>
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
			}
		},
		filters:{},
		methods:{
			//查看商品详细信息
			findProductIndex(){
				console.log(this.query.c)
				http('post','/mall/mobile/product/findProductIndex',{'id':this.query.c},this.findProductIndex_returun);
			},
			findProductIndex_returun(x){
				console.log('查看商品详细信息',x);
				var this_1=this
				this.product=x.product;				//产品详情
				for(var key in x.productsku){
					if(x.productsku[key]['id']==this_1.query.s){
						this_1.Specifications=x.productsku[key]
					}
				}
				this.shop=x.shop;
				var obj={};
					obj.number=this.query.q;		//数量
					obj.Price=this.query.q*this.Specifications.saleprice;		//当页合计
					obj.productId=this.query.c;		//当页产品 Id
					obj.skuId=this.query.s;			//规格Id
					obj.cartId=this.query.cartId ? this.query.cartId :'';	//购物项目Id 主要在购物车跳转到这里的提现
					obj.giftTotal=this.query.q*this.product.hbnum;	//当前产品获得的Hb
					console.log('当前产品的HB',obj.giftTotal);
				this.$emit('shoudao',obj);
			},
		},
		mounted:function(){
//			query:{				//url参数
//					c:'',			//产品Id
//					s:'',			//规格Id
//					q:0,			//购买数量
//				},
			this.query=this.test	//这个test是上面接收参数的那个。。其实可以不这样写。
			this.findProductIndex();		//查看商品详细信息
			
		},
		created:function(){
		},
		watch:{
		
		}
	}
</script>

<style>
</style>