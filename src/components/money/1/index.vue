<template>
	<div id="scrolls" v-on:scroll="scroll($event)">
		<div id="box2">
			<header>
				<ul>
					<li>
						<router-link to="/">
							<span><img src="../../../static/img/weixi_03.jpg" /></span><i>余额</i>
						</router-link>
					</li>
					<li>
						<router-link to="/profit">
							<span><img src="../../../static/img/weixi_04.jpg" /></span><i>分润</i>
						</router-link>
					</li>
					<li>
						<router-link to="/tixian">
							<span><img src="../../../static/img/weixi_01.jpg" /></span><i>提现</i>
						</router-link>
					</li>
				</ul>
				<div class="personal">
					<router-link to='/shops'>
						<img src="../../../static/img/weixi_02.png" />
						<span>店铺</span>
					</router-link>
				</div>
			</header>
			<nav>
				<ul>
					<li>
						<!--<router-link to='/money/cash'>-->
						<a>
							<span>{{userCapital.dbbalance ? userCapital.dbbalance : 0}}元</span>
							<!--<span>{{cash ? cash : 0}}元</span>-->
							<i :class="{active:nowpath=='cash'}" @click="nowpath='cash'">现金券</i>
						</a>
						<!--</router-link>-->
					</li>
					<li>
						<!--<router-link to='/money/save'>-->
						<a>
							<span>{{save? save:0}}元</span>
							<i :class="{active:nowpath=='save'}" @click="nowpath='save'">省钱</i>
						</a>
						<!--</router-link>-->
					</li>
					<li>
						<!--<router-link to='/money/hb'>-->
						<a>
							<span>{{userCapital.hb_total ? userCapital.hb_total : 0}}个</span>
							<i :class="{active:nowpath=='hb'}" @click="nowpath='hb'">HB</i>
						</a>
						<!--</router-link>-->
					</li>
					<li>
						<!--<router-link to='/money/make'>-->
						<a>
							<span>{{make? make:'0元'}}</span>
							<i :class="{active:nowpath=='make'}" @click="nowpath='make'">赚钱</i>
						</a>
						<!--</router-link>-->
					</li>
				</ul>
			</nav>
		</div>
			
			<ul class="box_3">
				<li class="header">
					<div>类型</div>
					<div>金额</div>
					<div>时间</div>
				</li>
			</ul>
			<div class="box_3">
				<li v-for="x in list_all.list">
					<div>
						<span>{{x.remark}}</span>
					</div>
					<div>
						<span>{{x.amount}}</span>
					</div>
					<div>
						<span>{{x.createtime}}</span>
					</div>
				</li>
			</div>
	</div>
</template>
<script>
	import { ajaxs, http } from "../../assets/fc.js";
	import $ from 'jquery'
	export default {
		components: {},
		data: function() {
			return {
				nowpath: 'cash',
				save: "",
				hb: "",
				cash: "",
				make: "",
				cashs: "",
				pageNumber: 1,
				pagesize: 6,
//				sid: localStorage.getItem("ids"),
				sid: 485,
				data: '',
				userCapital:{},		//用户资产
				//来源类型
				type:["","交易获得","积分抵扣","会员邀请","返利积分","每日登录","绑定微信","订单评价","管理员操作","完善用户信息","取消订单","其他","签到","微信活动","代理商邀请会员注册有礼","HB 充值"],
				list_all:{			//查询所有
					firstPage:true,
					lastPage:false,
					list:[],
					pageNumber:1,
					pageSize:20,
					totalPage:1,
					totalRow:1
				},
				
			}
		},
		methods: {
			hbBalance: function(res) {
				this.make = res.data.hb;
			},
			//滚动条事件传值 
			scroll: function(e) {
				var _this = this;
				var nDivHight = $(e.target).outerHeight();
				var nScrollHight = $(e.target)[0].scrollHeight;     
				var nScrollTop = $(e.target)[0].scrollTop;
				//console.log(nScrollTop,nDivHight,nScrollHight)
				if(nScrollTop + nDivHight >= nScrollHight && this.pageNumber < this.pagesize) {
					console.log('到底了')
//					this.pageNumber++;
					//console.log(this.pageNumber)
//					_this.ziyuan();
				}
			},
//			ziyuan: function() {
//				var _this = this;
//				var nowpath = this.nowpath;
//				console.log(nowpath)
//				switch(nowpath) {
//					case 'save':
//						_this.axios.get(liupeilin_ip + '/mall/mobile/manualOrder/getManualOrderByMemberId?memberId=' + this.sid + '&&pageNumber=' + this.pageNumber + '&&pageSize=' + this.pagesize).then((res) => {
//							_this.data = res.data.data
//							console.log(_this.data, 123372)
//						}, response => {
//							console.log("error");
//						});
//						break;
//					case 'hb':
//						_this.axios.get(liupeilin_ip + '/mall/mobile/memberredpacketrecord/getMemberredpacketrecordByMemberId?memberId=' + this.sid + '&&pageNumber=' + this.pageNumber + '&&pageSize=' + this.pagesize).then((res) => {
//							_this.data = res.data.data;
//						}, response => {
//							console.log("error");
//						});
//						break;
//					case 'make':
//						_this.axios.get(liupeilin_ip + '/mall/mobile/memberdividend/getMemberdividend?memberId=' + this.sid + '&&pageNumber=' + this.pageNumber + '&&pageSize=' + this.pagesize).then((res) => {
//							_this.data = res.data.data;
//
//						}, response => {
//							console.log("error");
//						});
//						break;
//					case 'cash':
//						_this.axios.get(liupeilin_ip + '/mall/mobile/capitaldetail/getCapitaldetail?capitalId=' + this.sid + '&&pageNumber=' + this.pageNumber + '&&pageSize=' + this.pagesize).then((res) => {
//							_this.data = res.data.data;
//						}, response => {
//							console.log("error");
//						});
//						break;
//				}
//			},
			//查询用户资产记录
			findCapitalDetail(type,data){
				var data=data;
				var obj=new Object();
					obj.id=this.sid;
					obj.type=type;		//-1 全部	，1 = "HB 充值"; 2 = "分享得现金券"; 3 = "会员到店消费商家让利充值"; 
					obj.size=20
					obj.num=data.pageNumber
				http('post','/platform/zlCapitalDetail/findCapitalDetail',obj,findCapitalDetail_return);
				function findCapitalDetail_return(x){
					console.log('查询用户资产记录',x);
					console.log(data)
					data.list=data.list.concat(x.list);
					data.totalRow=x.totalRow;
					data.lastPage=x.lastPage;
					data.firstPage=x.firstPage;
				}
			},
		},
		mounted: function() {
			var this_1=this;
			var a = this.$route.path;
			this.nowpath = a.substring(7);
			console.log(this.nowpath)
			//查询用户资产记录
			this.findCapitalDetail(-1,this.list_all);
			//获取用户的资产信息
			http('post','/platform/zlCapital/userCapital',{'uId':this.sid},userCapital_return)
			function userCapital_return(x){
				console.log('获取用户的资产信息',x);
				if(x.code=="10000"){
					this_1.userCapital=x.data;
				}
			}
			
			
			
		},
		created: function() {
			
			//累计分润显示
			var data = {
				memberId: this.sid
			};
			ajaxs("post", liupeilin_ip + "/hb/hbDistribution/hbindex", data, this.hbBalance)
			//省钱总金额
			this.axios.get(liupeilin_ip + '/mall/mobile/manualOrder/getSumMoneyByMemberId?memberId=' + this.sid + '&&pageNumber=1&&pageSize=10').then((res) => {
				this.save = res.data.data
			}, response => {
				console.log("error");
			});
			//现金券和hb总金额
			this.axios.get(liupeilin_ip + '/mall/mobile/capital/getCapital?menId=' + this.sid).then((res) => {
				this.hb = res.data.data.hbbalance;
				this.cash = res.data.data.dbbalance;
			}, response => {
				console.log("error");
			});
			//赚钱总金额
			this.axios.get(liupeilin_ip + '/mall/mobile/memberdividend/getSumAmountMoney?memberId=' + this.sid).then((res) => {}, response => {
				console.log("error");
			});
		}
	}
</script>
<style>
	i {
		font-style: normal;
	}
	
	body {
		-webkit-text-size-adjust: none;
	}
	#scrolls{
		height: 100%;
		overflow: auto;
	}
	#scrolls .box_3>li{
		display: flex;
		text-align: center;
		background: #FFFFFF;
		margin: 0.1rem 0px;
		font-size: 0.28rem;
	}
	#scrolls .box_3>li.header{
		background: #19b3f1;
		color: #FFFFFF;
	}
	#scrolls .box_3>li>div{
		width: 33.3%;
		padding: 8px 0px;
		position: relative;
		display: flex;
		justify-content: center;
    	align-items: center;
	}
	#scrolls .box_3>li>div:nth-child(1):after{
		display: none;
	}
	#scrolls .box_3>li>div:after{
		content: '';
		position: absolute;
		left: 0px;
		top: 20%;
		width: 1px;
		height: 60%;
		background:#CCCCCC;
	}
	
	
	#box2 {
		width: 100%;
		font-size: 0.2rem;
	}
	
	#scrolls {
		height: 100%;
		overflow: scroll;
	}
	
	#box2 .personal a {
		color: #353535;
	}
	
	#box2 header {
		width: 100%;
		height: 1.7rem;
		background-color: #00a2e9;
		position: relative;
	}
	
	#box2 header ul {
		width: calc(50% - 0.18rem);
		height: 1.7rem;
		margin-left: 0.18rem;
		font-size: 0px;
	}
	
	#box2 header ul li {
		width: calc(100% / 3);
		height: 1.7rem;
		float: left;
		text-align: center;
		position: relative;
		padding-top: 0.38rem;
	}
	
	#box2 header ul li span {
		display: block;
	}
	
	#box2 header ul li i {
		font-size: 12px;
		color: #3e566a;
		color: white;
		font-size: 0.2rem;
		margin-top: 0.17rem;
		display: inline-block;
	}
	
	#box2 header ul li img {
		width: 0.52rem;
		height: 0.52rem;
		border-radius: 0.1rem;
	}
	
	#box2 header .personal {
		position: absolute;
		right: 0.32rem;
		top: 0.38rem;
	}
	
	#box2 nav {
		background-color: #f3f4f6;
		width: 100%;
		height: 1.45rem;
		padding-top: 0.2rem;
		box-sizing: border-box;
	}
	
	#box2 nav ul{
		display: flex;
		flex-wrap: nowrap;
		background-color: white;
		margin: 0 auto;
		height: 1.05rem;
	}
	
	#box2 nav ul li {
		width: 25%;
		margin: 0.12rem 0;
		text-align: center;
		border-right: 2px solid #cccccc;
	}
	
	#box2 nav ul li:nth-child(4) {
		border-right: none;
	}
	
	#box2 nav ul li span {
		display: block;
		color: #d55a5c;
		margin-bottom: 0.14rem;
	}
	
	#box2 nav ul li i {
		color: #7e7e80;
		display: inline-block;
		width: 1.1rem;
		padding-bottom: 0.1rem;
	}
	
	#box2 nav ul .active {
		border-bottom: 2px solid #00a2ea;
	}
	
	#box2 .personal img {
		width: 0.52rem;
		height: 0.52rem;
	}
	
	#box2 .personal span {
		color: white;
		font-size: 0.2rem;
		display: block;
		margin-top: 0.11rem;
	}
</style>