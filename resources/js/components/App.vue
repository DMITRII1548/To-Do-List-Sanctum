<template>
    <footer class="d-flex justify-content-between mt-5 mb-3">
        <nav class="d-flex gap-20">
            <a href="#" class="nav-link">Home</a>
        </nav>
        <nav class="d-flex gap-20">
            <router-link :to="{ name: 'user.login' }" class="nav-link">Login</router-link>
            <router-link :to="{ name: 'user.registration' }" class="nav-link">Registration</router-link>
            <router-link :to="{ name: 'user.personal' }" class="nav-link">Personal</router-link>
            <a @click.prevent="logout()" href="#" class="nav-link">Logout</a>
        </nav>

    </footer>

    <router-view :key="$route.fullPath" ></router-view>
</template>

<script>
export default {
    name: 'App',

    methods: {
        logout() {
            axios.post('/logout')
                .then(res => {
                    this.$router.push({ name: 'user.login' })
                })
        }
    }
}
</script>

<style scoped>
.gap-20 {
    gap: 20px;
}

</style>
