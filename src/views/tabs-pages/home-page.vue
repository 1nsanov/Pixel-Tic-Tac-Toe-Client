<template>
  <div class="home-page">
    Home
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "home-page",
})
export default class HomePage extends Vue {
}
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
}
</style>
