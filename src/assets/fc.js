//接口
//	application/xhtml+xml ：XHTML格式
// 	application/xml     ： XML数据格式
// 	application/atom+xml  ：Atom XML聚合格式    
// 	application/json    ： JSON数据格式
// 	application/pdf       ：pdf格式  
// 	application/msword  ： Word文档格式
// 	application/octet-stream ： 二进制流数据（如常见的文件下载）
// 	application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

//function http(x,get_type,url,data,resf,errf){
//	x.$http({
//		method: get_type,
//		url: 'http://192.168.2.143:8080/zlwymaster'+url,
//		data:data,
////		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//	}).then(function(res){
////		console.log(res.data.name)
//		resf(res.data)
////		resf=res.data.name
//	}).catch(function(err){
//	//如果没有就直接打印吧
//		if(errf){
//			errf(err)
//		}else{
//			console.log('错误信息',err);	
//		}
////		errf('错误信息',err)
//	});
//}

function http(get_type,url,data,resf,onprogress){
	$.ajax({
//      url:'http://192.168.2.146:8080/zlwymaster'+url,
//      url:'http://192.168.2.202:8080/zlwymaster'+url,
        url:'http://122.114.227.26:8899/zlwymaster'+url,
//      url:'https://www.hzjifen.com/zlwymaster'+url,
        type: get_type,
        data:data,
//      timeout:10000,
//      processData: false,
//		//必须false才会自动加上正确的Content-Type
//		contentType: false,
		xhr: function() {
			var xhr = $.ajaxSettings.xhr();
			if(xhr.upload){
				if(onprogress){
					xhr.upload.addEventListener("progress", onprogress, false);
				}
				return xhr;
			}
//			if(onprogress && xhr.upload){
//				xhr.upload.addEventListener("progress", onprogress, false);
//				return xhr;
//			}
		},
        success: function (res) {
            resf(res);
        },
        error: function (e){
        	console.log(e);
//      	alert(JSON.stringify(e))
        }
    })
}

//function onprogress(evt) {
//	var loaded = evt.loaded;     //已经上传大小情况 
//	var tot = evt.total;      	//附件总大小 
//	var per = Math.floor(100 * loaded/tot);  //已经上传的百分比 
//	console.log(per)
//}




//图片base64 拼接
function base64_splicing(x){
	if(x=='' || x==null){
		return x;
	}else{
		var type=x.substring(x.indexOf('/')+1,x.indexOf(';'));		//获取文件类型
	//	var pos = base64.indexOf("4") + 2;
		var base64 = x.substring(x.indexOf("4")+1);
		return type+base64;
	}
}

//时间格式化	yyyy.MM.dd hh:mm
function dateFtt(date,fmt) { //author: meizz   
	var date=new Date(date);
	var o = {   
	    "M+" : date.getMonth()+1,                 //月份   
	    "d+" : date.getDate(),                    //日   
	    "h+" : date.getHours(),                   //小时   
	    "m+" : date.getMinutes(),                 //分   
	    "s+" : date.getSeconds(),                 //秒   
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	    "S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
}



//地址前端

function ajaxs(type,url,data,resf){
		$.ajax({
			type:type,
			url:url,
			async:true,
			data:data,
				success:function(res){
					resf(res);
				},
				error:function(res){
					console.log(res);
					console.log("失败");
						
				}
	});
}

//是否是微信
function isweixn(){
	var ua = navigator.userAgent.toLowerCase();
    	if (ua.match(/MicroMessenger/i) == "micromessenger") {
	        return true;
	    } else {
	        return false;
	    }
}

//获取url get参数 主要用于 index.html?a=100#/home这种
function GetRequest() {   
   	var url = location.search; //获取url中"?"符后的字串   
   	var theRequest = new Object();   
   	if (url.indexOf("?") != -1) {
      	var str = url.substr(1);   
      	var strs = str.split("&");   
      	for(var i = 0; i < strs.length; i ++) {   
         	theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      	}   
   }
   return theRequest;   
}

export{
	http,
	base64_splicing,
	dateFtt,
	ajaxs,
	isweixn,
	GetRequest
}

//this.$route.query;
//this.$router.push('/login');

//localStorage.weixin_user		微信用户的基本信息
//localStorage.openid		微信用户的openid

//sessionStorage.href	保存点击的底部



