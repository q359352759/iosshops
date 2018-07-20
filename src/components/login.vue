<template>
	<div id="login">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="go"></a>
		    <h1 class="mui-title">登录</h1>
		</header>
		<div class="from">
			<center>
	        	<form id="login-form" autocomplete="off" method="post" @submit.prevent="login()" style="display:block">
	        		
	           		<div class="input">
	           			<input id="userName" v-model="phone" required="required"  type="text" name="" placeholder="账户/手机号" />
	           			<input id="password" v-model="pwd" required="required"  min="6" max="16" type="password" name="" placeholder="密码" />
	           		</div>
	           		<input type="submit" value="登录" class="btn">
	           		<ul class="ThirdParty">
						<li><i @click="Three_party_login()" class="icon iconfont icon-weixin"></i></li>
					</ul>
					<ul class="subline">
					    <li>
					    	<router-link to="/forgetpassword">
					    		<a>忘记密码？</a>
					    	</router-link>
					    </li>
					    <li>|</li>
					    <li>
					    	<router-link to="/register">
					    		<a href="">立即注册   ></a>
					    	</router-link>	
					    </li>	
					</ul>
				</form>
			</center>
			
		</div>		
	</div>
</template>
<script>
	import $ from "jquery"
	import {ajaxs,http} from '@/assets/fc'
	export default{
		name:'finish',
		props: ['zidingyi'],
			components:{		
			},
			data:function(){
				return{
					phone:"",
					pwd:"",
					openid:localStorage.openid ? localStorage.openid : '',
					description:"",	//登录状态
					auths:{}	//授权登陆
				}
			},
			methods:{
				//第3方登陆
				Three_party_login(){
					var auth = this.auths['weixin'];
					if(auth){
						var w = null;
						if(plus.os.name == "Android") {
							w = plus.nativeUI.showWaiting();
						}
						document.addEventListener("pause", function() {
							setTimeout(function() {
								w && w.close();
								w = null;
							}, 2000);
						}, false);
						auth.login(function() {
							w && w.close();
							w = null;
							alert(JSON.stringify(auth.authResult))
						}, function(e) {
							w && w.close();
							w = null;
							alert('认证失败')
						});
					}else{
						alert('认证失败')
					}
				},
				form_1(){
					
				},
				go:function(){
//					this.$router.go(-1)
				},
				login:function(){
//					mui.alert("开始登陆")
					this.error();
					this.register();
				},
				error:function(){
					var userName =$("#userName");
					var password =$("#password");
					if(userName.val() ==""){
						mui.alert("账户不能为空")
					}else if(password.val()==""){
						mui.alert("密码不能为空")
					}
				},
				register:function(){
			   		var phone =this.phone;
			   		var pwd =this.pwd;
			   		var _this=this;
			   		var obj=new Object();
			   			obj.phone=this.phone;
			   			obj.pwd=this.pwd;
			   			obj.openid=localStorage.openid ? localStorage.openid : '';
			   		http('post','/platform/cmembers/membersLogin',obj,membersLogin)
			   		function membersLogin(res){
			   			_this.description = res;
						var ids = res.data.ids
						localStorage.setItem('ids',ids);
						localStorage.setItem('username',_this.phone);
						_this.descriptions()
			   		}
//					$.ajax({
//						type:"post",
//						url:liupeilin_ip+"/platform/cmembers/membersLogin",
//						async:true,
//						data:obj,
//						success:function(res){
//							_this.description = res;
//							var ids = res.data.ids
//							localStorage.setItem('ids',ids);
//							localStorage.setItem('username',_this.phone);
//							_this.descriptions()
//						},
//						error:function(res){
//
//						}
//					});
					
			   },
			   descriptions:function(){
			   		var _this =this
//			   		alert(JSON.stringify(this.description))
					console.log(this.description)
			   		if(this.description.code==10000){
			   			mui.toast('登陆成功',{ duration:2000,type:'div'})
						setTimeout(function(){
							_this.$router.push('/Home');
						},2000)
			   		}else{
			   			mui.alert(this.description.description);
			   		}
			  },
			  user:function(res){
				console.log(res,12345678);
				var _this = this;
				//返回CweixUser对象
				//判断用户是否同意授权
				if(res.code == 10009){
					mui.toast("授权失败!")
				}else if(res.code == 1000){
					_this.openid = res.data.openid //获取领取者的openid
				}
			},
			codess:function(res){
				console.log(res);
//				console.log(res.data);
				var code = res.data;
				//获取用户openId
				var data={
					code:code
				}
					ajaxs("post",liupeilin_ip+"/platform/redirec/index",data,this.user);	 
				}
			},
			mounted:function(){
				var this_1=this;
				//获取用户授权链接取得code
//				ajaxs("post",liupeilin_ip+"/platform/redirec/oauth",'',this.codess)
				var id = localStorage.getItem('ids');
				console.log(id)
				if(id && id!='undefined' && id!=''){
					this.$router.push('/Home');
				}
				
				
				// 监听plusready事件  
//				document.addEventListener( "plusready", function(){
				
					// 扩展API加载完毕，现在可以正常调用扩展API
					plus.oauth.getServices( function(services){
						console.log(JSON.stringify(services))
						for(var i in services) {
							var service = services[i];
							this_1.auths[service.id] = service;
						}
					}, function(e){
						alert( "获取分享服务列表失败："+e.message+" - "+e.code );
					} );
//				}, false );
				
				
				
				
			}		
	}
</script>

<style>
	#login .ThirdParty{
		display: flex;
		justify-content: center;
		margin: 0.4rem 0px;
	}
	#login .ThirdParty i{
		font-size: 30px;
		color: #00b140;
	}
	#login header{background-color:#30abee;}
	#login header a,#login header h1{color:white;}
	#login .from{padding-top:4.8rem;box-sizing: border-box;width:80%;margin-left:10%;}
	#login .from .input{margin-top:50px;}
	#login .from .subline{width:80%;display: inline-block;
		/*margin-top:1rem;*/
	}
	#login .from .subline a{color:#000;white-space: normal;display: inline-block;}
	#login .from .subline ul{display: flex;}
	#login .from .subline li{width:calc(100% / 3);float: left;white-space: normal;}
	#login .from .subline li:nth-child(1),#login .from .subline li:nth-child(3){width:45%;}
	#login .from .subline li:nth-child(2){width:10%;}
	#login .from .btn{margin-top:0.7rem;letter-spacing: 0.05rem;height:0.8rem;font-size:0.3rem;
						background-color:#30abee;border-radius:0.3rem;width:100%;}
	#login{background-image: url('../../static/img/loginimg.jpg');width:100%;height:100%;background-size: cover;}
	#login .input input{border: none;border-bottom: 1px solid #ababab;padding-left:0.75rem;box-sizing: border-box;}
	#login .input input:nth-child(1){background-image:url('../../static/img/userimg.png');background-repeat: no-repeat;}
	#login .input input:nth-child(2){background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;}
	#login .input #password{margin-left:0px;}
	
	
</style>