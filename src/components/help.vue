<template>
	<div id="help">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">帮助中心</h1>
		</header>
		<div class="mui-content">
		   	<div class="mui-slider">
				<div class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div>
						<a class="mui-control-item mui-active" href="#item1mobile">红包</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item2mobile">分润</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item3mobile">创业</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item3mobile">开店</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item4mobile">联盟商</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item5mobile">合伙人</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item6mobile">分公司</a>
					</div>
					<div>
						<a class="mui-control-item" href="#item7mobile">我们</a>
					</div>
				</div>
				
				<div class="mui-slider-group">
					<div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
						<div id="scroll1" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="mui-card">
									<ul class="mui-table-view">
										<li class="mui-table-view-cell mui-collapse">
											<a class="mui-navigate-right" href="#">表单</a>
											<div class="mui-collapse-content">
												具体内容
											</div>
										</li>
										<li class="mui-table-view-cell mui-collapse">
											<a class="mui-navigate-right" href="#">图片轮播</a>
											<div class="mui-collapse-content">
												<div id="slider" class="mui-slider">
													<div class="mui-slider-group mui-slider-loop">
														<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
														<div class="mui-slider-item mui-slider-item-duplicate">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
														<!-- 第一张 -->
														<div class="mui-slider-item">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
														<!-- 第二张 -->
														<div class="mui-slider-item">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
														<!-- 第三张 -->
														<div class="mui-slider-item">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
														<!-- 第四张 -->
														<div class="mui-slider-item">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
														<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
														<div class="mui-slider-item mui-slider-item-duplicate">
															<a href="#">
																<img src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/0df431adcbef760903428c1722dda3cc7dd99ee8.jpg">
															</a>
														</div>
													</div>
													<div class="mui-slider-indicator">
														<div class="mui-indicator mui-active"></div>
														<div class="mui-indicator"></div>
														<div class="mui-indicator"></div>
														<div class="mui-indicator"></div>
													</div>
												</div>
											</div>
										</li>
										<li class="mui-table-view-cell mui-collapse">
											<a class="mui-navigate-right" href="#">文字排版</a>
											<div class="mui-collapse-content">
												<h1>h1. Heading</h1>
												<h2>h2. Heading</h2>
												<h3>h3. Heading</h3>
												<h4>h4. Heading</h4>
												<h5>h5. Heading</h5>
												<h6>h6. Heading</h6>
												<p>
													p. 目前最接近原生App效果的框架。
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div id="item2mobile" class="mui-slider-item mui-control-content">
						<div id="scroll2" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="mui-loading">
									<div class="mui-spinner">
									</div>
								</div>
							</div>
						</div>

					</div>
					<div id="item3mobile" class="mui-slider-item mui-control-content">
						<div id="scroll3" class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<div class="mui-loading">
									<div class="mui-spinner">
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		   	
		</div>
	</div>
</template>

<script>
  	export default {  
    	name: 'help',  
    	data () {  
      		return {          
     		}  
   		},    
   		methods:{  
 		},
 		mounted:function(){			
			var slider=mui('#help .mui-slider').slider();
//				slider.gotoItem(1); 
				
 		},
 		created:function(){
 			
 		}
 	}  
</script>

<style>
	/*.mui-slider-group{
		background-color: white;
		min-height: 215px;
		height: 300px;
	}*/
	#help{
		height: 100%;
	}
	#help .mui-scroll-wrapper{
		position: relative;
	}
	#help .mui-scroll{
		position: relative;
	}
	#help .mui-slider-indicator.mui-segmented-control{
		display: flex;
		flex-wrap: wrap;
		padding: 0px 0px 0.2rem;
	}
	#help .mui-slider-indicator.mui-segmented-control>div{
		width: 25%;
		text-align: center;
		margin: 0.2rem 0px 0px;
	}
	#help .mui-segmented-control .mui-control-item{
		width:50px;
		height: 50px;
		line-height: 50px;
		border: 1px solid #CCCCCC;
		border-radius: 50%;
		background: #FFFFFF;
		font-size: 0.28rem;
		display: inline-block;
	}
</style>