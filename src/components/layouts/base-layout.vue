<template>
  <div class="base-layout">
    <header-layout />
    <content-layout>
      <router-view />
    </content-layout>
    <!-- <footer-layout /> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeaderLayout from "./header-layout.vue";
import ContentLayout from "./content-layout.vue";
import FooterLayout from "./footer-layout.vue";

@Options({
  name: "base-layout",
  components: {
    HeaderLayout,
    ContentLayout,
    FooterLayout,
  },
})
export default class BaseLayout extends Vue {}
</script>

<style lang="less">
html,
body {
  font-family: "PlayMeGames";
  font-size: 16px;
  letter-spacing: 0.05rem;
  color: #fff;
  width: 100%;
  min-height: 100vh;
  display:flex; 
  flex-direction:column;
  background: linear-gradient(
    63.18deg,
    #0f2027 0%,
    #203a43 49.48%,
    #2c5364 100%
  );
}
.base-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>