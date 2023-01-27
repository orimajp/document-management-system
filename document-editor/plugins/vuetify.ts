// import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// https://stackoverflow.com/questions/73082361/vuetify-3-how-to-change-theme-dynamically
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'darkTheme',
      themes: {
        lightTheme: {
          dark: false,
        },
        darkTheme: {
          dark: true,
        }
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
