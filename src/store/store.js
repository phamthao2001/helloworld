import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    country: [],
    focusCountry: "",
  },
  mutations: {
    setCountry(state, payload) {
      state.country = payload;
    },
    setFocusCountry(state, payload) {
      state.focusCountry = payload;
    },
  },
  actions: {
    async getCountry({ commit }) {
      const options = {
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/countries",
        headers: {
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
          "X-RapidAPI-Key":
            "b1fe5ba941mshb642dcd2bad7be2p141b4djsndf4f80069002",
        },
      };
      try {
        const res = await axios.request(options);
        console.log(res.data.response);
        const payload = res.data.response;
        commit("setCountry", payload);
      } catch (error) {
        console(error);
      }
    },
  },
});

export default store;
