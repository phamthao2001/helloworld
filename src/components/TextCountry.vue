<template>
  <a-row type="flex" style="height:40px; font-size: 19px; font-weight:545;" align="middle">
    <a-col span="12" > {{text}} </a-col>
    <a-col span="12" :style="`color:${color}`" > {{value}} </a-col>
  </a-row>
</template>

<script>
export default {
  props:[
    "text",
    "value",
    "color"
  ]
};
</script>

<style></style>
