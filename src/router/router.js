import Vue from "vue";
import VueRouter from "vue-router";
import HomeCompo from '../components/HomeCompo';
import CountryCompo from '../components/CountryCompo'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomeCompo,
  },
  {
    path: "/:country",
    component: CountryCompo,
  }
];

const router = new VueRouter({
  mode: "history",
  // base: '/my-app/',
  routes,
});

export default router;
