<template>
	<div>
		<!-- header -->
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
		<!-- end haeder-->
		<!-- table -->
		<table-content :tabledata="tabledata" ></table-content>
	</div>
</template>

<script>
	import Table from "@/components/table/Table"
	import axios from "axios"
	
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
			"table-content" : Table
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
</style>