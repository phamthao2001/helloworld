import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    country: [],
    focusCountry: {},
  },
  mutations: {
    setCountry(state, payload) {
      state.country = payload;
    },
    setFocusCountry(state, payload) {
      state.focusCountry = payload;
    },
    addCountry(state, payload){
      state.country.push(payload);
    }
  },
  actions: {
    async getCountry({ commit }) {
      var config = {
        method: 'get',
        url: 'https://corona.lmao.ninja/v2/countries?yesterday&sort',
        headers: { }
      };
      // const options = {
      //   method: "GET",
      //   url: "https://covid-193.p.rapidapi.com/countries",
      //   headers: {
      //     "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      //     "X-RapidAPI-Key":
      //       "b1fe5ba941mshb642dcd2bad7be2p141b4djsndf4f80069002",
      //   },
      // };
      try {
        // const res = await axios.request(options);
        const res= await axios.request(config);
        console.log(res.data);
        const data= res.data;
        data.forEach(item => {
          const payload={
            name: item.country,
            flag: item.countryInfo.flag
          }
          commit("addCountry",payload)
        });
        
        // console.log(res.data.response);
        // const payload = res.data.response;
        // commit("setCountry", payload);
      } catch (error) {
        console(error);
      }
    },
  },
});

export default store;
