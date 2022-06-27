<template>
  <div class="game-page">
    <!-- <div
      class="game_stopper"
      v-if="!$store.state.isGameStarted || !$store.state.isPlayerTurn"
    >
      Waiting...
    </div> -->
    <div class="game_content">
      <div class="checker white_checker" style="display: none"></div>
      <div class="checker black_checker" style="display: none"></div>

      <div class="square" style="display: none" id="ht"></div>
      <div class="black_background" id="black_background"></div>

      <div class="score" id="score">
        <br />
      </div>
      <div class="table" id="table">
        <div class="checker white_checker" v-for="item in 12" :key="item"></div>
        <div class="checker black_checker" v-for="item in 12" :key="item"></div>

        <div
          class="square"
          v-for="item in 64"
          :key="item"
          :class="{ black_square: setColorSquare(item), white_square: !setColorSquare(item) }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gameService from "@/api/services/gameService";
import socketService from "@/api/services/socketService";
import IStartGame from "@/interfaces/IStartGame";
import { watchEffect } from "@vue/runtime-core";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "game-page",
})
export default class GamePage extends Vue {
  created() {
    watchEffect(() => {
      this.handleGameStart();
      // this.handleGameUpdate();
      // this.onMatrixChanged();
      // this.handleGameWin();
    });
  }

  setPlayerTurn(isPlayerTurn: boolean) {
    this.$store.state.isPlayerTurn = isPlayerTurn;
  }
  setPlayerSymbol(playerSymbol: string) {
    this.$store.state.playerSymbol = playerSymbol;
  }
  setGameStarted(isGameStarted: boolean) {
    this.$store.state.isGameStarted = isGameStarted;
  }

  handleGameStart() {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (options: IStartGame) => {
        console.log("handleGameStart", options);
        this.setGameStarted(true);
        this.setPlayerSymbol(options.symbol);
        this.setPlayerTurn(options.start);
      });
    }
  }

  setColorSquare(index: number){
    let numberRow = Math.ceil(index / 8);
    console.log(numberRow);
    if(numberRow % 2 === 0){
      return index % 2 === 0
    }
    else{
      return index % 2 === 1
    }
  }
}
</script>

<style lang="less" scoped>
.game-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 1s ease-in-out;
  .game_stopper {
  }
  .game_content {
    // display: flex;
    // flex-direction: column;
    width: 100%;
  }
}
</style>

<style lang="less" scoped>
.square {
  float: left;
  width: 80px;
  height: 80px;
}

.white_square {
  background-color: #f0d2b4;
}
.black_square {
  background-color: #ba7a3a;
}
.clear_float {
  clear: both;
}

.table {
  position: relative;
  width: 640px;
  height: 640px;
  margin: 0 auto;
}
.score {
  background-color: #1aaaad;
  color: white;
  display: none;
  font-size: 45px;
  font-weight: 900;
  height: 150px;
  border-radius: 10%;
  left: 0px;
  letter-spacing: 1px;
  margin: 0 auto;
  padding-top: 30px;
  overflow: hidden;
  position: absolute;
  right: 0px;
  text-align: center;
  top: 15%;
  width: 200px;
  z-index: 8;
  font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
  -webkit-transition: 5s ease-in-out;
  -moz-transition: 5s ease-in-out;
  -o-transition: 5s ease-in-out;
  transition: 5s ease-in-out;
}

.checker {
  top: 10px;
  left: 10px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  position: absolute;
  border: 4px solid white;
  cursor: pointer;
}

.white_checker {
  background: #cc0000;
  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.black_checker {
  background: #00001f;
  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.black_background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 7;
  display: none;
}

@media only screen and (max-width: 640px) {
  .table {
    width: 400px;
    height: 400px;
  }

  .square {
    width: 50px;
    height: 50px;
  }

  .checker {
    width: 32px;
    height: 32px;
  }
}
</style>
