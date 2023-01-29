<template>
    <div class="mt-4">
        <router-link :to="{ name: 'task.index' }" class="btn btn-success">Back</router-link>
        <router-link :to="{ name: 'task.edit', props: { id: task.id } }" class="btn btn-primary m-1">Edit</router-link>
        <a @click.prevent="this.$store.dispatch('confirmActionDeleteTask', task.id)" href="#" class="btn btn-danger m-1">Delete</a>
    </div>
    <div class="mt-3">
        <h3>{{ task.title }}</h3>
        <p class="w-100">{{ task.text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Show',

    mounted() {
        this.$store.dispatch('getTask', this.id)
    },

    computed: {
        id() {
            return this.$route.params.id
        },

        task() {
            return this.$store.getters.task
        }
    }
}
</script>

<style scoped>
</style>
