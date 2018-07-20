
import Vue from 'vue'
import Router from 'vue-router'

//help 帮助中心，可在首页的问好出点击

import Home from '@/components/home/home';		//首页
import myfoot from '@/components/tabbar';		//底部
const myerro=()=>import('@/components/erro');
const shops = resolve => {
	$('#load').show();require.ensure([],()=>{
    	resolve(require('@/components/shops'))
		$('#load').fadeOut(2000)
  	})
}
const shopsList=()=>import('@/components/shopsList');	//商铺二级页面
const Shopping = resolve => {							//商城
	$('#load').show();require.ensure([],()=>{
    	resolve(require('@/components/Shopping'))
		$('#load').fadeOut(2000)
  	})
}
const ShopDetails=()=>import('@/components/ShopDetails');	//商家详情页
const commodity=()=>import('@/components/commodity');	//商品详情
const applyforashop=()=>import('@/components/applyforashop')	//申请开店
//import applyforashop from '@/components/applyforashop';
const PartnerApplication=()=>import('@/components/PartnerApplication');	//申请成为合伙人 创业
const Scan=()=>import('@/components/Scan');	//扫一扫
const profit=()=>import('@/components/profit');	//分润
const Shopmanagement=()=>import('@/components/Shopmanagement');	//商铺管理
const business=()=>import('@/components/business');	//业务管理
const RecordSettlement=()=>import('@/components/RecordSettlement');	//计算记录
const Subaccount=()=>import('@/components/Subaccount');		//计算记录
const StoreDetails=()=>import('@/components/StoreDetails')	//店铺信息
const shopOrder=()=>import('@/components/shopOrder');	//店铺信息
const BranchShop=()=>import('@/components/BranchShop');	//新建分店
const Assets=()=>import('@/components/Assets');	//资产
const commentList=()=>import('@/components/commentList');	//品论管理
const experience=()=>import('@/components/experience');		//内部体验
const ShopMembers=()=>import('@/components/ShopMembers');	//店铺里面的会员
const Extension=()=>import('@/components/Extension');		//店铺里面的会员
const CommodityControl=()=>import('@/components/CommodityControl');	//店铺里面的商品管理
const map=()=>import('@/components/map');	//地图
const RedEnvelopes=()=>import('@/components/RedEnvelopes')	//红包
const Orders=()=>import('@/components/Orders')	//订单
const Elated=()=>import('@/components/Elated')		//收藏夹
const orderComment=()=>import('@/components/orderComment');	//订单评论
//import webSocket from '@/components/webSocket';		//聊天
const webSocket = () => import('@/components/webSocket');
const Promote=()=>import('@/components/Promote')	//推广图片
const ShopEvaluation=()=>import('@/components/ShopEvaluation');	//对店铺进行评论
const Invoice=()=>import('@/components/Invoice');	//手工做单
const help=()=>import('@/components/help');	//帮助中心
const InvoiceList=()=>import('@/components/InvoiceList');	//手工单记录
const FranchiseFee=()=>import('@/components/FranchiseFee');	//加盟费缴纳说明


//const follows=()=>import('@/components/follows');	//关注
//const webSocket = resolve => require(['@/components/webSocket'], resolve);

/*
 * home.vue 收钱 和 扫一扫
 * 
 * */

//下面是刘鹏写的
const Book = () => import('@/components/book/book');
const Broadcast = () => import('@/components/broadcast/broadcast');
const Personal = resolve => {							
	$('#load').show();
	require.ensure([],()=>{
    	resolve(require('../components/personal/personal'))
		$('#load').fadeOut(2000)
	})
}
const Group = resolve => {							
	$('#load').show();
	require.ensure([],()=>{
    	resolve(require('../components/group/group'))
		$('#load').fadeOut(2000)
	})
}
const cash = () => import('../components/money/cash');
const save = () => import('../components/money/save');
const hb = () => import('../components/money/hb');
const make = () => import('../components/money/make');
const money = () => import('@/components/money/index');
const bill = () => import('../components/bill');
const manage = () => import('../components/group/manage');
const collect = () => import('../components/collect-money');
const recriving = () => import('../components/money_recriving');	//向商家付款
const photo = () => import('../components/photo');	//个人中心更换头像
const userName = () => import('../components/userName');	//修改昵称名
const password = () => import('../components/password');	//修改登录密码
const addres = () => import('../components/addres');	//修改收货地址
const email = () => import('../components/email');	//修改邮箱
const payment = () => import('../components/payment');	//支付密码页面
const forget = () => import('../components/forget');	//忘记支付密码页面
const sao = () => import('../components/sao');	//首页收钱界面
const tixian = () => import('@/components/tixian');	//红包提现
const remaining = () => import('@/components/remaining');	//余额提现
const terrace = () =>	import('@/components/terrace/index');	//平台通知页面
const wuliu = () => import('@/components/terrace/wuliu');	//平台通知页面
const tongzhi = () => import('@/components/terrace/tongzhi');	//平台通知页面
const xiaoxi = () => import('@/components/terrace/xiaoxi');	//平台通知页面
const record = () => import('@/components/record');	//平台通知页面
const add = () => import('@/components/add');	//平台通知页面
const login = () => import('@/components/login');	//用户登录
const register = () => import('@/components/register');	//用户登录
const forgetpassword = () => import('@/components/forgetpassword');	//用户忘记登录密码页
const site = () => import('@/components/site');	//显示收货地址
const edit = () => import('@/components/edit');	//修改收货地址
const order = () => import('@/components/order');	//我的订单
const logistics = () => import('@/components/logistics');	//物流详情
const shoppingcart = () => import('@/components/shopping_cart');	//平台通知

Vue.use(Router)

export default new Router({
	//这里是去除#,但是去除#号后打爆就出错了。。目前没找到办法
//	mode:"history",
routes: [
  	//分享
//	{
//		path:'/follow',
//		name:'follow',
//		component:follow
//	},

	{path:'/InvoiceList',name:'',component:InvoiceList},	//手工单记录
	{path:'/Invoice',name:'',component:Invoice},	//手工做单
	{path:'/help',name:'',component:help},	//帮助中心
	
  	//对店铺进行评论
  	{
  		path:'/ShopEvaluation',
  		name:'',
  		component:ShopEvaluation
  	},
  	//推广图片
  	{
  		path:'/Promote',
  		name:'',
  		component:Promote
  	},
  	{
  		path:'/webSocket',
  		name:'',
  		component:webSocket
  	},
  	//订单评论
	{
		path:'/orderComment',
		name:'',
		component:orderComment
	},
  	//平台通知
  	{
  		path:'/shoppingcart',
  		name:'',
  		component:shoppingcart
  	},
  	//订单确认
  	{
  		path:'/Orders',
  		name:'',
  		component:Orders
  	},
    {
      path: '/',
      redirect:"/Home"
      //每次打开项目就在首页位置，而不会出现在404页面
    },
    {
      path: '/Home',
      name: '',
      //default为默认的视图
    	components:{
      		default: Home,
      		tabbar:myfoot
		},
    },
    {
      path: '/shops',		//商铺
      name: '',
      components:{
      	default:shops,
      	tabbar:myfoot
		},
      	children:[
      	]
    },
    {
    	path:'/shopsList',		//商铺二级页面
    	name: '',
    	component:shopsList
    },
    {
    	path:'/Shopping',	//商城
    	name: '',
    	components:{
      		default: Shopping,
      		tabbar:myfoot
		}
    },
    //店铺详情
     {
    	path:'/ShopDetails',
    	name: '',
    	components:{
      		default: ShopDetails,
      		tabbar:myfoot
		}
    },
    //商品详情
    {
    	path:'/commodity',
    	name:'commodity',
    	component:commodity,
   	},
    
    //申请开店
    {
    	path:'/applyforashop',
    	name: '',
    	component:applyforashop
    },
    //合伙人申请
    {
    	path:'/PartnerApplication',
    	name: '',
    	component:PartnerApplication
    },
    //扫一扫
    {
    	path:'/Scan',
    	name:'',
    	component:Scan
    },
    //分润中心
    {
    	path:'/profit',
    	name:'',
    	component:profit
    },
    //商铺管理  
    {
    	path:'/Shopmanagement',
    	name:'',
    	component:Shopmanagement
    },
    //业务管理
    {
    	path:'/business',
    	name:'',
    	component:business
    },
    //
    {
    	path:'/RecordSettlement',
    	name:'',
    	component:RecordSettlement
    },
    //子账号管理
    {
    	path:'/Subaccount',
    	name:'',
    	component:Subaccount
    },
    //店铺信息
    {
    	path:'/StoreDetails',
    	name:'',
    	component:StoreDetails
    },
    //订单管理
    {
    	path:'/shopOrder',
    	name:'',
    	component:shopOrder
    },
    //新建分店
    {
    	path:'/BranchShop',
    	name:'',
    	component:BranchShop
    },
    //资产
    {
    	path:'/Assets',
    	name:'',
    	component:Assets
    },
    {
    	path:'/commentList',
    	name:'',
    	component:commentList
    },
    {
    	path:'/experience',
    	name:'',
    	component:experience
    },
    //店铺里面的会员
    {
    	path:'/ShopMembers',
    	name:'',
    	component:ShopMembers
    },
    //推广
    {
    	path:'/Extension',
    	name:'',
    	component:Extension
    },
    //商品里面的商品管理
    {
    	path:'/CommodityControl',
    	name:'',
    	component:CommodityControl
    },
    {
    	path:'/map',
    	name:'map',
    	component:map
    },
    {
    	path:'/RedEnvelopes',
    	name:'',
    	component:RedEnvelopes
    },
    //收藏夹
    {
    	path:'/Elated',
    	name:'',
    	component:Elated
    },
    
    //错误页面
    {
    	path:'*',
    	name:'myerro',
    	component:myerro
    },
    {
      	path: '/book',
      	name: '',
      	components:{
      		default:Book,
      		tabbar:myfoot
		}
    },
    {
    	path:'/Broadcast',
    	name: '',
    	components:{
      		default: Broadcast,
      		tabbar:myfoot
		}
    },
    {
    	path:'/Personal',
    	name: '',
      	components:{
      		default:Personal,
      		tabbar:myfoot
		}
    },
    {
    	path:'/group',
    	name: '',
      	components:{
      		default:Group,
      		tabbar:myfoot
		}
    },
    {
    	path:'/money',
    	name: '',
    	component:money
//		children:[
//			{path:'cash',component:cash},
//			{path:'hb',component:hb},
//			{path:'make',component:make},
//			{path:'save',component:save}
//		]
    },
    {
    	path:'/money/:type',
    	name: '',
    	component:money
//  	components:{
//    		default: money,
//    		tabbar:myfoot
//		},
//		children:[
//			{path:'cash',component:cash},
//			{path:'hb',component:hb},
//			{path:'make',component:make},
//			{path:'save',component:save}
//		]
    },
    {
    	path:'/bill',
    	name:'bill',
    	component:bill
    },
    {
    	path:'/manage',
    	name:'manage',
    	component:manage
    },
    {
    	path:'/collect',
    	name:'collect',
    	component:collect
    },
    {
    	path:'/recriving',
    	name:'',
    	component:recriving
    },
    {
    	path:'/photo',
    	name:'photo',
    	component:photo
    },
    {
    	path:'/userName',
    	name:'userName',
    	component:userName
    },
    {
    	path:'/password',
    	name:'password',
    	component:password
    },
    {
    	path:'/addres',
    	name:'addres',
    	component:addres
    },
    {
    	path:'/email',
    	name:'email',
    	component:email
    },
    {
    	path:'/payment',
    	name:'payment',
    	component:payment
    },
    {
    	path:'/forget',
    	name:'forget',
    	component:forget
    },
    {
    	path:'/sao',
    	name:'sao',
    	component:sao
    },
    {
    	path:'/tixian', //红包提现
    	name:'tixian',
    	component:tixian
    },
    {
    	path:'/remaining', //余额提现
    	name:'remaining',
    	component:remaining
    },
    {
    	path:'/terrace', //余额提现
    	name:'terrace',
    	component:terrace,
    	children:[			
			{path:'wuliu',component:wuliu},
			{path:'tongzhi',component:tongzhi},
		]
    },
    {
    	path:'/xiaoxi', 
    	name:'xiaoxi',
    	component:xiaoxi
    },
    {
    	path:'/record', 
    	name:'record',
    	component:record
    },
    {
    	path:'/add', 
    	name:'add',
    	component:add
    },
    {
    	path:'/login', 
    	name:'login',
    	component:login
    },
    {
    	path:'/register', 
    	name:'register',
    	component:register
    },
    {
    	path:'/forgetpassword', 
    	name:'forgetpassword',
    	component:forgetpassword
    },
    {
    	path:'/site', 
    	name:'site',
    	component:site
    },
    {path:'/edit', name:'edit',component:edit},
    {path:'/edit/:id', name:'edit',component:edit},
    {
    	path:'/order/:id', 
    	name:'order',
    	component:order
    },
    {
    	path:'/order', 
    	name:'order',
    	component:order
    },
    {
    	path:'/logistics', 
    	name:'logistics',
    	component:logistics
    }
    
  ]
})

