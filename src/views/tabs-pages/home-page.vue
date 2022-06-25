<template>
  <div class="home-page">
    <div class="home-page_create">
      <ui-button size="medium"
        >Create game <img src="../../assets/icons/board-plus.svg" alt="" />
      </ui-button>
    </div>
    <div class="home-page_game-list">
      <game-list>
        <game-item />
        <game-item />
        <game-item />
      </game-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameList from "../../components/home/game-list.vue";
import GameItem from "../../components/home/game-item.vue";

@Options({
  name: "home-page",
  components: { GameList, GameItem },
})
export default class HomePage extends Vue {}
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .home-page_create {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .home-page_game-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
