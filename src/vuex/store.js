const debug = process.env.NODE_ENV !== 'production';
import Vue from 'vue'

const storeConfig = {
  modules: {},
  getters: {
    getNavigationList: state => {
      return state.navigationList
    },
    getGamesList: state => {
      return state.gamesList
    }
  },
  state: {
    gamesList: [],
    navigationList: []
  },
  mutations: {
    SET_GAMES_LIST: (state, gamesList) => {
      Vue.set(state, 'gamesList', gamesList)
    },
    SET_NAVIGATION_LIST: (state, navigationList) => {
      Vue.set(state, 'navigationList', navigationList)
    }
  },
  actions: {
    SET_GAMES_LIST: ({ commit }, payload) => {
      commit('SET_GAMES_LIST', payload)
    },
    SET_NAVIGATION_LIST: ({ commit }, payload) => {
      commit('SET_NAVIGATION_LIST', payload)
    }
  },
  strict: debug,
};

export default storeConfig;
