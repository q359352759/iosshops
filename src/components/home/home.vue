<template>
<div id="home">
		<a href="#/help" class="help_1">
			<i class="mui-icon mui-icon-help"></i>
		</a>
		<div class="box_1">
			<div class="circular_1">
				<canvas width="250px" height="250px" class="myCanvas_1"></canvas>
				<canvas style="" width="250px" height="250px" class="myCanvas_2"></canvas>
				<canvas style="" width="250px" height="250px" class="myCanvas_3"></canvas>
				<div class="radiu_1" style="">
					<a href="#/profit">
						<div>累计分润</div>
						<span>{{hbs}}</span>
					</a>
					<a @click="tixian">
						{{hbBlance}}元
					</a>
				</div>
			</div>
			<ul class="list_1">
				<li>
					<router-link to="money/cash">
						<img class="img_1" src="@/assets/img/icon_132.png" />
						<div>现金劵</div>
						<span>￥{{CapitalTotal.db ? CapitalTotal.db : 0}}</span>
					</router-link>
					<router-link to="money/save">
						<img class="img_1" src="@/assets/img/icon_131.png" />
						<div>省钱</div>
						<span>￥{{CapitalTotal.integration ? CapitalTotal.integration : 0}}</span>
					</router-link>
				</li>
				<li>
					<router-link to="money/hb">
						<img class="img_1" src="@/assets/img/icon_134.png" />
						<div>HB</div>
						<span>￥{{CapitalTotal.hb ? CapitalTotal.hb : 0}}</span>
					</router-link>
					<router-link to="money/make">
						<img class="img_1" src="@/assets/img/icon_133.png" />
						<div>赚钱</div>
						<span>￥{{CapitalTotal.fh ? CapitalTotal.fh : 0}}</span>
					</router-link>
				</li>
			</ul>
			<ul class="list_2">
				<li>
					<router-link to="/collect">
						<i class="icon iconfont icon-qr-code"></i>
						<div>收钱</div>
					</router-link>
				</li>
				<li>
					<router-link to="/Scan?url=home">
					<!--<a @click="saoyisao()">-->
						<i class="icon iconfont icon-saomiao"></i>
						<div>扫一扫</div>
					<!--</a>-->
					</router-link>
				</li>
				<li>
					<!--<router-link to="/recriving">-->
					<a @click="Shut_down()">
						<i class="icon iconfont icon-bhjscanqr"></i>
						<div>付钱</div>
					</a>
					<!--</router-link>-->
				</li>
			</ul>
		</div>
	
		<div class="box_2">
			<a @click="go('applyforashop')">
				<div></div>
				<img src="@/assets/img/105640188164831118.jpg"/>
			</a>
			<a @click="go('PartnerApplication')">
				<div></div>
				<img src="@/assets/img/571073863535232608.jpg"/>
			</a>
		</div>
		
		<a @click="change_share()" class="box_3">
			<div></div>
			<img src="@/assets/img/894997369988792767.jpg"/>
		</a>
		
		<!--<a href="#/webSocket">聊天测试</a>
		<br />
		<a href="#/RedEnvelopes">微信跳转进来领取红包页面</a>
		<br />
		<a href="#/bill">bill页面</a>-->
		
		<share  v-on:shoudao='sharesd' :zidingyi="transmit_text"></share>
		<!--遮罩层-->
		<model v-show="modelShow" v-on:shoudao='modelsd' :zidingyi="model_type"></model>
		<!--领取红包-->
		<packet v-show="packetShow" v-on:shoudao='packetsd' :zidingyi="Total_type"></packet>
		
	</div>
</template>

<script>
	import Vue from 'vue';
//	import axios from 'axios';
//	import vueAxios from 'vue-axios'
//	Vue.use(vueAxios,axios);
	
	import share from '@/components/share';		//分享
	import model from '@/components/model';		//遮罩层
	import packet from '@/components/packet';	//红包
	import {ajaxs,http} from "../../assets/fc.js";
	import $ from "jquery"
	export default{
		name:'home',
		components:{
			share,
			packet,
			model,
		},
		data:function(){
			return{
				packetShow:false,	//领取红包
				modelShow:false,		//遮罩层
				model_type:'packetShow',	//弹出框类型 这里是红包
				Total_type:[1,2,3],
				hbBlance:0,	//累计分润 下面的那个
				hbs:0,		//累计分润
				sid:localStorage.getItem("ids") ? localStorage.getItem("ids") : '',
				transmit_text:false,
				mask:{},		//遮罩层
				sqShopStatus:{	//是否可以申请店铺
					success:true,	//true:可以申请 false:不能申请
					message:'' 
				},
				isShop:{		//用户是否是商家
					success:false,
					message:''
				},
				isAgent:false,		//是否是合伙人
				CapitalTotal:{},	//用户资产
				help_type:false
			}
		},
		methods:{
			//帮助
//			help(){
//				this.help_type=!this.help_type;
//				if(this.help_type){
//					var help_1  = Vue.extend(help);  
//				}else{
//					var help_1  = Vue.extend(help1);
//				}
//				console.log(help_1)
////  			// 创建 Profile 实例，并挂载到一个元素上。  
//        		new help_1().$mount('.help_box div');
//			},
			//隐藏遮罩层
			modelsd:function(x){
				this.packetShow=false;
				this.modelShow=false;
			},
			//隐藏注册红包弹出框
			packetsd:function(x){
				this.modelShow=false;
				this.packetShow=false;
			},
			go(x){
				if(this.sid!=''){
					if(x=='applyforashop'){
						if(this.sqShopStatus.success){		//判断是否可以申请店铺
							this.$router.push('/'+x);
						}else{
							//判断是否有店铺
							if(this.isShop.success){
								this.$router.push('/Shopmanagement');
							}else{
								mui.toast(this.sqShopStatus.message,{ duration:2000, type:'div' })
							}
						}
					}else{
						//PartnerApplication
						if(this.isAgent){
							this.$router.push('/business');
						}else{
							this.$router.push('/'+x);
						}
					}
				}else{
					this.modelShow=true;
					this.packetShow=true;
				}
			},
			Shut_down(){
				mui.toast('暂未开放',{ duration:2000, type:'div' });
			},
			//扫一扫
			saoyisao(){
				
//				wx.scanQRCode({
// 					needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//  				scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//  				success: function (res) {
////  					alert(JSON.stringify(res))
//					}
//				});
			},
			//点击先领红包
			change_share(){
				if(this.sid!=''){
					console.log('开始传递参数')
					this.transmit_text=true;
				}else{
					this.modelShow=true;
					this.packetShow=true;
				}
			},
			//接收参数
			sharesd(x){
//				console.log(x)
				this.transmit_text=x
			},
			profit:function(){
				this.$router.push('/profit');
			},
			tixian:function(){
				var  ids= localStorage.getItem('ids')
				if(ids){
					this.$router.push('/tixian');
				}else{
					this.$router.push('/login');
				}
			},
			hbBalance:function(res){
				console.log('累计分润',res)
				this.hbs = res.data.hb;
				this.hbBlance =res.data.hbBlance;
				var user = res.data.hbBlance
			},
//			user:function(res){
//				console.log(res,12345678);
//				var _this = this;
//				//返回CweixUser对象
//				//判断用户是否同意授权
//				if(res.code == 10009){
//					mui.alert("请先同意授权信息!")
//					return;
//				}else if(res.code == 1000){
//					_this.openid = res.data.openid //获取领取者的openid
//				}
//			},
		},
		mounted:function(){
			var this_1=this;
			if(!localStorage.getItem("ids") || localStorage.getItem("ids")=='undefined' || localStorage.getItem("ids")==''){
//				this.$router.push('/login');
				this.packetShow=true	//领取红包
				this.modelShow=true		//遮罩层
				return;
			}
			
			//预先存储用户分润号
			http('post','/hb/hbDistribution/beforeSave',{'memberid':localStorage.getItem("ids")},beforeSave)
			function beforeSave(){
				
			}

			//获取用户资产总额
			http('post','/platform/zlCapital/getCapitalTotal',{'id':this.sid},getCapitalTotal)
			function getCapitalTotal(x){
				console.log('获取用户资产总额',x);
				this_1.CapitalTotal=x;
			}
			
//			//用户分享剩余可领现金券
//			http('post','/platform/zlShareGetDb/lastShareDb',{'id':this.sid},lastShareDb)
//			function lastShareDb(x){
//				console.log('用户分享剩余可领现金券',x)
//			}
			
			//判断用户是否可以申请店铺
			http('post','/mall/mobile/shopManagerUserBind/sqShopStatus',{'mid':this.sid},sqShopStatus)
			function sqShopStatus(x){
				console.log('判断用户是否可以申请店铺',x);
				this_1.sqShopStatus=x;
			}

			//判断是否是商家
			http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':this.sid},isShop);
			function isShop(x){
				console.log('判断是否是商家',x);
				this_1.isShop=x
			}
			
			//判断是否是城市合伙人;
			http('post','/mall/mobile/agentinfo/isAgentinfo',{'mid':this.sid},isAgentinfo)
			function isAgentinfo(x){
				console.log('判断是否是城市合伙人',x);
				this_1.isAgent=x;
			}
			
			 //hb消费总记录
//			this.axios.get(liupeilin_ip+'/mall/mobile/memberredpacketrecord/getMemberredpacketrecordByMemberId').then((res)=>{
//					this.data=res.data.data
//				},response => {
//			       	console.log("error");
//			 });
			 
			 //累计分润显示
			var data={memberId:this.sid};
			ajaxs("post",liupeilin_ip+"/hb/hbDistribution/hbindex",data,this.hbBalance)
			
			//显示用户信息
//			var datas={uId:this.sid};
//			ajaxs("post",liupeilin_ip+"/platform/cmembers/showUserInfo",datas,this.user)
			
			var circle = {
			        x : 125,    //圆心的x轴坐标值
			        y : 125,    //圆心的y轴坐标值
			    };
			    //http://www.w3school.com.cn/tags/html_ref_canvas.asp
			var canvas = $("#home .myCanvas_1")[0];		//大圆
			var ctx = canvas.getContext("2d");
				ctx.translate(circle.x,circle.y);	//中心点
			var canvas_2 = $("#home .myCanvas_2")[0];	//小园
			var ctx_2 = canvas_2.getContext("2d");
				ctx_2.translate(circle.x, circle.y)
			var canvas_3 = $("#home .myCanvas_3")[0];	//黄点
			var ctx_3 = canvas_3.getContext("2d");
			  	ctx_3.translate(circle.x, circle.y)
			  	
				
					
		    		//大的半圆
			    	ctx.beginPath();	//新的开始
			    	ctx.strokeStyle = "#FFFFFF";
					ctx.arc(0, 0, 100, Math.PI/2+0.2 ,Math.PI*1.5-0.2, false);
					ctx.stroke();	//绘制已定义的路径
					//创建一个新的
			    	ctx.beginPath();
					ctx.arc(0, 0, 100, Math.PI*1.5+0.2 , Math.PI/2-0.2, false);
					ctx.stroke();	
				  	
				  	//大圆小圆点
					ctx.beginPath()
					ctx.fillStyle = '#FFFFFF'
					ctx.arc(18, 98, 3, 0, Math.PI * 2, false);
					ctx.fill()
					ctx.restore()
					ctx.save()
					
					ctx.beginPath()
					ctx.fillStyle = '#FFFFFF'
					ctx.arc(-18, -98, 3, 0, Math.PI * 2, false);
					ctx.fill()
					ctx.restore();

				
			//==================================
			  	ctx_2.strokeStyle = "#FFFFFF";
				//小的半圆
				ctx_2.beginPath();
				ctx_2.arc(0, 0, 85, Math.PI+0.2 ,-0.2, false);
				ctx_2.stroke();
				ctx_2.beginPath();
				ctx_2.arc(0, 0, 85, 0.2 ,Math.PI-0.2, false);	
				ctx_2.stroke();

				//虚线边框
			  	ctx_2.lineWidth = 12
			  	ctx_2.setLineDash([1, 3])
			  	ctx_2.strokeStyle = '#FFFFFF';
			  	ctx_2.rotate(Math.PI / 2);
			  	ctx_2.beginPath()
			  	ctx_2.arc(0, 0, 65, 0, Math.PI * 2, false);
			  	ctx_2.stroke()
				
				//小圆圈
				ctx_2.fillStyle = '#FFFFFF'
				ctx_2.beginPath()
				ctx_2.arc(-15, 83, 3, 0, Math.PI * 2, false);
				ctx_2.fill()

				ctx_2.fillStyle = '#FFFFFF'
				ctx_2.beginPath()
				ctx_2.arc(15, -83, 3, 0, Math.PI * 2, false);
				ctx_2.fill()

		  	
			//======================
			  	//中心小圆点
				
				ctx_3.strokeStyle = "#FFFFFF";
				ctx_3.fillStyle = '#c1d032'
				ctx_3.beginPath()
				ctx_3.arc(65, 0, 4, 0, Math.PI * 2, false)
				ctx_3.fill()

		}
	}
</script>

<style>
	#home{
		padding: 0px 0px 60px 0px;
	}
	#home .help_1{
		position: fixed;
		top: 10px;
		right: 10px;
		color: #FFFFFF;
		z-index: 1;
	}
	
	#home .circular_1{
		height: 250px;
		position: relative;
		margin: 0.15rem 0px 0px;
	}
	#home canvas{
		/*border: 1px solid #FFFFFF;*/
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		margin: auto;
	}
	#home .myCanvas_1{
		animation:myCanvas_1 40s linear infinite;
		-webkit-animation:myCanvas_1 40s linear infinite;
	}
	#home .myCanvas_3{
		animation:myCanvas_1 60s linear infinite;
		-webkit-animation:myCanvas_1 60s linear infinite;
	}
	@-moz-keyframes myCanvas_1{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@-moz-keyframes myCanvas_1{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@-o-keyframes myCanvas_1{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes myCanvas_1{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-o-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	#home .myCanvas_2{
		animation:myCanvas_2 40s linear infinite;
		-webkit-animation:myCanvas_2 40s linear infinite;
	}
	@-moz-keyframes myCanvas_2{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(-360deg);
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-o-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
	@-webkit-keyframes myCanvas_2{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(-360deg);
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-o-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
	@-o-keyframes myCanvas_2{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(-360deg);
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-o-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
	@keyframes myCanvas_2{
		from{
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
		}to{
			-webkit-transform: rotate(-360deg);
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-o-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
	#home .radiu_1{
		width: 120px;
		height: 120px;
		background: #77D4FF;
		border-radius: 100%;
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
		overflow: hidden;
		background-image: url(../../assets/img/wave_2.png);
		background-position-x:left ;
		background-position-y:-10px ;
		animation:radiu_1 120s  linear infinite;
	}
	#home .radiu_1>a{
		display: block;
		text-align: center;
		color: #000000;
		font-size: 0.26rem;
	}
	#home .radiu_1>a:nth-child(1){
		padding: 25px 0px 0px;
		height: 50%;
	}
	#home .radiu_1>a:nth-child(1) div{
		font-size: 0.3rem;
	}
	#home .radiu_1>a:nth-child(2){
		height: 50%;
		padding: 0.5rem 0px 0px;
	}
	@keyframes radiu_1{
		from{
			background-position-x:left ;
		}to{
			background-position-x:right ;
		}
	}
	
	
	
	
	#home .box_3{
		position: relative;
		display: block;
		margin: 0.15rem 0px 0px 0px;
	}
	#home .box_3>div{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	#home .box_3>img{
		width: 100%;
	}
	#home .box_2{
		height: 1.6rem;
		display: flex;
		margin: 0.15rem 0px 0px;
	}
	#home .box_2>a{
		position: relative;
	}
	#home .box_2>a>div{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
	}
	#home .box_2>a>img{
		width: 100%;
		/*height: 100%;*/
		height: 1.6rem;
		object-fit: cover;
	}
	#home .box_2>a:nth-child(1){
		padding-right:0.08rem;
	}
	#home .box_2>a:nth-child(2){
		padding-left:0.08rem;
	}
	
	#home .box_1{
		padding: 1px 0px;
		/*min-height: 8rem;*/
		background-image: url('../../assets/img/536161751457043430.jpg');
		background-size:cover ;
		background-position:center ;
	}
	
	#home .box_1 .list_2{
		width: 4.5rem;
		margin: 0px auto;
		max-width: 100%;
		padding: 0.2rem 0px 0.2rem;
		display: flex;
		justify-content: space-between;
	}
	#home .box_1 .list_2>li{
		/*width: calc(100% / 3);*/
		text-align: center;
	}
	#home .box_1 .list_2 i{
		font-size: 0.5rem;
		display: inline-block;
		margin:0px 0px 0.1rem 0px ;
	}
	#home .box_1 .list_2 a{
		font-size: 0.26rem;
		color: #FFFFFF;
	}
	
	
	#home .box_1 .list_1{
		/*padding: 0px 0.8rem 0px;*/
		display: flex;
	}
	#home .box_1 .list_1>li{
		width: 50%;
		font-size: 0.24rem;
		padding: 0px 0.6rem 0.1rem;
	   	background: rgba(83,188,243,0.5);
	  	display: flex;
	   	justify-content: space-between;
	}
	
	#home .box_1 .list_1>li:nth-child(1){
		margin-right: 0.3rem;
		border-top-right-radius: 90px;
		border-bottom-right-radius: 90px;
		box-shadow:0px 1px 3px 1px #313131;
	}
	#home .box_1 .list_1>li:nth-child(2){
		margin-left: 0.3rem;
		border-top-left-radius: 90px;
		border-bottom-left-radius: 90px;
		box-shadow: 0px 1px 3px 1px #313131;
	}
	#home .box_1 .list_1>li img{
		width: 0.5rem;
		margin: 10px 0px 0rem 0px;
	}
	#home .box_1 .list_1>li>a{
		color: #FFFFFF;
		display: inline-block;
		text-align: center;
		white-space: nowrap;
	}
	
</style>