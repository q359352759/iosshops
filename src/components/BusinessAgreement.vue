<template>
	<ul id="BusinessAgreement">
		<li class="bold_1">甲方：四川省择力网络科技有限公司</li>
		<li class="bold_1">乙方： {{partnername}}</li>
		<li class="indent_1">
			<span class="bold_1">总则</span>
			为响应大众创业万众创新的号召，四川省择力网络科技有限公司特面向社会搭建一个“合伙创业孵化平台”，为全国各地的星级代理商提供一个良好的创业机会。本着资源共享、互惠互利的原则，秉持公平、公正、公开、合情、合理、合法的原则，经双方友好协商，特签署如下协议：
		</li>
		<li class="bold_1">一、	合作简述</li>
		<li class="indent_1">
			<div>1.	甲乙双方属于代理合作性质，代理费用及缴纳方式在业务管理界面显示。</div>
			<div>2.	甲方有偿向乙方提供创业机会和专业培训，并提供专人的辅助指导。</div>
			<div>3.	乙方开拓市场发展业务，享有佣金及相关收益。</div>
			<div>4.	乙方通过甲方的业绩考核后，可享有永久性的佣金收益（除去《业务代理合作行为考核准则》的考核不合格以外）。</div>
		</li>
		<li class="bold_1">二、	甲方的权益与义务</li>
		<li class="indent_1">
			<div>1.	甲方拥有乙方业绩考核的审核权限。</div>
			<div>2.	甲方拥有乙方星级代理的等级调整及冻结权限。</div>
			<div>3.	甲方拥有星级等级代理费用及缴纳方式的调整权限。</div>
			<div>4.	甲方拥有乙方佣金、差额、补助、奖励的具体调整权限。</div>
			<div>5.	甲方需承担乙方佣金、差额、补助、奖励的提现金额的支付义务。</div>
			<div>6.	甲方需承担平台系统正常运营及管理维护的义务。</div>
			<div>7.	甲方需向乙方提供（有偿）宣传资料和讲解培训的义务。</div>
		</li>
		<li class="bold_1">三、乙方的权益与义务</li>
		<li class="padding_1m">
			<div>(一)权益</div>
			<ul class="indent_1">
				<li>1.	乙方享有对商家、城市合伙人、会员的推广权益。</li>
				<li>2.	乙方通过业绩考核后，享有终身的佣金收入权益。</li>
				<li>3.	乙方享有组建分公司的优先权益。</li>
				<li>4.	乙方享有甲方的培训机会和辅导权益。</li>
				<li>5.	乙方享有推荐商家和城市合伙人的基本保障权益。</li>
			</ul>
			<div>(二)	义务</div>
			<ul class="indent_1">
				<li>1.	乙方有主动向被推广的会员及商家提供讲解及辅导的义务。</li>
				<li>2.	乙方的工作内容和计划安排，需配合分公司负责人的统一指导和调配。</li>
				<li>3.	乙方有义务向所推广人员及商家提供讲解、咨询、售后处理工作，并对当地的业务发展进行市场维护。</li>
				<li>4.	乙方有义务向甲方提供个人的真实身份信息。</li>
				<li>5.	乙方有义务接受甲方的业绩考核。</li>
				<li>6.	乙方有义务缴纳个人所得税。</li>
			</ul>
		</li>
		<li class="bold_1">四、	合作约定及处理</li>
		<li class="indent_1">1.	乙方在业绩考核期间未通过考核，甲方有权解除乙方的合作关系，具体考核时间以分公司规划的时间为准。</li>
		<li class="indent_1">2.	甲方拥有《业务代理合作行为考核准则》的制定权和修改权。</li>
		<li class="indent_1">3.	乙方业绩考核通过后，每隔1年需提交资料审核和《业务代理合作行为考核准则》的考核。</li>
		<li class="indent_1">4.	乙方在指定的业绩考核时间内通过考核，甲方无权取消乙方的合作关系及佣金收益（除去《业务代理合作行为考核准则》的考核不合格以外）。</li>
		<li class="indent_1">5.	乙方的佣金收入达到国家个人所得税征收点时，由甲方按照国家的个人所得税征收标准来统一结算扣除。</li>
		<li class="indent_1">6.	乙方在合作期间不能配合分公司的发展和市场维护，经总公司调差取证后，有权取消乙方的合作资格！</li>
		<li class="bold_1">五、	法律纠纷及处理</li>
		<li class="indent_1">1．	甲乙双方如有异议和法律纠纷问题，可以进行协商处理或采用法律诉讼。</li>
		<li class="bold_1">六、	协议生效及失效</li>
		<li class="indent_1">1．	本协议自乙方申请成为星级代理商之日起生效。</li>
		<li class="indent_1">2．	乙方业绩考核未通过或《业务代理合作行为考核准则》的考核未通过则为失效。</li>
	</ul>
</template>

<script>
	export default{
		name:'',
		props:{
			partnername:{
//				type:String,	这个可以不写
				required:true
			},
		},
		components:{},
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted(){
			
		},
		created(){
			
		},
		watch:{
			partnername(x){
				console.log(x)
			}
		}
	}
</script>

<style>
	#BusinessAgreement{
		color: #1F1F1F;
	}
	#BusinessAgreement li{
		margin: 0.1rem;
	}
	#BusinessAgreement .indent_1{
		text-indent: 2em;
	}
	#BusinessAgreement .bold_1{
		font-weight: bold;
	}
	#BusinessAgreement .padding_1m{
		padding-left: 2em;
	}
</style>