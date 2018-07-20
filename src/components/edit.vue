<template>

		<div id="edit">
			<header id="header" class="mui-bar mui-bar-nav">		
				<h1 class="mui-title">修改地址</h1>
				<button class="mui-action-back mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left">
					<span class="mui-icon mui-icon-left-nav"></span>
				</button>
				<button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="del">删除</button>
			</header>
			<div class="content">
				<div class="name">
					<label for="name">姓名 </label>
					<input id="name" type="text" v-model="name"  placeholder="请输入姓名" name="name" :class="{active:nowindex==1}" @click="nowindex=1" autofocus="autofocus" required="required"/>
				</div>
				<div class="number">
					<label for="phone">电话 </label>
					<input id="phone" type="number" v-model="phone" placeholder="请输入电话号码" name="phone" :class="{active:nowindex==2}" @click="nowindex=2" required="required" />
				</div>
				<div class="diqu clear">
					<a @click="map">点击获取地址</a>
					<label for="region" @click="map">地区 </label>
					<textarea id="region" v-model="address" name="region" required="required " placeholder="省份 城市 县区"></textarea>
				</div>
				<div class="address">
					<label for="addres">地址 </label>
					<input id="addres" v-model="detailed" type="text" placeholder="请输入详细地址" name="addres" :class="{active:nowindex==4}" @click="nowindex=4" required="required " />
				</div>
				<button @click="edit">保存</button>
			</div>	
		</div>

</template>
<script>
	import $ from "jquery"
	export default{
		components:{
		},
		data:function(){
				return{
					nowindex:1,
					name:"",
					phone:"",
					address:'',
					detailed:"",
					sid:"",
					description:"",
					id:"",
					data:[]
				}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},		   
			map:function(){		
				let _this = this
				let mapObj = new AMap.Map('iCenter') //iCenter是id容器名称
				mapObj.plugin('AMap.Geolocation', function() {})
				let geolocation = new AMap.Geolocation({
		        		timeout: 10000,
		        		GeoLocationFirst: false,
		        		maximumAge: 0 //定位结果缓存0毫秒，默认：0
			    	});
			    mapObj.addControl(geolocation)
			    geolocation.getCurrentPosition()
			    AMap.event.addListener(geolocation, 'complete', function(data) {
        			data.position.getLng() //定位成功返回的经度
        			data.position.getLat() //定位成功返回的纬度
        			_this.address = data.formattedAddress
        			console.log(data.addressComponent.city)
        			console.log(_this.address)
			    }); //返回定位信息
			    AMap.event.addListener(geolocation, 'error', function(data) {
			        if (data.info == 'FAILED') {
			            alert('获取您当前位置失败！')
			        }
			    });
			    let addres = _this.address;
				$("#region").val(addres);    
			},
			edit:function(){
				var name=this.name;
				var tel=this.phone;
				var address=this.address;
				var detailed=this.detailed;
				var city =address+detailed;
				var sid = this.sid;
				var _this = this; 
				var reg=11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
				if(!name){
					mui.alert('请输入姓名')
					return
				}
				if(!phone){
					mui.alert('请输入电话')
					return
				}
				if(!address){
					mui.alert('请输入地址')
					return
				}
				if(!detailed){
					mui.alert('请输入详细地址')
					return
				}
				if(!reg.test(tel)){
				     	mui.alert("您输入的手机号码不合法，请重新输入");
						return;
				}
				var id = this.id;
				
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/sysShippingAddress/upd",
					async:true,
					data:{
						addressId:id,
						name:name,
					    tel:tel,
					    city:city
					},
					success:function(res){					
						console.log(res)
//						_this.description=res.description;
//						_this.descriptions("修改成功！","修改失败！");
						
						
					},
					error:function(res){
						console.log(res);
						console.log("失败");
						_this.description=res.description;	
					}
				});
			},
			descriptions:function(sucess,error){
			   		var _this=this;
					if(this.description=sucess){
						setTimeout(function(){
							_this.$router.push('/manage');
						},1000)
						mui.toast(sucess,{ duration:1000,type:'div'})	
						return
					}else{
						mui.toast(error)
						return
					}
					
					
			 },
			 del:function(){
			 	var id = this.id;
			 	var sid = this.sid;
			 	var _this=this;
			 	$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/sysShippingAddress/del",
					async:true,
					data:{
						addressId:id,
						uId:sid
					},
					success:function(res){
						console.log(res)
						_this.description=res.description;
						_this.descriptions("删除成功！","删除失败！");
						//_this.data=res.data;
					},
					error:function(res){
						console.log("失败");
						
					}
				});
			 }
		},
		created:function(){
				var ids = localStorage.getItem("ids");
		 		this.sid=ids;
		 		var id = this.$route.params.id;
		 		console.log(id)
		 		this.id = id;
		 		var _this=this; 	
		 		$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/sysShippingAddress/willUpd?addressId="+id,
					async:true,
					data:{},
					success:function(res){
						console.log(res);					
						_this.name=res.data.shipto;
						_this.phone=res.data.phone;
						_this.address=res.data.address;		
					},
					error:function(res){
						console.log("失败");			
					}
				});	 		
		}		
	}
</script>
<style>
	#edit{
		height: 100%;
		background: #FFFFFF;
	}
	#edit header{background-color:#00a2eb;color:white;;}
	#edit header .mui-icon-left-nav,#site header .mui-title,#edit header .mui-pull-right{color:white;}
	#edit header .mui-title{color:white;}
	#edit .content{width:90%;margin:45px auto;}	
	#edit .diqu{position: relative;}
	#edit .diqu a{position: absolute;right:0.55rem;top:1.3rem;z-index:20;}	
	#edit .diqu textarea{float:left;width:80%;margin-top:0;margin-top:0.2rem;height:1.6rem;}
	#edit .content label{color:#000000;font-size:0.25rem;font-size:0.35rem;}
	#edit  input{border:none;height:0.5rem;border-bottom:1px solid #cccccc;font-size:0.35rem;width:80%;display:inline-block;margin-top:0.4rem;}
	#edit .content button{width:100%;height:1.05rem;background-color:red;border-radius:0.1rem;color:white;text-align: center;font-size:0.3rem;margin-bottom:0;
							letter-spacing:0.05rem;font-size:0.4rem;margin-top:0.4rem;}
	#edit .content p{height:0.65rem;line-height:0.65rem;margin-bottom:0;}
	#edit .content .active{border-bottom:1px solid #ffd161;}
	#edit .content .diqu label{display: inline-block;float: left;margin-right:0.1rem;margin-top:0.2rem;}
</style>