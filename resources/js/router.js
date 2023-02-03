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
    },
    {
        path: '/user/email-verification',
        component: () => import('./components/User/EmailVerification.vue'),
        name: 'user.email-verification'
    },
    {
        path: '/',
        component: () => import('./components/Task/Index.vue'),
        name: 'task.index'
    },
    {
        path: '/task/create',
        component: () => import('./components/Task/Create.vue'),
        name: 'task.create'
    },
    {
        path: '/task/:id',
        component: () => import('./components/Task/Show.vue'),
        name: 'task.show'
    },
    {
        path: '/task/:id/edit',
        component: () => import('./components/Task/Edit.vue'),
        name: 'task.edit'
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./components/Error/404.vue'),
        name: 'error.404'
    },
]

const router = VueRouter.createRouter({
    mode: 'history',
    history: VueRouter.createWebHistory('/'),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token')
    const isEmailVerificatedStatus = localStorage.getItem('verified_email')

    if (token) {
        if (to.name === 'user.email-verification' && isEmailVerificatedStatus) {
            return next({ name: 'user.personal' })
        } else if (!isEmailVerificatedStatus) {
            if (to.name === 'user.email-verification') {
                return next()
            } else {
                return next({ name: 'user.email-verification' })
            }
        } else if (to.name === 'user.login' || to.name === 'user.registration') {
            return next({ name: 'user.personal' })
        } else {
            return next()
        }
    } else {
        if (to.name === 'user.login' || to.name === 'user.registration' || to.name === 'error.404') {
            return next()
        } else {
            return next({ name: 'user.login' })
        }
    }
})

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('x_xsrf_token')
//     const isEmailVerificated = localStorage.getItem('verified_email')

//     if (!token) {
//         if (to.name === 'user.login' || to.name === 'user.registration') {
//             return next()
//         } else if (to.name === 'error.404') {
//             return next()
//         } else {
//             return next({ name: 'user.login' })
//         }
//     }

//     if (token){
//         if (to.name === 'user.email-verification' && isEmailVerificated === 'verified') {
//             return next({ name: 'user.personal' })
//         } else {
//             return next({ name: 'user.email-verification' })
//         }

//         if ((!isEmailVerificated || isEmailVerificated === 'unverified') && token) {
//             return next({ name: 'user.email-verification' })
//         }

//         if (to.name === 'user.login' || to.name === 'user.registration') {
//             return next({ name: 'user.personal' })
//         }

//         if (isEmailVerificated === 'verified') {
//             if (to.name === 'user.login' || to.name === 'user.registration' || to.name === 'user.email-verification') {
//                 return next({ name: 'user.personal' })
//             }

//             return next()
//         }

//         if (to.name === 'user.personal' && (!isEmailVerificated || isEmailVerificated === 'unverified')) {
//             return next({ name: 'user.email-verification' })
//         }

//         return next()

//     }

//     next()
// })

export default router
