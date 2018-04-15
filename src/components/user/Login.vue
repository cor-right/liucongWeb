<template>
	
	<div class="content-block" align="center" >
		<p> ———— N E F U ———— </p>
					    <p>登陆</p>
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
						            <!--<div class="item-title label">用户名</div>-->
						            <div class="item-title label"><span class="icon icon-me"></span></div>
						            <div class="item-input">
						              <input type="text" placeholder="Your name"  v-model="username" >
						            </div>
						          </div>
						        </div>
						      </li>
						      <li>
						        <div class="item-content">
						          <div class="item-media"><i class="icon icon-form-password"></i></div>
						          <div class="item-inner">
						            <!--<div class="item-title label" >密码</div>-->
						            <div class="item-title label" > <span class="icon icon-edit"></span></div>
						            <div class="item-input">
						              <input type="password" placeholder="Password" class="" v-model="passwd"/>
						            </div>
						          </div>
						        </div>
						      </li>
					      </ul>
					     </div>
					    </p>
					  <!--end content-->
					  <p><a href="#" class="close-popup button button-primary button-round" style="width: 25%;font-size: 20px;" @click="" >取消</a></p>
					  <p><a href="#" class="close-popup button button-primary button-round" style="width: 25%;font-size: 20px;" @click="postLogin" >登陆</a></p>
	</div>
	
	
	<!--<div>-->
		 <!--登陆表单--> 
		<!--<div class="list-block">
		    <ul>
		      <li>
		        <div class="item-content">
		          <div class="item-media"><i class="icon icon-form-name"></i></div>
		          <div class="item-inner">
		            <div class="item-title label">用户名</div>
		            <div class="item-input">
		              <input type="text" v-model="username" placeholder="Your name" @keyup.enter="postLogin">
		            </div>
		          </div>
		        </div>
		      </li>
		      <li>
		        <div class="item-content">
		          <div class="item-media"><i class="icon icon-form-password"></i></div>
		          <div class="item-inner">
		            <div class="item-title label">密码</div>
		            <div class="item-input">
		              <input type="password" placeholder="Password" class="" v-model="passwd" @keyup.enter="postLogin">
		            </div>
		          </div>
		        </div>
		      </li>
		    </ul>
		</div>
		<!-- 取消&提交按钮 -->
		<!--<div class="content-block">	
		    <div class="row">
		      <div class="col-50"><a href="#" class="button button-big button-fill button-danger" @click="showLoginPage.show = !showLoginPage.show">取消</a></p></div>
		      <div class="col-50"><a href="#" class="button button-big button-fill button-success" @click="postLogin" >提交</a></div>
		    </div>
  		</div>
	</div>-->
</template>

<script>
	import axios from 'axios'
	import routers from "@/router/index"
	
	export default {
		name : "Login",
		data () {
			return {
				username : "",
				passwd : "",
			}
		},
		props : [
			"showLoginPage",
		],
		methods : {
			postLogin : function () {	// 登陆方法
				var routerer = this.$router;
				if (this.username == "" || this.passwd == "") {
					$.toast("用户名或密码不能为空");
					return ;
				}
				$.showPreloader();	// 加载指示器
				axios.post("/user/login", {
					username : this.username,
					password : this.passwd
				}).then(function (response) {
					$.hidePreloader();	// 关闭指示器
					console.log(response)
					if (response.data.code == 0) {
						document.cookie = "token=" + response.data.data.token;	// 设置token
						document.cookie = "headurl=" + response.data.data.head;	// 设置headurl
						document.cookie = "username=" + response.data.data.username;	// 设置username
						$.toast("欢迎您 : " + response.data.data.username);
						setTimeout(function() {
							routerer.push({ path: '/' });	// 页面重新加载
						},2100);
					}
					else {
						$.toast(response.data.message);
					}
				})
			},
		},
		created() {
		}
	}
</script>

<style>
	.list-block {
		align-items: center;
	}
</style>