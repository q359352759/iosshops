<template>
	<div>
		<div id="forget">
			<header>
				<em @click="go"><</em>
				<span>修改支付密码</span>
			</header>
			<div class="content">
				<div class="phone">
					<label for="payment">手机号</label>
					<input id="phone" v-model="phoneNum"  :class="{active:nowindex==1}" @click="nowindex=1"  type="text" />		
					<input v-on:click="sendSmsCode" class="verify-btn" type="button" v-model="btnContent" v-bind="{'disabled':disabled}" />
				</div>
				<div class="yan">
					<label for="payment">验证码  :</label>
					<input id="payment" type="text" v-model="verifyNum"  name="payment" :class="{active:nowindex==2}" @click="nowindex=2" autofocus="autofocus" required="required"/>
				</div>
				<div class="newpassword">
					<label for="newpayment">新密码  :</label>
					<input id="newpayment" type="password" v-model="newpassword" name="newpayment" :class="{active:nowindex==3}" @click="nowindex=3" required="required" />
				</div>
				<div class="password">
					<label for="yes">确认密码  :</label>
					<input id="yes" type="password" v-model="yespasword" name="yespayment" :class="{active:nowindex==4}" @click="nowindex=4" required="required " />
				</div>	
				<p>密码长度为6~16位</p>
				<button class="login_btn" @click="yanzheng">确   定</button>
				<p>设置成功后，使用支付密码支付</p>
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
				    newpassword:"",
				    yespasword:"",
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
				//console.log(phoneNum)
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
			   yanzheng:function(){
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
							return;
						}
					var phoneNum=this.phoneNum	
					var yespasword=this.yespasword	
					var verifyNum=this.verifyNum	
					var _this=this
					$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/forgotPayPwd",
					async:true,
					data:{
						payPwd:yespasword,
						vuecode:verifyNum,
						phone:phoneNum
					},
					success:function(res){
						console.log(res)
						_this.description=res.description;
						_this.descriptions();
					},
					error:function(res){
						console.log("失败");
						
					}
				});
			   },
			   	descriptions:function(){
			   		var _this=this;
					if(this.description=="重置密码成功！"){
						mui.toast('重置密码成功！')	
//						_this.$router.push('/manage');
						window.history.back();
						return
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
	#forget{background-color:white;height:100%;}
	#forget header{height:1rem;background-color:#00a2eb;color:white;line-height:1rem;}
	#forget header em{margin-left:0.62rem;font-size:0.5rem;vertical-align: bottom;}
	#forget header span{margin-left:0.2rem;font-size:0.35rem;}
	#forget .content{width:90%;margin:0 auto;}
	#forget .content label{color:#000000;margin-top:0.25rem;font-size:0.25rem;display: inline-block;width:23%;font-size:0.3rem;}
	#forget  input{border:none;border-bottom:1px solid #cccccc;width: 75%;display: inline-block;margin-top:0.7rem;}
	#forget .content  button{width:100%;height:1.05rem;background-color:red;border-radius:0.1rem;color:white;text-align: center;font-size:0.3rem;margin-bottom:0;margin-top:0.5rem;
								letter-spacing:0.03rem;font-size:0.4rem;}
	#forget .content .verify-btn{z-index: 10;border: none;position: absolute;width:1.7rem;position: absolute;top: 92%;left: 67%;margin-top:0.7rem;color:white;background-color:orange;text-align: center;}
	#forget .content p{height:0.65rem;line-height:0.65rem;margin-bottom:0;margin-top:0.3rem;text-align: center;}
	#forget .content .active{border-bottom:1px solid #ffd161;}
	#forget .content a{position:absolute;font-size:0.3rem;top:0.65rem;right:0.06rem;}
	#forget .content .phone{position: relative;padding: 0;}
	#forget .content #phone{padding: 0;}
	#forget .content #payment{padding: 0;}
	#forget .content>div:nth-child(5){margin-top:0.5rem;}
	#forget .content>div:nth-child(7){margin-top:0.2rem;}
	
</style>