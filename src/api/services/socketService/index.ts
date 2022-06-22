import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

class SocketServer {
  public socket: Socket | null = null;
  public isLoading: boolean = false;
  public isLoadedSocket: boolean = false;
  public isConnectDB: boolean = false;

  public connect(url: string): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
    return new Promise((resolve, reject) => {
      this.socket = io(url)
      if (!this.socket) return reject

      this.socket.on('connect', () => {
        this.isLoading = true;
        this.isLoadedSocket = true;
        resolve(this.socket as Socket)
      })

      this.socket.on('connect_error', (err) => {
        this.isLoading = true;
        this.isLoadedSocket = false;
        console.log('Socket connection error', err)
        reject(err)
      })
    })
  }

  public async checkStatusDB(): Promise<Boolean> {
    return new Promise((rs, rj) => {
      if (this.socket) {
        this.socket.emit('check_status_db');
        this.socket.on("check_status_db_success", (statusDB) => rs(statusDB))
        this.socket.on("check_status_db_error", (statusDB) => rj(statusDB))
      }
      else rj(false)
    });
  }
}

export default new SocketServer()
