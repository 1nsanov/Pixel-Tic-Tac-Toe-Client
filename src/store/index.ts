import { createStore } from 'vuex'

export default createStore({
  state: {
    isInRoom: false,
    playerSymbol: 'x',
    isPlayerTurn: true,
    isGameStarted: false,
    gameEndText: "",
    roomId: ""
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
