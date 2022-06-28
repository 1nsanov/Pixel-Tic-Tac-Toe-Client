export default class ResultGame {
  UserId: number = 0;
  IsWin: boolean = false;

  constructor(obj?: Partial<ResultGame>) {
    if (obj) Object.assign(this, obj);
  }
}