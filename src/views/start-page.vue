<template>
  <div class="start-page">
    <div class="start-page_register">
      <ui-button :style="styleBtn" @onClick="GoToRegister" size="big"
        >Registration</ui-button
      >
    </div>
    <div class="start-page_login">
      <ui-button :style="styleBtn" @onClick="GoToLogin" color="green" size="big"
        >Login</ui-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "start-page",
})
export default class StartPage extends Vue {
  get styleBtn() {
    return {
      "min-width": "0",
      'height': "100px",
      'width': "100%",
    };
  }

  GoToRegister(){
    this.$router.push({ name: "register" });
  }

  GoToLogin(){
    this.$router.push({ name: "login" });
  }
}
</script>

<style lang="less" scoped>
.start-page {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  .start-page_register {
    margin: 0 0 35px 0;
  }
}
</style>
