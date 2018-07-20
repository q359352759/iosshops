 <template>
 	<div>
 		<div id="personal">
 		    <header>
 		    	消息
 		    </header>
 			<nav>
 			  <ul class="clear">
 			  	<router-link to="/terrace/wuliu">
	 			  	<li>
	 			  		<span>
	 			  			<img src="@/assets/img/personal_03.jpg" />
	 			  		</span>
	 			  		<i>快递</i>
	 			  	</li>
 			  	</router-link>
 			  	<router-link to="/terrace/tongzhi">
	 			  	<li>
	 			  		<span>
	 			  			<img src="@/assets/img/personal_05.jpg"  />
	 			  		</span>
	 			  		<i>通知</i>
	 			  	</li>
 			  	</router-link>
	 			  	<li @click="path">
	 			  		<span>
	 			  			<img src="@/assets/img/personal_07.jpg"" />
	 			  		</span>
	 			  		<i>好友</i>
	 			  	</li>
 			  </ul>
 			</nav>
 			
 			<!--<div class="content" @click="path">
 				<div class="photo">
 					<img src="" />
 				</div>
 				<div class="text">
 					<span>多德士运动专营店</span>
 					<i>[亲，请你核对订单信息]</i>
 				</div>
 				<div class="time">
 					昨天
 				</div>
 			</div>-->
 			
 		</div>
 	</div>
 </template> 
<script>
	export default{
		components:{
			},
			data:function(){
				return{}	
			},
		methods:{
			path:function(){
				this.$router.push({path:'/xiaoxi'})
			}
		}
	}	
</script>
<style>	
	body{background-color:#f4f4f4;}
	#personal header{width:100%;height:0.87rem;text-align: center;background-color:#00a2ea;color:white;font-size:0.3rem;line-height:0.87rem;position: fixed;top: 0;left: 0;}
	#personal nav {width:100%;margin-bottom:0.2rem;position: fixed;top:0.87rem;left:0;}
	#personal nav ul li{float: left;width:calc(100% / 3);text-align: center;height:1.8rem;color:#6b6b6b;font-size:0.25rem;background-color:white;}
	#personal nav ul li img{width:0.98rem;height:0.98rem;margin-top:0.2rem;}
	#personal nav ul li span{display: block;}
	#personal nav ul li i{display: block;margin-top:0.1rem;}
	#personal .content{padding:0 0.24rem;background-color:white;border-bottom:1px solid #eeeeee;height:1.45rem;}
	#personal .content>div{float: left;}
	#personal .content .photo img{width:0.96rem;height:0.96rem;display: block;line-height: 1.45rem;margin-top:0.24rem;}
	#personal .content .text{font-size:0.25rem;height:1.45rem ;padding-top:0.24rem;padding-left:0.2rem;}
	#personal .content span{color:#000000;display:block;margin-bottom: 0.05rem;font-size: 0.3rem;}
	#personal .content i{color:#aeaeae;margin-top:0.1rem;}
	#personal .content .time{float: right;height:1.45rem ;line-height:1.45rem;color: #9a9a9a;font-size:0.2rem;}
	#personal>div:nth-child(3){
		margin-top:calc(0.87rem + 2rem);
	}
	#personal:last-child(){
		margin-bottom:2.45rem;
	}
</style>