<template>
		<div id="cash">
			<table border="1" style="text-align: center;">
				<thead>
					<tr id="tr1">
						<td><i>类型</i></td>
						<td><i>金额</i></td>
						<td><i class="i_none">时间</i></td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in data">
						<td id="td_fi"><i>{{item.remark}}</i></td>
						<td><i>{{item.amount}}元</i></td>
						<td id="td_end">{{item.createtime}}</td>
					</tr>
					<tr>
						<td id="td_fi"><i>test</i></td>
						<td><i>100元</i></td>
						<td id="td_end">111</td>
					</tr>
					<tr>
						<td id="td_fi"><i>test</i></td>
						<td><i>100元</i></td>
						<td id="td_end">111</td>
					</tr>
				</tbody>
			</table>

			<div class="mui-text-center nocontent" v-if="!totalRow">
				<img src="/static/img/1524726123.31800ab.jpg"> 
					<div>还没有相关消息</div>
			</div>
		</div>
</template>
<script>
	//import Vue from 'vue'
	import axios from 'axios'
	//import vueAxios from 'vue-axios'
	//import jsonp from "jsonp"
	//Vue.use(vueAxios,axios)
//	import {get,_this}  from  "../../../static/js/http.js"
	//import bootcss from "../../../static/bootstrap/css/bootstrap.min.css"
	//import bootjs from "../../../static/bootstrap/js/bootstrap.min.js"
	import $ from "jquery"
	 import MoPaging from './paging'
	export default{
		components:{
			 MoPaging 
		},
		props:['datatypes'],
		data:function(){
			return{
				list:"",
				data:"",
				totalRow:"",
				pageNumber:"1",	
				props:['datatypes'],
				pageSize : '30' , //每页显示20条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : [],
                totalRow:"",
				totalPage:"",
				sid:localStorage.getItem("ids"),				
			}
		},
		mounted:function(){
			var t = $("#tr1").offset().top
			$(window).scroll(function(){
				var wt=$(window).scrollTop()
				if(wt>t){
					$('#cash thead #tr1').addClass('positive')
				}else{
					$('#cash thead #tr1').removeClass('positive')
				}		
			})
			 //请求第一页数据
            this.getList()
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
			 //从page组件传递过来的当前page
            pageChange:function(page){
                this.currentPage = page
                this.getList()
                this.get()
            },
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
            	this.axios.get(liupeilin_ip+'/mall/mobile/capitaldetail/getCapitaldetail?capitalId='+this.sid+'&pageNumber=1&pageSize=10').then((res)=>{
					this.data=res.data.data.list;
					this.totalRow = res.data.data.totalRow;				
                    this.count = res.data.data.totalRow
          			this.totalPage =res.data.data.totalPage
                    
				},response => {
			       console.log("error");
			  });
            }
		},
		mounted:function(){
			this.get();		
		}
		
	}
	
</script>
<style>
	#cash {margin-bottom:1.5rem;}
	#cash .active{border-bottom:0.08rem solid #00a3eb;}
	#cash table{width:100%;background-color:#CCCCCC;}
	#cash table{border:none;background-color:#FFFFFF;}
	#cash table tr{border:none;color:#7b7a82;height:0.8rem;}
	#cash table td{border:none;overflow: hidden;}
	#cash table td>i{border:none;border-right:1px solid #CCCCCC;display: block;}
	/*#cash table #tr1 td:nth-child(5){border-right:none;padding: 0.1rem 0.6rem;}*/
	#cash table #td_fi{border-left: none;}
	#cash table #td_end{border-right: none;color:#00e900;}
	#cash table #tr1{color:white;border-top:none;background-color:#19b3f1;}
	#cash .positive{position: fixed;left:0%;top:2%;width:100%;z-index:20;}
	#cash table .positive td{float: left;width: calc(100% /3);}
	#cash table .positive td i{padding:12px calc(100% / 3);}
	#cash table .positive .i_none{border-right:none;}	
	#cash tbody tr{border-top: 5px solid #efeff4;}
	#cash thead{font-size:0.25rem;}
	#cash tbody {font-size:0.2rem;}
	#cash table tbody tr td{width: calc(100% / 3);}	
	#cash #id{margin: 0 auto;font-size:0.2rem;color:#CCCCCC;}


</style>