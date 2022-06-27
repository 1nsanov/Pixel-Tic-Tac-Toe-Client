<template>
  <button
    @click="$emit('onClick')"
    class="base-button"
    :class="{
      'default-thema-btn': color === 'default',
      'green-thema-btn': color === 'green',
      'orange-thema-btn': color === 'orange',
      'red-thema-btn': color === 'red',
      'small-size': size === 'small',
      'medium-size': size === 'medium',
      'big-size': size === 'big',
    }"
    :disabled="disabled"
    :style="{ opacity: disabled ? `0.5` : `1` }"
  >
    <span
      :class="{
        'default-thema-text': color === 'default',
        'green-thema-text': color === 'green',
        'orange-thema-text': color === 'orange',
        'red-thema-text': color === 'red',
      }"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "ui-button",
})
export default class UiButton extends Vue {
  @Prop({ default: "default", type: String }) color!: string;
  @Prop({ default: "small", type: String }) size!: string;
  @Prop({ default: false, type: Boolean }) disabled!: boolean;
}
</script>

<style lang="less">
.base-button {
  min-width: 160px;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  border-radius: 10px;
  transition: ease 0.3s;
  letter-spacing: inherit;
  //themas
  .default-thema-text {
    background: linear-gradient(180deg, #ffffff 0%, #6fc2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .green-thema-text {
    background: linear-gradient(180deg, #ffffff 0%, #9effa8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .orange-thema-text {
    background: linear-gradient(180deg, #ffffff 0%, #ffd66b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .red-thema-text {
    background: linear-gradient(180deg, #ffffff 0%, #ff6363 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
.base-button:hover {
  filter: contrast(2.2);
}
//themas
.default-thema-btn {
  background: linear-gradient(180deg, #1588f1 -10%, rgba(21, 136, 241, 0) 120%);
}
.green-thema-btn {
  background: linear-gradient(180deg, #55f752 0%, rgba(36, 206, 33, 0) 117.5%);
}
.orange-thema-btn {
  background: linear-gradient(180deg, #f1a511 0%, rgba(241, 165, 17, 0) 132.5%);
}
.red-thema-btn {
  background: linear-gradient(180deg, #f20f0f 0%, rgba(242, 15, 15, 0) 128.75%);
}
.small-size {
  min-width: 160px;
  height: 40px;
  padding: 0 10px;
  font-size: 16px;
}
.medium-size {
  min-width: 200px;
  height: 50px;
  padding: 0 15px;
  font-size: 20px;
}
.big-size {
  min-width: 240px;
  height: 60px;
  padding: 0 20px;
  font-size: 24px;
}
</style>