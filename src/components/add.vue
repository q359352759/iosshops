<template>
	<div>
		<div id="add">
			<header>
				<span @click="go"><</span>
				 <em>添加账户</em>
			</header>
		</div>
	</div>
</template>

<script>
	export default{
			components:{},
			data:function(){	
				return{}
			},
			methods:{
				go:function(){
					this.$router.go(-1)
					
				},
			},
			mounted:function(){
				
			},
	}
</script>

<style>
	#add header{width:1rem;text-align: center;background-color:#00a2ea;width:100%;color:white;font-size:0.3rem;line-height:1rem;}
	#add header span{float: left;font-size:0.4rem;padding-left:0.2rem;}
</style>