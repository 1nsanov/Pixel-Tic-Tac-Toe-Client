<template>
  <div class="registration-page">
    <auth-user @confirm="confirm"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthUser from "../../components/auth/auth-user.vue";
import IUserForm from "../../interfaces/IUserForm";

@Options({
  name: "registration-page",
  components: {
    AuthUser,
  },
})
export default class RegistrationPage extends Vue {

  confirm(user: IUserForm){
    console.log("register user: ", user);
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
