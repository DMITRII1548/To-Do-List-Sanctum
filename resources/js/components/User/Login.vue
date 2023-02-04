<template>
    <div class="d-flex flex-column align-items-center">
        <div class="w-75 mt-1">
            <input v-model="email" type="email" placeholder="email" class="form-control">
        </div>
        <div class="w-75 mt-1">
            <input v-model="password" type="password" placeholder="password" class="form-control">
        </div>
        <div class="mt-2">
            <button :disabled="isDisabled" @click.prevent="login()" type="submit" class="btn btn-success">Login</button>
        </div>
        <div class="mt-4 text-danger">
            {{ warning }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            warning: ''
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {

                    axios.post('/login', { email: this.email, password: this.password })
                        .then(res => {
                            this.afterLogin(res.config.headers['X-XSRF-TOKEN'])
                        })
                        .catch(error => {
                            this.warning = 'this user does not exists'
                        })
                });

        },

        afterLogin(token) {
            localStorage.setItem('x_xsrf_token', token)

            axios.post('/api/users/me')
                .then(res => {
                    this.checkVerifiedEmail(res.data.data.id, res.data.data.email_verified)
                })
        },

        checkVerifiedEmail(id, verifiedEmail) {
            if (verifiedEmail) {
                localStorage.setItem('verified_email_status', true)
                this.$router.push({ name: 'users.personal' })
            } else {
                localStorage.removeItem('x_xsrf_token')
                axios.delete(`/api/users/${id}`)
                    .then(res => { })

                this.warning = 'this user does not exists'
            }
        }
    },

    computed: {
        isDisabled() {
            return this.email === '' || this.password === ''
        }
    }
}
</script>

<style scoped>

</style>
