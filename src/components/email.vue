<template>
	<div>
		<div id="email">
			<header>
				<em @click="go"><</em>
				<span>修改邮箱</span>
			</header>
			<div class="content">
				<from>
					<label>邮箱：</label>
					<input type="email" v-model="email" />
					<button type="button" @click="emails">确定</button>
				</from>
			</div>
		</div>
	</div>
</template>
<script>
	import {axios,ajaxs} from '@/assets/fc'
	export default{
		components:{},
		data:function(){
				return{
					email:"",
					sid:""
				}
			},
		methods:{
			go:function(){
				this.$router.go(-1)
			},	
			emails:function(){
				var email=this.email;
				if(!email){
					mui.alert("邮箱不能为空！")
					return;
				}
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(email)){
					mui.alert("请输入有效的邮箱！")
					return;
				}
				var email =this.email;
				var sid=this.sid;
				var _this=this
				$.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/changeEmail",
					async:true,
					data:{
						uId:sid,
						email:email
					},
					success:function(res){
						console.log(res)
						_this.description=res.description;
						_this.descriptions();
					},
					error:function(res){
						console.log("失败");
						
					}
				});
				
				
			},
			updata:function(){
				//显示用户信息
				var _this = this;
				var sid = localStorage.getItem('ids');
			 	var datas={uId:sid};
				ajaxs("post",liupeilin_ip+"/platform/cmembers/showUserInfo",datas,_this.user) 	
			},
			user:function(res){
				var user = res.data;
				var jsonStr = JSON.stringify(user)
				localStorage.setItem("user",jsonStr)
			},
			descriptions:function(){
			   		var _this=this;
					if(this.description=="邮箱更改成功"){
						_this.updata();
						setTimeout(function(){
							_this.$router.push('/manage');
						},1000)
						mui.toast('邮箱更改成功！',{ duration:1000,type:'div'})	
						return
					}else{
						mui.toast('邮箱更改失败！')
						return
					}
			  }
		},
		 created:function(){
		 		var ids = localStorage.getItem("ids");
		 		this.sid=ids;
		 }
	}
</script>

<style>
	#email{background-color:white;height:100%;}
	#email header{height:1rem;background-color:#00a2eb;color:white;line-height:1rem;}
	#email header em{margin-left:0.62rem;font-size:0.5rem;vertical-align: bottom;}
	#email header span{margin-left:0.3rem;font-size:0.35rem;}
	#email .content{padding-top:0.3rem;width:90%;margin:0 auto;}
	#email .content label{margin-top:0.5rem;}
	#email .content span{color:#343434;font-size:0.35rem;margin-bottom:0;}
	#email .content input{border:none;height:0.5rem;border-bottom:1px solid #cccccc;width: 75%;display: inline-block;margin-top:0.5rem;}
	#email .content h5{height:0.5rem;line-height:0.5rem;}
	#email .content button{width:100%;height:1.05rem;background-color:red;border-radius:0.1rem;color:white;text-align: center;font-size:0.3rem;
								margin-top:0.2rem;letter-spacing: 0.05rem;font-size:0.4rem;}
	
</style>