<template>
	<div id="Extension">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">推广</h1>
		</header>
		<div class="mui-content">
		    <img :src="imgurl"/>
		</div>
		
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		name:'',
		data:function(){
			return{
				imgurl:'',		//商铺推广二维码		
				shopid:'',		//店铺Id
				userId: localStorage.ids ? localStorage.ids :''
			}
		},
		methods:{
			
		},
		mounted(){
			var this_1=this;
			//判断是否是商家
			http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':this_1.userId},isShop);
			function isShop(x){
				console.log('判断是否是商家',x)
				if(x.success){
					var obj=new Object();
						obj.id=x.message;
						obj.type=2;	//0：星级代理  1：区域代理  2：商家 
						obj.fixurl='http://m.hzjifen.com/shops/dist/index.html#/bill?type=2&Inviterid='+x.message;
					http('post','/agent/manager/area/getSellerEncode',obj,shop_QR_code);
					function shop_QR_code(x){
						console.log('获取商家二维码',x)
						this_1.imgurl = x.data.url;
					}
				}
			}
		},
		created(){
			
		}
	}
</script>

<style>
	#Extension{
		/*height: 100%;
		background-image: url('http://img4.imgtn.bdimg.com/it/u=3049972999,3977498707&fm=27&gp=0.jpg');
		background-size:cover ;
		background-position: center;*/
	}
	#Extension img{
		width: 100%;
	}
</style>