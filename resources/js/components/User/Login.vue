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
                            localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])

                            axios.post('/api/users/me')
                                .then(res => {
                                    if (res.data.data.email_verified) {
                                        localStorage.setItem('verified_email', 'verified')
                                        this.$router.push({ name: 'user.personal' })
                                    } else {
                                        localStorage.removeItem('x_xsrf_token')
                                        axios.delete(`/api/users/${res.data.data.id}`)
                                            .then(res => { })

                                        this.warning = 'this user does not exists'
                                    }

                                })
                        })
                        .catch(error => {
                            this.warning = 'this user does not exists'
                        })
                });

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
