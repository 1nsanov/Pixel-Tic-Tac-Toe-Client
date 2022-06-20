<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AppComponent extends Vue {}
</script>

<style lang="less">
body,
html {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background: linear-gradient(63.18deg, #0F2027 0%, #203A43 49.48%, #2C5364 100%);
}
</style>
