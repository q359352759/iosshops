<template>
	<div>
		<div id="password">
			<header>
				<em @click="go"><</em>
				<span>修改登录密码</span>
			</header>
			<div class="content">
				<div class="phone">
					
					<input id="phone" v-model="phoneNum" placeholder="手机号" :class="{active:nowindex==1}" @click="nowindex=1"  type="text" />		
					<input v-on:click="sendSmsCode" class="verify-btn" type="button" v-model="btnContent" v-bind="{'disabled':disabled}" />
				</div>
				<div class="yan">
					
					<input id="payment" placeholder="验证码" v-model="verifyNum" type="text" name="payment" :class="{active:nowindex==2}" @click="nowindex=2" autofocus="autofocus" required="required"/>
				</div>
				<div class="newpassword">
					
					<input id="newpayment" placeholder="新密码(6~16位数字字母组合密码)" type="password" name="newpayment" :class="{active:nowindex==3}" @click="nowindex=3" required="required" />
				</div>
				<div class="password">
					
					<input id="yes" placeholder="确认密码" v-model="pwd" type="password" name="yespayment" :class="{active:nowindex==4}" @click="nowindex=4" required="required " />
				</div>	
				<center>
					<button class="login_btn" @click="yanzheng">确   定</button>
				</center>
				<p>设置成功后，使用改密码登录账户</p>
			</div>
		</div>
	</div>
</template>

<script>
	//import Vue from 'vue'
	//import axios from 'axios'
	//import vueAxios from 'vue-axios'
	import jsonp from "jsonp"
	//Vue.use(vueAxios,axios)
	import $ from "jquery"
	
	
	
		export default{
		components:{
		},
		data:function(){
				return{
					nowindex:1,
					phoneNum:"", //手机号
				    verifyNum:"", //验证码
				    btnContent:"获取验证码", //获取验证码按钮内文字
				    time:0, //发送验证码间隔时间
				    disabled:false, //按钮状态
				    pwd:"",
				    code:"",//返回值信息
				    description:""
				}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},	
			sendSmsCode(){
			    var reg=11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
			    var phoneNum = this.phoneNum;
			    if(!phoneNum){//未输入手机号
			     mui.alert("请输入手机号码");
			     return;
			    }
			    if(!reg.test(phoneNum)){//手机号不合法
				//Toast进行用户提醒
			     mui.alert("您输入的手机号码不合法，请重新输入");
					return;
			    }
			    this.time = 60;
			    this.timer();
			    // 获取验证码请求
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/sendVuecode?phone="+phoneNum,
					async:true,
					data:{
						phone:phoneNum
					},
					success:function(res){
						console.log(res)
					},
					error:function(res){
						console.log(res)
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
			   yanzheng:function(){
			   		var _this=this
			   		var ophone = $('#phone');
					var code = $("#payment");
					var newpayment = $("#newpayment");
					var yes = $("#yes");
					ophone.blur(function(){
						var val1 = ophone.val();
						var reg1 = 11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
						if (!reg1.test(val1)){
							ophone.val('');
							mui.alert('您输入的手机号格式不正确');
							return;
						}
					});				
							//手机号不能为空
						if (ophone.val() == ""){
							 mui.alert("手机号不能为空");		
							return;
						}
						else if(code.val() == ""){
							 mui.alert("验证码不能为空");
							code.css({color:"red",fontsize:"0.1rem",})
							return;
						}
						if(newpayment.val() !== yes.val()){
							 mui.alert("两次密码不一致");

						}
					var phone= this.phoneNum;
					var vuecode= this.verifyNum;
					var pwd= this.pwd;
						console.log(vuecode)
					$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/forgotPwd",
					async:true,
					data:{
						phone:phone,
						pwd:pwd,
						vuecode:vuecode,
						username:phone,
						id:"no",
						openid:0,
						type:-1
						
					},
					success:function(res){
						console.log(res);
						_this.description = res.description;
						_this.code= res.code
						_this.descriptions();
					},
					error:function(res){
						console.log("失败");
						
					}
				});		
			  },
			  descriptions:function(){
			   		var _this=this;
			   		console.log(111)
					if(this.description=="重置密码成功！"){
						mui.toast('重置密码成功!',{ duration:1000,type:'div'})
						setTimeout(function(){
							_this.$router.push('/manage');
						},1000)
					}
					if(this.description=="验证码不正确！"){
						mui.alert("验证码不正确！");
						return
					}
			  }
			
		},
	}
</script>
<style>
	#password{background-color:white;height:100%;}
	#password header{height:1rem;background-color:#00a2eb;color:white;line-height:1rem;}
	#password header em{margin-left:0.62rem;font-size:0.5rem;vertical-align: bottom;}
	#password header span{margin-left:0.2rem;font-size:0.35rem;}
	#password .content{width:90%;margin:0 auto;}
	#password .content label{color:#000000;margin-top:0.25rem;font-size:0.25rem;display: inline-block;width:23%;font-size:0.3rem;}
	#password  input{border:none;height:0.75rem;border-bottom:1px solid #cccccc;width: 100%;display: inline-block;margin-top:0.7rem;}
	#password .content  button{width:80%;height:1.05rem;background-color:#30abee;border-radius:0.3rem;color:white;text-align: center;font-size:0.3rem;margin-bottom:0;margin-top:0.5rem;
								letter-spacing:0.03rem;font-size:0.4rem;}
	#password .content .verify-btn{z-index: 10;border: none;position: absolute;width:1.9rem;position: absolute;top: 96%;left: 70%;margin-top:0.7rem;color:#30abee;text-align: center;}
	#password .content p{height:0.65rem;line-height:0.65rem;margin-bottom:0;margin-top:0.3rem;text-align: center;}
	#password .content .active{border-bottom:1px solid #ffd161;}
	#password .content a{position:absolute;font-size:0.3rem;top:0.65rem;right:0.06rem;}
	#password .content .phone{position: relative;padding: 0;}
	#password .content #phone{padding: 0;background-image:url('../../static/img/phoneimg.png');background-repeat: no-repeat;padding-left:0.65rem;box-sizing: border-box;}
	#password .content #payment{padding: 0;background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.65rem;box-sizing: border-box;}
	#password .content #newpayment{background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.65rem;box-sizing: border-box;}
	#password .content #yes{background-image:url('../../static/img/suoimg.png');background-repeat: no-repeat;padding-left:0.65rem;box-sizing: border-box;}
	#password .content>div{width:100%;}
	#password .content>div:nth-child(5){margin-top:0.5rem;}
	#password .content>div:nth-child(7){margin-top:0.2rem;}
	#password .content .verify-btn{background-color:white;}
	
</style>