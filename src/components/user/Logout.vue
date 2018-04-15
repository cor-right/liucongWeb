<template>
		<a href="#" class="item-link list-button" @click="logout" style="color : red" >
			注销登陆
		</a>
</template>

<script>
	import axios from 'axios'
	export default {
		name : "Logout",
		data () {
			return {

			}
		},
		computed : {
			getToken : function () {
				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return (arr[2]);
		 			else
		  				return "";
			}
		},
		methods : {
			logout : function () {
				var token = this.getToken;
				var routerer = this.$router;
			  	axios.post("/user/logout", {},  {	// 注销时携带请求头
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
					if (response.data.code == 0) {
						document.cookie = "token=";	// 清除浏览器中的token的cookie
						document.cookie = "headurl=";
						document.cookie = "username=";
						$.toast("注销成功");
						setTimeout(function() {
							routerer.push({ path: '/' });	// 页面重新加载
						},2100);
					} else {
						$.toast(response.data.message);
            document.cookie = "token=";	// 清除浏览器中的token的cookie
            document.cookie = "headurl=";
            document.cookie = "username=";
            setTimeout(function() {
              routerer.push({ path: '/' });	// 页面重新加载
            },2100);
					}
				})
			}
		},
		created() {
		}
	}

</script>

<style>
</style>
