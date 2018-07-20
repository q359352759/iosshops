<template>
	<div>
		<div id="xiaoxi">
			<header>
				<span @click="go"><</span>
				<em>{{merchant}}</em>
				<i class="yi"><img src="@/assets/img/shezhi_03.jpg" /></i>
				
				<!--<i @click="commodity" class="first">进店</i>-->	
			</header>
			<div class="content clear">
				<!--<div class="shangjia clear">
					<div class="left">
						<img @click="commodity" src="../../../static/img/personal_20.jpg" />
						<span>电动磨豆机，原价199，优惠价格99元包邮    电动磨豆机，原价199，优惠价格99元包邮   电动磨豆机，原价199，优惠价格99元包邮   电动磨豆机，原价199，优惠价格99元包邮  </span>
					</div>
				</div>
				<div class="my clear">
					<div class="right clear">
						<span>我在看一看呢</span>
						<img src="../../../static/img/personal_22.jpg" />			
					</div>
				</div>
				-->
			</div>	
			<div class="input">
				<input type="text" id="text" v-model="text" />
				<button type="button" id="btn"   :disabled="!text" class="mui-btn mui-btn-danger" @click="texts">发送</button>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	export default{
		components:{},
		data:function(){
			return{
				text:'',
				merchant:'测试'
			}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},
			commodity:function(){
				this.$router.push({path:"/commodity"})
				
			},
			texts:function(){
	
				var text = this.text
				var rigth = $("<div class='right clear'></div>")
				var my = $("<div class='my clear'></div>")
				
				var span = $("<span>"+text+"</span>")
				
				var img = $("<img src='../../../static/img/personal_22.jpg' />");
				rigth.append(span)
				rigth.append(img)
				my.append(rigth)
				$(".content").append(my)
				
			}
		},
		
		created:function(){

		}
	}
	
</script>

<style>
	body{background-color:#eeeeee;}
	#xiaoxi header{background-color:#f9f9f9;width:100%;height:0.88rem;text-align: center;line-height:0.88rem;padding: 0 0.3rem;box-sizing: border-box;color:#464646;font-size:0.3rem;
					position: fixed;top: 0;left:0;margin-bottom:0.88rem;}
	#xiaoxi header span{float: left;font-size:0.5rem;}
	#xiaoxi header i{float: right;}
	#xiaoxi header img{width:0.38rem;height:0.44rem;vertical-align: sub;}
	#xiaoxi header .first{color:white;font-size:0.2rem ;background-color: #ff8511;border-radius:0.18rem ;width:0.89rem;height: 0.44rem;line-height:0.44rem;margin-top:0.17rem;}
	#xiaoxi header .yi{margin-left:0.25rem;}
	#xiaoxi .content{width:94%;padding:5% 3%;margin-bottom:0.8rem;}
	#xiaoxi .content .shangjia .left{float: left;overflow: hidden;}
	#xiaoxi .content .shangjia,#xiaoxi .content .my{margin-top:0.45rem;}
	#xiaoxi .content .shangjia .left span{background-color:white;vertical-align: top;display: inline-block;width: 80%;}
	#xiaoxi .content .my .right{float: right;overflow: hidden;display: flex;justify-content: flex-end;}
	#xiaoxi .content .my .right span{background-color:#ffdd48;vertical-align: top;display: inline-block;margin-right:0.29rem;border-radius: 0.15rem;font-size:0.35rem;padding:0.25rem;}											
	#xiaoxi .content img{width: 0.8rem;height: 0.8rem;border-radius: 0.1rem;}
	#xiaoxi .content .shangjia .left span{margin-left:0.29rem;border-radius: 0.15rem;font-size:0.35rem;padding:0.25rem;}
	#xiaoxi .input{position: fixed;bottom: 0;left: 0;height:0.78rem;width:100%;}
	#xiaoxi .input input{width:82%;border-radius:15px;margin-right:3%;}
	#xiaoxi .input button{width:12%;height:90%;float: right;text-align: center;border-radius:0.05rem;margin-right:2%;}
	
	
</style>