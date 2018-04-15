<template>
	<div class="content-block" align="center">
		<p> ———— N E F U ———— </p>
					    <p>注册</p>
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
						            <div class="item-title label" ><span class="icon icon-edit"></span></div>
						            <div class="item-input">
						              <input type="password" placeholder="Password" class="" v-model="password"/>
						            </div>
						          </div>
						        </div>
						      </li>
						      <li>
						        <div class="item-content">
						          <div class="item-media"><i class="icon icon-form-password"></i></div>
						          <div class="item-inner">
						            <div class="item-title label" ><span class="icon icon-edit"></span></div>
						            <div class="item-input">
						              <input type="password" placeholder="RePassword" class="" v-model="repassword"/>
						            </div>
						          </div>
						        </div>
						      </li>
					      </ul>
					     </div>
					    </p>
					  <!--end content-->
					  <p><a href="#" class="close-popup button button-primary button-round" style="width: 25%;font-size: 20px;" @click="" >取消</a></p>
					  <p><a href="#" class="close-popup button button-primary button-round" style="width: 25%;font-size: 20px;" @click="postRegister" >提交</a></p>
	</div>
</template>

<script>
	import axios from 'axios'
	
	export default {
		name : "Register",
		data () {
			return {
				username : "",
				password : "",
				repassword : ""
			}
		},
		methods : {
			postRegister : function () {
				if (this.username == "" || this.passwd == "") {
					$.toast("用户名或密码不能为空");
					return ;
				}
				if (this.password != this.repassword) {
					$.toast("密码和确认密码必须相同");
					return ;
				}
				$.showPreloader();	// 加载指示器
				axios.post("/user/register", {
					username : this.username,
					password : this.password
				}).then(function (response) {
					$.hidePreloader();	// 关闭指示器
					console.log(response)
					if (response.data.code == 0) {
						$.toast("注册成功")
					}
					else {
						$.toast(response.data.message);
					}
				})
			}
		}
	}
</script>

<style>
</style>