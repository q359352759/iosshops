<template>
	<div>
		<div v-on:click="modelHidden()" id="model" ></div>
	</div>
</template>
<script>
	export default{
		props: ['zidingyi'],
		name:"model",
		components:{
		},
		data:function(){
			return{
				model_type:''
			}
		},
		methods:{
			modelHidden:function(){
				console.log(this.model_type)
				if(this.model_type=='finishShow' || this.model_type=='wx'){
					this.$emit('shoudao','hehe');
				}
			}
		},
		watch:{
				//这个是监听事件可以不写也能收到数据
			  	zidingyi:function(x){
			  		console.log('model.vue收到数据',x);
			  		this.model_type=x;
			  	}
		}
	}
	
</script>
<style>
	
	#model{
		z-index: 1;
		width:100%;height:100%;background-color:rgba(0, 0, 0, 0.4);position:fixed;left:0;top:0;}

</style>