import { pushScopeId } from 'vue';
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: '/get',
        component: () => import('./components/Get.vue')
    },
    {
        path: '/login',
        component: () => import('./components/User/Login.vue'),
        name: 'user.login'
    },
    {
        path: '/registration',
        component: () => import('./components/User/Registration.vue'),
        name: 'user.registration'
    }
]

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory('/'),
    routes,
})

export default router
