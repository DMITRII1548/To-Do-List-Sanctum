<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Title</th>
                    <th scope="col">Show</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks">
                    <th scope="row">{{ task.id }}</th>
                    <td>{{ task.title }}</td>
                    <td>
                        <router-link :to="{ name: 'tasks.show', params: { id: task.id } }" class="btn btn-success">Open</router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'tasks.edit', params: { id: task.id } }" class="btn btn-primary">Edit</router-link>
                    </td>
                    <td>
                        <a @click.prevent="this.$store.dispatch('confirmActionDeleteTask', task.id)" href="#" class="btn btn-danger ml-1">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Index',

    mounted() {
        this.$store.dispatch('getTasks')
    },

    computed: {
        tasks() {
            return this.$store.getters.tasks
        }
    }
}
</script>

<style scoped>
</style>
