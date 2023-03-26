// https://stackoverflow.com/questions/73614735/vuedraggable-custom-component-setup-in-nuxt3
import draggable from 'vuedraggable'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('draggable', draggable)
})
