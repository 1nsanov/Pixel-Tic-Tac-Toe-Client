<template>
  <div class="home-page">
    <div class="home-page_register">
      <ui-button :style="styleBtn" @onClick="GoToRegister" size="big"
        >Registration</ui-button
      >
    </div>
    <div class="home-page_login">
      <ui-button :style="styleBtn" @onClick="GoToLogin" color="green" size="big"
        >Login</ui-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "home-page",
})
export default class HomePage extends Vue {
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
    // this.$router.push({ name: "login" });
  }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  .home-page_register {
    margin: 0 0 35px 0;
  }
}
</style>
