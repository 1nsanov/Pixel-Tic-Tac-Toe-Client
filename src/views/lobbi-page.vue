<template>
  <div class="lobbi-page">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor impedit
    voluptas delectus? Est vel nulla molestias beatae quod repellendus, hic,
    doloribus odio blanditiis dolorum enim nostrum voluptate saepe vitae
    quisquam.
    <ui-button @onClick="exit" color="red" size="medium">Exit</ui-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "login-page",
})
export default class LoginPage extends Vue {
  exit() {
    localStorage.removeItem("authUser")
    this.$router.push({ path: "/" });
  }
}
</script>

<style lang="less" scoped>
.lobbi-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
