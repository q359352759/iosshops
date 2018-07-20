<template>
	<div id="packet">
			<img src="@/assets/img/packet.png" />
			<div class="packet_content">
				<p>先领红包、再付款<br />立即省钱</p>
				<i class="icon iconfont icon-close" v-on:click="hiddenShow()"></i>
				<div class="packet_input">
					<form @submit.prevent="form_1()" >
						<h2>新人礼包<span>20</span>元</h2>
						<div class="input_box">
							<input type="number" required="" pattern="^[1][2,3,4,5,7,8,9][0-9]{9}$" v-model="phonenumber" placeholder="手机号"  />
						</div>
						<div class="input_box">
							<input type="text" required="" pattern=".*[^ ].*" v-model="verify" name='verify' placeholder="验证码"  />
							<span v-on:click="code()" class="verify_code">{{time==0 ? '获取验证码' : time+'s'}}</span> 
						</div>
						<button type="submit" class="btn_1">立即领取</button>
					</form>
					<!--<form>
						<div class="mui-text-center text_1">
							分享到朋友圈或微信群
						</div>
						<div class="mui-text-center text_1">立得5元现金红包</div>
						<div class="mui-text-center text_1">
							他人注册再奖励10元现金红包
						</div>
						<div class="mui-pull-right text_2">每天限领一次</div>
						<button type="button" @click="Receive()" class="btn_1">立即分享</button>
					</form>-->
				</div>
			</div>
	</div>	
</template>

<script>
	import {http} from '@/assets/fc';
	export default {
		components:{},
	    data(){
	      	return{
	      		bool:true,
	      		phone_test:/^[1][2,3,4,5,7,8,9][0-9]{9}$/,		//手机验证
	      		phonenumber:'',			//手机号码
	      		verify:'',				//验证码
	      		time:0,
	      		type:2,		//分享者类型
	      		memId:'',	//分享者Id
	      	}
	    },
	    watch:{},
	    methods:{
	    	//隐藏弹出框
	      	hiddenShow(){
	      		this.bool=false
	      		this.$emit('shoudao','hehe');
	      	},
	      	//提交
	      	form_1(){
	      		if(this.memId && this.memId!=''){
	      			var obj={
						phone:this.phonenumber,
						vuecode:this.verify,			//验证码
//						openid:openid,				//微信openId
						openid:'oGCNX1DbhEMOQ92hWYqh4i7qy2vY',				//微信openId
						memId:this.memId,				//分享者的微信openId
//						memId:485,				//分享者的微信Id
						type:this.type						//0合伙人,1区域代理,2商家4,个人
					}
					http("post","/platform/cmembers/registerByActivityNew",obj,this.registerByActivityNew_return);
	      		}else{
	      			
	      		}
	      	},
	      	registerByActivityNew_return(x){
	      		console.log(x)
	      		var this_1=this;
				if(x.code===10000){
					mui.toast('注册成功',{ duration:2000,type:'div'})
					localStorage.ids=x.data.ids;
					window.location.reload()
				}else{
					mui.toast(x.description,{ duration:2000,type:'div'})
				}
	      	},
	      	//获取手机验证码
	      	code(){
	      		if(!this.phone_test.test(this.phonenumber)){
	      			mui.toast('手机号码不正确',{ duration:2000, type:'div' })
	      		}else{
	      			http('post','/platform/cmembers/sendVuecode',{'phone':this.phonenumber},this.sendVuecode);
	      		}
	      	},
	      	sendVuecode(x){
//	      		{"status":"0","msg":"ok","result":{"accountid":"10328","msgid":"108668928","count":"1"}}
				var x=JSON.parse(x);
				console.log(x);
				var this_1=this;
				if(x.status=='0'){
					mui.toast('短信已发送请注意查收',{ duration:2000,type:'div'})
					this.time=60;
		      		var time=setInterval(function(){
		      			this_1.time--;
		      			if(this_1.time==0){
		      				clearInterval(time)
		      			}
		      		},1000)
				}else{
					mui.toast(x.msg,{ duration:2000,type:'div'})
				}
	      	},
	      	//领取红包
	      	Receive:function(){
	      		this.$emit('shoudao','wx');
	      	}
	    },
	    mounted(){
	    	var this_1=this;
			this.type=this.$route.query.type ? this.$route.query.type : '';
			this.memId=this.$route.query['amp;Inviterid'] ? this.$route.query['amp;Inviterid'] : '';
			console.log(this.memId);
			if(this.memId){
				console.log('有分享者')
			}else{
				console.log('没有分享中')
			}
	    }
 	}
</script>

<style>
	#packet{
		width: 100%;
		max-width: 100%;
		position: fixed;
		left: 0px;
		right: 0px;
		top: 0.5rem;
		font-size:0.2rem;
		margin:0px auto;
		z-index: 11;
	}
	#packet>img{
		position: absolute;
		top: 0px;
		left: -0.3rem;
		margin: 0px auto;
		width: 100%;
		z-index: 0;
		/*height: 430px;*/
		height: 8.6rem;
	}
	#packet .packet_content{
		padding: 1px;
		position: relative;
		z-index: 1;
	}
	#packet .packet_content p{
		text-align:center;
		font-size: 0.38rem;
		line-height: 0.75rem;
		letter-spacing: 0.03rem;
		color: #ffffff;
		font-weight: bold;
		/*padding-top: 1.5rem;*/
		/*padding-top: 80px;*/
		padding-top: 1.6rem;
	}
	#packet .packet_input form{
		padding-top: 1.6rem;
		/*padding-top: 80px;*/
		width: 5rem;
		margin: 0px auto;
		position: relative;
	}
	#packet .packet_input h2{
		text-align: center;
		color:#e0ea00;
		font-size: 0.27rem;
		letter-spacing: 1px;
	}
	#packet .packet_input h2 span{
		font-size: 0.59rem;
		display: inline-block;
		margin: 0px 3px;
	}
	#packet .input_box{
		width: 3.5rem;
		height: 0.6rem;
		background-color: #ffffff;
		position: relative;
		margin: 0.17rem auto 0px;
		border-radius: 5px;
		overflow: hidden;
	}
	#packet .input_box input{
		border: none;
		margin: 0px;
		height: 100%;
		font-size: 0.26rem;
		padding: 0px 4px;
	}
 	#packet .input_box .verify_code{
 		height: 100%;
 		line-height: 0.6rem;
 		position: absolute;
 		font-size: 0.2rem;
		letter-spacing: 0px;
		color: #5c5c5c;
		white-space: nowrap;
		right: 3px;
		top: 0px;
 	}
 	#packet .text_1{
 		margin: 10px auto;
    	color: #FFFFFF;
    	font-size: 0.3rem;
    	letter-spacing: 2px;
 	}
 	#packet .text_2{
 		font-size: 0.22rem;
 		color: #d6d6d6;
 		position: absolute;
 		right: 0.1rem;
 		bottom: 6px;
 	}
 	
	#packet .btn_1{
		display: block;
		margin: 0.16rem auto 0px;
		width: 1.73rem;
		height: 0.55rem;
		font-size: 0.22rem;
		color: #df3121;
		background: #FEF500;
		border-radius: 0.55rem;
		border: none;
		/*box-shadow: 0px 2px 0px 1px #FD8C00;*/
	}
	#packet .icon-close{
		position: absolute;
		right: 0.95rem;
		top: 0.73rem;
		color: #dcdcdc;
		font-size: 32px;
		font-weight: bold;
	}
	
	
</style>