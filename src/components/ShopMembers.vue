<template>
	<div id="ShopMembers">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">会员</h1>
		</header>
		
		<div class="mui-content">
			
			<div class="box_2">
				<ul class="">
					<li>
						<a :href="'#/Invoice?id='+shopId">手工单</a>
					</li>
					<li>
						<span @click="Settlement()">结算</span>
					</li>
					<li>
						<a @click="go()">结算记录</a>
					</li>
				</ul>
			</div>
			
			
			<div class="box_1">
				<div class="fixed_1">
					<table class="table_1">
						<thead>
							<tr>
								<td>名称</td>
								<td>佣金</td>
								<td  @click="open_1('hb_open')">
									HB
									<i class="open_1 icon iconfont icon-youjiantou"></i>
									<div>{{Total_hb}}</div>
								</td>
								<td class="hidden_2" :class="{'hidden_1':!hb_open}">累计HB</td>
								<td  @click="open_1('Settlement_open')">
									未结算
									<i class="open_1 icon iconfont icon-youjiantou"></i>
									<div>{{Total_Unsettled}}</div>
								</td>
								<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">已结算</td>
							</tr>
						</thead>
					</table>
				</div>
			    <table class="table_1 entity_1">
			    	<thead>
						<tr>
							<td>名称</td>
							<td>佣金</td>
							<td  @click="open_1('hb_open')">
								HB
								<i class="open_1 icon iconfont icon-youjiantou"></i>
								<div>{{Total_hb}}</div>
							</td>
							<td class="hidden_2" :class="{'hidden_1':!hb_open}">累计HB</td>
							<td @click="open_1('Settlement_open')">
								未结算
								<i class="open_1 icon iconfont icon-youjiantou"></i>
								<div>{{Total_Unsettled}}</div>
							</td>
							<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">已结算</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(x,index) in list_1">
							<td>{{x.userName}}</td>
							<td>{{x.commision}}%</td>
							<td>{{x.newHb}}</td>
							<td class="hidden_2" :class="{'hidden_1':!hb_open}">{{x.totalHb}}</td>
							<td>{{x.noSettlement}}元</td>
							<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">{{x.settlement}}</td>
						</tr>
					</tbody>
			    </table>
			    <div v-if="list_1.length==0" class="No_data">暂无数据</div>
		    </div>
		
		</div>
		
	</div>
</template>

<script>
	import {http} from '@/assets/fc'
	export default{
			components:{},
			data:function(){	
				return{
					type:0,
					list_1:[],
					hb_open:false,				//打开表格
					Settlement_open:false,		//打开表格
					shopId:1,
					Total_hb:0,					//hb集合
					Total_Unsettled:0,			//未结算
					openId:localStorage.openid ? localStorage.openid : '' 
				}
			},
			methods:{
				//结算记录
				go(){
					mui.toast('此功能暂未开放！',{ duration:2000, type:'div' })
				},
				//结算
				Settlement(){
					var this_1=this;
					mui.prompt('请输入支付密码','支付密码','提示',['取消','结算'],function(e){
						console.log(e);
						if(e.index==1 && e.value!=''){
							var obj=new Object();
								obj.shopId=this_1.shopId
								obj.openId=this_1.openId
								obj.pwd=e.value;
							http('post','/mall/mobile/shopAccount/applyWithdraw',obj,this_1.applyWithdraw_retunrn)
						}
					},'div');
					document.querySelector('.mui-popup-input input').type='password' 
				},
				applyWithdraw_retunrn(x){
					console.log(x)
					mui.alert(x.msg,'提示','确定',function(){},'div');
					this.findMemByShopid();
				},
				open_1(x){
					this[x]=!this[x];
					this.get_width()
				},
				//给table设置宽度
				get_width(){
					setTimeout(function(){
						$('#ShopMembers .box_1 .entity_1').children('thead').find('td').each(function(i){
							var width=$(this).outerWidth();
							$('#ShopMembers .fixed_1 .table_1').children('thead').find('td').eq(i).css({'width':width+'px'})
						})
					},10)
				},
				//查询商家下面会员的信息
				findMemByShopid(){
					http('post','/mall/mobile/shop/findMemByShopid',{'id':this.shopId},this.findMemByShopid_return);
				},
				findMemByShopid_return(x){
					console.log('查询商家下面会员的信息',x);
					this.list_1=x;
					var Total_hb=0					//hb集合
					var Total_Unsettled=0			//未结算
					for(var i=0;i<x.length;i++){
						Total_hb+=x[i].newHb;
						Total_Unsettled+=x[i].noSettlement;
					}
					this.Total_hb=Total_hb;
					this.Total_Unsettled=Total_Unsettled;
				}
			},
			mounted:function(){
				var this_1=this;
				
				//判断用户是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
				function isShop(x){
					console.log('判断用户是否是商家',x);
					if(!x.success){
						mui.toast('您还不是商家！',{ duration:'long', type:'div' });
					}else{
						this_1.shopId=x.message; 
						
						this_1.findMemByShopid();
					}
				}
								
				this.get_width();
				
			}
	}
</script>

<style>
	#ShopMembers{
		height: 100%;
	}
	#ShopMembers .box_2{
		padding: 1px 0px;
		position: absolute;
		top: 40px;
		left: 0px;
		width: 100%;
	}
	#ShopMembers .box_2>ul{
		display: flex;
		width: 80%;
		margin: 10px auto;
		border: 1px solid #CCCCCC;
		border-radius: 30px;
		height: 30px;
		background: #9c9c9c;
		position: relative;
	}
	#ShopMembers .box_2>ul:after,
	#ShopMembers .box_2>ul:before{
		position: absolute;
		content: '';
		height: 80%;
		width: 1px;
		top: 10%;
		background: #FFFFFF;
	}
	#ShopMembers .box_2>ul:after{
		left: 33.3%;
	}
	#ShopMembers .box_2>ul:before{
		left: 66.6%;
	}
	#ShopMembers .box_2 li{
		width: 33.3%;
		line-height: 28px;
		text-align: center;
	}
	#ShopMembers .box_2 li>*{
		display: inline-block;
		width: 100%;
		color: #000000;
		font-size: 0.28rem;
		color: #FFFFFF;
	}
	
	
	#ShopMembers .mui-content{
		height: 100%;
		padding-top: 88px;
	}
	#ShopMembers .No_data{
		text-align: center;
		padding: 0.2rem;
		font-size: 0.26rem;
		color: #7d7d7d;
	}
	
	
	
	#ShopMembers .box_1{
		position: relative;
		height: 100%;
		overflow: auto;
	}
	#ShopMembers .box_1 .fixed_1{
		position: fixed;
		width: 100%;
		left: 0px;
		top: 88px;
		z-index: 2;
	}
	#ShopMembers .table_1{
		width: 100%;
	    text-align: center;
	    font-size: 0.22rem;
	    position: relative;
	    z-index: 1;
	}
	#ShopMembers .table_1>thead>tr {
	    background: #19b3f1;
	    color: #FFFFFF;
	    white-space: nowrap;
	}
	#ShopMembers .table_1 td{
		padding: 9px 3px;
		position: relative;
		width: 25%;
	}
	#ShopMembers .table_1 td i{
		font-size: 12px;
	}
	#ShopMembers .table_1 td:after{
		position: absolute;
	    content: '';
	    width: 1px;
	    height: 50%;
	    top: 25%;
	    left: 0px;
	    background: #CCCBCB;
	}
	#ShopMembers .table_1 td:nth-child(1):after{
		display: none;
	}
	#ShopMembers .table_1 .hidden_1{
		display: none;
	}
	#ShopMembers .table_1 tbody>tr{
		background: #FFFFFF;
    	border-top: 5px solid #efeff4;
	}
	
	
	#ShopMembers .mui-bar{
		background: #00a2e9;
	}
	#ShopMembers .mui-title{
		color: #FFFFFF;
	}
	#ShopMembers .mui-bar a{
		color: #FFFFFF;
	}
</style>