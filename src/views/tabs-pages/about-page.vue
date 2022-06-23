<template>
  <div class="about-page">
    About
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "about-page",
})
export default class AboutPage extends Vue {
}
</script>

<style lang="less" scoped>
.about-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
}
</style>
