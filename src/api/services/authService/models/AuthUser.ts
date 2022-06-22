export default class AuthUser {
  UserId: number = 0;
  Nickname: string = "";
  Password: string = "";
  AvatarId: number = 0;
  CountFinishedGames: number = 0;
  CountWins: number = 0;
  CountLosses: number = 0;
  Score: number = 0;
  StatusOnline: boolean = false;
  DataRegister: string = "";

  constructor(obj?: Partial<AuthUser>) {
    if (obj) Object.assign(this, obj);
  }
}