<template>
	<div id="Promote">
		<div class="back_1" @click="back()">
			<i class="mui-icon mui-icon-back "></i>返回
		</div>
		
		<img v-if="type==1" src="@/assets/img/shops_1_1.jpg"/>
		
		<a class="type_2" @click="go()" v-if="type==2">
			<img src="@/assets/img/shops_2_2.jpg"/>
			<div class="btn_1">
				<span>立即行动</span>
			</div>
		</a>
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		name:'',
		data(){
			return{
				type:0,
				userid:localStorage.ids ? localStorage.ids : '',
				isAgentinfo:false,		//判断是否是城市合伙人
			}
		},
		methods:{
			back(){
				window.history.back();
			},
			go(){
				if(this.userid && this.userid!='' && this.userid!='undefined'){
					if(this.isAgentinfo){
						this.$router.push('/experience');
					}else{
						this.$router.push('/PartnerApplication')
					}
				}else{
					this.$router.push('/login');
				}
			}
		},
		mounted(){
			var this_1=this;
			this.type=this.$route.query.type;
			if(localStorage.ids && localStorage.ids!='' && localStorage.ids!='undefined'){
				//判断用户是否是城市合伙人
				http('post','/mall/mobile/agentinfo/isAgentinfo',{'mid':this.userid},isAgentinfo);
			}
			function isAgentinfo(x){
				this_1.isAgentinfo=x;
			}
			
			
//			console.log(this.$route.query)
		},
		created(){
			
		}
	}
</script>

<style>
	#Promote .back_1{
		position: absolute;
		top: 15px;
		left: 15px;
		color: #FFFFFF;
		z-index: 1;
	}
	#Promote .type_2 .btn_1{
		position: absolute;
		top: 9.2rem;
		left: 0px;
		width: 100%;
		color: red;
		display: flex;
		justify-content: center;
	}
	#Promote .type_2 .btn_1>span{
		background: #FFFFFF;
		height: 0.5rem;
		font-size: 0.28rem;
		border-radius: 0.5rem;
		line-height: 0.5rem;
		padding: 0px 15px;
		font-weight: bold;
	}
	
	
	
	#Promote>a,
	#Promote img{
		width: 100%;
		display: block;
		position: relative;
		z-index: 0;
	}
</style>