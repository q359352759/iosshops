<template>

		<div id="record" v-on:scroll="scroll_1()">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">提现记录</h1>
			</header>
			<div class="mui-content">
			    <table class="table_1" :class="{'active_1':istop}" style="text-align: center;border-top: none;border-left:none;border-right:none;">
			    	<tr class="tr1">
						<td><i>日期</i></td>
						<td><i>类型</i></td>
						<td><i>账户</i></td>
						<td><i>金额</i></td>
						<td>状态</td>
					</tr>
			    </table>
				<table border="1" class="table_2" style="margin:0.5rem auto 0px;text-align: center;border-top: none;border-left:none;border-right:none;">
					<tr class="tr1">
						<td><i>日期</i></td>
						<td><i>类型</i></td>
						<td><i>账户</i></td>
						<td><i>金额</i></td>
						<td>状态</td>
					</tr>
					<tr v-for="(item,index) in list">
						<td class="td_fi"><i>{{item.applytime}}</i></td>
						<td><i>{{applytype[item.applytype]}}</i></td>
						<td><i>{{item.nickname}}</i></td>
						<td><i>{{item.applyamount}}</i></td>
						<td class="td_end">{{status[item.applystatus]}}</td>
					</tr>
					<tr v-if="list.length==0">
						<td colspan="5">暂无数据</td>
					</tr>
				</table>
				<div class="mui-text-center Loading" v-if="Loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				
				<div class="mui-text-center Loading" v-if="data.lastPage && list.length!=0">——我是有底线的——</div>
				<div class="loading_1">
					<div></div>
				</div>
			</div>
		</div>

</template>
<script>
	import {http} from "@/assets/fc"
	export default{
			components:{},
			data:function(){	
				return{
					nowpath:'red',	
					data:{
						firstPage:false,
						lastPage:false,
						pageNumber:1,
						pageSize:20,	
						totalPage:0,	//总页数
						totalRow:0		//总条数
					},
					list:[],
					Loading:false,		//正在加载
					istop:false,		//是否到达顶部
					userid:localStorage.ids ? localStorage.ids :'',
					applytype:['','余额提现','红包提现','结算提现','股东提现','现金券提现','乐币提现','其他'],
					status:['','待处理','提现失败','提现成功','已拒绝']
				}
			},
			methods:{
				go:function(){
					this.$router.go(-1)
				},
				//获取提现记录
				withDrawslsList(){
					if(!this.Loading){
						this.Loading=true;
						var obj=new Object();
							obj.memberid=this.userid; //测试使用513
//							obj.memberid=513; //测试使用513
							obj.pageSize=this.data.pageSize;
							obj.pageNum=this.data.pageNumber;
						http('post','/hb/zlApplywithdraw/withDrawslsList',obj,this.withDrawslsList_return);
					}
				},
				withDrawslsList_return(x){
					console.log('获取提现记录',x);
					var this_1=this;
					this.data = x.data;
					this.list=this.list.concat(x.data.list)
//					concat
					this.Loading=false;
					setTimeout(function(){
						this_1.get_width()
					},20)
					
				},
				scroll_1(){
					var nDivHight = $('#record').outerHeight();
					var nScrollHight = $('#record')[0].scrollHeight;
	     			var nScrollTop = $('#record')[0].scrollTop;
//					var box_4_top=$('#record .box_4').offset().top
	     			if(nScrollTop + nDivHight >= nScrollHight-40 && !this.Loading && !this.data.lastPage){
//						console.log('到达底部');
						this.data.pageNumber++
						this.withDrawslsList();
					}				
					this.istop=nScrollTop>=25
//					if(box_4_top<=40){
//						$('#business #business_item1 .fixed_1').addClass('active');
//					}else{
//						$('#business #business_item1 .fixed_1').removeClass('active');
//					}
				},
				//给定位的table设置高度
				get_width(){
					var width_list=[];
					$('.table_1').children().children().each(function(x){
						$(this).width($('.table_2').children('.tr1').children().eq(x).width())
					})
				}
			},
			mounted:function(){
				this.withDrawslsList()
			
			},
			watch:{
				asyncArray:function(){
					this.$nextTick(function(){
						console.log(2222)
	    			});
				}
			}
	}
</script>
<style>
	#record{
		height: 100%;
		overflow: auto;
	}
	#record .Loading{
		padding: 0.1rem 0px;
	}
	#record .Loading i{
		margin-right: 10px;
	}
	#record .Loading i:before{
		animation: Loading 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
	
	#record .table_1{
		position: absolute;
		width: 100%;
		top: 44px;
		left: 0px;
		display: none;
	}
	#record .table_1.active_1{
		display: table;
	}
	#record .active{border-bottom:0.08rem solid #00a3eb;}
	#record header{width:1rem;text-align: center;background-color:#00a2ea;width:100%;color:white;font-size:0.3rem;line-height:1rem;}
	#record header span{float: left;font-size:0.5rem;padding-left:0.2rem;}
	#record header a{
		color: #FFFFFF;
	}
	#record .mui-title{
		color: #FFFFFF;
	}
	#record table{width:100%;}
	#record table{border:none;background-color:#FFFFFF;}
	#record table tr{
		font-size: 0.26rem;
		border:none;color:#7b7a82;height:0.8rem;border-top:0.1rem solid #CCCCCC;}
	#record table td{border:none;overflow: hidden;}
	#record table td>i{border:none;border-right:1px solid #CCCCCC;display: block;}
	#record table .tr1 td:nth-child(5){border-right:none;}
	#record table .td_fi{border-left: none;}
	#record table .td_end{border-right: none;color:#00e900;}
	#record table .tr1{color:#00a2e9;border-top:none}
	#record #tr1 td{white-space: nowrap;}
	
</style>