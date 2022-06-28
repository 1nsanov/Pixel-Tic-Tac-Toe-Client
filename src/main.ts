import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from './router'
import socketService from './api/services/socketService'
import store from './store'
import '../src/assets/fonts/PlayMeGames/style.css'
import DataSource from './api/dataSource'

const connectLink = location.host === 'localhost:8080' ? 'http://localhost:5000' : 'https://pixel-tic-tac-toe-server.herokuapp.com'
socketService.connect(connectLink)
  .then(() => {
    console.log('Socket connected to ' + connectLink)
  })
  .catch((err) => {
    console.log("Error ", err);
  });

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dataSource: DataSource //don't use kebab-case as key in js
  }
}

const app = createApp(App);
app.config.globalProperties.$dataSource = DataSource;
components(app)
app.use(store).use(router).mount('#app')


