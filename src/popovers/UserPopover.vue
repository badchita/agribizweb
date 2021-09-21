<template>
    <ion-avatar>
        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
    </ion-avatar>
    <ion-label>
        <h2>name</h2>
        <h3>email</h3>
    </ion-label>
    <ion-button class="manage-account-button" fill="clear" expand="block">Manage Your Account</ion-button>
    <ion-button class="signout-button" fill="clear" expand="block" @click="onClickSignOut">Sign Out</ion-button>
</template>

<script>
    import {
        popoverController,
        toastController
    } from '@ionic/core';
    import {
        useRouter
    } from 'vue-router';
    import {
        useStore
    } from 'vuex';
    import {
        computed
    } from '@vue/reactivity';
    export default {
        setup() {
            const router = useRouter()
            const store = useStore()

            let logoutMessage = computed(() => store.state.auth.logoutMessage)

            async function onClickSignOut() {
                store.dispatch('auth/logout')
                    .then(() => {
                        onToast()
                        popoverController.dismiss()
                    }).finally(() => {
                        router.push('/login')
                    })
            }

            async function onToast() {
                const toast = await toastController.create({
                    message: logoutMessage.value,
                    color: 'success',
                    position: 'top',
                    duration: 2000,
                    cssClass: 'toast-style',
                })
                return toast.present();
            }
            return {
                onClickSignOut
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/user-popover.scss';

    .toast-style {
        width: 1000px;
    }
</style>