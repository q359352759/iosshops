<template>
	<div id="webSocket">
		<div style="height: 240px; overflow-y: auto; border: 1px solid #333;" id="show"></div>
			<div id="showChatMessage"></div>
			<input type="text" size="80" id="msg" name="msg" placeholder="输入聊天内容" />
			<input type="button" value="发送" id="sendBn" name="sendBn" @click="send()" >
	</div>
</template>

<script>
	export default{
		name:"",
		components:{
			},
			data:function(){
				return{
					ws:'',
					userId:localStorage.ids
				}
			},
			methods:{
				send(){
					var input = document.getElementById("msg");
					var text = input.value;
					this.ws.send(text);
					input.value = "";
				}
			},
			mounted: function(){
				var this_1=this
				this.ws = new WebSocket("ws://192.168.2.146:8080/zlwymaster/webSocket/"+this.userId);
			/*
			 *监听三种状态的变化 。js会回调
			 */
			this.ws.onopen = function(message) {

			};
			this.ws.onclose = function(message) {

			};
			this.ws.onmessage = function(message) {
				showMessage(message.data);
			};
			//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
			window.onbeforeunload = function() {
				this_1.ws.close();
			};
			//关闭连接
			function closeWebSocket() {
				this_1.ws.close();
			}
			//发送消息
			function send() {
				var input = document.getElementById("msg");
				var text = input.value;
				this_1.ws.send(text);
				input.value = "";
			}

			function showMessage(message) {
				var text = document.createTextNode(message);
				var br = document.createElement("br")
				var div = document.getElementById("showChatMessage");
				div.appendChild(text);
				div.appendChild(br);
			}

			},
		}
</script>

<style>
	
</style>