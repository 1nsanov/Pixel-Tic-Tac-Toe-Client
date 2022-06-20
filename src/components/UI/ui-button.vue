<template>
  <div class="ui-button">
    <button
      @click="$emit('click')"
      class="base-button"
      :class="{
        'default-thema-btn': color === 'default',
        'green-thema-btn': color === 'green',
      }"
    >
      <span
        :class="{
          'default-thema-text': color === 'default',
          'green-thema-text': color === 'green',
        }"
      >
        <slot></slot>
      </span>
    </button>
  </div>
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
}
</script>

<style lang="less">
.ui-button {
  .base-button {
    min-width: 160px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-family: inherit;
    cursor: pointer;
    border-radius: 10px;
    transition: ease 0.3s;
    letter-spacing: inherit;
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
  }
  .base-button:hover {
    filter: contrast(2.2);
  }
  .default-thema-btn {
    background: linear-gradient(
      180deg,
      #1588f1 -10%,
      rgba(21, 136, 241, 0) 120%
    );
  }
  .green-thema-btn {
    background: linear-gradient(
      180deg,
      #55f752 0%,
      rgba(36, 206, 33, 0) 117.5%
    );
  }
}
</style>