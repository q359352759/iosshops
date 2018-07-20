<template>
	<div id="register">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">注册</h1>
		</header>
		<div class="from">
        	<form id="login-form" @submit.prevent="register()" autocomplete="off" method="post" style="display:block">
           		<div class="input">		
           			<center>
						<input id="phone" required="required" v-model="phoneNum"  type="text" name="phone" placeholder="账户/手机号" />
						<div class="phone">
							<input id="code" required="required" v-model="verifyNum" type="number" name="vuecode" placeholder="验证码" />
							<input v-on:click="sendSmsCode" class="verify-btn" type="button" v-model="btnContent" v-bind="{'disabled':disabled}" />
						</div>  
           				<input id="password" required="required" v-model="pwd"  min="6" max="16" type="password" name="pwd" placeholder="登录密码(6~16位数字字母组合密码)" />
           				<input id="newpassword" required="required" min="6" max="16" type="password" name="pwd" placeholder="确认密码" />
           			</center>
           		</div>

				<input type="submit" value="立即注册" class="btn">
				<!--<p class="ptext">*注册代表你同意（xxx用户协议）</p>-->
			</form>
		</div>		
	</div>
</template>

<script>
	import $ from "jquery"
	import axios from 'axios'
	export default{
		name:'finish',
		props: ['zidingyi'],
			components:{		
			},
			data:function(){
				return{
					phoneNum:"", //手机号
				    verifyNum:"", //验证码
				    pwd:"",//密码
				    btnContent:"获取验证码", //获取验证码按钮内文字
				    time:0, //发送验证码间隔时间
				    disabled:false, //按钮状态
				    description:""//注册状态
				 }   
			},
			methods:{
				go:function(){
					this.$router.go(-1)
				},
				//获取验证码
				sendSmsCode(){
				    var reg=11&& /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;//手机号正则验证
				    var phoneNum = this.phoneNum;
					var this_1=this;
				    if(!phoneNum){//未输入手机号
				     	mui.alert( '请输入手机号','提示');
				     	return;
				    }
				    if(!reg.test(phoneNum)){//手机号不合法
				     	mui.alert("您输入的手机号码不合法，请重新输入");
						return;
				    }
				    
				    // 获取验证码请求
					$.ajax({
						type:"post",
						url:liupeilin_ip+"/platform/cmembers/sendVuecode?phone="+phoneNum,
						async:true,
						data:{phone:phoneNum},
						success:function(res){
							console.log(res);
							var x=JSON.parse(res);
							this_1.time = 60;
				    		this_1.timer();
							mui.toast(x.msg,{ duration:2000, type:'div' })
						},
						error:function(res){
							console.log("失败");
						}
					});
					$(".verify-btn").css("width","2.2rem")
			   },
				timer(){
				    if(this.time>0){
				     	this.time--;
				     	this.btnContent = this.time+"s后重新获取";
				     	this.disabled = true;
				     	var timer = setTimeout(this.timer,1000);
				    }else if(this.time == 0){
				     	this.btnContent = "获取验证码";
				     	clearTimeout(timer);
				     	this.disabled = false;
				     	$(".verify-btn").css("width","1.7rem")
				    }	    
			   },
			   // 验证验证码
			   verificationCode(){
				    var phoneNum = this.phoneNum;//手机号
				    var verifyNum = this.verifyNum;//验证码
				    var url = 'http://bosstan.asuscomm.com/api/common/verificationCode';
				    this.$http.post(url,{
				     	username:phoneNum,
				     	code:verifyNum
				    },{
				     	emulateJSON:true
				    }).then((response)=>{
				     	console.log(response.body);
				    });
			   },
			   fillContent(){
			    	// console.log("fillContent");
			   },
			   error:function(){
			   		var phone = $("#phone");
			   		var code = $("#code")
			   		var password = $("#password");
			   		var newpassword = $("#newpassword");
			   		var reg=11&& /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;//手机号正则验证
				    var phoneNum = this.phoneNum;
					if(phone.val() ==""){
			   			phone.val('')
			   			mui.alert("手机号不能为空")
			   			return
			   		}
				    if(!reg.test(phoneNum)){
				     	mui.alert("您输入的手机号码不合法，请重新输入");
						phone.val('')
						return;
				    }
					if(code.val() == ""){
			   			code.val('')
			   			mui.alert("验证码不能为空")
			   			return
			   		}
			   		if(password.val() =="" && newpassword.val() ==""){
			   			password.val('')
			   			newpassword.val('')
			   			mui.alert("密码不能为空")
			   			return
			   		}		
			   		if(newpassword.val() !== password.val()){
			   			newpassword.val('')
			   			password.val('')
			   			mui.alert("两次密码不一致")
			   			return
			   		}

			  },
			  register:function(){
			   		this.error();					
					var obj=new Object();
						obj.phone=this.phoneNum;
						obj.username=this.phone;
						obj.pwd=this.pwd;
						obj.vuecode=this.verifyNum;
						obj.id="no";
						obj.tpe=-1;
						obj.openid=localStorage.openid;
					$.ajax({
						type:"post",
						url:liupeilin_ip+"/platform/cmembers/register",
						data:obj,
						success:function(res){
							if(res.code==10000){
								mui.toast('注册成功!',{ duration:2000,type:'div'})
								setTimeout(function(){
									_this.$router.push('/login');
								},2000)
							}else{
								mui.alert(x.description);
							}
						},
						error:function(res){
							console.log("失败");
						}
					});
			   },
			},
			mounted: function(){		

				
			},
			created:function(){
				
			},
			watch:{
			}		
 	}
	
</script>

<style>
	#register header{background-color: #30abee;color:white;}
	#register header a,#register header h1{color:white;}
	#register .from .input{padding-top:50px;width:90%;box-sizing: border-box;}
	#register{background-color: white;height:100%;}
	#register .from .ptext{width:80%;margin:0.6rem 10%;text-align: center;}
	#register .from .subline{width:90%;display: inline-block;margin-left: 5%;}
	#register .from .subline li:nth-child(1){float: left;}
	#register .from .subline li:nth-child(2){float: right;}
	#register .from .btn{width:80%;margin-left:10%;margin-top:0.3rem;letter-spacing: 0.05rem;height:0.8rem;font-size:0.3rem;border-radius:0.3rem;
							}
	#register .verify-btn{position: absolute;left:65%;top: 6%;color:#30abee;border: none;}
	#register .phone{position: relative;}
	#register .btn{background-color:#30abee;border: 1px solid #30abee}
	#register .from .input>input{border:none;border-bottom:1px solid #ababab;}
	#register .from .input #phone,.input #code,.input #password,.input #newpassword{border:none;border-bottom:1px solid #ababab;
	  background-color:#FFFFFF;margin-left:5%;}
	#register{background-color:white;height: 100%;}
	#register .from #phone{background-image: url('../../static/img/phoneimg.png');background-repeat: no-repeat;padding-left:0.7rem;box-sizing: border-box;}
	#register .from #password{background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.7rem;box-sizing: border-box;}
	#register .from #code{background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.7rem;box-sizing: border-box;}
	#register .from #newpassword{background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.7rem;box-sizing: border-box;}
	
	
	
</style>