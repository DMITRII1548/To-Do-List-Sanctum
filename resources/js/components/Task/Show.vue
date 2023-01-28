<template>
    <div class="mt-5">
        <h3>{{ task.title }}</h3>
        <p>{{ task.text }}</p>
    </div>

</template>

<script>
export default {
    name: 'Show',

    data() {
        return {
            task: []
        }
    },

    mounted() {
        this.getTask()
    },

    methods: {
        getTask() {
            axios.get(`/api/tasks/${this.id}`).
                then(res => {
                    this.task = res.data.data
                })
        }
    },

    computed: {
        id() {
            return this.$route.params.id
        }
    },
}
</script>

<style scoped>
</style>
