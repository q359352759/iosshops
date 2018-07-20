<template>
	<div id="group">
		
		<header>
			<center>
				<div class="inne">
					<div class="left">
						<router-link to="/manage">
							<div class="heade">
								<img :src="img" class="radius" />	
							</div>
						</router-link>
						<div class="name">
							<router-link to="/manage">
								<span>{{username? username:'昵称'}}</span>
							</router-link>	
							<img src="@/assets/img/group_06.jpg"  @click="weixi" />
						</div>
					</div>
					<!--<router-link to="/manage">
						<div class="right">
							个人中心
						</div>
					</router-link>-->
				</div>
			</center>
		</header>
		<div class="moneys">
			<ul>
				<li>
					<router-link to="/">
						<span>{{yuer? yuer:0}}元</span>
						<i>余额</i>
					</router-link>
				</li>
				<li>
					<router-link to="/money/hb">
						<span>{{hb? hb:0}}个</span>
						<i>HB</i>
					</router-link>
				</li>
				<li>
					<router-link to="/profit">
						<span>{{hbs ? hbs : 0}}</span>
						<i>分润</i>						
					</router-link>
				</li>
				
				<li>
					<router-link to="/money/cash">
						<span>{{cash ? cash:0}}元</span>
						<i>现金券</i>
					</router-link>
				</li>		
			</ul>
		</div>
		<div class="navs">
			<div class="didan">
				<span>我的订单</span>
				<router-link to="order">
					<em>查看更多订单&nbsp;<img src="@/assets/img/qianjing.png" /></em>
				</router-link>
				<div class="mui-clearfix"></div>
			</div>
			<div class="mui-clearfix"></div>
			<div class="contents">
				<ul>
					
						<li>
							<router-link to="/order/2">
								<span>
									<img src="@/assets/img/groups_03.jpg" />
								</span>
								<i>待付款</i>
							</router-link>
						</li>
					
					<li>
						<router-link to="/order/3">
							<span>
								<img src="@/assets/img/groups_05.jpg" />
							</span>
							<i>待发货</i>
						</router-link>
					</li>
					<li>
						<router-link to="/order/4">
							<span>
								<img src="@/assets/img/groups_07.jpg" />
							</span>
							<i>待收货</i>
						</router-link>
					</li>
					<li>
						<router-link to="/order/5">
							<span>
								<img src="@/assets/img/groups_09.jpg" />
							</span>
							<i>待评价</i>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<center>
			<nav>
				<ul>

					<router-link to="/tixian">
						<li>
							<img class="img_l" src="@/assets/img/tixian.png" />
							<span>提现</span>
							<img class="img_r" src="@/assets/img/qianjing.png" />
						</li>
					</router-link>
					<div class="cb"></div>
					<router-link to="Elated">
						<li>		
							<img class="img_l" src="@/assets/img/shoucang.png" />
							<span>收藏</span>
							<img class="img_r" src="@/assets/img/qianjing.png" />
						</li>
					</router-link>
					<div class="cb"></div>
					<router-link to="shoppingcart">
						<li>
							<img class="img_l" src="@/assets/img/gowuche.png" />
							<span>购物车</span>
							<img class="img_r" src="@/assets/img/qianjing.png" />
						</li>
					</router-link>
					<div class="cb"></div>
						<li @click="Shopmanagement()" v-if="isShop">
							<img class="img_l" src="@/assets/img/shangpu.png" />
							<span>商铺管理</span>
							<img class="img_r" src="@/assets/img/qianjing.png" />
						</li>
					<div class="cb"></div>
						<li @click="tobusiness" v-if="shopbool">
							<img class="img_l" src="@/assets/img/yewuguangli.png" />
							<span>业务管理</span>
							<img class="img_r" src="@/assets/img/qianjing.png" />
						</li>
					<div class="cb"></div>
				</ul>
			</nav>
		</center>
		<div class="model" :class="{none:bool}" @click="model"></div>
		<div class="img" :class="{none:bool}">
			<img :src="url" />
			<p>无需加好友向我付款</p>
		</div>
	</div>
</template>

<script>
	
	import {http,ajaxs} from "../../assets/fc.js"
	export default{
		components:{},
		data:function(){
			return{
				nowpath:'cash',
				save:"",
				hb:"",
				cash:"",
				make:"",
				cashs:"",
				username:"",
				img:require("@/assets/img/group_03.jpg"),
				bool:true,
				url:"",				//二维码
				shopbool:false,		//是否是城市合伙人
				isShop:false,		//是否是商家
				sid:localStorage.getItem("ids"),
				hbs:"",//累计分润
				yuer:""//余额
			}
		},
		mounted:function(){
				var a=this.$route.path;
				this.nowpath=a.substring(7)
				var img = localStorage.getItem("img")
//				this.url = img
		},
		methods:{
			tobusiness:function(){
				var _this = this
				if(!this.shopbool){
					mui.toast("你不是城市合伙人")
				}else if(this.shopbool){
					 _this.$router.push('/business')
				}
			},
			weixi:function(){
				this.bool=!this.bool;
			},
			model:function(){
				this.bool=!this.bool;
			},
			order:function(res){
				console.log(res,888888888)
			},
			Balance:function(res){
				this.hbs = res.data.hb;
				console.log(res,"累计分润")
			},
			userCapital:function(res){
				console.log(res,"个人资产")
				if(res.code==10000){
					this.yuer = res.data.balance
				}
			},
			Shopmanagement(){
				this.$router.push('/Shopmanagement');
			}
		},
		mounted:function(){
			console.log(localStorage.getItem("ids"))
			if(!localStorage.getItem("ids") || localStorage.getItem("ids")=='undefined'){
				console.log('没有登陆')
				this.$router.push('/login');
			}
		},
		created:function(){
			
			var id = localStorage.getItem("ids")
			var _this = this;
			//获取用户二维码
			var personal_obj=new Object();
				personal_obj.id=localStorage.getItem("ids");
				personal_obj.type=4;		//0合伙人,1区域代理,2商家4,个人
//				personal_obj.fixurl='http://m.hzjifen.com/index.html#/RedEnvelopes?type=4&Inviterid='+this.userId;
				personal_obj.fixurl=0	
			http('get','/agent/manager/area/getSellerEncode',personal_obj,personal_QR_code);
			function personal_QR_code(x){
				console.log('个人二维码',x)
				if(x.success){
					_this.url = x.data.url;
				}
			}
			
			//获取用户的资产信息
			var data={uId:this.sid};
			ajaxs("post",liupeilin_ip+"/platform/zlCapital/userCapital",data,this.userCapital)
			
			//累计分润显示
			var data={memberId:this.sid};
			ajaxs("post",liupeilin_ip+"/hb/hbDistribution/hbindex",data,this.Balance)
				//判断是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
				function isShop(x){
					console.log('判断是否是商家',x);
					_this.isShop=x.success
				}
			//省钱总金额
				http('get','/mall/mobile/manualOrder/getSumMoneyByMemberId?memberId='+this.sid+'&pageNumber=1&pageSize=10','',function(x){
					_this.save = x.data;
					console.log('省钱总金额',x)
				})
			 //现金券和hb总金额
			 	http('get','/mall/mobile/capital/getCapital?menId='+this.sid,'',function(x){
			 		console.log('现金券和hb总金额',x);
					if(x.data){
						_this.hb = x.data.hbbalance;
						_this.cash = x.data.dbbalance;	
					}
			 	})
				//赚钱总金额
				http('get','/mall/mobile/memberdividend/getSumAmountMoney?memberId='+this.sid,'',function(x){
					console.log('赚钱总金额',x)
					_this.make = x.data;
				})
			 	//判断是否是城市合伙人;
			 	http('get','/mall/mobile/agentinfo/isAgentinfo?mid='+id,'',function(x){
			 		console.log('判断是否是城市合伙人',x);
			 		_this.shopbool = x;
			 	})

			//获取用户二维码信息
			
			var data = {
					uId:id
				}
			var _this = this
			$.ajax({
				type:"post",
				url:liupeilin_ip+"/platform/cmembers/userInfo",
				async:true,
				data:data,
				success:function(res){
					console.log('返回用户的基本信息',res)
					if(res.success){
						_this.url = res.data.myQrcodeImg
						_this.img = res.data.photo
						_this.username = res.data.nick	
					}
				},
				error:function(res){
					console.log("失败",1000);	
				}
			});
			
			
		}
	}
</script>
<style>
	#group .none{display: none;}
	#group{
		height:100%;
		background-color:#d7d7d7;
		padding-bottom: 110px;
		overflow: auto;
	}
	#group .moneys ul {
		display: flex;
		background-color: white;
		margin-bottom: 0.2rem;
	}
	#group .moneys ul li{
		width:25%;
		height:1.31rem;
		text-align: center;
		
	}
	#group .moneys ul li span{
		display: block;
		color:#2facee;
		margin-top:0.2rem;
	}
	#group .moneys ul li span,#group .moneys ul li i{
		
	}
	#group .moneys a{display: block;}
	#group .moneys ul li i{
		color:#000;
		display: block;
		height:0.5rem;
		line-height: 0.5rem;
		font-size:0.32rem;
	}
	i {
		font-style: normal;
	}
	#group .navs .didan img{
		width:0.45rem ;
		height: 0.45rem;
		display: inline-block;
		vertical-align: sub;
	}
	#group .navs .didan{
		height:0.8rem;
		line-height: 0.8rem;
		border-bottom:3px solid #d7d7d7;
		background-color:white;
		padding: 0 0.38rem;
		box-sizing: border-box;
		font-size:0.3rem;
	}
	#group .navs .contents ul {
		display: flex;
		background-color:white;
		margin-bottom:0.2rem;
	}
	#group .navs .contents a{
		color:#262626;
		display: block;
	}
		#group .navs .contents ul li{
		width: 25%;
		height: 1.6rem;
		text-align: center;
	}
	#group .navs .contents ul li img{
		width: 0.45rem;
		height: 0.5rem;
		
	}
	#group .navs .contents ul li span{
		margin-top:0.3rem;
		display: block;
	}
		#group .navs .contents ul li i{
		font-size:0.32rem;
	}
	#group .navs .didan span{
		float: left;
	}
		#group .navs .didan em{
		float: right;
		color:#bdb9ba;
	}
	#group .p p{
		height:0.85rem;
		margin:0;
		text-align: center;
		line-height: 1.3rem;
		font-size:0.35rem;
		color:white;
	}
	#group .img img{
		width:4.27rem;
		height:4.27rem;
	}
	#group .img{
		position: fixed;
		left:20%;
		top:30%;
		z-index:11;
		text-align: center;
		background-color:white;
		padding:0.2rem;
	}
	#group .img p{
		font-size:0.3rem;
	}
	#group .model{
		width:100%;height:100%;background-color:#CCCCCC;position:fixed;left:0;top:0;opacity: 0.75;z-index:10;
	}
	#group header {
		width: 100%;
		background-color: #00a2ea;
		height: 2.56rem;
		font-size: 0.2rem;
		box-sizing: border-box;
	}
	#group .none{display:none;}
	#group .radius{border-radius:50%;}
	#group header .inne {
		width: 90%;
		padding-top: 0.8rem;
	}
	#group header .inne .left img {
		width: 1rem;
		height: 1rem;
	}
	
	#group .left .name,
	.left .heade {
		float: left;
	}
	#group .left .name span{display: block;color:white;}
	#group .left .name img{float: left;}
	
	#group .left .name {
		margin-left: 0.25rem;
		line-height: 0.7rem;
		color: #FFFFFF;
		font-size:0.35rem;
	}
	
	#group header .inne .left .name img {
		width: 0.3rem;
		height: 0.3rem;
		display: block;
	}
	
	#group header .inne .right {
		float: right;
		margin-top: 0.3rem;
		color: #FFFFFF;
		font-size: 0.35rem;
	}
	
	#group center nav {
		width: 100%;
		background-color: #ffffff;
	}
	
	#group center nav ul li {
		width: 100%;
		height: 1rem;
		font-size: 0.2rem;
		border-bottom: 1px solid #f5f5f5;
		line-height: 1rem;
		position: relative;
	}
	
	#group center nav ul li i {
		position: absolute;
		left: 60%;
		font-size:0.3rem;
	}
	
	#group center nav ul  a{
		color:#000000;
	}
	
	#group center nav ul li .img_l,
	#group nav ul li span {
		float: left;
		margin-left: 0.3rem;
		font-size:0.3rem;
	}
	
	#group center nav ul li .img_l {
		width: 0.5rem;
		height: 0.5rem;
		margin-left: 0.2rem;
		margin-top: 0.24rem;
	}
	
	#group center nav ul li .fen {
		width: 0.4rem;
		height: 0.51rem;
	}
	
	#group center nav ul li .img_r {
		float: right;
		margin-right: 0.4rem;
		height: 0.45rem;
		width: 0.45rem;
		margin-top: 0.25rem;
		font-size:0.35rem;
		display: block;
	}
	
	#group center nav ul li img {}
</style>