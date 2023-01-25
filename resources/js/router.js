import { pushScopeId } from 'vue';
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: '/login',
        component: () => import('./components/User/Login.vue'),
        name: 'user.login'
    },
    {
        path: '/registration',
        component: () => import('./components/User/Registration.vue'),
        name: 'user.registration'
    },
    {
        path: '/user/personal',
        component: () => import('./components/User/Personal.vue'),
        name: 'user.personal'
    }
]

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory('/'),
    routes,
})

export default router
