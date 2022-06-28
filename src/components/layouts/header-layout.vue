<template>
  <div class="header">
    <div class="header_home _container" v-if="isHome">
      <h1 class="header_home_title">pixel tic-tac-toe</h1>
    </div>
    <div class="header_main _container" v-else>
      <div class="header_main_content">
        <div class="header_main_content_logo">pixel tic-tac-toe</div>
        <div class="header_main_content_game" v-if="$store.state.isGameStarted">
          We play!
        </div>
        <nav class="header_main_content_nav" v-else>
          <div
            @click="changeTab(tab.Id)"
            class="header_main_content_nav_item"
            :class="{ active: tab.Id === currentTab }"
            v-for="tab in tabs"
            :key="tab.Id"
          >
            {{ tab.Name }}
          </div>
        </nav>
        <div class="header_main_content_profile" @click="logout">exit</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authService from "@/api/services/authService";
import { Options, Vue } from "vue-class-component";
import ITabModel from "../../interfaces/ITabModel";
@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {
  tabs: ITabModel[] = [
    { Id: 1, Name: "Home" },
    { Id: 2, Name: "Leaderboard" },
  ];
  currentTab = 1;

  created(){
    if(this.$route.name === "leaderboard") this.currentTab = 2;
  }

  get isHome(): boolean {
    return (
      this.$route.name === "start" ||
      this.$route.name === "login" ||
      this.$route.name === "register"
    );
  }

  changeTab(id: number) {
    this.currentTab = id;
    switch (id) {
      case 1:
        if(this.$route.name !== "home") this.$router.push({ name: "home"})
        break;
      case 2:
        if(this.$route.name !== "leaderboard") this.$router.push({ name: "leaderboard"})
        break;
      // case 3:
      //   if(this.$route.name !== "about") this.$router.push({ name: "about"})
      //   break;
      default:
        break;
    }
  }

  logout() {
    authService.logout();
  }
}
</script>

<style lang="less">
.header {
  width: 100%;
  ._container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header_home {
    padding: 50px 15px 0 15px;
    text-decoration: underline;
    color: #bdffe7;
    .header_home_title {
      text-align: center;
      font-size: 64px;
      line-height: 81px;
      text-transform: uppercase;
      text-decoration: underline;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #bdffe7 99.99%,
        #ffffff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      // text-fill-color: transparent;
    }
    @media screen and (max-width: 650px) {
      .header_home_title {
        font-size: 64px;
      }
    }
  }
  .header_main {
    height: 100px;
    background: linear-gradient(
      63.18deg,
      #0f2027 0%,
      #203a43 49.48%,
      #2c5364 100%
    );
    box-shadow: 0px 2px 100px 10px rgba(0, 0, 0, 0.7);
    @media screen and (max-width: 994px) {
      height: 75px;
    }
    .header_main_content {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      .header_main_content_logo {
        width: 100px;
      }
      .header_main_content_nav {
        display: flex;
        max-width: 994px;
        padding: 0 15px;
        width: 100%;
        height: 100%;
        align-items: center;
        .header_main_content_nav_item {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          font-size: 32px;
          transition: all ease 0.3s;
          color: #ffffff;
          border-bottom: 6px solid #ffffff;
          @media screen and (max-width: 994px) {
            font-size: 24px;
            border-bottom: 4px solid #ffffff;
          }
        }
        .header_main_content_nav_item:hover {
          font-size: 36px;
          color: #f1ffdf;
          border-bottom: 6px solid #f1ffdf;
          @media screen and (max-width: 994px) {
            font-size: 26px;
            border-bottom: 4px solid #f1ffdf;
          }
        }
        .active {
          color: #93ee62 !important;
          border-bottom: 6px solid #93ee62 !important;
          @media screen and (max-width: 994px) {
            border-bottom: 4px solid #93ee62 !important;
          }
        }
      }

      .header_main_content_profile {
        display: flex;
        justify-content: end;
        width: 100px;
        cursor: pointer;
      }
      @media screen and (max-width: 994px) {
        padding: 0 15px;
      }
    }
  }
}
</style>