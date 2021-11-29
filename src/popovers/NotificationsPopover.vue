<template>
    <ion-list>
        <ion-list-header>
            <strong>
                <h4>Notifications</h4>
            </strong>
        </ion-list-header>
        <ion-item v-for="(item,i) in 10" :key="i" lines="none" button>
            <ion-label slot="start" style="font-size: 14px;">
                Title<br>
                14/07/2021
            </ion-label>
            <ion-icon slot="end" color="primary" size="small" name="ellipse" />
        </ion-item>
    </ion-list>
    <ion-button style="--box-shadow: none; bottom: 0;" expand="full" @click="onClickSeeAll">
        See All
    </ion-button>
</template>

<script>
    import {
        popoverController
    } from '@ionic/core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            const router = useRouter()

            function onClickSeeAll() {
                router.push(`/vendor/notifications`)

                popoverController.dismiss()
            }

            return {
                onClickSeeAll
            }
        }
    }
</script>