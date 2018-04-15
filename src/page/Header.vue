<template>
<div>
	<header class="bar bar-nav">
        <a class="icon icon-me pull-left open-panel"></a>
        <h1 class="title">{{title}}</h1>
    </header>
</div>
</template>

<script>
	export default {
		name : "Header",
		data () {
			return {
				title : "学生事务管理平台"
			}
		}
	}
</script>

<style>
</style>