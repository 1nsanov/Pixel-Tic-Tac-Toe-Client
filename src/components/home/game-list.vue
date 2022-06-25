<template>
  <div class="game-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-list",
})
export default class GameList extends Vue {}
</script>

<style lang="less">
.game-list {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 5px solid #ffffff;
  border-radius: 20px;
  .game-item {
    margin-bottom: 15px;
  }
  .game-item:last-child {
    margin-bottom: 0px;
  }
}
</style>