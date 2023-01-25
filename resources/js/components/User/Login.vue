<template>
    <div>
        <input v-model="email" type="email" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <button @click.prevent="login()" type="submit">Login</button>
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
