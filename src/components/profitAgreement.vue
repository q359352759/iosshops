<template>
	<ul id="profitAgreement">
		<li class="bold_1">甲方：四川省择力网络科技有限公司</li>
		<li class="bold_1">乙方：{{urerInfo.nick}}&nbsp;&nbsp;{{urerInfo.cellPhone}}</li>
		<li class="indent_1">总则：此协议为利润分配的规则及详细事项说明。在分配规则中有一个默认原则：“我愿意先把自己的消费利润作为他人的增值分红”，每一个参与者都需要遵守默认原则！</li>
		<li class="padding_1m">
			<div>一、乙方的权利与义务</div>
			<div class="padding_1m">1、	乙方注册成为会员后，根据HB账户每10个HB为单位可以实现12.9元的增值收益！</div>
			<div class="padding_1m">2、	HB积分需要通过加盟商家消费后获得，HB积分获赠比例由加盟商家自主设定。</div>
			<div class="padding_1m">3、	会员HB积分的增值需要遵守系统的运行规则！</div>
		</li>
		<li class="padding_1m">
			<div>二、	系统运行规则</div>
			<div class="padding_1m">1、利润分配：是指商家让利给予消费者的利润进行再分配！</div>
			<div class="padding_1m">2、利润再分配的好处：可以实现29%的增值，利润分配均衡！</div>
			<div class="padding_1m">3、分配标准：通过《共享分润系统》进行分配，已获中国国家版权局软件著作权，证书号：2017SR554254。</div>
			<div class="padding_1m">
				<div>4、  分配规则：</div>
				<div class="padding_1m">（1）排号兑换：HB账户累计10个HB积分，系统自动兑换出一个排号（按序排列的编号）。</div>
				<div class="padding_1m">（2）排号发放：排号根据系统的排序逐一发放，兑换的排号多时会有等待时间，具体等待时间是根据他人消费后排号进来的时间。</div>
				<div class="padding_1m">（3）穿插排号：所有人的排号不会重复，不会有连续的排号。同一时间兑换的排号均为穿插排列，间隔号的数值为4-6。</div>
				<div class="padding_1m">（4）循环号：再次分红的一个编号，排号分红后获得，公式为x2+1。兑换出一个排号，系统额外赠送2个循环号。</div>
				<div class="padding_1m">（5）分红原则：你的排号或循环号与系统的分红号相同时分红，每次分红5元钱。</div>
				<div class="padding_1m">（6）增值收益：10个HB积分兑换一个排号，系统额外赠送2个循环号。3个排号各分红5元，提现扣除14%管理费，净收益为12.9元。</div>
			</div>
			<div class="padding_1m">5、  兑换规则：每次最多可兑换100个排号，每天最多可兑换四次，每次兑换间隔时间为30分钟。</div>
			<div class="padding_1m">6、	总量限制：每个账户最大化可拥有2000个有效排号，已分红排号不计算在内。</div>
		</li>
		<li class="padding_1m">
			<div>三、	甲方的权利与义务</div>
			<div class="padding_1m">1、	甲方有义务承担整个系统的正常运行及维护，有义务帮助会员实现HB增值，有义务承担红包金额提现的兑现问题。</div>
			<div class="padding_1m">2、	甲方具有《共享分润系统》的解释权。</div>
		</li>
		<li class="padding_1m">
			<div>四、	违约处理办法</div>
			<div class="padding_1m">1、	会员的红包金额提现超过40天未到账，视为甲方违约。</div>
			<div class="padding_1m">2、	甲方违约乙方可以与甲方协商解决，也有权通过诉讼和仲裁等相关法律程序解决！</div>
		</li>
		<li class="padding_1m">
			<div>五、	协议生效与失效</div>
			<div class="padding_1m">会员注册之日起生效，会员注销账号后失效！</div>
		</li>










	</ul>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		name:'',
		data(){
			return{
				urerInfo:{}		//用户基本信息
			}
		},
		methods:{
			
		},
		mounted(){
			var this_1=this;
			//根据用户Id获取用户信息
			http('post','/platform/cmembers/userInfo',{'uId':localStorage.ids},userInfo_return);
			function userInfo_return(x){
				console.log(x)
				this_1.urerInfo=x.data
			}
		},
		created(){
			
		},
		watch:{
			
		}
	}
</script>

<style>
	#profitAgreement{
		color: #1F1F1F;
	}
	#profitAgreement li{
		margin: 0.1rem;
	}
	#profitAgreement .indent_1{
		text-indent: 2em;
	}
	#profitAgreement .bold_1{
		font-weight: bold;
	}
	#profitAgreement .padding_1m{
		padding-left: 2em;
	}
</style>