export default class LeaderboardItem{
  UserId: number = 0;
  Nickname: string = "";
  AvatarId: number = 0;
  CountFinishedGames: number = 0;
  CountWins: number = 0;
  CountLosses: number = 0;
  Score: number = 0;
  
  constructor(obj?: Partial<LeaderboardItem>) {
    if (obj) Object.assign(this, obj);
  }
}