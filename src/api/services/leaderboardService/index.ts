import { Socket } from "socket.io-client";
import LeaderboardItem from "./models/LeaderboardItem";

class leaderboardService {
  public async getLeaderboard(socket: Socket): Promise<LeaderboardItem[]> {
    return new Promise((rs, rj) => {
      socket.emit("get_leaderboard");
      socket.on("get_leaderboard_success", (leaderboard) => rs(leaderboard));
      socket.on("get_leaderboard_error", (err) => rj(err));
    })
  }
}

export default new leaderboardService();