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
                    <ion-avatar>
                        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                    </ion-avatar>
                    <ion-label>
                        Name
                    </ion-label>
                </ion-item>
            </ion-col>
        </ion-row>
        <!-- <ion-row>
            <ion-col v-for="(item, i) in navDetails" :key="i" :size="item.col_size">
                <ion-item lines="none" button @click="item.handler">
                    <ion-label>{{item.label}}</ion-label>
                </ion-item>
            </ion-col>
        </ion-row> -->
    </ion-toolbar>
</template>

<script>
    import {
        useRouter
    } from 'vue-router'

    export default {
        name: 'NavBar',
        components: {},
        setup() {
            const router = useRouter()

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

            return {
                navDetails,
                onClickHoneCol
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/nav-bar.scss';
</style>