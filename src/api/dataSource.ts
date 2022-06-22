
import AuthUser from "@/api/services/authService/models/AuthUser";
import { Vue } from "vue-class-component";

export default class DataSource extends Vue {
  public AuthUser: AuthUser = new AuthUser();
  public IsLoadServer: boolean = false;
}