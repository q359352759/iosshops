<template>
	<div id="business" v-on:scroll="scroll_1()">
		
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">业务管理</h1>
		</header>
		
		<div class="mui-content">

			<div class="box_1">
		    	<div>
		    		<img :src="userInfo.photo"/>
		    	</div>
		    	<div>
		    		<div class="">合伙人: {{userInfo.realName ? userInfo.realName : userInfo.nick}}</div>
		    		<div class="reputation_1">等级：{{userInfo.start}}</div>
		    		<div>{{userInfo.area}}</div>
		    	</div>
		    	<div>
		    		<div>
			    		<router-link to="/experience">
			    			内部体验
			    		</router-link>
		    		</div>
		    		<div>
		    			<a class="erwei" @click="erwei()">
		    				二维码
		    			</a>		    			
		    		</div>
		    		<div>
		    			<a @click="change_Agreement(true)" href="javascript:;">
		    				业务合作协议
		    			</a>
		    		</div>
		    	</div>
		   	</div>
			<div class="box_2">
				<a class="" href="javascript:;">
					<div>会员</div>
					<span>{{Number_of_members}}</span>
				</a>
				<a class="" href="javascript:;">
					<div>商家</div>
					<span>{{business_list.length}}</span>
				</a>
				<a class="" href="javascript:;">
					<div>团队</div>
					<span>{{getAgentAge_list.rls.length}}</span>
				</a>
				<a class="" href="javascript:;">
					<div>可提现</div>
					<span>{{Settlement_list[9] | toFixed}}</span>
				</a>
			</div>
			
		    <!--<div class="mui-segmented-control mui-segmented-control-inverted">
			    <a class="mui-control-item mui-active" href="#business_item1">会员</a>
			</div>-->
			<!--<div id="business_item1" class="mui-control-content mui-active">1</div>-->
			<div class="box_3 mui-segmented-control mui-segmented-control-inverted">
				<a href="#business_item1"  class="mui-control-item">
					<div>
						<img src="@/assets/img/20180427094347.jpg"/>
					</div>
					<span>会员</span>
				</a>
				<a href="#business_item2" class="mui-control-item">
					<div>
						<img src="@/assets/img/20180427094316.jpg"/>
					</div>
					<span>商家</span>
				</a>
				<a href="#business_item3" class="mui-control-item">
					<div>
						<img src="@/assets/img/20180427094332.jpg"/>
					</div>
					<span>团队</span>
				</a>
				<a href="#business_item4" class="mui-control-item mui-active">
					<div>
						<img src="@/assets/img/20180427094341.jpg"/>
					</div>
					<span>结算</span>
				</a>
			</div>
			
			<div class="box_4">
				<div id="business_item1" style="min-height: 400px;" class="mui-control-content">
					
					<div class="fixed_1">
						<ul class="type_1">
							<li @click="change_class(0)" :class="{'active':active_1==0}">
								<div>自有会员</div>
							</li>
							<li @click="change_class(1)" :class="{'active':active_1==1}">
								<div>商家会员</div>
							</li>
							<li @click="change_screen('Old_member')" :class="{'screen_active':Old_member}">
								新老会员
								<i class="mui-icon mui-icon-arrowdown"></i>
							</li>
							<li @click="change_screen('Consumer_finance')" :class="{'screen_active':Consumer_finance}">
								消费金额
								<i class="mui-icon mui-icon-arrowdown"></i>
							</li>
							<img src="@/assets/img/245422094805749958.png"/>
						</ul>
						<table class="list_1">
							<thead>
								<tr>
									<td>
										名称
									</td>
									<td>佣金</td>
									<td  @click="open_1('hb_open')">
										HB
										<i class="open_1 icon iconfont icon-youjiantou"></i>
										<div>{{Hbtotal | toFixed}}</div>
									</td>
									<td class="hidden_2" :class="{'hidden_1':!hb_open}">累计HB</td>
									<td  @click="open_1('Settlement_open')">
										未结算
										<i class="open_1 icon iconfont icon-youjiantou"></i>
										<div>{{SettlementTotal | toFixed}}</div>
									</td>
									<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">已结算</td>
								</tr>
							</thead>
						</table>
					</div>
		
					<table class="list_1 list_1Original">
						<thead>
							<tr>
								<td>
									名称
								</td>
								<td>佣金</td>
								<td  @click="open_1('hb_open')">
									HB
									<i class="open_1 icon iconfont icon-youjiantou"></i>
									<div>{{Hbtotal | toFixed}}</div>
								</td>
								<td class="hidden_2" :class="{'hidden_1':!hb_open}">累计HB</td>
								<td  @click="open_1('Settlement_open')">
									未结算
									<i class="open_1 icon iconfont icon-youjiantou"></i>
									<div>{{SettlementTotal | toFixed}}</div>
								</td>
								<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">已结算</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(x,index) in list_1">
								<td>{{x.userName}}</td>
								<td>{{x.commision}}%</td>
								<td>{{x.newHb | toFixed}}</td>
								<td class="hidden_2" :class="{'hidden_1':!hb_open}">{{x.totalHb | toFixed}}</td>
								<td>{{x.noSettlement}}元</td>
								<td class="hidden_3" :class="{'hidden_1':!Settlement_open}">{{x.settlement | toFixed}}</td>
							</tr>
						</tbody>
					</table>
					
					<!--加载中-->
					<div class="Loading_1 mui-text-center" v-show="Loading_show">
						<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
					</div>
					<div class="Loading_1 mui-text-center" v-show="page_index>=totalpage && totalpage!=0 && !Loading_show">——我是有底线的——</div>
					<div class="Loading_1 mui-text-center" v-show="totalpage==0 && !Loading_show">暂无数据</div>
				</div>
				
				<div id="business_item2" class="mui-control-content">
					<table class="list_1">
						<thead>
							<tr>
								<td>商家名称</td>
								<td>加盟日期</td>
								<td>会员人数</td>
								<td>联系电话</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="x in business_list">
								<td>{{x.shopName}}</td>
								<td>{{x.addDate | formatDate}}</td>
								<td>{{x.memNum}}</td>
								<td>{{x.tel}}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="business_item3" class="mui-control-content">
					<ul class="hader_1">
						<li>
							<div>推广</div>
							<span>{{getAgentAge_list.MemMber}}人</span>
						</li>
						<li>
							<div>奖励金</div>
							<span>{{getAgentAge_list.bounty}}元</span>
						</li>
						<li>
							<div>已奖励</div>
							<span>{{getAgentAge_list.hasaward}}元</span>
						</li>
					</ul>
					
						<table class="list_1">
							<thead>
								<tr style="background: #FFFFFF;">
									<td>姓名</td>
									<td>等级</td>
									<td>会员</td>
									<td>金额</td>
									<td>详情</td>
								</tr>
							</thead>
							<tbody v-for="x in getAgentAge_list.rls">
								<tr>
									<td>{{x.name}}</td>
									<td>{{x.gradName}}</td>
									<td>{{x.memberCount}}</td>
									<td>{{x.money}}</td>
									<td>
										<i @click="open_table(0,$event)" class="icon iconfont icon-youjiantou"></i>
									</td>
								</tr>
								<tr class="list_details">
									<td colspan="5">
										<div>
											<table>
												<tbody>
													<tr>
														<td>
															<div>区域</div>
															<span>{{x.areaName}}</span>
														</td>
														<td>
															<div>差额</div>
															<span>{{x.diffBalance}}</span>
														</td>
														<td>
															<div>补助</div>
															<span>{{x.subsidy}}</span>
														</td>
														<td>
															<div>奖励</div>
															<!--3600 2925 2500 1925-->
															<!--<span v-show="x.gradName=='五星级'">3600</span>
															<span v-show="x.gradName=='四星级'">2925</span>
															<span v-show="x.gradName=='三星级'">2500</span>
															<span v-show="x.gradName=='二星级'">1925</span>-->
															<span>{{x.award}}</span>
														</td>
														<td>
															<div>已奖</div>
															<span>{{x.haveAward}}</span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							</tbody>
						</table>

				</div>
				<div id="business_item4" class="mui-control-content mui-active">
					<ul class="mui-table-view item4_list1">
					    <li class="mui-table-view-cell">
					        <a class="">
					        	<div>
					        		佣金:<span>{{Settlement_list[0] | toFixed}}</span>元
					        	</div>
					        	<div class="">
					        		累计:
					        		<span v-if="Accumulative.commission">{{Accumulative.commission | toFixed}}</span>
					        		<span v-if="!Accumulative.commission">0</span>
					        		元
					        	</div>
					        </a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a class="">
					        	<div>
					        		差额:<span>{{Settlement_list[1] | toFixed}}</span>元
					        	</div>
					        	<div class="">
					        		累计:
					        		<span v-if="Accumulative.balance">{{Accumulative.balance | toFixed}}</span>
					        		<span v-if="!Accumulative.balance">0</span>
					        		元
					        	</div>
					        	
					        </a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a class="">
					        	<div>
					        		补助:<span>{{Settlement_list[2] | toFixed}}</span>元
					        	</div>
					        	<div class="">
					        		累计:
					        		<span v-if="Accumulative.subsidy">{{Accumulative.subsidy | toFixed}}</span>
					        		<span v-if="!Accumulative.subsidy">0</span>
					        		元
					        	</div>
					        </a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a class="">
					        	<div>
					        		奖励:<span>{{Settlement_list[3] | toFixed}}</span>元
					        	</div>
					        	<div class="">
					        		累计:
					        		<span v-if="Accumulative.award">{{Accumulative.award | toFixed}}</span>
					        		<span v-if="!Accumulative.award">0</span>
					        		元
					        	</div>
					        	
					        </a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a class="">
					        	<div>
					        		合计:<span>{{Settlement_list[4] | toFixed}}</span>元
					        	</div>
					        	<div class="">
					        		累计:
					        			<span v-if="Accumulative.total">{{Accumulative.total | toFixed}}</span>
					        			<span v-if="!Accumulative.total">0</span>
					        		元
					        	</div>
					        </a>
					    </li>
					</ul>
					<ul class="mui-table-view item4_list2">
					    <li class="mui-table-view-cell">
					        <a class="javascript:;">
					        	<div class="mui-pull-left">
					        		加盟费<span>{{Settlement_list[8] | toFixed}}</span>元 <i @click="change_FranchiseFee(true)" class="mui-icon mui-icon-help"></i>
					        	</div>
					        	<div class="mui-text-right">已缴纳<span>{{Settlement_list[5] | toFixed}}</span>元</div>
					        </a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a class="javascript:;">
					        	<div class="mui-pull-left">
					        		现金券<span>{{Settlement_list[7] | toFixed}}</span>元
					        	</div>
					           	<div class="mui-text-right">已扣除<span>{{Settlement_list[6] | toFixed}}</span>元</div>
					        </a>
					    </li>
					    <li class="mui-table-view-cell black_1">
					        <a class="javascript:;">
					        	<div class="mui-pull-left">能提现金额</div>		
					        	<div class="mui-text-right"><span>{{Settlement_list[9] | toFixed}}</span>元</div>
					        </a>
					    </li>
					</ul>
					
					<div class="footer_1">
						<button class="mui-btn" @click="GoRecordSettlement()">结算记录</button>
						<button class="mui-btn" @click="change_drawing(true)">提交结算</button>
					</div>
				</div>
				
			</div>
			
			<div class="Agreement_mask" :class="{'active':Agreement_mask}">
				<header class="mui-text-center">
					<i @click="change_Agreement(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>业务合作协议</div>
				</header>
				<div class="Agreement_content">
					<businessagreement :partnername='userInfo.realName ? userInfo.realName : userInfo.nick'></businessagreement>
				</div>
			</div>
			
			<div class="FranchiseFee_mask" :class="{'active':FranchiseFee_mask}">
				<header class="mui-text-center">
					<i @click="change_FranchiseFee(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>加盟费缴纳说明</div>
				</header>
				<div class="FranchiseFee_content">
					<franchisefee></franchisefee>
				</div>
			</div>
			
			
		</div>
		<div class="mui-clearfix"></div>
		<!--根据身份信息生成推荐二维码-->
		<div id="agentId"  >
			<img :src="agentId" :class="{none:bool}" />
		</div>
		<div id="models" @click="hiddle" :class="{none:bool}" ></div>
		
		<div class="Not_open" v-show="!Not_open">
			<div>
			您未开通此业务
			<br /><br />
			即将自动跳转到首页
			</div>
		</div>
		
		<form  @submit.prevent="Settlement_ok()" class="drawing" :class="{'active':drawing_show}">
			<div class="header_1">
				<i @click="change_drawing(false)" class="mui-icon mui-icon-arrowleft"></i>
				<span>结算提现</span>
			</div>
			<ul>
				<li class="title_1">提现金额</li>
				<li class="text_1">
					<span>￥</span>
					<input type="text" readonly="" name="" id="" :value="Settlement_list[9] | toFixed" />
				</li>
				<!--<li class="footer_1">可提现金额{{Settlement_list[9] | toFixed}}</li>-->
			</ul>
			<ul>
				<li class="title_1">提现密码</li>
				<li class="text_1 input_box">
					<input type="password" required="" v-model="pwd" placeholder="请输入提现密码" />
				</li>
			</ul>
			<button class="btn_1">48小时内到账,确认提现</button>
		</form>
		
	</div>
</template>

<script>
	import {http,axios,ajaxs} from '@/assets/fc';
	import businessagreement from '@/components/businessagreement';		//业务合作协议
	import franchisefee from '@/components/FranchiseFee';		//加盟费缴纳说明
	export default{
		name:'',
		components:{
			businessagreement,
			franchisefee
		},
		data:function(){
			return{
				drawing_show:false,		//显示计算框
				Agreement_mask:false,	//协议弹出框
				FranchiseFee_mask:false,	//加盟费缴纳说明弹出框
				Monitor_scroll:3,		//是否监听滚动条 当0的时候就监听 
				Loading_show:false,		//是否显示正在加载中
				active_1:0,				//0自由会员，1商家会员
				uId:{'uId':localStorage.ids},		//测试可用485 获取数据
				hb_open:false,			//打开表格
				Settlement_open:false,	//打开表格
				Old_member:false,		//新老会员排序
				Consumer_finance:false,	//消费金融排序
				Hbtotal:0,				//HB
				SettlementTotal:0,		//为结算		
				list_1:[],				//会员
				Own_member_list:[],		//自由会员
				Merchant_members:[],	//商家会员
				business_list:[],		//商家
				getAgentAge_list:{
					'rls':[]
				},	//团队
				Settlement_list:[0,0,0,0,0,0,0,0,0,0],	//结算
				Number_of_members:0,	//总会员数
				totalpage:0,			//会员页数
				page_size:10,			//每页显示多少条
				page_index:1,			//当前页数
				userInfo:{},			//合伙人基本信息
				Accumulative:{},		//结算累计
				agentId:"",				//
				bool:true,
				Not_open:false,			//是否是合伙人
				pwd:'',					//提现密码
			}
		},
		filters:{
//			arr.sort((a, b) => new Date(b) - new Date(a))
			//时间格式化
			formatDate: function (value) {
				return value.substring(0,value.indexOf(' '));
			},
			//保留两位小数点
	        toFixed(x){
	        	if(!x || x==''){
	        		return x;
	        	}
//	        	var x=parseFloat(x);
	        	var x=Math.floor(x*100)/100; 
	        	return x.toFixed(2);
	        }
		},
		methods:{
			change_FranchiseFee(){
				this.FranchiseFee_mask=!this.FranchiseFee_mask
			},
			hiddle:function(){
				console.log(11)
				this.bool = !this.bool;
			},
			//根据身份信息生成推荐二维码
			resft:function(res){
				console.log('二维码',res)
				this.agentId=res.data.url;
				this.bool=!this.bool
			},
			//获取二维码
			erwei:function(){
				var data = {
					fixurl:'http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?type=0&Inviterid='+this.userInfo.selfAgentId,
					id:this.userInfo.selfAgentId,
					type:0	//0合伙人,1区域代理,2商家4,个人
				}
				//获取商家二维码(带背景图)
				ajaxs("get",liupeilin_ip+"/agent/manager/area/getSellerEncode",data,this.resft);
			},
			//时间排序
			orderby_time:function(arr,orderby){
				if(orderby){
		    		return arr.sort((a, b) => new Date(a.create) - new Date(b.create))
		    	}else{
		    		return arr.sort((a, b) => new Date(b.create) - new Date(a.create))
		    	}
			},
			//消费金额排序
			orderby_money:function(arr,orderby){
				if(orderby){
		    		return arr.sort((a, b) => a.noSettlement - b.noSettlement)
		    	}else{
		    		return arr.sort((a, b) => b.noSettlement - a.noSettlement)
		    	}
			},
			//点击结算
			change_drawing(x){
				this.drawing_show=x
			},
			Settlement_ok:function(){
				//会员提现申请接口	
//				var obj=new Object();
//					obj.memberid=localStorage.ids;
//					obj.openid=localStorage.openid;
//					obj.nickname=this.userInfo.nick;
//					obj.amount=this.Settlement_list[9];
//					obj.applytype=3		//提现类型  1:余额提现，2:红包提现，3:结算提现，4:股东提现,5:现金券提现，6:乐币提现,7商家余额提现
//					obj.pwd=this.pwd;
//					console.log(obj)
//				http('post','/hb/zlApplywithdraw/withDrawsls',obj,this.withDrawsls_return)
				//合伙人提现
				var obj=new Object();
					obj.id=this.userInfo.selfAgentId;
					obj.type=0;		//0:星级代理 1:区域代理 2 : 商家 3:默认经纪人 4 :个人
					obj.pwd=this.pwd;
					obj.openId= localStorage.openid;
					http('post','/agent/manager/agentSettle/cashApply',obj,this.cashApply_return)
				
//				mui.alert('你提现的金额,会在48小时内到账','恭喜你！结算成功。', function() {
//					console.log(1)
//				},function(){
//					console.log(2)					
//				}, 'div');
			},
			cashApply_return(x){
				this.drawing_show=false;
				this.getMultiple();
				console.log('合伙人提现申请',x)
				if(x.success){
					mui.alert('你提现的金额,会在48小时内到账','提示', function() {
						console.log(1)
					},function(){}, 'div');
				}else{
					mui.alert(x.msg,'提示', function() {
						console.log(1)
					},function(){}, 'div');
				}
			},
//			withDrawsls_return(x){
//				console.log('提现结果',x)
//				mui.alert(x.description+x.data,'提示', function() {
//					console.log(1)
//				},function(){}, 'div');
//				this.getMultiple();
//			},
			GoRecordSettlement:function(){
				this.$router.push('/RecordSettlement');
			},
			//展开table
			open_table:function(x,y){
				$(y.target).toggleClass('active');
				$(y.target).parents('tr').next().children().children().slideToggle(300)
			},
			//business_item1中 打开表格
			open_1:function(x){
				this[x]=!this[x]
				this.get_width();
			},
			//自由会员和商家会员分类
			change_class:function(x){
				this.active_1=x
				this.list_1=[];
				this.getAgentMem();
			},
			//新老会员、消费金额 筛选
			change_screen:function(x){
				this[x]=!this[x];
				if(x=='Old_member'){//新老会员
					this.list_1=this.orderby_time(this.list_1,this[x]);
				}else{
					this.list_1=this.orderby_money(this.list_1,this[x]);
				}
			},
			//给table设置宽度
			get_width(){
				setTimeout(function(){
					$('#business #business_item1 .list_1Original').children('thead').find('td').each(function(i){
						var width=$(this).outerWidth();
						$('#business #business_item1 .fixed_1 .list_1').children('thead').find('td').eq(i).css({'width':width+'px'})
					})
				},10);
			},
			//商家合作协议
			change_Agreement(x){
				this.Agreement_mask=x
			},
			//获取会员
			getAgentMem:function(){
				if(this.Loading_show){
					return
				}
				this.Loading_show=true;
				var obj={
					'uId':this.uId.uId,	//测试数据可用 482
					'size':this.page_size,
					'page':this.page_index,
					'type':this.active_1
				}
				http('post','/agent/manager/zlAgentInfo/getAgentMemByPage',obj,this.getAgentMem_return)
			},
			getAgentMem_return:function(x){
				console.log('查询某个合伙人发展的会员',x);
				this.list_1=this.list_1.concat(x.data.rls);	//会员列表
				this.Hbtotal=x.data.Hbtotal				//HB
				this.SettlementTotal=x.data.SettlementTotal		//为结算	
				this.Number_of_members=x.data.MemNumBer;
				this.totalpage=x.data.totalpage
				this.get_width();
				this.Loading_show=false;
			},
			getAgentSellerMem_return:function(x){
				console.log('查询某个经纪人下会员是商家的会员',x);
				this.list_1=x.data
			},
			//查询某个经纪人的商家
			getAgentSeller:function(){
				http('post','/agent/manager/zlAgentInfo/getAgentSeller',this.uId,this.getAgentSeller_return)
			},
			getAgentSeller_return:function(x){
				console.log('查询某个经纪人的商家',x)
				this.business_list=x.data;
			},
			//团队
			getAgentAge:function(){
				http('post','/agent/manager/zlAgentInfo/getAgentAge',this.uId,this.getAgentAge_return);
			},
			getAgentAge_return:function(x){
				console.log('某个合伙人推荐的合伙人',x);
				this.getAgentAge_list=x.data;
			},
			//结算
			getMultiple:function(){
				// 先 获取用户基本信息
				http('post','/platform/cmembers/userInfo',this.uId,this.userInfo_return)
			},
			userInfo_return:function(x){
				console.log('获取合伙人基本信息',x);
				this.userInfo=x.data;
//				结算综合信息
				var obj={'id':x.data.selfAgentId,'type':x.data.agentType};
				http('get','/agent/manager/agentSettle/getMultiple',obj,this.getMultiple_return);
				
				//查询合伙人结算累计信息
				this.getAgentInfoTotal()
			},
			getMultiple_return:function(x){
				console.log('结算综合信息',x)
				this.Settlement_list=x.data.multiple
			},
			//查询合伙人结算累计信息
			getAgentInfoTotal(){
				http('post','/agent/manager/agentSettle/getAgentInfoTotal',{'id':this.userInfo.selfAgentId},this.getAgentInfoTotal_return)
			},
			getAgentInfoTotal_return(x){
				console.log('合伙人结算累计信息',x);
				this.Accumulative=x;
			},
			//立即执行
			immediately_f(){
				console.log('立即执行')
				if(this.page_index<this.totalpage && !this.Loading_show){
					this.page_index++;
					this.getAgentMem();
				}
			},
			delayed_f(){
				console.log('延时执行')
			},
			scroll_1(){
				var this_1=this;
				var nDivHight = $('#business').outerHeight();
				var nScrollHight = $('#business')[0].scrollHeight;
     			var nScrollTop = $('#business')[0].scrollTop;
				var box_4_top=$('#business .box_4').offset().top
     			if(nScrollTop + nDivHight >= nScrollHight && this.Monitor_scroll==0){
					console.log('到达底部');
					this.immediately_f();
					this.myDelay=setTimeout(function(){
						clearTimeout(this_1.myDelay);	//这样写可以防止重复提交
						this_1.delayed_f();
					},2000)
				}
//				console.log(nScrollTop,box_4_top)
				if(box_4_top<=40){
//					console.log('定位');
					$('#business #business_item1 .fixed_1').addClass('active');
				}else{
//					console.log('取消定位');
					$('#business #business_item1 .fixed_1').removeClass('active');
				}
			},
		},
		mounted:function(){
			var this_1=this;
			if(!localStorage.ids){
				setTimeout(function(){
					this_1.$router.push('/home');
				},2000)
			}else{
				//判断是否是合伙人
				http('post','/mall/mobile/agentinfo/isAgentinfo',{'mid':localStorage.ids},isAgentinfo)
				function isAgentinfo(x){
					console.log('判断是否是合伙人',x)
					this_1.Not_open=x;
					if(!x){
						setTimeout(function(){
							this_1.$router.push('/home');
						},2000)
					}else{
						
						//查询某个经纪人的商家
						this_1.getAgentSeller();
						//团队
						this_1.getAgentAge();
						//结算
						this_1.getMultiple();
						
						setTimeout(function(){
							//获取会员
							this_1.getAgentMem();
						},5000)
						
					}
				}
			}
			
			this.get_width()
			
			mui(".box_3").on("tap","a",function(){
				this_1.Monitor_scroll=$(this).index();	//当index为0的时候监听滚动条信息
				if($(this).index()==0){
					
				}else if($(this).index()==1){
					
				}else if($(this).index()==2){
					
				}else{
					
				}
				
				setTimeout(function(){
					this_1.get_width();
				},500)
			});
			


			
		
		},
		created(){
			
		},
		watch:{
			
		}
	}
</script>

<style>
 	#business{
 		height: 100%;
 		overflow: auto;
 		min-height: 100%;
 		/*background: #efeff4;*/
 	}
 	#business .drawing.active{
 		top: 0px;
 		opacity: 1;
 	}
 	#business .drawing{
 		opacity: 0;
 		position: fixed;
 		top: 100%;
 		left: 0%;
 		width: 100%;
 		height: 100%;
 		background: #ececec;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#business .drawing>ul{
 		background: #FFFFFF;
 		margin: 0.2rem 0px;
 		padding: 0px 15px;
 	}
 	#business .drawing>ul>li{
 		padding: 5px;
 		display: flex;
 		align-items: center;
 	}
 	#business .drawing>ul>li input{
 		margin: 0px;
 		padding: 0px;
 		border: none;
 		
 		height: auto;
 	}
 	#business .drawing>ul>li.input_box input{
 		border-bottom: 1px solid #C9C9CE;
 	}
 	#business .drawing>ul>li.text_1{
 		padding: 10px 15px;
 		color: #2d2d2d;
 	}
 	#business .drawing .btn_1{
 		width: 90%;
 		margin: 0.2rem auto;
 		display: block;
 		background: #0087ff;
 		color: #FFFFFF;
 	}
 	#business .drawing .header_1{
		background: #FFFFFF;
		padding: 8px;
 	}
 	#business .drawing .header_1 i{
 		color: #0b7ed2;
 	}
 	#business .drawing .header_1 span{
 		display: inline-block;
 		padding: 0px 15px;
 		border-left: 1px solid #CCCCCC;
 	}
 	
 	
 	
 	
 	
 	
 	#business .Loading_1{
 		color: #5d5c5c;
 		padding: 0.1rem 0px;
 	}
	#business .Loading_1 i{
		margin-right: 10px;
	}
	#business .Loading_1 i:before{
		animation: Loading_1 3s linear infinite;
		display: inline-block;
	}
	@keyframes Loading_1{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
 	
 	#business .none{
 		display: none;
 	}
 	#business #models{
 		z-index: 1;
 		width:100%;height:100%;background-color:rgba(0, 0, 0, 0.6);position:fixed;left:0;top:0;
 	}
 	#business #agentId{
 		/*position: absolute;
 		top: 0px;
 		left: 0px;
 		right: 0px;
 		bottom: 0px;
 		margin: auto;
 		width: 6rem;
 		height: 8rem;
 		z-index: 2;
 		text-align: center;*/
 	}
 	#business #agentId img{
 		position: absolute;
 		top: 0px;
 		left: 0px;
 		right: 0px;
 		bottom: 0px;
 		margin: auto;
 		max-height:8rem;
 		max-width:6rem;
 		z-index: 2;
 	}
	#business .mui-content .erwei{
		margin:0 0 0.4rem;
	}

 	#business .Agreement_mask{
 		position: fixed;
 		width: 100%;
 		height: 100%;
 		left: 100%;
 		top: 0px;
 		background: #FFFFFF;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#business .Agreement_mask.active{
 		left: 0px;
 	}
	#business .Agreement_mask>header{
	    height: 40px;
	    line-height: 40px;
	    border-bottom: 1px solid #CCCCCC;
	    background: #FFFFFF;
	    position: relative;
	    z-index: 1;
	}
	#business .Agreement_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#business .Agreement_content{
		padding: 42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}
	
	#business .FranchiseFee_mask{
 		position: fixed;
 		width: 100%;
 		height: 100%;
 		left: 100%;
 		top: 0px;
 		background: #FFFFFF;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#business .FranchiseFee_mask.active{
 		left: 0px;
 	}
	#business .FranchiseFee_mask>header{
	    height: 40px;
	    line-height: 40px;
	    border-bottom: 1px solid #CCCCCC;
	    background: #FFFFFF;
	    position: relative;
	    z-index: 1;
	}
	#business .FranchiseFee_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#business .FranchiseFee_content{
		padding: 42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}
	
 	#business .box_4{
 		margin: 0.2rem 0px 0px;
 		padding: 1px 0px;
 	}
 	#business #business_item1 .fixed_1.active{
 		position: fixed;
 		top: 44px;
 		width: 100%;
 		z-index: 10;
 		left: 0px;
 		background: #efeff4;
 		overflow: hidden;
 		padding: 0rem 0px 0px;
 	}
 	#business #business_item1 .fixed_1 .list_1{
 		display: none;
 	}
 	#business #business_item1 .fixed_1.active .list_1{
 		display: table;
 	}
 	
 	
 	#business #business_item1 .type_1{
 		width: 100%;
 		display: flex;
 		background-color:#FFFFFF ;
 		overflow: hidden;
		text-align: center;
		font-size: 0.24rem;
		position: relative;
 	}
 	#business #business_item1 .type_1>img{
 		position: absolute;
 		top: -9px;
 		left: calc(50% - 27px);
 		width: 40px;
 	}
 	#business #business_item1 .type_1>li{
 		width: 25%;
 		position: relative;
 		/*background: #FFFFFF;*/
 		height: 0.6rem;
 		line-height: 0.6rem;
 		/*padding: 0px 5px;*/
 	}
 	#business #business_item1 .type_1>li:after{
 		position: absolute;
 		left: 0px;
 		top: 25%;
 		width: 1px;
 		height: 50%;
 		background: #FFFFFF;
 		content: '';
 	}
 	#business #business_item1 .type_1>li:nth-child(1):after{
 		display: none;
 	}
 	
 	#business #business_item1 .type_1>li:nth-child(1),
 	#business #business_item1 .type_1>li:nth-child(2){
 		background:#24c610 ;
 		color: #FFFFFF;
 	}
 	/*#business #business_item1 .type_1>li:nth-child(1).active:before,
 	#business #business_item1 .type_1>li:nth-child(2).active:before{
 		position: absolute;
 		left: 25%;
 		bottom: 2px;
 		width: 50%;
 		height: 1px;
 		background: #FFFFFF;
 		content: '';
 	}*/
 	#business #business_item1 .type_1>li>div{
 		position: relative;
 		display: inline-block;
 	}
 	#business #business_item1 .type_1>li:nth-child(1).active>div:after,
 	#business #business_item1 .type_1>li:nth-child(2).active>div:after{
 		display: inline-block;
 		border-bottom: 1px solid #FFFFFF;
 		position: absolute;
 		left: -5%;
 		bottom: 3px;
 		width: 110%;
 		height: 1px;
 		background: #FFFFFF;
 		content: '';
 	}
 	
 	#business #business_item1 .type_1>li:nth-child(3),
 	#business #business_item1 .type_1>li:nth-child(4){
 		background:#fa3457 ;
 		color: #FFFFFF;
 	}
 	#business #business_item1 .type_1>li i{
 		font-size: 0.20rem;
 		display: inline-block;
 	}
	#business #business_item1 .type_1>li.screen_active i{
		transform: rotate(180deg);
	}
 	
 	
 	
 	
 	#business #business_item1 .list_1{
 		width: 100%;
 		text-align: center;
		font-size: 0.22rem;
		position: relative;
		z-index: 1;
 	}
 	#business #business_item1 .list_1 .open_1{
 		font-size: 0.16rem;
 		color: #FFFFFF;
 	}
 	#business #business_item1 .list_1 .hidden_1{
 		display: none;
 	}
 	
 	#business #business_item1 .list_1>thead>tr{
 		background: #19b3f1;
 		color: #FFFFFF;
 	}
 	
 	#business #business_item2{
 		text-align: center;
 		font-size: 0.22rem;
 	}
 	#business #business_item2 .list_1>thead>tr{
 		background: #19b3f1;
 		color: #FFFFFF;
 	}
 	#business #business_item2 .list_1>tbody>tr:nth-child(1){
 		border-top: none;
 	}
 	
 	
 	#business #business_item2 table,
 	#business #business_item3 table{
 		width: 100%;
 	}
 	#business #business_item3 .list_1{
 		width: 100%;
 		margin: 0.12rem 0px 0px 0px;
 		text-align: center;
 		font-size: 0.22rem;
 	}
 	
 	#business #business_item1 .list_1>tbody>tr,
 	#business #business_item2 .list_1>tbody>tr,
 	#business #business_item3 .list_1>tbody>tr{
 		background: #FFFFFF;
 		border-top: 5px solid #efeff4;
 	}
 	#business #business_item1 .list_1 tr>td,
 	#business #business_item2 .list_1 tr>td,
 	#business #business_item3 .list_1 tr>td{
 		position: relative;
 		width: calc(100% / 6);
 	}
	#business #business_item1 .list_1 tr>td:after,
	#business #business_item2 .list_1 tr>td:after,
	#business #business_item3 .list_1 tr>td:after{
		position: absolute;
	    content: '';
	    width: 1px;
	    height: 50%;
	    top: 25%;
	    left: 0px;
	    background: #CCCBCB;
	}
	#business #business_item1 .list_1 tr>td:nth-child(1):after,
	#business #business_item2 .list_1 tr>td:nth-child(1):after,
	#business #business_item3 .list_1 tr>td:nth-child(1):after{
		display: none;
	}
	
 	#business #business_item1 .list_1 td,
 	#business #business_item2 .list_1 td,
 	#business #business_item3 .list_1 td{
 		padding: 9px 3px;
 	}
 	#business #business_item3 .list_1 i{
 		font-size: 0.20rem;
 		color: #00a2e9;
 		transform: rotate(90deg);
 		display: inline-block;
 	}
 	#business #business_item3 .list_1 i.active{
 		transform: rotate(-90deg);
 	}
 	
 	#business #business_item3 .list_1 .list_details{
 		/*display: none;*/
 		background: #EEEEEE;
 		border: none;
 	}
 	#business #business_item3 .list_1 .list_details>td{
 		padding: 0px;
 	}
 	#business #business_item3 .list_1 .list_details>td>div{
 		display: none;
 	}
 	#business #business_item3 .list_1 .list_details>td>div span{
 		margin-top: 3px;
 		display: inline-block;
 	}
 	
 	
 	#business #business_item3 .hader_1{
 		display: flex;
 		background: #19b3f1;
 		padding: 0.1rem 0px;
 		position: relative;
 		color: #FFFFFF;
 	}
 	#business #business_item3 .hader_1:after,
 	#business #business_item3 .hader_1:before{
 		position: absolute;
 		top: 20%;
 		content: '';
 		width: 1px;
 		height: 60%;
 		background: #ffffff;
 	}
 	#business #business_item3 .hader_1:after{
 		left: 33.3%;
 	}
 	#business #business_item3 .hader_1:before{
 		left: 66.6%;
 	}
 	#business #business_item3 .hader_1>li{
 		width: 33.3%;
 		text-align: center;
 	}
 	#business #business_item3 .hader_1>li>div{
 		font-size: 0.22rem;
 	}
 	#business #business_item3 .hader_1>li>span{
 		font-size: 0.20rem;
 	}
 	
 	
 	
 	#business #business_item4{
 		font-size: 0.24rem;
 	}
 	#business #business_item4 .item4_list2{
 		margin: 0.4rem 0px 0px;
 		color: #CA4406;
 	}
 	#business #business_item4 .item4_list2>li{
 		padding: 11px 25px;
 	}
 	#business #business_item4 .item4_list2 span{
 		margin: 0px 3px;
 	}
 	#business #business_item4 .item4_list2 i{
 		color: #00a2e9;
 		font-size: 15px;
    	margin: 0px 0px 0px 7px;
 	}
 	#business #business_item4 .item4_list2 .black_1{
 		color: #1F1F1F;
 	}
 	#business #business_item4 .footer_1{
 		display: flex;
 		display: -ms-flexbox;
 		display: -webkit-flex;
 		height: 0.7rem;
 		width: 66%;
 		margin: 0.2rem auto 0.3rem;
 		border-radius: 0.8rem;
 		overflow: hidden;
 	}
 	#business #business_item4 .footer_1 button{
 		width: 50%;
 		height: 100%;
 		border: none;
 		border-radius: 0px;
 		color: #FFFFFF;
 	}
 	#business #business_item4 .footer_1 button:nth-child(1){
 		background: #FF9701;
 	}
 	#business #business_item4 .footer_1 button:nth-child(2){
 		background: #FE4A02;
 	}
 	
 	
 	#business #business_item4 .item4_list1{
 		color: #1f1f1f;
 		letter-spacing: 2px;
 		background: none;
 	}
 	#business #business_item4 .item4_list1>li{
 		margin-bottom: 5px;
 		background: #FFFFFF;
 	}
 	#business #business_item4 .item4_list1>li:after{
 		display: none;
 	}
 	#business #business_item4 .item4_list1 a{
 		display: flex;
 	}
 	#business #business_item4 .item4_list1 a>div:nth-child(1){
 		color: #00a2e9;
 		width: 50%;
 		text-align: center;
 		position: relative;
 	}
 	#business #business_item4 .item4_list1 a>div:nth-child(1):after{
 		position: absolute;
 		content: '';
 		width: 1px;
 		height: 60%;
 		top: 20%;
 		right: 0px;
 		background: #CCCCCC;
 	}
 	#business #business_item4 .item4_list1 a>div:nth-child(2){
 		width: 50%;
 		text-align: center;
 	}
 	#business #business_item4 .item4_list1 span{
 		margin: 0px 3px;
 		letter-spacing: 1px;
 	}
 	#business #business_item4 .item4_list1 .mui-table-view-cell:after{
 		/*opacity: 0;*/
 	}
 	
 	
 	#business .box_3{
 		/*display: flex;
 		display: -ms-flexbox;
		display: -webkit-flex;
		justify-content: space-around;*/
		background: #FFFFFF;
		margin: 0.2rem 0px 0px 0px ;
		padding: 0.2rem 0px 0px;
 	}
 	#business .box_3 a{
 		/*display: block;*/
 		text-align: center;
 		color: #3c3c3c;
 		font-size: 0.24rem;
 		padding: 0px 0px 0.2rem;
 	}
 	#business .box_3 a>div{
 		width: 0.8rem;
 		height: 0.8rem;
 		margin: 0px auto 0.1rem;
 	}
 	#business .box_3 a img{
 		width: 100%;
 		height: 100%;
 	}
 	#business .box_3 .mui-control-item{
 		/*width: auto;*/
 		line-height: inherit;
 	}
	#business .box_2{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		background: #f4fff3;
		padding: 0.1rem 0px 0.1rem;
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #4d4d4d;
		text-align: center;
	}
	#business .box_2 a{
		width: 25%;
		line-height: 0.4rem;
		/*padding: 0.13rem 0px 0.13rem;*/
		color: #000000;
		position: relative;
	}
	#business .box_2 a:after{
		position: absolute;
		top: 10%;
		left: 0px;
		height: 80%;
		content: '';
		width: 1px;
		background: #d0d0d0;
	}
	#business .box_2 a:nth-child(1):after{
		display: none;
	}
	#business .box_2 .mui-active{
		color: #007aff;
		border-bottom:none;
	}
	
	
	#business .box_1{
		background: #FFFFFF;
		padding: 10px 0.23rem 0px 0.23rem;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
	}
	#business .box_1>div:nth-child(1){
		width: 1.46rem;
		height: 1.46rem;
		background-color: #CCCCCC;
		margin: 5px 0px 0px 0px;
		border-radius: 10px;
		overflow: hidden;
	}
	#business .box_1>div:nth-child(1) img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10px;
	}
	#business .box_1>div:nth-child(2){
		flex-grow:1;
		padding: 0.17rem  0px 0px 0.22rem;
		font-size: 0.22rem;
		letter-spacing: 1px;
		color: #656565;
	}
	#business .box_1>div:nth-child(3){
		text-align: right;
		font-size: 0.22rem;
		padding: 0.17rem  0px 0px 0px;
	}
	#business .box_1>div:nth-child(3)>div:nth-child(1){
		/*font-size: 0.24rem;*/
		/*margin-top:0.1rem;*/
		/*margin-bottom:0.1rem;*/
	}
	#business .box_1>div:nth-child(3)>div:nth-child(2){
		/*font-size: 0.22rem;*/
		margin: 0.1rem 0px;
	}
	
	#business .box_1 .reputation_1{
		margin: 0.1rem 0px;
	}
	#business .box_1 .reputation_1 i{
		color: #F0BA14;
	}

	#business .mui-bar{
		background: #00a2e9;
	}
	#business .mui-title{
		color: #FFFFFF;
	}
	#business .mui-bar a{
		color: #FFFFFF;
	}
</style>