import { createStore } from 'vuex'
import AuthUser from '../interfaces/AuthUser'

export default createStore({
  state: {
    AuthUser: new AuthUser(),

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
