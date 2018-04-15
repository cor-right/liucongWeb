<template>
	<div>
		<!-- 标题栏 -->
		<header class="bar bar-nav">
			 <h1 class="title">空闲教室检索</h1>
		</header>
		<hr/>
		<!-- 搜索栏  -->
		<div class="row">
		  	<div class=" col-80">
		    	<input type="text" id="picker" @click="thePicker"   placeholder='单击配置检索条件 ...'/>
		    </div>
		    <a class="button button-fill button-primary col-15" @click="searchfreerooms"><span class="icon icon-search"></span></a>
		</div>
		<hr/>
		<roomlist :roomsdata="roomsdata"></roomlist>
	</div>
</template>

<script>
	import axios from 'axios'
	import RoomList from "@/components/room/RoomList"
	
	export default {
		name : "ClassRoom",
		data () {
			return {
				title : "ClassRoom Page",
				roomsdata : {
					rooms : [],
					roomsnum : 0
				},
			}
		},
		components : {
			"roomlist" : RoomList
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
			thePicker : function () {	// 设置检索条件
				$("#picker").picker({
				  toolbarTemplate: '<header class="bar bar-nav" style="font-family:\'楷体\'">\
				  <button class="button button-link pull-right close-picker">确定</button>\
				  <h1 class="title" style="font-family:\'Sitka Heading\'">NEFU</h1>\
				  </header>',
				  cols: [
				  	{
				      textAlign: 'center',
				      values: ['丹青楼', '锦绣楼', '成栋楼']
				    },
				    {
				      textAlign: 'center',
				      values: ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼', '七楼', '八楼']
				    },
				    {
				      textAlign: 'center',
				      values: ['第1~2节', '第3~4节', '第5~6节', '第7~8节', '第9~10节', '第11~12节']
				    }
				  ],
				  rotateEffect : true	// 3D 效果
				});
			},
			searchfreerooms : function () {	// 进行搜索
				var page = this;	// 这里进行获取
				var token = this.getToken;
				var value = $("#picker").val();
				var configers = value.split(" ");
				var oriLevel = 0;
				var oriTime = 0;
				if (configers[1] == '一楼')	oriLevel = 1;
				if (configers[1] == '二楼')	oriLevel = 2;
				if (configers[1] == '三楼')	oriLevel = 3;
				if (configers[1] == '四楼')	oriLevel = 4;
				if (configers[1] == '五楼')	oriLevel = 5;
				if (configers[1] == '六楼')	oriLevel = 6;
				if (configers[1] == '七楼')	oriLevel = 7;
				if (configers[1] == '八楼')	oriLevel = 8;
				if (configers[2] == '第1~2节')	oriTime = 1;
				if (configers[2] == '第3~4节')	oriTime = 2;
				if (configers[2] == '第5~6节')	oriTime = 3;
				if (configers[2] == '第7~8节')	oriTime = 4;
				if (configers[2] == '第9~10节')	oriTime = 5;
				if (configers[2] == '第11~12节')	oriTime = 6;
				axios.get("/room/list", {
					params : {
						"build" : configers[0],
						"level" : oriLevel,
						"classNum" : oriTime
					},
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			page.roomsdata.roomsnum = response.data.data.roomfree;
			  			page.roomsdata.rooms = response.data.data.freerooms;
			  			$.toast("共 " + response.data.data.roomfree + " 间空闲教室");
			  		}
				})
			},
			
		},
		created () {
		}
	}
	
</script>

<style>
</style>