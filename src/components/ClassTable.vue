<template>
	<div id="allpage">



		<!-- header -->
    <div class="header">
      <header class="bar bar-nav">
        <button class="button button-link button-nav pull-left" @click="lastWeek">
          <span class="icon icon-left"></span>
          上一周
        </button>
        <button class="button button-link button-nav pull-right" @click="nextWeek">
          下一周
          <span class="icon icon-right"></span>
        </button>
        <h1 class="title">第{{tabledata.curWeek}}周</h1>
      </header>
    </div>
		<!-- end haeder-->
		<!-- table -->
    <div id="tableDiv">
		  <table-content :tabledata="tabledata" ></table-content>
    </div>
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
</template>

<script>
	import Table from "@/components/table/Table"
	import axios from "axios"
  import Footer from "@/page/Footer"

	export default {
		name : "ClassTable",
		data () {
			return {
				tabledata : {
					refreshed : false,
					curWeek : 1,
					classes :  [],
				}
			}
		},
		components : {
			"table-content" : Table,
      "page-footer" : Footer
		},
		computed : {
			getToken : function () {
				var arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
		 			if (arr = document.cookie.match(reg))
		  				return (arr[2]);
		 			else
		  				return "";
			},
		},
		methods : {
			lastWeek : function () {
				var thistabledata = this.tabledata;
				var token = this.getToken;
				thistabledata.curWeek = thistabledata.curWeek - 1;
				if (thistabledata.curWeek <= 0)
					thistabledata.curWeek = 1;
				axios.get("/table/week", {
					params : {
						"weeknum" : thistabledata.curWeek,
					},
					headers : {
						"token" : token,
					},
				}).then(function (response) {
					if (response.data.data.code == 1)
						$.toast(response.data.data.message);
					else {
						thistabledata.curWeek =  response.data.data.curWeek ;
						thistabledata.classes = response.data.data.classes;
					}
				})
			},
			nextWeek : function () {
				var thistabledata = this.tabledata;
				var token = this.getToken;
				thistabledata.curWeek = thistabledata.curWeek + 1;
				axios.get("/table/week", {
					params : {
						"weeknum" : thistabledata.curWeek
					},
					headers : {
						"token" : token,
					},
				}).then(function (response) {
					if (response.data.data.code == 1)
						$.toast(response.data.data.message);
					else {
						thistabledata.curWeek =  response.data.data.curWeek ;
						thistabledata.classes = response.data.data.classes;
					}
				})
			}
		}
	}
</script>

<style>
  div {
    margin: 0px 0px;
    padding: 0px 0px;
  }
  #allpage {
    height: 100%;
  }
  header {
    height: 5%;
  }
  table td {
    overflow: hidden;
  }
  #tableDiv {
    position: relative;
  }
</style>
