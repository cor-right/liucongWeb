<template>
<!-- 卡片列表 -->
<div class="card-content" style="">
  <div class="list-block" id="roomslistdiv">
    <ul id="roomListUl">
      <li v-for="room in roomsdata.rooms">
        <a href="#" class="item-link item-content" @click="getDetail(room)">
          <div class="item-media"><i class="icon icon-f7"></i></div>
          <div class="item-inner">
            <div class="item-title">{{room}}</div>
          </div>
        </a>
      </li>
    </ul>
    <div v-if="roomsdata.roomsnum == 0" style="overflow: hidden;">
	  	<img src="../../assets/marktwon.jpg" style="align-content: center;width: 100%;height: 70%;">
	  </div>
  </div>
  
</div><!-- end of card -->
</template>

<script>
	import axios from 'axios'
	
	export default {
		name : "RoomList",
		data () {
			return {
			}
		},
		props : [
			"roomsdata"
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
			getDetail : function (room) {	// 获取详细信息
				var token = this.getToken;
				axios.get("/room/detail", {
					params : {
						"classRoomName" : room
					},
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			$.alert('<font style="font-family:\'楷体\',\'Sitka Heading\'"><hr/>' + response.data.data.freeClassNum + '/6<hr/><div class="list-block"><ul><li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div>' +
						        	'<div class="item-inner"><div class="item-title">第1~2节</div><div class="item-after">' + response.data.data.class1 + '</div></div></li>' + 
						        	'<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">第3~4节</div><div class="item-after">' + response.data.data.class2 + '</div></div></li>' + 
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">第5~6</div><div class="item-after">' + response.data.data.class3 + '</div></div></li>' + 
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">第7~8节</div><div class="item-after">' + response.data.data.class4 + '</div></div></li>' + 
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">第9~10节</div><div class="item-after">' + response.data.data.class5 + '</div></div></li>' + 
						            '<li class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner">' +
						            '<div class="item-title">第11~12节</div><div class="item-after">' + response.data.data.class6 + '</div></div></li>' + 
						    		'</ul><br/><hr/></div></font>');
			  		}
				})
			},
		},
		created () {
//			$("#roomslistdiv").scroller({
//		        type: 'native'
//		    });
		}
	}
</script>

<style scoped>
	.card-content {
		width: 100%;
		height: 70%;
		word-break:break-all; 
		over-flow:hidden;
	}
	#roomslistdiv {
	}
	#roomListUl {
		word-break:break-all; 
		over-flow:hidden;	}
</style>