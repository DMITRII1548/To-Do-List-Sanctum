import './bootstrap'
import '../sass/app.scss'
import { createApp } from 'vue'
import AppComponent from './components/App.vue'
import router from './router'


const app = createApp({
    components: {
        AppComponent,
    }
})

app.use(router)
app.mount('#app')
