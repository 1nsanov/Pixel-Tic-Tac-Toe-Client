
import { Vue } from "vue-class-component";
import UserSourceData from "./services/subDataSource/UserSourceData"

export default class DataSource extends Vue {
  public UserSource: UserSourceData = new UserSourceData();
  public IsLoadServer: boolean = false;
}