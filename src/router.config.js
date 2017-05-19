import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/home.vue'
import Detail from './components/detail.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/home/:id',
    component: Home
},
{
    path: '/detail/:id',
    component: Detail
},
{
    path: '/', redirect: '/home/0'
}]
const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 200 }
    }
})

export default router