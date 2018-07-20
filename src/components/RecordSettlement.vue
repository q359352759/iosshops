<template>
	<div id="RecordSettlement">
		
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">结算记录</h1>
		</header>
		
		<div class="mui-content">
			
			<div class="box_1">
				<table class="table mui-text-center">
					<thead>
						<tr>
							<td>日期</td>
							<td>合计金额</td>
							<td>状态</td>
							<td>详情</td>
						</tr>
					</thead>
					<tbody v-for="(x,index) in list">
						<tr>
							<td class="time_1">{{x.createtime | format_Date}}</td>
							<td><span class="money_1">{{x.totalmoney | toFixed}}</span></td>
							<td>成功</td>
							<td>
								<i @click="open_table(index,$event)" class="icon iconfont icon-youjiantou"></i>
							</td>
						</tr>
						<tr class="table_box">
							<td colspan="4">
								<div>
									<table class="table mui-text-center">
										<tbody>
											<tr>
												<td><div>佣金</div>{{x.commission | toFixed}}</td>
												<td><div>差额</div>{{x.difference | toFixed}}</td>
												<td><div>补助</div>{{x.subsidy | toFixed}}</td>
												<td><div>奖励</div>{{x.reward | toFixed}}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				
				
				
			</div>
				<!--加载中-->
				<div class="Loading_1 mui-text-center" v-show="Loading_show">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="Loading_1 mui-text-center" v-show="list.length==0 && !Loading_show">
					暂无数据
				</div>
		</div>
		
	</div>
</template>

<script>
	import {http,dateFtt} from '@/assets/fc'
	export default{
		name:'',
		components:{},
		data:function(){
			return{
				list:[],
				pageIndex:1,
				pageLength:0,
				Loading_show:false,
				userinfo:{},		//用户基本信息
			}
		},
		methods:{
			
//			this.$router.push('/RecordSettlement');
			open_table:function(x,y){
//				console.log($(y.target))
//				$(y.target).hide()
				$(y.target).toggleClass('active');
				$('.box_1 .table_box').eq(x).children().children().slideToggle(300);
			},
			//查询合伙人结算记录的方法
			getAgentSettleGroup(){
				http('post','/agent/manager/agentSettleGroup/getAgentSettleGroup',{'agentId':this.userinfo.selfAgentId,pageNumber:this.pageIndex},this.getAgentSettleGroup_return)
			},
			getAgentSettleGroup_return(x){
				console.log('合伙人结算记',x)
//				this.list=x.data.list;
				//数组合并
				this.pageLength=x.data.pagesize
				this.list=this.list.concat(x.data.list);
				this.Loading_show=false;
			},
		},
		mounted:function(){
			var this_1=this;
			// 先 获取用户基本信息
			http('post','/platform/cmembers/userInfo',{'uId':localStorage.ids},userInfo_return);
			function userInfo_return(x){
				console.log('用户基本信息',x);
				this_1.userinfo=x.data;
				this_1.getAgentSettleGroup();
			}
			
			var myDelay;
			function immediately_f(){
				console.log('立即执行');
				if(this_1.pageIndex<this_1.pageLength){
					this_1.Loading_show=true;
					this_1.pageIndex++;
					this_1.getAgentSettleGroup();
				}
			}
			function delayed_f(){
				console.log('延时执行')
			}
			$(window).scroll(function(){
				let scoroll_top=$(window).scrollTop();
				let scoroll_height=$('#RecordSettlement').height();
				let window_height=$(window).height();
				if(scoroll_top+window_height==scoroll_height){
					immediately_f();
					myDelay=setTimeout(function(){
						clearTimeout(myDelay);	//这样写可以防止重复提交
						delayed_f();
					},2000)
				}
			})
			
			
		},
		filters:{
			//时间
	        format_Date(time) {
	            return dateFtt(time, "yyyy.MM.dd hh:mm");
	        },
	        //保留两位小数点
	        toFixed(x){
	        	var x=parseFloat(x);
	        	return x.toFixed(2);
	        }
	    }
	}
</script>

<style>
	#RecordSettlement .Loading_1{
		padding: 0.1rem 0px;
	}
	#RecordSettlement .Loading_1 i{
		margin-right: 10px;
	}
	#RecordSettlement .Loading_1 i:before{
		animation: Loading_1 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading_1{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
 	#RecordSettlement .box_2{
 		margin: 0.2rem 0px 0px;
 		font-size: 0.28rem;
 		white-space: nowrap;
 		text-align: center;
 		background: #FFFFFF;
 		display: flex;
 		padding: 3px;
 	}
	#RecordSettlement .box_2>div{
		flex-grow:1;
	}
	#RecordSettlement .box_2>div:nth-child(1){
		flex: 110px;
	}
	#RecordSettlement .box_2>div:last-child{
		flex: 40px;
	}
	#RecordSettlement .box_2>div>div{
		padding: 3px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	
	
	#RecordSettlement .box_1{
		font-size: 0.28rem;
		/*background: #FFFFFF;*/
		/*padding: 0.1rem;*/
		white-space: nowrap;
	}
	#RecordSettlement .box_1 .time_1{
		color: #5d5d5d;
	}
	#RecordSettlement .box_1 .money_1{
		color: #00a2e9;
	}
	#RecordSettlement .box_1 .No_adopt{
		color: red;
	}
	#RecordSettlement .box_1 i{
		font-size: 0.24rem;
		color: #a2a2a2;
		transform: rotate(90deg);
		display: inline-block;
	}
	#RecordSettlement .box_1 i.active{
		transform: rotate(-90deg);
	}
	
	
	#RecordSettlement .box_1 thead>tr{
		color: #00a2e9;
		background: #FFFFFF;
		font-weight: bold;
	}
	#RecordSettlement .box_1 tbody>tr{
		background: #FFFFff;
	}
	#RecordSettlement .box_1 .table td,
	#RecordSettlement .box_1 .table th{
		position: relative;
	}
	#RecordSettlement .box_1 .table td:after{
		position: absolute;
		content: '';
		width: 1px;
		height: 50%;
		top: 25%;
		left: 0px;
		background: #CCCBCB;
	}
	#RecordSettlement .box_1 .table td:nth-child(1):after{
		display: none;
	}
	#RecordSettlement .box_1 .table_box>td{
		/*display: none;*/
		padding: 0px;
		border: none;
	}
	#RecordSettlement .box_1 .table_box table td{
		border: none;
	}
	#RecordSettlement .box_1 .table_box>td>div{
		display: none;
	}
	#RecordSettlement .box_1 .table_box>td>div td{
		background: #efeff4;
	}
	
    #RecordSettlement .table{
    	width: 100%;
    }
    /*#RecordSettlement .table th,*/
    #RecordSettlement .table tbody td {
       border-top:5px solid #CCCCCC;
       padding:10px 3px;
    }
    #RecordSettlement .table thead td {
     	padding:12px 3px;
    }
     	
    
	#RecordSettlement .mui-bar{
		background: #00a2e9;
	}
	#RecordSettlement .mui-title{
		color: #FFFFFF;
	}
	#RecordSettlement .mui-bar a{
		color: #FFFFFF;
	}
</style>