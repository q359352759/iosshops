<template>
		<div v-show="!follow" id="follow">
			<div class="mask_box" @click="close_1()"></div>
				<div id="follow_box">
						<div class="img_t_l">
							<div>关注公众号</div>
							<div>领取更多红包</div>
							<div class="img_box">
								<img src="@/assets/img/wx_er_03.jpg" />
							</div>
						</div>
						<div class="img_t_r">
							<img src="@/assets/img/wx_ew_06.jpg" />
							<span>长按图识别二维码</span>
						</div>
						<div class="cb"></div>
				</div>
		</div>
</template>
<script>
	import {http} from "@/assets/fc";
	export default{
		name:'follow',
		data:function(){
			return{
				follow:true,
				path:''
			}
		},		
		methods:{
			close_1(){
				console.log('点击了关注的遮罩层')
				if(this.path=='/RedEnvelopes'){
					this.$router.push('/home');
				}
				this.follow=true;
			}
		},
		mounted:function(){
			var this_1=this;
			this.path=this.$route.path;
			console.log(this.path)
			http('post','/platform/JSSDK/judgeIsFollow',{'openid':localStorage.openid},judgeIsFollow)
			function judgeIsFollow(x){
				console.log('是否关注',x)
				this_1.follow=x;
//				this_1.follow=false;
			}
//			mui('.mui-slider').slider({
//				swipeBack:true, //启用右滑关闭功能
////			  	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
//			});
		},
 }
	
</script>
<style>
	.cb{
		clear: both;
	}
	#follow{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 10;
	}
	#follow .mask_box{
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0px;
		left: 0px;
		display: flex;
		position: absolute;
		justify-content: center;
	}
	#follow #follow_box{
		width: 5.2rem;
		height: 2.66rem;
		background-color:#fdfdfd;
		padding: 0px 0.3rem 0.3rem;
		display: flex;
		white-space: nowrap;
		font-size:0.2rem;
		border-radius:0.2rem;
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		margin: auto;
		z-index: 11;
	}
	#follow #follow_box .img_t_l{
		/*width:55%;*/
		width: 2.66rem;
		float: left;
		font-size: 0.36rem;
		line-height: 0.6rem;
		letter-spacing: 0px;
		color: #e6382d;
		font-weight: bold;
		font-family: cursive;
		text-align: left;
		position: relative;
		margin-top: 0.78rem;
		white-space: nowrap;
	}
	#follow #follow_box .img_t_l>div:nth-child(1),
	#follow #follow_box .img_t_l>div:nth-child(2){
		transform: rotate(-18deg);
	}
	#follow #follow_box .img_t_l>div:nth-child(2){
		padding-left: 20px;
	}
	#follow #follow_box .img_t_l .img_box{
		width: 0.7rem;
		height: 0.7rem;
		overflow: hidden;
		position: absolute;
		right: 15px;
		top: -15px;
		animation: img_box_animation 0.5s infinite;
	}
	#follow #follow_box .img_t_l .img_box>img{
		position: absolute;
		right: -5px;
		top: -11px;
	}
	@keyframes img_box_animation{
		0%{
			transform: rotate(-5deg);
		}50%{
			transform: rotate(5deg);
		}100%{
			transform: rotate(-5deg);
		}
	}
	#follow #follow_box .img_t_r{
		float: left;
		/*width:45%;*/
		padding-top: 0.5rem;
		text-align: center;
	}
	#follow #follow_box .img_t_r img{
		width: 1.42rem;
		height: 1.42rem;
		object-fit: cover;
		vertical-align: text-bottom;
		margin-bottom: 6px;
	}
	#follow #follow_box .img_t_r span{
		color:#888888;
		font-size:0.24rem;
		text-align: center;
		display: block;
	}
	#follow #follow_box .text{
		margin: 0px 4px;
	}
	#follow #follow_box .text span{
		width:50%;
		height: 0.44rem;
		background-color:#e6382d;
		color:#FFFFFF;
		display: inline-block;
		border: 1px solid #ffffff;
		font-size: 0.24rem;
		text-align: center;
		line-height:0.44rem
	}
	
	
	#follow .mui-slider{
		margin: 0.44rem 0px 0px;
	}
	#follow .mui-slider-item{
		width: 50%;
	}
	#follow .commodity_box{
		padding: 0px 0.1rem;
	}
	#follow .commodity_box .img_box{
		height: 2.67rem;
	}
	#follow .commodity_box .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#follow .commodity_box p{
		font-size: 0.24rem;
		line-height: 0.3rem;
		margin: 0.05rem 0px;
		height: 0.6rem;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	#follow .commodity_box .text_1{
		font-size: 0.24rem;
		line-height: 0.3rem;
		text-align: left;
		padding: 0.1rem 0px;
	}
	#follow .commodity_box .text_1 span{
		color: #B4392B;
	}
	#follow .commodity_box .text_1 font{
		padding: 1px 3px;
		border: 1px solid #B4392B;
		color: #B4392B;
	}
	#follow .commodity_box .text_1 i{
		float: right;
		color: #B6B6B6;
	}

</style>