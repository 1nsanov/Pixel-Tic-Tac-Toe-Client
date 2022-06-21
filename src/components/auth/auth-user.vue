<template>
  <div class="auth-user">
    <div class="auth-user_title">Registration</div>
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
        <div class="auth-user_form_content_error-msg"></div>
        <div class="auth-user_form_content_confirm">
          <ui-button
            :style="{ width: `100%` }"
            color="default"
            @onClick="actionClick"
            >Registration</ui-button
          >
        </div>
        <div class="auth-user_form_content_footer">
          You have already created account?<span>Login!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Options({
  name: "auth-user",
})
export default class AuthUser extends Vue {
  @Prop({ type: String, default: "reg" }) type!: string;

  nickname = "";
  password = "";

  actionClick(){
    console.log(this.nickname, this.password);
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
    background: linear-gradient(180deg, #ffffff 0%, #6fc2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
          margin-left: 4px;
          background: linear-gradient(180deg, #ffffff 0%, #76ff84 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
</style>
