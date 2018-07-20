<template>
	<div id="site">
		<header id="header" class="mui-bar mui-bar-nav">		
			<h1 class="mui-title">收货地址</h1>
			<button class="mui-action-back mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left">
				<span class="mui-icon mui-icon-left-nav"></span>
			</button>
			<router-link to="/addres">
				<button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">新增</button>
			</router-link>
			
		</header>
		<div class="content" >
			<div class="address clear" v-for="(item,index) in data">
				<div class="add_left">
					<div class="add_img">
						<img :src="item.isdefault==true? 'static/img/finish_06.jpg':'static/img/xuenzhe2.png'" @click="defaults(item)" />
					</div>
					<div class="address_content">
							<p class="p1">{{item.shipto}}</p>
							<p class="p2">{{item.address}}</p>
					</div>
				</div>
				<div class="add_right clear">
					<div class="phone clear">
						<span>{{item.phone}}</span>
					</div>
					<div class="btn">
						<router-link :to="'/edit/'+item.ids">
							<button type="button" class="mui-btn mui-btn-primary mui-btn-outlined">修改地址</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from "jquery"
	export default{
		components:{},
		data:function(){
				return{
					name:"",
					sid:"",
					data:[]
					
				}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},	
			beforeCreate: function(){
       			 document.getElementsByTagName("body")[0].className="background";
			},
			//修改默认收货地址
			defaults:function(item){
				console.log(item)
				
				mui.toast('修改默认地址成功!')
			}
		 },
		 created:function(){
		 		var ids = localStorage.getItem("ids");
		 		this.sid=ids;
		 		
		 		var sid = this.sid;
		 		var _this=this;
		 		console.log(sid);
		 		$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/sysShippingAddress/addressList?uId="+sid,
//					async:true,
					data:{},
					success:function(res){
						console.log(res)
						_this.data=res.data;
					},
					error:function(res){
						console.log("失败");		
					}
				});
		}
	}
</script>

<style>
	#site{width:100%;height:100%;background-color:#efeff4;}
	#site header{background-color:#00a2eb;color:white;;}
	#site header .mui-icon-left-nav,#site header .mui-title,#site header .mui-pull-right{color:white;}
	#site .content{margin-top:55px;}
	#site .content .address{border-bottom: 1px solid #c7c7c7;height:2rem;background-color:white;margin-top:0.1rem;}
	#site .content .address .add_left,#site .content .address .add_right{float: left;width:50%;height:100%;}
	#site .content .address .add_left .add_img img{width:0.45rem;height:0.45rem;}
	#site .content .address .add_left .address_content{width:75%;padding:0.28rem 0;box-sizing: border-box;}
	#site .content .address .add_left .add_img{width:25%;text-align: center;height:100%;line-height:2rem;}
	#site .content .address .add_left .add_img,#site .content .address .add_left .address_content{float: left;}
	#site .content .address .address_content p{margin-bottom:0;}
	#site .content .address .address_content .p1{color:#2b2c30;}
	#site .content .address .address_content .p2{color:#464648;margin-top:0.2rem;overflow: hidden;height: 0.9rem;}
	#site .content .address .address_content{height:2rem;overflow: hidden;}
	#site .content .address .add_right{padding:0.28rem 0.28rem 0.28rem 0;box-sizing: border-box;}
	#site .content .address .add_right>div{width:100%;}
	
	#site .content .address .add_right span{display: inline-block;float: right;}
	#site .content .address .add_right button{margin-top:0.2rem;float: right;}
	#site .content .address .add_right .phone{}
	#site .content .address .add_right .phone{color:#5d5d5f;} 
	
</style>