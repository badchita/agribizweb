<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />

            <div class="container">
                <ion-grid>
                    <ion-item lines="none">
                        <ion-label class="header-title">{{pageTitle}}</ion-label>
                    </ion-item>
                    <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                    <ion-item lines="none">
                        <ion-label class="label-style">Order Information</ion-label>
                    </ion-item>
                    <ion-row>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Order Number</ion-label>
                                <ion-input class="input-style" v-model="order.order_number" />
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Order Total Price
                                </ion-label>
                                <ion-input class="input-style" type="number" v-model="order.order_total_price" />
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item class="ion-margin-top" lines="none">
                                <ion-label class="label-style" position="floating">Order Status</ion-label>
                                <ion-select class="select-style" cancelText="Cancel" okText="Ok"
                                    :value="order.order_status" @ionChange="onIonChangeGetSelectedOrderStatus($event)">
                                    <ion-select-option v-for="(item, i) in order_status" :key="i" :value="item.value">
                                        {{item.text}}</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Order Quantity</ion-label>
                                <ion-input class="input-style" v-model="order.quantity" />
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-item lines="none">
                        <ion-label class="label-style">Product Information</ion-label>
                    </ion-item>
                    <ion-row>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Product Name</ion-label>
                                <ion-input class="input-style" v-model="product_details.name" />
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Product Total Price</ion-label>
                                <ion-input class="input-style" v-model="order.product_total_price" />
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-item lines="none">
                        <ion-label class="label-style">Address Information</ion-label>
                    </ion-item>
                    <ion-row>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Ship From</ion-label>
                                <ion-input class="input-style" v-model="product_details.name" />
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Product Total Price</ion-label>
                                <ion-input class="input-style" v-model="order.product_total_price" />
                            </ion-item>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import OrderAPI from '@/api/orders'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core';
    import {
        useRouter
    } from 'vue-router';
    export default {
        name: 'UpdateOrder',
        components: {},
        setup() {
            onMounted(() => {
                loadOrder()
            })
            const router = useRouter()

            let order = ref({})
            let product_details = ref({})
            let ship_from_address_details= ref({})
            const isLoading = ref(false)

            const order_status = [{
                    text: 'New',
                    value: '0'
                }, {
                    text: 'Accepted',
                    value: '1'
                }, {
                    text: 'Processed',
                    value: '2'
                }, {
                    text: 'Delivered',
                    value: '3'
                },
                {
                    text: 'Recieved By Customer',
                    value: '4'
                }
            ]

            const pageTitle = computed(() => {
                return 'Update Order'
            })

            function onIonChangeGetSelectedOrderStatus(ev) {
                order.value.order_status = ev.detail.value
            }

            async function loadOrder(id) {
                id = router.currentRoute.value.params.id
                if (id)
                    isLoading.value = true;
                if (id) {
                    await OrderAPI.get(id).then((response) => {
                        order.value = response.data.data
                        product_details.value = response.data.data.product_details
                        ship_from_address_details.value = response.data.data.ship_from_address_details
                        console.log(order.value);
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        isLoading.value = false;
                    })
                }
            }
            return {
                order,
                pageTitle,
                order_status,
                onIonChangeGetSelectedOrderStatus,
                isLoading,
                product_details,
                ship_from_address_details
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>