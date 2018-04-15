<template>
<div>
	<!-- 工具栏 -->
    <nav class="bar bar-tab">
        <router-link class="tab-item external " v-bind:class="{active : false }" to="/score">
            <span class="icon icon-home"></span>
            <span class="tab-label">学分绩点</span>
        </router-link>
        <router-link class="tab-item external" v-bind:class="{active : false  }"  to="/table">
            <span class="icon icon-computer"></span>
            <span class="tab-label">课程表</span>
        </router-link>
        <router-link class="tab-item external" v-bind:class="{active : false }"  to="/room">
            <span class="icon icon-edit"></span>
            <span class="tab-label">自习室</span>
        </router-link>
        <router-link class="tab-item external" v-bind:class="{active : false }"  to="/user">
            <span class="icon icon-me"></span>
            <span class="tab-label">个人中心</span>
        </router-link>
    </nav>
</div>
</template>

<script>
	export default {
		name : "Footer",
		data () {
			return {
				activeNum : 0
			}
		},
		methods : {
		}
	}
</script>

<style scoped>
</style>