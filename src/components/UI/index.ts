import { App } from 'vue'
import UiButton from './ui-button.vue'

export default (app: App<Element>) => {
	app.component('UiButton', UiButton)
}