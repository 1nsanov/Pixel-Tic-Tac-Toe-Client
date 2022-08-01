<template>
  <div
    class="game_start"
    v-if="!$store.state.isGameStarted && $store.state.isInRoom"
  >
    <span>
      Room: <b>{{ this.$store.state.roomId }}</b>
    </span>
    <br />
    Waiting connect other player...
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-start",
})
export default class GameStart extends Vue {}
</script>

<style lang="less">
.game_start {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 50px;
  line-height: 65px;
  z-index: 100;
  span {
    b {
      color: rgb(139, 226, 26);
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 36px;
    line-height: 52px;
  }
}
</style>

