<template>
  <table border="1"  style="" class="theTable">
  	<tr style="color: black;">
  		<td style="width: 9%;"></td>
  		<td class="weektitletd" >周一</td>
  		<td class="weektitletd">周二</td>
  		<td class="weektitletd" >周三</td>
  		<td class="weektitletd">周四</td>
  		<td class="weektitletd">周五</td>
  		<td class="weektitletd">周六</td>
  		<td class="weektitletd">周日</td>
  	</tr>
  	<tr class="tablebodyTR" >
  		<td class="theTD">第<br/>1-2<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[0]"   class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  	<tr class="tablebodyTR" >
  		<td class="theTD">第<br/>3-4<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[1]"   class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  	<tr class="tablebodyTR">
  		<td class="theTD">第<br/>5-6<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[2]"   class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  	<tr class="tablebodyTR" >
  		<td class="theTD">第<br/>7-8<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[3]"  class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  	<tr class="tablebodyTR"  >
  		<td class="theTD">第<br/>9-10<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[4]"  class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  	<tr class="tablebodyTR" >
  		<td class="theTD">第<br/>11-12<br/>节</td>
  		<td v-for="singleclass in tabledata.classes[5]"  class="bodyTD">
  			<a href="#" @click="getClassDetail(singleclass.classid)">{{singleclass.name}}<br/>{{singleclass.room}}</a>
  		</td>
  	</tr>
  </table>
</template>

<script>
	import axios from 'axios'

	export default {
		name : "Table",
		data () {
			return {

			}
		},
		props : [
			"tabledata",
		],
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
			getCurWeekClassTable : function () {
				var thistabledata = this.tabledata;
				var token = this.getToken;
				axios.get("/table/content", {
					headers : {
						"token" : token,
					},
				}).then(function (response) {
					if (response.data.code == 1)
						$.toast(response.data.message);
					else {
						thistabledata.curWeek =  response.data.data.curWeek ;
						thistabledata.classes = response.data.data.classes;
					}
				})
			},
			getClassDetail : function (classid) {
				var token = this.getToken;
				axios.get("/table/detail", {
					params : {
						"classid" : classid,
					},
					headers : {
						"token" : token,
					},
				}).then(function (response) {
					if (response.data.data.code == 1) {
						$.toast(response.data.data.message);
						return false;
					}
					else {
						var classname = response.data.data.className;
						var teacher = response.data.data.teacher.replace(",", "<br/>");
						var classroom = response.data.data.classRoom;
						var week = response.data.data.week;
						$.alert('<hr/><font style="font-family:\'Sitka Heading\'">N E F U</font> <hr/><div class="list-block" style="font-family:\'楷体\'"><ul><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div>' +
						        	'<div class="item-inner"><div class="item-after">' + classname + '</div></div></li>' +
						        	'<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-after">' + teacher + '</div></div></li>' +
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-after">' + classroom + '</div></div></li>' +
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-after">' + week + '</div></div></li>' +
						    		'</ul><br/><hr/></div>');
					}
					return true;
				})
			}
		},
		created () {
			//
			this.getCurWeekClassTable();
		}
	}
</script>

<style>
	.theTable {
		background-image: url("../../assets/littletarget.jpg");
		/*word-wrap:break-word;*/
	},
	.tdHeaderFont {
		font-size: 13px;
	},
	.tablebodyTR {
		color: black;
		font-size: 13px;
	}
	.weektitletd {
		width: 13%;
		height: 4%;
	}
	.bodyTD {
		font-size: 12px;
	}
</style>
