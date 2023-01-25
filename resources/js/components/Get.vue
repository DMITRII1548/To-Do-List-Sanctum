<template>
<div>
    get
</div>
</template>

<script>
export default {
    name: 'Get',

    data() {
        return {
            data: null
        }
    },

    methods: {
        getData() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    // Login...
                });
        }
    }
}
</script>

<style scoped>
</style>
