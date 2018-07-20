<template>
		<div id="payments">
			<header>
				<em @click="go"><</em>
				<span>修改支付密码</span>
			</header>
			<form @submit.prevent="from()">
				<div class="content">
					<div class="yuan">
					<label for="payment">原密码:</label>
						<input id="payment" required="" pattern=".*[^ ].*" type="password" v-model="oldpwd" name="payment" placeholder="" :class="{active:nowindex==1}" @click="nowindex=1" autofocus="autofocus"/>
					</div>
					<div class="xing">
						<label for="newpayment">新密码:</label>
						<input id="newpayment" required="" pattern=".*[^ ].*" type="password" v-model="newpwd"  name="newpayment" :class="{active:nowindex==2}" @click="nowindex=2"/>
					</div>
					<div class="que">
						<label for="yes">确认密码:</label>
						<input id="yes" required="" pattern=".*[^ ].*" type="password" name="yespayment" :class="{active:nowindex==3}" @click="nowindex=3"/>
					</div>		
					<p>
						<em>密码长度为6~16位</em>
						<router-link to="/forget">
							<a href="#">忘记密码</a>
						</router-link>
					</p>
					<button type="submit">确    定</button>
				</div>
			</form>
		</div>

</template>

<script>
		import $ from "jquery"
		export default{
		components:{
		},
		data:function(){
				return{
					nowindex:1,
					oldpwd:"",
					newpwd:"",
					sid:""
				}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},	
			from:function(){
				var payment = $('#payment');
				var newpayment = $('#newpayment');
				var yes = $('#yes');
				if(newpayment.val()!==yes.val()){
					mui.alert("两次密码不一致!");
					return;
				}
				var reg = /^\w{6,16}$/
				var pass = newpayment.val()
				var bool = reg.test(pass)
				if(!bool){
					mui.alert("密码格式不正确！");				
					return;
				}
				var oldpwd=this.oldpwd;
				var newpwd=this.newpwd;
				var sid=this.sid;
				var _this=this;
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/updatepwd",
					async:true,
					data:{
						uId:sid,
						type:"pay",
						oldpwd:oldpwd,
						newpwd:newpwd
					},
					success:function(res){
						console.log(res)
						_this.description=res;
						_this.descriptions()
					},
					error:function(res){
						console.log("失败");	
					}
				});	
			},
			descriptions:function(){
			   		var _this=this;
					if(this.description.code!=10000){
						mui.alert(this.description.description);
					}else{
						mui.toast(this.description.description,{ duration:2000,type:'div'});
						setTimeout(function(){
//							_this.$router.push('/manage');
							_this.$router.go(-1)
						},2000)
					}
			  }
		},
		mounted:function(){
				this.sid = localStorage.getItem("ids");
				//console.log(this.sid);	
		}
	}
</script>

<style>
	#payments{
		height: 100%;
		background-color:white;
	}
	#payments .yuan,#payment .xing,#payment .que{margin-top:0.5rem;}
	#payments header{height:1rem;background-color:#00a2eb;color:white;line-height:1rem;}
	#payments header em{margin-left:0.62rem;font-size:0.5rem;vertical-align: bottom;}
	#payments header span{margin-left:0.2rem;font-size:0.35rem;}
	#payments .content{width:90%;margin:0 auto;}
	#payments .content label{color:#000000;margin-top:0.25rem;font-size:0.25rem;display: inline-block;width:23%;font-size:0.3rem;}
	#payments  input{border:none;height:0.5rem;border-bottom:1px solid #cccccc;width: 75%;display: inline-block;}
	#payments .content button{width:100%;height:1.05rem;background-color:red;border-radius:0.1rem;color:white;text-align: center;font-size:0.3rem;margin-bottom:0;margin-top:0.5rem;letter-spacing:0.05rem;font-size:0.4rem;}
	#payments .content p{height:0.65rem;line-height:0.65rem;margin-bottom:0;margin-top:0.5rem;}
	#payments .content .active{border-bottom:1px solid #ffd161;}
	#payments .content a{float: right;font-size:0.3rem;color:#00a2eb;}
	#payments .content p:nth-child(10){margin-top:0.27rem;}
	#payments .content p:nth-child(8){margin-top:0.2rem;}
	#payments .content .end{text-align: center;margin-top:0.3rem;}
</style>