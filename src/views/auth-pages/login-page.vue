<template>
  <div class="registration-page">
    <auth-user @confirm="confirm" :isLogin="true"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthUser from "../../components/auth/auth-user.vue";
@Options({
  name: "login-page",
  components: {
    AuthUser,
  },
})
export default class LoginPage extends Vue {

  confirm(){
    console.log("confirm");
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
