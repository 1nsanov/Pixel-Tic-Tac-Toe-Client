import { Socket } from "socket.io-client";
import IMessage from "./models/IMessage";

class chatService {
  public async sendMessage(socket: Socket, message: IMessage){
    socket.emit("send_message", { message: message });
  }

  public async onSendMessage(socket: Socket, listiner: (message: IMessage) => void){
    socket.on("on_send_message", ({ message }) => listiner(message));
  }
}

export default new chatService();