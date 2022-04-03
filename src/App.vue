<template>
  <div id="app">
    <a-layout>
      <slider-bar />
      <router-view></router-view>
    </a-layout>
  </div>
</template>

<script>
import SliderBar from "./components/SliderBar.vue";

export default {
  name: "App",
  components: {
    SliderBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  text-align: center;
  justify-content: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
::-webkit-scrollbar {
  display: none;
}
</style>
