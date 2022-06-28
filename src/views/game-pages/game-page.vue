<template>
  <div class="game-page">
    <div class="game_content">
      <game-tic-tac-toe />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameTicTacToe from "../../components/game-tic-tac-toe.vue";

@Options({
  name: "game-page",
  components: { GameTicTacToe },
})
export default class GamePage extends Vue {}
</script>

<style lang="less" scoped>
.game-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 1s ease-in-out;
  .game_content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
