<template>
	<div>
		<div id="hb">
			<div class="boom">
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
	</div>
</template>

<script>
	export default{
		props:['datatypes'],
		components:{},
		data:function(){
			return{
				list:"",
				data:"",
				props:['datatypes'],
				totalRow:"",
				pageNumber:"1",			
				pageSize : '30' , //每页显示20条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : [],
                totalRow:"",
				totalPage:"",
				sid:localStorage.getItem("ids")
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
            	this.axios.get(liupeilin_ip+'/mall/mobile/memberredpacketrecord/getMemberredpacketrecordByMemberId?memberId='+this.sid+'&&pageNumber=1&&pageSize=7').then((res)=>{
            		console.log(res,111)
					this.data=res.data.data.list;
					this.totalRow = res.data.data.totalRow;				
                    this.count = res.data.data.totalRow
          			this.totalPage =res.data.data.totalPage
				},response => {
			       console.log("error");
			 });
			}
		},
		created:function(){	
			this.get()
		}
	}
</script>

<style>
	#hb{background-color:#d8d9d9;padding:0.28rem 0 1.7rem 0;}
	#hb .boom{font-size:0.18rem;width:100%;}
	#hb .boom .boom-t{width:100%;margin-bottom:0.2rem;}
	#hb .boom .boom-t,.boom .boom-b{height:1.5rem;background-color:#fafafa;padding-left:5%;}
	#hb .boom-b{margin-top:0.16rem;}
	#hb .boom-t-r,.boom .boom-b-r,.boom-b-l,.boom-t-l{float: left;margin-top:0.2rem;width:50%;}
	#hb .boom i{display:block;margin-bottom: 0.16rem;color:#000;}
	#hb .boom span{font-size:0.01rem;margin-top:0.22rem;color:#000;}
	#hb .boom .re{background-color:red;}
</style>