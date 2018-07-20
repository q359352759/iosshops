<template>
	<div id="collect-money">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">收钱</h1>
		</header>
		<div class="mui-content">
		    <div class="content">
				<p>
					<span>{{show_type==0 ? '个人二维码' :'商家二维码'}}</span>
				</p>
				<div class="img">
					<img :src="personal_url" v-if="show_type==0"/>
					<img :src="business_url" v-if="show_type==1"/>
					<p>{{show_type==0 ?'收款功能暂未开发' :'扫码领取红包或付款'}}</p>
				</div>
				<div class="content_img"></div>
				<ul class="footeer_1">
					<li @click="change_show_type(0)" :class="{'active':show_type==0}">个人二维码</li>
					<li @click="change_show_type(1)" v-if="isShop" :class="{'active':show_type==1}">商家二维码</li>
				</ul>
			</div>
		</div>
		<pay></pay>
	</div>
</template>

<script>
	import pay from './pay'
	import $ from 'jquery'
	import {http} from '@/assets/fc'
	export default{
			components:{
				pay
			},
			data:function(){	
				return{
					personal_url:"",
					userId:localStorage.getItem("ids"),
					isShop:false,	//判断给用户是否是商家
					userInfo:{},		//用户基本信息
					business_url:'',		//图片雷彪
					show_type:0			//0表示个人1表示商家
				}
			},
			methods:{
				change_show_type(x){
					this.show_type=x
				},
				
			},
			mounted:function(){
//				mui.toast('扫描成功即将自动跳转','标题',{ duration:'long',top:'100px'})
				//获取用户二维码信息
				var _this=this
				//获取个人二维码
				var personal_obj=new Object();
					personal_obj.id=this.userId;
					personal_obj.type=4;	//0：星级代理  1：区域代理  2：商家 
//					personal_obj.fixurl='http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?type=4&Inviterid='+this.userId;
					personal_obj.fixurl=0;
				http('post','/agent/manager/area/getSellerEncode',personal_obj,personal_QR_code);
				function personal_QR_code(x){
					console.log('个人二维码',x)
					_this.personal_url = x.data.url;
				}
				
				//判断用户是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':this.userId},isShop);
				function isShop(x){
					console.log('判断用户是否是商家',x);
					_this.isShop=x.success
					if(x.success){
						_this.show_type=1
						var obj=new Object();
							obj.id=x.message;
							obj.type=2		//0：星级代理  1：区域代理  2：商家 
							obj.fixurl='http://m.hzjifen.com/shops/dist/index.html#/bill?type=2&Inviterid='+x.message;
							console.log(obj)
						http('get','/agent/manager/area/index',obj,get_Shop_img)
					}
				}
				function get_Shop_img(x){
					console.log('获取商家二维码',x);
					_this.business_url=x.data.url
				}
//				mui.alert('扫描成功1秒后自动跳转','','确定',function(){
//					this_1.$router.push({path:'/bill'});
//				},'div')
			},
			beforeCreate:function(){
       			 document.getElementsByTagName("body")[0].className="background";
		    },
		    beforeDestroy:function(){
		        document.body.removeAttribute("class","background");
		    }
	}
</script>
<style>
	#collect-money .mui-bar-nav{
		background-color: #00a2e9;
		box-shadow: none;
	}
	#collect-money .mui-bar-nav .mui-title{
		color: #ffffff;
	}
	#collect-money .mui-bar-nav .mui-icon{
		color: #ffffff;
	}
	#collect-money{
		height: 100%;
		background: #00a2eb;
	}
	#collect-money .mui-content{
		background: #00a2eb;
		position: relative;
	}
	#collect-money header{background-color:#00a2eb;width:100%;height:0.84rem;color:#FFFFFF;text-align: center;line-height:0.84rem;margin:0 auto;}
	#collect-money header span{float: left;margin-left:0.4rem;font-size:0.18rem;color:white;}
	#collect-money header i{color:white;}
	#collect-money .content .footeer_1{
		position: absolute;
		width: 100%;
		bottom: 0px;
		left: 0px;
		display: flex;
		justify-content: space-around;
		padding: 0.2rem 0px 0.5rem;
		color: #777575;
	}
	#collect-money .content .footeer_1 li.active{
		color: #00a2eb;
	}
	#collect-money .content{
		position: relative;
		width:90%;height:8.35rem;border-radius:0.08rem;background-color:white;margin:0 auto;text-align: center;
	}
	#collect-money .content p:nth-child(1){font-size:0.3rem;color:#909090;height:2.18rem;line-height:2.18rem;margin-bottom:0px}
	#collect-money .content img{width:3.81rem;height:3.81rem;margin:0 auto;}
	#collect-money .content_img span{display: inline-block;}
	#collect-money .content_img{font-size:0.3rem;color:#2d8dc7;}
	#collect-money .content_img em{margin:0 0.8rem;color:#d1d1d1;}
	#collect-money .content_img p{color:#2d8dc7;}

</style>