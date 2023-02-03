<template>
    <footer class="d-flex justify-content-between mt-5 mb-3">
        <nav class="d-flex gap-20" v-if="token && isEmailVerificatedStatus">
            <router-link :to="{ name: 'task.index' }" class="nav-link">Home</router-link>
            <router-link :to="{ name: 'task.create' }" class="nav-link">Create</router-link>
        </nav>
        <nav class="d-flex gap-20">
            <router-link v-if="!token && !isEmailVerificatedStatus" :to="{ name: 'user.login' }" class="nav-link">Login</router-link>
            <router-link v-if="!token && !isEmailVerificatedStatus" :to="{ name: 'user.registration' }" class="nav-link">Registration</router-link>
            <router-link v-if="token && isEmailVerificatedStatus" :to="{ name: 'user.personal' }" class="nav-link">Personal</router-link>
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
            isEmailVerificatedStatus: null
        }
    },

    mounted() {
        this.getToken()
        this.getEmailVerificatedStatus()
    },

    updated() {
        this.getToken()
        this.getEmailVerificatedStatus()
    },

    methods: {
        logout() {
            axios.post('/logout')
                .then(res => {
                    localStorage.removeItem('x_xsrf_token')
                    localStorage.removeItem('verified_email')
                    this.$router.push({ name: 'user.login' })
                })
        },

        getToken() {
            this.token = localStorage.getItem('x_xsrf_token')
        },

        getEmailVerificatedStatus() {
            let isEmailVerificatedStatus = localStorage.getItem('verified_email')

            if (isEmailVerificatedStatus) {
                this.isEmailVerificatedStatus = true
            } else {
                this.isEmailVerificatedStatus = false
            }
        }
    }
}
</script>

<style scoped>
.gap-20 {
    gap: 20px;
}

</style>
