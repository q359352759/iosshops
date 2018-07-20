<template>
	<div id="Scan">
		<div id="Scan_box">
			<div></div>
			<p class="tip">...载入中...</p>
		</div>
		
		<!--<div @click="saoyisao()">扫一扫</div>-->
		<div class="Torch" >
			<i @click="change_Torch()" :class="{'active':Torch}" class="icon iconfont icon-shoudiantong"></i>
		</div>
		<footer>
			<div class="fbt" @click="back()">取　 消</div>
			<div class="fbt" @click="scanPicture()">从相册选择二维码</div>
		</footer>
	</div>
</template>

<script>
	export default{
		components:{
		},
		data(){
			return{
				Torch:false,	//手电筒
				scan:null,		//创建扫描对象
				shangyiye:'home',	//
			}
		},
		methods:{
//			saoyisao(){
//				
//			}
			//改变手电筒状态
			change_Torch(){
				if(this.scan){
					this.Torch=!this.Torch
					this.scan.setFlash(this.Torch);		//开关灯
				}
			},
			//扫描成功事件
			onmarked(type, result, file){
				result = result.replace(/\n/g, '');		//
//				console.log(type + '___' + result + '__' + file);
				//店铺推广
				//0___http://m.hzjifen.com/shops/dist/index.html#/bill?type=2&amp;Inviterid=96fe358b7c8e4bdaa50c1ce28740a835__undefined
				//其他平台的
				//QR_CODE___"http://www.shoujiqianbao.vip/wap/pos/index/pid/800/mid/161812/qrid/483630.html"__/storage/emulated/0/tencent/MicroMsg/WeiXin/mmexport1530272538170.jpg
				//店铺详情页和店铺推广一致
				// 0___http://m.hzjifen.com/shops/dist/index.html#/bill?type=2&amp;Inviterid=a681646bd8be4213a0579d663efa841c__undefined
				//城市合伙人
				// 0___http://m.hzjifen.com/shops/dist/index.html#/RedEnvelopes?type=0&amp;Inviterid=cd653645a7b54e418e4efea7ebec229b__undefined
				
				if(result.indexOf("//m.hzjifen.com/shops/dist/")!=-1){
					this.scan.close();
					var url_1=result.substring(result.indexOf('#')+1);
					this.$router.push(url_1+'&url='+this.shangyiye);
				}else{
					mui.alert('请选择此平台的二维码！');
				}
			},
			//从相册中选择
			scanPicture(){
				var this_1=this;
				plus.gallery.pick(function(path) {
					plus.barcode.scan(path, this_1.onmarked, function(error) {
						plus.nativeUI.alert('无法识别此图片');
					});
				}, function(err) {
					console.log('Failed: ' + err.message);
				});
			},
			back(){
				if(this.scan){
					this.scan.close();
				}
				window.history.back();
			}
		},
		mounted:function(){
			var this_1=this;
			this.shangyiye=this.$route.query.url ? this.$route.query.url : 'home';	//上一页地址
			
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
			function plusReady(){
				console.log('开始创建扫描')
				setTimeout(function(){
					this_1.scan = new plus.barcode.Barcode('Scan_box');
					//		setTimeout(function(){
					//			scan.setFlash(true);	//开灯
					//		},1000)
					this_1.scan.onmarked = this_1.onmarked; //识别成功事件
					this_1.scan.start();	//开始扫描
				},100)
			}
		},
		created:function(){
			
		}
	}
</script>
<style>
	#Scan{
		background: #000000;
		height: 100%;
	}
	
	#Scan #Scan_box{
		height: 100%;
	}
	#Scan #Scan_box>div{
		height: 50%;
	}
	#Scan .tip{
		text-align: center;
		color: #FFFFFF;
	}
	
	#Scan .Torch{
		position: absolute;
		bottom: 50px;
		left: 0px;
		width: 100%;
		text-align: center;
	}
	#Scan .Torch i{
		color: #888888;
		font-size: 0.6rem;
	}
	#Scan .Torch i.active{
		color: #FFFFFF;
	}
	
	#Scan footer {
		width: 100%;
		height: 44px;
		position: absolute;
		bottom: 0px;
		line-height: 44px;
		text-align: center;
		color: #FFF;
	}
	#Scan .fbt {
		width: 50%;
		height: 100%;
		background-color: #FFCC33;
		float: left;
	}
	#Scan .fbt:active {
	  	-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
	}
</style>