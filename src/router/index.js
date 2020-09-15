import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Center from '../views/quick/center/Center'
import Detail from '../views/detail/Detail'
import City from '../views/city/City'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/quick/2536'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/quick/:id',
      component:Center
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/city',
      component:City
    }
  ]

const router = new VueRouter({
  routes
})

export default router
