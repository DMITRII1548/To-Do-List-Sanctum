<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Title</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks">
                    <th scope="row">{{ task.id }}</th>
                    <td>{{ task.title }}</td>
                    <td><router-link :to="{ name: 'task.show', params: { id: task.id } }" class="btn btn-primary">Open</router-link></td>
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
    },

}
</script>

<style scoped>

</style>
