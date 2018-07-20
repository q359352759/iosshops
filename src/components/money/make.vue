<template>
	<div>
		<div id="make">
			<table border="1" style="margin:0.5rem auto;text-align: center;border-top: none;border-left:none;border-right:none;">
				<thead>
					<tr id="tr1">
						<td><i>分润号</i></td>
						<td><i>分润金额</i></td>
						<td><i class="i_none">时间</i></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in data">
						<td id="td_fi"><i>{{item.dividendnum}}</i></td>
						<td><i>{{item.amountmoney}}元</i></td>
						<td id="td_end">{{item.createtime}}</td>
					</tr>			
				</tbody>
			</table>


			<div class="mui-text-center nocontent" v-if="!totalRow">
				<img src="/static/img/1524726123.31800ab.jpg"> 
					<div>还没有相关消息</div>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from "jquery"
	export default{
		props:['datatypes'],
		components:{},
		data:function(){
			return{
				list:"",
				data:"",
				props:['datatypes'],
				pageNumber:"1",			
				pageSize : '20' , //每页显示20条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : [],
                sid:localStorage.getItem("ids")
			}
		},
		mounted:function(){
			var t = $("#tr1").offset().top
			$(window).scroll(function(){
				var wt=$(window).scrollTop()
				if(wt>t){
					$('#make thead #tr1').addClass('positive')
				}else{
					$('#make thead #tr1').removeClass('positive')
				}
				
			})
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
            	this.axios.get(liupeilin_ip+'/mall/mobile/memberdividend/getMemberdividend?memberId='+this.sid+'&&pageNumber=1&&pageSize=10').then((res)=>{
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
	#make {margin-bottom:1.5rem;}
	#make .active{border-bottom:0.08rem solid #00a3eb;}
	#make table{width:100%;background-color:#CCCCCC;}
	#make table{border:none;background-color:#FFFFFF;}
	#make table tr{border:none;color:#7b7a82;height:0.8rem;}
	#make table td{border:none;overflow: hidden;}
	#make table td>i{border:none;border-right:1px solid #CCCCCC;display: block;}
	#make table #td_fi{border-left: none;}
	#make table #td_end{border-right: none;color:#00e900;}
	#make table #tr1{color:white;border-top:none;background-color:#19b3f1;}
	#make .positive{position: fixed;left:0%;top:2%;width:100%;z-index:20;}
	#make table .positive td{float: left;width: calc(100% /3);}
	#make table .positive td i{padding:12px calc(100% / 3);white-space: nowrap;}
	#make table .positive .i_none{border-right:none;}	
	#make tbody tr{border-top: 5px solid #efeff4;}
	#make thead{font-size:0.25rem;}
	#make tbody {font-size:0.2rem;}
	#make table tbody tr td{width: calc(100% / 3);}
</style>