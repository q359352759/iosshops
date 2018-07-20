<template>
	<div>
		<div id="money_recriving">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">向商家付款</h1>
			</header>
			<div class="content">
				<div class="tiaoxing">
					<img src="@/assets/img/recriving_03.jpg" />
				</div>
				<p>2887******查看数字</p>
				<div class="img">
					<img :src="url" />
				</div>
				<div class="content_img">
					<p>
						<img src="@/assets/img/recriving_07.jpg" />
						<router-link to="/collect">
							<i>微信支付&nbsp;&nbsp;&nbsp;></i>  
						</router-link>	
					</p>
				</div>
			</div>
			<div class="text">
				<p>如付款失败，请尝试其他付款方式</p>
			</div>
			<pay></pay>
		</div>
	</div>
</template>

<script>
	import pay from './pay'
	import $ from 'jquery'
	export default{
			components:{
				pay
			},
			data:function(){	
				return{
					url:""
				}
			},
			methods:{},
			  	beforeCreate: function() {
       			 document.getElementsByTagName("body")[0].className="background";
		    },
		    beforeDestroy: function() {
		        document.body.removeAttribute("class","background");
		    },
		    mounted:function(){
		    	//获取用户二维码信息
				var id = localStorage.getItem("ids")	
				//var id = '989a559283b9484684c89706f305d889';
				var data = {
					uId:id
				}
		    	var _this=this
		    	console.log(111)
		    	//liupeilin_ip+"/platform/cmembers/userInfo"
		    	
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/userInfo",
					async:true,
					data:data,
						success:function(res){
							console.log(res)
								_this.url = res.data.myQrcodeImg
							},
						error:function(res){
							console.log("失败",1000);	
							
						}
				});
		    }
	}
</script>
<style>
	.background{background-color:#00a2eb;}
	#money_recriving .tiaoxing img{width:85%;height:1.65rem;margin-top:0.99rem;}
	#money_recriving header{background-color:#00a2eb;width:100%;height:0.84rem;color:#FFFFFF;text-align: center;line-height:0.84rem;margin:0 auto;}
	#money_recriving header a span{float: left;margin-left:0.4rem;font-size:0.18rem;color:white;}
	#money_recriving .content{width:90%;height:8.35rem;border-radius:0.08rem;background-color:white;margin:0 auto;text-align: center;position: relative;}
	#money_recriving .content p:nth-child(1){font-size:0.2rem;color:#9a9a9a;height:0.9rem;line-height:0.9rem;margin-bottom:0px}
	#money_recriving .content .img img{width:3.27rem;height:3.27rem;margin:0 auto;margin-bottom:0.5rem;}
	#money_recriving .content_img i{line-height:0.9rem;height:0.9rem;display: inline-block;color:black}
	#money_recriving .content_img{font-size:0.3rem;color:#2d8dc7;position: absolute;bottom: 0;width:100%;}
	#money_recriving .content_img p{color:#000;height:0.9rem;line-height:0.9rem;border-top:2px solid #e5e5e5;}
	#money_recriving .content_img p img{width:0.4rem;height:0.4rem;vertical-align: middle;margin-right:0.4rem;}
	#money_recriving .text{width:100%;margin:0 auto;margin-top:0.34rem;text-align: center;}
	#money_recriving .text p{font-size:0.25rem;}
	#money_recriving #pay footer ul li i{color:#000000;}
</style>