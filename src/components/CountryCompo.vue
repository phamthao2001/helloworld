<template>
  <a-layout-content>
    <a-button @click="homeback">Homepage</a-button>
    {{ this.$route.params.country }}
  </a-layout-content>
</template>

<script>
export default {
  methods:{
    homeback(){
      this.$router.push("/");
      this.$store.commit("setFocusCountry","");
    }
  }
};
</script>

<style></style>
