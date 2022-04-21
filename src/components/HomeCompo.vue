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

  <!-- data vietnam -->

    <a-row>

    </a-row>

  </a-layout-content>
</template>

<script>
import AnInfo from "./AnInfo.vue";

export default {
  components: { AnInfo },
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
          width: '13%',
          filters: [
            { text: 'Asia', value: 'Asia' },
            { text: 'North America', value: 'North America' },
            { text: 'South America', value: 'South America' },
            { text: 'Europe', value: 'Europe' },
            { text: 'Australia-Oceania', value: 'Australia-Oceania' },
            { text: 'Africa', value: 'Africa' },
          ],
          onFilter: (value, record) => record.continent.includes(value),
        },
        {
          title: "Population",
          dataIndex: "population",
          key: "population",
          width: '13%',
          sorter: (a, b) => a.population - b.population,
        },
        {
          title: "Case",
          dataIndex: "cases",
          key: "cases",
          width: '13%',
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Death",
          key: "deaths",
          dataIndex: "deaths",
          width: '13%',
          sorter: (a, b) => a.deaths - b.deaths,
        },
        {
          title: "Recovered",
          key: "recovered",
          dataIndex: "recovered",
          width: '13%',
          sorter: (a, b) => a.recovered - b.recovered,
        },
        {
          title: "Test",
          key: "test",
          dataIndex: "tests",
          width: '13%',
          sorter: (a, b) => a.tests - b.tests,
        },
      ],
    };
  },
  methods: {
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
  },
  created: function () {
    this.$store.dispatch("getGlobalInfo");
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
::-webkit-scrollbar{
  display: block;
}
</style>
