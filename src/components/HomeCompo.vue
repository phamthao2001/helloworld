<template>
  <a-layout-content class="home">
    <!-- data continent -->

    <a-row style="margin-top: 20px">
      <a-col>
        <a-row type="flex" justify="center">
          <span style="font-size: 25px; margin-bottom: 10px"
            >Global Information Covid-19</span
          >
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="22">
            <a-row
              class="wrapper"
              type="flex"
              justify="space-around"
              align="middle"
            >
              <an-info
                maintitle="Case"
                iconClass="fa-solid fa-viruses"
                subtitle="Today Case"
                :data="getDataCase()"
              />
              <an-info
                maintitle="Death"
                subtitle="Today Death"
                iconClass="fa-solid fa-skull"
                :data="getDataDeath()"
              />
              <an-info
                maintitle="Recovered"
                subtitle="Today Recovered"
                iconClass="fa-solid fa-heart-circle-check"
                :data="getDataRecover()"
              />
              <an-info
                maintitle="Test"
                iconClass="fa-solid fa-shield-virus"
                subtitle="Population"
                :data="getDataTest()"
              />
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- sheet data continent -->

    <a-row type="flex" justify="center" style="margin-top: 15px">
      <a-col span="22" style="background: rgba(255, 255, 255, 0.659)">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="Total">
            <highcharts :options="totalChart()"></highcharts>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Today"> <highcharts :options="todayChart()"></highcharts> </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>

    <!-- data vietnam -->

    <a-row style="margin-top: 20px; margin-bottom: 15px">
      <a-col>
        <a-row type="flex" justify="center">
          <span style="font-size: 25px; margin-bottom: 10px"
            >Vietnam
            <a-avatar
              :src="`https://disease.sh/assets/img/flags/vn.png`"
              style="margin-bottom: 10px"
            />
            Information Covid-19
          </span>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="22">
            <a-row
              class="wrapper"
              type="flex"
              justify="space-around"
              align="middle"
            >
              <an-info
                maintitle="Case"
                iconClass="fa-solid fa-viruses"
                subtitle="Today Case"
                :countrydata="getVietnamCase()"
                :historydata="getVietnamHisCase()"
              />
              <an-info
                maintitle="Death"
                subtitle="Today Death"
                iconClass="fa-solid fa-skull"
                :countrydata="getVietnamDeath()"
                :historydata="getVietnamHisDeath()"
              />
              <an-info
                maintitle="Recovered"
                subtitle="Today Recovered"
                iconClass="fa-solid fa-heart-circle-check"
                :countrydata="getVietnamRecover()"
                :historydata="getVietnamHisRecover()"
              />
              <an-info
                maintitle="Test"
                iconClass="fa-solid fa-shield-virus"
                subtitle="Population"
                :countrydata="getVietnamTest()"
              />
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- table data global -->

    <a-row type="flex" justify="center" style="margin-top: 15px">
      <a-col :span="22">
        <a-table
          :columns="columns"
          :data-source="this.$store.getters.getDataAllCountry"
          bordered
          :scroll="{ x: 1300 }"
        >
          <span slot="country" slot-scope="country">
            <span>
              <a-avatar
                :src="`https://countryflagsapi.com/png/${country.iso}`"
                style="margin-bottom: 10px"
              />
              {{ country.name }}
            </span>
          </span>
        </a-table>
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script>
import AnInfo from "./AnInfo.vue";
import { Chart } from "highcharts-vue";

export default {
  components: { AnInfo, highcharts: Chart },
  data() {
    return {
      columns: [
        {
          title: "Country Name",
          dataIndex: "nameiso",
          key: "country",
          scopedSlots: { customRender: "country" },
        },
        {
          title: "Continent",
          dataIndex: "continent",
          key: "continent",
          width: "13%",
          filters: [
            { text: "Asia", value: "Asia" },
            { text: "North America", value: "North America" },
            { text: "South America", value: "South America" },
            { text: "Europe", value: "Europe" },
            { text: "Australia-Oceania", value: "Australia-Oceania" },
            { text: "Africa", value: "Africa" },
          ],
          onFilter: (value, record) => record.continent.includes(value),
        },
        {
          title: "Population",
          dataIndex: "population",
          key: "population",
          width: "13%",
          sorter: (a, b) => a.population - b.population,
        },
        {
          title: "Case",
          dataIndex: "cases",
          key: "cases",
          width: "13%",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Death",
          key: "deaths",
          dataIndex: "deaths",
          width: "13%",
          sorter: (a, b) => a.deaths - b.deaths,
        },
        {
          title: "Recovered",
          key: "recovered",
          dataIndex: "recovered",
          width: "13%",
          sorter: (a, b) => a.recovered - b.recovered,
        },
        {
          title: "Test",
          key: "test",
          dataIndex: "tests",
          width: "13%",
          sorter: (a, b) => a.tests - b.tests,
        },
      ],
    };
  },
  methods: {
    totalChart() {
      var obj = {
        chart: {
          type: "column",
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: this.$store.getters.getCate,
          crosshair: true,
        },
        yAxis: [
          {
            min: 0,
            title: {
              text: "Case (person)",
              style: {
                color: "black",
              },
            },
            labels: {
              formatter: function () {
                return this.value / 1000000 + "M";
              },
              style: {
                color: "black",
              },
            },
          },
          {
            min: 0,
            title: {
              text: "Death (person)",
              style: {
                color: "red",
              },
            },
            labels: {
              formatter: function () {
                return this.value / 1000000 + "M";
              },
              style: {
                color: "red",
              },
            },
          },
          {
            min: 0,
            title: {
              text: "Test (person)",
              style: {
                color: "gray",
              },
            },
             labels: {
              formatter: function () {
                return this.value / 1000000000 + "B";
              },
              style: {
                color: "gray",
              },
            },
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
            name: "Cases",
            yAxis: 0,
            color:"yellow",
            data: this.$store.getters.getDataCaseTotal,
          },
          {
            name: "Death",
            yAxis: 1,
            color:"red",
            data: this.$store.getters.getDataDeathTotal,
          },
          {
            name: "Recovered",
            yAxis: 0,
            color:"green",
            data: this.$store.getters.getDataRecoverTotal,
          },
          {
            name: "Test",
            yAxis: 2,
            color:"gray",
            data: this.$store.getters.getDataTestTotal,
          },
        ],
      };
      return obj;
    },
    todayChart() {
      var obj = {
        chart: {
          type: "column",
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: this.$store.getters.getCate,
          crosshair: true,
        },
        yAxis: [
          {
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
          },
          {
            min: 0,
            title: {
              text: "Death (person)",
              style: {
                color: "red",
              },
            },
            labels: {
              style: {
                color: "red",
              },
            },
            opposite: true,
          },
          {
            min: 0,
            title: {
              text: "Recovered (person)",
              style: {
                color: "gray",
              },
            },
             labels: {
              style: {
                color: "gray",
              },
            },
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
            name: "Cases",
            yAxis: 0,
            color:"black",
            data: this.$store.getters.getDataCaseToday,
          },
          {
            name: "Death",
            yAxis: 1,
            color:"red",
            data: this.$store.getters.getDataDeathToday,
          },
          {
            name: "Recovered",
            yAxis: 2,
            color:"gray",
            data: this.$store.getters.getDataRecoverToday,
          },
        ],
      };
      return obj;
    },
    getDataCase() {
      return this.$store.getters.getDataCase;
    },
    getDataDeath() {
      return this.$store.getters.getDataDeath;
    },
    getDataRecover() {
      return this.$store.getters.getDataRecover;
    },
    getDataTest() {
      return this.$store.getters.getDataTest;
    },
    getVietnamCase() {
      return this.$store.getters.getVietnamCase;
    },
    getVietnamDeath() {
      return this.$store.getters.getVietnamDeath;
    },
    getVietnamRecover() {
      return this.$store.getters.getVietnamRecover;
    },
    getVietnamTest() {
      return this.$store.getters.getVietnamTest;
    },
    getVietnamHisCase() {
      return this.$store.getters.getVietnamHistoryCase;
    },
    getVietnamHisDeath() {
      return this.$store.getters.getVietnamHistoryDeath;
    },
    getVietnamHisRecover() {
      return this.$store.getters.getVietnamHistoryRecover;
    },
  },
  created: function () {
    this.$store.dispatch("getGlobalInfo");
    this.$store.dispatch("getVietnamInfo");
    this.$store.dispatch("getVietnamHistory");
    this.$store.commit("setFocusCountry",{});
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background: rgb(232, 241, 237);
  background: linear-gradient(
    180deg,
    rgba(232, 241, 237, 1) 0%,
    rgba(2, 130, 157, 0.9940125708486519) 100%
  );
}
.wrapper {
  background: rgba(255, 255, 255, 0.659);
  padding: 20px 0px;
  border-radius: 10px;
  align-items: center;
}
::-webkit-scrollbar {
  display: block;
}
</style>
