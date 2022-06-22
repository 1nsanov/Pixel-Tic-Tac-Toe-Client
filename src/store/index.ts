import { createStore } from 'vuex'
import AuthUser from '../api/services/authService/models/AuthUser'

export default createStore({
  state: {
    AuthUser: null,

    isInRoom: false,
    playerSymbol: 'x',
    isPlayerTurn: true,
    isGameStarted: false,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {

  }
})
