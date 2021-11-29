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
                        User Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button class="details-update-button" slot="end" @click="onClickGoToUpdate(user.id)">
                            <ion-label>Update</ion-label>
                        </ion-button>
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <!-- user information -->
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                User Information
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Name</ion-label>
                            <div class="details-label">{{user.name}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>User Type</ion-label>
                            <div class="details-label">
                                <UserType :user_type="user.user_type" />
                            </div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Active</ion-label>
                            <div class="details-label">
                                <OnlineStatus :isOnline="user.isOnline" />
                            </div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Date Of Birth</ion-label>
                            <div class="details-label">{{user.birthday}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Email</ion-label>
                            <div class="details-label">{{user.email}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Username</ion-label>
                            <div class="details-label">{{user.username}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Mobile</ion-label>
                            <div class="details-label">{{user.mobile}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Date Joined</ion-label>
                            <div class="details-label">{{user.joined_date}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col size="3" class="details-col">
                            <ion-label>Status</ion-label>
                            <div v-if="user.status === 'O'" class="details-label">Enabled</div>
                            <div v-if="user.status === 'V'" class="details-label">Disabled</div>
                        </ion-col>
                        <ion-col size="3" class="details-col">
                            <ion-label>Status Verification</ion-label>
                            <div class="details-label">
                                <StatusVerification :status_verification="user.status_verification" />
                                <ion-button v-if="user.status_verification === 0" color="tertiary"
                                    class="ion-margin-start" size="small" @click="onClickUpdateStatusVerification(1)">
                                    Accept
                                </ion-button>
                                <ion-button v-if="user.status_verification === 1" color="secondary"
                                    class="ion-margin-start" size="small" @click="onClickUpdateStatusVerification(2)">
                                    Verify
                                </ion-button>
                            </div>
                        </ion-col>
                    </ion-row>

                    <!-- user's orders -->
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Orders
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-card style="overflow: visible">
                        <ion-card-content>
                            <ion-grid>
                                <ion-row class="header-row">
                                    <ion-col v-for="item in orderHeader" :key="item">
                                        {{item.text}}
                                    </ion-col>
                                </ion-row>
                                <div class="data-list">
                                    <ion-row class="data-row" v-for="(item,i) in orders" :key="i"
                                        @click="onClickRowDetails(item.id, 'orders')">
                                        <ion-col class="data-col">
                                            {{item.order_number}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            {{item.ship_from_address_details.city}},
                                            {{item.ship_from_address_details.province}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            {{item.ship_to_address_details.city}},
                                            {{item.ship_from_address_details.province}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            ₱{{numberWithCommaFormatt(item.order_total_price)}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            <OrderStatus :status="item.order_status" />
                                        </ion-col>
                                    </ion-row>
                                </div>
                            </ion-grid>
                        </ion-card-content>
                    </ion-card>

                    <!-- user's products -->
                    <div v-if="user.user_type === 'Seller'">
                        <ion-row class="ion-margin-top">
                            <ion-col>
                                <ion-label class="details-header-label">
                                    Products
                                </ion-label>
                            </ion-col>
                        </ion-row>
                        <ion-card style="overflow: visible">
                            <ion-card-content>
                                <ion-grid>
                                    <ion-row class="header-row">
                                        <ion-col v-for="item in productHeader" :key="item">
                                            {{item.text}}
                                        </ion-col>
                                    </ion-row>
                                    <div class="data-list">
                                        <ion-row class="data-row" v-for="(item,i) in products" :key="i"
                                            @click="onClickRowDetails(item.id, 'products')">
                                            <ion-col class="data-col">
                                                {{item.name}}
                                            </ion-col>
                                            <ion-col class="data-col">
                                                {{item.quantity}}
                                            </ion-col>
                                            <ion-col class="data-col">
                                                {{item.price}}
                                            </ion-col>
                                            <ion-col class="data-col">
                                                <ProductStatus :status="item.product_status" />
                                            </ion-col>
                                        </ion-row>
                                    </div>
                                </ion-grid>
                            </ion-card-content>
                        </ion-card>
                    </div>

                    <!-- user's shops -->
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label v-if="user.user_type === 'Seller'" class="details-header-label">
                                Shops
                            </ion-label>
                            <ion-label v-if="user.user_type === 'Customer'" class="details-header-label">
                                Adresses
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-card style="overflow: visible">
                        <ion-card-content>
                            <ion-grid>
                                <ion-row class="header-row">
                                    <ion-col v-for="item in addressesHeader" :key="item">
                                        {{item.text}}
                                    </ion-col>
                                </ion-row>
                                <div class="data-list">
                                    <ion-row class="data-row" v-for="(item,i) in addresses" :key="i"
                                        @click="onClickRowDetails(item.id, 'addresses')">
                                        <ion-col class="data-col">
                                            {{item.street_building}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            {{item.barangay}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            {{item.city}}
                                        </ion-col>
                                        <ion-col class="data-col">
                                            {{item.province}}
                                        </ion-col>
                                    </ion-row>
                                </div>
                            </ion-grid>
                        </ion-card-content>
                    </ion-card>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import UserAPI from '@/api/user'
    import OrderAPI from '@/api/orders'

    import OnlineStatus from '@/components/Users/OnlineStatus'
    import UserType from '@/components/Users/UserType'
    import OrderStatus from '@/components/OrderStatus'
    import ProductStatus from '@/components/ProductStatus'
    import StatusVerification from '@/components/Users/StatusVerification'

    import {
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'DetailProduct',
        components: {
            OnlineStatus,
            UserType,
            OrderStatus,
            ProductStatus,
            StatusVerification
        },
        data() {
            return {
                productHeader: [{
                        text: 'Name'
                    },
                    {
                        text: 'Quantity'
                    },
                    {
                        text: 'Price'
                    },
                    {
                        text: 'Status'
                    }
                ],
                addressesHeader: [{
                        text: 'Street/Building'
                    },
                    {
                        text: 'Barangay'
                    },
                    {
                        text: 'City'
                    },
                    {
                        text: 'Province'
                    },
                ],
                orderHeader: [{
                        text: 'Order Number'
                    },
                    {
                        text: 'Shipp From'
                    },
                    {
                        text: 'Shipp To'
                    },
                    {
                        text: 'Total Price'
                    },
                    {
                        text: 'Status'
                    },
                ],
            }
        },
        setup() {
            onMounted(() => {
                loadUser()
                setTimeout(() => {
                    loadOrder()
                }, 1000);
            })

            const router = useRouter()

            let user = ref({})
            let products = ref([])
            let addresses = ref([])
            let orders = ref([])
            const isLoading = ref(false)

            function onClickGoToUpdate(id) {
                router.push(`/dashboards/updateaddresses/${id}`)
            }

            function goBack() {
                router.go(-1)
            }

            function onClickRowDetails(id, type) {
                if (type === 'products')
                    router.push(`/vendor/dashboards/detailsproduct/${id}`)
                else if (type === 'addresses')
                    router.push(`/vendor/dashboards/detailsaddresses/${id}`)
                else if (type === 'orders')
                    router.push(`/vendor/dashboards/detailsorders/${id}`)
            }

            function onClickUpdateStatusVerification(status) {
                let payload = {
                    status_verification: status,
                    id: router.currentRoute.value.params.id
                }

                UserAPI.updateStatusVerification(payload).then(() => {
                    loadUser()
                })
            }

            async function loadUser(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await UserAPI.get(id)
                        .then((response) => {
                            user.value = response.data.data
                            products.value = response.data.data.products
                            addresses.value = response.data.data.addresses
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            async function loadOrder(id) {
                id = router.currentRoute.value.params.id
                const params = {
                    offset: 0,
                    limit: 10,
                    user_id: id,
                    status: 'O',
                }
                const api = user.value.user_type === 'Seller' ? OrderAPI.list(params) : OrderAPI.listCustomer(
                    params)
                await api.then((response) => {
                    orders.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            return {
                user,
                isLoading,
                onClickGoToUpdate,
                goBack,
                products,
                onClickRowDetails,
                addresses,
                orders,
                onClickUpdateStatusVerification
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>