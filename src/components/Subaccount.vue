<template>
	<div id="Subaccount">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">子账号管理</h1>
		</header>
		<div class="mui-content">
		    
		    <div class="box_1">
			<!--mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary-->
				<div id="" class="mui-segmented-control mui-segmented-control-inverted">
					<a class="mui-control-item mui-active" href="#Subaccount_item1">分店</a>
					<a class="mui-control-item " href="#Subaccount_item2">报表</a>
				</div>
			
				<div id="Subaccount_item1" class="mui-control-content mui-active">
					
					<div class="add_shop">
						<router-link to="BranchShop">
							<span>+</span>
							新建分店
						</router-link>
					</div>

					<div class="box_2">
				    	<table class="table">
					    	<thead>
					    		<tr>
					    			<td>店名</td>
					    			<td>管理员</td>
					    			<td>手机</td>
					    		</tr>
					    	</thead>
					    	<tbody v-for="x in Son_User_list">
					    		<tr>
					    			<td>{{x.store_name}}</td>
					    			<td>{{x.administrator}}</td>
					    			<td>
					    				{{x.phone}}
					    				<i @click="open_table(0,$event)" class="icon iconfont icon-youjiantou"></i>
					    			</td>
					    		</tr>
					    		<tr class="hidden_1">
					    			<td colspan="3">
					    				<div>
					    					<table class="table">
						    					<tbody>
						    						<tr>
						    							<td style="width: 50%;">
						    								<div>地址</div>
						    								<span>{{x.address}}</span>
						    							</td>
						    							<td style="width: 50%;">
						    								<div>
						    									<font @click="change_modify_mask(true,x)">更改账号</font>
						    								</div>
						    								<span>{{x.username}}</span>
						    							</td>
						    						</tr>
						    					</tbody>
						    				</table>
					    				</div>
					    			</td>
					    		</tr>
					    	</tbody>
					    </table>
					    <div v-if="Son_User_list.length==0" class="No_data mui-text-center">暂无数据</div>
					    
				    </div>
					
				</div>
				<div id="Subaccount_item2" class="mui-control-content">
					
					<ul class="box_3">
						<li>
							<select name="" v-on:change="select_1()" v-model="Branch_shop_Id">
								<option value="暂无分店" selected="" v-if="Son_User_list.length==0">暂无分店</option>
								<option :value="x.ids" v-for="x in Son_User_list">{{x.store_name}}</option>
							</select>
							<i class="mui-icon mui-icon-arrowdown"></i>
						</li>
						<li>
							<div>
								<input @click="change_type(5,'startTime')" v-model="startTime" readonly=""  type="text" name="" id="" value="2018.04.06" />
							</div>
							<div>-</div>
							<div>
								<input @click="change_type(5,'endTime')" v-model="endTime" readonly=""  type="text" name="" id="" value="2018.04.06" />
							</div>
						</li>
					</ul>
					
					<ul class="box_4">
						<li>
							<div @click="change_type(1)" :class="{'active':show_type==1}">
								<span>周</span>
							</div>
							<div @click="change_type(2)" :class="{'active':show_type==2}">
								<span>月</span>
							</div>
							<div @click="change_type(3)" :class="{'active':show_type==3}">
								<span>季</span>
							</div>
							<div @click="change_type(4)" :class="{'active':show_type==4}">
								<span>年</span>
							</div>
						</li>
					</ul>
					
					<div :class="{'active':show_type==5}" class="box_5 mui-text-center">
						<table class="table">
							<thead>
								<tr>
									<td>
										<div>用户名</div>
										<span>{{obj.totalSize}}</span>
									</td>
									<td>
										<div>金额</div>
										<span>{{obj.totalMoney}}元</span>
									</td>
									<td>
										<div>154 HB</div>
										<span class="CashVolume">{{obj.casesum}}元卷 </span>
									</td>
									<td>
										<div>时间</div>
										<span>{{time_1}}</span>
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
						<div v-if="obj.list.length==0" class="No_data mui-text-center">暂无数据</div>
					</div>
					
					<div :class="{'active':show_type!=5}" class="box_6 mui-text-center">
						<table class="table">
							<thead>
								<tr>
									<td>
										<div>单量</div>
										{{specific_date.num}}单
									</td>
									<td>
										<div>均价</div>
										{{specific_date.avg}}元
									</td>
									<td>
										<div>总额</div>
										{{specific_date.total}}元
									</td>
								</tr>
							</thead>
						</table>
						
					</div>
					
				</div>
			</div>
		    
		    <div :class="{'active':modify_mask}" class="modify_mask">
		    	<div class="mask" @click="change_modify_mask(false)"></div>
		    	<form @submit.prevent="form_1()" class="mui-input-group">
		    		<h3 class="header mui-text-center">
		    			更换账号
		    		</h3>
					<div class="mui-input-row">
						<label>原账号</label>
						<input type="text" v-model="update_obj.username" placeholder="手机号"/>
					</div>
					<div class="mui-input-row">
						<label>新账号<span class="err_1" v-show="existed">账号已存在</span></label>
						<input type="text" v-on:blur="blur_1()" v-model="update_obj.newusername" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" placeholder="手机号" />
					</div>
					<div class="mui-input-row">
						<label>密码</label>
						<input type="text" v-model="update_obj.newpassword" required="" pattern="^[0-9a-zA-Z]{6,15}" placeholder="6-15为数字和字母组成" />
					</div>
					<div class="mui-input-row">
						<label>确认密码</label>
						<input type="text" v-model="update_obj.newpassword_1" required="" pattern="^[0-9a-zA-Z]{6,15}" placeholder="请再次输入密码" />
					</div>
					<div class="mui-input-row">
						<label>管理员</label>
						<input type="text" v-model="update_obj.administrator" placeholder="姓名" />
					</div>
					<div class="mui-input-row">
						<label>手机号</label>
						<input type="text" v-model="update_obj.phone" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" placeholder="常用联系电话"/>
					</div>
					<div class="mui-button-row">
						<button type="button" class="mui-btn mui-btn-blue" @click="change_modify_mask(false)">取消</button>
						&nbsp;&nbsp;
						<button type="submit" class="mui-btn mui-btn-danger">确认</button>

					</div>
				</form>
		    </div>
			
		</div>
	</div>
</template>

<script>
	//	这里面的 -webkit-mask-box-image 被注释掉了
	import '@/assets/mui/css/mui.picker.all.css'
	import '@/assets/mui/js/mui.picker.all'
	import {http,dateFtt} from '@/assets/fc'
	export default{
		components:{
		},
		data:function(){
			return{
				existed:false,				//账号已存在
				show_type:5,				//0:天 1:周 2:月 3:季 4年 5:指定日期
				modify_mask:false,			//显示弹出框
				startTime:'',
				endTime:'',
				shopId:1,
				Son_User_list:[],		//子账号数组
				update_obj:{},			//修改的子账号
				Branch_shop_Id:'暂无分店',		//分店id
				specific_date:{},	//按年月日查询的结果
				obj:{
					list:[]			//按制定日期查询
				},				
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
			//修改子账号
			form_1(){
				if(this.existed){
					mui.toast('账号已存在！',{duration:2000, type:'div' });
				}else if(this.update_obj.newpassword!=this.update_obj.newpassword){
					mui.toast('两次密码不相同！',{duration:2000,type:'div'});
				}else{
					var obj={
							'id': this.update_obj.ids,
							'newusername' : this.update_obj.newusername,
							'newpassword' : this.update_obj.newpassword,
							'newadministrator' : this.update_obj.administrator,
							'newphone' : this.update_obj.phone
						}
					this.modify_mask=false;
					http('post','/mall/mobile/sonUser/updateSonUser',obj,this.updateSonUser_returun);
				}
			},
			updateSonUser_returun(x){
				if(x){
					mui.toast('修改成功！',{duration:2000,type:'div'});
					this.findSonUserByShopId();
				}else{
					mui.toast('系统错误，请联系管理员！',{duration:2000,type:'div'});
				}
			},
			//判断账号是否存在
			blur_1(){
				if(this.update_obj.newusername){
					http('post','/mall/mobile/sonUser/isRepetition',{'username':this.update_obj.newusername},this.isRepetition_return)
				}
			},
			isRepetition_return(x){
				console.log(x);
				this.existed=x
			},
			//表格打开
			open_table:function(x,y){
				$(y.target).toggleClass('active');
				$(y.target).parents('tr').next().children().children().slideToggle(300);
//				$('.box_1 .table_box').eq(x).children().children().slideToggle(300);
			},
			//选择时间
			change_type:function(x,y){
				var this_1=this
				this.show_type=x;
				if(y){
//					var options={"type":"date","beginYear":2014,"endYear":2018}
					var options={
							type: 'date',
							beginDate: y=='startTime' ? '' : new Date(this_1.startTime),
							endDate: y=='startTime' ? new Date(this_1.endTime) : ''
						}
    				var picker = new mui.DtPicker(options);    //在外面没有设置$是mui的时候直接写mui
                    	picker.setSelectedValue(this_1[y]);
                    picker.show(function(rs) {
                    	this_1[y]=rs.value;
                    	this_1.report();
                    	this_1.time_1=this_1.time_difference(this_1.endTime,this_1.startTime);
//                      return false;    //这是阻止对话框关闭的
          				picker.dispose();  //释放组件资源，释放后将将不能再操作组件.所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例
					})
				}
				this.report();
			},
			//修改子账号的弹出框
			change_modify_mask:function(x,y){
				this.modify_mask=x;
				if(y){
					this.update_obj={}
					for(var key in y){
						this.update_obj[key]=y[key]
					}
				}
			},
			//查询指定店铺的子账号信息
			findSonUserByShopId(){
				http('post','/mall/mobile/sonUser/findSonUserByShopId',{'id':this.shopId},this.findSonUserByShopId_returun)
			},
			findSonUserByShopId_returun(x){
				console.log('查询指定店铺的子账号信息',x);
				this.Son_User_list=x
				this.Branch_shop_Id=x.length>0 ? x[0].ids : '暂无分店';
				this.report();
			},
			//子账号报表的功能
			report(){
				var obj={
						'id':this.Branch_shop_Id,
						'type':this.show_type,
						'starttime':dateFtt(this.startTime,'yyyy.MM.dd'),
						'endtime':dateFtt(this.endTime,'yyyy.MM.dd'),
					}
				console.log(obj)
				http('post','/mall/mobile/sonUser/report',obj,this.report_return);
			},
			report_return(x){
				console.log(x);
				if(this.show_type<5){
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
			},
			//选择分店
			select_1(){
				this.report();
			}
		},
		mounted:function(){
			var this_1=this;
			//判断用户是否是商家
			http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
			function isShop(x){
				console.log('判断用户是否是商家',x)
				if(x.success){
					this_1.shopId=x.message;
					//查询指定店铺的子账号信息
					this_1.findSonUserByShopId()
				}
			}

			
			
			function getCurrentMonthFirst(){
			 	var date=new Date();
			 		date.setDate(1);
//			 		return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
			 		return date.getFullYear()+'-'+(date.getMonth()<9? '0'+(date.getMonth()+1) : date.getMonth()+1)+'-'+(date.getDate()<9 ? '0'+date.getDate() : date.getDate());
			}
			function getCurrentMonthLast(){
			 	var date=new Date();
			 	var currentMonth=date.getMonth();
			 	var nextMonth=++currentMonth;
			 	var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
			 	var oneDay=1000*60*60*24;
			 	var date_1=new Date(nextMonthFirstDay-oneDay)
//			 	return date_1.getFullYear()+'.'+(date_1.getMonth()+1)+'.'+date_1.getDate();
			 	return date_1.getFullYear()+'-'+(date_1.getMonth()<9 ? '0'+(date_1.getMonth()+1) : date_1.getMonth()+1)+'-'+(date_1.getDate()<10 ? '0'+date_1.getDate() : date_1.getDate());
			}
			this.startTime =getCurrentMonthFirst();
			this.endTime =getCurrentMonthLast();
			this.time_1=this.time_difference(this.endTime,this.startTime);
		},
		created:function(){
			
		}
	}
</script>

<style>
	#Subaccount{
		height: 100%;
	}
	#Subaccount .mui-content{
		height: 100%;
	}
	#Subaccount .No_data{
		padding: 0.2rem;
		font-size: 0.26rem;
		color: #7d7d7d;
	}
	
	#Subaccount .table{
		width: 100%;
	}
	#Subaccount .modify_mask{
		position: fixed;
		left: 0px;
		top: 100%;
		width: 100%;
		height: 100%;
		opacity: 0;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-ms-transition: all 0.3s;
		-o-transition: all 0.3s;
		transition: all 0.3s;
		padding: 3rem 0px 0px;
		overflow: auto;
		z-index: 10;
	}
	#Subaccount .modify_mask.active{
		top: 0px;
		opacity: 1;
	}
	#Subaccount .modify_mask .mask{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.5);
	}
	#Subaccount .modify_mask h3{
		/*padding-top: 0.2rem;
		font-weight: 100;*/
		padding-top: 0.2rem;
	    font-weight: 100;
	    font-size: 0.36rem;
	    letter-spacing: 3px;
	    background: #69c1e6;
	    padding-bottom: 0.2rem;
	    color: #ffffff;
	}
	#Subaccount .modify_mask{
		font-size: 0.24rem;
	}
	#Subaccount .modify_mask input{
		font-size: 0.24rem;
	}
	#Subaccount .modify_mask label{
		line-height: 40px;
		padding: 0px 15px;
	}
	#Subaccount .modify_mask label .err_1{
		color: red;
		float: right;
		font-size: 0.22rem;
	}
	
	
	#Subaccount .box_5,
	#Subaccount .box_6{
		display: none;
	}
	
	#Subaccount .box_5.active,
	#Subaccount .box_6.active{
		display: block;
	}
	
	
	#Subaccount .box_6 tr,
	#Subaccount .box_5 tr{
		background: #FFFFFF;
		font-size: 0.22rem;
	}
	#Subaccount .box_5 span{
		display: inline-block;
		padding: 2px ;
		margin-top: 2px;
	}
	#Subaccount .box_5 .CashVolume{
		border-top: 1px solid #00a2e9;
	}
	
	
	#Subaccount .box_4{
		background: #FFFFFF;
		padding: 5px 0.2rem ;
		margin: 0.2rem 0px;
		color: #FFFFFF;
	}
	#Subaccount .box_4>li{
		width: 70%;
		margin: 0px auto;
		display: flex;
		background: #f92a45;
		border-radius: 0.6rem;
		/*padding: 0.1rem 0px;*/
		text-align: center;
		font-size: 0.24rem;
		overflow: hidden;
	}
	#Subaccount .box_4>li>div{
		flex-grow: 1;
		position: relative;
		padding: 0.1rem 0px;
	}
	#Subaccount .box_4>li>div span{
		display: inline-block;
		padding: 2px 4px;
	}
	#Subaccount .box_4>li>div.active{
		background:#00a2e9 ;
	}
	#Subaccount .box_4>li>div.active span{
		border-bottom: 2px solid #FFFFFF;
	}
	#Subaccount .box_4>li>div:after{
		position: absolute;
		top: 20%;
		left: -1px;
		width: 1px;
		height: 60%;
		content: '';
		background: #FFFFFF;
	}
	#Subaccount .box_4>li>div:nth-child(1):after{
		display: none;
	}
	
	
	#Subaccount .box_3{
		display: flex;
		background: #FFFFFF;
		padding: 0.05rem 0.2rem;
		margin: 0.2rem 0px;
		font-size: 0.24rem;
		line-height: 0.6rem;
	}
	#Subaccount .box_3>li{
		width: 50%;
		padding: 0px 0.1rem;
		position: relative;
		display: flex;
	}
	#Subaccount .box_3>li>div{
		height: 100%;
	}
	#Subaccount .box_3>li input{
		margin: 0px;
		padding: 0px 5px;
		background: none;
		height: 100%;
		border: none;
		font-size: 0.22rem;
	}
	#Subaccount .box_3>li i{
		position: absolute;
		right: 0.2rem;
		top: 0.1rem;
		font-size: 0.4rem;
	}
	#Subaccount .box_3 select{
		margin: 0px;
		padding: 0px 5px;
		height: 100%;
		background: none;
		position: relative;
		z-index: 1;
	}
	
	
	#Subaccount .box_2{
		font-size: 0.22rem;
		text-align: center;
	}
	
	#Subaccount .box_2 tr{
    	/*background: #FFFFFF;*/
	}
	#Subaccount .box_2>table>thead>tr,
	#Subaccount .box_2>table>tbody>tr{
		background: #FFFFFF;
	}
	#Subaccount .table tbody tr{
		border-top: 5px solid #CCCCCC;
	}
	#Subaccount .box_2 .icon-youjiantou{
		font-size: 0.24rem;
	    color: #a2a2a2;
	    -webkit-transform: rotate(90deg);
	    transform: rotate(90deg);
	    display: inline-block;
	}
	#Subaccount .box_2 .icon-youjiantou.active{
		transform: rotate(-90deg);
	}
	#Subaccount .table thead td{
		color: #00a2e9;
		padding: 12px 3px;
		position: relative;
	}
	#Subaccount .table tbody td{
		padding: 10px 3px;
		position: relative;
	}
	#Subaccount .table thead td:after,
	#Subaccount .table tbody td:after{
		position: absolute;
	    content: '';
	    width: 1px;
	    height: 50%;
	    top: 25%;
	    left: 0px;
	    background: #CCCBCB;
	}
	#Subaccount .table thead td:nth-child(1):after,
	#Subaccount .table tbody td:nth-child(1):after{
		display: none;
	}
	#Subaccount .box_2 .hidden_1{
		border-top: none;
		background: #ececec;
	}
	#Subaccount .box_2 .hidden_1>td{
		padding: 0px;
	}
	#Subaccount .box_2 .hidden_1 tr{
		border:none;
	}
	#Subaccount .box_2 .hidden_1>td>div{
		display: none;
	}
	#Subaccount .box_2 .hidden_1 font{
		color: #00a2e9;
	}
	#Subaccount .box_2 .hidden_1 span{
		margin: 5px 0px 0px;
		display: inline-block;
	}
	
	
	
	#Subaccount .box_1 .mui-segmented-control{
		width: 60%;
		margin: 5px auto;
		color: #FFFFFF;
		background: #f92a45;
		border-radius: 40px;
		overflow: hidden;
	}
	#Subaccount .box_1 .mui-control-item.mui-active{
		background: #00a2e9;
		border: none;
		color: #FFFFFF;
		position: relative;
		line-height: 35px;
	}
	#Subaccount .box_1 .mui-control-item.mui-active:after{
		position: absolute;
		bottom: 0.1rem;
		left: 0px;
		right: 0px;
		width: 50px;
		height: 1px;
		content: '';
		margin: 0px auto;
		background: #FFFFFF;
	}
 	#Subaccount #Subaccount_item1 .add_shop{
 		font-size: 0.24rem;
 		padding: 5px 10px;
 	}
 	#Subaccount #Subaccount_item1 .add_shop a{

 	}
	#Subaccount #Subaccount_item1 .add_shop span{
		display: inline-block;
		color: #FFFFFF;
		background: #e67575;
		border-radius: 100%;
		width: 0.3rem;
		height: 0.3rem;
		text-align: center;
		line-height: 0.32rem;
		margin-right: 0.02rem;
	}
	
	
	

	
	#Subaccount .mui-bar{
		background: #00a2e9;
	}
	#Subaccount .mui-bar a {
    	color: #FFFFFF;
	}
	#Subaccount .mui-title{
		color: #FFFFFF;
	}
	
</style>