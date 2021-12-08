<template>
    <ion-avatar>
        <img :src="thumbnailPath">
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
    import AuthAPI from '@/api/auth'
    import ResourceURL from '@/api/resourceURL'

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
        computed,
        ref
    } from '@vue/reactivity';
    import {
        onMounted
    } from '@vue/runtime-core';
    export default {
        props: {
            userData: {
                type: Object,
                default: function () {}
            },
        },
        setup() {
            onMounted(() => {
                getThumbnail(userData.value.profile_picture)
            })
            const router = useRouter()
            const store = useStore()

            let thumbnailPath = ref('')

            const userData = computed(() => store.state.user.userData)
            let loginResponse = computed(() => store.state.auth.response)

            function onClickManageAccount() {
                router.push(`/profile`)
                popoverController.dismiss()
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png'
                }
            }

            async function onClickSignOut() {
                AuthAPI.logout(loginResponse.value).then((response) => {
                    store.dispatch('user/removeUserData')
                    onToast(response.data.message)
                    popoverController.dismiss()
                }).finally(() => {
                    router.push('/')
                    setTimeout(() => {
                        router.go()
                    }, 500)
                })
            }
            async function onToast(m) {
                const toast = await toastController.create({
                    message: m,
                    color: 'success',
                    position: 'top',
                    duration: 2000,
                    cssClass: 'toast-style',
                })
                return toast.present();
            }
            return {
                onClickSignOut,
                onClickManageAccount,
                getThumbnail,
                thumbnailPath
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