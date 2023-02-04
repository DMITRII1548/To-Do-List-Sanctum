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
            <button :disabled="isDisabled" @click.prevent="checkDataAndRegister()" type="submit" class="btn btn-success">Sign up</button>
        </div>
        <div class="mt-2 text-danger">
            {{ warning }}
        </div>
    </div>
</template>

<script>
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
        checkDataAndRegister() {
            if (this.password !== this.password_confirmation) {
                this.warning = 'Your password is not conrirmed'
            } else if (this.password.length >= 8) {
                this.register()
            } else {
                this.warning = 'Your password must have min 8 symbols'
            }
        },

        register() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/register', this.getKeysAndValuesForResiter())
                        .then(res => {
                            this.afterRegisterSuccess(res.config.headers['X-XSRF-TOKEN'])

                        })
                });
        },

        getKeysAndValuesForResiter() {
            return {
                name: this.name,
                username: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }

        },

        afterRegisterSuccess(token) {
            localStorage.removeItem('verified_email_status')
            localStorage.setItem('x_xsrf_token', token)
            this.warning = 'Check your email'
            this.$router.push({ name: 'users.email-verification' })
            alert('Check your email and confirm your email.')
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
