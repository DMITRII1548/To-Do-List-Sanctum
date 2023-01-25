<template>
    <div class="d-flex flex-column align-items-center">
        <div class="w-25 mt-1">
            <input v-model="email" type="email" placeholder="email" class="form-control">
        </div>
        <div class="w-25 mt-1">
            <input v-model="password" type="password" placeholder="password" class="form-control">
        </div>
        <div class="mt-2">
            <button @click.prevent="login()" type="submit" class="btn btn-success">Login</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    axios.post('/login', { email: this.email, password: this.password })
                        .then(res => {
                            console.log(res)

                        })
                });
        }
    }
}
</script>

<style scoped>

</style>
