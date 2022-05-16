<template>
  <a-layout-content class="main">
    <a-spin
      v-if="loading"
      size="large"
      style="margin-left: 50%; margin-top: 20px"
    />
    <div class="content" v-else>
      <a-row type="flex" justify="center" style="margin-top: 10px">
        <a-col
          span="23"
          style="
            background-color: rgb(4, 43, 56);
            color: white;
            border-radius: 10px;
          "
        >
          <h1 style="color: white; margin-top: 5px">
            <span
              style="
                padding-left: 15px;
                letter-spacing: 3px;
                font-size: 40px;
                font-weight: 550;
                background: -webkit-linear-gradient(#333, #eee);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              "
              >{{
                this.$store.state.focusCountry.nameiso.name
                  ? this.$store.state.focusCountry.nameiso.name.toUpperCase()
                  : ""
              }}
            </span>
            <span
              @click="more = !more"
              style="cursor: pointer; margin-left: 5px"
            >
              <i
                v-if="!more"
                class="fa-solid fa-angle-down"
                style="font-size: 15px"
              ></i>
              <i
                v-else
                class="fa-solid fa-angle-up"
                style="font-size: 15px"
              ></i>
            </span>
            <div v-if="more">
              <a-row>
                <a-col
                  span="8"
                  style="
                    background: linear-gradient(90deg, #062a49, #141e30);
                    margin-left: 20px;
                    border-radius: 10px;
                    padding: 10px 15px;
                  "
                >
                  <a-row
                    type="flex"
                    style="height: 30px; font-size: 17px; font-weight: 545"
                    align="middle"
                  >
                    <a-col span="6"> Continent: </a-col>
                    <a-col span="6" :style="`color:${color}`">
                      {{ this.$store.state.focusCountry.continent }}
                    </a-col>
                  </a-row>
                  <a-row
                    type="flex"
                    style="height: 30px; font-size: 17px; font-weight: 545"
                    align="middle"
                  >
                    <a-col span="6"> Population: </a-col>
                    <a-col span="6" :style="`color:${color}`">
                      {{
                        this.$store.state.focusCountry.population.toLocaleString()
                      }}
                    </a-col>
                  </a-row>
                  <a-row
                    type="flex"
                    style="height: 30px; font-size: 17px; font-weight: 545"
                    align="middle"
                  >
                    <a-col span="6">
                      <i class="fa-solid fa-location-dot"></i>
                      Latitude:
                    </a-col>
                    <a-col span="6" :style="`color:${color}`">
                      {{ this.$store.state.focusCountry.lat }}
                    </a-col>
                    <a-col span="6">
                      <i class="fa-solid fa-location-dot"></i>
                      Longitude:
                    </a-col>
                    <a-col span="6" :style="`color:${color}`">
                      {{ this.$store.state.focusCountry.long }}
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </h1>
          <a-row type="flex" justify="space-around" style="margin-bottom: 10px">
            <a-col span="17">
              <a-row
                type="flex"
                justify="space-around"
                style="
                  background: linear-gradient(90deg, #062a49, #141e30);
                  height: 250px;
                  border-radius: 10px;
                  padding: 5px 10px;
                "
              >
                <a-col span="10">
                  <text-country
                    text="Total Cases"
                    :value="
                      this.$store.state.focusCountry.cases.toLocaleString()
                    "
                    color="rgba(251, 36, 16, 0.863)"
                  />
                  <text-country
                    text="New Cases"
                    :value="
                      this.$store.state.focusCountry.todayCase.toLocaleString()
                    "
                    color="rgba(251, 36, 16, 0.863)"
                  />
                  <text-country
                    text="Active Cases"
                    :value="
                      this.$store.state.focusCountry.active.toLocaleString()
                    "
                    color="rgb(243, 216, 37)"
                  />
                  <text-country
                    text="Critical Cases"
                    :value="
                      this.$store.state.focusCountry.critical.toLocaleString()
                    "
                    color="rgb(249, 128, 7)"
                  />
                  <text-country
                    text="Recovered"
                    :value="
                      this.$store.state.focusCountry.recovered.toLocaleString()
                    "
                    color="#1fab89"
                  />
                  <text-country
                    text="New Recovered"
                    :value="
                      this.$store.state.focusCountry.todayrecovered.toLocaleString()
                    "
                    color="#1fab89"
                  />
                </a-col>

                <a-col span="10">
                  <text-country
                    text="Total Deaths"
                    :value="
                      this.$store.state.focusCountry.deaths.toLocaleString()
                    "
                    color="rgb(250, 0, 0)"
                  />
                  <text-country
                    text="New Deaths"
                    :value="
                      this.$store.state.focusCountry.todayDeaths.toLocaleString()
                    "
                    color="rgb(250, 0, 0)"
                  />
                  <text-country
                    text="Mortality Rate"
                    :value="mortalityRate()"
                    color="rgb(250, 0, 0)"
                  />
                  <text-country
                    text="Total Tests"
                    :value="
                      this.$store.state.focusCountry.tests.toLocaleString()
                    "
                    color="#1fab89"
                  />
                  <text-country
                    text="Tested Rate"
                    :value="testRate()"
                    color="#1fab89"
                  />
                  <text-country
                    text="Recovered Rate"
                    :value="recoveredRate()"
                    color="#1fab89"
                  />
                </a-col>
              </a-row>
            </a-col>
            <a-col span="6">
              <img
                :src="`https://countryflagsapi.com/png/${this.$store.state.focusCountry.nameiso.iso}`"
                alt=""
                style="
                  height: 250px;
                  width: 100%;
                  object-fit: cover;
                  border-radius: 10px;
                "
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <!-- chart -->
      <a-row type="flex" justify="space-around">
        <a-col :xl="10" md="22" style="margin-top: 15px; margin-bottom: 10px">
          <highcharts :options="pieChart()"></highcharts>
        </a-col>
        <a-col :xl="10" md="22" style="margin-top: 15px; margin-bottom: 10px">
          <highcharts :options="totalAndToday()"></highcharts>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :xl="10" md="22" style="margin-top: 15px; margin-bottom: 10px">
          <highcharts :options="pieChart()"></highcharts>
        </a-col>
        <a-col :xl="10" md="22" style="margin-top: 15px; margin-bottom: 10px">
          <highcharts :options="totalAndToday()"></highcharts>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
import TextCountry from "./TextCountry.vue";
import { Chart } from "highcharts-vue";
import axios from "axios";

export default {
  components: { TextCountry, highcharts: Chart },
  data() {
    return {
      loading: true,
      more: false,
      info: {},
    };
  },
  methods: {
    homeback() {
      this.$router.push("/");
      this.$store.commit("setFocusCountry", {});
    },
    mortalityRate() {
      return (
        (
          (this.$store.state.focusCountry.deaths * 100) /
          this.$store.state.focusCountry.cases
        ).toFixed(2) + "%"
      );
    },
    testRate() {
      return (
        (
          (this.$store.state.focusCountry.tests * 100) /
          this.$store.state.focusCountry.population
        ).toFixed(2) + "%"
      );
    },
    recoveredRate() {
      return (
        (
          (this.$store.state.focusCountry.recovered * 100) /
          this.$store.state.focusCountry.cases
        ).toFixed(2) + "%"
      );
    },
    pieChart() {
      const obj = {
        chart: {
          backgroundColor: "rgb(201, 254, 250)",
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 75 + "%",
        },

        credits: false,
        title: {
          text: "The condition of all cases",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.y}</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            showInLegend: true,
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              borderRadius: "10px",
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              connectorColor: "black",
            },
          },
        },
        series: [
          {
            name: "Cases",
            data: [
              {
                name: "Total Recovered",
                y: this.$store.state.focusCountry.recovered,
              },
              {
                name: "Active Cases",
                y: this.$store.state.focusCountry.active,
              },
              {
                name: "Critical Cases",
                y: this.$store.state.focusCountry.critical,
              },
              {
                name: "Total Deaths",
                y: this.$store.state.focusCountry.deaths,
              },
            ],
          },
        ],
      };
      return obj;
    },
    totalAndToday() {
      const obj = {
        chart: {
          backgroundColor: "rgb(201, 254, 250)",
          plotBorderWidth: null,
          plotShadow: false,
          type: "column",
          height: 75 + "%",
        },
        title: {
          text: "Total And Today Infomation In The Country",
        },
        xAxis: {
          categories: ["Cases", "Death", "Recovered"],
          crosshair: true,
          labels: {
            formatter() {
              return `<span style="color: black">${this.value}</span>`;
            },
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "Case (person)",
            style: {
              color: "black",
            },
          },
          labels: {
            style: {
              color: "black",
            },
          },
          gridLineColor: "gray",
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
            name: "Total",
            data: [
              this.$store.state.focusCountry.cases,
              this.$store.state.focusCountry.deaths,
              this.$store.state.focusCountry.recovered,
            ],
            color: "rgb(12, 164, 131)",
          },
          {
            name: "Today",
            data: [
              this.$store.state.focusCountry.todayCase,
              this.$store.state.focusCountry.todayDeaths,
              this.$store.state.focusCountry.todayrecovered,
            ],
            color: "rgb(12, 164, 88)",
          },
        ],
      };
      return obj;
    },
    
  },
  beforeCreate: async function () {
    var config = {
      method: "get",
      url:
        "https://corona.lmao.ninja/v2/countries/" +
        this.$route.params.country +
        "?yesterday&strict&query",
      headers: {},
    };
    try {
      const res = await axios(config);
      const data = res.data;
      const payload = {
        nameiso: {
          name: data.country,
          iso: data.countryInfo.iso3,
        },
        flag: data.countryInfo.flag,
        lat: data.countryInfo.lat,
        long: data.countryInfo.long,
        continent: data.continent,
        cases: data.cases,
        todayCase: data.todayCases,
        active: data.active,
        critical: data.critical,
        deaths: data.deaths,
        todayDeaths: data.todayDeaths,
        recovered: data.recovered,
        todayrecovered: data.todayRecovered,
        tests: data.tests,
        population: data.population,
      };
      this.$store.commit("setFocusCountry", payload);
      this.loading = false;
    } catch (error) {
      alert("khong ton tai nuoc nay chuyen ve trang chu");
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.main {
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(232, 241, 237, 1) 0%,
    rgba(2, 130, 157, 0.9940125708486519) 100%
  );
  color: rgb(201, 254, 250);
}
</style>
