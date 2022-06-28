<template>
  <div class="game-container">
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
import gameService from "../api/services/gameService";
import socketService from "../api/services/socketService";
import IStartGame from "../interfaces/IStartGame";
import { watchEffect } from "vue";
import authService from "@/api/services/authService";

export default class GameTicTacToe extends Vue {
  matrix: IPlayMatrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  result: [boolean, boolean] = [false, false];
  endGame = false;

  created() {
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
    if (!this.$store.state.isPlayerTurn) return;
    const newMatrix = [...this.matrix];
    if (newMatrix[row][column] === null) {
      newMatrix[row][column] = value;
      this.setMatrix(newMatrix);
    }
    if (socketService.socket) {
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
        this.setPlayerTurn(!options.start);
      });
    }
  }

  handleGameWin() {
    if (socketService.socket) {
      gameService.onGameWin(socketService.socket, (message) => {
        this.setPlayerTurn(false);
        setTimeout(() => {
          alert(message);
        }, 250);
      });
    }
  }

  @Watch("matrix", { immediate: true })
  onMatrixChanged() {
    this.result = this.checkGameState(this.matrix);
    this.printMessageWin();
  }

  checkGameState(matrix: IPlayMatrix): [boolean, boolean] {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (
        row.every((value) => value && value === this.$store.state.playerSymbol)
      ) {
        return [true, false];
      } else if (
        row.every((value) => value && value !== this.$store.state.playerSymbol)
      ) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (
        column.every(
          (value) => value && value === this.$store.state.playerSymbol
        )
      ) {
        return [true, false];
      } else if (
        column.every(
          (value) => value && value !== this.$store.state.playerSymbol
        )
      ) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === this.$store.state.playerSymbol)
          return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === this.$store.state.playerSymbol)
          return [true, false];
        else return [false, true];
      }
    }

    //Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  }

  printMessageWin() {
    if (this.endGame) return;
    let text = "";
    let won = false;
    if (this.result[0]) {
      text = "You won!";
      won = true;
    } else if (this.result[1]) {
      text = "You lost!";
    } else if (this.result[0] && this.result[1]) {
      text = "Tie!";
    }

    if (text !== "" && socketService.socket && authService.currentUser) {
      this.endGame = true;
      gameService.gameWin(socketService.socket, text);
      gameService.endGame(socketService.socket, {
        UserId: authService.currentUser?.UserId,
        IsWin: won,
      });
      this.$store.state.gameEndText = text;
      this.setGameStarted(false);
      this.$store.state.isInRoom = false;
    }
  }
}
</script>

<style lang="less" scoped>
.game-container {
  display: flex;
  flex-direction: column;
  .row-container {
    width: 100%;
    display: flex;
    .cell {
      width: 10em;
      height: 9em;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      cursor: pointer;
      border: 3px solid rgb(255, 255, 255);
      transition: all 270ms ease-in-out;
      &:hover {
        background-color: rgba(255, 255, 255, 0.096);
      }
      @media screen and (max-width: 510px) {
        width: 7em;
        height: 6em;
      }
    }
    .X {
      font-size: 100px;
      color: rgb(255, 255, 255);
      &::after {
        content: "X";
        padding-left: 11px;
      }
      @media screen and (max-width: 510px) {
        font-size: 60px;
        &::after {
          padding-left: 5px;
        }
      }
    }
    .O {
      font-size: 100px;
      color: rgb(255, 255, 255);
      &::after {
        content: "O";
        padding-left: 11px;
      }
      @media screen and (max-width: 510px) {
        font-size: 60px;
        &::after {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>