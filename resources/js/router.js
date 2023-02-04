import { pushScopeId } from 'vue';
import * as VueRouter from 'vue-router';

const routes = [
    {
        path: '/login',
        component: () => import('./components/User/Login.vue'),
        name: 'users.login'
    },
    {
        path: '/registration',
        component: () => import('./components/User/Registration.vue'),
        name: 'users.registration'
    },
    {
        path: '/users/personal',
        component: () => import('./components/User/Personal.vue'),
        name: 'users.personal'
    },
    {
        path: '/users/email-verification',
        component: () => import('./components/User/EmailVerification.vue'),
        name: 'users.email-verification'
    },
    {
        path: '/',
        component: () => import('./components/Task/Index.vue'),
        name: 'tasks.index'
    },
    {
        path: '/tasks/create',
        component: () => import('./components/Task/Create.vue'),
        name: 'tasks.create'
    },
    {
        path: '/tasks/:id',
        component: () => import('./components/Task/Show.vue'),
        name: 'tasks.show'
    },
    {
        path: '/tasks/:id/edit',
        component: () => import('./components/Task/Edit.vue'),
        name: 'tasks.edit'
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./components/Error/404.vue'),
        name: 'errors.404'
    },
]

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory('/'),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token')
    const isEmailVerificatedStatus = localStorage.getItem('verified_email_status')

    if (token) {
        if (to.name === 'users.email-verification' && isEmailVerificatedStatus) {
            return next({ name: 'users.personal' })
        } else if (!isEmailVerificatedStatus) {
            if (to.name === 'users.email-verification') {
                return next()
            } else {
                return next({ name: 'users.email-verification' })
            }
        } else if (to.name === 'users.login' || to.name === 'users.registration') {
            return next({ name: 'users.personal' })
        } else {
            return next()
        }
    } else {
        if (to.name === 'users.login' || to.name === 'users.registration' || to.name === 'errors.404') {
            return next()
        } else {
            return next({ name: 'users.login' })
        }
    }
})

export default router
