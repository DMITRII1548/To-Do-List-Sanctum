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
                        <router-link :to="{ name: 'task.show', params: { id: task.id } }" class="btn btn-success">Open</router-link>
                    </td>
                    <td>
                        <router-link :to="{ name: 'task.edit', params: { id: task.id } }" class="btn btn-primary">Edit</router-link>
                    </td>
                    <td>
                        <a @click.prevent="confirmActionDeleteTask(task.id)" href="#" class="btn btn-danger ml-1">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Index',

    data() {
        return {
            tasks: [],
        }
    },

    mounted() {
        this.getTasks()
    },

    methods: {
        getTasks() {
            axios.get('/api/tasks')
                .then(res => {
                    this.tasks = res.data.data
                })
        },

        destroyTask(id) {
            axios.delete(`/api/tasks/${id}`)
                .then(res => {
                    this.getTasks()
                })
        },

        confirmActionDeleteTask(id) {
            if (confirm('Are you wanting to delete this task')) {
                this.destroyTask(id)
            }
        }
    },

}
</script>

<style scoped>
</style>
