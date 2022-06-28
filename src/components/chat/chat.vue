<template>
  <div class="chat">
    <div class="chat_button" v-if="!isVisibleChat" @click="changeVisible">
      <div class="chat_button_icon">
        <div class="chat_button_icon_notification" v-if="countUnread > 0">
          {{ countUnread }}
        </div>
        <img src="../../assets/icons/icon-chat.svg" alt="" />
      </div>
    </div>
    <div class="chat_box" v-else>
      <div class="chat_box_exit" @click="changeVisible">
        <img src="../../assets/icons/icon-cross.svg" alt="" />
      </div>
      <div class="chat_box_messages">
        <div id="scroll" class="_scroll">
          <div class="chat_box_messages_empty" v-if="messagesList.length === 0">
            List of messages is empty! Send message the first!
          </div>
          <div class="chat_box_messages_content" v-else>
            <div
              class="message-item"
              :class="{
                'other-user': item.UserNickname != currentUser.Nickname,
              }"
              v-for="item in messagesList"
              :key="item.UserNickname"
            >
              <div class="message-item_user">
                {{
                  item.UserNickname === currentUser.Nickname
                    ? "You"
                    : item.UserNickname
                }}
              </div>
              <div class="message-item_message">
                <div class="message-item_message_date">
                  {{ convertDate(item.Data) }}
                </div>
                <div class="message-item_message_text">
                  {{ item.Message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat_box_send">
        <ui-input
          v-model="message"
          placeholder="Enter message..."
          thema="dark"
          isIcon
          @keyupEnter="sendMessage"
        >
          <img src="../../assets/icons/icon-convert.svg" alt="" />
        </ui-input>
        <img
          @click="sendMessage"
          class="icon-send"
          src="../../assets/icons/icon-send.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authService from "@/api/services/authService";
import AuthUser from "@/api/services/authService/models/AuthUser";
import socketService from "@/api/services/socketService";
import moment from "moment";
import { Options, Vue } from "vue-class-component";
import IMessage from "../../api/services/chatService/models/IMessage";
import chatService from "@/api/services/chatService/index";
import { watchEffect } from "@vue/runtime-core";

@Options({
  name: "chat",
})
export default class Chat extends Vue {
  isVisibleChat: boolean = false;
  message: string = "";
  messagesList: IMessage[] | null = null;
  currentUser: AuthUser | null | undefined;
  countUnread: number = 0;

  created() {
    this.messagesList = [];
    this.currentUser = authService.currentUser;
    watchEffect(() => {
      this.handleSendMessage();
    });
  }

  changeVisible() {
    this.isVisibleChat = !this.isVisibleChat;
    this.countUnread = 0;
    this.scrollBottom();
  }

  sendMessage() {
    if (!authService.currentUser || this.message.length === 0) return;
    let message: IMessage = {
      UserNickname: authService.currentUser?.Nickname,
      Message: this.message,
      DataSend: moment().format(),
    };
    if (socketService.socket)
      chatService.sendMessage(socketService.socket, message);
    this.messagesList?.push(message);
    this.message = "";
    this.scrollBottom();
  }

  handleSendMessage() {
    if (socketService.socket) {
      chatService.onSendMessage(socketService.socket, (message) => {
        this.countUnread += 1;
        this.messagesList?.push(message);
        this.scrollBottom();
      });
    }
  }

  convertDate(date: string) {
    return moment(date).format("HH:mm");
  }

  scrollBottom() {
    setTimeout(() => {
      var element = document.getElementById("scroll");
      if (element) {
        element.scrollTop = element.scrollHeight - element.clientHeight;
      }
    }, 1);
  }
}
</script>

<style lang="less">
.chat {
  position: fixed;
  bottom: 25px;
  right: 25px;
  transition: 0.3s ease-in-out;
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
    transition: 0.3s ease-in-out;
    .chat_button_icon {
      img {
        transition: 0.3s ease-in-out;
      }
      .chat_button_icon_notification {
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: rgb(231, 48, 48);
        outline: 3px solid #fff;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        z-index: 10;
        top: 18px;
        right: 16px;
        transition: 0.3s ease-in-out;
      }
    }
  }
  .chat_button:hover {
    transform: scale(1.05);
    .chat_button_icon {
      img {
        transform: scale(1.15);
      }
      .chat_button_icon_notification {
        transform: scale(1.15);
      }
    }
  }
  .chat_box {
    width: 320px;
    height: 500px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.5);
    color: #1e373f;
    border-radius: 20px;
    padding: 15px;
    .chat_box_exit {
      display: flex;
      justify-content: end;
      margin-bottom: 10px;
      img {
        cursor: pointer;
      }
    }
    .chat_box_messages {
      height: calc(100% - 80px);
      ._scroll {
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 100%;
        min-height: 100%;
        display: flex;
        .chat_box_messages_empty {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 24px;
          line-height: 36px;
        }
        .chat_box_messages_content {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-right: 7px;
          .message-item {
            display: flex;
            flex-direction: column;
            padding: 7px 12px;
            background: rgb(95, 198, 246);
            border-radius: 10px;
            margin-bottom: 15px;
            word-break: break-all;
            max-width: 100%;
            align-items: flex-end;
            align-self: flex-end;
            .message-item_user {
              display: flex;
            }
            .message-item_message {
              display: flex;
              flex-direction: row-reverse;
              .message-item_message_date {
                display: flex;
                font-size: 10px;
                min-width: 40px;
                flex-flow: row-reverse;
              }
              .message-item_message_text {
              }
            }
          }
          .other-user {
            align-items: flex-start;
            align-self: flex-start;
            background: rgb(246, 143, 95);
            .message-item_message {
              flex-direction: row;
              .message-item_message_date {
                flex-flow: row;
              }
            }
          }
        }
      }
      ._scroll::-webkit-scrollbar {
        width: 5px;
      }
      ._scroll::-webkit-scrollbar-track {
        background: transparent;
      }
      ._scroll::-webkit-scrollbar-thumb {
        background: rgb(221, 221, 221);
        border-radius: 5px;
      }
    }
    .chat_box_send {
      margin-top: 15px;
      display: flex;
      .icon-send {
        margin-left: 15px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
      .icon-send:hover {
        transform: scale(1.15);
        filter: brightness(2);
      }
    }
  }
}
</style>