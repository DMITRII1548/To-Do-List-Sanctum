<template>
    <div class="mb-5">
        <div class="mt-5">
            <input v-model="title" type="text" placeholder="title" class="form-control w-75">
        </div>
        <div class="mt-1">
            <textarea v-model="text" placeholder="text" class="form-control" rows="15"></textarea>
        </div>

        <button @click.prevent="createTask()" :disabled="isDisabled" type="submit" class="btn btn-success mt-3">Create</button>
    </div>
</template>

<script>
export default {
    name: 'Create',

    data() {
        return {
            title: '',
            text: ''
        }
    },

    methods: {
        createTask() {
            axios.post('/api/tasks', { title: this.title, text: this.text })
                .then(res => {
                    console.log(res)
                })
        }
    },

    computed: {
        isDisabled() {
            return this.title === '' || this.text === ''
        }
    }
}
</script>

<style scoped>
</style>
