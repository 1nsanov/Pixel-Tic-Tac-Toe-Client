<template>
  <div class="header">
    <div class="header_home _container" v-if="isHome">
      <h1 class="header_home_title">
        pixel <br />
        tic-tac-toe
      </h1>
    </div>
    <div class="header_main _container" v-else>
      <div class="header_main_content">
        <div class="header_main_content_logo">
          <img src="@/assets/icons/logo-tac-tac-toe.svg" />
        </div>
        <div class="header_main_content_game" v-if="$store.state.isGameStarted">
          {{
            $store.state.isPlayerTurn ? "Your turn!" : "Waiting enemy's turn!"
          }}
        </div>
        <nav class="header_main_content_nav" v-else>
          <div
            @click="changeTab(tab.Id)"
            class="header_main_content_nav_item"
            :class="{ active: tab.Id === currentTab }"
            v-for="tab in tabs"
            :key="tab.Id"
          >
            <span>{{ tab.Name }}</span>
            <svg
              v-if="tab.Id === 1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 13L11.293 3.707C11.4805 3.51953 11.7348 3.41422 12 3.41422C12.2652 3.41422 12.5195 3.51953 12.707 3.707L22 13H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H14V15H10V22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V13H2Z"
                fill="#fff"
              />
            </svg>
            <svg
              v-if="tab.Id === 2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 13H16V15H0V13ZM2 9H4V12H2V9ZM5 5H7V12H5V5ZM8 8H10V12H8V8ZM11 2H13V12H11V2Z"
                fill="#fff"
              />
            </svg>
          </div>
        </nav>
        <div class="header_main_content_profile" @click="logout">
          <img src="@/assets/icons/icon-door-exit.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authService from "@/api/services/authService";
import { Options, Vue } from "vue-class-component";
import ITabModel from "@/interfaces/ITabModel";
@Options({
  name: "header-layout",
})
export default class HeaderLayout extends Vue {
  tabs: ITabModel[] = [
    { Id: 1, Name: "Home" },
    {
      Id: 2,
      Name: "Leaderboard",
    },
  ];
  currentTab = 1;

  created() {
    if (this.$route.name === "leaderboard") this.currentTab = 2;
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
        if (this.$route.name !== "home") this.$router.push({ name: "home" });
        break;
      case 2:
        if (this.$route.name !== "leaderboard")
          this.$router.push({ name: "leaderboard" });
        break;
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
      line-height: 90px;
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
      @media screen and (max-width: 768px) {
        font-size: 42px;
        line-height: 60px;
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
        width: 58px;
        @media screen and (max-width: 994px) {
          width: 34px;
          img {
            width: 34px;
          }
        }
      }
      .header_main_content_game {
        font-size: 24px;
        padding: 0 30px;
        text-align: center;
        @media screen and (max-width: 994px) {
          padding: 0 15px;
          font-size: 20px;
          line-height: 24px;
        }
      }
      .header_main_content_nav {
        display: flex;
        max-width: 994px;
        padding: 0 30px;
        width: 100%;
        height: 100%;
        align-items: center;
        @media screen and (max-width: 994px) {
          padding: 0 15px;
        }
        .header_main_content_nav_item {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          font-size: 32px;
          transition: 0.3s ease-in-out;
          color: #ffffff;
          border-bottom: 6px solid #ffffff;
          svg {
            width: 32px;
            height: 32px;
            display: none;
            transition: 0.3s ease-in-out;
            path {
              transition: 0.3s ease-in-out;
            }
          }
          @media screen and (max-width: 994px) {
            font-size: 24px;
            border-bottom: 4px solid #ffffff;
          }
          @media screen and (max-width: 600px) {
            span {
              display: none;
            }
            svg {
              display: block;
            }
          }
        }
        .header_main_content_nav_item:hover {
          font-size: 36px;
          border-bottom: 6px solid #f1ffdf;
          color: #f1ffdf;
          svg {
            path {
              fill: #f1ffdf;
            }
          }
          @media screen and (max-width: 994px) {
            font-size: 26px;
            border-bottom: 4px solid #f1ffdf;
          }
        }
        .active {
          border-bottom: 6px solid #93ee62 !important;
          color: #93ee62 !important;
          svg {
            path {
              fill: #93ee62 !important;
            }
          }
          @media screen and (max-width: 994px) {
            border-bottom: 4px solid #93ee62 !important;
            svg {
              width: 36px;
              height: 36px;
            }
          }
        }
      }

      .header_main_content_profile {
        display: flex;
        justify-content: end;
        width: 58px;
        cursor: pointer;
        @media screen and (max-width: 994px) {
          width: 34px;
          img {
            width: 34px;
          }
        }
      }
      @media screen and (max-width: 994px) {
        padding: 0 15px;
      }
    }
  }
}
</style>