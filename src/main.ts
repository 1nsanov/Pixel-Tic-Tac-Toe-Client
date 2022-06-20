import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import socketService from './services/socketService'
import store from './store'

const connectLink = location.host === 'localhost:8080' ? 'http://localhost:9000' : 'https://tictactoe-server-1ns.herokuapp.com'
// const connectLink = "https://tictactoe-server-1ns.herokuapp.com";
socketService.connect(connectLink)
  .then(() => {
    console.log('Socket connected to ' + connectLink)
  })
  .catch((err) => {
    console.log("Error ", err);
  });

createApp(App).use(store).use(router).mount('#app')


