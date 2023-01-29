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

    destroyTask({ dispatch }, id) {
        axios.delete(`/api/tasks/${id}`)
            .then(res => {
                dispatch('getTasks')
                router.push({ name: 'task.index' })
            })
    },

    confirmActionDeleteTask({ dispatch }, id) {
        if (confirm('Are you really wanting to delete this task')) {
            dispatch('destroyTask', id)
        }
    },

    getTask({ commit }, id) {
        axios.get(`/api/tasks/${id}`)
            .then(res => {
                commit('setTask', res.data.data)
            })
    },

    createTask({}, data) {
        axios.post('/api/tasks', { title: data.title, text: data.text })
            .then(res => {
                router.push({ name: 'task.show', params: { id: res.data.data.id } })
            })
    },

    updateTask({}, data) {
        axios.patch(`/api/tasks/${data.id}`, { title: data.title, text: data.text })
            .then(res => {
                router.push({ name: 'task.show', props: { id: data.id } })
            })
    }
}

const getters = {
    tasks: state => state.tasks,
    task: state => state.task,
}

const mutations = {
    setTask(state, task) {
        state.task = task
    },

    setTasks(state, tasks) {
        state.tasks = tasks
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
