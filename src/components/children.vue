<template>
		<div class="div1" @click="on" :class="{'green':bool}">	
			<router-link :to="'/'+mack">
				<span v-show="bool">
					<slot name="txt"></slot>
				</span>	
				<span v-show="!bool">
					<slot name="txt1"></slot>
				</span>
				<i>{{title}}</i>
			</router-link>	
		</div>			
</template>	
<script>
	export default{
		components:{	
			},
			name:"children",
			data:function(){
				return{	
					//bool:false
				}
			},
			methods:{
				on:function(){
					this.$emit("cli",this.mack);
					sessionStorage.href=this.mack
					//this.$router.push('/'+this.mack)办法1
					//this.bool=!this.bool	
					//判断是否登录，没有就跳转到登录页
					if(this.mack=="group"){
						var ids = localStorage.getItem("ids");
						var curTime = new Date().getTime();
						console.log(curTime);
						if(!ids){
							this.$router.push('/login');
						}
					}
				}	
			},
			computed:{
				bool:function(){
					if(this.mack==this.sel){
						return true;
					}else{
						return false;
					}
				}
			},
			mounted(){
//				if(sessionStorage.href && sessionStorage.href!='' && sessionStorage.href!='undefined'){
//					this.sel=sessionStorage.href;
//				}
			},
			props:["title","mack","sel"]
	}
</script>
<style>
	.warp{width: 100%;background-color:#FFFFFF;height:54px;border-top:1px solid #e4e4e4;bottom:0;position:fixed;z-index:10;}
	.warp div{width:20%;height: 100%;text-align: center;float:left;margin:0 auto;}
	.warp div img{width:0.4rem;height:0.4rem;}
	.warp div span{color:#CCCCCC;display: block;margin-top: .1rem;}
	.warp .div1{padding-bottom:3px;}
	.warp .green i{color:#2fabed;}
	a{text-decoration: none;}
	.div1{position: relative;}
	.div1 i{font-style: normal;font-size:14px;color:#6c6c6c;display: block;}
</style>