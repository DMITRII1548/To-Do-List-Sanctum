<template>
    <footer class="d-flex justify-content-between mt-5 mb-3">
        <nav class="d-flex gap-20" v-if="token">
            <router-link :to="{ name: 'task.index' }">Home</router-link>
        </nav>
        <nav class="d-flex gap-20">
            <router-link v-if="!token" :to="{ name: 'user.login' }" class="nav-link">Login</router-link>
            <router-link v-if="!token" :to="{ name: 'user.registration' }" class="nav-link">Registration</router-link>
            <router-link v-if="token" :to="{ name: 'user.personal' }" class="nav-link">Personal</router-link>
            <a v-if="token" @click.prevent="logout()" href="#" class="nav-link">Logout</a>
        </nav>

    </footer>

    <router-view :key="$route.fullPath" ></router-view>
</template>

<script>
export default {
    name: 'App',

    data() {
        return {
            token: '',
        }
    },

    mounted() {
        this.getToken()
    },

    updated() {
        this.getToken()
    },

    methods: {
        logout() {
            axios.post('/logout')
                .then(res => {
                    localStorage.removeItem('x_xsrf_token')
                    this.$router.push({ name: 'user.login' })
                })
        },

        getToken() {
            this.token = localStorage.getItem('x_xsrf_token')
        }
    }
}
</script>

<style scoped>
.gap-20 {
    gap: 20px;
}

</style>
