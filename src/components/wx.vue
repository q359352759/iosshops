<template>
	<div>
		<div id="wx">

				<div id="wx_box">
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
						<div class="text">
							<span class="mui-pull-left">商城促销</span>
							<span class="mui-pull-right">实体店促销</span>
							<div class="cb"></div>
						</div>
						<!--<div class="shop_img_l">
							<img src="" />
						</div>
						<div class="shop_img_r">
							<img src="" />
						</div>
						<div class="wx_l_b">
							<p>【69抢500，抢完恢复79】【七匹狼官方正品】男士皮带 男真</p>
							<span>￥69</span>
							<i>已拼36件</i>
						</div>
						<div class="wx_r_b">
							<p>【3月新货】谷粒多燕麦牛奶200ml*12盒/提 日期新鲜品</p>
							<span>￥37.9</span>
							<i>已拼36万件</i>
						</div>-->
						<div id="" class="mui-slider" >
							<div class="mui-slider-group mui-slider-loop">
								<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
								<div class="mui-slider-item mui-slider-item-duplicate">
									<a href="#" class="commodity_box">
										<div class="img_box">
											<img src="">
										</div>
										<p>【69抢500，抢完恢复79】【七匹狼官方正品】男士皮带 男真</p>
										<div class="text_1">
											<span>￥69</span>
											<font>3.8折</font>
											<i>销36万件</i>
										</div>
									</a>
								</div>
								<!-- 第一张 -->
								<div class="mui-slider-item">
									<a href="#" class="commodity_box">
										<div class="img_box">
											<img src="">
										</div>
										<p>【3月新货】谷粒多燕麦牛奶200ml*12盒/提 日期新鲜品</p>
										<div class="text_1">
											<span>￥37.9</span>
											<font>3.8折</font>
											<i>销36万件</i>
										</div>
									</a>
								</div>
								<div class="mui-slider-item">
									<a href="#" class="commodity_box">
										<div class="img_box">
											<img src="">
										</div>
										<p>【69抢500，抢完恢复79】【七匹狼官方正品】男士皮带 男真</p>
										<div class="text_1">
											<span>￥37.9</span>
											<font>3.8折</font>
											<i>销36万件</i>
										</div>
									</a>
								</div>
								<div class="mui-slider-item">
									<a href="#" class="commodity_box">
										<div class="img_box">
											<img src="">
										</div>
										<p>【69抢500，抢完恢复79】【七匹狼官方正品】男士皮带 男真</p>
										<div class="text_1">
											<span>￥37.9</span>
											<font>3.8折</font>
											<i>销36万件</i>
										</div>
									</a>
								</div>
								
								<div class="mui-slider-item">
									<a href="#" class="commodity_box">
										<div class="img_box">
											<img src="">
										</div>
										<p>【69抢500，抢完恢复79】【七匹狼官方正品】男士皮带 男真</p>
										<div class="text_1">
											<span>￥37.9</span>
											<font>3.8折</font>
											<i>销36万件</i>
										</div>
									</a>
								</div>
							</div>
						</div>
				</div>	
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
				
		},
		mounted:function(){
			mui('.mui-slider').slider({
				swipeBack:true, //启用右滑关闭功能
//			  	interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
			});
		},
			
 }
	
</script>
<style>
	.cb{
		clear: both;
	}
	i{font-style:normal;}
	#wx{
		width:91%;
		background-color:#FFFFFF;
		position: absolute;
		top: 30%;
		left:5%;
		border-radius:0.2rem;
		font-size:0.2rem;
		padding-bottom: 0.5rem;
	}
	#wx #wx_box{
		padding: 0px 0.65rem;
	}
	#wx #wx_box .img_t_l{
		width:55%;
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
	}
	#wx #wx_box .img_t_l>div:nth-child(1),
	#wx #wx_box .img_t_l>div:nth-child(2){
		transform: rotate(-18deg);
	}
	#wx #wx_box .img_t_l>div:nth-child(2){
		padding-left: 20px;
	}
	#wx #wx_box .img_t_l .img_box{
		width: 0.7rem;
		height: 0.7rem;
		overflow: hidden;
		position: absolute;
		right: 15px;
		top: -15px;
		animation: img_box_animation 0.5s infinite;
	}
	#wx #wx_box .img_t_l .img_box>img{
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
	#wx #wx_box .img_t_r{
		float: left;
		width:45%;
		padding-top: 0.5rem;
		text-align: center;
	}
	#wx #wx_box .img_t_r img{
		width: 1.42rem;
		height: 1.42rem;
		object-fit: cover;
		vertical-align: text-bottom;
	}
	#wx #wx_box .img_t_r  span{
		color:#888888;
		font-size:0.16rem;
		text-align: center;
		display: block;
	}
	#wx #wx_box .text{
		margin: 0px 4px;
	}
	#wx #wx_box .text span{
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
	
	
	#wx .mui-slider{
		margin: 0.44rem 0px 0px;
	}
	#wx .mui-slider-item{
		width: 50%;
	}
	#wx .commodity_box{
		padding: 0px 0.1rem;
	}
	#wx .commodity_box .img_box{
		height: 2.67rem;
	}
	#wx .commodity_box .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#wx .commodity_box p{
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
	#wx .commodity_box .text_1{
		font-size: 0.24rem;
		line-height: 0.3rem;
		text-align: left;
		padding: 0.1rem 0px;
	}
	#wx .commodity_box .text_1 span{
		color: #B4392B;
	}
	#wx .commodity_box .text_1 font{
		padding: 1px 3px;
		border: 1px solid #B4392B;
		color: #B4392B;
	}
	#wx .commodity_box .text_1 i{
		float: right;
		color: #B6B6B6;
	}

</style>