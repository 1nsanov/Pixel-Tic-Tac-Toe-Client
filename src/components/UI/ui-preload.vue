<template>
  <div class="ui-preload" :style="switcherVisible(isLoad)">
    <div class="ui-preload_content">
      <div class="ui-preload_content_block">
        <h1><span>pixel</span> <span>tic-tac-toe</span></h1>
        <img src="@/assets/icons/icon-load-main.svg" alt="" />
      </div>
    </div>
  </div>
  <div class="content-wrapper" :style="switcherVisible(!isLoad)">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "ui-preload",
})
export default class UiPreload extends Vue {
  @Prop({ default: false }) isLoad!: boolean;

  switcherVisible(visible: boolean) {
    return {
      opacity: visible ? `1` : `0`,
      visibility: visible ? `visible` : `hidden`,
    };
  }
}
</script>

<style lang="less" scoped>
.ui-preload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  .ui-preload_content {
    padding: 0 15px;
    .ui-preload_content_block {
      display: flex;
      flex-direction: column;
      width: 100%;
      h1 {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 64px;
        line-height: 81px;
        text-transform: uppercase;
        text-decoration: underline;
        background: linear-gradient(
          180deg,
          #1d3f72 0%,
          #5699d2 99.99%,
          #1d3f72 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        span:first-child {
          margin-right: 35px;
        }
      }
      img {
        margin: -50px 0;
        max-height: 200px;
      }
      @media screen and (max-width: 800px) {
        h1 {
          flex-direction: column;
          span:first-child {
            margin-right: 0;
          }
        }
      }
      @media screen and (max-width: 530px) {
        h1 {
          font-size: 42px;
          line-height: 53px;
        }
      }
    }
  }
}
.content-wrapper {
  // transition: all 0.3s ease-in-out;
  height: 100%;
}
</style>