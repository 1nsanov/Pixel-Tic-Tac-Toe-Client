import { IPlayMatrix } from "../../../interfaces/IPlayMatrix";
import { Socket } from "socket.io-client";
import IStartGame from "@/interfaces/IStartGame";

class GameService {

  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      socket.emit("join_game", { roomId: roomId });
      socket.on("room_joined", () => resolve(true));
      socket.on("room_join_error", (err) => reject(err));
    })
  }

  public async updateGame(socket: Socket, gameMatrix: IPlayMatrix) {
    socket.emit("update_game", { matrix: gameMatrix });
  }

  public async onGameUpdate(socket: Socket, listiner: (matrix: IPlayMatrix) => void) {
    socket.on("on_game_update", ({ matrix }) => listiner(matrix));
  }

  public async onStartGame(socket: Socket, listiner: (option: IStartGame) => void) {
    socket.on("start_game", listiner);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit("game_win", { message });
  }
  public async onGameWin(socket: Socket, listiner: (message: string) => void) {
    socket.on("game_win", ({ message }) => listiner(message));
  }
}

export default new GameService();