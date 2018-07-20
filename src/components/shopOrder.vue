<template>
	<div id="shopOrder">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">订单管理</h1>
		</header>
		<div class="mui-content">
					<ul class="box_4">
						<li>
							<div @click="change_type(0)" :class="{'active':show_type==0}">
								<span>周</span>
							</div>
							<div @click="change_type(1)" :class="{'active':show_type==1}">
								<span>月</span>
							</div>
							<div @click="change_type(2)" :class="{'active':show_type==2}">
								<span>季</span>
							</div>
							<div @click="change_type(3)" :class="{'active':show_type==3}">
								<span>年</span>
							</div>
						</li>
						<li>
							<span @click="change_type(4)">查询</span>
						</li>
					</ul>
					
					<ul class="box_3" v-show="show_type==4">
						<li>
							<div>
								<input v-model="starttime" class="time_1 starttime mui-text-right" readonly="" data-options='{"type":"date","beginYear":2014,"endYear":2018}' type="text"  value="" />
							</div>
							<div class="mui-text-center">-</div>
							<div>
								<input v-model="endtime" class="time_1 endtime" readonly="" data-options='{"type":"date","beginYear":2014,"endYear":2018}' type="text" value="" />
							</div>
						</li>
					</ul>	
					
					<ul v-show="show_type!=4" class="box_1">
						<li>
							<div>单量</div>
							{{specific_date.num}}单
						</li>
						<li>
							<div>均价</div>
							{{specific_date.avg}}元
						</li>
						<li>
							<div>总额</div>
							{{specific_date.total}}元
						</li>
					</ul>
					
					<div v-show="show_type==4" class="box_5 active mui-text-center">
						<table class="table">
							<thead>
								<tr>
									<td>
										<div>用户名</div>
										<span>{{obj.totalSize}}单</span>
									</td>
									<td>
										<div>金额</div>
										<span>{{obj.totalMoney}}元</span>
									</td>
									<td>
										<div>{{obj.hbsum}}HB</div>
										<span class="CashVolume">{{obj.casesum}}元卷 </span>
									</td>
									<td>
										<div>时间</div>
										<span>{{time_1}}天</span>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="x in obj.list">
									<td>{{x.username}}</td>
									<td>{{x.productTotalAmount}}</td>
									<td>{{x.hborcash}}{{x.getWay ? '元卷' : 'HB'}}</td>
									<td>{{x.orderDate | dataTime}}</td>
								</tr>
							</tbody>
						</table>
						<div v-if="obj.list.length==0" class="No_data">暂无数据</div>
					</div>
			
		</div>
	</div>
</template>

<script>
//	这里面的 -webkit-mask-box-image 被注释掉了
	import '@/assets/mui/css/mui.picker.all.css';
	import '@/assets/mui/js/mui.picker.all';
	import {http,dateFtt} from '@/assets/fc';
	export default{
		components:{
		},
		data:function(){
			return{
				show_type:0,	//显示类型 0周 1月 2季 3年 4指定日期
				starttime :'',	//开始时间
				endtime :'',	//结束时间
				shopId:1,		//店铺Id
				specific_date:{},	//按年月日查询的结果
				obj:{
					list:[]
				},				//按制定日期查询
				time_1:0			//多少天
			}
		},
		filters:{
			//时间格式化
			dataTime(time){
				return dateFtt(time,'yyyy-MM-dd')
			},
		},
		methods:{
			open_table:function(x,y){
				$(y.target).toggleClass('active');
				$(y.target).parents('tr').next().children().children().slideToggle(300);
//				$('.box_1 .table_box').eq(x).children().children().slideToggle(300);
			},
			//改变年月日等
			change_type:function(x){
				this.show_type=x;
				this.findOrderItem();
			},
			//选择日期
			change_1(){
				console.log(122)
			},
			//订单管理查询方法
			findOrderItem(){
				var obj={
						'id':this.shopId,
						'type':this.show_type,
						'starttime':this.starttime,
						'endtime':this.endtime
					}
				console.log(obj)
				http('post','/mall/mobile/shop/findOrderItem',obj,this.findOrderItem_return);
			},
			findOrderItem_return(x){
				console.log('订单管理查询',x);
				if(this.show_type<4){
					this.specific_date=x
				}else{
					this.obj=x
				}
			},
			//计算时间差
			time_difference(x,y){
				var d1 = new Date(y);
				var d2 = new Date(x);
				return parseInt(d2 - d1)/1000/60/60/24	//差距多少天
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
						this_1.findOrderItem();	//订单管理查询方法
					}
				}
			
			
			
//			console.log(this.time_difference('2018.5.3','2018.5.1'))
			
			
			function getCurrentMonthFirst(){
			 	var date=new Date();
			 		date.setDate(1);
			 		return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
			}
			function getCurrentMonthLast(){
			 	var date=new Date();
			 	var currentMonth=date.getMonth();
			 	var nextMonth=++currentMonth;
			 	var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
			 	var oneDay=1000*60*60*24;
			 	var date_1=new Date(nextMonthFirstDay-oneDay)
			 	return date_1.getFullYear()+'.'+(date_1.getMonth()+1)+'.'+date_1.getDate();
			}
			this.starttime =getCurrentMonthFirst();
			this.endtime =getCurrentMonthLast();
			this.time_1=this.time_difference(this.endtime,this.starttime);
			
			
			$('.time_1').click(function(){
				var time_this=$(this);
				var classname=$(this).is('.starttime');
       			var options={"type":"date","beginYear":2014,"endYear":2018}
    			var picker = new mui.DtPicker(options);    //在外面没有设置$是mui的时候直接写mui
                    picker.show(function(rs){
//                  	time_this.val(dateFtt(rs.value,'yyyy.MM.dd'));
                    	if(classname){
                    		this_1.starttime=dateFtt(rs.value,'yyyy.MM.dd')
                    	}else{
                    		this_1.endtime=dateFtt(rs.value,'yyyy.MM.dd')
                    	}
                    	this_1.time_1=this_1.time_difference(this_1.endtime,this_1.starttime);
                    	this_1.findOrderItem();	//查询
//                      return false;    //这是阻止对话框关闭的
          				picker.dispose();  //释放组件资源，释放后将将不能再操作组件.所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例;
          				
					})
			})
		},
		created:function(){
			
		}
	}
</script>

<style>
	#shopOrder{
		height: 100%;
	}
	#shopOrder .No_data{
		text-align: center;
		padding: 0.2rem;
		font-size: 0.26rem;
		color: #7d7d7d;
	}
	
	#shopOrder .box_1{
	    background: #FFFFFF;
    	font-size: 0.22rem;
    	display: flex;
	    color: #00a2e9;
	    text-align: center;
	    margin: 0.2rem 0px 0px 0px;
	}
	#shopOrder .box_1>li{
		width: calc(100% / 3);
   	 	padding: 12px 3px;
    	position: relative;
	}
	#shopOrder .box_1>li:after{
	    position: absolute;
    	content: '';
    	width: 1px;
	    height: 50%;
	    top: 25%;
	    left: 0px;
	    background: #CCCBCB;
	}
	#shopOrder .box_1>li:nth-child(1):after{
		display: none;
	}
	
	#shopOrder .box_5,
	#shopOrder .box_6{
		display: none;
		margin: 0.2rem 0px 0px;
	}
	
	#shopOrder .box_5.active,
	#shopOrder .box_6.active{
		display: block;
	}
	
	#shopOrder .box_6 tr,
	#shopOrder .box_5 tr{
		background: #FFFFFF;
		font-size: 0.22rem;
	}
	#shopOrder .box_5 span{
		display: inline-block;
		padding: 2px ;
		margin-top: 2px;
	}
	#shopOrder .box_5 .CashVolume{
		border-top: 1px solid #00a2e9;
	}
	
	
	#shopOrder .box_4{
		background: #FFFFFF;
		padding: 5px 0.2rem ;
		margin: 0.2rem 0px 0px;
		display: flex;
		
	}
	#shopOrder .box_4>li{
		display: flex;
	}
	/*#shopOrder .box_4 select{
		margin: 0px;
		padding: 0px;
	}*/
	
	#shopOrder .box_4>li:nth-child(1){
		flex-grow:1;
		color: #FFFFFF;
		/*width: 70%;
		margin: 0px auto;*/
		/*margin: 0px 0.1rem 0px 0px;*/
		margin: 0px 0.4rem 0px 0.4rem;
		display: flex;
		background: #c56125;
		border-radius: 0.6rem;
		text-align: center;
		font-size: 0.24rem;
		overflow: hidden;
	}
	#shopOrder .box_4>li:nth-child(2){
		 align-items:center;
		 font-size: 0.2rem;
		 padding:0px 0.4rem;
	}
	#shopOrder .box_4>li:nth-child(1)>div{
		padding: 0.1rem 0px 0.08rem;
	}
	
	#shopOrder .box_4>li>div{
		flex-grow: 1;
		position: relative;
	}
	#shopOrder .box_4>li>div span{
		display: inline-block;
		padding: 2px 4px;
	}
	#shopOrder .box_4>li>div.active{
		/*background: #00a2e9;*/
	}
	#shopOrder .box_4>li>div span{
		border-bottom: 2px solid #c56125;
	}
	#shopOrder .box_4>li>div.active span{
		border-bottom: 2px solid #FFFFFF;
	}
	#shopOrder .box_4>li>div:after{
		position: absolute;
		top: 20%;
		left: -1px;
		width: 1px;
		height: 60%;
		content: '';
		background: #FFFFFF;
	}
	#shopOrder .box_4>li>div:nth-child(1):after{
		display: none;
	}
	
	
	
	
	
	
	#shopOrder .box_3{
		/*display: flex;*/
		background: #FFFFFF;
		padding: 0.05rem 0.2rem;
		margin: 0px 0px 0.2rem;
		font-size: 0.24rem;
		line-height: 0.6rem;
		border-top: 1px solid #CCCCCC;
	}
	#shopOrder .box_3>li{
		/*width: 50%;*/
		padding: 0px 0.1rem;
		position: relative;
		display: flex;
	}
	#shopOrder .box_3>li>div{
		height: 100%;
		flex-grow:1;
	}
	#shopOrder .box_3>li input{
		margin: 0px;
		padding: 0px 5px;
		background: none;
		height: 100%;
		border: none;
		font-size: 0.22rem;
	}
	#shopOrder .box_3>li i{
		position: absolute;
		right: 0.2rem;
		top: 0.1rem;
	}
	#shopOrder .box_3 select{
		margin: 0px;
		padding: 0px 5px;
		height: 100%;
		background: none;
	}
	
	
	
	#shopOrder .table{
		width: 100%;
	}
	#shopOrder .table tbody tr{
		border-top: 5px solid #CCCCCC;
	}
	#shopOrder .table thead td{
		color: #00a2e9;
		padding: 12px 3px;
		position: relative;
	}
	#shopOrder .table tbody td{
		padding: 10px 3px;
		position: relative;
	}
	#shopOrder .table thead td:after,
	#shopOrder .table tbody td:after{
		position: absolute;
	    content: '';
	    width: 1px;
	    height: 50%;
	    top: 25%;
	    left: 0px;
	    background: #CCCBCB;
	}
	#shopOrder .table thead td:nth-child(1):after,
	#shopOrder .table tbody td:nth-child(1):after{
		display: none;
	}
	
	
	

	
	#shopOrder .mui-bar{
		background: #00a2e9;
	}
	#shopOrder .mui-bar a {
    	color: #FFFFFF;
	}
	#shopOrder .mui-title{
		color: #FFFFFF;
	}
	
</style>