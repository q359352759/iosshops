<template>
	<div id="scrolls" v-on:scroll="scroll($event)">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">
		    	<span v-if="nowpath=='cash'">现金券</span>
		    	<span v-if="nowpath=='save'">省钱</span>
		    	<span v-if="nowpath=='hb'">HB</span>
		    	<span v-if="nowpath=='make'">赚钱</span>
		    </h1>
		</header>
		<div class="mui-content">
		    
		
			<div id="box2">
				<header>
					<ul>
						<!--<li>
							<router-link to="/">
								<span><img src="@/assets/img/weixi_03.jpg" /></span><i>余额</i>
							</router-link>
						</li>-->
						<li>
							<router-link to="/profit">
								<span><img src="@/assets/img/weixi_04.jpg" /></span><i>分润</i>
							</router-link>
						</li>
						<li>
							<router-link to="/tixian">
								<span><img src="@/assets/img/weixi_01.jpg" /></span><i>提现</i>
							</router-link>
						</li>
					</ul>
					<div class="personal">
						<router-link to='/shops'>
							<img src="@/assets/img/weixi_02.png" />
							<span>店铺</span>
						</router-link>
					</div>
				</header>
				<nav>
					<ul>
						<li>
							<!--<router-link to='/money/cash'>-->
							<a>
								<span>{{CapitalTotal.db ? CapitalTotal.db : 0}}元</span>
								<!--<span>{{cash ? cash : 0}}元</span>-->
								<i :class="{active:nowpath=='cash'}" @click="change_nowpath('cash')">现金券</i>
							</a>
							<!--</router-link>-->
						</li>
						<li>
							<!--<router-link to='/money/save'>-->
							<a>
								<span>{{CapitalTotal.integration ? CapitalTotal.integration : 0}}元</span>
								<i :class="{active:nowpath=='save'}" @click="change_nowpath('save')">省钱</i>
							</a>
							<!--</router-link>-->
						</li>
						<li>
							<!--<router-link to='/money/hb'>-->
							<a>
								<span>{{CapitalTotal.hb ? CapitalTotal.hb : 0}}个</span>
								<i :class="{active:nowpath=='hb'}" @click="change_nowpath('hb')">HB</i>
							</a>
							<!--</router-link>-->
						</li>
						<li>
							<!--<router-link to='/money/make'>-->
							<a>
								<span>{{CapitalTotal.fh ? CapitalTotal.fh : 0 }}元</span>
								<i :class="{active:nowpath=='make'}" @click="change_nowpath('make')">赚钱</i>
							</a>
							<!--</router-link>-->
						</li>
					</ul>
				</nav>
			</div>
			
			<ul class="box_3" :class="{'active':fixed}">
				<li v-if="nowpath!='make'" class="header">
					<div>类型</div>
					<div>金额</div>
					<div>时间</div>
				</li>
				<li v-if="nowpath=='make'" class="header">
					<div>分润号</div>
					<div>分润金额</div>
					<div>时间</div>
				</li>
			</ul>
			<!--现金券-->
			<div class="box_3" v-if="nowpath==''">
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
				<div class="mui-text-center Loading" v-show="list_all.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="!list_all.loading && list_all.list.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-show="list_all.list.length!=0 && list_all.lastPage">
					——我是有底线的——
				</div>
			</div>
			<!--现金券-->
			<div class="box_3" v-if="nowpath=='cash'">
				<li v-for="x in list_cash.list">
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
				<div class="mui-text-center Loading" v-show="list_cash.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="!list_cash.loading && list_cash.list.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-show="list_cash.list.length!=0 && list_cash.lastPage">
					——我是有底线的——
				</div>
			</div>
			<!--省钱-->
			<div class="box_3 save" v-if="nowpath=='save'"> 
				<li v-for="x in list_save.list">
					<div>
						<span>消费省钱</span>
					</div>
					<div>
						<span>{{x.integration}}</span>
					</div>
					<div>
						<span>{{x.createdate}}</span>
					</div>
				</li>
				<div class="mui-text-center Loading" v-show="list_save.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="!list_save.loading && list_save.list.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-show="list_save.list.length!=0 && list_save.totalPage==list_save.pageNumber && !list_save.loading">
					——我是有底线的——
				</div>
			</div>
			<!--hb-->
			<div class="box_3 hb"  v-if="nowpath=='hb'">
				<li v-for="x in list_hb.list">
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
				<div class="mui-text-center Loading" v-show="list_hb.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="!list_hb.loading && list_hb.list.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-show="list_hb.list.length!=0 && list_hb.totalPage==list_hb.pageNumber && !list_hb.loading">
					——我是有底线的——
				</div>
			</div>
			<!--赚钱-->
			<div class="box_3 hb"  v-if="nowpath=='make'">
				<li v-for="x in list_make.list">
					<div>
						<span>{{x.dividendnum}}</span>
					</div>
					<div>
						<span>{{x.amountmoney}}</span>
					</div>
					<div>
						<span>{{x.createtime}}</span>
					</div>
				</li>
				<div class="mui-text-center Loading" v-show="list_make.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="!list_make.loading && list_make.list.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-show="list_make.list.length!=0 && list_make.totalPage==list_make.pageNumber && !list_make.loading">
					——我是有底线的——
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { ajaxs, http } from "../../assets/fc.js";
	import $ from 'jquery'
	export default {
		components: {

		},
		data: function() {
			return {
				nowpath: '',	//cash 现金券 save 省钱 hb make 赚钱
				pageNumber: 1,
				pagesize: 6,
				sid:localStorage.getItem("ids"),
//				sid: 485,
				CapitalTotal:{},	//用户资产
				fixed:false,		//是否定位
				//来源类型
				type:["","交易获得","积分抵扣","会员邀请","返利积分","每日登录","绑定微信","订单评价","管理员操作","完善用户信息","取消订单","其他","签到","微信活动","代理商邀请会员注册有礼","HB 充值"],
				list_all:{			//查询所有
					firstPage:true,
					lastPage:false,
					list:[],
					pageNumber:1,
					pageSize:20,
					totalPage:1,
					totalRow:1,
					loading:false,
					type:-1,
				},
				list_cash:{			//cash 现金券
					firstPage:true,
					lastPage:false,
					list:[],
					pageNumber:1,
					pageSize:20,
					totalPage:1,
					totalRow:1,
					loading:false,
					type:1
				},
				list_save:{		//save 省钱
					firstPage:true,
					lastPage:false,
					list:[],
					pageNumber:1,
					pageSize:20,
					totalPage:1,
					totalRow:1,
					loading:false,
					type:3
				},
				list_hb:{			//hb
					firstPage:true,
					lastPage:false,
					list:[],
					pageNumber:1,
					pageSize:20,
					totalPage:1,
					totalRow:1,
					loading:false,
					type:0
				},
				list_make:{
					pageNumber:1,
					pageSize:20,
					list:[],
					totalPage:1,
					totalRow:1,
					loading:false,
				}
			}
		},
		methods: {
			hbBalance: function(res) {
				this.make = res.data.hb;	
			},
			//改变类型
			change_nowpath(x){
				this.nowpath= this.nowpath==x ? '' : x ;	//cash现金券 save省钱 hb make赚钱
			},
			//滚动条事件传值 
			scroll: function(e) {
				var _this = this;
				var nDivHight = $(e.target).outerHeight();
				var nScrollHight = $(e.target)[0].scrollHeight;     
				var nScrollTop = $(e.target)[0].scrollTop;
				console.log(nScrollTop,nDivHight,nScrollHight)
				if(nScrollTop + nDivHight >= nScrollHight && this.pageNumber < this.pagesize) {
					console.log('到底了')
					if(this.nowpath==''){		//cash 现金券 save 省钱 hb make 赚钱
//						if(!this.list_all.lastPage && !this.list_all.loading){
//							this.list_all.pageNumber++;
//							this.findCapitalDetail(this.list_all);
//						}
					}else if(this.nowpath=='cash'){		//现金券
						if(!this.list_cash.lastPage && !this.list_cash.loading){
							this.list_cash.pageNumber++;
//							this.findCapitalDetail(this.list_cash);
							this.getHbDbLog(this.list_cash)
						}
					}else if(this.nowpath=='save'){		//省钱
						if(this.list_save.totalPage>this.list_save.pageNumber && !this.list_save.loading){
							this.list_save.pageNumber++;
							this.getManualOrderByMemberId();	//获取用户省钱记录
						}
					}else if(this.nowpath=='hb'){		//hb
						if(!this.list_hb.lastPage && !this.list_hb.loading){
							this.list_hb.pageNumber++;
//							this.findCapitalDetail(this.list_cash);
							this.getHbDbLog(this.list_hb);
						}
					}else if(this.nowpath=='make'){		//赚钱
						if(this.list_make.pageNumber<this.list_make.totalPage &&　!this.list_make.loading){
							this.list_make.pageNumber++;
							this.getManualOrderByMemberId();	//获取用户省钱记录
						}
					}
				}
				this.fixed= nScrollTop>=157
			},
			//查询用户资产记录
			findCapitalDetail(data){
				data.loading=true;
				var obj=new Object();
					obj.id=this.sid;
					obj.type=data.type;		//-1 全部	，1 = "HB 充值"; 2 = "分享得现金券"; 3 = "会员到店消费商家让利充值"; 
					obj.size=20
					obj.num=data.pageNumber
				http('post','/platform/zlCapitalDetail/findCapitalDetail',obj,findCapitalDetail_return);
				function findCapitalDetail_return(x){
					console.log('查询用户资产记录',x);
					data.loading=false;
					data.list=data.list.concat(x.list);
					data.totalRow=x.totalRow;
					data.lastPage=x.lastPage;
					data.firstPage=x.firstPage;
				}
			},
			//获取分红记录
			getMemberdividend(){
				this.list_make.loading=true;
				var obj=new Object();
					obj.memberId=this.sid;
					obj.pageNumber=this.list_make.pageNumber;
					obj.pageSize=this.list_make.pageSize;
				http('post','/mall/mobile/memberdividend/getMemberdividend',obj,this.getMemberdividend_return)
			},
			getMemberdividend_return(x){
				console.log('赚钱',x)
				this.list_make.loading=false;
				this.list_make.list=this.list_make.list.concat(x.data.list);
				this.list_make.totalPage=x.data.totalPage;
			},
			//获取用户资产总额
			getCapitalTotal(){
				http('post','/platform/zlCapital/getCapitalTotal',{'id':this.sid},this.getCapitalTotal_return)
			},
			getCapitalTotal_return(x){
				console.log('获取用户资产总额',x);
				this.CapitalTotal=x;
			},
			
			//查询hb 现金券记录
			getHbDbLog(data){
				data.loading=true;
				var obj=new Object();
					obj.id=this.sid;
					obj.size=20;
					obj.num=data.pageNumber;
					obj.type=data.type;		
				http('post','/platform/zlCapitalDetail/getHbDbLog',obj,getHbDbLog_return);
				function getHbDbLog_return(x){
					console.log('查询hb现金券记录',x);
					data.loading=false;
					data.list=data.list.concat(x.list);
					data.totalRow=x.totalRow;
					data.lastPage=x.lastPage;
					data.firstPage=x.firstPage;
				}
			},
			//获取用户省钱记录
			getManualOrderByMemberId(){
				var this_1=this;
				this.list_save.loading=true;
				var obj=new Object();
					obj.memberId=this.sid;
					obj.pageSize=20;
					obj.pageNumber=this.list_save.pageNumber;
				http('post','/mall/mobile/manualOrder/getManualOrderByMemberId',obj,getManualOrderByMemberId_return);
				function getManualOrderByMemberId_return(x){
					this_1.list_save.loading=false;
					console.log('获取用户省钱记录',x);
					if(x.success){
						this_1.list_save.list=this_1.list_save.list.concat(x.data.list);
						this_1.list_save.totalRow=x.data.totalRow;
						this_1.list_save.totalPage=x.data.totalPage;
					}
				}
			},
			
			
		},
		mounted: function() {
			var this_1=this;
			var params = this.$route.params;
			console.log(params)
			this.nowpath=params.type ? params.type : 'cash'
			//查询用户资产记录
//			this.findCapitalDetail(this.list_all);	//cash 现金券 save 省钱 hb make 赚钱
//			this.findCapitalDetail(this.list_cash);	//现金券
//			this.findCapitalDetail(this.list_save);	//省钱
//			this.findCapitalDetail(this.list_hb);	//hb
			this.getMemberdividend();	//赚钱  获取分红记录接口
			this.getHbDbLog(this.list_hb);	//查询hb现金券记录	Hb
			this.getHbDbLog(this.list_cash);	//查询hb现金券记录	现金券
			this.getManualOrderByMemberId();	//获取用户省钱记录
			
			this.getCapitalTotal();		//获取用户资产总额
			//获取用户的资产信息
			
		},
		created: function() {

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
	
	#scrolls .Loading{
		padding: 0.1rem 0px;
		font-size: 0.28rem;
		color: #757575;
	}
	#scrolls .Loading i{
		margin-right: 10px;
	}
	#scrolls .Loading i:before{
		animation: Loading 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	#scrolls .box_3.active{
		position: fixed;
		top:38px;
		left: 0px;
		width: 100%;
		z-index: 1;
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