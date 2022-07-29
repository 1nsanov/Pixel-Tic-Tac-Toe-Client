<template>
  <div class="registration-page">
    <auth-user @confirm="confirm" :errMsg="errMsg" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthUser from "../../components/auth/auth-user.vue";
import AuthUserModel from "../../api/services/authService/models/AuthUser";
import IUserForm from "../../interfaces/IUserForm";
import moment from "moment";
import socketService from "../../api/services/socketService";
import authService from "../../api/services/authService";

@Options({
  name: "registration-page",
  components: {
    AuthUser,
  },
})
export default class RegistrationPage extends Vue {
  errMsg: string = "";

  async confirm(user: IUserForm) {
    this.errMsg = "";
    const socket = socketService.socket;
    if (!socket) return;
    let newUser = this.createUser(user);
    console.log(newUser);

    await authService
      .userRegister(socket, newUser)
      .then((res) => {
        authService.setCurrentUser(res);
        this.$router.push({ name: "home" });
      })
      .catch((err) => {
        console.log(err);
        this.errMsg = err.error;
      });
  }

  createUser(user: IUserForm) {
    return new AuthUserModel({
      UserId: this.generateIntNumber(100000, 999999),
      Nickname: user.Nickname,
      Password: user.Password,
      AvatarId: this.generateIntNumber(0, 4),
      Score: 200,
      DataRegister: moment().format(),
    });
  }

  generateIntNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
</script>

<style lang="less" scoped>
.registration-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 0 0;
}
</style>
