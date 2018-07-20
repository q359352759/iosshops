<template>
	<div id="Orders">
		
		<ul v-if="!address.address" class="mui-table-view address_1">
		        <li class="mui-table-view-cell">
		            <a href="#/site" class="mui-navigate-right">
		                还没有收货地址请前往添加
		            </a>
		        </li>
		</ul>
		

			<ul v-if="address.address" class="box_1" @click="open_1(true)">
				<li><i class="mui-icon mui-icon-location"></i></li>
				<li>
					<div class="mui-pull-right">{{address.phone}}</div>
					<div>
						收货人：{{address.shipto}}
					</div>
					<div>收货地址：{{address.address}}</div>
					<div></div>
				</li>
				<li>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>

		
		<ul>
			<orderchildren v-for="x in list" v-bind:test="x"></orderchildren>
		</ul>
		
		<!--<ul>
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
		</ul>-->
		
			<ul class="mui-table-view box_3">
		        <li class="mui-table-view-cell">
		            	<span>消费方式</span>
		            	<div class="mui-pull-right input_1">
		            		<select name="">
		            			<option value="1">现金卷</option>
		            			<option value="2">HB</option>
		            		</select>
		            	</div>
		        </li>
		        <li class="mui-table-view-cell">
		           	获得HB
		           	<span class="mui-pull-right">{{product.hbnum}}</span>
		        </li>
		        <li class="mui-table-view-cell">
		        	支付方式
		        	<div class="mui-pull-right input_1">
		        		<select name="">
		        			<option value="1">在线支付</option>
		        			<option value="2">到店付款</option>
		        		</select>
		        	</div>
		        </li>
		    </ul>
		
		<ul class="footer">
			<li>共<span>{{query.q}}</span>件，总金额 <span>￥{{query.q*Specifications.saleprice}}</span></li>
			<li>提交订单</li>
		</ul>
		
		<div class="address_list" :class="{'active':open_address}">
			<header>
				<i @click="open_1(false)" class="mui-icon mui-icon-arrowleft"></i>
				管理收货地址
			</header>
			<ul class="cnentent_1">
				<li @click="change_address(x)" v-for="x in address_list" :class="{'active':x==address}">
					<div class="left_1">
						<div>
							收货人：{{x.shipto}}<span class="mui-pull-right">{{x.phone}}</span>
						</div>
						<div>{{x.address}}</div>
					</div>
					<div class="right_1"> <i class="mui-icon mui-icon-checkmarkempty"></i></div>
				</li>
			</ul>
			<a href="#/addres" class="footer_1">
				新增收货地址
			</a>
		</div>
	</div>
</template>

<script>
	import orderchildren from '@/components/Order_children' 
	import {http} from '@/assets/fc';
	export default{
		components:{
			orderchildren
		},
		data:function(){
			return{
				uerid:localStorage.ids,
				open_address:false,		//是否显示收货地址列表
				address:{},			//收货地址
				query:{				//url参数
					c:'',			//产品Id
					s:'',			//规格Id
					q:0,			//购买数量
				},
				product:{},			//产品
//				productsku:[],		//规格
				Specifications:{},	//所选规格
				shop:{},			//店铺
				address_list:[],		//收货地址激活
				list:JSON.parse(sessionStorage.commodity0516)
			}
		},
		filters:{},
		methods:{
			//打开选择收货地址
			open_1(x){
				this.open_address=x
			},
			//选择地址
			change_address(x){
				this.address=x
				this.open_address=false
			},
			//查询用户收货地址的方法
			lookDefault(){
				http('post','/platform/sysShippingAddress/lookDefault',{'uId':localStorage.ids},this.lookDefault_return)
			},
			lookDefault_return(x){
				console.log('获取用户的收货地址',x);
//				this.address=x.data;
			},
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
			},
			//获取收货地址
			addressList(){
				http('post','/platform/sysShippingAddress/addressList?uId='+this.uerid,'',this.addressList_return)
			},
			addressList_return(x){
				console.log('收货地址',x);
				var this_1=this
				this.address_list=x.data;
				if(x.data.length>1){
					this.address=x.data[0];
					for(var i=0;i<x.data.length;i++){
						if(x.data[i].isdefault){
							this_1.address=x.data[i];
						}
					}
				}
				
			}
		},
		mounted:function(){
			var this_1=this
//			this.query:{			//url参数
//					c:'',		//产品Id
//					s:'',		//规格Id
//					q:0,		//购买数量
//				},
//			this.query=this.$route.query;
//			this.list=[this.$route.query]
//			this.lookDefault();				//查询用户收货地址的方法
//			this.findProductIndex();		//查看商品详细信息
			this.addressList();				//收货地址
			
			
		},
		created:function(){
			
		},
	}
</script>

<style>
	#Orders{
		font-size: 0.28rem;
	}
	
	#Orders .address_list{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 100%;
		top: 0px;
		background: #FFFFFF;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
	}
	#Orders .address_list.active{
		left: 0px;
	}
	#Orders .address_list header{
		position: relative;
		height: 44px;
		line-height: 44px;
		text-align: center;
		border-bottom: 1px solid #CCCCCC;
		z-index: 1;	
	}
	#Orders .address_list header i{
		position: absolute;
		top: 9px;
		left: 9px;
	}
	#Orders .address_list .cnentent_1{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		padding: 44px 0px 44px;
		overflow: auto;
	}
	#Orders .address_list .cnentent_1>li{
		display: flex;
		padding: 15px;
		border-bottom: 1px solid #CCCCCC;
		color: #5e6b85;
	}
	#Orders .address_list .cnentent_1>li.active{
		background: #5e6b85;
		color: #FFFFFF;
	}
	#Orders .address_list .cnentent_1>li.active .right_1 i{
		display: inline-block;
	}
	#Orders .address_list .cnentent_1>li .left_1{
		flex-grow: 1;
	}
	#Orders .address_list .cnentent_1>li .left_1>div:nth-child(1){
		font-size: 0.32rem;
	}
	#Orders .address_list .cnentent_1>li .left_1>div:nth-child(2){
		font-size: 0.24rem;
	}
	#Orders .address_list .cnentent_1>li .right_1{
		width: 50px;
		text-align: center;
	}
	#Orders .address_list .cnentent_1>li .right_1 i{
		font-size: 50px;
		width: 30px;
		height: 30px;
		line-break: 30px;
		display: none;
	}
	
	#Orders .address_list .footer_1{
		position: absolute;
		width: 100%;
		height: 44px;
		bottom: 0px;
		left: 0px;
		line-height: 44px;
		text-align: center;
		background: #f50;
		color: #FFFFFF;
	}
	
	
		
	#Orders .address_1{
		margin-bottom: 0.2rem;
	}
	
	#Orders .footer{
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 1.1rem;
		display: flex;
		line-height: 1.1rem;
		border-top: 1px solid #CCCCCC;
		background: #FFFFFF;
	}
	#Orders .footer>li:nth-child(1){
		flex-grow: 1;
		text-align: right;
		padding: 0px 10px 0px 0px;
	}
	#Orders .footer>li:nth-child(1)>span{
		font-size: 0.32rem;
		color: #f50;
		font-weight: bold;
	}
	#Orders .footer>li:nth-child(2){
		background: #f50;
		color: #FFFFFF;
		padding: 0px 22px;
		font-size: 0.32rem;
	}
	
	#Orders .box_3 .input_1 select{
		margin: 0px;
		padding: 0px;
		border: none;
		-webkit-appearance: menulist;
		-moz-appearance: menulist;
		appearance: menulist;
	}
	
	
	#Orders .box_2{
		background: #FFFFFF;
		color: #666666;
		margin: 0px 0px 0.2rem 0px;
	}
	#Orders .box_2>header{
		padding: 9px;
		font-size: 0.28rem;
	}
	#Orders .box_2 .content_1{
		display: flex;
		background: #f5f5f5;
		padding: 9px;
	}
	#Orders .box_2 .content_1 .img_box{
		width: 1.8rem;
		min-width: 1.8rem;
		height: 1.8rem;
		margin: 0px 9px 0px 0px;
	}
	#Orders .box_2 .content_1 .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#Orders .box_2 .content_1 .text_1{
		flex-grow: 1;
	}
	#Orders .box_2 .content_1 .text_1>div:nth-child(2){
		font-size: 0.26rem;
		margin: 3px 0px 0px 0px;
		color: #adadad;
	}
	#Orders .box_2 .content_1 .right_1{
		margin: 0px 0px 0px 6px;
		white-space: nowrap;
		text-align: right;
	}
	#Orders .box_2 .content_1 .right_1>div:nth-child(1){
		color: #f50;
		font-weight: bold;
		font-size: 0.32rem;
	}
	#Orders .box_2 .input_1{
		display: flex;
		padding: 0px 15px;
		height: 40px;
		line-height: 40px;
	}
	#Orders .box_2 .input_1>div:nth-child(2){
		flex-grow: 1;
	}
	#Orders .box_2 .input_1 input{
		margin: 0px ;
		padding: 0px;
		border: none;
		font-size: 0.28rem;
		height: 40px;
	}
	
	
	#Orders .box_1{
		padding: 15px 9px;
	    margin-bottom: 9px;
	    background-color: #fff;
	    -webkit-box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
	    -ms-box-shadow: 0 1px 0 0 rgba(0,0,0,.2),0 .5px 0 0 rgba(0,0,0,.3);
	   	box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
	   	display: flex;
	}
	#Orders .box_1>li:nth-child(1),
	#Orders .box_1>li:nth-child(3){
		display: flex;
		align-items: center;
	}
	#Orders .box_1>li:nth-child(2){
		flex-grow: 1;
		padding:0px 5px;
		font-size: 0.3rem;
		color: #666666;
	}
	
	
	
	
</style>