<!-- 用户中心页面-->
<template>
	<div id="loginregisterdiv">



			<!-- 标题栏 -->
			<!--<header class="bar bar-nav">
			  <h1 class="title"></h1>
			</header>-->
      <div class="header">
        <header class="bar bar-nav">
           <h1 class="title"><font style="font-family: 'Sitka Banner';">NEFU&nbsp;学习机</font></h1>
        </header>
      </div>
			<!-- 内容展示 -->
      <div class="content">
				<!-- 未登录时展示 -->
				<div v-show="getToken == ''"  id="notlogincontent" style="">
					<div>
						<img src="../assets/book1.jpg" class="roundimage"  style="align-content: center;width: 20%;height:60%;"/>
					</div>
					<transition name="fade">
						<!--<p v-if="!showLoginPage.show" >-->
						<p align="center">
							<a href="#" style="width: 50%;"  class="button button-round button-fill " @click="loginPopUpPullUp"><font style="font-size: 22px;">登陆</font></a>
							<br />
							<a href="#"  style="width: 50%;"  class="button button-round button-fill " @click="registerPopUpPullUp"><font style="font-size: 22px;">注册</font></a>
						</p>
					</transition>
				</div>
			<!-- 已登陆时的界面 -->
			<div v-show="getToken != ''" class="list-block" >
				<!-- 按钮组-->
			  <!--<div class="content-block-title"></div>-->
        <ul>
          <!--<li><a href="#" class="item-link list-button"><span style="color : black;">[ {{getCurUsername}} ]</span></a></li>-->
          <!--<li><a href="#" class="item-link list-button">更新课表</a></li>-->
          <li><a href="#" class="item-link list-button" @click="checkStudentInfo">查看教务处信息</a></li>
          <li><a href="#" class="item-link list-button "  @click="tightStudentInfo">绑定教务处信息</a></li>
          <li><a href="#" class="item-link list-button "  @click="changeCurrentWeekNum">修改当前周</a></li>
        <li><a href="#" class="item-link list-button " @click="refreshStudentClassTable">更新个人课表</a></li>
            <li><a href="#" class="item-link list-button " @click="resetuserpw">重置用户密码</a></li>
            <li><a href="#" class="item-link list-button" @click="helpPopPullUp">帮助</a></li>
            <li><a href="#" class="item-link list-button" @click="aboutPopPullUp">关于</a></li>
            <!-- 注销按钮 -->
            <user-logout></user-logout>
        </ul>
      </div>

        <!-- footer -->
      <div style="position: relative;height: 5%">
        <nav class="bar">
          <router-link class="tab-item external " v-bind:class="{active : false }" to="/score">
            <span class="icon icon-home"></span>
            <!--<span class="tab-label">学分绩点</span>-->
            <span class="tab-label">&emsp;</span>
          </router-link>
          <router-link class="tab-item external" v-bind:class="{active : false  }"  to="/table">
            <span class="icon icon-computer"></span>
            <span class="tab-label">&emsp;</span>
            <!--<span class="tab-label">课程表</span>-->
          </router-link>
          <router-link class="tab-item external" v-bind:class="{active : false }"  to="/room">
            <span class="icon icon-edit"></span>
            <span class="tab-label">&emsp;</span>
            <!--<span class="tab-label">自习室</span>-->
          </router-link>
          <router-link class="tab-item external" v-bind:class="{active : false }"  to="/user">
            <span class="tab-label">  </span>
            <span class="icon icon-me"></span>
            <!--<span class="tab-label">个人中心</span>-->
          </router-link>
        </nav>
      </div>

	</div>




	<!--按钮组end-->
    <!-- tight student info popup -->
	<div class="popup" id="tightstudentinfo">
	  <div class="content-block">
	  	<p> ———— N E F U ———— </p>
	    <p>请输入您的教务处信息</p>
	    <hr />
	    <!-- start content-->
	    <p>
		  <div class="list-block">
		    <ul>
		      <!-- Text inputs -->
		      <li>
		        <div class="item-content">
		          <div class="item-media"><i class="icon icon-form-name"></i></div>
		          <div class="item-inner">
		            <div class="item-title label">教务处账号</div>
		            <div class="item-input">
		              <input type="text" placeholder="Your name"  v-model="studentid" >
		            </div>
		          </div>
		        </div>
		      </li>
		      <li>
		        <div class="item-content">
		          <div class="item-media"><i class="icon icon-form-password"></i></div>
		          <div class="item-inner">
		            <div class="item-title label" >教务处密码</div>
		            <div class="item-input">
		              <input type="password" placeholder="Password" class="" v-model="studentpw"/>
		            </div>
		          </div>
		        </div>
		      </li>
	      </ul>
	     </div>
      <!--end content-->
      <p><a href="#" class="close-popup" @click="resetStudentInfo" >取消</a></p>
      <p><a href="#" class="close-popup" @click="submitStudentInfo" >提交</a></p>
	  </div>
	</div>
	<!-- end tight student info-->
	<!-- 帮助 pop up -->
	<div class="popup" id="help-popup">
	  <div class="content-block">
	    <p>帮助</p>
	    <hr />
	    <p>该WEBAPP致力于</p><p>满足学生日常学习生活的需求</p>
	    <hr/>
	    <p>学生在绑定教务处之后</p>
	    <p>当前学期和学生姓名</p>
	    <p>都是爬虫去教务处上自动爬取</p>
	    <hr/>
	    <p>空闲教室信息</p>
	    <p>个人课表</p>
	    <p>也都是爬虫去教务处上爬取</p>
	    <hr />
	    <p></p>
	    <br/>
	    <p><a href="#" class="close-popup">确定</a></p>
	  </div>
	</div>
	<!-- end 帮助 pop up -->
	<!-- 关于 pop up -->
	<div class="popup" id="about-popup">
	  <div class="content-block">
	    <p>关于</p>
	    <hr />
	    <p>版本号</p>
	    <p>0.1.0.0325</p>
	    <p>作者</p>
	    <p>@刘聪</p>
	    <br/>
	    <p><a href="#" class="close-popup">确认</a></p>
	  </div>
	</div>
	<!-- end 关于 pop up -->

  <!-- 注册pop up -->
	<div class="popup" id="registerpopup" >
	  		<user-register></user-register>
	</div>
	<!-- 登陆 pop up -->
	<div class="popup" id="loginpopup" >
	  		<user-login></user-login>
	</div>
</div>
</template>

<script>

	import axios from 'axios'
	import Login from "@/components/user/Login"
	import Logout from "@/components/user/Logout"
	import Register from "@/components/user/Register"
	import Footer from "@/page/Footer"

	export default {
		name : "UserCenter",
		data () {
			return {
				title : "UserPage",
				showLoginPage : {	// transfer reference between Login.vue and this page
					show : false
				},
				curusername : "",
				studentid : "",
				studentpw : ""
			}
		},
		components : {
			"user-login" : Login,
			"user-logout" : Logout,
			"user-register" : Register,
			"page-footer" : Footer,
		},
		computed : {
			getToken : function () {
				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return (arr[2]);
		 			else
		  				return "";
			},
			getHeadUrl : function () {
				var arr, reg = new RegExp("(^| )headurl=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return this.baseheadurl + (arr[2]);
		 			else
		  				return "";
			},
			getCurUsername : function () {
				var arr, reg = new RegExp("(^| )username=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return (arr[2]);
		 			else
		  				return "";
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
		  	// 学生教务处信息绑定流程涉及的方法
		  	tightStudentInfo : function () {	// control the popup pull up, in line 41
  				$.popup("#tightstudentinfo");
		    },
		    submitStudentInfo : function () {	// 保存学生信息
		    	$.showPreloader();		// 开启指示器
		    	var token = this.getToken;
		    	axios.post("/student/info", {
		    		"studentid" : this.studentid,
		    		"studentpw" : this.studentpw
		    	},  {
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		$.hidePreloader();	// 关闭指示器
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			$.alert("欢迎您<br/>" + response.data.data.studentname + "<br/>您已成功绑定教务处信息");
			  		}
				})
		    },
		    resetStudentInfo : function () {	// 重置当前缓存的学生信息变量
		    },
		   // 用户查看当前绑定的教务处信息
		   checkStudentInfo : function () {
		   		var token = this.getToken;
		   		axios.get("/student/info", {	// 注销时携带请求头
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			$.alert('<hr/><font style="font-family:\'Sitka Heading\'">N E F U</font> <hr/><div class="list-block" style="font-family:\'楷体\'"><ul><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div>' +
						        	'<div class="item-inner"><div class="item-title">学号</div><div class="item-after">' + response.data.data.studentid + '</div></div></li>' +
						        	'<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">姓名</div><div class="item-after">' + response.data.data.studentname + '</div></div></li>' +
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">当前学期</div><div class="item-after">' + response.data.data.curTerm + '</div></div></li>' +
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">当前周次</div><div class="item-after">第' + response.data.data.curWeek + '周</div></div></li>' +
						    		'</ul><br/><hr/>最后更新时间<br/>' + response.data.data.lastRefresh + '<hr/></div>');
//			  			$.alert("<hr/>N E F U <hr/>"
//			  				+ "学号：" + response.data.data.studentid + "<br/>"
//			  				+ "姓名：" + response.data.data.studentname + "<br/>"
//			  				+ "当前学期：第" + response.data.data.curTerm + "学期<br/>"
//			  				+ "当前周次：第" + response.data.data.curWeek + "周<hr/>"
//			  				+ "最后更新时间<br/>" + response.data.data.lastRefresh);
			  		}
				})
		   },
		   // 用户登陆
		    loginPopUpPullUp : function () {
		   		$.popup("#loginpopup");
		   },
		   // 用户注册
		   registerPopUpPullUp : function () {
		   		$.popup("#registerpopup");
		   },
		   // 用户重置密码
		   resetuserpw : function () {
		   	var token = this.getToken;
		   	$.prompt('请输入新密码', function (value) {
		        axios.put("/user/info", {
		        	"password" : value
		        }, {
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			$.toast("密码修改成功");
			  		}
				})
		    });
		   },
		   // 帮助和关于
		   helpPopPullUp : function () {
		   		$.popup("#help-popup");
		   },
		   aboutPopPullUp : function () {
		   		$.popup("#about-popup");
		   },
		   // 更新学生的课表
		   refreshStudentClassTable : function () {
		   		var token = this.getToken;
		        axios.put("/table/content", {
		        }, {
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			$.toast("更新成功");
			  		}
				})
		   },
		   // 修改当前周
		   changeCurrentWeekNum : function () {
		   		var token = this.getToken;
		   		$.prompt('请输入您想选择的周目', function (value) {
		   			if (value == "" || value < 0 || value > 20)
			        	$.alert('请检查您输入的周次是否合法');
			        else {
			        	axios.put("/table/week", {
			        		"weeknum" : value
				        }, {
					  		headers : {
					  			"token" : token
					  		}
					  	}).then(function (response) {
					  		if (response.data.code == 1)
					  			$.toast(response.data.message);
					  		else {
					  			$.toast("成功修改当前周次为第" + value + "周");
					  		}
						})
			        }
			    });
		   }
		},
		watch : {

		},
		created () {
		}
  	}
</script>

<style scoped>
/* fade in & fade out */
.fade-enter-active  {
  	transition: opacity .30s;
}
.fade-leave-active {
	transition: opacity .0s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  	opacity: 0;
}
#notlogincontent {
}

.content {
	background-image: url("../assets/LanSeJingYu.jpg");
  top: 8%;
  height: 90%;
}

#loginregisterdiv{
}

.list-block {
}

header {
}

ul {
}

.roundimage{
        margin-top: 100px;
        width:200px;
        height:200px;
        border-radius:200px;
}

.header {
  height: 10%;
}

.header header {
}
</style>

