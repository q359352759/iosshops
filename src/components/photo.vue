<template>
	<div>
		<div id="photo">
			<div class="content">
				<p><span><img src="@/assets/img/photo_03.jpg" /></span><i>拍照</i></p>
				<p><span><img src="@/assets/img/photo_06.jpg" /></span><i>从相框中选择</i></p>
				
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style>
	#photo .content{width:90%;height:3rem;margin:0 auto;background-color:white;position: absolute;top:30%;left:5%;border-radius:0.1rem;}
	#photo .content p:nth-child(1){border-bottom:1px solid #d8d8d8;}
	#photo .content p{height:1.5rem;line-height:1.5rem;margin-bottom:0;}
	#photo .content p img{width:0.72rem;height:0.55rem;vertical-align:middle;margin-left:0.5rem;}
	#photo .content i{margin-left:0.3rem;font-size:;color:#757575;}
</style>