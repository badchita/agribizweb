<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />

            <div class="container">
                <ion-item lines="none">
                    <ion-label class="header-title">
                        Order Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Order Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Order Number</ion-label>
                            <div class="details-label">{{order.order_number}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Order Total Price</ion-label>
                            <div class="details-label">₱{{numberWithCommaFormatt(order.order_total_price)}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Status</ion-label> <br>
                            <OrderStatus :status="order.order_status" />
                            <ion-button v-if="order.order_status === '0'" style="--background: #7044ff;"
                                class="ion-margin-start" size="small" @click="onClickUpdateStatus('1')">Accept
                            </ion-button>
                            <ion-button v-if="order.order_status === '1'" style="--background: #ffc107;"
                                class="ion-margin-start" size="small" @click="onClickUpdateStatus('2')">Process
                            </ion-button>
                            <ion-button v-if="order.order_status === '2'" style="--background: #6c757d;"
                                class="ion-margin-start" size="small" @click="onClickUpdateStatus('3')">Delivered
                            </ion-button>
                            <ion-button v-if="order.order_status === '3'" style="--background: #28a745;"
                                class="ion-margin-start" size="small" @click="onClickUpdateStatus('4')">Recieved By
                                Customer</ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="details-col">
                            <ion-label>Date Ordered</ion-label>
                            <div class="details-label">{{formatDate(order.created_at)}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Product Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Product Name</ion-label>
                            <div class="details-label">{{product_details.name}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Product Total Price</ion-label>
                            <div class="details-label">₱{{numberWithCommaFormatt(order.product_total_price)}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Quantity</ion-label> <br>
                            <div class="details-label">{{order.quantity}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Address Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="details-col">
                            <ion-label>Ship From</ion-label>
                            <div class="details-label">
                                {{addressFormatt(ship_from_address_details.street_building, ship_from_address_details.barangay, ship_from_address_details.city, ship_from_address_details.province)}}
                            </div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Ship To</ion-label>
                            <div class="details-label">
                                {{addressFormatt(ship_to_address_details.street_building, ship_to_address_details.barangay, ship_to_address_details.city, ship_to_address_details.province)}}
                            </div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Customer Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="details-col">
                            <ion-label>Username</ion-label>
                            <div class="details-label">
                                {{customer_details.username}}
                            </div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Mobile</ion-label>
                            <div class="details-label">
                                {{customer_details.mobile}}
                            </div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Email</ion-label>
                            <div class="details-label">
                                {{customer_details.email}}
                            </div>
                        </ion-col>
                    </ion-row>

                    <div v-if="userData.user_type === 'Admin'">
                        <ion-row class="ion-margin-top">
                            <ion-col>
                                <ion-label class="details-header-label">
                                    Seller Information
                                </ion-label>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col class="details-col">
                                <ion-label>Username</ion-label>
                                <div class="details-label">
                                    {{seller_details.username}}
                                </div>
                            </ion-col>
                            <ion-col class="details-col">
                                <ion-label>Mobile</ion-label>
                                <div class="details-label">
                                    {{seller_details.mobile}}
                                </div>
                            </ion-col>
                            <ion-col class="details-col">
                                <ion-label>Email</ion-label>
                                <div class="details-label">
                                    {{seller_details.email}}
                                </div>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import OrderAPI from '@/api/orders'

    import OrderStatus from '@/components/OrderStatus'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    export default {
        components: {
            OrderStatus,
        },
        setup() {
            onMounted(() => {
                loadOrder()
            })

            const router = useRouter()
            const store = useStore()

            let order = ref({})
            let product_details = ref({})
            let ship_from_address_details = ref({})
            let ship_to_address_details = ref({})
            let customer_details = ref({})
            let seller_details = ref({})
            const isLoading = ref(false)

            let userData = computed(() => store.state.user.userData)

            function goBack() {
                router.push(`/vendor/dashboards/orders`)
            }

            function addressFormatt(street, brangay, city, province) {
                return street + ', ' + brangay + ', ' + city + ', ' + province
            }

            function onClickUpdateStatus(status) {
                let payload = {
                    id: router.currentRoute.value.params.id,
                    seller_id: order.value.seller_id,
                    order_status: status,
                    product_total_price: order.value.product_total_price,
                    quantity: order.value.quantity,
                    product_id: order.value.product_id,
                    order_number: order.value.order_number,
                    user_id: order.value.user_id,
                    order_id: order.value.id
                }

                OrderAPI.updateStatus(payload).then(() => {
                    loadOrder()
                })
            }
            async function loadOrder(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await OrderAPI.get(id).then((response) => {
                            order.value = response.data.data
                            product_details.value = response.data.data.product_details
                            ship_from_address_details.value = response.data.data.ship_from_address_details
                            ship_to_address_details.value = response.data.data.ship_to_address_details
                            customer_details.value = response.data.data.customer_details
                            seller_details.value = response.data.data.seller_details
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }

            return {
                goBack,
                order,
                isLoading,
                product_details,
                addressFormatt,
                ship_from_address_details,
                ship_to_address_details,
                onClickUpdateStatus,
                customer_details,
                seller_details,
                userData
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>