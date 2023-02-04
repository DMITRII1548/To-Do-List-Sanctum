import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios'
import router from './router'
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

window.axios.interceptors.response.use({}, error => {

    if (error.response.status === 401 || error.response.status === 419) {
        const token = localStorage.getItem('x_xsrf_token')
        const isEmailVerificated = localStorage.getItem('verified_email_status')

        if (token) {
            localStorage.removeItem('x_xsrf_token')
        }

        if (isEmailVerificated === 'verified') {
            localStorage.removeItem('verified_email_status')
        }


        router.push({ name: 'users.login' })
    }

    if (error.response.status === 403) {
        axios.post('/logout')
            .then(res => {
            })

        localStorage.removeItem('x_xsrf_token')
        localStorage.removeItem('verified_email_status')

        router.push({ name: 'users.login' })
    }

    if (error.response.status === 422) {
        axios.post('/logout')
            .then(res => {
            })

        localStorage.removeItem('x_xsrf_token')
        localStorage.removeItem('verified_email_status')
        router.push({ name: 'users.login' })
    }
})
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
