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
    historyApp: [],
    historyCaseFocusCountry: {},
    historyDeathFocusCountry: {},
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
    getCate(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.continent));
      return arr;
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
    getDataCaseTotal(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.cases));
      return arr;
    },
    getDataCaseToday(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.todayCases));
      return arr;
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
    getDataDeathTotal(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.deaths));
      return arr;
    },
    getDataDeathToday(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.todayDeaths));
      return arr;
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
    getDataRecoverTotal(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.recovered));
      return arr;
    },
    getDataRecoverToday(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.todayRecovered));
      return arr;
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
    getDataTestTotal(state) {
      var arr = [];
      state.globalInfo.forEach((item) => arr.push(item.tests));
      return arr;
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
    getHistoryApp(state) {
      return state.historyApp;
    },
    getFocusCountryData(state) {
      var data = [
        ["Tên quốc gia", state.focusCountry.nameiso.name],
        ["Kinh độ", state.focusCountry.long],
        ["Vỹ độ", state.focusCountry.lat],
        ["Châu lục", state.focusCountry.continent],
        ["Số ca nhiễm", state.focusCountry.cases],
        ["Số ca nhiễm hôm nay", state.focusCountry.todayCase],
        ["Số ca tích cực", state.focusCountry.active],
        ["Số ca tiêu cực", state.focusCountry.critical],
        ["Số ca tử vong", state.focusCountry.deaths],
        ["Số ca tử vong hôm nay", state.focusCountry.todayDeaths],
        ["Số ca hồi phục", state.focusCountry.recovered],
        ["Số ca hổi phục hôm nay", state.focusCountry.todayrecovered],
        ["Số trường hợp test", state.focusCountry.tests],
      ];
      return data;
    },
    getHisCase(state) {
      const keys = Object.keys(state.historyCaseFocusCountry);
      const values = Object.values(state.historyCaseFocusCountry);
      const length = keys.length;
      var data = [["Ngày", "Số ca nhiễm"]];
      for (var i = 0; i < length; i++) {
        data.push([keys[i], values[i]]);
      }
      return data;
    },
    getHisDeath(state) {
      const keys = Object.keys(state.historyDeathFocusCountry);
      const values = Object.values(state.historyDeathFocusCountry);
      const length = keys.length;
      var data = [["Ngày", "Số ca tử vong"]];
      for (var i = 0; i < length; i++) {
        data.push([keys[i], values[i]]);
      }
      return data;
    },
    getGlobalData(state) {
      var data = [
        [
          "Tên châu lục",
          "Số ca nhiễm",
          "Số ca lành tính",
          "Số ca ác tính",
          "Số ca tử vong",
          "Số ca hồi phục",
          "Số trường hợp đã test",
          "Số ca nhiễm mới",
          "Số ca tử vong mới",
          "Số ca hồi phục mới",
          "Dân số",
        ],
      ];
      const length = state.globalInfo.length;
      var cases = 0,
        active = 0,
        critical = 0,
        deaths = 0,
        recovered = 0,
        test = 0,
        todayCases = 0,
        todayDeaths = 0,
        todayRecovered = 0,
        population = 0;
      for (var i = 0; i < length; i++) {
        data.push([
          state.globalInfo[i].continent,
          state.globalInfo[i].cases,
          state.globalInfo[i].active,
          state.globalInfo[i].critical,
          state.globalInfo[i].deaths,
          state.globalInfo[i].recovered,
          state.globalInfo[i].tests,
          state.globalInfo[i].todayCases,
          state.globalInfo[i].todayDeaths,
          state.globalInfo[i].todayRecovered,
          state.globalInfo[i].population,
        ]);
        cases += state.globalInfo[i].cases;
        active += state.globalInfo[i].active;
        critical += state.globalInfo[i].critical;
        deaths += state.globalInfo[i].deaths;
        recovered += state.globalInfo[i].recovered;
        test += state.globalInfo[i].tests;
        todayCases += state.globalInfo[i].todayCases;
        todayDeaths += state.globalInfo[i].todayDeaths;
        todayRecovered += state.globalInfo[i].todayRecovered;
        population += state.globalInfo[i].population;
      }
      data.push([
        "Tổng cộng",
        cases,
        active,
        critical,
        deaths,
        recovered,
        test,
        todayCases,
        todayDeaths,
        todayRecovered,
        population,
      ]);
      return data;
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
    addHistoryApp(state, payload) {
      if (state.historyApp.length === 0) state.historyApp.push(payload);
      else {
        if (state.historyApp.at(-1) !== payload) {
          if (state.historyApp.length < 10) state.historyApp.push(payload);
          else {
            state.historyApp.shift();
            state.historyApp.push(payload);
          }
        }
      }
    },
    setHistoryCaseFocusCountry(state, payload) {
      state.historyCaseFocusCountry = payload;
    },
    setHistoryDeathFocusCountry(state, payload) {
      state.historyDeathFocusCountry = payload;
    },
  },
  actions: {
    async getCountry({ commit, state }) {
      if (state.country.length !== 0) {
        return;
      }
      var config = {
        method: "get",
        url: "https://disease.sh/v3/covid-19/countries?yesterday=true&sort=true",
        headers: {},
      };
      var key = 1;
      try {
        const res = await axios(config);
        const data = res.data;
        data.forEach((item) => {
          const payload = {
            key: key++,
            nameiso: {
              name: item.country,
              iso: item.countryInfo.iso3,
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
        url: "https://disease.sh/v3/covid-19/continents?yesterday=true&sort=true",
        headers: {},
      };
      try {
        const res = await axios(config);
        console.log(res.data);
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
