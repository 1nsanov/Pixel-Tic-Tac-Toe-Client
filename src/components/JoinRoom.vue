<template>
  <div class="join">
    <div class="join_title">"Join Room"</div>
    <div class="join_input">
      <input class="input-room" v-model="roomId" type="text" placeholder="Enter room Id" />
    </div>
    <div class="join_btn">
      <button class="btn-room" @click="joinRoom" :disabled="isLoading" >Join</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import socketService from "../api/services/socketService";
import gameService from "../api/services/gameService";

export default class JoinRoom extends Vue {

  roomId: string = "";
  isLoading: boolean = false;

  async joinRoom(){
    console.log("Joining...");
    this.isLoading = true;

    const socket = socketService.socket;
    if(!this.roomId || this.roomId.trim() === "" || !socket) return
    
    const joined = await gameService.joinGameRoom(socket, this.roomId).catch(err => 
      alert(err.error)
    );

    if(joined){
      console.log("Joined room ", this.roomId);
      this.$store.state.isInRoom = true;
    }
    else{
      console.log("Room not found");
    }

    this.isLoading = false;
  }
}
</script>

<style lang="less" scoped>
.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  .join_title{
    font-size: 24px;
    font-weight: 700;
  }
  .join_input {
    width: 100%;
    margin: 10px 0 0 0;
    .input-room {
      width: 100%;
      padding: 6px 12px;
      border-radius: 8px;
      border: 2px solid rgb(18, 132, 225);
    }
    .input-room::placeholder{
      color: rgb(18, 132, 225);
    }
  }
  .join_btn {
    width: 100%;
    margin: 10px 0 0 0;
    .btn-room {
      width: 100%;
      height: 32px;
      font-weight: 700;
      padding: 5px;
      border-radius: 8px;
      background: rgb(18, 132, 225);
      color: #fff;
      cursor: pointer;
    }
    .btn-room:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>