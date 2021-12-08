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
                        <ion-badge v-if="newNotification.length > 0" class="notification-badge">
                            {{newNotification.length}}
                        </ion-badge>
                    </ion-button>
                    <ion-item lines="none" button @click="onClickItemUser($event)">
                        <ion-avatar>
                            <img :src="thumbnailPath">
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
    import NotificationVendorAPI from '@/api/notifications_vendor'
    import ResourceURL from '@/api/resourceURL'

    import UserPopover from '@/popovers/UserPopover'
    import NotificationsPopover from '@/popovers/NotificationsPopover'

    import {
        useRouter
    } from 'vue-router'
    import {
        computed,
        onMounted,
        ref,
        watch,
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
                loadNotificationVendor()
                setTimeout(() => {
                    getThumbnail(userData.value.profile_picture)
                }, 1500)
            })
            const router = useRouter()
            const store = useStore()

            let newNotification = ref([])
            let notifications_vendor = ref([])
            let thumbnailPath = ref('')

            const userData = computed(() => store.state.user.userData)
            watch(newNotification, function (val) {
                newNotification = val
            })

            function onClickHomeCol() {
                router.push(`/vendor/home`)
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png'
                }
            }

            function loadNotificationVendor() {
                const params = {
                    offset: 0,
                    limit: 10,
                    to_id: userData.value.id
                }
                NotificationVendorAPI.list(params).then((response) => {
                    // notifications_vendor.value = response.data.data
                    response.data.data.forEach((value) => {
                        switch (value.new) {
                            case 1: {
                                newNotification.value.push(value)
                            }
                            break
                        }
                    })
                })
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
                    componentProps: {
                        notifications_vendor: notifications_vendor.value,
                        userData: userData.value
                    },
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
                onClickNotification,
                newNotification,
                getThumbnail,
                thumbnailPath
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/nav-bar.scss';
</style>