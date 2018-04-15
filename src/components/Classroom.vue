<template>
	<div class="emmm">
		<!-- 标题栏 -->
		<header class="bar bar-nav">
			 <h1 class="title">空闲教室检索</h1>
		</header>
		<hr/>

		<!-- 搜索栏  -->
		<div class="row" >
		  	<div class=" col-80">
		    	<input type="text" id="picker" @click="thePicker"   placeholder='单击配置检索条件 ...'/>
		    </div>
		    <a class="button button-fill button-primary col-15" @click="searchfreerooms"><span class="icon icon-search"></span></a>
    </div>
		<hr/>
		<!--<roomlist :roomsdata="roomsdata"></roomlist>-->
    <div class="content" v-if="roomsdata.roomsnum != 0">
      <div class="list-block" id="roomslistdiv">
        <ul id="roomListUl">
          <li v-for="room in roomsdata.rooms" class="item-content item-link" @click="getDetail(room)">
              <div class="item-media"><i class="icon icon-f7"></i></div>
              <div class="item-inner">
                <div class="item-title">
                  &emsp;{{room}}
                </div>
                <div class="item-after"></div>
              </div>
          </li>
        </ul>
      </div>
      <div style="position: relative;height: 5%" v-if="roomsdata.roomsnum != 0" >
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
      <!-- end of list block -->
    </div>
    <!-- end of content -->
    <!--  img -->
    <div v-if="roomsdata.roomsnum == 0" style="overflow: hidden;">
      <img src="../assets/marktwon.jpg" style="width: 70%;height: 50%;">
    </div>
    <!-- end of img -->
    <!-- end of content -->
    <div style="position: relative;height: 5%" v-if="roomsdata.roomsnum == 0" >
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
	import axios from 'axios'
	import RoomList from "@/components/room/RoomList"
  import Footer from "@/page/Footer"

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
			"roomlist" : RoomList,
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
		}
	}

</script>

<style scoped>
  #footer_div {
    height: 5%;
    overflow: hidden;
  }
  .row {
    height: 5%;
  }
  #roomslistdiv {
    height: 90%;
    padding: 0px;
    margin: 0px;
    overflow: scroll;
  }
  #roomListUl {
    height: 100%;
    overflow: scroll;
  }
  .emmm {
    height: 100%;
  }
</style>
