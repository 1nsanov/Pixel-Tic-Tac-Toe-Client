import { Socket } from "socket.io-client";
import AuthUser from "./models/AuthUser"
import IUserLogin from "./models/IUserLogin";

class authService {
  public async userRegister(socket: Socket, authUser: AuthUser): Promise<AuthUser> {
    return new Promise((rs, rj) => {
      socket.emit("user_register", {
        authUser: {
          UserId: authUser.UserId,
          Nickname: authUser.Nickname,
          Password: authUser.Password,
          AvatarId: authUser.AvatarId,
          CountFinishedGames: authUser.CountFinishedGames,
          CountWins: authUser.CountWins,
          CountLosses: authUser.CountLosses,
          Score: authUser.Score,
          StatusOnline: authUser.StatusOnline,
          DataRegister: authUser.DataRegister
        }
      });
      socket.on("user_register_success", (authUser: AuthUser) => rs(authUser));
      socket.on("user_register_error", (err) => rj(err));
    })
  }

  public async userLogin(socket: Socket, authUser: IUserLogin): Promise<AuthUser> {
    return new Promise((rs, rj) => {
      socket.emit("user_login", {
        authUser: {
          Nickname: authUser.Nickname,
          Password: authUser.Password,
        }
      });
      socket.on("user_login_success", (authUser: AuthUser) => rs(authUser));
      socket.on("user_login_error", (err) => rj(err));
    })
  }
}

export default new authService();