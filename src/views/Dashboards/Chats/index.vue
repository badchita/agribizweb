<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <ion-split-pane content-id="main-content">
                <ion-list>
                    <ion-list-header>
                        <ion-label>Chats</ion-label>
                    </ion-list-header>

                    <ion-item v-for="(item, i) in 10" :key="i" class="hydrated"
                        :class="{ selected: selectedIndex === i }" lines="none" button>
                        <ion-avatar>
                            <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                            name
                            <ion-label>
                                name
                            </ion-label>
                        </ion-avatar>
                    </ion-item>
                </ion-list>
                <ion-content id="main-content">
                    test
                </ion-content>
            </ion-split-pane>
        </ion-content>
    </ion-page>
</template>

<script>
    export default {
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/menu.scss';
</style>