import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    country: [],
    focusCountry: {},
    globalInfo: [],
    vietnamInfo: {},
    vietnamHistory: {},
  },
  getters: {
    computeTotalCase(state) {
      var total = 0;
      state.globalInfo.forEach((item) => (total += item.cases));
      return total;
    },
    computeNewCase(state) {
      var total = 0;
      state.globalInfo.forEach((item) => (total += item.todayCases));
      return total;
    },
    getDataAllCountry(state) {
      return state.country;
    },
    getDataCase(state) {
      var data = [];
      state.globalInfo.forEach((item) => {
        data.push({
          name: item.continent,
          total: item.cases,
          today: item.todayCases,
        });
      });
      return data;
    },
    getDataDeath(state) {
      var data = [];
      state.globalInfo.forEach((item) => {
        data.push({
          name: item.continent,
          total: item.deaths,
          today: item.todayDeaths,
        });
      });
      return data;
    },
    getDataRecover(state) {
      var data = [];
      state.globalInfo.forEach((item) => {
        data.push({
          name: item.continent,
          total: item.recovered,
          today: item.todayRecovered,
        });
      });
      return data;
    },
    getDataTest(state) {
      var data = [];
      state.globalInfo.forEach((item) => {
        data.push({
          name: item.continent,
          total: item.tests,
          today: item.population,
        });
      });
      return data;
    },
    getVietnamCase(state) {
      var data = {
        total: state.vietnamInfo.cases,
        new: state.vietnamInfo.todayCases,
      };
      return data;
    },
    getVietnamDeath(state) {
      var data = {
        total: state.vietnamInfo.deaths,
        new: state.vietnamInfo.todayDeaths,
      };
      return data;
    },
    getVietnamRecover(state) {
      var data = {
        total: state.vietnamInfo.recovered,
        new: state.vietnamInfo.todayRecovered,
      };
      return data;
    },
    getVietnamTest(state) {
      var data = {
        total: state.vietnamInfo.tests,
        new: state.vietnamInfo.population,
      };
      return data;
    },
    getVietnamHistoryCase(state) {
      return state.vietnamHistory.cases;
    },
    getVietnamHistoryDeath(state) {
      return state.vietnamHistory.deaths;
    },
    getVietnamHistoryRecover(state) {
      return state.vietnamHistory.recovered;
    },
  },
  mutations: {
    setFocusCountry(state, payload) {
      state.focusCountry = payload;
    },
    addCountry(state, payload) {
      state.country.push(payload);
    },
    setGlobalInfo(state, payload) {
      state.globalInfo = payload;
    },
    setVietnamInfo(state, payload) {
      state.vietnamInfo = payload;
    },
    setVietnamHistory(state, payload) {
      state.vietnamHistory = payload;
    },
  },
  actions: {
    async getCountry({ commit, state }) {
      if (state.country.length !== 0) {
        return;
      }
      var config = {
        method: "get",
        url: "https://corona.lmao.ninja/v2/countries?yesterday&sort",
        headers: {},
      };
      var key = 1;
      try {
        const res = await axios.request(config);
        const data = res.data;
        data.forEach((item) => {
          const payload = {
            key: key++,
            nameiso: {
              name: item.country,
              iso: item.countryInfo.iso2,
            },
            flag: item.countryInfo.flag,
            continent: item.continent,
            cases: item.cases,
            deaths: item.deaths,
            recovered: item.recovered,
            tests: item.tests,
            population: item.population,
          };
          commit("addCountry", payload);
        });
      } catch (error) {
        console(error);
      }
    },
    async getGlobalInfo({ commit }) {
      var config = {
        method: "get",
        url: "https://corona.lmao.ninja/v2/continents?yesterday&sort",
        headers: {},
      };
      try {
        const res = await axios(config);
        commit("setGlobalInfo", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getVietnamInfo({ commit }) {
      var config = {
        method: "get",
        url: "https://disease.sh/v3/covid-19/countries/Vietnam?yesterday=true&strict=true",
        headers: {},
      };
      try {
        const res = await axios(config);
        commit("setVietnamInfo", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getVietnamHistory({ commit }) {
      var config = {
        method: "get",
        url: "https://disease.sh/v3/covid-19/historical/vietnam?lastdays=2",
        headers: {},
      };
      try {
        const res = await axios(config);
        commit("setVietnamHistory", res.data.timeline);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default store;
