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
    import {
        onMounted,
        ref
    } from '@vue/runtime-core'
    export default {
        props: {
            notifications_vendor: {
                type: Array,
                default: () => []
            },
            userData: {
                type: Object,
                default: (() => {})
            }
        },
        setup(props) {
            onMounted(() => {
                checkNewNotification()

                if (hasNew.value) {
                    updateHasNew()
                }
            })
            const router = useRouter()

            let hasNew = ref(false)

            function onClickSeeAll() {
                router.push(`/vendor/notifications-page`)

                popoverController.dismiss()
            }

            function updateHasNew() {
                const params = {
                    to_id: props.userData.id
                }
                NotificationVendorAPI.updateNew(params)
            }

            function checkNewNotification() {
                props.notifications_vendor.forEach((value) => {
                    switch (value.new) {
                        case 1: {
                            hasNew.value = true
                        }
                        break
                    }
                })
            }

            function onClickItem(item) {
                let params = {
                    id: item.id,
                    markRead: 1,
                }
                if (item.order_id) {
                    if (item.markRead === 0) {
                        NotificationVendorAPI.markAsRead(params).then(() => {
                            router.push(`/vendor/dashboards/detailsorders/${item.order_id}`)
                        })
                    } else {
                        router.push(`/vendor/dashboards/detailsorders/${item.order_id}`)
                    }
                } else if (item.product_id) {
                    if (item.markRead === 0) {
                        NotificationVendorAPI.markAsRead(params).then(() => {
                            router.push(`/vendor/dashboards/detailsproduct/${item.product_id}`)
                        })
                    } else {
                        router.push(`/vendor/dashboards/detailsproduct/${item.product_id}`)
                    }
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