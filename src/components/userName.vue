<template>
	<div>
		<div id="userName">
			<header>
				<em @click="go"><</em>
				<span>修改昵称</span>
			</header>
			<div class="content">			
				<from>
					<label>用户名：</label>
					<input type="text" v-model="name" max="16" min="4"  />
					<h5>以中文或英文字母开头，限2-8个字符</h5>
					<button type="button" @click="username">确定</button>
				</from>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery"
	import {http,base64_splicing,axios,ajaxs} from '@/assets/fc'
	export default{
		components:{},
		data:function(){
				return{
					name:"",
					sid:"",
					usernames:""
					}
		},
		methods:{
			go:function(){
				this.$router.go(-1)
			},	
			beforeCreate: function(){
       			 document.getElementsByTagName("body")[0].className="background";
			},
			username:function(){
				var input = $(".content input");
				var val = $(".content input").val();
				if(!val){
					mui.alert("昵称不能为空")
					return;
				}
				var reg = /^(?!\d)[a-zA-Z0-9\u4e00-\u9fa5]+$/
				if(!reg.test(val)){
							input.val('');
							mui.alert('您输入的昵称格式不正确');
							return;
				}
                if(val.length>=8){
                    $(".content input").val("")
                    mui.alert('昵称格式超出8位');
						return;
                }else if(val.length<=2){
                    	$(".content input").val("")
                    	mui.alert('昵称格式小于2位');
						return;
                }
                
                var sid=this.sid;
                 var name=this.name;
                 var _this=this;
                $.ajax({
					type:"post",
					url:liupeilin_ip+"/platform/cmembers/changeName",
					async:true,
					data:{
						uId:sid,
						name:name
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
				//显示用户信息
				var sid = localStorage.getItem('ids');
			 	var datas={uId:sid};
				ajaxs("post",liupeilin_ip+"/platform/cmembers/showUserInfo",datas,this.user)               
			},
			user:function(res){
				var user = res.data;
				var jsonStr = JSON.stringify(user)
				localStorage.setItem("user",jsonStr)
			},
			descriptions:function(){
			   		var _this=this;
					if(this.description=="昵称更改成功"){
						setTimeout(function(){
							_this.$router.push('/manage');
						},1000)
						mui.toast('昵称更改成功！',{ duration:1000,type:'div'})	
						return
					}else{
						mui.toast('昵称更改失败！')
						return
					}
			  }
		 },
		 beforeDestroy:function(){
		 		
		        document.body.removeAttribute("class","background");
		 },
		 created:function(){
		 		var ids = localStorage.getItem("ids");
		 		this.sid=ids;
		 		console.log(this.sid);
		 		this.usernames = this.$route.params.name;
		 		
		 }
	}
</script>

<style>
	#userName{background-color:white;height:100%;}
	#userName header{height:1rem;background-color:#00a2eb;color:white;line-height:1rem;}
	#userName header em{margin-left:0.62rem;font-size:0.5rem;vertical-align: bottom;}
	#userName header span{margin-left:0.3rem;font-size:0.35rem;}
	#userName .content{padding-top:0.3rem;width:90%;margin:0 auto;}
	#userName .content label{color:#343434;font-size:0.4rem;margin-top:0.4rem;}
	#userName .content input{border:none;border-bottom:1px solid #06c1ae;width:70%;color:#000000;display: inline-block;margin-top:0.4rem;}
	#userName .content h5{height:0.5rem;line-height:0.5rem;text-align: center;margin-top: 0.4rem;}
	#userName .content button{width:100%;height:1.05rem;background-color:red;border-radius:0.1rem;color:white;text-align: center;font-size:0.35rem;
								margin-top:0.8rem;letter-spacing:0.05rem;letter-spacing:0.05rem;font-size:0.4rem;}
</style>