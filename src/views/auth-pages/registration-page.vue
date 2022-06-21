<template>
  <div class="registration-page">
    <auth-user/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AuthUser from "../../components/auth/auth-user.vue";
@Options({
  name: "registration-page",
  components: {
    AuthUser,
  },
})
export default class RegistrationPage extends Vue {
  
}
</script>

<style lang="less" scoped>
.registration-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
