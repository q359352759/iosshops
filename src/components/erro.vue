<template>
	<div class="err">
		<div @click="go"><</div>
		<img src="" />
		<h2>{{msg1}}</h2>
		<p>{{msg2}}</p>
		
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				msg1:404,
				msg2:"页面未找到"
			}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			}
		}
	}	
</script>
<style>
	
	
</style>