
<template>
  <div id="app" style="font-family: '楷体'">
    <router-view v-bind:net="net"  />
	 <page-footer></page-footer>
  </div>
</template>

<script>
import Footer from "@/page/Footer"

export default {
  name: 'App',
  components : {
  	"page-footer" : Footer,
  },
  data() {
  	return {
  		net : {
  			token : ""
  		}
  	}
  },
  methods : {
  	getCookie : function (name) {	// 获取cookie
  		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 			if (arr = document.cookie.match(reg))
  			return (arr[2]);
 			else
  			return null;
  	},
  	setCookie : function setCookie (c_name, value, expiredays) {	//设置新cookie
 			var exdate = new Date();
 			exdate.setDate(exdate.getDate() + expiredays);
 			document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
		},
		deleteCookie : function delCookie (name) {	// 删除原有cookie
		 var exp = new Date();
		 exp.setTime(exp.getTime() - 1);
		 var cval = getCookie(name);
		 if (cval != null)
		  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		},
		
		　　
  },

  created() {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
page-footer {
	position:fixed;
	bottom: 0px;
	right:0px;
}
</style>


