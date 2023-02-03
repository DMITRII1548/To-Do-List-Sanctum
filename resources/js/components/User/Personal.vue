<template>
    <div class="text-primary">You logined as {{ name }}</div>
</template>

<script>
export default {
    name: 'Personal',

    data() {
        return {
            name: ''
        }
    },

    mounted() {
        this.getUser()
    },

    updated() {
        this.getUser()
    },

    methods: {
        getUser() {
            axios.post('/api/users/me')
                .then(res => {
                    if (!res.data.data.email_verificated) {
                        this.$router.push({ name: 'user.email-verification' })
                    }

                    this.name = res.data.data.name

                })
        }
    }
}
</script>

<style scoped>

</style>
