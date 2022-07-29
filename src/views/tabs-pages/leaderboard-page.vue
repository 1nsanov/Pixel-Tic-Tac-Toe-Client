<template>
  <div class="leaderboard-page" v-if="leaderboard">
    <div class="_scroll">
      <div class="leaderboard_list">
        <div class="leaderboard_list_item header-table">
          <div class="leaderboard_list_item_user table-col">User</div>
          <div class="leaderboard_list_item_total-games table-col">Games</div>
          <div class="leaderboard_list_item_wins table-col">Wins</div>
          <div class="leaderboard_list_item_losses table-col">Losses</div>
          <div class="leaderboard_list_item_winrate table-col">Win rate</div>
          <div class="leaderboard_list_item_score table-col">Score</div>
        </div>
        <div
          class="leaderboard_list_item"
          v-for="user in leaderboard"
          :key="user.UserId"
        >
          <div class="leaderboard_list_item_user table-col">
            {{ user.Nickname }}
          </div>
          <div class="leaderboard_list_item_total-games table-col">
            {{ user.CountFinishedGames }}
          </div>
          <div class="leaderboard_list_item_wins table-col">
            {{ user.CountWins }}
          </div>
          <div class="leaderboard_list_item_losses table-col">
            {{ user.CountLosses }}
          </div>
          <div class="leaderboard_list_item_winrate table-col">
            {{ calcWinRate(user.CountFinishedGames, user.CountWins) }}
          </div>
          <div class="leaderboard_list_item_score table-col">
            {{ user.Score }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import socketService from "@/api/services/socketService";
import leaderboardService from "@/api/services/leaderboardService";
import { Options, Vue } from "vue-class-component";
import LeaderboardItem from "../../api/services/leaderboardService/models/LeaderboardItem";

@Options({
  name: "leaderboard-page",
})
export default class LeaderboardPage extends Vue {
  leaderboard: LeaderboardItem[] | null = null;

  created() {
    this.getLeaderboard();
  }
  async getLeaderboard() {
    if (socketService.socket) {
      await leaderboardService
        .getLeaderboard(socketService.socket)
        .then((res: any) => {
          this.leaderboard = [];
          this.leaderboard = (res.leaderboard as LeaderboardItem[]).filter(
            (u) => u.CountFinishedGames !== 0
          );
          this.leaderboard?.sort((a, b) => b.Score - a.Score);
        })
        .catch((err) => {
          this.leaderboard = [];
          console.log(err);
        });
    }
  }

  calcWinRate(totalGames: number, wins: number) {
    if (totalGames === 0) {
      return `0%`;
    } else {
      return `${Math.round((wins / totalGames) * 100)}%`;
    }
  }
}
</script>

<style lang="less" scoped>
._scroll {
  overflow-x: auto;
  margin: 0 0 20px 0;
  border-radius: 20px;
}
._scroll::-webkit-scrollbar {
  height: 16px;
}
._scroll::-webkit-scrollbar-track {
  border-radius: 100px;
}
._scroll::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 6px solid transparent;
  background-clip: content-box;
  height: 70px;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.leaderboard-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .leaderboard_list {
    min-width: 800px;
    display: flex;
    flex-direction: column;
    border: 2px solid rgb(255, 255, 255);
    background: linear-gradient(
      63.18deg,
      #0f2027 0%,
      #203a43 49.48%,
      #2c5364 100%
    );
    border-radius: 18px;
    box-shadow: 0px 2px 100px 10px rgb(0 0 0 / 40%);
    .leaderboard_list_item {
      display: flex;
      width: 100%;
      .table-col {
        flex: 0 0 16.66666666666667%;
        max-width: 16.66666666666667%;
        min-height: 60px;
        display: flex;
        align-items: center;
        border: 1.5px solid rgb(255, 255, 255);
        padding: 0 10px;
        // word-break: break-all;
      }
      .leaderboard_list_item_user {
        word-break: break-all;
      }
      .leaderboard_list_item_total-games {
      }
      .leaderboard_list_item_wins {
      }
      .leaderboard_list_item_losses {
      }
      .leaderboard_list_item_winrate {
      }
      .leaderboard_list_item_score {
      }
    }
    .leaderboard_list_item:first-child {
      border-radius: 15px 15px 0 0;
      .leaderboard_list_item_user {
        border-radius: 15px 0 0 0;
      }
      .leaderboard_list_item_score {
        border-radius: 0 15px 0 0;
      }
    }
    .leaderboard_list_item:last-child {
      border-radius: 0 0 15px 15px;
      .leaderboard_list_item_user {
        border-radius: 0 0 0 15px;
      }
      .leaderboard_list_item_score {
        border-radius: 0 0 15px 0;
      }
    }
    .header-table {
      background: rgb(255, 255, 255);
      color: #0f2027;
      .table-col {
        justify-content: center;
        font-size: 18px;
        transition: ease-in-out 0.3s;
        cursor: pointer;
      }
      .table-col:hover {
        font-size: 20px;
      }
      .leaderboard_list_item_user {
      }
      .leaderboard_list_item_total-games {
      }
      .leaderboard_list_item_wins {
      }
      .leaderboard_list_item_losses {
      }
      .leaderboard_list_item_winrate {
      }
      .leaderboard_list_item_score {
      }
    }
  }
}
</style>
