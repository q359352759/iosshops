<template>
	<div id="shopping_cart">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">购物车</h1>
		</header>
		<!--全部购物车-->
		<div class="content" v-for="(item,index) in data" v-if="data">
			<div class="heade clear">
				<div class="heade_l">
					<!--<img id="" src="" />-->
					<span @click="go(item.gId)">{{item.gName}}     ></span>		
				</div>
			</div>
			<div class="item clear" v-for="(items,indexs) in item.product">
				
				<div class="img_add">
					<i class="iconfont icon-choose" :class="{active:items.nowindex}" @click="check_add(items.count,items.price,items)">
						<i class="iconfont icon-selected" :class="{colors:items.nowindex}"></i>
					</i>
				</div>
				<div class="right">
					<div class="right_t clear">
						<div class="right_t_l">
							<p>{{items.productName}}</p>
							<span>赠送HB:{{items.hbNum}}</span>
						</div>
						<div class="right_t_r clear">
							<div class="right_t_r_r clear">
								<p>￥{{items.price}}</p>
								
								<span>x{{items.count}}</span>
								<br />
								<img src="@/assets/img/shopcartdelect.png" @click="shop_delect(items.count,items.productId,items.id)" />
							</div>
						</div>
					</div>
					<div class="right_b">
						<div class="mui-numbox">
							<button class="mui-btn mui-btn-numbox-minus" type="button" @click="reduce(items.count,items.productId,items.id,items,items.price)">-</button>
							<input class="mui-input-numbox" v-model="items.count" type="number">
							<button class="mui-btn mui-btn-numbox-plus" type="button"  @click="add(items.count,items.productId,items.id,items,items.price)">+</button>
						</div>
					</div>
				</div>
				<div class="left">
					<a :href="'#/commodity/?id='+items.id">
						<img v-if="!items.skuId.showpic" :src="items.imgUrl" />
						<img v-if="items.skuId.showpic" :src="items.skuId.showpic" />
					</a>
				</div>
			</div>
		</div>
		<div class="add_shopping" v-if="data">
			<div class="add_left">
				<img :src="url" @click="check"  />
				<span>全选</span>
			</div>
			<div class="add_right">
				<div class="heji">
					合计:<span>￥{{close}}</span>
				</div>
				<div class="jieshuan" @click="indent">
					结算({{total}})
				</div>
			</div>
		</div>
		<center>
			<div class="shop_none" v-if="!data">
				<span>暂无商品哟！</span>
				<router-link to="/Shopping">
						去选购
				</router-link>
			</div>
		</center>
	</div>
</template>

<script>
	import $ from "jquery"
	import {axios,ajaxs} from '@/assets/fc'
	export default{
		components:{},
		data:function(){
			return{
				url:"static/img/xuenzhe2.png",
				url_add:"static/img/xuenzhe2.png",
				num:1,
				data:[],
				nowindex:false,
				total:0,
				close:0,
				this_obj:{},		
			}
		},
		methods:{
			//进店看看	
			go(id){
				this.$router.push('/ShopDetails?id='+id);
			},
			//删除购物车商品
			
			shop_delect:function(count,productId,id){
				var userId =localStorage.getItem("ids")
			 	//var userId ="d78aeeff14e84675a16048e8599d6ac8";
				var id = id;
				var count = count;
				var productId = productId;
				var data = {
					userId:userId,
					operator:2,
					id:id,
					count:count
				}
				
				ajaxs("post",liupeilin_ip+"/mall/mobile/shoppingCart/cart",{data:JSON.stringify(data)},this.delects)

			},
			delects:function(res){
					var _this = this;
					if(res.success){		 
						var userId =localStorage.getItem("ids")
		 				//var userId ="d78aeeff14e84675a16048e8599d6ac8";
		 				//获取用户购物车列表
		 				mui.toast("删除商品成功！")
		 				ajaxs("get",liupeilin_ip+"/mall/mobile/shoppingCart/"+userId,'',_this.order)
					}
			},
			order:function(res){
				for (var i = 0; i < res.length; i++) {
					var product=res[i].product;
					for(var k=0;k<product.length;k++){
						
						if (typeof product[k].skuId == 'string') {
				            try {
				                product[k].skuId=JSON.parse(product[k].skuId);
				            } catch(e) {
				            	product[k].skuId='';
				            }
				        };	
					}
				}
				this.data = res
				console.log('获取购物车信息',res);
			},
			//商品全选
			check:function(){
				var _this=this;
				if(this.url=="static/img/xuenzhe2.png"){
					this.url="static/img/finish_06.jpg"
				}else{
					this.url="static/img/xuenzhe2.png"				
				}
				var res = this.data;
				for(var i=0;i<res.length;i++){
					for(var j=0;j<res[i].product.length;j++){
						if(_this.url=="static/img/xuenzhe2.png"){
							if(res[i].product[j].nowindex == true){
								res[i].product[j].nowindex = false;			
								_this.total=0;
								_this.close=0;
							}else{
								res[i].product[j].nowindex = false;			
								_this.total=0;
								_this.close=0;
								
							}
						}else{
							if(res[i].product[j].nowindex == false){
								res[i].product[j].nowindex = true;
								_this.total+=res[i].product[j].count;
								_this.close+=res[i].product[j].price*res[i].product[j].count
							}else{
								res[i].product[j].nowindex = true;
								_this.total+=res[i].product[j].count;
								_this.close+=res[i].product[j].price*res[i].product[j].count
								
							}
						}
						

					}
				}
				this.data = res;
			},
			check_add:function(count,price,items){
				this.$set(items, 'nowindex', !items.nowindex);
				if(items.nowindex){
					this.close+=price*count;
					this.total+=count;
				}else if(!items.nowindex){
					this.close-=price*count;
					this.total-=count;
				}
				var res = this.data;
				var _this = this;
				var length = 0;
				var length1 = 0;
				for(var i=0;i<res.length;i++){
					for(var j=0;j<res[i].product.length;j++){
						if(res[i].product[j].nowindex == true){
							length++;
						}
						length1++;
					}
				}
				length == length1 ? _this.url = 'static/img/finish_06.jpg':_this.url = 'static/img/xuenzhe2.png'	
			},
			count:function(res){
				var userId =localStorage.getItem("ids")
			 	//var userId ="d78aeeff14e84675a16048e8599d6ac8";
			 	//获取用户购物车列表
			 	ajaxs("get",liupeilin_ip+"/mall/mobile/shoppingCart/"+userId,'',this.order)
			},
			reduce:function(count,productId,id,items,price){
				var productId = productId;
				this.this_obj = count;
				var res = this.data;
				var _this = this;
				var price = price;
				if(count==1){
					mui.toast("不能再减少了哟！")
					return;
				}else if(count>1){
					var count = --count
					var data={
						//userId:"d78aeeff14e84675a16048e8599d6ac8",
						userId:localStorage.getItem("ids"),
						operator:1,
						id:id,			
						count:count,
					}
					for(var i=0;i<res.length;i++){
						for(var j=0;j<res[i].product.length;j++){							
							if(res[i].product[j].nowindex == true){
								_this.total=_this.total-1;
								_this.close=_this.close - price;
								break
							}
						}
					}
					ajaxs("post",liupeilin_ip+"/mall/mobile/shoppingCart/cart",{data:JSON.stringify(data)},_this.update)

				}
			},
			add:function(count,productId,id,items,price){
				var productId = productId;
				var count = count;
				var id = id;
				var res = this.data;
				var _this = this;
				var price = price;
//				if(items.nowindex){
//					this.close+=price*count;
//					this.total= ++count;
//				}else if(!items.nowindex){
//					this.close-=price*count;
//					this.total= --count;
//				}
				var counts = count
				counts++;
				var data={
						//userId:"d78aeeff14e84675a16048e8599d6ac8",
						userId:localStorage.getItem("ids"),
						operator:1,
						id:id,			
						count:counts,
					}		
					for(var i=0;i<res.length;i++){
						for(var j=0;j<res[i].product.length;j++){							
							if(res[i].product[j].nowindex == true){
								_this.total=_this.total+1;
								_this.close=_this.close + price;
								break
							}
						}
					}
					ajaxs("post",liupeilin_ip+"/mall/mobile/shoppingCart/cart",{data:JSON.stringify(data)},this.update)
			},
			update(x){
				var this_1=this;
				var userId =localStorage.getItem("ids")
			 	//var userId ="d78aeeff14e84675a16048e8599d6ac8";
			 	//获取用户购物车列表
			 	ajaxs("get",liupeilin_ip+"/mall/mobile/shoppingCart/"+userId,'',order);
			 	function order(y){
					this_1.data =$.extend(true,this_1.data,y);
			 	}
			},
			indent:function(){
				var total =this.total;
				var close =this.close;
				if(close && total){
					var arr=[];
					var data=this.data
//			{c:产品id,
//			s:规格,
//			q:购买数量
//			cartId:''	//购物项id 没有就不传
//			},
					for(var k1 in data){
						var data_1=data[k1].product;
						for(var k_2 in data_1){
							if(data_1[k_2].nowindex){
								var obj={}
									obj.c=data_1[k_2].productId;
									obj.s=data_1[k_2].skuId;
									obj.q=data_1[k_2].count;
									obj.cartId=data_1[k_2].id;
								arr.push(obj);
							}
						}
					}
//					console.log(arr);
					sessionStorage.commodity0516=JSON.stringify(arr)
					this.$router.push('/Orders');
				}else{
					mui.toast("请选择商品哟！")
				}
			}
		 },
		 mounted:function(){
		 	var userId =localStorage.getItem("ids")
		 	//var userId ="d78aeeff14e84675a16048e8599d6ac8";
			
		 	//获取用户购物车列表
		 	ajaxs("get",liupeilin_ip+"/mall/mobile/shoppingCart/"+userId,'',this.order)
		 	
		 
		 	
		 }
	}
</script>

<style>
	#shopping_cart .mui-bar-nav{background-color:#00a2ea;}
	#shopping_cart .shop_none a{color:red;}
	#shopping_cart .shop_none{margin-top:50%;}
	#shopping_cart .times{position: absolute;bottom:8%;left:2%;color:#5e5e5e;font-size: 0.2rem;}
	#shopping_cart a{color:white;}
	#shopping_cart p{margin-bottom:0;}
	#shopping_cart h1{color:white;}
	#shopping_cart nav{margin-top:44px;background-color:white;height:0.8rem;border-bottom: 1px solid #e5e5e5;}
	#shopping_cart nav ul li{float: left;width:20%;text-align: center;line-height:0.8rem;}
	#shopping_cart nav ul li a{color:#403f44;padding-bottom: 0.1rem;}
	#shopping_cart .img_add{position: relative;}
	#shopping_cart .content .img_add .icon-choose{width:0.5rem;height:0.5rem;position: absolute;top:0.55rem;left:-0.55rem;font-size:0.5rem;}
	#shopping_cart .content .img_add .icon-selected{position: absolute;left:0;top: 0;font-size:0.5rem;}
	#shopping_cart .content .img_add .active{background-color:#44c52d;border-radius: 50%;border-color: #44c52d;}
	#shopping_cart .content .img_add .colors{color:white;}
	
	#shopping_cart .active{border-bottom: 3px solid #ff4a04;color: #44c52d;}
	#shopping_cart:nth-child(1){margin-top:44px;}
	#shopping_cart .content{padding:10px 35px;background-color: white;position: relative;}
	#shopping_cart .content .heade{width:100%;height:0.9rem;line-height:0.9rem;}
	#shopping_cart .content .heade .heade_l span{color:#5e5e5e;font-size:0.3rem;}
	#shopping_cart .content .heade .heade_l img{width:0.5rem;height:0.5rem;vertical-align: middle;margin-right:0.08rem;}
	#shopping_cart .content .heade .heade_r{float: right;color:#ff7e26;font-size:0.3rem;}
	#shopping_cart .content .heade .heade_l{float: left;}
	#shopping_cart .content .item{width:100%;}
	#shopping_cart .content .item .left{width:30%;float: right;}
	#shopping_cart .content .item .left img{width:1.55rem;height:1.55rem;}
	#shopping_cart .content .item .right{width:70%;float:right;}
	#shopping_cart .content .item .right .right_t_l{width:70%;float: left;}
	#shopping_cart .content .item .right .right_t_l p{overflow:hidden;height:0.75rem;text-overflow: ellipsis;} 
	#shopping_cart .content .item .right .right_t_l span{color:#ad505b;border:1px solid #ad505b;border-radius: 0.05rem;font-size:0.3rem;margin-top:0.05rem;}
	#shopping_cart .content .item .right .right_t_r{width:30%;float: left;}
	#shopping_cart .content .item .right .right_t_r img{width:0.5rem;height:0.5rem;}
	#shopping_cart .content .item .right .right_t_r .right_t_r_r{float: right;color:#a1a1a1;}
	#shopping_cart .content .item .right .right_t_r span{float: right;margin-top:0.05rem;}
	#shopping_cart .right_b{margin-top:0.2rem;float: right;margin-bottom:0.25rem;}
	#shopping_cart .right_b button{float: right;}
	#shopping_cart .right_b .ri{margin-right:0.1rem;}
	#shopping_cart .add_shopping{
		display: flex;
		position: fixed;bottom: 0;left:0;z-index:3;width:100%;height:1.45rem;border-bottom:1px solid #dddddd;background-color:white;
	}
	#shopping_cart .add_shopping .add_left,
	#shopping_cart .add_shopping .add_right{float: left;width:50%;line-height:1.45rem;}
	#shopping_cart .add_shopping .add_left{padding-left:0.25rem;box-sizing: border-box;}
	#shopping_cart .add_shopping .add_left span{color:#6a6a6a;}
	#shopping_cart .add_shopping .add_left img{width:0.62rem;height:0.62rem;vertical-align: middle;margin-right:0.2rem;}
	#shopping_cart .add_shopping .add_right .jieshuan{float: left;width:40%;text-align: center;white-space:nowrap;}
	#shopping_cart .add_shopping .add_right .heji{float: left;width:60%;text-align: center;white-space:nowrap;}
	#shopping_cart .add_shopping .add_right .jieshuan{background-color: #ff7f00;color:white;}
	#shopping_cart .add_shopping .add_right .heji span{color:#ff6701;}
	#shopping_cart .right_t_r_r p{color:#f60;}
	
	.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>