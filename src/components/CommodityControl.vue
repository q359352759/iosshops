<template>
	<div id="CommodityControl">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">商品管理</h1>
		</header>
		<div class="mui-content">
		    
		    <ul class="mui-table-view box_1">
		    	<header class="">
		    		<span class="">推荐单品</span>
		    		<span @click="show_mask(true)" class="mui-pull-right add_1">添加</span>
		    	</header>
		        <li v-for="x in product" class="mui-table-view-cell">
					<div class="mui-slider-left mui-disabled">
						<a @click="delete_1(x)" class="mui-btn mui-btn-red mui-icon mui-icon-trash"></a>
					</div>
					<div class="mui-slider-right">
						<a @click="show_mask(true,x)" class="mui-btn mui-btn-yellow mui-icon mui-icon mui-icon-compose"></a>
					</div>
					<div class="mui-slider-handle mui-media content_1">
						<img class="mui-media-object mui-pull-left" :src="x.imagepath">
		                <div class="mui-media-body">
		                   	<div class="title_1">{{x.productname}}</div>
		                   	<div class="time_1">{{x.create_time | data_time}}</div>
		                </div>
					</div>
		       	</li>
		    </ul>
		    <div v-if="product.length==0" class="No_data">暂无数据</div>
		    
		    
		    <div class="add_mask">
		    	<form @submit.prevent="form_1()">
			    	<div class="header_1">
			    		添加商品
			    		<i @click="show_mask(false)" class="mui-icon mui-icon-closeempty"></i>
			    	</div>
			    	<ul class="mask_box">
			    		<li>
			    			<div class="header_2">商品名称</div>
			    			<div>
			    				<input type="text" v-model="details.name" required="" pattern=".*[^ ].*" name="" id="" value="" placeholder="请输入商品名称"/>
			    			</div>
			    		</li>
			    		<li>
			    			<div class="header_2">展示图片</div>
			    			<div class="img_box">
			    				<div class="cropper_box" @click="change_img()">
			    					<img src="static/img/1525229984.jpg"/>
			    				</div>
			    			</div>
			    		</li>
			    	</ul>
			    	
			    	<div class="footer_1">
			    		<button type="submit" class="mui-btn">确定</button>
			    		<button type="button" @click="show_mask(false)" class="mui-btn">取消</button>
			    	</div>
		    	</form>
		    </div>
		    
		    <!--选择文件-->
			<div class="flie_1 mui-hidden">
				<input type="file" accept="image/*" name="" id="" value="" />
			</div>
		    
		</div>
	</div>
</template>

<script>
	import {http,base64_splicing,dateFtt} from '@/assets/fc'
	export default{
		components:{
		},
		data:function(){
			return{
				shopId:1,		//店铺Id
				details:{},		//商品详情
				is_img:false,	//是否有图片
				img_type:'',	//所选图片类型
				img_size:'',	//所选图片大小
				product:[],		//商品列表
			}
		},
		filters:{
			data_time(time){
				return dateFtt(time,'yyyy-MM-dd hh:mm');
			}
		},
		methods:{
			//点击选图片
			change_img(x){
				$('#CommodityControl .flie_1').html('<input type="file" accept="image/*" name="" id="" value="" />')
				$('#CommodityControl .flie_1').children().click();
			},
			//提交
			form_1(){
				console.log(this.details)
				if(!this.is_img){
					if(!this.details.id){		//Id不存在为添加
						mui.toast('请选择图片',{ duration:2000, type:'div' })
					}else{
						$('#CommodityControl .add_mask').fadeOut();
						http('post','/mall/mobile/product/updateProductById',this.details,this.productUpload_return)
					}
				}else{
					var dataURL = $('#CommodityControl .cropper_box>img').cropper("getCroppedCanvas");//拿到剪裁后的数据  
          			var data = dataURL.toDataURL(this.img_type,2000000/this.img_size);	//转成base64
//        			this.shop_obj.mainLogo=data;
						data=base64_splicing(data)
//					console.log(data);
					$('#CommodityControl .add_mask').fadeOut();
					http('post','/mall/mobile/shop/uploadImage',{'image':data},this.uploadImage,this.progressbar);
				}
			},
			//上传图片进度条
			progressbar(evt){
				console.log(evt)
				$('#progressbar_box').show();
					var loaded = evt.loaded;     //已经上传大小情况 
					var tot = evt.total;      	//附件总大小 
					var per = Math.floor(100 * loaded/tot);  //已经上传的百分比 
				$('#progressbar_box').children().eq(0).html(per+'%');
				mui("#progressbar_1").progressbar().setProgress(per);
			},
			//图片上传返回值
			uploadImage(x){
				$('#progressbar_box').hide();
				console.log('图片上传返回值',x);
				this.details.imgpath=x;
				this.details.shopid=this.shopId;
				if(!this.details.id){
					//添加商品
					http('post','/mall/mobile/product/productUpload',this.details,this.productUpload_return)
				}else{
					http('post','/mall/mobile/product/updateProductById',this.details,this.productUpload_return)
				}
				
			},
			//添加商品返回值
			productUpload_return(x){
				console.log('添加和修改商品返回值',x)
				if(x){
					mui.toast('设置成功！',{ duration:2000, type:'div' });
					this.findProductByShopid()
				}else{
					mui.toast('系统错误，请联系管理员！',{ duration:2000, type:'div' })
				}
			},
			//查询商品列表
			findProductByShopid(){
				http('post','/mall/mobile/product/findProductByShopid',{'id':this.shopId},this.findProductByShopid_return)
			},
			findProductByShopid_return(x){
				console.log('商品列表',x)
				this.product=x
			},
			//显示和隐藏弹出框
			show_mask(x,y){
				this.is_img=false;
				x ? $('#CommodityControl .add_mask').fadeIn() : $('#CommodityControl .add_mask').fadeOut();
				if(y){
					this.details=y;
					this.details.name=y.productname;
					$('#CommodityControl .cropper_box').html('<img src="'+y.imagepath+'"/>');
				}else{
					this.details={};
					$('#CommodityControl .cropper_box').html('<img src="static/img/1525229984.jpg"/>');
				}
			},
			//删除产品
			delete_1(x){
				var this_1=this
				mui.confirm('确定删除？','提示',['取消','确定'],function(e){
					console.log(e);
					if(e.index==1){
						http('post','/mall/mobile/product/deleteProductById',{'id':x.id},this_1.productUpload_return)
					}
				})
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
					
					this_1.findProductByShopid();
				}
			}
			
			
			$('#CommodityControl .flie_1').on('change','input',function(){
				var file_1=$(this)[0].files[0];
					this_1.img_type=file_1.type
					this_1.img_size=file_1.size;
					this_1.is_img=true;
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
//						console.log(e)
//						this_1.ShopDetail.mainlogo=e.target.result;
						$('#CommodityControl .cropper_box').html('<img src="'+e.target.result+'"/>');
//						this_1.cropper_show=true;
						cropper_tp();
			        }; 
			})
			
			function cropper_tp(){
				$('#CommodityControl .cropper_box>img').cropper({
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
	
	#CommodityControl .No_data{
		text-align: center;
		padding: 0.2rem;
		font-size: 0.26rem;
		color: #7d7d7d;
		background: #FFFFFF;
	}
	#CommodityControl .add_mask{
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: #FFFFFF;
		z-index: 10;
		display: none;
	}
	#CommodityControl .add_mask .header_1{
		position: relative;
		text-align: center;
		height: 44px;
		line-height: 44px;
		border-bottom: 1px solid #EEEDF2;
	}
	#CommodityControl .add_mask .header_1 i{
		position: absolute;
		right: 9px;
		top: 9px;
	}
	#CommodityControl .add_mask .mask_box{
		padding: 0px 0.2rem;
	}
	#CommodityControl .add_mask .mask_box .header_2{
		padding: 0.26rem 0px 0.16rem;
		font-size: 0.26rem;
	}
	#CommodityControl .add_mask .mask_box input{
		border: none;
		margin: 0px;
		border-bottom: 1px solid rgba(0, 0, 0, .2);
		font-size: 0.26rem;
	}
	#CommodityControl .add_mask .mask_box .img_box{
		background: #EEEDF2;
	}
	#CommodityControl .cropper_box{
		width: 4rem;
		height: 4rem;
		margin: 0px auto;
	}
	#CommodityControl .cropper_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#CommodityControl .add_mask .footer_1{
		padding: 0.4rem 0.24rem 0.42rem;
	    /* position: fixed; */
	    width: 100%;
	    background: #FFFFFF;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	}
	#CommodityControl .add_mask .footer_1 button{
		width: 50%;
	    font-size: 0.3rem;
	    letter-spacing: 0.03rem;
	    border: none;
	}
	#CommodityControl .add_mask .footer_1>button:nth-child(1){
		height: 0.8rem;
	    background-color: #00a2e9;
	    border-bottom-left-radius: 0.8rem;
	    border-top-left-radius: 0.8rem;
	    color: #FFFFFF;
	}
	#CommodityControl .add_mask .footer_1>button:nth-child(2){
		height: 0.8rem;
	    background-color: #f0f0f0;
	    border-bottom-right-radius: 0.8rem;
	    border-top-right-radius: 0.8rem;
	    color: #8c8c8c;
	}
	
	
	#CommodityControl .box_1{
		margin: 0px;
	}
	#CommodityControl .box_1>header{
		padding: 0.2rem 0.3rem;
		background: #FFFFFF;
		border-bottom: 1px solid #EEEDF2;
	}
	#CommodityControl .box_1>header .add_1{
		display: inline-block;
		padding: 3px 15px;
		font-size: 0.26rem;
		color: #00a2e9;
		border:1px solid #00a2e9;
		border-radius: 3px;
	}
	
	#CommodityControl .box_1 .content_1 .title_1{
		margin-bottom: 3px;
	}
	#CommodityControl .box_1 .content_1 .time_1{
		font-size: 0.3rem;
		color: #6b6b6b;
	}
	#CommodityControl .box_1 .content_1 .suspension_1{
		position: absolute;
		right: 0px;
		top: 0px;
		padding: 3px 5px;
		background: red;
		color: #FFFFFF;
		font-size: 0.26rem;
	}
	
	
	
	#CommodityControl .mui-bar{
		background: #00a2e9;
	}
	#CommodityControl .mui-title{
		color: #FFFFFF;
	}
	#CommodityControl .mui-bar a{
		color: #FFFFFF;
	}
</style>