<template>
  <a-layout-content class="main">
    <a-spin
      v-if="loading"
      size="large"
      style="margin-left: 50%; margin-top: 20px"
    />
    <div id="content" v-else>
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
          <a-row type="flex" style="background: rgb(201, 254, 250)">
            <a-col :span="10">
              <a-row style="color: black; margin-top: 10px"> </a-row>
            </a-col>
            <a-col :span="14">
              <a-row
                type="flex"
                justify="space-around"
                style="margin-top: 10px"
              >
                <a-button
                  :type="historyday == 7 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday == 7 && loadingcase"
                  @click="setHistoryDay(7)"
                  >1 week</a-button
                >
                <a-button
                  :type="historyday == 30 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday == 30 && loadingcase"
                  @click="setHistoryDay(30)"
                  >1 month</a-button
                >
                <a-button
                  :type="historyday == 90 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday == 90 && loadingcase"
                  @click="setHistoryDay(90)"
                  >3 months</a-button
                >
                <a-button
                  :type="historyday == 180 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday == 180 && loadingcase"
                  @click="setHistoryDay(180)"
                  >6 months</a-button
                >
                <a-button
                  :type="historyday == 365 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday == 365 && loadingcase"
                  @click="setHistoryDay(365)"
                  >1 year</a-button
                >
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <highcharts :options="hisCaseChart"></highcharts>
          </a-row>
        </a-col>
        <a-col :xl="10" md="22" style="margin-top: 15px; margin-bottom: 10px">
          <a-row type="flex" style="background: rgb(201, 254, 250)">
            <a-col :span="10">
              <a-row style="margin-top: 10px"> </a-row>
            </a-col>
            <a-col :span="14">
              <a-row
                type="flex"
                justify="space-around"
                style="margin-top: 10px"
              >
                <a-button
                  :type="historyday1 == 7 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday1 == 7 && loadingdeath"
                  @click="setHistoryDay1(7)"
                  >1 week</a-button
                >
                <a-button
                  :type="historyday1 == 30 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday1 == 30 && loadingdeath"
                  @click="setHistoryDay1(30)"
                  >1 month</a-button
                >
                <a-button
                  :type="historyday1 == 90 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday1 == 90 && loadingdeath"
                  @click="setHistoryDay1(90)"
                  >3 months</a-button
                >
                <a-button
                  :type="historyday1 == 180 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday1 == 180 && loadingdeath"
                  @click="setHistoryDay1(180)"
                  >6 months</a-button
                >
                <a-button
                  :type="historyday1 == 365 ? 'primary' : ''"
                  style="width: 18%"
                  :loading="historyday1 == 365 && loadingdeath"
                  @click="setHistoryDay1(365)"
                  >1 year</a-button
                >
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <highcharts :options="hisDeathChart"></highcharts>
          </a-row>
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
      loadingcase: false,
      loadingdeath: false,
      more: false,
      info: {},
      historyday: 7,
      historyday1: 7,
      hisCase: {},
      hisDeath: {},
    };
  },
  watch: {
    historyday: async function () {
      var config = {
        method: "get",
        url:
          "https://corona.lmao.ninja/v2/historical/" +
          this.$route.params.country +
          "?lastdays=" +
          this.historyday,
        headers: {},
      };
      try {
        const res = await axios(config);
        this.hisCase = res.data.timeline.cases;
        this.$store.commit(
          "setHistoryCaseFocusCountry",
          res.data.timeline.cases
        );
        this.loadingcase = false;
      } catch (error) {
        alert(error);
      }
    },
    historyday1: async function () {
      var config = {
        method: "get",
        url:
          "https://corona.lmao.ninja/v2/historical/" +
          this.$route.params.country +
          "?lastdays=" +
          this.historyday1,
        headers: {},
      };
      try {
        const res = await axios(config);
        this.hisDeath = res.data.timeline.deaths;
        this.$store.commit(
          "setHistoryDeathFocusCountry",
          res.data.timeline.deaths
        );
        this.loadingdeath = false;
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    hisCaseChart: function () {
      var obj = {
        chart: {
          backgroundColor: "rgb(201, 254, 250)",
          plotBorderWidth: null,
          plotShadow: false,
          height: 75 + "%",
          type: "area",
        },
        title: {
          text: "History Cases In Country",
        },
        subtitle: {
          text:
            'Sources: <a href="https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest#ec0c31aa-b666-4603-8d35-900932206384">' +
            "https://disease.sh/docs</a>",
        },
        xAxis: {
          categories: this.hisCase ? Object.keys(this.hisCase) : [],
          allowDecimals: false,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
          },
        },
        yAxis: {
          min: Object.values(this.hisCase).at(0),
          title: {
            text: "Cases(person)",
          },
          labels: {
            formatter: function () {
              return this.value / 1000 + "k";
            },
          },
        },
        tooltip: {
          pointFormat: "{point.y:,.0f} cases",
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        credits: false,
        series: [
          {
            showInLegend: false,
            data: this.hisCase ? Object.values(this.hisCase) : [],
            color: "rgb(5, 197, 133)",
          },
        ],
      };
      return obj;
    },
    hisDeathChart: function () {
      var obj = {
        chart: {
          backgroundColor: "rgb(201, 254, 250)",
          plotBorderWidth: null,
          plotShadow: false,
          height: 75 + "%",
          type: "area",
        },
        title: {
          text: "History Deaths In Country",
        },
        subtitle: {
          text:
            'Sources: <a href="https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest#ec0c31aa-b666-4603-8d35-900932206384">' +
            "https://disease.sh/docs</a>",
        },
        xAxis: {
          categories: this.hisDeath ? Object.keys(this.hisDeath) : [],
          allowDecimals: false,
          labels: {
            formatter: function () {
              return this.value; // clean, unformatted number for year
            },
          },
        },
        yAxis: {
          min: Object.values(this.hisDeath).at(0),
          title: {
            text: "Cases(person)",
          },
          labels: {
            formatter: function () {
              return this.value / 1000 + "k";
            },
          },
        },
        tooltip: {
          pointFormat: "{point.y:,.0f} cases",
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        credits: false,
        series: [
          {
            showInLegend: false,
            data: this.hisDeath ? Object.values(this.hisDeath) : [],
            color: "rgb(3, 171, 22)",
          },
        ],
      };
      return obj;
    },
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
        subtitle: {
          text:
            'Sources: <a href="https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest#ec0c31aa-b666-4603-8d35-900932206384">' +
            "https://disease.sh/docs</a>",
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
          height: 75 + "%",
          type: "column",
        },
        title: {
          text: "Total And Today Infomation In The Country",
        },
        subtitle: {
          text:
            'Sources: <a href="https://documenter.getpostman.com/view/11144369/Szf6Z9B3?version=latest#ec0c31aa-b666-4603-8d35-900932206384">' +
            "https://disease.sh/docs</a>",
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
        yAxis: [
          {
            min: 0,
            title: {
              text: "Total Case (person)",
              style: {
                color: "rgb(12, 164, 131)",
              },
            },
            labels: {
              style: {
                color: "rgb(12, 164, 131)",
              },
            },
            gridLineColor: "gray",
          },
          {
            min: 0,
            title: {
              text: "Today Case (person)",
              style: {
                color: "rgb(12, 164, 88)",
              },
            },
            labels: {
              style: {
                color: "rgb(12, 164, 88)",
              },
            },
            gridLineColor: "gray",
            opposite: true,
          },
        ],
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
            yAxis: 0,
            data: [
              this.$store.state.focusCountry.cases,
              this.$store.state.focusCountry.deaths,
              this.$store.state.focusCountry.recovered,
            ],
            color: "rgb(12, 164, 131)",
          },
          {
            name: "Today",
            yAxis: 1,
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
    setHistoryDay(val) {
      this.historyday = val;
      this.loadingcase = true;
    },
    setHistoryDay1(val) {
      this.historyday1 = val;
      this.loadingdeath = true;
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
      this.$store.commit("addHistoryApp", payload.nameiso.name);
    } catch (error) {
      alert("khong ton tai nuoc nay chuyen ve trang chu");
      this.$router.push("/");
    }
  },
  created: async function () {
    var config = {
      method: "get",
      url:
        "https://corona.lmao.ninja/v2/historical/" +
        this.$route.params.country +
        "?lastdays=7",
      headers: {},
    };
    try {
      const res = await axios(config);
      this.hisCase = res.data.timeline.cases;
      this.$store.commit("setHistoryCaseFocusCountry", res.data.timeline.cases);
      this.hisDeath = res.data.timeline.deaths;
      this.$store.commit(
        "setHistoryDeathFocusCountry",
        res.data.timeline.deaths
      );
    } catch (error) {
      alert(error);
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
}
</style>
