import './bootstrap'
import '../sass/app.scss'
import { createApp } from 'vue'
import AppComponent from './components/App.vue'
import router from './router'
import store from './store'


const app = createApp({
    components: {
        AppComponent,
    }
})

app.use(router)
app.use(store)
app.mount('#app')
