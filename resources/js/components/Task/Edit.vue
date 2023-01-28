<template>
    <div class="mb-5">
        <div class="mt-5">
            <input v-model="title" type="text" placeholder="title" class="form-control w-75">
        </div>
        <div class="mt-1">
            <textarea v-model="text" placeholder="text" class="form-control" rows="15"></textarea>
        </div>

        <button @click.prevent="updateTask()" :disabled="isDisabled" type="submit" class="btn btn-success mt-3">Edit</button>
    </div>
</template>

<script>
export default {
    name: 'Edit',

    data() {
        return {
            title: '',
            text: ''
        }
    },

    mounted() {
        this.getTask()
    },

    methods: {
        getTask() {
            axios.get(`/api/tasks/${this.id}`)
                .then(res => {
                    this.title = res.data.data.title
                    this.text = res.data.data.text
                })
        },

        updateTask() {
            axios.patch(`/api/tasks/${this.id}`, { title: this.title, text: this.text })
                .then(res => {
                    this.$router.push({ name: 'task.show', props: { id: this.id } })
                })
        }
    },

    computed: {
        id() {
            return this.$route.params.id
        },

        isDisabled() {
            return this.title === '' || this.text === ''
        }
    }
}
</script>

<style scoped>
</style>
