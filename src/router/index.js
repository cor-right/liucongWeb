import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'

import Footer from "@/page/Footer"
import Header from "@/page/Header"

import Welcome from "@/components/Welcome"
import ClassTable from "@/components/ClassTable"
import ClassRoom from "@/components/ClassRoom"
import UserCenter from "@/components/UserCenter"
import Score from "@/components/Score"

Vue.use(Router)
Vue.use(VueResource)
Vue.use(axios)

export default new Router({
	name : "routers",
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
    	path: "/user",
    	name : "user",
    	component : UserCenter
    },
    {
    	path: "/table",
    	name : "table",
    	component : ClassTable
    },
    {
    	path: "/room",
    	name : "room",
    	component : ClassRoom
    },
    {
    	path : "/score",
    	name : "score",
    	component : Score
    }
  ],
  created () {
  		axios.defaults.baseURL = "http://60.205.215.237:8081/api";
  },
	mode : "history"	// 去掉地址栏的#号	
})
