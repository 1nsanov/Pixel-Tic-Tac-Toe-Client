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
  color: #000;
  background: rgb(253, 255, 245);
}
</style>
