import router from "../../router"

const state = {
    tasks: [],
    task: []
}

const actions = {
    getTasks({ commit }) {
        axios.get('/api/tasks')
            .then(res => {
                commit('setTasks', res.data.data)
            })
    },

    destroyTask({dispatch}, id) {
        axios.delete(`/api/tasks/${id}`)
            .then(res => {
                this.dispatch('getTasks')
            })
    },

    confirmActionDeleteTask({dispatch}, id) {
        if (confirm('Are you really wanting to delete this task')) {
            this.dispatch('destroyTask', id)
        }
    }
}

const getters = {
    tasks: state => state.tasks,
    task: state => state.task
}

const mutations = {
    setTask(state, task) {
        state.task = task
    },

    setTasks(state, tasks) {
        state.tasks = tasks
    }
}

export default {
    state,
    actions,
    getters,
    mutations,
}
