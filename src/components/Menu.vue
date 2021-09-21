<template>
    <ion-menu content-id="main-content" type="overlay">
        <ion-content>
            <ion-list id="inbox-list">
                <ion-list-header>Menu</ion-list-header>
                <ion-note>negrosagribiz.com</ion-note>

                <ion-menu-toggle auto-hide="false" v-for="(item, i) in appPages" :key="i">
                    <ion-item class="hydrated" router-direction="root" :router-link="item.url" lines="none"
                        detail="false" :class="{ selected: selectedIndex === i }" button @click="selectedIndex = i">
                        <ion-icon slot="start" :ios="item.iosIcon" :md="item.mdIcon"></ion-icon>
                        <ion-label>{{ item.title }}</ion-label>
                    </ion-item>
                </ion-menu-toggle>
            </ion-list>
        </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
</template>

<script>
    import {
        ref
    } from '@vue/reactivity';
    import {
        useRoute
    } from 'vue-router'
    export default {
        name: 'Menu',
        setup() {
            const router = useRoute()
            const selectedIndex = ref(0);

            const appPages = [{
                title: 'Products',
                url: '/dashboards/products',
                iosIcon: 'cube'
            },
            {
                title: 'Orders',
                url: '/dashboards/orders',
                iosIcon: 'receipt'
            }]

            function selectedItem(url) {
                url === router.path ? 'selected' : ''
            }
            return {
                selectedItem,
                appPages,
                selectedIndex
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/menu.scss';
</style>