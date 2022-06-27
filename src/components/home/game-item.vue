<template>
  <div class="game-item">item</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-item",
})
export default class GameItem extends Vue {}
</script>

<style lang="less">
.game-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 3px solid #ffffff;
  border-radius: 10px;
  min-height: 100px;
}
</style>