<template>
	<div id="ShopEvaluation">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">发表评价</h1>
		</header>
		<div class="mui-content">
			<ul class="mui-table-view box_1">
			    <li class="mui-table-view-cell mui-media">
			        <a href="javascript:;">
			            <img class="mui-media-object mui-pull-left" :src="shop.mainlogo">
			            <div class="mui-media-body">
			            	{{shop.shopname}}
			                <p class="mui-ellipsis">
			                	<!--能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？-->
			                </p>
			            </div>
			        </a>
			    </li>
			    <li class="mui-table-view-cell">
			    	<textarea v-model="comment_obj.evaluationContent" name="" rows="" cols="" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧！"></textarea>
			    </li>
			    <li class="mui-table-view-cell img_box">
			    	<div v-for="x in img_list">
			    		<span><i class="mui-icon mui-icon-closeempty"></i></span>
			    		<img :src="x"/>
			    	</div>
			    	<div class="adimg" @click="add_img()">
			    		<div>
			    			<i class="mui-icon mui-icon-camera"></i>
			    			<div>添加图片</div>
			    		</div>
			    	</div>
			    </li>
			</ul>


		    	<ul class="mui-table-view box_2">
		    		<li class="mui-table-view-cell">
		    		 	<i class="icon iconfont icon-dianpu"></i> 店铺评分
		    		</li>
		            <li class="mui-table-view-cell">
		            	<span>描述相符</span>
		            	<i v-for="x in xingxing" @click="change_xing('answerAescription',x)" :class="{'icon iconfont icon-xingxing':comment_obj.answerAescription>=x,'icon iconfont icon-star':comment_obj.answerAescription<x}"></i>
		            </li>
		            <li class="mui-table-view-cell">
		            	<span>服务态度</span>
		            	<i v-for="x in xingxing" @click="change_xing('serviceAttitude',x)" :class="{'icon iconfont icon-xingxing':comment_obj.serviceAttitude>=x,'icon iconfont icon-star':comment_obj.serviceAttitude<x}"></i>
		            </li>
		            <li class="mui-table-view-cell">
		            	<span class="anonymous" @click="change_anonymous()" :class="{'active':comment_obj.isAnonymity==1}">
		            		<i class="mui-icon mui-icon-checkmarkempty"></i>
		            	</span>
		            	匿名提交
		            	<span class="mui-pull-right">你的评价能帮助其他小伙伴哟</span>
		            </li>
		        </ul>
			
			<div class="btn_1">
				<button @click="form_1()" type="button" class="mui-btn mui-btn-primary">提交</button>
			</div>
			
		</div>
		
		<div class="file_1 mui-hidden">
			<input type="file" accept="image/*" name="" id="" value="" />
		</div>
		
	</div>
</template>

<script>

	import {http,base64_splicing} from '@/assets/fc';
	export default{
		name:'',
		data(){
			return{
				xingxing:[0,1,2,3,4],
				img_list:[],
				userId:localStorage.ids ? localStorage.ids : '',
				shopId:'',		//店铺Id
				shop:{},		//店铺详情
				comment_obj:{	//评论对象
					shopId:'',	//店铺Id
					memberId:localStorage.ids ? localStorage.ids : '',	//用户id
					evaluationContent:'',		//评论内容
					evaluationPhoto:'',			//评价图片
					answerAescription:4,	//描述相符 0:非常差 1:差 2:一般 3:好 4:非常好',
					logisticsService:4,		//物流服务0:非常差 1:差 2:一般 3:好 4:非常好',
					serviceAttitude:4,		//服务态度0:非常差 1:差 2:一般 3:好 4:非常好',
					isAnonymity:0,			//是否匿名 0:不 1:是',
					evaluationRating:0		//评价等级 0:超赞 1:满意 2:一般 3:不满
				}
			}
		},
		methods:{
			//匿名提交
			change_anonymous(){
				this.comment_obj.isAnonymity=this.comment_obj.isAnonymity==0 ? 1 : 0;
			},
			//选择星星
			change_xing(x,y){
				this.comment_obj[x]=y
			},
			//选择图片
			add_img(){
				$('#ShopEvaluation .file_1').html('<input type="file" accept="image/*" name="" id="" value="" />');
				$('#ShopEvaluation .file_1').children().click();
			},
			uploadImage(x){
				console.log('上传图片返回值',x);
				this.img_list.push(x);
				$('#progressbar_box').hide();
			},
			progress(evt){
				console.log(evt)
				var loaded = evt.loaded;     //已经上传大小情况 
				var tot = evt.total;      	//附件总大小 
				var per = Math.floor(100 * loaded/tot);  //已经上传的百分比 
				$('#progressbar_box').show();
				$('#progressbar_box').children().eq(0).html(per+'%');
				mui("#progressbar_1").progressbar().setProgress(per);
			},
			//查询商铺详细信息
			findShopDetail(){
				http('post','/mall/mobile/shop/findShopDetail',{'id':this.shopId},this.findShopDetail_returun)
			},
			findShopDetail_returun(x){
				console.log('商家基本信息',x);
				this.shop=x;
			},
			//提交
			form_1(){
				this.comment_obj.shopId=this.shopId;
				this.comment_obj.evaluationPhoto=this.img_list.join(',');
				http('post','/mall/mobile/evaluat/offlineEvaluat',this.comment_obj,this.offlineEvaluat)
			},
			offlineEvaluat(x){
				console.log(x);
				if(x){
					mui.alert('评论成功','提示','好的',function(){
						window.history.back();
					},'div')
				}else{
					mui.toast('评论失败，请稍后再试',{ duration:2000, type:'div' })
				}
			}
		},
		mounted(){
			var this_1=this;
			var query=this.$route.query;
			this.shopId=query.id ? query.id : '';
			this.findShopDetail();		//查询商铺详细信息
			
			$('#ShopEvaluation .file_1').on('change','input',function(){
				var file_1=$(this)[0].files[0];
//					this_1.img_type=file_1.type
//					this_1.img_size=file_1.size
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
						console.log(e)
						var base64=e.target.result;
							base64=base64_splicing(base64);
						http('post','/mall/mobile/shop/uploadImage',{'image':base64},this_1.uploadImage,this_1.progress)
			        };
			})
		},
		created(){
			
		}
	}
</script>

<style>
	#ShopEvaluation{
		font-size: 0.3rem;
	}
	
	#ShopEvaluation .btn_1{
		width: 80%;
		margin: 0.4rem auto 0px;
	}
	#ShopEvaluation .btn_1 button{
		width: 100%;
		border-radius: 33px;
	}
	#ShopEvaluation .mui-active{
		background: none;
	}
	#ShopEvaluation .box_2 .icon-xingxing{
		color: #FD5000;
	}
	#ShopEvaluation .box_2 .anonymous{
		display: inline-block;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1px solid #C0C0C0;
	}
	#ShopEvaluation .box_2 .anonymous>i{
		line-height: 22px;
	}
	#ShopEvaluation .box_2 .anonymous.active{
	    background: #fa4c31;
	    color: #ffffff;
	}
	
	
	#ShopEvaluation .box_1{
		margin: 0.2rem 0px;
	}
	#ShopEvaluation .box_1 textarea{
		border:none;
		margin: 0px;
		padding: 0px;
		min-height: 1.5rem;
		font-size: 0.26rem;
	}
	#ShopEvaluation .img_box{
		display: flex;
	}
	#ShopEvaluation .img_box>div{
		width: 80px;
		height: 80px;
		margin: 5px;
		background: #EEEEEE;
		position: relative;
	}
	#ShopEvaluation .img_box>div>span{
		position: absolute;
		right: -9px;
	    top: -10px;
	    background: rgba(255, 0, 0, 0.6);
	    color: #ffffff;
	    border-radius: 100%;
	}
	#ShopEvaluation .img_box>div.adimg{
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #a7a7a7;
		background: #FFFFFF;
		border: 1px dashed #b3b3b3;
	}
	#ShopEvaluation .img_box>div.adimg>div{
		font-size: 0.24rem;
	}
	#ShopEvaluation .img_box>div>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
</style>