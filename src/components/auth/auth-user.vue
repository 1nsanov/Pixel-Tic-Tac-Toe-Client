<template>
  <div class="auth-user">
    <div class="auth-user_title" :class="{ green: isLogin, blue: !isLogin }">
      {{ title }}
    </div>
    <div class="auth-user_form">
      <div class="auth-user_form_content">
        <div
          class="auth-user_form_content_field"
          :style="{ marginBottom: `22px` }"
        >
          <div class="auth-user_form_content_field_title">Nickname</div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="nickname"
              type="text"
              placeholder="Enter nickname..."
              isIcon
            >
              <img src="../../assets/icons/icon-gamepad.svg" />
            </ui-input>
          </div>
        </div>
        <div class="auth-user_form_content_field">
          <div class="auth-user_form_content_field_title">Password</div>
          <div class="auth-user_form_content_field_input">
            <ui-input
              v-model="password"
              type="password"
              placeholder="Enter password..."
              isIcon
            >
              <img src="../../assets/icons/icon-key.svg" />
            </ui-input>
          </div>
        </div>
        <div class="auth-user_form_content_error-msg">{{ errorMsg }}</div>
        <div class="auth-user_form_content_confirm">
          <ui-button
            :style="{ width: `100%` }"
            :color="!isLogin ? 'default' : 'green'"
            @onClick="confirm"
            >{{ textButton }}</ui-button
          >
        </div>
        <div class="auth-user_form_content_footer">
          {{ footerMsg
          }}<span
            :class="{ green: !isLogin, blue: isLogin }"
            @click="GoToLink"
            >{{ actionText }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import IUserForm from "../../interfaces/IUserForm"
@Options({
  name: "auth-user",
})
export default class AuthUser extends Vue {
  @Prop({ type: Boolean, default: false }) isLogin!: boolean;

  title = "Registration";
  textButton = "Registration";
  footerMsg = "You have already created account?";
  actionText = " Login!";
  errorMsg = "";

  nickname = "";
  password = "";

  created() {
    if (this.isLogin) {
      this.title = "Login";
      this.textButton = "Login";
      this.footerMsg = "Don't have an account? ";
      this.actionText = "Register!";
    }
  }

  confirm() {
    let isValid = this.validation();
    if (isValid) {
      let user = this.createUser();
      this.$emit("confirm", user);
    }
    this.password = "";
  }

  validation() {
    this.errorMsg = ""
    if (this.nickname.length >= 4 && this.password.length >= 6) {
      return true;
    }
    else{
      if(this.nickname.length < 4) this.errorMsg = "Nickname must be at least 4 characters\n"
      if(this.password.length < 6) this.errorMsg += "Password must be at least 6 characters\n"
      return false;
    }
  }

  createUser(): IUserForm{
    return {
      Nickname: this.nickname,
      Password: this.password
    }
  }

  GoToLink() {
    if (this.isLogin) {
      this.$router.push({ name: "register" });
    } else {
      this.$router.push({ name: "login" });
    }
  }
}
</script>

<style lang="less" scoped>
.auth-user {
  font-size: 20px;
  width: 100%;
  .auth-user_title {
    text-align: center;
    font-size: 40px;
    line-height: 34px;
    margin-bottom: 10px;
  }

  .auth-user_form {
    width: 100%;
    min-height: 300px;
    border-radius: 20px;
    border: 5px solid #fff;
    max-width: 400px;
    margin: 0 auto;
    .auth-user_form_content {
      display: flex;
      flex-direction: column;
      padding: 40px 40px 23px 40px;
      .auth-user_form_content_field {
        width: 100%;
        display: flex;
        flex-direction: column;
        .auth-user_form_content_field_title {
          margin-bottom: 10px;
          line-height: 17px;
        }
        .auth-user_form_content_field_input {
        }
      }
      .auth-user_form_content_error-msg {
        font-size: 16px;
        line-height: 13px;
        background: linear-gradient(180deg, #ffffff 0%, #ff6363 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        padding: 7px 0 7px 0;
      }
      .auth-user_form_content_confirm {
        margin-bottom: 20px;
      }
      .auth-user_form_content_footer {
        font-size: 16px;
        line-height: 13px;
        span {
          cursor: pointer;
          transition: ease 0.3s;
        }
        span:hover {
          filter: contrast(2);
        }
      }
    }
  }
}
.blue {
  background: linear-gradient(180deg, #ffffff 0%, #6fc2ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.green {
  background: linear-gradient(180deg, #ffffff 0%, #76ff84 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
