<template>
	<div id="PartnerApplication">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">申请成为合伙人</h1>
		</header>
		
			<form class="form_1" @submit.prevent="form_1()">
			    <ul class="typeList">
			    	<li>
			    		<div>申请区域：</div>
			    		<div>
			    			<!--<input type="text" name="" id="" value="成都市武侯区联邦财富中心" />-->
			    			<div class="address_box">
			    				<div v-show="province.value">
			    					<span class="address_1">{{province.text}}</span>
			    					<span class="address_1">{{city.text}}</span>
			    					<span class="address_1">{{county.text}}</span>
			    				</div>
			    				<span v-show="!province.value" class="Prompt_1">点击选择区域</span>
			    			</div>
			    			<!--<button class="modify_1" type="button">修改</button>-->
			    		</div>
			    	</li>
			    </ul>
			    <ul class="typeList">
			    	<li>
			    		<div>真实姓名：</div>
			    		<div>
			    			<input type="text" required="" pattern="[\u4e00-\u9fa5]+$" maxlength="6" v-model="agentinfo_obj.name" placeholder="请输入中文名"/>
			    		</div>
			    	</li>
			    	<li>
			    		<div>手机号：</div>
			    		<div>
			    			<input type="text" required="" v-model="agentinfo_obj.phone" placeholder="请输入有效手机号码"/>
			    		</div>
			    	</li>
			    	<li>
			    		<div>推荐人：</div>
			    		<div>
			    			<input type="text" :readonly="isreferencePhone" required="" v-model="agentinfo_obj.referencePhone" placeholder="请输入推荐人手机号"/>
			    		</div>
			    	</li>
			    </ul>
			    <ul class="typeList">
			    	<li @click="change_Agreement(true,1)">
			    		<div>业务合作协议</div>
			    		<div><i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i></div>
			    	</li>
			    </ul>
			    <div class="Doubt_1"  @click="change_Agreement(true,2)">
			    	<i class="mui-icon mui-icon-help"></i>成为合伙人的好处
			    </div>
			    
			    <div class="btn_1">
			    	<button type="submit" class="mui-btn mui-btn-danger">提交</button>
			    </div>
			</form>
			
			<div class="Agreement_mask" :class="{'active':Agreement_mask}">
				<header class="mui-text-center">
					<i @click="change_Agreement(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>
						{{Agreement_type==1 ? '业务合作协议' : '成为合伙人的好处'}}
					</div>
				</header>
				<div class="Agreement_content">
					<businessagreement v-show="Agreement_type==1" :partnername='agentinfo_obj.name'></businessagreement>
					<partnerbenefits v-show="Agreement_type!=0"></partnerbenefits>
				</div>
			</div>
	</div>
</template>

<script>
	import '@/assets/mui/css/mui.picker.css';
	import '@/assets/mui/css/mui.poppicker.css';
	import '@/assets/mui/js/mui.picker';
	import '@/assets/mui/js/mui.poppicker';
//	合伙人合作协议
	import businessagreement from '@/components/businessagreement';
//	成为合伙人的好处
	import partnerbenefits from '@/components/PartnerBenefits';

	import {http,base64_splicing} from '@/assets/fc'
	export default{
		components:{
			businessagreement,
			partnerbenefits
		},
		data:function(){
			return{
				isreferencePhone:false,	//是否有营销顾问、推荐人
				Agreement_mask:false,
				Agreement_type:1,
				address_list:[],
				province:{},		//省
				city:{},			//市
				county:{},			//县
				agentinfo_obj:{
					id:localStorage.ids,	//当前用户登录id
					name:'',						//真实姓名
					phone:'',						//手机号
					referencePhone:'',				//推荐人手机号 13909008129
					areaid:''		//区县Id
				}
			}
		},
		methods:{
			form_1:function(){
				var phone=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;	//手机号码验证
				//去除空格
			 	this.agentinfo_obj.phone=this.agentinfo_obj.phone.replace(/\s+/g,"");
			 	this.agentinfo_obj.referencePhone=this.agentinfo_obj.referencePhone.replace(/\s+/g,"");
				if(!this.county.value && !this.city.value){
					mui.toast('请选择区域',{ duration:2000, type:'div' });
				}else if(!phone.test(this.agentinfo_obj.phone)){
					mui.toast('手机号码有误',{ duration:2000, type:'div' });
				}else if(!phone.test(this.agentinfo_obj.referencePhone)){
					mui.toast('推荐人手机号码有误',{ duration:2000, type:'div' });
				}else{
					this.agentinfo_obj.areaid=this.county.value ? this.county.value : this.city.value;
					console.log(this.agentinfo_obj)
					http('post','/mall/mobile/agentinfo/addAgentinfo',this.agentinfo_obj,this.add_agent,this.onprogress)
				}
			},
			//添加代理人返回值
			add_agent:function(x){
				var this_1=this
				console.log('申请成为合伙人',x);
				if(x.success){
//					mui.alert(x.data.message,'',function() {
//						this_1.$router.push('/home');
//					},function(){}, 'div');
					mui.alert('恭喜您成功申请XX区域XX星级城市合伙人，即日起，推荐本区域的星级合伙人可同享永续佣金收入、平台补助、佣金差额、平台奖励。','友情提示',function() {
						this_1.$router.push('/business');
					},function(){}, 'div');
				}else{
					mui.alert(x.message,'',function() {},function(){}, 'div');
				}

			},
			//隐藏和显示 合作协议弹框
			change_Agreement:function(x,y){
				console.log(x)
				this.Agreement_mask=x;
				if(y){
					this.Agreement_type=y
				}
			},
			onprogress:function(x){
				mui("#progressbar_1").progressbar().setProgress(20);
				console.log('提交进度',x)
			},
			
		},
		mounted:function(){
			
			var this_1=this;
			//查询所有的省市区信息
//			http('post','/agent/manager/area/findArea','',findArea_return);
//			function findArea_return(x){
//				console.log('查询所有的省市区信息',x);
//				this_1.address_list=x
//				PopPicker_1();
//			}
			
			//查询营销顾问
			http('post','/mall/mobile/shop/getAgentinfo',{'id':localStorage.ids},getAgentinfo)
			function getAgentinfo(x){
				console.log('查询营销顾问',x);
				this_1.isgetAgentinfo=x.success
				if(x.success){
					this_1.agentinfo_obj.referencePhone=x.data
				}
			}
			
			$.ajax({
				type:"get",
				url:"static/area.json",
				async:true,
				success:function(x){
					console.log('查询所有的省市区信息',x);
					this_1.address_list=x
					PopPicker_1();
				}
			});
			
			
			
			function PopPicker_1(){
//				var cityData = [{value: '820000',text: '澳门',children: [{value: "820100",text1: "澳门半岛"}]}]
				var data=this_1.address_list
				var list=[];
				//将格式转换成需要的格式
				for(var i=0;i<data.length;i++){
					var obj=new Object();
						obj.value=data[i].province.id;
						obj.text=data[i].province.areaname;
						obj.children=[];
						var listcity=data[i].listcity;
						for(var j=0;j<listcity.length;j++){
							var city_obj=new Object();
								city_obj.value=listcity[j].city.id;
								city_obj.text=listcity[j].city.areaname;
								city_obj.children=[];
								var districtList=listcity[j].districtList;
								for(var x=0;x<districtList.length;x++){
									city_obj.children.push({
										value:districtList[x].id,
										text:districtList[x].areaname
									})
								}
							obj.children.push(city_obj)
						}
					list.push(obj);
				    //这里是设置默认值
//				 	if(List[i].uname==store){  index=i }
				}
//				console.log(list);
				//级联示例
				var cityPicker = new mui.PopPicker({
					layer: 3
				});
				cityPicker.setData(list);
				var showCityPickerButton = $('#PartnerApplication .address_box')[0];
				showCityPickerButton.addEventListener('tap', function(event) {
							cityPicker.show(function(items) {
								console.log(items)
//								this_1.industryType=items[0];
//								this_1.twocategoryid=items[1];
								//返回 false 可以阻止选择框的关闭
								//return false;
								this_1.province=items[0]		//省
								this_1.city=items[1]			//市
								this_1.county=items[2]			//县
							});
				}, false);	
			}
			


			
		},
		created:function(){
			
		}
	}
</script>

<style>
	#PartnerApplication{
		padding: 44px 0px 1.4rem 0px;
		min-height: 400px;
		height: 100%;
		position: relative;
	}
	
	
 	#PartnerApplication .Agreement_mask{
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
 	#PartnerApplication .Agreement_mask.active{
 		left: 0px;
 	}
	#PartnerApplication .Agreement_mask>header{
		height: 40px;
	    line-height: 40px;
	    border-bottom: 1px solid #CCCCCC;
	    background: #FFFFFF;
	    position: relative;
	    z-index: 1;
	}
	#PartnerApplication .Agreement_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#PartnerApplication .Agreement_content{
		padding: 42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}
	
	
	#PartnerApplication>header{
		background-color: #00a2e9;
	}
	#PartnerApplication>header .mui-title{
		color: #ffffff;
	}
	#PartnerApplication>header .mui-icon{
		color: #ffffff;
	}
	
	#PartnerApplication .typeList{
		background: #FFFFFF;
		margin:0px 0px 0.2rem 0px;
		padding: 0px 0.2rem 0px 0.33rem;
	}
	#PartnerApplication .typeList li{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		border-bottom: 1px solid  #f0f0f0;
		/*height: 0.92rem;*/
		border-bottom: 1px solid #f0f0f0;
	}
	#PartnerApplication .typeList li .address_box{
		/*padding: 0.28rem 0px 0.1rem 0px;*/
		line-height: 0.92rem;
	}
	#PartnerApplication .typeList li .address_box .Prompt_1{
		color: #757575;
		font-size: 0.28rem;
	}
	#PartnerApplication .typeList li .address_box .address_1{
		margin-right: 10px;
		font-size: 0.28rem;
	}
	
	#PartnerApplication .typeList li>div:nth-child(1){
		width: 2.04rem;
		white-space: nowrap;
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
		color: #010101;
		line-height: 0.92rem;
	}
	#PartnerApplication .typeList li>div:nth-child(2){
		width: 4.9rem;
		height: 100%;
		position: relative;
	}
	#PartnerApplication .typeList li>div:nth-child(2) input{
		margin: 0px;
		border: none;
		height: 100%;
		font-size: 0.28rem;
		letter-spacing: 0.02rem;
		height: 0.82rem;
		color: #808080;
		padding: 0px;
	}
	#PartnerApplication .typeList li>div:nth-child(2) .modify_1{
		position: absolute;
		right: 0.15rem;
		top: 0.27rem;
		width: 0.85rem;
		height: 0.32rem;
		background-color: #00a2e9;
		font-size: 0.23rem;
		line-height: 0.32rem;
		letter-spacing: 0.02rem;
		color: #ffffff;
		padding: 0px;
		border-radius: 0px;
		outline: none;
		border: none;
	}
	#PartnerApplication .typeList li>div:nth-child(2) .right_1{
		color: #b3b3b3;
		margin: 0.2rem 0px 0px 0px;
	}
	#PartnerApplication .Doubt_1{
		text-align: right;
		font-size: 0.2rem;
		letter-spacing: 0.02rem;
		color: #00a2e9;
		padding: 0.38rem 0.2rem 0px 0px;
	}
	#PartnerApplication .Doubt_1 i{
		font-size: 0.2rem;
	}
	#PartnerApplication .btn_1{
		position: absolute;
		bottom: 1.13rem;
		left: 0px;
		background: #FFFFFF;
		width: 100%;
		padding: 0px 0.24rem;
	}
	
	#PartnerApplication .btn_1 button{
		width: 100%;
		height: 0.88rem;
		background-color: #df3121;
		border-radius: 0.1rem;
		font-size: 0.36rem;
		letter-spacing: 0.03rem;
		color: #ffffff;
	}
	
	
	
</style>