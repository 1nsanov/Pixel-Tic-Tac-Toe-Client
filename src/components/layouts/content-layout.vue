<template>
  <div class="content-layout">
    <div class="content-layout_container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "content-layout",
})
export default class ContentLayout extends Vue {}
</script>

<style lang="less">
.content-layout {
  width: 100%;
  // height: 100%;
  margin-top: 30px;
  .content-layout_container {
    margin: 0 auto;
    max-width: 994px;
    padding: 0 15px;
    height: 100%;
  }
}
</style>