<template>
  <div class="registration-page">
    <auth-user @confirm="confirm" :errMsg="errMsg" :isLogin="true" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import authService from "@/api/services/authService";
import socketService from "@/api/services/socketService";
import AuthUser from "../../components/auth/auth-user.vue";
import IUserForm from "@/interfaces/IUserForm";

@Options({
  name: "login-page",
  components: {
    AuthUser,
  },
})
export default class LoginPage extends Vue {
  errMsg: string = "";

  async confirm(user: IUserForm) {
    const socket = socketService.socket;
    if (!socket) return;
    // console.log(user);
    await authService
      .userLogin(socket, user)
      .then((res) => {
        localStorage.setItem("authUser", JSON.stringify(res));
        this.$router.push({ name: "lobbi" });
      })
      .catch((err) => {
        console.log(err);
        this.errMsg = err.error;
      });
  }
}
</script>

<style lang="less" scoped>
.registration-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
