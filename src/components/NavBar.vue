<template>
    <ion-toolbar>
        <ion-row>
            <ion-col v-for="(item, i) in navDetails" :key="i" :size="item.col_size">
                <ion-item lines="none" button @click="item.handler">
                    <ion-label>{{item.label}}</ion-label>
                </ion-item>
            </ion-col>
        </ion-row>
    </ion-toolbar>
</template>

<script>
    import {
        useRouter
    } from 'vue-router'

    export default {
        name: 'NavBar',
        components: {
        },
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

            return {
                navDetails
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/nav-bar.scss';
</style>