import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'
import './style.css'
import App from './App.vue'

const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.deepPurple.darken1,
                    secondary: colors.deepPurple.lighten4,
                }
            },
        },
    },
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

createApp(App).use(vuetify).mount('#app')
