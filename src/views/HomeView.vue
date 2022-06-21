<template>
  <div class="home">
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import JoinRoom from "../components/JoinRoom.vue";
import Game from "../components/Game.vue";
import socketService from "../services/socketService";
import authService from "../services/authService";
import IUserModel from "../services/authService/models/IUserModel";

@Options({
  components: {
    JoinRoom,
    Game,
  },
})
export default class HomeView extends Vue {
  name: string = "";
  password: string = "";

  testClick(){
    console.log("testClick");
  }

  async register() {
    const socket = socketService.socket
    if (this.name.length === 0 || this.password.length === 0 || !socket) return;
    let user: IUserModel = {
      name: this.name,
      password: this.password,
    };
    console.log("Registering...", user);
    const registered = await authService.userRegister(socket, user).catch(err => {
      alert(err.error);
    });
    console.log(registered);
    if (registered) {
      console.log("Registered is successful");
    }
    else{
      console.log("Registered is failed");
    }

    this.clearInputs();
  }

  async login(){
    const socket = socketService.socket
    if (!socket) return;
    let user: IUserModel = {
      name: this.name,
      password: this.password,
    };
    console.log("Logging in...", user);
    const loggedIn = await authService.userLogin(socket, user).catch(err => {
      alert(err.error);
    });
    console.log(loggedIn);
    if (loggedIn) {
      console.log("Logged in is successful");
    }
    else{
      console.log("Logged in is failed");
    }

    this.clearInputs();
  }

  clearInputs() {
    this.name = "";
    this.password = "";
  }
}
</script>

<style lang="less" scoped>
// .home {
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   .home_title {
//     font-size: 36px;
//     font-weight: 700;
//     color: rgb(255, 255, 255);
//   }
//   .home_main {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     .input {
//       padding: 6px 12px;
//       border-radius: 8px;
//       border: 2px solid rgb(18, 132, 225);
//       margin: 10px;
//     }
//     .btn {
//       height: 32px;
//       font-weight: 700;
//       padding: 5px;
//       border-radius: 8px;
//       background: rgb(18, 132, 225);
//       color: #fff;
//       cursor: pointer;
//       padding: 0 15px;
//       margin: 5px;
//       min-width: 160px;
//     }
//   }
// }
</style>
