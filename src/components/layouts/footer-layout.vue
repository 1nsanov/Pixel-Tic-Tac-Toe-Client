<template>
  <div class="footer-layout">
    footer
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "footer-layout",
})
export default class FooterLayout extends Vue {}
</script>

<style lang="less">
.footer-layout {
  margin-top:auto; 
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>