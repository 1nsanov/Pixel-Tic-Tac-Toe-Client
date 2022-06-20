<template>
  <div class="game-container">
    <h2 v-if="!$store.state.isGameStarted">
      Waiting for other player to join to start the game
    </h2>
    <div
      class="player-stopper"
      v-if="!$store.state.isGameStarted || !$store.state.isPlayerTurn"
    ></div>
    <div class="row-container" v-for="(row, rowIdx) in matrix">
      <div
        class="cell"
        v-for="(column, columnIdx) in row"
        @click="updateGameMatrix(columnIdx, rowIdx, $store.state.playerSymbol)"
      >
        <span class="X" v-if="column === 'x'"></span>
        <span class="O" v-if="column === 'o'"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { IPlayMatrix } from "../interfaces/IPlayMatrix";
import gameService from "../services/gameService";
import socketService from "../services/socketService";
import IStartGame from "../interfaces/IStartGame";
import { watchEffect } from "vue";

export default class JoinRoom extends Vue {
  matrix: IPlayMatrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  result: [boolean, boolean] = [false, false];

  created(){
    watchEffect(() => {
      this.handleGameUpdate();
      this.handleGameStart();
      this.onMatrixChanged();
      this.handleGameWin();
    });
  }

  setMatrix(matrix: IPlayMatrix) {
    this.matrix = matrix;
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

  updateGameMatrix(column: number, row: number, value: "x" | "o") {
    const newMatrix = [...this.matrix];
    if (newMatrix[row][column] === null) {
      newMatrix[row][column] = value;
      this.setMatrix(newMatrix);
    }
    if (socketService.socket){
      gameService.updateGame(socketService.socket, newMatrix);
      this.setPlayerTurn(false);
    }
  }

  handleGameUpdate() {
    if (socketService.socket) {
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        this.setMatrix(newMatrix);
        this.setPlayerTurn(true);
      });
    }
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

  handleGameWin(){
    if(socketService.socket){
      gameService.onGameWin(socketService.socket, (message) => {
        this.setPlayerTurn(false)
        setTimeout(() => {
          alert(message)
        }, 250)
      })
    }
  }

  @Watch("matrix", { immediate: true })
  onMatrixChanged() {
    console.log("checkGameState");
    this.result = this.checkGameState(this.matrix);
    this.printMessageWin();
  }

  checkGameState(matrix: IPlayMatrix): [boolean, boolean]{
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === this.$store.state.playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== this.$store.state.playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === this.$store.state.playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== this.$store.state.playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === this.$store.state.playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === this.$store.state.playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    //Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  printMessageWin() {
    let text = ""
    if (this.result[0]) {
      text = "You won!";
    } else if (this.result[1]) {
      text = "You lost!";
    } else if (this.result[0] && this.result[1]) {
      text = "Tie!";
    }

    if (text !== "" && socketService.socket) {
      gameService.gameWin(socketService.socket, text)
      setTimeout(() => {
        alert(text)
      }, 250)
    }
  }
}
</script>

<style lang="less" scoped>
.game-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.row-container {
  width: 100%;
  display: flex;
}
.cell {
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  border-top: 3px solid rgb(18, 132, 225);
  border-left: 3px solid rgb(18, 132, 225);
  border-bottom: 3px solid rgb(18, 132, 225);
  border-right: 3px solid rgb(18, 132, 225);
  transition: all 270ms ease-in-out;
  &:hover {
    background-color: rgba(18, 132, 225, 20%);
  }
}
.player-stopper {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: null;
  left: null;
  z-index: 99;
  cursor: default;
}
.X {
  font-size: 100px;
  color: rgb(18, 132, 225);
  &::after {
    content: "X";
  }
}
.O {
  font-size: 100px;
  color: rgb(18, 132, 225);
  &::after {
    content: "O";
  }
}
</style>