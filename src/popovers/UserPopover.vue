<template>
    <ion-avatar>
        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
    </ion-avatar>
    <ion-label>
        <h2>{{userData.name}}</h2>
        <h3>{{userData.email}}</h3>
    </ion-label>
    <ion-button class="manage-account-button" fill="clear" expand="block" @click="onClickManageAccount">Manage Your
        Account</ion-button>
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
        props: {
            userData: {
                type: Object,
                default: function () {}
            },
        },
        setup() {
            const router = useRouter()
            const store = useStore()

            let logoutMessage = computed(() => store.state.auth.logoutMessage)

            function onClickManageAccount() {
                router.push(`/profile`)
                popoverController.dismiss()
            }

            async function onClickSignOut() {
                store.dispatch('auth/logout')
                    .then(() => {
                        onToast()
                        popoverController.dismiss()
                    }).finally(() => {
                        router.push('/')
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
                onClickSignOut,
                onClickManageAccount
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