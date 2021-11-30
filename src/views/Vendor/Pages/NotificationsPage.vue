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
                        <ion-item v-for="(item,i) in notifications_vendor" :key="i" lines="none" button
                            @click="onClickItem(item)">
                            <ion-label v-if="item.markRead === 0" class="ion-text-wrap"
                                style="font-size: 16px; font-weight: 700;">
                                {{item.title}}<br>
                                <p style="font-size: 12px;">{{item.subject}}</p>
                                <p style="font-size: 12px;">{{item.description}}</p>
                                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
                            </ion-label>
                            <ion-label v-else class="ion-text-wrap" style="font-size: 16px;">
                                {{item.title}}<br>
                                <p style="font-size: 12px;">{{item.subject}}</p>
                                <p style="font-size: 12px;">{{item.description}}</p>
                                <p style="font-size: 12px;">{{formatDate(item.created_at)}}</p>
                            </ion-label>
                            <ion-icon v-if="item.markRead === 0" slot="end" color="primary" size="small" name="ellipse" />
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
    import NotificationVendorAPI from '@/api/notifications_vendor'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            onMounted(() => {
                loadNotificationVendor()
            })

            const router = useRouter()
            const store = useStore()

            let notifications_vendor = ref([])

            const userData = computed(() => store.state.user.userData)

            function loadNotificationVendor() {
                const params = {
                    offset: 0,
                    limit: 10,
                    to_id: userData.value.id
                }
                NotificationVendorAPI.list(params).then((response) => {
                    notifications_vendor.value = response.data.data
                })
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
                } else if (item.product_id) {
                    NotificationVendorAPI.markAsRead(params).then(() => {
                        router.push(`/vendor/dashboards/detailsproduct/${item.product_id}`)
                    })
                }

            }
            return {
                notifications_vendor,
                onClickItem
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/notifications.scss';
</style>