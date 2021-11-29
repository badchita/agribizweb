<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <NavBar />
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-list>
                        <ion-list-header>
                            <strong>
                                <h1>Notifications</h1>
                            </strong>
                        </ion-list-header>
                        <ion-item v-for="(item,i) in 10" :key="i" lines="none" button>
                            <ion-label slot="start" style="font-size: 16px;">
                                Title<br>
                                14/07/2021
                            </ion-label>
                            <ion-icon slot="end" color="primary" size="small" name="ellipse" />
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
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
    @import '@/assets/css/global.scss';
    @import '@/assets/css/notifications.scss';
</style>