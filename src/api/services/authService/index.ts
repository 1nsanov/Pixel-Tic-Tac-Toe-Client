import { Socket } from "socket.io-client";
import IUserModel from "./models/IUserModel";

class authService {
  public async userRegister(socket: Socket, newUser: IUserModel): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("user_register", { newUser: { name: newUser.name, password: newUser.password } });
      socket.on("user_register_success", () => rs(true));
      socket.on("user_register_error", (err) => rj(err));
    })
  }

  public async userLogin(socket: Socket, user: IUserModel): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("user_login", { user: { name: user.name, password: user.password } });
      socket.on("user_login_success", () => rs(true));
      socket.on("user_login_error", (err) => rj(err));
    })
  }
}

export default new authService();