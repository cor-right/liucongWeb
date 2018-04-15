<template>
<div >
	<div>
		<img src="../assets/dog.jpg" style="align-content: center;width: 95%;height:70%;"/>
	</div>
</div>
</template>

<script>
	import Footer from "@/page/Footer"
	
export default {
	name : "Welcome",
	data () {
		return {
			
		}
	},
	methods : {
		gotoUserCenter : function () {
			var routerer = this.$router;
			setTimeout(function() {
				routerer.push({ path: '/user' });	// 页面重新加载
			},2000);
		}
	},
	components :{
		"page-footer" : Footer
	},
	created () {
		this.gotoUserCenter();
	}
}
</script>

<style>
</style>

