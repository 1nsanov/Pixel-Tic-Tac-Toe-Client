<template>
  <div class="chat">
    <div class="chat_button" v-if="!isVisibleChat" @click="changeVisible">
      <div class="chat_button_icon">
        <img src="../../assets/icons/icon-chat.svg" alt="" />
      </div>
    </div>
    <div class="chat_box" v-else>
      <div class="chat_box_exit" @click="changeVisible">
        <img src="../../assets/icons/icon-cross.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: "chat",
})
export default class Chat extends Vue {
  isVisibleChat: boolean = false;

  changeVisible() {
    this.isVisibleChat = !this.isVisibleChat;
  }
}
</script>

<style lang="less">
.chat {
  position: fixed;
  bottom: 25px;
  right: 25px;

  .chat_button {
    background: rgb(255, 255, 255);
    color: #000;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.5);
  }
  .chat_box {
    width: 320px;
    height: 500px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.5);
    color: #000;
    border-radius: 20px;
    padding: 15px;
    .chat_box_exit{
      display: flex;
      justify-content: end;
      img{
        cursor: pointer;
      }
    }
  }
}
</style>