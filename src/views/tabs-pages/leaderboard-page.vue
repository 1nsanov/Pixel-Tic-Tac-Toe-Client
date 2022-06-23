<template>
  <div class="leaderboard-page">
    Leaderboard
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "leaderboard-page",
})
export default class LeaderboardPage extends Vue {
}
</script>

<style lang="less" scoped>
.leaderboard-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
}
</style>
