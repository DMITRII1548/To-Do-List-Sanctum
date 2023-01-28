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
            <button @click.prevent="register()" type="submit" class="btn btn-success">Sign up</button>
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
        }
    },

    methods: {
        register() {
            if (this.password.length >= 8) {
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
                                localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN'])
                                this.$router.push({ name: 'user.personal' })
                            })
                    });
            } else {
                alert('Your password must have min 8 symbols')
            }
        }
    }
}
</script>

<style>

</style>
