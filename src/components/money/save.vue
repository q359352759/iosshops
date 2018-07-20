<template>
	
		<div id="save" >
			<div class="boom" >
				<div class="boom-t" v-for="(item,index) in data">
					<div class="boom-t-l">
						<i>&nbsp;&nbsp;{{item.shopname}}</i>
						<span>&nbsp;&nbsp;消费：&nbsp;{{item.saleprice}}元</span>
					</div>
					<div class="boom-t-r">
						<i>&nbsp;&nbsp;{{item.createdate}}</i>
						<span>&nbsp;&nbsp;省钱:{{item.integration}}元</span>
					</div>
				</div>

			</div>

			<div class="mui-text-center nocontent" v-if="!totalRow">
				<img src="/static/img/1524726123.31800ab.jpg"> 
					<div>还没有相关消息</div>
			</div>

		</div>
	
</template>

<script>
	import $ from "jquery"
	export default{
		components:{},
		props:['datatypes'],
		data:function(){
			return{
				list:"",
				data:[],
				totalRow:"",
				pageNumber:"1",			
				pageSize : '30' , //每页显示20条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : [],
                totalRow:"",
				totalPage:"",
				sid:localStorage.getItem("ids"),
				datatype: this.datatypes //把props的值赋给isDialogVisible
			}
		},
		watch:{
			datatypes(x){
				var _this=this;
				//this.data = x.list;
				//this.data =$.extend(true,this.data,x.list);
				this.data=this.data.concat(x.list)
			}
       },
		methods:{
			footer:function(){
           		this.currentPage = this.totalPage;
           		this.get()
            },
            header:function(){
            	this.currentPage = 1;
            	
            	this.get()
            },
            last:function(){
            	if(this.currentPage < this.totalPage){
            		this.currentPage++   		
            	}else{
            		this.currentPage = this.totalPage
            	}     	
            	this.get()
            },
            page:function(){
            	if(this.currentPage > 1){
            		this.currentPage--
            	}else{
            		this.currentPage = 1
            	}
         
            	this.get()
            },
            get:function(){
            	this.axios.get(liupeilin_ip+'/mall/mobile/manualOrder/getManualOrderByMemberId?memberId='+this.sid+'&&pageNumber=1&&pageSize=6').then((res)=>{
					this.data=res.data.data.list;
					console.log(this.data,'初始值')
					this.totalRow = res.data.data.totalRow;				
                    this.count = res.data.data.totalRow
          			this.totalPage =res.data.data.totalPage
				},response => {
			       console.log("error");
			 });
            }
		},
		created:function(){	
			this.get();
			console.log(this.isDialogVisible,"porops的值")
		}
	}
</script>

<style>
	#save{background-color:#d8d9d9;padding:0.28rem 0 1.7rem 0;height:100%}
	#save .boom{font-size:0.18rem;width:100%;margin-bottom:1.5rem;}
	#save .boom .boom-t{width:100%;margin-bottom:0.2rem;}
	#save .boom .boom-t,.boom .boom-b{height:1.5rem;background-color:#fafafa;padding-left:5%;}
	#save .boom-b{margin-top:0.16rem;}
	#save .boom-t-r,.boom .boom-b-r,.boom-b-l,.boom-t-l{float: left;margin-top:0.2rem;width:50%;}
	#save .boom i{display:block;margin-bottom: 0.16rem;color:#000;}
	#save .boom span{font-size:0.01rem;margin-top:0.22rem;color:#000;}
	#save .boom .re{background-color:red;}
	#save .mui-pager{margin-bottom:50px;}
	#save #text{margin-bottom:1.5rem;}
</style>