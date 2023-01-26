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

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token')

    if (token){
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next({ name: 'user.personal' })
        }
    }


    if (!token) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next()
        } else {
            return next({ name: 'user.login' })
        }
    }

    next()
})

export default router
