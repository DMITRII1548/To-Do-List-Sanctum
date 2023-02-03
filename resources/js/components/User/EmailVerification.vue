<template>
    <div class="mt-5">
        <h1>Please verify your email.</h1>
        <h3>For it check your email.</h3>
        <h3>If you din't see message: </h3>
        <h4>1) Wait</h4>
        <h4>2) Check your spam folder</h4>
    </div>
    <div class="mt-4">
        <button :disabled="isSendEmailVerificationAgain" @click.prevent="sendEmailVerificationAgain()" class="btn btn-outline-success">You can send message to your email again after {{ abilitySendEmailAgain }} seconds</button>
    </div>
</template>

<script>
export default {
    name: 'EmailVerification',

    data() {
        return {
            abilitySendEmailAgain: 60,
            timerSetInterval: null
        }
    },

    created() {
        this.isVerifiedEmail()

        this.timerSetInterval = setInterval(() => {
            this.isVerifiedEmail()
        }, 10000)
    },

    mounted() {
        this.countDownTimer()
    },

    updated() {
        clearInterval(this.timerSetInterval)
    },

    destroyed() {
        clearInterval(this.timerSetInterval)
    },

    methods: {
        countDownTimer() {
            if (this.abilitySendEmailAgain < 0 ){
                this.abilitySendEmailAgain = 60
            }

            if (this.abilitySendEmailAgain > 0) {
                setTimeout(() => {
                    this.abilitySendEmailAgain -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },

        sendEmailVerificationAgain() {
            axios.post('/email/verification-notification')
                .then(res => {
                    this.abilitySendEmailAgain = 60
                    this.countDownTimer()
                })
        },

        isVerifiedEmail() {
            axios.post('/api/users/me')
                .then(res => {
                    if (res.data.data.email_verified) {
                        localStorage.setItem('verified_email', true)
                        this.$router.push({ name: 'user.personal' })
                    }
                })

        }
    },

    computed: {
        isSendEmailVerificationAgain() {
            if (this.abilitySendEmailAgain === 0) {
                return false
            } else {
                return true
            }
        }
    }
}
</script>
