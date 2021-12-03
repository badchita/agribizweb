<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Order List" routerUrl="/vendor/dashboards/updateorder" />

                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Order Number" @ionInput="onInputSearch($event)">
                        </ion-searchbar>
                    </ion-col>
                    <ion-col size="1.8">
                        <ion-item lines="none">
                            <ion-label position="floating">Show</ion-label>
                            <ion-select value="10" @IonChange="onIonChangeShowLimit($event)">
                                <ion-select-option value="10">10</ion-select-option>
                                <ion-select-option value="25">25</ion-select-option>
                                <ion-select-option value="50">50</ion-select-option>
                                <ion-select-option value="100">100</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                    <ion-col size="2.1">
                        <ion-item lines="none">
                            <ion-label position="floating">Status</ion-label>
                            <ion-select :value="activeSelect" @ionChange="onIonChangeGetSelectedStatus($event)">
                                <ion-select-option value="All">All</ion-select-option>
                                <ion-select-option value="Open">Open</ion-select-option>
                                <ion-select-option value="Archived">Archived</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-card style="overflow: visible">
                    <ion-card-content>
                        <ion-grid>
                            <ion-row class="row-header">
                                <ion-col>
                                    Order Number
                                </ion-col>
                                <ion-col>
                                    Shipp From
                                </ion-col>
                                <ion-col>
                                    Shipp To
                                </ion-col>
                                <ion-col>
                                    Total Price
                                </ion-col>
                                <ion-col>
                                    Status
                                </ion-col>
                                <ion-col>
                                    Action
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && orderSearch.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in orderSearch" :key="i"
                                    @click="onClickRowDetails(item.id)">
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
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <!-- <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button> -->
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'V'" class="restore-button"
                                                @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>

                            <div v-else class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in order" :key="i"
                                    @click="onClickRowDetails(item.id)">
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
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <!-- <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button> -->
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'V'" class="restore-button"
                                                @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import OrderAPI from '@/api/orders'

    import OrderStatus from '@/components/OrderStatus'

    import {
        computed,
        onMounted,
        onUpdated,
        ref,
        watch
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    import {
        alertController
    } from '@ionic/core'
    export default {
        name: 'Order',
        components: {
            OrderStatus
        },
        setup() {
            onMounted(() => {
                loadOrder(userData.value.id, status.value, 10)
            })

            onUpdated(() => {
                render.value = true
            })

            const router = useRouter()
            const store = useStore()

            let order = ref({})
            let orderSearch = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            let searchInput = ref('')
            let render = ref(false)
            const isLoading = ref(false)

            watch(render.value, function(val) {
                console.log(val);
            })

            const userData = computed(() => store.state.user.userData)

            function onClickGoToUpdate(id) {
                router.push(`/vendor/dashboards/updateorder/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/vendor/dashboards/detailsorders/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadOrder(userData.value.id, status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadOrder(userData.value.id, status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadOrder(userData.value.id, status.value)
                }
            }

            function onIonChangeShowLimit(ev) {
                loadOrder(userData.value.id, status.value, ev.detail.value)
            }

            async function onClickArchive(item, ev, i) {
                ev.stopPropagation();
                const alert = await alertController.create({
                    header: 'Archive',
                    message: '<strong>Are you sure you want to Archive this Address?</strong>',
                    buttons: [{
                        text: 'Yes',
                        handler: () => {
                            onClickArchiveRestore(item, ev, i)
                        }
                    }, {
                        text: 'No',
                        role: 'cancel'
                    }]
                })

                return alert.present();
            }
            async function onClickArchiveRestore(item, ev, i) {
                ev.stopPropagation();
                isLoading.value = true;
                item.status === 'O' ? item.status = 'V' : item.status = 'O'

                activeSelect.value !== 'All' ? order.value.splice(i, 1) : ''

                await OrderAPI.archive(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadOrder(uId, s, limit) {
                isLoading.value = true;
                const params = {
                    offset: 0,
                    limit: limit,
                    user_id: uId,
                    status: s,
                }
                const api = userData.value.user_type === 'Admin' ? OrderAPI.listAdmin(params) : OrderAPI.list(
                    params)

                await api.then((response) => {
                    order.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value

                const api = userData.value.user_type === 'Admin' ? OrderAPI.searchAll(searchInput.value) :  OrderAPI.search(searchInput.value, userData.value.id)

                await api.then((response) => {
                    orderSearch.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                order,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                onIonChangeGetSelectedStatus,
                activeSelect,
                onClickArchive,
                onClickArchiveRestore,
                onInputSearch,
                searchInput,
                orderSearch,
                onIonChangeShowLimit
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>