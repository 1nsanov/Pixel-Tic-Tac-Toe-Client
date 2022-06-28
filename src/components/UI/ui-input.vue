<template>
  <div class="ui-input">
    <div class="ui-input_icon" v-if="isIcon">
      <slot></slot>
    </div>
    <input
      class="base-input"
      :style="{ padding: isIcon ? '0px 25px 0 49px' : '0 25px 0 25px' }"
      :class="{
        'default-thema': thema === 'default',
        'dark-thema': thema === 'dark',
      }"
      :type="type"
      :placeholder="`${placeholder}`"
      :value="modelValue"
      @input="updateInput"
      @keyup.enter="$emit('keyupEnter')"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";

@Options({
  name: "ui-input",
})
export default class UiInput extends Vue {
  @Prop({ default: "text", type: String }) type!: string;
  @Prop({ default: "", type: String }) placeholder!: string;
  @Prop({ default: "default", type: String }) thema!: string;
  @Prop({ default: false, type: Boolean }) isIcon!: boolean;

  @Prop({ type: String }) modelValue!: string;
  @Emit("update:modelValue") updateInput(event: any) {
    return event.target.value;
  }
}
</script>

<style lang="less">
.ui-input {
  position: relative;
  .ui-input_icon {
    position: absolute;
    padding-left: 13px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 2px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .base-input {
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    width: 100%;
    font-size: 16px;
  }
  .default-thema {
    border: 2px solid #ffffff;
    color: #ffffff;
    border-radius: 10px;
    background: transparent;
    height: 40px;
  }
  .default-thema::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  .dark-thema {
    border: 2px solid #1E373F;
    color: #1E373F;
    border-radius: 10px;
    background: transparent;
    height: 40px;
  }
  .dark-thema::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>