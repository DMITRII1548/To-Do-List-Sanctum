<template>
    <div>App component</div>
    <div>
        <router-link :to="{ name: 'user.login' }">Login</router-link>
    </div>

    <router-view :key="$route.fullPath" ></router-view>
</template>

<script>
export default {
    name: 'App',


}
</script>

<style scoped>
</style>
