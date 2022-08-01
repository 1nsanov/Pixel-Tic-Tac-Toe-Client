<template>
  <div class="game-end" v-if="$store.state.gameEndText.length > 0">
    <div class="game-end_container">
      <div class="game-end_container_content">
        <div
          class="game-end_container_content_text"
          v-html="$store.state.gameEndText"
        ></div>
        <ui-button @onClick="clearText" size="big" color="green">
          Good!
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-end",
})
export default class GameEnd extends Vue {
  clearText() {
    this.$store.state.gameEndText = "";
    this.$router.push({ path: "/home" });
  }
}
</script>

<style lang="less">
.game-end {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 50px;
  line-height: 80px;
  z-index: 100;
  @media screen and(max-width: 767px){
    font-size: 40px;
  line-height: 60px;
  }
  .game-end_container {
    background: linear-gradient(
      63.18deg,
      #0f2027 0%,
      #203a43 49.48%,
      #2c5364 100%
    );
    border: 3px solid #ffffff;
    border-radius: 20px;
    padding: 25px;
    max-width: 400px;
    .game-end_container_content {
      display: flex;
      flex-direction: column;
      .game-end_container_content_text {
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
}
</style>