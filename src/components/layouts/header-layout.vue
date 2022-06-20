<template>
  <div class="header">
    <div class="header_container">
      <div class="header_container_main-title">pixel checkers</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {}
</script>

<style lang="less">
.header {
  width: 100%;
  .header_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 15px 0 15px;
    .header_container_main-title {
      text-align: center;
      font-size: 96px;
      line-height: 81px;
      text-decoration: underline;
      text-transform: uppercase;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #bdffe7 99.99%,
        #ffffff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    @media screen and (max-width: 400px) {
      .header_container_main-title {
        font-size: 64px;
        line-height: 54px;
      }
    }
  }
}
</style>