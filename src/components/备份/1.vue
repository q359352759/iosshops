<template>
	<div id="Elated">
		喜欢的

	</div>
</template>

<script>
	
	export default{
		data:function(){
			return{
				message :'test',
			}
		},
		filters:{
			
		},
		methods:{
			
		},
		beforeCreate: function () {
            console.log('创建前状态');
        },
        created: function () {
            console.log('创建完毕状态');
        },
        beforeMount: function () {
            console.log('挂载前状态');
        },
        mounted: function () {
            console.log('挂载结束状态');
        },
        beforeUpdate: function () {
            console.log('更新前状态');
        },
        updated: function () {
            console.log('更新完成状态');
        },
        beforeDestroy: function () {
            console.log('销毁前状态');
        },
        destroyed: function () {
            console.log('销毁完成状态');
        }
	}
</script>

<style>
</style>