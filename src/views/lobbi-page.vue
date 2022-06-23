<template>
  <div class="lobbi-page">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor impedit
    voluptas delectus? Est vel nulla molestias beatae quod repellendus, hic,
    doloribus odio blanditiis dolorum enim nostrum voluptate saepe vitae
    quisquam.
  </div>
</template>

<script lang="ts">
import authService from "@/api/services/authService";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "login-page",
})
export default class LoginPage extends Vue {
}
</script>

<style lang="less" scoped>
.lobbi-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
}
</style>
