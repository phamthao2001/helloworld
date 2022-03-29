import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld'
import HomePage from './components/HomePage'
import VietNam from './components/VietNam'
import Donglao from './components/DongLao'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    component: HomePage 
  },
  { 
    path: '/hello', 
    component: HelloWorld,
    children: [
      {
        path: 'vietnam',
        component: VietNam
      },
      {
        path: 'donglao',
        component: Donglao
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;