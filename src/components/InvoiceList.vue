<template>
	<div id="InvoiceList">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">手工单记录</h1>
		</header>
		<div class="mui-content" v-on:scroll="scroll($event)">
		    
		    <ul class="box_1">
		    	<li class="header">
		    		<div>客户</div>
			    	<div>金额</div>
			    	<div>类型</div>
			    	<div>时间</div>
		    	</li>
		    	<li v-for="x in Record_obj.list">
		    		<div>{{x.memebername}}</div>
			    	<div>{{x.integration}}</div>
			    	<div>{{x.payway==1 ? 'HB' : '现金券'}}</div>
			    	<div>{{x.createdate}}</div>
		    	</li>
		    </ul>
		    	<div class="mui-text-center Loading" v-if="query_obj.loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-if="!query_obj.loading && Record_obj.length==0">
					暂无数据
				</div>
				<div class="mui-text-center Loading" v-if="!query_obj.loading && Record_obj.length!=0 && query_obj.pageNumber==Record_obj.totalPage">
					——我是有底线的——
				</div>
		</div>
	</div>
</template>

<script>
	import {http} from '@/assets/fc'
	export default{
		name:'',
		data(){
			return{
				userId:'',
				query_obj:{			//查询对象
					memberId:'',
					pageNumber:1,
					pageSize:20,
					loading:false
				},
				Record_obj:{
					list:[],
					totalPage:1,	//总页数
					totalRow:1		//总条数
				}
			}
		},
		methods:{
			//获取手工订单记录
			getManualOrderByMemberId(){
				this.query_obj.loading=true;
				http('post','/mall/mobile/manualOrder/getManualOrderByMemberId',this.query_obj,this.getManualOrderByMemberId_return)
			},
			getManualOrderByMemberId_return(x){
				console.log('获取手工订单记录',x);
				this.query_obj.loading=false;
				if(x.success){
//					this.Record_obj=x.data	
					this.Record_obj.list=this.Record_obj.list.concat(x.data.list);
					this.Record_obj.totalPage=x.data.totalPage
					this.Record_obj.totalRow=x.data.totalRow
					
				}
			},
			//滚动条
			scroll: function(e) {
				var _this = this;
				var nDivHight = $(e.target).outerHeight();
				var nScrollHight = $(e.target)[0].scrollHeight;     
				var nScrollTop = $(e.target)[0].scrollTop;
				if(nScrollHight-40 <= nDivHight+nScrollTop && !this.query_obj.loading && this.query_obj.pageNumber<this.Record_obj.totalPage){
					this.query_obj.pageNumber++
					this.getManualOrderByMemberId();
//					console.log('到达底部')
				}
			}

		},
		mounted(){
//			this.userId=localStorage.ids ? localStorage.ids : '';
			this.query_obj.memberId=localStorage.ids ? localStorage.ids : '';
			this.getManualOrderByMemberId();
			
			
		}
	}
</script>

<style>
	#InvoiceList{
		height: 100%;
	}
	#InvoiceList .mui-content{
		height: 100%;
		position: relative;
		overflow: auto;
	}
	#InvoiceList .box_1{
		padding: 0.7rem 0px 0px 0px;
	}
	
	#InvoiceList .box_1>li{
		display: flex;
	    text-align: center;
	    background: #fff;
	    margin: .1rem 0;
	    font-size: .28rem;
	}
	#InvoiceList .box_1>li.header {
		background: #19b3f1;
    	color: #fff;
    	margin: 0px;
    	position: fixed;
    	top:44px;
    	left: 0px;
    	width: 100%;
		z-index: 1;
	}
    
	#InvoiceList .box_1>li>div{
		width: 25%;
		text-align: center;
	    padding: 8px 0;
	    position: relative;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex-pack: center;
	    justify-content: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	#InvoiceList .box_1>li>div:nth-child(1):after {
		display: none;
	}
	#InvoiceList .box_1>li>div:after {
	    content: "";
	    position: absolute;
	    left: 0;
	    top: 20%;
	    width: 1px;
	    height: 60%;
	    background: #ccc;
	}
	
</style>