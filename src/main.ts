import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router'
import socketService from './services/socketService'
import store from './store'
import '../src/assets/fonts/PlayMeGames/style.css'

const connectLink = location.host === 'localhost:8080' ? 'http://localhost:5000' : 'https://pixel-checkers-server.herokuapp.com'
// const connectLink = "https://pixel-checkers-server.herokuapp.com";
socketService.connect(connectLink)
  .then(() => {
    console.log('Socket connected to ' + connectLink)
  })
  .catch((err) => {
    console.log("Error ", err);
  });

const app = createApp(App);
components(app)
app.use(store).use(router).mount('#app')


