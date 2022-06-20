import { Store } from '../src/store/index';// path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}