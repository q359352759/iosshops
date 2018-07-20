<template>
	<div>
		<div id="remaining">
			<header>
				<span @click="go"><</span>
				 <em>提现</em>
				 <router-link to="/record">
					<i>提现记录</i>
				</router-link>
			</header>
			<nav>				
				<ul>
					<router-link to="/tixian">
						<li>红包提现</li>
					</router-link>
					<router-link to="/remaining">
						<li  class="active">余额提现</li>
					</router-link>
				</ul>
			</nav>
			<!--<select id="select" name="tixian" @click="add">
				<option value="1">微信&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weixi}}</option>
				<!--<option value="2">支付宝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{zhifubao}}</option>
				<option  value="3">添加账户</option>-->
			<!--</select>-->
			<div class="tixian">
				<label>提现额度</label>
				<input type="number" placeholder="当前可提现金额" />
				<button>全部提现</button>
			</div>
			<div class="zhifu">
				<label>支付密码</label>
				<input type="password" placeholder="请输入支付密码" />
			</div>
			<div class="forget clear">
				<router-link to="/forget">
					<a href="#" >忘记密码</a>
				</router-link>			
			</div>
			<div class="text">
				<p>提示：每周五09:00~17:00为到账时间，单笔提现额度100~1000元。</p>
				<p>红包提现费率为14%</p>
			</div>
			<div class="radei">
				<img :src='url1' id="radei_img" @click="yes" />
				<span>我已阅读并同意</span>
				<a href="#" @click="fuwu">《充值提现服务协议》 </a>
			</div>
			<div class="button">
				<button id="btn" disabled="disabled">提交</button>
			</div>	
			<!--<div class="jiao" :class="{rotate:bools}"></div>-->
			<div class="xieyi"  :class="{none:bool}">
				<div class="conten" @click="fuwu">
					    充值提现服务协议
					1.1 微信支付服务，指本公司依托微信及微信公众平台为收付款人之间提供的货币资金转移服务。（下称“本服务”）
					1.2 本服务包括余额支付和快捷支付两种类型。
					1.2.1 余额支付，指您使用本公司给您开立的支付账户中的余额进行资金转移的一种支付方式。您确认并同意本公司给您开立支付账户时，将您的微信号与该支付账户相关联，使得您可以通过微信的“零钱”功能使用该支付账户（以下所称的“零钱”即指该支付账户，也等同于《财付通服务协议》中所指的财付通账户）。您有权使用“零钱”中的余额进行消费和转账，若余额不足，您需先开通快捷支付，并向“零钱”充值，您也可以通过接收他人的转账来增加“零钱”的余额。
					1.2.2 快捷支付，指您委托本公司直接对您的银行账户进行资金扣划和归集操作的一种支付方式。快捷支付可以实现“零钱”的充值，以及消费、转账等功能。若您需要在微信客户端使用快捷支付，您应在微信客户端的“添加银行卡”页面输入您本人的真实姓名、身份证号、银行卡卡号、有效期(信用卡持卡人需填写)、银行预留手机号等信息，待前述信息经本公司和您的开户银行校验通过后，方能使用。你已知悉并同意，因您的银行账户的功能、限额、类别等情况发生变化，或银行账户被撤销或合并而无法正常使用本服务的，您需与银行协商解决并及时通知本公司，本公司可提供必要的支持和配合。	
					<button>确定</button>
				</div>
				
			</div>
			<div id="model" @click="fuwu" :class="{none:bool}"></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import vueAxios from 'vue-axios'
	Vue.use(vueAxios,axios)
	import $ from 'jquery'
		export default{
			components:{},
			data:function(){	
				return{
					nowpath:'red',
					bool:true,
					weixi:"weix2018232",
					zhifubao:"18780094025",
					url1:"static/img/yuan_07.jpg", //上面的url1访问不到data里面的数据require
					bools:false,
					data:[]
				}
			},
			methods:{
				go:function(){
					this.$router.go(-1)
				},
				//添加账户跳转页面
				add:function(){
					let _this = this; 
					$('#select').change(function(e){
						if($(this).val() == "3"){
							_this.$router.push({path:"/add"})
						}	
					});
					
					this.bools = !this.bools;
					
				},
				fuwu:function(){
					this.bool=!this.bool
				},
				yes:function(){
					if(this.url1 == "static/img/yuan_07.jpg"){
						this.url1 = "static/img/finish_06.jpg";
						$("#btn").attr('disabled',false);
					}else{
						this.url1 = "static/img/yuan_07.jpg";
						$("#btn").attr('disabled',true);
					}
					 
				}
			},
			mounted:function(){
				//隐藏账号
				 var zhifubao = this.zhifubao;
				  zhifubao = zhifubao.substring(0,3)+"****"+zhifubao.substring(8,11);
				  var weixi = this.weixi;
				  weixi = weixi.substring(0,3)+"****"+weixi.substring(8);
				 this.weixi = weixi;
				 this.zhifubao = zhifubao;
				 
				 
			},
			created:function(){
				
			}
	}
</script>

<style>
	.jiao{
	  content: '';
	  position: absolute;
	  top: 2.35rem;
	  left:90%;
	  border-top: 6px solid transparent;
	  border-left: 6px solid #CCCCCC;
	  border-bottom: 6px solid transparent;
	  border-right: 6px solid transparent;
	}
	#remaining .rotate{

		transform: rotate(90deg);
		}
	#remaining #model{width:100%;height:100%;background-color:rgba(0, 0, 0, 0.6);position:fixed;left:0;top:0;}
    #remaining{background-color:#f0f0f0;height:100%;}
    #remaining .conten{position: absolute;z-index: 10;background-color:white;padding:0.5rem;top: 0.2rem;left:5%;width:90%;margin-bottom:0.5rem;}
    
    #remaining select{margin-bottom:0;margin-top:0.2rem;font-size:0.35rem;-webkit-appearance:button;border:none;}
    #remaining .none{display:none;}
	#remaining .active{border-bottom:0.08rem solid #00a3eb;}
	#remaining header{width:1rem;text-align: center;background-color:#00a2ea;width:100%;color:white;font-size:0.3rem;line-height:1rem;padding:0 0.2rem;}
	#remaining header span{float: left;font-size:0.35rem;}
	#remaining header a{color:white;}
	#remaining header i{float: right;font-size:0.25rem;}
	#remaining nav{width:100%;height:0.9rem;background-color:white;}
	#remaining nav ul {width:100%;height:100%;}
	#remaining nav ul li{width:50%;height:100%;float: left;text-align: center;line-height:0.9rem;color:#000000;}
	#remaining p:nth-child(3){height:1rem;margin-top:0.2rem;background-color:white;padding:0 0.2rem;line-height:1rem;}
	#remaining p span{float: left;height:1rem;line-height:1rem;color:#000000;}
	#remaining p span img{width:0.5rem;height:0.5rem;margin-right:0.2rem;vertical-align: middle;}
	#remaining p i{float: right;}
	#remaining .tixian,#remaining .zhifu{width:100%;background-color:white;line-height:1rem;height:1rem;margin-top: 0.2rem;padding: 0 0.2rem}
	#remaining .tixian input,#remaining .zhifu input{width:53%;height:100%;border: none;color:#b5b5b5;font-size:0.3rem;}
	#remaining .tixian button{vertical-align:middle;background-color:#00a5ea;color:white;border-radius:0.1rem;width:1.25rem;height: 0.45rem;font-size:0.15rem;text-align: center;line-height: 0.4rem;
							padding: 0px;}
	#remaining .forget  a{height:0.67rem;line-height:0.67rem;float: right;font-size:0.25rem;margin-right:0.2rem;}
	#remaining .text{padding: 0 0.2rem;}
	#remaining .text p{color:#9c9c9c;font-size:0.23rem;}
	#remaining .radei{height:0.67rem;line-height:0.67rem;color:#818181;font-size:0.23rem;padding-left:0.2rem;}
	#remaining .radei img{width:0.3rem;height: 0.3rem;vertical-align:sub;}
	#remaining .button button{width:90%;margin:0 auto;background-color:#de3121;height:0.9rem;text-align: center;color:white;font-size:0.3rem;border-radius:0.1rem;margin-left:5%;margin-top:0.5rem;}
	
</style>