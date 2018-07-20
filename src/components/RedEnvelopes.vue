<template>
	<div id="RedEnvelopes">

		<div class="box_1">
			<img src="@/assets/img/852314353104807177.jpg"/>
			<div class="content_1">
				<p class="header_1 mui-text-center">
					{{title}}
				</p>
				<form @submit.prevent="form_1()">
					<ul class="form_1">
						<li>
							<div class="input_box">
								<div class="Prompt_box" v-show="!phoneNum">
									<span class="mui-pull-right">红包立即到账</span>
									<div class="mui-clearfix"></div>
								</div>
								<input v-model="phoneNum" type="text" required="" placeholder="手机号码" pattern="^[1][2,3,4,5,6,7,8,9][0-9]{9}$"/>
							</div>
						</li>
						<li>
							<div class="verification_box">
								<input class="mui-text-center" v-model="code" required="" pattern=".*[^ ].*" type="text" placeholder=""/>
							</div>
							<div class="Verification_1">
								<input v-on:click="sendSmsCode" type="button" v-bind="{'disabled':disabled}" class="verify-btn" v-model="btnContent"></input>
							</div>
						</li>
						<li>
							<div class="input_box">
								<button type="submit" >立即领取</button>
							</div>
						</li>
					</ul>
				</form>
			</div>
		</div>
		
		<div class="mask" @click="go()" v-if="mask">
			<div>
				<div class="header_1 mui-text-center">恭喜你已获得现金券红包20元</div>
				<div class="text_1">
					<div>1.&nbsp;&nbsp;关于使用：现金券红包可以到系统页脚点击“商铺”，在商铺中找到您所需要消费的商家，买单时选择现金券抵扣消费</div>
					<div class="mui-text-center">（备注：可到商家店铺现场咨询了解，
						<br />也可拨打客服热线：400-109-2969）</div>
					<div>2.&nbsp;&nbsp;更多详情请关注首页右上角  <i class="mui-icon mui-icon-help"></i> 处。</div>
				</div>
				<div class="footer_1">
					<i class="mui-icon mui-icon-close"></i>
				</div>
			</div>
		</div>
		
		<!--关注二维码-->
		<follow v-if='follow_show'></follow>
	</div>
</template>
<script>
	import {ajaxs,http} from '@/assets/fc';
	import	follow	from '@/components/follow';	//关注
	export default {
		components:{
			follow
		},
		name: '',
		data() {
			return {
				follow:false,	//是否关注
				follow_show:false,	//是否显示关注
				mask:false,		//弹出框显示
				title:"XXX赠送给你20元现金红包",//分享者昵称
				btnContent:"输入验证码",
				disabled:false,
				phoneNum:"",//电话号码
				time:0, //发送验证码间隔时间
				description:"",//res结果状态
				code:"",//领取者的code
				openid:localStorage.openid,  //领取者的openid
				Inviterid:'',			//分享者的Id
				type:4,				//分享者类型 0合伙人,1区域代理,2商家4,个人
			}
		},
		methods:{
			go(){
				if(this.follow){
					this.$router.push('/home');
				}else{
					this.mask=false;
					this.follow_show=true;
				}
			},
			sendSmsCode(){
				var this_1=this;
				var reg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
//			    var reg=11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
			    var phoneNum = this.phoneNum;
			    if(!phoneNum){		//未输入手机号
					mui.toast('请输入手机号',{ duration:2000, type:'div' })
			     	return;
			    }
			    if(!reg.test(phoneNum)){//手机号不合法
					mui.toast('您输入的手机号码不合法,请重新输入',{ duration:2000, type:'div' })
					return;
			    }

			    this.time = 60;
			    // 获取验证码请求
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/sendVuecode",
					async:true,
					data:{phone:phoneNum},
					success:function(res){
						var res=JSON.parse(res);
						if(res.status=='0'){
							mui.toast('短信已发送，请注意查收',{ duration:2000, type:'div' })
							this_1.timer();
						}else{
							mui.toast(res.msg,{ duration:2000, type:'div'})
						}
					},
					error:function(res){
						mui.toast('系统错误,请稍后再试！',{ duration:2000, type:'div' })
					}
				});
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
				     	//$(".verify-btn").css("width","1.7rem");
				    }	    
			},
			form_1(){
				var phone = this.phoneNum;
				var vuecode  = this.code;
				var openid   = this.openid;
				var data={
					phone:phone,
					vuecode:vuecode,			//验证码
					openid:openid,				//微信openId
//					openid:'oGCNX1DbhEMOQ92hWYqh4i7qy2vY',				//微信openId
					id:this.Inviterid,				//分享者的id 类型不同个人用户Id,区域代理Id,商家id，合伙人id
//					memId:485,				//分享者的微信Id
					type:this.type						//0合伙人,1区域代理,2商家4,个人
				}
//				alert(JSON.stringify(data))
				ajaxs("post",liupeilin_ip+"/platform/cmembers/registerByActivityNew",data,this.descriptions);				
			},
			descriptions:function(x){
				console.log(x)
				var this_1=this;
				if(x.code==10000){
					mui.toast(x.description,{ duration:2000,type:'div'})
					localStorage.ids=x.data.ids;
					this.mask=true;
					window.location.reload();
				}else{
					mui.toast(x.description,{ duration:2000,type:'div'})
				}
			},
		},
		mounted:function(){
			var this_1=this;
//			console.log('url参数',this.$route)
//			console.log(this.$route.query['amp;Inviterid'])
//			console.log(this.$route.query.Inviterid)
			http('post','/platform/JSSDK/judgeIsFollow',{'openid':localStorage.openid},judgeIsFollow)
			function judgeIsFollow(x){
				console.log('是否关注',x)
				this_1.follow=x;
			}
			
			
			if(this.$route.query.type){
				this.type=this.$route.query.type;
			}
			if(this.$route.query.Inviterid){				//这里是分享后点击进来的
				this.Inviterid=this.$route.query.Inviterid		
			}else if(this.$route.query['amp;Inviterid']){	//扫描点击进来的
				this.Inviterid=this.$route.query['amp;Inviterid']
			}else{
				this.Inviterid='';
			}
			
			//扫描二维码后,跳转到送红包页面,返回送红包者的名称
			var obj=new Object();
				obj.id=this.Inviterid;
				obj.type=this.$route.query.type ? this.$route.query.type : 4;	 	//0合伙人,1区域代理,2商家4,个人
//			alert('分享者Id:'+this.Inviterid)
			http('post','/agent/manager/area/getHbName',obj,getHbName)
			function getHbName(x){
				console.log('返回送红包者的名称',x)
				this_1.title=x+' 赠送给你20元现金红包';
			}
		}
	}
</script>
<style>
	#RedEnvelopes .mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.7);
		z-index: 1;
		/*padding: 1rem;*/
	}
	#RedEnvelopes .mask>div{
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		/*width: 235px;*/
		width: 4.7rem;
		height: 6.6rem;
		/*height: 330px;*/
		margin: auto;
		background: #FFFFFF;
		border-radius: 5px;
	}
	#RedEnvelopes .mask .indent_1{
		text-indent: 2em;
	}
	#RedEnvelopes .mask .header_1{
		margin: 0.2rem 0px;
    	font-size: 0.3rem;
	}
	#RedEnvelopes .mask .text_1{
		font-size: 0.24rem;
    	color: #616161;
	    line-height: 22px;
	    padding: 0px 0.18rem 0px 0.22rem;
	}
	#RedEnvelopes .mask .text_1>div{
		margin: 0px 0px 8px 0px;
	}
	#RedEnvelopes .mask .text_1 i{
		font-size: 0.3rem;
	}
	#RedEnvelopes .mask .footer_1{
		position: absolute;
		bottom: 5px;
		left: 0px;
		width: 100%;
		text-align: center;
		color: #8e8e8e;
	}
	
	
	
	
	#RedEnvelopes .box_1>img{
		width: 100%;
	}
	#RedEnvelopes .verify-btn{
		width:100%;
		color:white;
		background-color: #e5bb02;
		text-align: center;
	}
	#RedEnvelopes .content_1{
		position: absolute;
		width: 100%;
		/*top: 270px;*/
		top: 5.4rem;
		left: 0px;
		text-align: center;
	}
	#RedEnvelopes .content_1 .header_1{
		color: #FFFFFF;
		font-weight: bold;
		/*margin: 0px 0.45rem 0.2rem 0.45rem;*/
		/*display: inline-block;*/
	}
	#RedEnvelopes .content_1 .form_1>li{
		width: 4rem;
		height: 0.8rem;
		display: flex;
		margin:0px auto 0.16rem;
	}
	#RedEnvelopes .content_1 .input_box{
		flex-grow: 1;
		position: relative;
		background: #FFFFFF;
		border-radius: 3px;
		height: 100%;
	}
	#RedEnvelopes .content_1 .Prompt_box{
		position: absolute;
		width: 100%;
		top: 0px;
		left: 0px;
	    margin: 0px;
	    font-size: 0.24rem;
	    padding:0px 5px;
	    line-height: 0.8rem;
	    color: #757575;
	    background: #ffffff;
	    border-radius: 3px;
	    z-index: 0;
	}
	#RedEnvelopes .content_1 .Prompt_box+input{
		background: none;
		position: relative;
		z-index: 1;
	}
	#RedEnvelopes .content_1 .form_1 input{
		height: 100%;
		margin: 0px;
		font-size: 0.24rem;
		padding: 5px;
		border: none;
	}
	#RedEnvelopes .content_1 .form_1 button{
		width: 100%;
		height: 100%;
		color: #E8442E;
		font-weight: bold;
		background: #e5bb02;
		color: #FFFFFF;
		border: none;
	}
	#RedEnvelopes .content_1 .Verification_1{
		width: 50%;
		padding: 0px 0px 0px 0.1rem;
		height: 100%;
	}
	#RedEnvelopes .content_1 .Verification_1>div{
		white-space: nowrap;
		line-height: 0.8rem;
		background: #E5BB02;
		color: #FFFFFF;
		border-radius: 5px;
		font-size: 0.24rem;
		text-align: center;
	}
	#RedEnvelopes .content_1 .verification_box{
		width: 50%;
		padding: 0px 0.1rem 0px 0px;
		height: 100%;
		flex-shrink: 1;
	}
	
	
</style>