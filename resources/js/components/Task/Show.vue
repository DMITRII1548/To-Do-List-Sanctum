<template>
    <div class="mt-4">
        <router-link :to="{ name: 'task.edit', props: { id: task.id } }" class="btn btn-primary">Edit</router-link>
        <a @click.prevent="confirmActionDeleteTask(task.id)" href="#" class="btn btn-danger m-1">Delete</a>
    </div>
    <div class="mt-3">
        <h3>{{ task.title }}</h3>
        <p class="w-100">{{ task.text }}</p>
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
        },

        destroyTask(id) {
            axios.delete(`/api/tasks/${id}`)
                .then(res => {
                    this.$router.push({ name: 'task.index' })
                })
        },

        confirmActionDeleteTask(id) {
            if (confirm('Are you wanting to delete this task')) {
                this.destroyTask(id)
            }
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
