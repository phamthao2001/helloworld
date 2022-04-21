<template>
  <a-col
    :xl="5"
    :md="10"
    :xs="16"
    style="
      box-shadow: 0px 9px 27px -2px rgba(92, 87, 87, 0.76);
      -webkit-box-shadow: 0px 9px 27px -2px rgba(92, 87, 87, 0.76);
      -moz-box-shadow: 0px 9px 27px -2px rgba(92, 87, 87, 0.76);
      margin-bottom:15px;
    "
  >
    <a-card class="card">
      <div slot="title" style="color: white">
        <i :class="iconClass" style="font-size: 20px; margin-right: 10px"></i>
        <span>{{ maintitle }}</span>
      </div>
      <a-popover slot="extra" placement="bottom">
        <div slot="content">
          <highcharts :options="getChartOptions()"></highcharts>
        </div>
        <i
          class="fa-solid fa-circle-info"
          style="color: white; font-size: 15px"
        ></i>
      </a-popover>
      <div style="font-size: 16px">
        <i
          class="fa-solid fa-user"
          style="font-size: 20px; margin-right: 10px"
        ></i>
        <span>
          {{ getTotal().toLocaleString() }}
        </span>
      </div>
      <div style="font-size: 11px; margin-top: 5px">
        {{ subtitle + ": " + getNew().toLocaleString() }}
      </div>
    </a-card>
  </a-col>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  props: ["maintitle", "iconClass", "subtitle", "data"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {};
  },
  methods: {
    getTotal() {
      var total = 0;
      this.data.forEach((item) => (total += item.total));
      return total;
    },
    getNew() {
      var today = 0;
      this.data.forEach((item) => (today += item.today));
      return today;
    },
    getCategories() {
      var categories = [];
      this.data.forEach((item) => categories.push(item.name));
      return categories;
    },
    getArrTotal() {
      var arr = [];
      this.data.forEach((item) => arr.push(item.total));
      return arr;
    },
    getArrNew() {
      var arr = [];
      this.data.forEach((item) => arr.push(item.today));
      return arr;
    },
    getChartOptions() {
      const obj = {
        chart: {
          type: "column",
        },
        title: {
          text: `Detail Information ${this.maintitle}`,
        },
        subtitle: {
          text: "Source: NovelCOVID API",
        },
        xAxis: {
          categories: this.getCategories(),
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Case (person)",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} cases</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        credits: false,
        series: [
          {
            name: this.maintitle,
            data: this.getArrTotal(),
          },
          {
            name: this.subtitle,
            data: this.getArrNew(),
          },
        ],
      };
      return obj;
    },
  },
  beforeCreate() {},
};
</script>

<style scoped>
.card {
  background: rgb(4, 43, 56);
  color: white;
}
</style>
