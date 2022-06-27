<template>
  <div class="game-page">
    <div>
      Game room
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-page",
})
export default class GamePage extends Vue {
}
</script>

<style lang="less" scoped>
.game-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
