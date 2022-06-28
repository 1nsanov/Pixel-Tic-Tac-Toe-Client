<template>
  <div class="base-layout">
    <div class="game_start" v-if="!$store.state.isGameStarted && $store.state.isInRoom">
      Waiting connect other player...
    </div>
    <header-layout />
    <content-layout v-if="isLoadedServer">
      <router-view />
    </content-layout>
    <chat v-if="$store.state.isGameStarted"/>
    <!-- <footer-layout /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeaderLayout from "./header-layout.vue";
import ContentLayout from "./content-layout.vue";
import FooterLayout from "./footer-layout.vue";
import socketService from "@/api/services/socketService";
import Chat from "../chat/chat.vue"
@Options({
  name: "base-layout",
  components: {
    HeaderLayout,
    ContentLayout,
    FooterLayout,
    Chat
  },
})
export default class BaseLayout extends Vue {
  isLoading: boolean = false;
  isLoadedSocket: boolean = false;
  isConnectDB: boolean = false;

  async created() {
    await this.Timeout();
  }

  async Timeout() {
    const interval = setInterval(async () => {
      this.isLoading = socketService.isLoading;
      this.isLoadedSocket = socketService.isLoadedSocket;
      await socketService
        .checkStatusDB()
        .then((res: any) => (this.isConnectDB = res.statusDB))
        .catch((err) => console.log(err));
      console.log(socketService.isLoading, socketService.isLoadedSocket, this.isConnectDB);
      if (this.isLoadedServer) clearInterval(interval);
    }, 100);
  }

  get isLoadedServer(): boolean {
    return this.isLoading && this.isLoadedSocket && this.isConnectDB;
  }
}
</script>

<style lang="less">
html,
body {
  font-family: "LightPixel";
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    63.18deg,
    #0f2027 0%,
    #203a43 49.48%,
    #2c5364 100%
  );
}
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
}
</style>