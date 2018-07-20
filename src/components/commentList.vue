<template>
	<div id="commentList">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">评论管理</h1>
		    <!--<a href="javascript:;" class="mui-pull-right batch_1">批量</a>
		    <a href="javascript:;" class="mui-icon mui-icon-search mui-icon-right-nav mui-pull-right"></a>-->
		</header>
		<div class="mui-content">
			
		    <ul class="box_1">
		    	<li v-for="(x,index) in Evaluat_obj.list">
		    		<div class="header_1">
		    			<div class="img_box">
		    				<img v-if="x.memberPhoto" :src="x.memberPhoto"/>
			    			<img v-if="!x.memberPhoto" src="@/assets/img/20180427094332.jpg"/>
			    		</div>
			    		<div class="comment_user">
			    			<div>
			    				<span>{{x.memberid}}</span>
			    			</div>
			    			<div>
			    				<span>
			    					<i class="icon iconfont icon-xingxing"></i>
				    				<i class="icon iconfont icon-xingxing"></i>
				    				<i class="icon iconfont icon-xingxing"></i>
				    				<i class="icon iconfont icon-xingxing"></i>
				    				<i class="icon iconfont icon-star"></i>
			    				</span>
			    				<span class="time_1">{{x.evaluationtime}}</span>
			    			</div>
			    		</div>
			    		<div v-show="!x.businessreply" class="btn_1"><span @click="Reply_mask_show(true,x,index)">回复</span></div>
		    		</div>
		    		<div class="Reply_1">
		    			{{x.evaluationcontent}}
		    		</div>
		    		<div class="img_list">
						<div v-for="y in x.evaluationphoto"><img :src="y"/></div>
					</div>
					<div class="Reply_2" v-show="x.businessreply">
						<div class="header_2">商家回复：<span class="titme_1 mui-pull-right">{{x.businessreplytime}}</span></div>
						<div>{{x.businessreply}}</div>
					</div>
		    	</li>
		    </ul>
		    
		    <div class="mui-text-center loading"><span @click="More_1()">{{loadingName}}</span></div>
		    
		    
		    <div class="Reply_mask" :class="{'active':Reply_mask_class}">
		    	<form @submit.prevent="form_1()">
			    	<!--<ul class="mask_Satisfaction mui-text-center">
			    		<li :class="{'active':Satisfaction==0}">
			    			<i @click="change_Satisfaction(0)" class="icon iconfont icon-bumanyi"></i>
			    			<div>不满意</div>
			    		</li>
			    		<li :class="{'active':Satisfaction==1}">
			    			<i  @click="change_Satisfaction(1)" class="icon iconfont icon-yiban"></i>
			    			<div>一般</div>
			    		</li>
			    		<li :class="{'active':Satisfaction==2}">
			    			<i  @click="change_Satisfaction(2)" class="icon iconfont icon-pj_manyi"></i>
			    			<div>满意</div>
			    		</li>
			    		<li :class="{'active':Satisfaction==3}">
			    			<i  @click="change_Satisfaction(3)" class="icon iconfont icon-kuaile"></i>
			    			<div>超赞</div>
			    		</li>
			    	</ul>-->
			    	<div>
			    		<header class="header_1">回复内容</header>
			    		<textarea required="" pattern=".*[^ ].*" v-model="Reply_obj.businessreply" placeholder="给小伙伴们图文并茂地分享一下你的心情吧~"></textarea>
			    	</div>
			    	<!--<div class="img_header">添加图片信息</div>-->
			    	<!--<ul class="img_box">
			    		<li @click="delete_1(index)"  v-for="(x,index) in img_list">
			    			<span :class="{'delete_1':delete_obj==x}">删除</span>
			    			<img :src="x"/>
			    		</li>
			    		<li @click="chang_img(1)">
			    			<span class="">删除</span>
			    			<i class="mui-icon mui-icon-plusempty"></i>
			    		</li>
			    	</ul>-->
			    	<div class="mask_footer">
			    		<button type="button" @click="Reply_mask_show(false)" class="mui-btn">取消</button>
			    		<button type="submit" class="mui-btn">回复</button>
			    	</div>
		    	</form>
		    </div>
		    
		    <!--图片裁剪-->
			<div class="cropper_box" v-show="cropper_show">
				<div class="cropper_header">请在下方进行图片裁处理</div>
				<div class="cropper">
					
				</div>
				<div class="footer_1">
					<button type="button" @click="Determine_cropper(true)" class="mui-btn mui-btn-primary">确定</button>
					<button type="button" @click="Determine_cropper(false)" class="mui-btn mui-btn-warning">取消</button>
				</div>
			</div>
		    
		    <!--选择文件-->
			<div class="flie_1 mui-hidden">
				<input type="file" accept="image/*" name="" id="" value="" />
			</div>
		    
		</div>
	</div>
</template>

<script>
	import {http,dateFtt} from '@/assets/fc';
	import Vue from 'vue'
	export default{
		components:{
		},
		data:function(){
			return{
				loadingName:'查看更多',
				Satisfaction:3,
				img_list:[],
				delete_obj:'',
				Reply_mask_class:false,
				chang_img_type:'',
				img_type:'image/jpeg',
				img_size:0,
				cropper_show:false,
				shopId:1,
				pageIndex:1,		//当前页数
				Evaluat_obj:{		//用户评论
					pagesize:0,
					list:[]
				},
				Reply_obj:{'id':'','businessreply':''},		//回复对象
				click_index:0,					//用户点击的评论
			}
		},
		methods:{
			//根据评论id查询评论信息
			findEvaluatById(){
				http('post','/mall/mobile/evaluat/findEvaluatById',{'id':1},this.findEvaluatById_return)
			},
			findEvaluatById_return(x){
				this.Evaluat_obj.list[this.click_index].businessreply=x.businessreply;
				this.Evaluat_obj.list[this.click_index].businessreplytime=x.businessreplytime;
			},
			//商家回复用户评论
			form_1(){
				this.Reply_mask_class=false
//				this.Evaluat_obj.list[this.click_index].businessreply='测试测试啊';
				console.log(this.Evaluat_obj.list)
				http('post','/mall/mobile/evaluat/businessReply',this.Reply_obj,this.form_return)
			},
			form_return(x){
				if(!x){
					mui.toast('回复失败，请联系管理员',{ duration:2000, type:'div' })
				}else{
					mui.toast('回复成功',{ duration:2000, type:'div' });
					this.findEvaluatById();
				}
			},
			//加载更多
			More_1(){
				if(this.pageIndex<this.Evaluat_obj.pagesize){
					this.pageIndex++;
					this.findEvaluat();
				}
			},
			//改变满意度
			change_Satisfaction(x){
				this.Satisfaction=x
			},
			//删除图片
			delete_1(x,index){
//				this.delete_obj=x;
//				var mask = mui.createMask(function(){
//					console.log(111)
//				});
				var this_1=this
				mui.confirm('确定删除？','提示',['取消','确定'],function(e){
					console.log(e);
					if(e.index==1){
						this_1.img_list.splice(index,1);
					}
				})
			},
			//回复
			Reply_mask_show(x,y,index){
				this.Reply_mask_class=x;
				if(y){
					console.log(index)
					this.click_index=index;
					this.Reply_obj.id=y.ids
					this.Reply_obj.businessreply='';
				}
			},
			//点击选图片
			chang_img:function(x){
				this.chang_img_type=x;
				$('.flie_1').html('<input type="file" accept="image/*" name="" id="" value="" />')
				$('.flie_1').children().click();
			},
			//确定裁剪
			Determine_cropper:function(x){
				this.cropper_show=false;
				if(x){
//					var result = $('#StoreDetails .cropper>img').cropper('getCroppedCanvas');
					var dataURL = $('#commentList .cropper>img').cropper("getCroppedCanvas");//拿到剪裁后的数据  
          			var data = dataURL.toDataURL(this.img_type,1000000/this.img_size);//转成base64
          			this.img_list.push(data);
				}
			},
			//店铺id查询用户评价
			findEvaluat(){
				http('post','/mall/mobile/evaluat/findEvaluat',{'id':this.shopId,'number':this.pageIndex},this.findEvaluat_return);
			},
			findEvaluat_return(x){
				console.log('店铺id查询用户评价',x);
				for(var i=0;i<x.list.length;i++){
					x.list[i].evaluationphoto=x.list[i].evaluationphoto.split(',');
				}
				this.Evaluat_obj.pagesize=x.pagesize;
				this.Evaluat_obj.list=this.Evaluat_obj.list.concat(x.list);
				if(this.pageIndex>=this.Evaluat_obj.pagesize){
					this.loadingName='没有更多内容了。'
				}
			}
		},
		mounted:function(){
			var this_1=this;
			
			//判断用户是否是商家
				http('post','/mall/mobile/shopManagerUserBind/isShop',{'mid':localStorage.getItem("ids")},isShop);
				function isShop(x){
					console.log('判断用户是否是商家',x);
					if(!x.success){
						mui.toast('您还不是商家！',{ duration:'long', type:'div' });
					}else{
						this_1.shopId=x.message; 
						//店铺id查询用户评价
						this_1.findEvaluat();
					}
				}
			
			
			
			
			
			
			$('#commentList .flie_1').on('change','input',function(){
				var file_1=$(this)[0].files[0];
					this_1.img_size=file_1.size;
					this_1.img_type=file_1.type;
				console.log(file_1)
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
//						console.log(e)
//						this_1.home_img=e.target.result;
						$('#commentList .cropper').html('<img src="'+e.target.result+'"/>');
						this_1.cropper_show=true;
						tp();
			        }; 
			})
			
			function tp(){
				$('#commentList .cropper>img').cropper({
					//设置图片比例
					aspectRatio: 4 / 3,
					//图片预览的容器
//					preview:'.box_1',
					autoCrop:true,
					//
					autoCropArea:1,
					//拖动或者进行
					crop: function(data) {
					// Output the result data for cropping image.
					},
					built: function () {
//						$().cropper('method')
					}
				})
			}
			
		},
		created:function(){
			
		}
	}
</script>

<style>
	
	#commentList .loading{
		padding: 0.2rem ;
		font-size: 0.26rem;
		color: #1F1F1F;
	}
	#commentList .cropper_box{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.8);
		z-index: 10;
		padding: 70px 0px 0px 0px;
	}
	#commentList .cropper_box .cropper_header{
		background: #FFFFFF;
		text-align: center;
		padding: 5px;
	}
	#commentList .cropper_box .cropper{
		margin:0px 0px 10px 0px;
		text-align: center;
		background: #FFFFFF;
		height: 5rem;
	}
	#commentList .cropper_box .footer_1{
		padding: 0px 0.2rem;
	}
	#commentList .cropper_box .footer_1 button{
		width: 100%;
		margin-bottom: 10px;
	}
	
	#commentList .mui-popover{
		width: auto;
	}
	#commentList .Reply_mask{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		padding: 44px 5px 0px;
		display: none;
	}
	#commentList .Reply_mask.active{
		display: block;
	}
	#commentList .Reply_mask .mask_Satisfaction{
		display: flex;
		padding: 0.2rem 0.3rem;
		border-bottom: 1px solid #cccccc;
	}
	#commentList .Reply_mask .mask_Satisfaction>li{
		width: 25%;
		color: #a2a2a2;
	}
	#commentList .Reply_mask .mask_Satisfaction>li.active{
		color: #4b5000;
	}
	#commentList .Reply_mask .mask_Satisfaction i{
		font-size: 0.6rem;
	}
	#commentList .Reply_mask .mask_Satisfaction div{
		margin: 0.05rem 0px 0px;
		font-size: 0.26rem;
	}
	#commentList .Reply_mask .header_1{
		padding: 0.3rem 0.2rem 0.14rem;
	}
	#commentList .Reply_mask textarea{
		border:none;
		font-size: 0.3rem;
		min-width: 100%;
		max-width: 100%;
		min-height: 2.5rem;
		border-top: 1px solid #CCCCCC;
		border-bottom: 1px solid #CCCCCC;
		border-radius: 0px;
	}
	#commentList .Reply_mask .img_box{
		display: flex;
	}
	#commentList .Reply_mask .img_header{
		padding: 0.1rem 0px;
		font-size: 0.28rem;
		border-top: 1px solid #CCCBCB;
	}
	#commentList .Reply_mask .img_box>li{
		width: 1.2rem;
	    height: 1.2rem;
	    margin: 0px 0.1rem 0.11rem 0px;
	    text-align: center;
	    border: solid 2px #e6e6e6;
	    position: relative;
	}
	#commentList .Reply_mask .img_box>li>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#commentList .Reply_mask .img_box>li i{
		font-size: 1rem;
	    line-height: 1.2rem;
	    color: #e6e6e6;
	}
	#commentList .Reply_mask .img_box>li>span{
		position: absolute;
		padding: 3px;
		background: red;
		color: #FFFFFF;
		top: -30px;
		left: 0px;
		right: 0px;
		margin: auto;
		font-size: 0.24rem;
		border-radius: 3px;
		display: none;
	}
	#commentList .Reply_mask .img_box>li>span.delete_1{
		display: block;
	}
	#commentList .Reply_mask .img_box>li>span:after{
		position: absolute;
		bottom: -5px;
		left: 0px;
		right: 0px;
		margin: auto;
		width: 0px;
		content: '';
		border-top: 5px solid red;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
	}
	#commentList .Reply_mask .mask_footer{
		display: flex;
	    margin: 0.4rem 0.24rem 0.2rem;
	    border-radius: 0.8rem;
	    overflow: hidden;
	}
	#commentList .Reply_mask .mask_footer button{
		width: 50%;
	    font-size: 0.3rem;
	    letter-spacing: 0.03rem;
	    border: none;
	    border-radius: 0px;
	}
	#commentList .Reply_mask .mask_footer button:nth-child(2){
		height: 0.8rem;
	    background-color: #00a2e9;
	    color: #FFFFFF;
	}
	#commentList .Reply_mask .mask_footer button:nth-child(1){
		height: 0.8rem;
	    background-color: #f0f0f0;
	    color: #8c8c8c;
	}
	
	
	
	#commentList .mui-content{
		background: #FFFFFF;
	}
	#commentList .box_1 li{
		padding: 0.29rem 0.21rem 0.23rem;
		border-bottom:1px solid #d8d8d8;
	}
	#commentList .box_1 .header_1{
		display: flex;
	}
	#commentList .box_1 .header_1 .img_box{
		width: 40px;
		height: 40px;
		border-radius: 100%;
		margin-right: 0.2rem;
	}
	#commentList .box_1 .header_1 .img_box img{
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 100%;
	}
	#commentList .box_1 .header_1 .comment_user{
		flex-grow: 1;
	}
	#commentList .box_1 .header_1 .comment_user>div:nth-child(1){
		font-size: 0.26rem;
		margin: 0.06rem 0px 0.06rem;
	}
	#commentList .box_1 .header_1 .comment_user>div:nth-child(2){
		font-size: 0.24rem;
	}
	#commentList .box_1 .header_1 .comment_user>div:nth-child(2) i{
		color: #f90;
	}
	#commentList .box_1 .header_1 .comment_user>div:nth-child(2) .time_1{
		color: #999;
		margin: 0px 0px 0px 0.1rem;
	}
	#commentList .box_1 .header_1 .btn_1{
		font-size: 0.26rem;
		color: #3C3C3C;
		margin: 0.16rem 0px 0px 0px;
	}
	#commentList .box_1 .Reply_1{
		overflow: hidden;
    	text-overflow: ellipsis;
    	display: -webkit-box;
    	-webkit-line-clamp: 4;
    	-webkit-box-orient: vertical;
    	font-size: 0.24rem;
    	color: #1F1F1F;
    	padding: 0.1rem 0px 0px;
	}
	#commentList .box_1 .img_list{
	    display: flex;
	    flex-wrap: wrap;
	}
	#commentList .box_1 .img_list>div{
		width: 1.5rem;
    	height: 1.5rem;
   	 	padding: 0.1rem;
	}
	#commentList .box_1 .img_list>div>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	
	#commentList .box_1 .Reply_2{
		background-color: #F7F7F6;
		margin: 0.2rem 0px 0px 0px;
		padding: 0px 0.2rem;
		position: relative;
		border-radius: .06rem;
		font-size: 0.26rem;
	}
	#commentList .box_1 .Reply_2:after{
		position: absolute;
		top: -8px;
		left: 8px;
		content: '';
		width: 0; 
		height: 0; 
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid #F7F7F6;
	}
	#commentList .box_1 .Reply_2>div{
		padding: 0.1rem 0px;
	}
	#commentList .box_1 .Reply_2 .header_2{
		color: #666;
		border-bottom: 1px solid #e4e3e3;
	}
	#commentList .box_1 .Reply_2 .titme_1{
		font-size: 0.24rem;
		margin: 0.06rem 0px 0px;
		color: #757575;
	}
	
	 
	
	
	
	
	#commentList .mui-bar{
		background: #00a2e9;
	}
	#commentList .mui-title{
		color: #FFFFFF;
	}
	#commentList .mui-bar a{
		color: #FFFFFF;
	}
</style>