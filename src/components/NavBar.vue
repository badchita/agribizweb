<template>
    <ion-toolbar>
        <ion-row>
            <ion-col class="home-col" size="9">
                <ion-button fill="clear" @click="onClickHoneCol">
                    <ion-icon name="leaf" />
                    <ion-label>Home</ion-label>
                </ion-button>
            </ion-col>
            <ion-col>
                <ion-item lines="none">
                    <ion-button fill="clear">
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
    import UserAPI from '@/api/user'

    import UserPopover from '@/popovers/UserPopover'
    import {
        useRouter
    } from 'vue-router'
    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    import {
        popoverController
    } from '@ionic/core'

    export default {
        name: 'NavBar',
        components: {},
        setup() {
            onMounted(() => {
                loadUserData()
            })
            const router = useRouter()
            const store = useStore()
            const userId = computed(() => store.state.auth.userId)

            const userData = ref({})

            const navDetails = [{
                    label: 'Home',
                    col_size: '2.4',
                    handler: () => {
                        router.push(`/home`)
                    }
                },
                {
                    label: 'Service Request',
                    col_size: '2.4'
                },
                {
                    label: 'Warranty Inquiry',
                    col_size: '2.4'
                },
                {
                    label: 'Customer Feedback',
                    col_size: '2.4'
                },
            ]

            function onClickHoneCol() {
                router.push(`/home`)
            }

            async function loadUserData() {
                await UserAPI.get(userId.value)
                    .then((response) => {

                        userData.value = response.data
                    })
            }


            async function onClickItemUser(ev) {
                let popover = await popoverController.create({
                    component: UserPopover,
                    componentProps: {},
                    showBackdrop: false,
                    event: ev
                })

                await popover.present();
            }

            return {
                navDetails,
                onClickHoneCol,
                userData,
                onClickItemUser
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/nav-bar.scss';
</style>