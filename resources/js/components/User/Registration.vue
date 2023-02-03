<template>
    <div class="d-flex flex-column align-items-center">
        <div class="w-75 mt-1">
            <input v-model="name" type="text" placeholder="name" class="form-control">
        </div>
        <div class="w-75 mt-1">
            <input v-model="email" type="email" placeholder="email" class="form-control">
        </div>
        <div class="w-75 mt-1">
            <input v-model="password" type="password" placeholder="password" class="form-control">
        </div>
        <div class="w-75 mt-1">
            <input v-model="password_confirmation" type="password" placeholder="password" required class="form-control">
        </div>
        <div class="mt-2">
            <button :disabled="isDisabled" @click.prevent="register()" type="submit" class="btn btn-success">Sign up</button>
        </div>
        <div class="mt-2 text-danger">
            {{ warning }}
        </div>
    </div>
</template>

<script>
import router from '../../router'

export default {
    name: 'Registration',

    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            warning: ''
        }
    },

    methods: {
        register() {
            if (this.password !== this.password_confirmation) {
                this.warning = 'Your password is not conrirmed'
            } else if (this.password.length >= 8) {
                axios.get('/sanctum/csrf-cookie')
                    .then(response => {
                        axios.post('/register', {
                                name: this.name,
                                username: this.name,
                                email: this.email,
                                password: this.password,
                                password_confirmation: this.password_confirmation


                            })
                            .then(res => {
                                localStorage.removeItem('verified_email')
                                localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
                                this.warning = 'Check your email'
                                router.push({ name: 'user.email-verification' })
                                alert('Check your email and confirm your email.')

                            })
                    });
            } else {
                this.warning = 'Your password must have min 8 symbols'
            }
        }
    },

    computed: {
        isDisabled() {
            return this.name === '' || this.email === '' || this.password === '' || this.password_confirmation === ''
        }
    }
}
</script>

<style>

</style>
