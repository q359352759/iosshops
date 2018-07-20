
<template id="tem">
	<div>	
		<div class="warp">
				<icon title="首页" mack="Home" :sel="setect" @cli="getvalue">
					<img :src="url1" slot="txt"/>
					<img src="@/assets/img/home.jpg" slot="txt1"/>
				</icon>
				<icon title="商铺" mack="shops" :sel="setect" @cli="getvalue">
					<img src="@/assets/img/shopgreen.jpg" slot="txt"/>
					<img src="@/assets/img/shop.jpg" slot="txt1"/>
				</icon>
				<icon title="商城" mack="Shopping" :sel="setect" @cli="getvalue">
					<img src="@/assets/img/shoppinggreen.jpg" slot="txt"/>
					<img src="@/assets/img/shopping.jpg" slot="txt1"/>
				</icon>
				<icon title="消息" mack="Personal" :sel="setect" @cli="getvalue">
					<img src="@/assets/img/messagegreen.jpg" slot="txt"/>
					<img src="@/assets/img/message.jpg" slot="txt1"/>
				</icon>
				<icon title="我的" mack="group" :sel="setect" @click="login" @cli="getvalue">
					<img src="@/assets/img/mygreen.jpg" slot="txt"/>
					<img src="@/assets/img/my.jpg" slot="txt1"/>
				</icon>
		</div>
	</div>		
</template>
<script>
	import icon from './children';
	export default{
		name:"tabbar",
		components:{
				icon
			},
			data:function(){
				return{
					url1:require( "../assets/img/homegreen.jpg"), //上面的url1访问不到data里面的数据require
					url2:"img/ic_tab_home_normal.png",
					setect:'Home'	
					}
				},
			methods:{
				getvalue:function(n){
					this.setect=n
//					var a=this.$route.path();
//					this.setect=a.substring(1)
				},
				login:function(){
					console.log(111);
					var ids = localStorage.getItem("id",1000*60);
					var curTime = new Date().getTime();
					console.log(curTime);
					if(!ids){
						this.$router.push('/login');
					}
				}
			}
	}	
</script>
<style>

</style>