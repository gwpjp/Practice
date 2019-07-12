import Vue from 'vue';
import Vuex from 'vuex';
import questions from '../api/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions,
  },
});
