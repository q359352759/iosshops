<template>
	<div id="profit">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">分润中心</h1>
		</header>
		<div class="mui-content">

			<div class="box_1">
				 <ul class="">
				 	<li>
			    		<header>正在分润排号</header>
			    		<div class="number_1">
			    			<span v-for="(item,index) in fhnum" v-if="fhnum">{{item}}</span>
							<span v-else>0</span>
			    		</div>
			    	</li>
			    	<li>
			    		<header>总分润排号</header>
			    		<div class="number_1">
			    			<span v-for="(item,index) in serversnumber" v-if="serversnumber">{{item}}</span>
			    			<span v-else>0</span>
			    		</div>
			    	</li>

			    </ul>
			    <div class="footer_1">
			    	有{{cyrs ? cyrs:0}}人参与分润
			    	<!--<span class="mui-pull-right"><i class="mui-icon mui-icon-help"></i>利润分配协议</span>-->
			    </div>

			</div>
		   	<div class="box_2">
		   		<header>
		   			<div>
		   				<div class="Arrow_1">
		   					<i class="mui-icon mui-icon-arrowup"></i>
		   					<i class="mui-icon mui-icon-arrowup"></i>
		   					<i class="mui-icon mui-icon-arrowup"></i>
		   				</div>
		   				<div class="swiper-container number_2">
						    <div class="swiper-wrapper" >
						      <div class="swiper-slide" v-for="item in last">{{item}}</div>
						    </div>
						 </div>
		   				<div>我的分润号</div>
		   			</div>
		   			<div>
		   				<div>距离下次分润</div>
		   				<div>还有{{this.min-this.fhnu}}个排号</div>
		   			</div>
		   			<div class="loop_time"></div>
		   		</header>
		   		<ul>
		   			<li class="mui-text-center">
		   				<span>分润号</span>
		   				<div>{{ph/3 ? ph/3:0}}个</div>
		   				<div>{{ph ? ph:0}}次</div>
		   			</li>
		   			<li class="mui-text-center">
		   				<span>已分润</span>
		   				<div>{{fh ? fh:0}}</div>
		   				<div>{{hb ? hb:'0元'}}</div>
		   			</li>
		   			<li class="mui-text-center">
		   				<span>待分润</span>
		   				<div>{{dfh ? dfh:0}}个</div>
		   				<div>{{dfhMoney ? dfhMoney:0}}元</div>
		   			</li>
		   		</ul>
		   	</div>
		   <div class="box_3">
		   		<header>
		   			分润号兑换记录
		   			<span class="mui-pull-right" @click="change_Agreement(true)">
		   				<!--<i class="mui-icon mui-icon-help"></i>-->
		   				利润分配协议
		   			</span>
		   		</header>
		   		<ul>
		   			<li v-for="(x,index) in time_list" @click="change_active(x,index)" :class="{'active':x.active}">{{x.name}}</li>
		   			<!--<li>一月</li>
		   			<li>季度</li>
		   			<li>一年</li>-->
		   		</ul>
		   </div>
		   	<ul class="box_4">
		   		<li v-for="(item,index) in arr">
		   			<header><span class="mui-pull-right">{{item.exchangeDate.substring('')}}</span><span class="mui-pull-right"></span></header>
		   			<div>
						<span v-if="arr" v-for="(items,indexs) in item.disNum" :class="{colors:items.status==1}">{{items.DistributionNum}}</span>
		   			</div>
		   		</li>
		   	</ul>

		   		<div class="mui-text-center Loading" v-show="loading">
					<i class="icon iconfont icon-jiazaizhong1"></i>加载中...
				</div>
				<div class="mui-text-center Loading" v-show="arr.length==0 && !loading">
					暂无数据
				</div>
				<!--<div class="mui-text-center Loading" v-show="list_all.list.length!=0 && list_all.lastPage">
					——我是有底线的——
				</div>-->

		</div>
			<div class="Agreement_mask" :class="{'active':Agreement_mask}">
				<header class="mui-text-center">
					<i @click="change_Agreement(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>
						加盟合作协议
					</div>
				</header>
				<div class="Agreement_content">
					<!--<JoinAgreement :zidingyi="shop_obj.shopName"></JoinAgreement>-->
					<profitagreement></profitagreement>
				</div>
			</div>

	</div>
</template>
<script>
	import {axios,ajaxs,http} from '@/assets/fc';
	import profitagreement from '@/components/profitAgreement';
	export default{
		components:{
			profitagreement
        },
		data:function(){
			return{
				loading:false,
				Agreement_mask:false,	//分润协议
				time_list:[
					{'name':'全部','active':true},
					{'name':'一月','active':false},
					{'name':'季度','active':false},
					{'name':'一年','active':false}
				],
				fhnum:[],//正在分润排号
				serversnumber:[],//总分润排号
				ph:"",//分润号
				fh:"",//已分润
				dfh:"",//待分润
				hb:"",
				dfhMoney:"",
				cyrs:"",//总计分润人数
				type:0,
				arr:[],
				last:"",
				min:"",
				fhnu:"",
				fen:"",
				userId:'',	//用户Id
//				userInfo:{},		//用户基本信息
			}
		},
		methods:{
//			openEject:function(x){
//				console.log(2)
//				this.Eject_open=x;
//			}
			change_Agreement(x){		//改变弹出框状态
                this.Agreement_mask=x;
			},
			change_active:function(x,index){
				var this_1=this;
				this.arr=[];
				this.loading=true;
				for(var i=0;i<this_1.time_list.length;i++){
					if(this_1.time_list[i]==x){
						this_1.time_list[i].active=true;
					}else{
						this_1.time_list[i].active=false;
					}
				}
				if(index==0){
					this.getBeforeSave()
				}else{
					var datas={
						memberid:this.userId,
						type:index
					}
					ajaxs("post",liupeilin_ip+"/hb/hbDistribution/xfRecord",datas,this.resft);
				}

			},
			//根据时间查询分润号
			resf:function(res){
				console.log(res)

				this.dfh=res.data.dfh;
				this.dfhMoney=res.data.dfhMoney;
				this.fh=res.data.fh;
				this.ph=res.data.ph;
				this.hb=res.data.hb;
//				this.cyrs=res.data.cyrs;
				var fhnum=res.data.fhnum.toString()
				this.fhnu = res.data.fhnum;
				var serversnumber= res.data.serversnumber.toString()
				this.fhnum=fhnum.split('')
				this.serversnumber=serversnumber.split('')
				//console.log(this.fhnum)
			},
			resft:function(res){
				this.loading=false
				console.log('根据时间查询分润号',res)
				if(res.code!=10000){
					return;
				}
//				this.last = res.data.last;
//				var min=res.data.last[0]
//				for(var i =0;i<res.data.last.length;i++){
//					if(min>res.data.last[i]){
//						min = res.data.last[i];
//					}
//				}
//				this.min = min;
				this.arr = res.data.xflist;
//				setTimeout(function(){
//					var swiper = new Swiper('.swiper-container', {
//				      	direction: 'vertical',
//				      	autoplay:true,
//				      	speed:1000,
//				      	loop:true,
//				      	pagination: {
//				      	},
//			    	});
//				},100)
			},
			//获取分润号,若没有,会自动查询
			getBeforeSave(){
				this.loading=true;
				http('post','/hb/hbDistribution/getBeforeSave',{'memberid':this.userId},this.getBeforeSave_return)
			},
			getBeforeSave_return(x){
				console.log('获取分润号,若没有,会自动查询',x);
				this.loading=false;
				if(x.last){
					this.last=x.last;
					this.arr=x.xflist;
					this.min=x.last.length>0 ? x.last[x.last.length-1] : 0;
					setTimeout(function(){
						var swiper = new Swiper('.swiper-container', {
					      	direction: 'vertical',
					      	autoplay:true,
					      	speed:1000,
					      	loop:true,
					      	pagination: {
					      	},
				    	});
					},100)
				}
			}
		},
		created:function(){
			var this_1=this;
			var ids = localStorage.getItem("ids");
			this.userId=localStorage.getItem("ids");
			if(!ids || ids=='undefined' || ids==''){
				mui.alert('您未登陆，请登陆！','提示',function(){
					this_1.$router.push('/login')
				},'div');
			}else{
				//获取分润号,若没有,会自动查询
				this.getBeforeSave()
			}





        	var data={memberId:ids}
			ajaxs("post",liupeilin_ip+"/hb/hbDistribution/hbindex",data,this.resf);
			//根据时间查询分润号
			var type = this.type;
			var datas={
				memberid:ids,
				type:type
			}
			//根据时间查询分润号
			ajaxs("post",liupeilin_ip+"/hb/hbDistribution/xfRecord",datas,this.resft);
			//显示当前虚假参与人数
			http('post','/hb/hbDistribution/getShowNum','',getShowNum)
			function getShowNum(x){
				console.log('显示当前虚假参与人数',x);
				this_1.cyrs=x
			}

		}
	}
</script>
<style>
	#profit .Agreement_mask{
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
 	#profit .Agreement_mask.active{
 		left: 0px;
 	}
	#profit .Agreement_mask>header{
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #CCCCCC;
		background: #FFFFFF;
		position: relative;
		z-index: 1;
	}
	#profit .Agreement_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#profit .Agreement_content{
		padding:42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}


	#profit .box_4{
		padding: 1px 0px;
	}
	#profit .box_4>li{
		margin-top: 0.2rem;
		background: #FFFFFF;
	}
	#profit .box_4>li>div{
		display: flex;
		flex-wrap:wrap;
		font-size:0.23rem;
		padding: 0.2rem 0.5rem;
		white-space:nowrap;
		width:100%;
		box-sizing: border-box;
	}
	#profit .box_4>li>div span{
		margin-right: 0.24rem;
		margin-top:0.12rem;
		letter-spacing: 0.02rem;
		color: #595959;
	}
	#profit .box_4>li>header{
		height: 0.44rem;
		background-color: #dab040;
		line-height: 0.44rem;
		padding: 0px 0.5rem;
		font-size: 0.24rem;
		letter-spacing: 0.02rem;
		color: #ffffff;
	}
	#profit .box_4>li>header>span{
		margin: 0px 0px 0px 0.4rem;
	}

	#profit .box_3>ul{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		padding: 0.22rem 0.5rem;
		text-align: center;
	}
	#profit .box_3>ul>li{
		width: 25%;
		border-right: 1px solid #ed1414;
		border-top: 1px solid #ed1414;
		border-bottom: 1px solid #ed1414;
		height: 0.6rem;
		text-align: center;
		font-size: 0.26rem;
		letter-spacing: 1px;
		line-height: 0.6rem;
		/*border-radius: 8px 0px 0px 8px;*/
	}

	#profit .box_3>ul>li:nth-child(1){
		border-left: 1px solid #ed1414;
		border-bottom-left-radius: 0.35rem;
		border-top-left-radius: 0.35rem;
	}
	#profit .box_3>ul>li:last-child{
		border-bottom-right-radius: 0.35rem;
		border-top-right-radius: 0.35rem;
	}
	#profit .box_3>ul>li.active{
		/*border-width: 4px;*/
		line-height:0.5rem;
		border: 3px solid #ed1414;
		/*background-color: #ed1414;*/
		/*color: #ffffff;*/
	}



	#profit .box_2{
		background: #FFFFFF;
	}
	#profit .box_3{
		margin: 0.2rem 0px 0px;
		background: #FFFFFF;
	}

	#profit .box_2>header{
		line-height: 0.44rem;
		padding: 4px 0.29rem;
		font-size: 0.24rem;
		letter-spacing: 0.02rem;
		color: #ffffff;
	}
	#profit .box_3>header{
		line-height: 0.44rem;
		padding: 4px 0.5rem;
		font-size: 0.24rem;
		letter-spacing: 0.02rem;
		color: #ffffff;
	}
	#profit .box_2>header{
		background-color: #00a2e9;
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		position: relative;
	}
	#profit .box_2>header .number_2{
		height: 0.44rem;
		text-align: center;
		border: 1px solid #FFFFFF;
		width: 50%;
		border-radius: 0.44rem;
		/*margin: 0.05rem auto -0.12rem;*/
		margin: 0.05rem auto 0px;
	}
	#profit .box_2>header>div{
		width: 50%;
		text-align: center;
		position: relative;
	}
	#profit .box_2 .Arrow_1{
		position: absolute;
		height: 0.8rem;
		width: 0.4rem;
		top: -0.8rem;
		left: calc(50% - 0.2rem);
		text-align: center;
	}
	#profit .box_2 .Arrow_1:after{
		position: absolute;
		content: '';
		bottom: 0px;
		left: calc(50% - 1px);
		height: calc(100% - 0.3rem);
		width: 1px;
		background: #f53e3e;
		z-index: 1;
		box-shadow: 0px 0px 1px 0.2px #f53e3e;
	}
	#profit .box_2 .Arrow_1 i{
		height: 0.1rem;
		display: block;
		position: relative;
		z-index: 2;
		margin: 0px;
		color: #ed1414;
		font-weight: bold;
		/*animation: ;*/
	}
	#profit .box_2 .Arrow_1 i:nth-child(1),
	#profit .box_2 .Arrow_1 i:nth-child(2){
		animation:Arrow_animation 0.5s linear infinite;
	}
	@keyframes Arrow_animation{
		0%{
			transform: translate(0px,0px);
		}50%{
			transform: translate(0px,-2px);
		}100%{
			transform: translate(0px,0px);
		}
	}


	#profit .box_3>header{
		background-color: #dab040;
	}
	#profit .box_2>header>span{
		font-size: 0.20rem;
	}
	#profit .box_2>header .loop_time{
		display: inline-block;
		width: 0.6rem;
		height: 0.6rem;
		border: 1px solid #FFFFFF;
		border-radius: 100%;
		float: left;
		margin-right: 5px;
		position: absolute;
		top: calc(100%/2 - 0.3rem);
		left: calc(50% - 0.3rem);
	}
	#profit .box_2>header .loop_time:after,
	#profit .box_2>header .loop_time:before{
		width: 1px;
		height: 50%;
		content: '';
		position: absolute;
		left: 50%;
		top: 0px;
		background: #FFFFFF;
		-webkit-transform-origin: 0.5px bottom;
		-moz-transform-origin:0.5px bottom;
		-ms-transform-origin: 0.5px bottom;
		-o-transform-origin: 0.5px bottom;
		transform-origin: 0.5px bottom;

	}
	#profit .box_2>header .loop_time:after{
		animation:after_animation 60s linear infinite;
	}
	#profit .box_2>header .loop_time:before{
		animation:after_animation 5s linear infinite;
	}
	@keyframes after_animation{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}



	#profit .box_2>header i{
		font-size: 0.22rem;
		margin-right: 0.08rem;
	}
	#profit .box_2>ul{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		padding: 1px 0px 5px;
	}
	#profit .box_2>ul>li{
		width: 33.3%;
		position: relative;
	}
	#profit .box_2>ul>li:nth-child(2):after,
	#profit .box_2>ul>li:nth-child(2):before{
		position: absolute;
		top: 10%;
		height: 80%;
		content: '';
		width: 1px;
		background: #C7C7CC;
	}
	#profit .box_2>ul>li:nth-child(2):after{
		left: 0px;
	}
	#profit .box_2>ul>li:nth-child(2):before{
		right: 0px;
	}
	#profit .box_2>ul>li span{
		font-size: 0.26rem;
		letter-spacing: 0.02rem;
		color: #595959;
		margin: 0.3rem 0px 0.2rem;
		/*display: block;*/
		display: inline-block;
		height: 0.4rem;
		padding: 0px 10px;
		line-height: 0.4rem;
		background: #00a2e9;
		border-radius: 0.4rem;
		color: #FFFFFF;
	}
	#profit .box_2>ul>li>div{
		font-size: 0.28rem;
		/*line-height: 0.35rem;*/
		color: #ed1414;
		/*margin: 0px 0px 0.05rem;*/
	}
	#profit .box_1{
		background: #FFFFFF;
		text-align: center;
		padding: 0px 0px 0.15rem 0px;
		position: relative;
	}
	#profit .box_1 ul{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		position: relative;
		padding: 0.29rem 0px 0px 0px;
		margin: 0px 0.29rem 0px 0.29rem;
	}
	#profit .box_1 ul>li{
		width: 50%;
		position: relative;
	}
	/*#profit .box_1 ul:after{
		position: absolute;
		top: 20%;
		height: 70%;
		left: 50%;
		width: 2px;
		background-color: #f0f0f0;
		content: '';
	}*/

	#profit .box_1 ul>li>header{
		font-size: 0.28rem;
		letter-spacing: 0.02rem;
		color: #00a2e9;
		/*margin: 0px 0px 0.26rem 0px;*/
	}
	#profit .box_1 ul>li:nth-child(1) .number_1{
		border-right: 1px solid #f0f0f0;
	}
	#profit .box_1 .number_1{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		justify-content: center;
		padding: 0.26rem 0px 0.26rem 0px;
	}
	#profit .box_1 .number_1>span{
		width: 0.37rem;
		/*height: 0.4rem;*/
		flex-shrink:1;
		margin: 1px;
		background: #ed1414;
		color: #FFFFFF;
		padding: 1px;
	}
	#profit .box_1 .footer_1{
		font-size: 0.24rem;
		letter-spacing: 2px;
		color: #00a2e9;
		/*text-align: left;*/
		/*padding: 0px 0.5rem;*/
		/*margin: 0.3rem 0px 0px 0px;*/
	}
	#profit .box_1 .footer_1 i{
		font-size: 0.28rem;
	}

	#profit .mui-bar-nav{
		background: #00A2EA;
	}
	#profit a,
	#profit .mui-title{
		color: #FFFFFF;
	}
	#profit .box_4>li>div .colors{color:red;}
</style>
