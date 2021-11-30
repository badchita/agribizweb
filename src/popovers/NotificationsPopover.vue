<template>
    <ion-list>
        <ion-list-header>
            <strong>
                <h4>Notifications</h4>
            </strong>
        </ion-list-header>
        <ion-item v-for="(item,i) in notifications_vendor" :key="i" lines="none" button @click="onClickItem(item)">
            <ion-label v-if="item.markRead === 0" class="ion-text-wrap" style="font-size: 14px; font-weight: 700;">
                {{item.title}}<br>
                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
            </ion-label>
            <ion-label v-else class="ion-text-wrap" style="font-size: 14px;">
                {{item.title}}<br>
                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
            </ion-label>
            <ion-icon v-if="item.markRead === 0" slot="end" color="primary" name="ellipse" style="font-size: 16px;" />
        </ion-item>
    </ion-list>
    <ion-button style="--box-shadow: none; bottom: 0;" expand="full" @click="onClickSeeAll">
        See All
    </ion-button>
</template>

<script>
    import NotificationVendorAPI from '@/api/notifications_vendor'

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

            function onClickItem(item) {
                let params = {
                    id: item.id,
                    markRead: 1,
                }
                if (item.order_id) {
                    NotificationVendorAPI.markAsRead(params).then(() => {
                        router.push(`/vendor/dashboards/detailsorders/${item.order_id}`)
                    })
                }

                popoverController.dismiss()
            }

            return {
                onClickSeeAll,
                onClickItem
            }
        }
    }
</script>