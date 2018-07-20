<template>
	<div id="StoreDetails">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">店铺信息</h1>
		</header>
		
		<form class="form" @submit.prevent="form_1()">
			<ul class="typeList">
				<li>
					<div>店铺类型</div>
					<div>
						<div class="select_box">
							<select name="" v-model="ShopDetail.businesstype">
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
					<div>{{ShopDetail.businesstype==0 ? '姓名' :'法人姓名'}}</div>
					<div><input required="" pattern=".*[^ ].*" type="text" v-model="ShopDetail.contactsname" placeholder="真实姓名"/></div>
				</li>
				<li>
					<div>店铺名称</div>
					<div><input required="" pattern=".*[^ ].*" type="text" v-model="ShopDetail.shopname " placeholder="店铺名"/></div>
				</li>
				<!--<li>
					<div>身份证</div>
					<div><input type="text" name="" id="" value="" placeholder="有效身份证"/></div>
				</li>-->
				<li>
					<div>手机号</div>
					<div><input required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" type="text" v-model="ShopDetail.contactsphone" placeholder="11位手机号码"/></div>
				</li>
				<li>
					<div>行业分类</div>
					<div>
						<div class="select_box">
							<!--<select name="" v-model="ShopDetail.shopcategoryid">
								<option v-for="x in industr_list" :value="x.id">{{x.name}}</option>
							</select>
							<i class="icon iconfont icon-xiala"></i>-->
							<div class="classification">
								<span v-show="!industryType.value" class="Prompt_1">点击择行业分类</span>
								<span v-show="industryType.value" class="industry_box">{{industryType.text}}</span><span v-show="twocategoryid.value" class="industry_box">{{twocategoryid.text}}</span>
							</div>
						</div>
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==0">
					<div>实名认证</div>
					<div>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==1">
					<div>分润比例</div>
					<div>
						<input type="number" v-bind:required="ShopDetail.businesstype==1" pattern=".*[^ ].*" v-model="ShopDetail.contractratio" max="60" min="5" @focus="change_Proportion(true)" @blur="change_Proportion(false)" :placeholder="Proportion_placeholder" />
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==1">
					<div>经营地址</div>
					<div>
						<!--<input type="text" v-model="ShopDetail.companyaddress" placeholder="经营地址"/>-->
						<textarea v-model="ShopDetail.companyaddress" placeholder="经营地址" name="" rows="" cols=""></textarea>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li>
					<div>开店时间</div>
					<div>
						<input type="text" @click="chenge_time('starttime')" required="" pattern=".*[^ ].*" v-model="ShopDetail.starttime" placeholder="如：08:00"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li>
					<div>打样时间</div>
					<div>
						<input type="text" required="" pattern=".*[^ ].*" @click="chenge_time('closingtime')" v-model="ShopDetail.closingtime" placeholder="如：20:00"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
				<li>
					<div>联系电话</div>
					<div>
						<input type="text" required="" pattern="^[1][3,4,5,7,8][0-9]{9}$" v-model="ShopDetail.contactsphone" placeholder="联系电话"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
					</div>
				</li>
			</ul>
			
			<ul class="typeList">
				<li v-show="ShopDetail.businesstype==0">
					<div>店铺地址</div>
					<div>
						<i @click="get_map()" class="right_1 mui-icon mui-icon-location mui-pull-right"></i>
						<textarea v-model="ShopDetail.companyaddress" placeholder="店铺地址" name="" rows="" cols=""></textarea>
						<!--<input class="region" type="text" v-model="ShopDetail.companyaddress" placeholder="店铺地址"/>-->
						<div class="text_box"></div>
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==0">
					<div>分润比例</div>
					<div>
						<input type="number" v-bind:required="ShopDetail.businesstype==0" v-model="ShopDetail.contractratio" max="60" min="5" @focus="change_Proportion(true)" @blur="change_Proportion(false)" :placeholder="Proportion_placeholder" />
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
						<div class="text_box"></div>
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==1">
					<div>营业执照</div>
					<div>
						<i @click="chang_img('businesslicencenumberphoto')" class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
						<div class="img_box" v-show="ShopDetail.businesslicencenumberphoto">
							<img @click="show_img(true,'businesslicencenumberphoto')" :src="ShopDetail.businesslicencenumberphoto"/>
						</div>
					</div>
				</li>
				<li v-show="ShopDetail.businesstype==1">
					<div>执照注册号</div>
					<div>
						<input type="text" v-bind:required="ShopDetail.businesstype==1" v-model="ShopDetail.businesslicencenumber" placeholder="执照注册号"/>
						<!--<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>-->
						<div class="text_box"></div>
					</div>
				</li>
			</ul>
			<!--<ul class="typeList">
				<li v-show="ShopDetail.businesstype==0">
					<div>保障金</div>
					<div @click="open_guarantee(true)">
						<input type="" readonly="" name="" id="" value="" v-model="guarantee_type"/>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
				<li>
					<div>商家合作协议</div>
					<div>
						<i class="right_1 mui-icon mui-icon-arrowright mui-pull-right"></i>
					</div>
				</li>
			</ul>-->
			
			<ul class="HomepagePicture">
				<li>店铺首页图片</li>
				<li>
					<div class="img_box" @click="chang_img('mainlogo')">
						<!--<img src="@/assets/img/1525229984.jpg"/>-->
						<img :src="ShopDetail.mainlogo"/>
					</div>
					<div>
						建议尺寸300px*300px
					</div>
					<div>只可上传一张</div>
				</li>
			</ul>
			
			<div class="img_list">
				<header id="openPopover">店铺内页图片<span style="font-size: 0.24rem;color: red;">(长按图片进行删除)</span></header>
				<ul>
					<li v-for="x in ShopDetail.carouseurl">
						<img :src="x"/>
					</li>
					<li @click="chang_img('carouseurl')">
						<i class="mui-icon mui-icon-plusempty"></i>
					</li>
				</ul>
				<div class="footer_1">
					可上传3~6张
				</div>
			</div>
			
			<div class="btn_1">
				<button type="submit" class="mui-btn">提交</button>
				<button type="button" @click="cancel_1()" class="mui-btn">取消</button>
			</div>
		</form>
		
		<!--选择文件-->
		<div class="flie_1">
			<input type="file" accept="image/*" name="" id="" value="" />
		</div>
		
		
		
		<div class="img_mask" v-show="img_mask">
			<div class="mask_bottom" @click="show_img(false)"></div>
			<div class="mask_body">
				<img :src="ShopDetail.mainlogo"/>
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
		
		<div id="" class="mui-popover">
		  	<ul class="mui-table-view">
		    	<li @click="delete_img()" class="mui-table-view-cell">删除照片</li>
		  	</ul>
		</div>
		
	</div>
</template>
<script>
	import '@/assets/mui/css/mui.picker.all.css'
	import '@/assets/mui/js/mui.picker.all'
	import {http,base64_splicing} from '@/assets/fc';
	export default{
		components:{
		},
		data:function(){
			return{
				img_size:'',			//裁剪图片大小
				img_type:'image/jpeg',	//裁剪的图片类型
				shopId:1,				//店铺Id
				industr_list:[],		//行业分类
				img_mask:false,
				guarantee_box:false,
				guarantee_type:'',
				Proportion_placeholder:'5%-60%',
				Proportion:'',
//				home_img:'static/img/1525229984.jpg',
				cropper_show:false,		//裁剪显示框
				delete_index:0,			//删除店内图片索引值
				chang_img_type:'',		//选择图片类型 carouseurl_1 店铺内页面 businessLicenceNumberPhoto 营业执照  mainlogo 店铺首页
				industryType:{},		//一级行业分类
				twocategoryid:{},		//二级分类
				//店铺信息
				ShopDetail:{
					businesstype:0,			//店铺类型 1 实体 0 个人
					carouseurl:[]
				}				
			}
		},
		methods:{
			form_1:function(){
//				this.$router.push('/Shopmanagement');
				var this_1=this
				var obj=new Object();
				for(var key in this_1.ShopDetail){
					obj[key]=this_1.ShopDetail[key];
				}
				obj.carouseurl=obj.carouseurl.join(',');
				obj.shopcategoryid=this.industryType.value;
				obj.twoshopcategoryid=this.twocategoryid.value;
				console.log(obj);
				//修改店铺信息的方法
				//http://localhost:8080/zlwymaster/mall/mobile/shop/updateShop
				http('post','/mall/mobile/shop/updateShop',obj,this.updateShop_return);
			},
			updateShop_return(x){
				console.log('修改店铺信息的方法',x);
				mui.toast(x,{ duration:2000, type:'div' });
			},
			//显示图片
			show_img:function(x){
				this.img_mask=x
			},
			//选择保证金弹出框
			open_guarantee:function(x){
				this.guarantee_box=x
			},
			//选择保证金
			change_guarantee:function(x){
				this.guarantee_type=x
			},
			//输入比例
			change_Proportion:function(x){
				if(x){
					this.Proportion_placeholder=''
				}else{
					this.Proportion_placeholder='5%-60%';
					if(this.ShopDetail.contractratio<5 || this.ShopDetail.contractratio>60){
						this.ShopDetail.contractratio='';
					}
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
					var dataURL = $('#StoreDetails .cropper>img').cropper("getCroppedCanvas");//拿到剪裁后的数据  
          			var data = dataURL.toDataURL(this.img_type,2000000/this.img_size);	//转成base64
          				data=base64_splicing(data)					
					//上传图片的方法
					http('post','/mall/mobile/shop/uploadImage',{'image':data},this.uploadImage);
				}
			},
			uploadImage(x){
				console.log('上传图片',x);
					//选择图片类型 carouseurl_1 店铺内页面 businesslicencenumberphoto 营业执照  mainlogo 店铺首页
					console.log(this.chang_img_type)
					if(this.chang_img_type=='carouseurl'){
						console.log('店铺内图片')
						this.ShopDetail.carouseurl.push(x);
					}else if(this.chang_img_type=='businesslicencenumberphoto'){
						this.ShopDetail.businesslicencenumberphoto=x
					}else if(this.chang_img_type=='mainlogo'){
						this.ShopDetail.mainlogo=x
					}
			},
			//进度
			jindu(x){
				console.log('上传进度',x);
			},
			delete_img(){
				this.ShopDetail.carouseurl.splice(this.delete_index,1);
				mui('.mui-popover').popover('hide')
			},
			//获取地图
			get_map(){
				var this_1=this;
				var geolocation_1 = new BMap.Geolocation();
			  	geolocation_1.getCurrentPosition(function (r) {
			  		console.log(r);
        			this_1.ShopDetail.companyaddress = r.address.province+
        										r.address.city+
        										r.address.district+
        										r.address.street+
        										r.address.street_number
        			this_1.ShopDetail.latitude=r.latitude;
        			this_1.ShopDetail.longitude=r.longitude;
			  	})
			},
			//取消
			cancel_1(){
//				window.history.back();
				this.$router.go(-1)
			},
			//选择时间
			chenge_time(x){
//				starttime closingtime
				var this_1=this
				var options={
						type: 'time',
//						beginDate: x=='starttime' ? '' : '2018-01-01 '+this_1.ShopDetail.starttime,
//						endDate: x=='starttime' ? '2018-01-01 '+this_1.ShopDetail.closingtime : ''
					}
				var picker = new mui.DtPicker(options);    //在外面没有设置$是mui的时候直接写mui
                	picker.setSelectedValue('2018-10-10 '+this_1.ShopDetail[x]);
                picker.show(function(rs) {
                	console.log(rs)
                	this_1.ShopDetail[x]=rs.value
//               	this_1[y]=rs.value;
//              	this_1.report();
//              	this_1.time_1=this_1.time_difference(this_1.endTime,this_1.startTime);
//                  return false;    //这是阻止对话框关闭的
          			picker.dispose();  //释放组件资源，释放后将将不能再操作组件.所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例
				})
			}
		},
		mounted:function(){

			var this_1=this;
			this.shopId=this.$route.query.id;
			
			//查询商铺详细信息
			http('post','/mall/mobile/shop/findShopDetail',{'id':this.shopId},ShopDetail_return)
			function ShopDetail_return(x){
				console.log('查询商铺详细信息',x);
				this_1.ShopDetail=x;
				this_1.ShopDetail.carouseurl=this_1.ShopDetail.carouseurl ? this_1.ShopDetail.carouseurl.split(',') : [];
				//获取行业分类
				http('post','/mall/mobile/shopcategory/getCategory','',getCategory);
			}
			function getCategory(x){
				console.log('获取行业分类',x);
				this_1.industr_list=x;
				PopPicker_1();
			}
			function PopPicker_1(){
				console.log(this_1.ShopDetail)
//				var cityData = [{value: '820000',text: '澳门',children: [{value: "820100",text1: "澳门半岛"}]}]
				var index_1=0;			//第一级的默认显示项
				var index_2=0;			//第二级的默认显示项
				var data=this_1.industr_list;
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
							});
							//默认二级分类
							if(data[i].two[j].id==this_1.ShopDetail.twoshopcategoryid){
								index_2=j
								this_1.twocategoryid={
										value:data[i].two[j].id,
										text:data[i].two[j].categoryname
									}
							}
						}
					list.push(obj)
				    //这里是设置默认值		第一级
				    
				 	if(data[i].one.id==this_1.ShopDetail.shopcategoryid){
				 		index_1=i;
				 		this_1.industryType=obj;
				 	}
				}
				//级联示例
					var cityPicker = new mui.PopPicker({
							layer: 2
						});
					cityPicker.setData(list);
					cityPicker.pickers[0].setSelectedIndex(index_1);//设置默认值得下标和内容。
					cityPicker.pickers[1].setSelectedIndex(index_2);//设置默认值得下标和内容。
//				var showCityPickerButton = document.getElementById('showCityPicker');
				var showCityPickerButton = $('#StoreDetails .classification')[0];
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
			
			
			
			
			
			
			
			
			mui.init({
			  gestureConfig:{
			    longtap: true, //默认为false
			    release:true,
			    hold:true
			}
			});
//			mui("#StoreDetails .img_list").on('click',"li",function(){
//			  	console.log('点击事件');
//			})
			mui("#StoreDetails .img_list").on('longtap',"li",function(){
			  	console.log('触发长按',$(this).index());
			  	this_1.delete_index=$(this).index();
			  	mui('.mui-popover').popover('toggle',$(this)[0]);
			})
//			mui("#StoreDetails .img_list").on('release',"li",function(){
//			  	console.log('触发离开');
//			})
			
			
			
			$('.flie_1').on('change','input',function(){
				var file_1=$(this)[0].files[0];
					this_1.img_type=file_1.type
					this_1.img_size=file_1.size
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
//						console.log(e)
//						this_1.ShopDetail.mainlogo=e.target.result;
						$('#StoreDetails .cropper').html('<img src="'+e.target.result+'"/>');
						this_1.cropper_show=true;
						tp();
			        }; 
			})
			
			function tp(){
				$('#StoreDetails .cropper>img').cropper({
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
			

		},
		created:function(){
			
		}
	}
</script>

<style>
	#StoreDetails .mui-popover{
		width: 125px;
		/*width: 113px;*/
		text-align: center;
	}
	#StoreDetails{
		/*padding: 44px 0px 1.4rem 0px;*/
		padding: 44px 0px 0px 0px;
	}
	#StoreDetails .img_list{
		background: #FFFFFF;
		padding: 0.2rem 0.2rem 0.22rem 0.33rem;
		margin: 0.2rem 0px 0px;
	}
	#StoreDetails .img_list header{
		font-size: 0.32rem;
		letter-spacing: 0.03rem;
	}
	#StoreDetails .img_list ul{
		display: flex;
		display: -webkit-flex;
		margin: 0.16rem 0px 0px;
		flex-wrap: wrap;
	}
	#StoreDetails .img_list li{
		width: 1.2rem;
		height: 1.2rem;
		margin: 0px 0.1rem 0.11rem 0px;
		text-align: center;
		border: solid 2px #e6e6e6;
	}
	#StoreDetails .img_list li i{
		font-size: 1rem;
		line-height: 1.2rem;
		color: #e6e6e6;
	}
	
	#StoreDetails .img_list li>img{
		width: 100%;
		height: 100%;
		object-fit:cover;
	}
	#StoreDetails .img_list .footer_1{
		font-size: 0.2rem;
		letter-spacing: 0.02rem;
		color: #b3b3b3;
	}
	
	
	
	#StoreDetails .HomepagePicture{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		padding: 0.2rem 0.2rem 0.22rem 0.33rem;
		margin-bottom: 0.2rem;
		background: #FFFFFF;
		
	}
	#StoreDetails .HomepagePicture>li:nth-child(1){
		font-size: 0.32rem;
		padding: 0px 0.44rem 0px 0px;
	}
	#StoreDetails .HomepagePicture>li:nth-child(2){
			/*width: 2.4rem;*/
			font-size: 0.2rem;
			letter-spacing: 0.02rem;
			color: #b3b3b3;
	}
	#StoreDetails .HomepagePicture .img_box{
		width: 2.24rem;
		height: 2.24rem;
	}	
	#StoreDetails .HomepagePicture .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	#StoreDetails .cropper_box{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.8);
		z-index: 10;
		padding: 70px 0px 0px 0px;
	}
	#StoreDetails .cropper_box .cropper_header{
		background: #FFFFFF;
		text-align: center;
		padding: 5px;
	}
	#StoreDetails .cropper_box .cropper{
		margin:0px 0px 10px 0px;
		text-align: center;
		background: #FFFFFF;
		height: 5rem;
	}
	#StoreDetails .cropper_box .footer_1{
		padding: 0px 0.2rem;
	}
	#StoreDetails .cropper_box .footer_1 button{
		width: 100%;
		margin-bottom: 10px;
	}
	
	
	
	
	#StoreDetails .flie_1{
		display: none;
	}
	#StoreDetails .guarantee_box{
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
	#StoreDetails .guarantee_box.active{
		opacity: 1;
		top: 0%;
	}
	
	#StoreDetails .guarantee_box .guarantee_mask{
		background: rgba(0,0,0,0.5);
		height: 100%;
	}
	#StoreDetails .guarantee_box ul{
		max-height: 100%;
		position: absolute;
		width: 100%;
		bottom: 0px;
		left: 0px;
	}
	
	
	#StoreDetails .img_mask{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 10;
	}
	#StoreDetails .img_mask .mask_bottom{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
	}
	/*#StoreDetails .img_mask .mask_body{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
	}*/
	#StoreDetails .img_mask .mask_body>img{
		width: 60%;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}
	
	#StoreDetails>header{
		background-color: #00a2e9;
	}
	#StoreDetails>header .mui-title{
		color: #ffffff;
	}
	#StoreDetails>header .mui-icon{
		color: #ffffff;
	}
	
	/*横线*/
	#StoreDetails .typeList{
		padding: 0px;
		margin-bottom: 0.2rem;
		padding: 0px 0.2rem 0px 0.33rem;
		background: #ffffff;
	}
	#StoreDetails .typeList li{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		border-bottom: 1px solid  #f0f0f0;
	}
	#StoreDetails .typeList li textarea{
		margin: 0px;
    	border: none;
	}
	#StoreDetails .typeList li select{
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
	#StoreDetails .typeList li .select_box{
		width: 80%;
		position: relative;
		margin: 0.24rem 0px 0px 0px;
	}
	#StoreDetails .typeList li .select_box i{
		position: absolute;
		top: 0.17rem;
		right: 0.33rem;
		color: #00a2e9;
		font-size: 12px;
		z-index: 0;
	}
	#StoreDetails .typeList li input{
		border: none;
		margin-bottom: 0px;
		height: 100%;
	}
	#StoreDetails .typeList li .classification{
		padding: 0px 15px;
	}
	#StoreDetails .typeList li .classification .Prompt_1{
		color: #757575;
	}
	#StoreDetails .typeList li .classification .industry_box{
		display: inline-block;
		margin-right: 15px;	
	}
	
	#StoreDetails .typeList li .right_1{
		color: #b3b3b3;
		position: absolute;
		right: 0px;
		top:  0.3rem;
	}
	#StoreDetails .typeList li>div:nth-child(1){
		width: 2.13rem;
		padding: 0.31rem 0px 0.31rem 0px;
		white-space: nowrap;
		font-size: 0.32rem;
		letter-spacing: 3px;
		color: #010101;
	}
	#StoreDetails .typeList li>:nth-child(2){
		width: 5.37rem;
		position: relative;
	}
	#StoreDetails .typeList li>:nth-child(2) .text_box{
		line-height:1.24rem ;
	}
	#StoreDetails .typeList li>:nth-child(2) .img_box{
		text-align: center;
	}
	#StoreDetails .typeList li>:nth-child(2) .img_box>img{
		width: 0.8rem;
		height: 0.8rem;
		margin: 0.2rem 0px 0px 0px;
		object-fit: cover;
	}
	
	
	#StoreDetails .btn_1{
		padding: 0px 0.24rem 0.42rem;
		/*position: fixed;*/
		/*bottom: 0px;
		left: 0px;*/
		width: 100%;
		background: #FFFFFF;
		display: flex;
	}
	#StoreDetails .btn_1 button{
		width: 50%;
		font-size: 0.3rem;
		letter-spacing: 0.03rem;
		border: none;
	}
	#StoreDetails .btn_1 button:nth-child(1){
		height: 0.8rem;
		background-color: #00a2e9;
		border-bottom-left-radius: 0.8rem;
		border-top-left-radius: 0.8rem;
		color: #FFFFFF;
	}
	#StoreDetails .btn_1 button:nth-child(2){
		height: 0.8rem;
		background-color: #f0f0f0;
		border-bottom-right-radius: 0.8rem;
		border-top-right-radius: 0.8rem;
		color: #8c8c8c;
	}
	

</style>