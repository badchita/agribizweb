<template>
    <ion-toolbar>
        <ion-row>
            <ion-col class="home-col" size="9">
                <ion-button fill="clear" @click="onClickHomeCol">
                    <ion-icon name="leaf" />
                    <ion-label>Home</ion-label>
                </ion-button>
            </ion-col>
            <ion-col>
                <ion-item lines="none">
                    <ion-button fill="clear" @click="onClickNotification($event)">
                        <ion-icon slot="icon-only" name="notifications" />
                    </ion-button>
                    <ion-item lines="none" button @click="onClickItemUser($event)">
                        <ion-avatar>
                            <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                        </ion-avatar>
                        <ion-label>
                            {{userData.name}}
                        </ion-label>
                    </ion-item>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-toolbar>
</template>

<script>
    import UserPopover from '@/popovers/UserPopover'
    import NotificationsPopover from '@/popovers/NotificationsPopover'

    import {
        useRouter
    } from 'vue-router'
    import {
        computed,
        onMounted,
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    import {
        menuController,
        popoverController
    } from '@ionic/core'

    export default {
        name: 'NavBar',
        components: {},
        setup() {
            onMounted(() => {
                console.log(userData);
            })
            const router = useRouter()
            const store = useStore()

            const userData = computed(() => store.state.user.userData)

            function onClickHomeCol() {
                router.push(`/vendor/home`)
            }

            async function onClickItemUser(ev) {
                let popover = await popoverController.create({
                    component: UserPopover,
                    componentProps: {
                        userData: userData.value
                    },
                    showBackdrop: false,
                    event: ev
                })

                await popover.present();
            }
            async function onClickOpenMenu() {
                await menuController.open();
            }
            async function onClickNotification(ev) {
                let popover = await popoverController.create({
                    component: NotificationsPopover,
                    // componentProps: {
                    //     userData: userData.value
                    // },
                    showBackdrop: false,
                    event: ev
                })

                await popover.present();
            }

            return {
                onClickHomeCol,
                userData,
                onClickItemUser,
                onClickOpenMenu,
                onClickNotification
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/nav-bar.scss';
</style>