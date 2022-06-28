<template>
  <div
    class="game_start"
    v-if="!$store.state.isGameStarted && $store.state.isInRoom"
  >
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
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 60px;
  line-height: 75px;
  z-index: 100;
}
</style>

