// import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//import { aliases, fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
//import { mdi } from 'vuetify/iconsets/mdi'
//import '@mdi/font/css/materialdesignicons.css'

// https://stackoverflow.com/questions/73082361/vuetify-3-how-to-change-theme-dynamically
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,

    icons: {
      defaultSet: 'mdi',
      aliases,

      sets: {
        mdi,
//        fa,
      }
    },
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
