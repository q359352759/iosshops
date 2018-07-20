<template>
	<div id="applyforashop">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">申请开店</h1>
		</header>
		
		<form class="form" @submit.prevent="form_1()">
			<ul class="typeList">
				<li>
					<div>店铺类型</div>
					<div>
						<div class="select_box">
							<select name="" v-model="shop_obj.type">
								<option value="0">个人店铺</option>
								<option value="1">实体店铺</option>
							</select>
							<i class="icon iconfont icon-xiala"></i>
						</div>
					</div>
				</li>
			</ul>
			
			<ul class="typeList">
				<li>
					<div>{{shop_obj.type==0 ? '姓名' :'法人姓名'}}</div>
					<div><input type="text" required="" pattern=".*[^ ].*" v-model="shop_obj.name" placeholder="真实姓名"/></div>
				</li>
				<li>
					<div>店铺名</div>
					<div><input type="text" required="" pattern=".*[^ ].*" v-model="shop_obj.shopName" placeholder="店铺名"/></div>
				</li>
				<li>
					<div>身份证</div>
					<div><input type="text" required="" pattern="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" v-model="shop_obj.idCard" placeholder="有效身份证"/></div>
				</li>
				<li>
					<div>手机号</div>
					<div><input type="text" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" v-model="shop_obj.phone" placeholder="11位手机号码"/></div>
				</li>
				<li>
					<div>行业分类</div>
					<div>
						<div class="select_box">
							<div class="classification" id="showCityPicker">
								<span v-show="!industryType.value" class="Prompt_1">点击择行业分类</span>
								<span v-show="industryType.value" class="industry_box">{{industryType.text}}</span><span v-show="twocategoryid.value" class="industry_box">{{twocategoryid.text}}</span>
							</div>
							<!--<select name="" v-model="shop_obj.industryType">
								<option v-for="x in industr_list" :value="x.id">{{x.name}}</option>
							</select>-->
							<!--<i class="icon iconfont icon-xiala"></i>-->
						</div>
					</div>
				</li>
				<li @click="Authentication()" v-show="shop_obj.type==0">
					<div>实名认证</div>
					<div>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
				<li v-show="shop_obj.type==1">
					<div>分润比例</div>
					<div>
						<input type="number" v-bind:required="shop_obj.type==1" v-model="shop_obj.contractRatio" max="60" min="5" @focus="change_Proportion(true)" @blur="change_Proportion(false)" :placeholder="Proportion_placeholder"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li v-show="shop_obj.type==1">
					<div>经营地址</div>
					<div>
						<textarea v-model="shop_obj.shopAddress" placeholder="经营地址"></textarea>
						<!--<input type="text" name="" id="" value="" v-model="shop_obj.shopAddress"/>-->
						<!--<div contenteditable="true" class="address_box address_box_0"></div>-->
					</div>
				</li>
			</ul>
			
			<ul class="typeList">
				<li v-show="shop_obj.type==0">
					<div>店铺地址</div>
					<div>
						<!--<input type="text" name="" id="" value="" v-model="shop_obj.shopAddress" />-->
						<textarea v-model="shop_obj.shopAddress" placeholder="店铺地址" name="" rows="" cols=""></textarea>
						<!--<div class="address_box address_box_1" contenteditable="true"></div>-->
					</div>
				</li>
				<li>
					<div>店铺首页</div>
					<div @click="chang_img('mainLogo')">
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
						<div class="img_box" v-show="shop_obj.mainLogo">
							<!--<img @click="show_img(true,'mainLogo')" :src="shop_obj.mainLogo"/>-->
							<img :src="shop_obj.mainLogo"/>
						</div>
					</div>
				</li>
				<!--<li>
					<div>轮播图片</div>
					<div><i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i></div>
				</li>-->
				<li v-show="shop_obj.type==0">
					<div>分润比例</div>
					<div>
						<input type="number" v-bind:required="shop_obj.type==0" v-model="shop_obj.contractRatio" max="60" min="5" @focus="change_Proportion(true)" @blur="change_Proportion(false)" :placeholder="Proportion_placeholder"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li v-show="shop_obj.type==1">
					<div>营业执照</div>
					<div @click="chang_img('businessLicenceNumberPhoto')">
						<i  class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
						<div class="img_box" v-show="shop_obj.businessLicenceNumberPhoto">
							<img :src="shop_obj.businessLicenceNumberPhoto"/>
						</div>
					</div>
				</li>
				<li v-show="shop_obj.type==1">
					<div>执照注册号</div>
					<div>
						<input type="text" v-bind:required="shop_obj.type==1" pattern=".*[^ ].*" v-model="shop_obj.businessLicenceNumber" placeholder="注册号"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
			</ul>
			<ul class="typeList">
				<li v-show="shop_obj.type==0">
					<div>保障金</div>
					<div @click="open_guarantee(true)">
						<input type="" readonly="" name="" id="" value="" v-model="shop_obj.security"/>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
				<li>
					<div>营销顾问</div>
					<div><input type="text" :readonly="isgetAgentinfo" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" v-model="shop_obj.agentinfo" placeholder="手机号"/></div>
				</li>
				<li @click="change_Agreement(true)">
					<div>商家合作协议</div>
					<div>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
			</ul>
			<div class="btn_1">
				<button type="submit" class="mui-btn mui-btn-danger">提交</button>
			</div>
		</form>
		
		<div class="flie_1">
			<input type="file" accept="image/*" name="" id="" value="" />
		</div>
		
		
		<div class="img_mask" v-show="img_mask">
			<div class="mask_bottom" @click="show_img(false)"></div>
			<div class="mask_body">
				<img :src="large_image"/>
			</div>
		</div>
		
		<div class="guarantee_box" :class="{active:guarantee_box}">
			<div class="guarantee_mask" @click="open_guarantee(false)"></div>
			<ul class="mui-table-view">
			        <li class="mui-table-view-cell">
			            <a class="javascript:;" @click="open_guarantee(false),change_guarantee('暂不缴纳')">
			              	  暂不缴纳
			            </a>
			        </li>
			        <li class="mui-table-view-cell">
			            <a class="">
			                500元
			                <button class="mui-pull-right">充值</button>
			            </a>
			        </li>
			        <li class="mui-table-view-cell">
			            <a class="">
			                1500元
			                <button class="mui-pull-right">充值</button>
			            </a>
			        </li>
			        <li class="mui-table-view-cell">
			            <a class="">
			                3000元
			                <button class="mui-pull-right">充值</button>
			            </a>
			        </li>
			    </ul>
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
		
		
			<div class="Agreement_mask" :class="{'active':Agreement_mask}">
				<header class="mui-text-center">
					<i @click="change_Agreement(false)" class="mui-pull-right mui-icon mui-icon-closeempty"></i>
					<div>
						加盟合作协议
					</div>
				</header>
				<div class="Agreement_content">
					<JoinAgreement :zidingyi="shop_obj.name"></JoinAgreement>
				</div>
			</div>
		
		
	</div>
</template>
<script>
	import '@/assets/mui/css/mui.picker.css';
	import '@/assets/mui/css/mui.poppicker.css';
	import '@/assets/mui/js/mui.picker';
	import '@/assets/mui/js/mui.poppicker'
	import {http,base64_splicing} from '@/assets/fc'
	import JoinAgreement from '@/components/JoinAgreement'
	export default{
		components:{
			JoinAgreement
		},
		data:function(){
			return{
				isgetAgentinfo:false,	//是否有营销顾问
				img_size:'',			//图片大小
				img_type:'image/jpeg',	//裁剪的图片类型
				Agreement_mask:false,	//协议弹出框
				img_mask:false,		//点击查看图片
				large_image:'',		//点击查看图片的地址
				guarantee_box:false,	//选择保证金是否显示
				Proportion_placeholder:'5%-60%',		//比例提示语言
				Proportion:'',		//分润比例
				cropper_show:false,		//选择图片后的裁剪框
				cropper_show_type:'',	//裁剪图片的类型如：首页图片，执照图片等
				test:'',
				industryType:{},		//一级行业分类
				twocategoryid:{},		//二级分类
				shop_obj:{
					id:localStorage.ids,		//用户Id
					type:1,			//1企业，0个人
					name:'',		//开店人真实姓名
					shopName:'',	//店铺姓名
					idCard:'',		//身份证号
					phone:'',		//手机号
					industryType:1,	//行业分类
					shopAddress:'',	//店铺地址
					mainLogo:'',	//首页图片
					security:'',	//保障金
					agentinfo:'',	//营销顾问手机号
					contractRatio:'',	//分润比例
					businessLicenceNumberPhoto:'',	//执照照片
					businessLicenceNumber:'',	//执照编号
					twocategoryid:'',			//二级分类的id
				},
				industr_list:[
					{'id':1,'name':'休闲'}
				],
				
			}
		},
		methods:{
			change_Agreement(x){
				this.Agreement_mask=x
			},
			form_1:function(){
//				this.$router.push('/Shopmanagement');
				let empty=/.*[^ ].*/;
				
				if(this.shop_obj.type!=1){
//					this.shop_obj.shopAddress=$('.address_box_1').html();
					if(!this.industryType.value){
						mui.toast('请选择行业',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.shopAddress){
						mui.toast('请输入店铺地址',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.mainLogo){
						mui.toast('请选择店铺首页图片',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.security){
						mui.toast('请选择保证金',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.agentinfo){
						mui.toast('请输入营销顾问手机号',{ duration:2000, type:'div' })
					}else{
						var shop_obj=this.shop_obj
						var obj={};
							for(var key in shop_obj){
								obj[key]=shop_obj[key];
							}
							obj.mainLogo=base64_splicing(obj.mainLogo);
							obj.industryType=this.industryType.value;
							obj.twocategoryid=this.twocategoryid.value
							obj.businessLicenceNumberPhoto=base64_splicing(obj.businessLicenceNumberPhoto)
						http('post','/mall/mobile/shop/addShop',obj,this.addShop,this.onprogress)
					}
				}else{
					if(!this.industryType.value){
						mui.toast('请选择行业',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.shopAddress){
						mui.toast('请输入店铺地址',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.mainLogo){
						mui.toast('请选择店铺首页图片',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.businessLicenceNumberPhoto){
						mui.toast('请选择营业执照照片',{ duration:2000, type:'div' })
					}else if(!this.shop_obj.agentinfo){
						mui.toast('请输入营销顾问手机号',{ duration:2000, type:'div' })
					}else{
						var shop_obj=this.shop_obj
						var obj={};
							for(var key in shop_obj){
								obj[key]=shop_obj[key];
							}
							obj.mainLogo=base64_splicing(obj.mainLogo);
							obj.industryType=this.industryType.value;
							obj.twocategoryid=this.twocategoryid.value;
							obj.businessLicenceNumberPhoto=base64_splicing(obj.businessLicenceNumberPhoto)
//							console.log(obj)
						http('post','/mall/mobile/shop/addShop',obj,this.addShop,this.onprogress);
					}
				}
			},
			//显示图片
			show_img:function(x,y){
				this.img_mask=x;
//				console.log(y)
				if(y){
					this.large_image=this.shop_obj[y];
				}
			},
			//选择保证金弹出框
			open_guarantee:function(x){
				this.guarantee_box=x
			},
			//选择保证金
			change_guarantee:function(x){
				this.shop_obj.security=x
			},
			//输入比例
			change_Proportion:function(x){
				if(x){
					this.Proportion_placeholder=''
				}else{
					this.Proportion_placeholder='5%-60%';
					if(this.Proportion<5 || this.Proportion>60){
						this.Proportion=''
					}
				}
			},
			//点击选图片
			chang_img:function(x){
				this.cropper_show_type=x
				$('.flie_1').html('<input type="file" accept="image/*" name="" id="" value="" />')
				$('.flie_1').children().click();
			},
			//确定裁剪
			Determine_cropper:function(x){
				this.cropper_show=false;
				if(x){
					var dataURL = $('#applyforashop .cropper>img').cropper("getCroppedCanvas");//拿到剪裁后的数据  						
          			var data = dataURL.toDataURL(this.img_type,this.img_size>=2000000 ? 0.5 : 1);	//转成base64
//        			this.shop_obj.mainLogo=data;
          			this.shop_obj[this.cropper_show_type]=data;
				}
			},
			
			//实名认证
			Authentication(){
				mui.toast('功能暂未开放',{ duration:2000, type:'div' })
			},
			//进度条
			onprogress:function(x){
				$('#progressbar_box').show();
				var loaded = x.loaded;     //已经上传大小情况 
				var tot = x.total;      //附件总大小 
				var per = Math.floor(100 * loaded / tot);  //已经上传的百分比 
				$('#progressbar_box').children().eq(0).html(per+'%');
				mui("#progressbar_1").progressbar().setProgress(per);
			},
			//添加店铺返回值
			addShop:function(x){
				$('#progressbar_box').hide();
				console.log('申请开店返回值',x);
				var this_1=this;
				if(x.success){
					mui.alert(x.data.message,'',function() {
						this_1.$router.push('/home');
					},function(){}, 'div');
				}else{
					mui.alert(x.message,'',function() {},function(){}, 'div');
				}
			}
		},
		mounted:function(){
			var this_1=this;
			var empty=/.*[^ ].*/;
			//查询营销顾问
			http('post','/mall/mobile/shop/getAgentinfo',{'id':localStorage.ids},getAgentinfo)
			function getAgentinfo(x){
				console.log('查询营销顾问',x);
				this_1.isgetAgentinfo=x.success
				if(x.success){
					this_1.shop_obj.agentinfo=x.data
				}
			}
			
			
//			获取行业分类
			http('post','/mall/mobile/shopcategory/getCategory','',getCategory)
			function getCategory(x){
				console.log('获取行业分类',x);
				this_1.industr_list=x;
				if(x.length>0){
					this_1.shop_obj.industryType=x[0].id;
				}
				PopPicker_1()
			}
			
			
			function PopPicker_1(){
//				var cityData = [{value: '820000',text: '澳门',children: [{value: "820100",text1: "澳门半岛"}]}]
				var data=this_1.industr_list
				var list=[];
				for(var i=0;i<data.length;i++){
					var obj=new Object();
						obj.value=data[i].one.id;
						obj.text=data[i].one.categoryname;
						obj.children=[];
						for(var j=0;j<data[i].two.length;j++){
							obj.children.push({
								value:data[i].two[j].id,
								text:data[i].two[j].categoryname
							})
						}
					list.push(obj)
				    //这里是设置默认值
//				 	if(List[i].uname==store){  index=i }
				}
				//级联示例
					var cityPicker = new mui.PopPicker({
						layer: 2
					});
					cityPicker.setData(list);
//				var showCityPickerButton = document.getElementById('showCityPicker');
				var showCityPickerButton = $('#applyforashop .classification')[0];
				showCityPickerButton.addEventListener('tap', function(event) {
							cityPicker.show(function(items) {
								console.log(items)
								this_1.industryType=items[0];
								this_1.twocategoryid=items[1];
								//返回 false 可以阻止选择框的关闭
								//return false;
							});
				}, false);	
			}
			

				
			var this_1=this;
			$('.flie_1').on('change','input',function(){
				var file_1=$(this)[0].files[0];
				console.log(file_1)
				this_1.img_type=file_1.type
				this_1.img_size=file_1.size
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
//						console.log(e)
//						this_1.home_img=e.target.result;
						$('#applyforashop .cropper').html('<img src="'+e.target.result+'"/>');
						this_1.cropper_show=true;
						tp();
			        }; 
			})
			
			function tp(){
				$('#applyforashop .cropper>img').cropper({
					//设置图片比例
					aspectRatio: 4 / 3,
					//图片预览的容器
					preview:'.box_1',
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
			
				var geolocation_1 = new BMap.Geolocation();
			  	geolocation_1.getCurrentPosition(function (r) {
			  		console.log(r);
        			this_1.shop_obj.shopAddress = r.address.province+
        										r.address.city+
        										r.address.district+
        										r.address.street+
        										r.address.street_number
        			this_1.shop_obj.latitude=r.latitude;
        			this_1.shop_obj.longitude=r.longitude;
			  	})
			
//				let _this = this
//				let mapObj = new AMap.Map('iCenter') //iCenter是id容器名称
//				mapObj.plugin('AMap.Geolocation', function() {})
//				let geolocation = new AMap.Geolocation({
//		        		timeout: 10000,
//		        		GeoLocationFirst: false,
//		        		maximumAge: 0 //定位结果缓存0毫秒，默认：0
//			    	});
//			    mapObj.addControl(geolocation)
//			    geolocation.getCurrentPosition()
//			    AMap.event.addListener(geolocation, 'complete', function(data) {
//			    	console.log(data);
//      			data.position.getLng() //定位成功返回的经度
//      			data.position.getLat() //定位成功返回的纬度
//      			_this.shop_obj.shopAddress = data.addressComponent.province+
//      							data.addressComponent.city+
//      							data.addressComponent.district+
//      							data.addressComponent.township+
//      							data.addressComponent.street+
//      							data.addressComponent.streetNumber
////					_this.shop_obj.shopAddress=JSON.stringify(data);
//			    }); //返回定位信息
//			    AMap.event.addListener(geolocation, 'error', function(data) {
//			    	console.log(data)
//			        if (data.info == 'FAILED') {
//			            mui.toast('获取位置失败！请手动输入！',{ duration:2000, type:'div' })
//			        }
//			    });

				
		},
		created:function(){
			
		}
	}
</script>

<style>
	
	#applyforashop{
		/*padding: 44px 0px 1.4rem 0px;*/
		padding: 44px 0px 0px 0px;
	}
	
	#applyforashop .Agreement_mask{
 		position: fixed;
 		width: 100%;
 		height: 100%;
 		left: 100%;
 		top: 0px;
 		background: #FFFFFF;
 		z-index: 10;
 		-webkit-transition: all 0.3s;
 		-moz-transition: all 0.3s;
 		-ms-transition: all 0.3s;
 		-o-transition: all 0.3s;
 		transition: all 0.3s;
 	}
 	#applyforashop .Agreement_mask.active{
 		left: 0px;
 	}
	#applyforashop .Agreement_mask>header{
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #CCCCCC;
		background: #FFFFFF;
		position: relative;
		z-index: 1;
	}
	#applyforashop .Agreement_mask>header i{
		position: absolute;
		right: 8px;
		top: 8px;
	}
	#applyforashop .Agreement_content{
		padding:42px 5px 5px;
	    font-size: 0.28rem;
	    position: absolute;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    height: 100%;
	    overflow: auto;
	}
	
	#applyforashop .cropper_box{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.8);
		z-index: 10;
		padding: 70px 0px 0px 0px;
	}
	#applyforashop .cropper_box .cropper_header{
		background: #FFFFFF;
		text-align: center;
		padding: 5px;
	}
	#applyforashop .cropper_box .cropper{
		margin:0px 0px 10px 0px;
		text-align: center;
		background: #FFFFFF;
		height: 5rem;
	}
	#applyforashop .cropper_box .footer_1{
		padding: 0px 0.2rem;
	}
	#applyforashop .cropper_box .footer_1 button{
		width: 100%;
		margin-bottom: 10px;
	}
	
	
	
	
	#applyforashop .flie_1{
		display: none;
	}
	#applyforashop .guarantee_box{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 100%;
		left: 0px;
		z-index: 10;
		opacity: 0;
		-webkit-transition: all 0.3s;
		-moz-transition: all 0.3s;
		-ms-transition: all 0.3s;
		-o-transition: all 0.3s;
		transition: all 0.3s;
	}
	#applyforashop .guarantee_box.active{
		opacity: 1;
		top: 0%;
	}
	
	#applyforashop .guarantee_box .guarantee_mask{
		background: rgba(0,0,0,0.5);
		height: 100%;
	}
	#applyforashop .guarantee_box ul{
		max-height: 100%;
		position: absolute;
		width: 100%;
		bottom: 0px;
		left: 0px;
	}
	
	
	#applyforashop .img_mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 10;
	}
	#applyforashop .img_mask .mask_bottom{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	/*#applyforashop .img_mask .mask_body{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
	}*/
	#applyforashop .img_mask .mask_body>img{
		width: 60%;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
	
	#applyforashop>header{
		background-color: #00a2e9;
	}
	#applyforashop>header .mui-title{
		color: #ffffff;
	}
	#applyforashop>header .mui-icon{
		color: #ffffff;
	}
	
	/*横线*/
	#applyforashop .typeList{
		padding: 0px;
		margin-bottom: 0.2rem;
		padding: 0px 0.2rem 0px 0.33rem;
		background: #ffffff;
	}
	#applyforashop .typeList li{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		border-bottom: 1px solid  #f0f0f0;
		min-height: 0.9rem;
	}
	#applyforashop .typeList li select{
		margin-bottom: 0px;
		height: 0.53rem;
		/*height: 26px;*/
		font-size: 0.24rem;
		padding: 0px;
		border: solid 1px #00a2e9;
		border-radius: 3px;
		padding: 0px 0px 0px 0.25rem;
		color: #808080;
		position: relative;
		z-index: 1;
		background: none ;
	}
	#applyforashop .typeList li textarea{
		margin: 0px;
		border: none;
	}
	#applyforashop .typeList li .select_box{
		width: 80%;
		position: relative;
		margin: 0.24rem 0px 0px 0px;
	}
	#applyforashop .typeList li .select_box i{
		position: absolute;
		top: 0.17rem;
		right: 0.33rem;
		color: #00a2e9;
		font-size: 12px;
		z-index: 0;
	}
	#applyforashop .typeList li input{
		border: none;
		margin-bottom: 0px;
		/*margin-top: 0.07rem;*/
		height: 100%;
		padding: 0px 15px;
		height: 100%;
	}
	#applyforashop .typeList li .classification{
		padding: 0px 15px;
	}
	#applyforashop .typeList li .classification .Prompt_1{
		color: #757575;
	}
	#applyforashop .typeList li .classification .industry_box{
		display: inline-block;
		margin-right: 15px;	
	}
	#applyforashop .typeList li .right_1{
		color: #b3b3b3;
		/*margin: 0.3rem 0px 0px 0px;*/
		position: absolute;
		right: 0px;
		top:  0.24rem;
	}
	#applyforashop .typeList li>div:nth-child(1){
		width: 2.13rem;
		white-space: nowrap;
		font-size: 0.32rem;
		line-height: 0.9rem;
		letter-spacing: 3px;
		color: #010101;
	}
	#applyforashop .typeList li>:nth-child(2){
		width: 5.37rem;
		/*padding: 0.24rem 0px 0px 0px;*/
		position: relative;
	}
	#applyforashop .typeList li>:nth-child(2) .address_box{
		min-height: 100%;
		padding: 13px 0px 0px 0px;
	}
	#applyforashop .typeList li>:nth-child(2) .img_box{
		text-align: center;
		width: 0.8rem;
		height: 0.8rem;
		margin: 3px auto 0px;
		/*border: 1px solid #CCCCCC;*/
	}
	#applyforashop .typeList li>:nth-child(2) .img_box>img{
		/*width: 0.8rem;
		height: 0.8rem;*/
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 1px solid #CCCCCC;
	}
	
	
	#applyforashop .btn_1{
		padding: 0px 0.24rem 0.42rem;
		/*position: fixed;*/
		bottom: 0px;
		left: 0px;
		width: 100%;
		/*background: #FFFFFF;*/
	}
	#applyforashop .btn_1 button{
		width: 100%;
		height: 0.88rem;
		background-color: #df3121;
		border-radius: 0.1rem;
		font-size: 0.36rem;
		line-height: 0px;
		letter-spacing: 0.03rem;
		color: #ffffff;
	}
	
	
	

</style>