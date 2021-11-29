<template>
    <ion-list>
        <ion-list-header>
            <strong>
                <h4>Notifications</h4>
            </strong>
        </ion-list-header>
        <ion-item v-for="(item,i) in notifications_vendor" :key="i" lines="none" button>
            <ion-label v-if="item.markRead === 0" class="ion-text-wrap" style="font-size: 14px; font-weight: 700;">
                {{item.title}}<br>
                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
            </ion-label>
            <ion-label v-else class="ion-text-wrap" style="font-size: 14px;">
                {{item.title}}<br>
                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
            </ion-label>
            <ion-icon slot="end" color="primary" name="ellipse" style="font-size: 16px;" />
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
        props: {
            notifications_vendor: {
                type: Array,
                default: () => []
            },
        },
        setup() {
            const router = useRouter()

            function onClickSeeAll() {
                router.push(`/vendor/notifications-page`)

                popoverController.dismiss()
            }

            return {
                onClickSeeAll
            }
        }
    }
</script>