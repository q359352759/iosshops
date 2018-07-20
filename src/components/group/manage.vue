<template>

		<div id="box3">
			<header class="mui-bar mui-bar-nav">
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			    <h1 class="mui-title">账号管理</h1>
			</header>
			<div class="mui-content">
			    
			
			<!--<header>
				<span @click="go"><</span>
				<i>账号管理</i>
			</header>-->
			<div class="top">
				<p class="head">
					<span>头像</span>
					<em @click="input" class="gai">></em>
					<i id="head_i" @click="input">
						<img id="header_img"  :src="imgDataUrl" /> &nbsp;&nbsp;
						<!--<input type="file" name="file" class="upload__input" @change="uploadChange" accept="image/png,image/gif" >--> 
					</i>		
				</p>
				<div class="cb"></div>
				<router-link to="/userName">
					<p>	
						<span>昵称</span>
						<i @click="userName">{{username}}&nbsp;&nbsp;<em class="gai">></em></i>
					</p>
				</router-link>
				<div class="cb"></div>
				<p>
					<span>账号</span>
					<i id="number">{{phone}}</i>
				</p>
				<div class="cb"></div>
				<router-link to="/password">
					<p>				
							<span>登录密码</span>
							<i class="gai">></i>			
					</p>
				</router-link>
				<div class="cb"></div>
				<router-link to="/payment">
					<p>			
							<span>支付密码</span><i class="gai">></i>		
					</p>
				</router-link>		
			</div>
			<div id="file_header">
				<input type="file" accept="image/*" name="" id="" value="" />
			</div>
			<div class="bottom">
				<p>
					<span>实名认证</span>					
					<i  class="gai">></i>
					<em>无</em>
				</p>
				<div class="cb"></div>
				<router-link to="/site">
					<p>					
							<span>收货地址</span>
							<i  class="gai">></i>
							<em class="addre">{{address ? address:'无'}}</em>			
					</p>
				</router-link>
				<div class="cb"></div>
				<router-link to="/email">
					<p>		
							<span>邮箱</span>
							<i class="gai">></i>
							<em>{{email ? email:'无'}}</em>		
					</p>
				</router-link>	
			</div>
			<button @click="quit">退出登录</button>	
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
			</div>
		</div>

</template>
<script>
		import $ from 'jquery'
		import {http,base64_splicing,axios,ajaxs} from '@/assets/fc'
		export default{
		components:{
	
		},
		data:function(){
				return{
					bool:true,
					username:"",
					imgDataUrl:"static/img/header_03.jpg",
					cropper_show:false,
					phone:"",
					sid:localStorage.ids ? localStorage.ids : '',
					userdata:[],
					email:"",
					address:""
				}
			},
		methods:{
			userName:function(){
				var name = this.username;
				this.$router.push({name:"userName",params:{name:name}})	
				
				
			},
			go:function(){
				this.$router.go(-1)
			},
			photo:function(){
				this.bool=!this.bool;		
			},
			uploadChange(event){  
			    if(event.target.files.length>0){  
			        this.files = event.target.files[0];  //提交的图片  
			        this.$conf.getBase64(event.target,(url)=>{  
			            this.imgDataUrl = 'data:image/png;base64,'+url;   //显示的图片  
			        });   
			    }            
			}, 
			input:function(){
				//点击选图片
				$('#file_header').html('<input type="file" accept="image/*" name="" id="" value="" />')
				var a= $('#file_header').children().click();
			
			},
			quit:function(){
				var _this = this;
				localStorage.removeItem('user');
				localStorage.removeItem('ids');
				mui.toast("退出成功！",2000);
				setTimeout(function(){
					_this.$router.push("/login")
				},2000)
				
			},
			//确定裁剪
			Determine_cropper:function(x){
				var sid = this.sid;
				var _this = this;
				console.log(sid)
				this.cropper_show=false;
				if(x){
//					var result = $('#applyforashop .cropper>img').cropper('getCroppedCanvas');
					var dataURL = $('#box3 .cropper>img').cropper("getCroppedCanvas");//拿到剪裁后的数据
          			var data = dataURL.toDataURL("image/*",0.5);//转成base64
          			this.imgDataUrl=data;
				}		
				var mainLogo = base64_splicing(this.imgDataUrl);
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/userImage",
					async:true,
					data:{
						imgUrl:mainLogo,
						uId:sid
					},
					success:function(res){
						console.log(res)
					},
					error:function(res){
						console.log(res);
					}
				});
				
			},
			users:function(res){
				var user = res.data;
				var jsonStr = JSON.stringify(user)
				localStorage.setItem("user",jsonStr)
				this.address = user.address;
				this.imgDataUrl = user.photo;
				this.username =user.nick;
				this.email = user.email;
				this.phone=user.username.substring(0,3)+"****"+user.username.substring(8,11);
			},
			adds:function(res){
				var _this=this;
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].isdefault==true){
						_this.address=res.data[i].address;
					}
					
				}
			}
		},
		mounted:function(){
			var this_1=this;
			$('#file_header').on('change','input',function(){
				var file_1=$(this)[0].files[0];
				var type = file_1.type;
				console.log(file_1)
				var reader = new FileReader();  
			        reader.readAsDataURL(this.files[0]);  
			        reader.onload = function(e){  
						console.log(e.target.result)
						$('#box3 .cropper').html('<img src="'+e.target.result+'"/>');
						this_1.cropper_show=true;
						tp();
			        }; 
			})
			function tp(){
				$('#box3 .cropper>img').cropper({
					//设置图片比例
					aspectRatio: 9/10,
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
			};
		},
		created:function(){
				//显示用户信息
				//显示用户信息
				var _this = this;
				var sid = localStorage.getItem('ids');
			 	var datas={uId:sid};
				ajaxs("post",liupeilin_ip+"/platform/cmembers/showUserInfo",datas,_this.users);
				ajaxs("post",liupeilin_ip+"/platform/sysShippingAddress/addressList",datas,_this.adds);

		}
	}
</script>
<style>
	.none{display: none;}
	#box3{background-color:#e6e6e6;}
	#box3 header{
		/*background-color:#00a2eb;*/
		width:100%;height:0.84rem;
		color:#FFFFFF;
		text-align: center;line-height:0.84rem;margin:0 auto;}
	#box3 header span{float: left;margin-left:0.4rem;font-size:0.5rem;}
	#box3 .top,#box3 .bottom{background-color:white;width:100%;}
	#box3 .top p,#box3 .bottom p{width:90%;height:1.04rem;line-height:1.04rem;border-bottom: 1px solid #e6e6e6;margin:0 auto;}
	#box3 .top{margin-top:0.4rem;}
	#box3 .bottom{margin-top:0.4rem;}
	#box3 .bottom p em{float: right;margin-right:0.3rem;color:#7a7a7a;}
	#box3 .bottom p i{float: right;}
	#box3 .top .head{height:1.92rem;line-height:1.92rem;}
	#box3 p i{color:#7a7a7a;float: right;font-size:0.3rem;}
	#box3 p span{color:#222222;float:left;}
	#box3 button{width:90%;height:1rem;background-color:#e13221;text-align: center;border-radius:0.1rem;color:white;
				margin-top:1.5rem;border:1px solid #a1574c;font-size:0.3rem;margin-bottom:0.7rem;margin-left:5%;}
	#box3 .head i{line-height:1.92rem;height:100%;float: right;}	
	#box3 .head img{width:1.34rem;height:1.34rem;display: inline-block; vertical-align: middle}
	#box3 .head em{height:1.92rem;line-height:1.92rem;display: block;float: right;font-size:0.4rem;color:#7a7a7a;}
	#box3 #file_header{display:none;}	
	#box3 .addre{
		text-overflow:-o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		white-space: nowrap;
	}	
	#box3 .cropper_box{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		background: rgba(0,0,0,0.8);
		z-index: 1;
		padding: 70px 0px 0px 0px;
	}
	#box3 .cropper_box .cropper_header{
		background: #FFFFFF;
		text-align: center;
		padding: 5px;
	}
	#box3 .cropper_box .cropper{
		margin:0px 0px 10px 0px;
		text-align: center;
		background: #FFFFFF;
		height: 5rem;
	}
	#box3 .cropper_box .footer_1{
		position: fixed;top: 68%;left:5%;
		width:90%;
	}
	#box3 .cropper_box .footer_1 button{
		width: 100%;
		padding: 0;
		margin: 0;
	}
	#box3 .cropper_box .footer_1>button:nth-child(1)
	{
		background-color:blue;
		height:0.8rem;
	}
	#box3 .cropper_box .footer_1>button:nth-child(2)
	{
		margin-top:3%;
		height:0.8rem;
		background-color:orange;
	}
		#box3 .addre{
		text-overflow:-o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		white-space: nowrap;
		width:50%;
		text-align: right;
	}
	#box3 .gai{font-size:0.4rem;vertical-align: top;}
</style>