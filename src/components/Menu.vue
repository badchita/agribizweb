<template>
    <ion-menu content-id="main-content" type="overlay" menu-id="main-menu">
        <ion-content>
            <ion-list id="inbox-list">
                <ion-list-header>Menu</ion-list-header>
                <ion-note>negrosagribiz.com</ion-note>

                <div v-if="userType === 'Seller'">
                    <ion-menu-toggle v-for="(item, i) in appPages" :key="i">
                        <ion-item class="hydrated" router-direction="root" :router-link="item.url" lines="none"
                            detail="false" :class="{ selected: selectedIndex === i }" button @click="selectedIndex = i">
                            <ion-icon slot="start" :ios="item.iosIcon" :md="item.mdIcon"></ion-icon>
                            <ion-label>{{ item.title }}</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                </div>
                <div v-if="userType === 'Admin'">
                    <ion-menu-toggle v-for="(item, i) in adminPages" :key="i">
                        <ion-item class="hydrated" router-direction="root" :router-link="item.url" lines="none"
                            detail="false" :class="{ selected: selectedIndex === i }" button @click="selectedIndex = i">
                            <ion-icon slot="start" :ios="item.iosIcon" :md="item.mdIcon"></ion-icon>
                            <ion-label>{{ item.title }}</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                </div>
            </ion-list>
        </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
</template>

<script>
    import {
        computed,
        ref
    } from '@vue/reactivity';
    import {
        useRoute
    } from 'vue-router'
    import {
        useStore
    } from 'vuex';

    export default {
        name: 'Menu',
        setup() {
            const router = useRoute()
            const store = useStore()

            const selectedIndex = ref(0);

            const userType = computed(() => store.state.auth.userType)

            const adminPages = [{
                    title: 'Users',
                    url: '/admin/dashboards/users',
                    iosIcon: 'people'
                },
                {
                    title: 'Dashboards',
                    url: '/admin/dashboards/dashboard',
                    iosIcon: 'bar-chart'
                },
                {
                    title: 'Products',
                    url: '/vendor/dashboards/products',
                    iosIcon: 'cube'
                },
                {
                    title: 'Addresses',
                    url: '/vendor/dashboards/addresses',
                    iosIcon: 'business'
                },
                {
                    title: 'Orders',
                    url: '/vendor/dashboards/orders',
                    iosIcon: 'receipt'
                },
                {
                    title: 'Chats',
                    url: '/vendor/dashboards/chats',
                    iosIcon: 'chatbubble-ellipses'
                },
                {
                    title: 'Notifications',
                    url: '/vendor/dashboards/notifications',
                    iosIcon: 'notifications'
                }
            ]

            const appPages = [{
                    title: 'My Products',
                    url: '/vendor/dashboards/products',
                    iosIcon: 'cube'
                },
                {
                    title: 'My Addresses',
                    url: '/vendor/dashboards/addresses',
                    iosIcon: 'business'
                },
                {
                    title: 'My Orders',
                    url: '/vendor/dashboards/orders',
                    iosIcon: 'receipt'
                },
                {
                    title: 'Chats',
                    url: '/vendor/dashboards/chats',
                    iosIcon: 'chatbubble-ellipses'
                },
                {
                    title: 'Notifications',
                    url: '/vendor/dashboards/notifications',
                    iosIcon: 'notifications'
                }
            ]

            function selectedItem(url) {
                url === router.path ? 'selected' : ''
            }

            return {
                selectedItem,
                appPages,
                selectedIndex,
                userType,
                adminPages
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/menu.scss';
</style>