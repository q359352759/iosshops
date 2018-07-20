<template>
	<div>
		<div id="sao">
			<!--<header>
			<span @click="go"> < &nbsp;返回</span>
			</header>-->
			<img :src="url" />
			<p>商家扫码，赠送HB</p>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc'
	export default{
			components:{
			
			},
			data:function(){	
				return{
					url:""
				}
			},
			methods:{
				go:function(){
					this.$router.go(-1)
				}
			},
			mounted:function(){
				//获取用户二维码信息
		    	var _this=this
		    	
		    	var personal_obj=new Object();
					personal_obj.id=localStorage.getItem("ids");
					personal_obj.type=4;
//					personal_obj.fixurl='http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?type=4&Inviterid='+this.userId;
					personal_obj.fixurl=0
				http('post','/agent/manager/area/getSellerEncode',personal_obj,personal_QR_code);
				function personal_QR_code(x){
					console.log('个人二维码',x)
					_this.url = x.data.url;
				}
			}
		    

	}
</script>

<style>
	
	#sao{text-align: center;position:fixed;z-index:20;left:1.4rem;top: 20%;width:5rem;height:5rem;background-color:white;}
	/*#sao header span{position: absolute;left:6%;top:4%;}*/
	#sao img{width:4.27rem;height:4.27rem;margin-top:0.2rem;}
	#sao p{font-size:0.3rem;color:#000000;}
	
</style>