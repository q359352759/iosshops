<template>
	<div>
		<div id="logistics">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">物流详情</h1>
			</header>
			
			<div class="yudan clear" v-if="State">
				<div class="img">
					<img src="@/assets/img/wuliuss_03.jpg" />
				</div>
				<div class="yudan_content">
					<h4>{{ShipperCode}}</h4>
					<p>运单号:{{LogisticCode}}</p>		
				</div>
			</div>
			<div class="state">
				<ul class="clear">
					<li class="clear">
						<em :class="{actives:this.State==1}">已发货</em>
						<div class="flex">
							<i  :class="{color:this.State==1}"></i>
							<span></span>
						</div>

					</li>
					<li class="clear">
						<em :class="{actives:this.State==2}">运输中</em>
						<div class="flex">
							<i  :class="{color:this.State==2}"></i>
							<span></span>
						</div>
					</li>
					<li class="clear">
						<em :class="{actives:this.State==3}">已签收</em>
						<div class="flex">
							<i  :class="{color:this.State==3}">	</i>
							<span></span>
						</div>
					</li>
					<li class="clear">
						<em :class="{actives:this.State==4}">问题件</em>
						<div class="flex">
							<i  :class="{color:this.State==4}"></i>
						</div>
					</li>
				</ul>
			</div>
			<div class="track-rcol" v-if="State">
				<div class="track-list">
					<ul>
						<li v-for="(item,index) in data">
							<i class="node-icon"></i>
							<span class="time">{{item.AcceptTime}}</span>
							<span class="txt">{{item.AcceptStation}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="nones" v-if="!State">
				<div class="mui-pager" v-if="totalRow">
					当前页:{{currentPage}}/总页数:{{totalPage}}
				</div>
				<div class="mui-text-center nocontent" v-if="!totalRow">
					<img src="/static/img/1524726123.31800ab.jpg"> 
						<div>还没有物流消息</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import {axios,ajaxs} from '@/assets/fc'
	export default{
		components:{},
		data:function(){
				return{
						nowindex:1,
						State:"",
						data:[],
						LogisticCode:"",
						ShipperCode:""
				}
		},
		methods:{
			user:function(res){
				console.log(res)
				this.data = res.Traces.reverse()
				this.State = res.State
				this.LogisticCode =res.LogisticCode;
				this.ShipperCode =res.ShipperCode;
				console.log(res);
				
			}
		},
		created:function(){
			var data= this.$route.query;
//		 	var data ={expName:'京东',expNo:71157220914}
		 	ajaxs("post",liupeilin_ip+"/mall/mobile/order/getCourier",data,this.user)
		}
	}
</script>

<style>
	#logistics header{background-color:#00a2ea;color: white;}
	#logistics header a{color:white;}
	#logistics header h1{color:white;}
	#logistics .yudan{margin-top:44px;height:1.8rem;background-color:#f39726;padding:0.24rem;box-sizing: border-box;}
	#logistics .yudan .img img{height:1.3rem;width:1.3rem;margin-right:0.22rem;}
	#logistics .yudan .img,#logistics .yudan .yudan_content{float: left;}
	#logistics .yudan .yudan_content h4{color:white;}
	#logistics .yudan .yudan_content p{color:white;margin-top:0.22rem;}
	#logistics .nones{margin:0 auto;margin-top:20%;}
	#logistics ul li{list-style: none;}
	#logistics .track-rcol{width:100%; border: 1px solid #eee;background-color:white;margin-top:0.4rem;}
	#logistics .track-list{margin: 20px; padding-left: 5px; position: relative;}
	#logistics .track-list li{position: relative; padding: 0.4rem 0 0 0.25rem; line-height: 18px; border-left: 1px solid #d9d9d9; color: #999;}
	#logistics .track-list li.first{color: red; padding-top: 0; border-left-color: #fff;}
	#logistics .track-list li .node-icon{position: absolute; left: -6px; top: 50%; width: 11px; height: 11px; background: url(http://demo.daimabiji.com/3531/img/order-icons.png)  -21px -72px no-repeat;}
	#logistics .track-list li.first .node-icon{background-position:0 -72px;}
	#logistics .track-list li .time{margin-right: 20px; position: relative; top: 4px; display:block; vertical-align: middle;font-size:0.25rem;}
	#logistics .track-list li .txt{max-width: 600px; position: relative; top: 4px; display: inline-block; vertical-align: middle;margin-top:0.1rem;}
	#logistics .track-list li.first .time{margin-right: 20px; }
	#logistics .track-list li.first .txt{max-width: 600px; }
	#logistics .state{height: 1.8rem;padding:0.4rem 0.4rem 0.4rem 1rem;width:100%;background-color:white;}
	#logistics .state ul li{float: left;width:25%;}
	#logistics .state ul{margin:0 auto;}
	#logistics .state ul li em{color:#cccccc;margin-left:-0.25rem;}
	#logistics .state ul li .flex{display: flex;margin-top:0.1rem;}
	#logistics .state ul li i{width:0.2rem;height:0.2rem;background-color:#cccccc;border-radius:50%;display: block;}
	#logistics .state ul li span{width:1.45rem;height:0.04rem;background-color:#CCCCCC;display: block;margin-top:0.05rem;}
	
	#logistics .state ul li .actives{color:#ed9d2a;}
	#logistics .state ul li .color{background-color:#ed9d2a;}
	#logistics .track-list li:first-child{color:#060606;}
	
	
</style>