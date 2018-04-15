<template>
	<div>
		<div class="content">
		  <div class="list-block">
		  	<div class="content-block-title">总览</div>
		    <ul>
		      <li class="item-content">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">专业</div>
		          <div class="item-after">{{scord.subject}}</div>
		        </div>
		      </li>
		      <li class="item-content">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">加权平均分</div>
		          <div class="item-after">{{scord.avg}}</div>
		        </div>
		      </li>
		      <li class="item-content">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">平均学分绩点</div>
		          <div class="item-after">{{scord.avgPoint}}</div>
		        </div>
		      </li>
		    </ul>
		  </div>
		  <div class="content-block-title">排名</div>
		  <div class="list-block">
		    <ul>
		      <li class="item-content">
		        <div class="item-inner">
		          <div class="item-title">专业排名</div>
		          <div class="item-after">{{scord.subjectRank}}</div>
		        </div>
		      </li>
		      <li class="item-content">
		        <div class="item-inner">
		          <div class="item-title">班级排名</div>
		          <div class="item-after">{{scord.classRank}}</div>
		        </div>
		      </li>
		    </ul>
		  </div>
		  <div class="content-block-title">学分</div>
		  <div class="list-block">
		    <ul>
		      <li class="item-content item-link">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">毕业总学分</div>
		          <div class="item-after">{{scord.allScore}}</div>
		        </div>
		      </li>
		      <li class="item-content item-link">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">已修学分</div>
		          <div class="item-after">{{scord.doneScore}}</div>
		        </div>
		      </li>
		      <li class="item-content item-link">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">还需学分</div>
		          <div class="item-after">{{scord.needScore}}</div>
		        </div>
		      </li>
		      <li class="item-content item-link">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">正修读学分</div>
		          <div class="item-after">{{scord.doingScore}}</div>
		        </div>
		      </li>
		      <li class="item-content item-link">
		        <div class="item-media"><i class="icon icon-f7"></i></div>
		        <div class="item-inner">
		          <div class="item-title">不及格学分</div>
		          <div class="item-after">{{scord.badScore}}</div>
		        </div>
		      </li>
		    </ul>
		  </div>
		  <br />
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	
	export default {
		name : "Score",
		data () {
			return {
				scord : {
					avgPoint : "0",
	      			subjectRank : "0",
				    avg : "0",
				    doingScore : "0",
				    needScore : "0",
				    doneScore : "0",
				    subject : "",
				    badScore : "0",
				    classRank : "0",
				    allScore : "0",
				},
				title : "Welcome Page",
				
			}
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
			getScores : function () {
				var token = this.getToken;
				var scoreObject = this.scord;
				axios.get("/score/all", {	// 注销时携带请求头
			  		headers : {
			  			"token" : token
			  		}
			  	}).then(function (response) {
			  		if (response.data.code == 1)
			  			$.toast(response.data.message);
			  		else {
			  			scoreObject.avgPoint = response.data.data.avgPoint;
			  			scoreObject.subjectRank = response.data.data.subjectRank;
			  			scoreObject.avg = response.data.data.avg;
			  			scoreObject.doingScore = response.data.data.doingScore;
			  			scoreObject.needScore = response.data.data.needScore;
			  			scoreObject.doneScore = response.data.data.doneScore;
			  			scoreObject.subject = response.data.data.subject;
			  			scoreObject.badScore = response.data.data.badScore;
			  			scoreObject.classRank = response.data.data.classRank;
			  			scoreObject.allScore = response.data.data.allScore;
			  		}
				})
			},
		},
		created () {
			this.getScores();
		}
	}
</script>

<style>
	.content-block-title {
		margin: 0px;
		padding: 5px 0px;
		border: 0px;
	}
	.list-block {
		padding: 0px 0px;
		margin: 10px 0px;
		border: 0px;
	}
</style>