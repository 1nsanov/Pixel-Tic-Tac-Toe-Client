<template>
  <div class="home-page">
    <div class="home-page_description">
      Here you can create a new room to play or join with an existing one! It is
      enough to enter the desired name or enter the room code that a friend gave
      you <span> (If you have Friends)</span>
    </div>
    <div class="home-page_create">
      <ui-input
        placeholder="Input name game"
        :style="{ marginBottom: `20px` }"
        v-model="roomId"
      />
      <ui-button size="medium" @onClick="joinGame" :disabled="isLoading">
        Create/Join game
      </ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameList from "../../components/home/game-list.vue";
import GameItem from "../../components/home/game-item.vue";
import socketService from "@/api/services/socketService";
import gameService from "@/api/services/gameService";

@Options({
  name: "home-page",
  components: { GameList, GameItem },
})
export default class HomePage extends Vue {
  roomId: string = "";
  isLoading: boolean = false;

  async joinGame() {
    console.log("Joining...");

    const socket = socketService.socket;
    if (!this.roomId || this.roomId.trim() === "" || !socket) return;
    this.isLoading = true;

    const joined = await gameService
      .joinGameRoom(socket, this.roomId)
      .catch((err) => alert(err.error));

    if (joined) {
      console.log("Joined room ", this.roomId);
      this.$store.state.isInRoom = true;
      this.$store.state.roomId = this.roomId;
      this.$router.push({ name: "game", params: { id: this.roomId } });
    } else {
      console.log("Room not found");
    }

    this.isLoading = false;
  }
}
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 150px;
  .home-page_description {
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 25px;
    cursor: default;
    span {
      text-decoration: underline;
    }
    @media screen and (max-width: 767px) {
      font-size: 16px;
      line-height: 26px;
    }
  }
  .home-page_create {
    display: flex;
    flex-direction: column;
    // margin-bottom: 30px;
  }
}
</style>
