<template>
	<div id="BranchShop">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">新建分店</h1>
		</header>
		<div class="mui-content">
			
				<form @submit.prevent="form_1()" class="mui-input-group form_1">
					
					<div class="mui-input-row">
						<label>分店名</label>
						<input type="text" v-model="branch_shop.sonusername" required="" pattern=".*[^ ].*" class="mui-input-clear" placeholder="分店名"/>
						<span v-show="branch_shop.sonusername" v-on:click="clear('sonusername')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>地址</label>
						<input type="text" v-model="branch_shop.sonuseraddress" required="" pattern=".*[^ ].*" class="mui-input-clear" placeholder="分店地址">
						<span v-show="branch_shop.sonuseraddress" v-on:click="clear('sonuseraddress')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>账号<span v-show="existed" class="mui-pull-right err_1">账号已存在</span></label>
						<input type="text" v-on:blur="blur_1()" v-model="branch_shop.username" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" class="mui-input-clear" placeholder="电话号码"/>
						<span v-show="branch_shop.username" v-on:click="clear('username')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>密码</label>
						<input type="password" v-model="branch_shop.password" required="" pattern="^[0-9a-zA-Z]{6,15}" class="mui-input-clear" placeholder="6-15数字和字母组成"/>
						<span v-show="branch_shop.password" v-on:click="clear('password')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>确认密码</label>
						<input type="password" v-model="branch_shop.password_1" required="" pattern="^[0-9a-zA-Z]{6,15}" placeholder="6-15数字和字母组成"/>
						<span v-show="branch_shop.password_1" v-on:click="clear('password_1')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>管理员</label>
						<input type="text" v-model="branch_shop.administrator" class="mui-input-clear" placeholder="管理员姓名"/>
						<span v-show="branch_shop.administrator" v-on:click="clear('administrator')" class="mui-icon mui-icon-clear"></span>
					</div>
					<div class="mui-input-row">
						<label>手机号</label>
						<input type="text" v-model="branch_shop.phone" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" class="mui-input-clear" placeholder="常用联系电话"/>
						<span v-show="branch_shop.phone" v-on:click="clear('phone')" class="mui-icon mui-icon-clear"></span>
					</div>
					<!--<div class="mui-input-row mui-plus-visible">
						<label>Input</label>
						<input type="text" class="mui-input-speech mui-input-clear" placeholder="语音输入">
					</div>-->
					<!--<div class="mui-button-row">
						<button type="submit" class="mui-btn mui-btn-danger">确认</button>
						&nbsp;&nbsp;<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
					</div>-->
					<div class="btn_1">
						<button type="submit" class="mui-btn mui-btn-danger">确认</button>
					</div>
				</form>
		    
		</div>
		
	</div>
</template>

<script>
	import {http,dateFtt} from '@/assets/fc'
	export default{
		components:{
		},
		data:function(){
			return{
				existed:false,		//账号是否存在
				branch_shop:{
					'id':1		//总店铺Id
				},		//分店对象
			}
		},
		methods:{
			//删除输入框内容
			clear(x){
				this.branch_shop[x]='';
			},
			//添加子账号
			//mall/mobile/sonUser/addSonUser
			form_1(){
				if(this.existed){
					mui.toast('账号已存在！',{ duration:2000, type:'div' });
				}else if(this.password!=this.password_1){
					mui.toast('两次密码不正确！',{ duration:2000, type:'div' });
				}else{
					http('post','/mall/mobile/sonUser/addSonUser',this.branch_shop,this.add_renturn)
				}
			},
			add_renturn(x){
				console.log(x)
				if(x){
//					this.$router.go('-1');
					window.history.go(-1);
				}else{
					mui.toast('系统错误，请联系管理员！',{ duration:2000, type:'div' });
				}
			},
			//判断账号是否存在
			blur_1(){
				if(this.branch_shop.username){
//					console.log({'username':this.branch_shop.username})
					http('post','/mall/mobile/sonUser/isRepetition',{'username':this.branch_shop.username},this.updateSonUser);
				}
				
			},
			updateSonUser(x){
				console.log(x);
				this.existed=x;
			}
		},
		mounted:function(){
			//判断用户是否是商家
			var this_1=this;
			//判断用户是否是商家
			http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
			function isShop(x){
				console.log('判断用户是否是商家',x)
				if(x.success){
					this_1.branch_shop.id=x.message;
				}
			}
//			mui.init({
//				swipeBack: true //启用右滑关闭功能
//			});
		},
		created:function(){
			
		}
	}
</script>

<style>
	#BranchShop .form_1{
		font-size: 0.24rem;
	}
	#BranchShop .err_1{
		color: red;
		font-size: 0.24rem;
	}
	#BranchShop .form_1 input{
		font-size: 0.24rem;
	}
	#BranchShop .form_1 label{
		padding: 0px 15px;
		line-height: 40px;
	}
	#BranchShop .form_1 .btn_1{
	    padding:40px 0.24rem 0.42rem;
	    width: 100%;
	    background: #FFFFFF;	
	}
	
	#BranchShop .form_1 .btn_1 button{
		width: 100%;
    height: 0.88rem;
    background-color: #df3121;
    border-radius: 0.1rem;
    font-size: 0.36rem;
    line-height: 0px;
    letter-spacing: 0.03rem;
    color: #ffffff;
	}
	
	
	#BranchShop .mui-bar{
		background: #00a2e9;
	}
	#BranchShop .mui-bar a {
    	color: #FFFFFF;
	}
	#BranchShop .mui-title{
		color: #FFFFFF;
	}
</style>