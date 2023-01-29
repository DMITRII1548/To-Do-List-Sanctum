<template>
    <div class="mb-5">
        <div class="mt-5">
            <input v-model="task.title" type="text" placeholder="title" class="form-control w-75">
        </div>
        <div class="mt-1">
            <textarea v-model="task.text" placeholder="text" class="form-control" rows="15"></textarea>
        </div>

        <button @click.prevent="this.$store.dispatch('updateTask', {id, title: task.title, text: task.text})" :disabled="isDisabled" type="submit" class="btn btn-success mt-3">Edit</button>
    </div>
</template>

<script>
export default {
    name: 'Edit',

    mounted() {
        this.$store.dispatch('getTask', this.id)
    },

    computed: {
        id() {
            return this.$route.params.id
        },

        isDisabled() {
            return this.task.title === '' || this.task.text === ''
        },

        task() {
            return this.$store.getters.task
        }
    }
}
</script>

<style scoped>
</style>
