<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Product List" routerUrl="/vendor/dashboards/updateproduct" />

                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Name" @ionInput="onInputSearch($event)"></ion-searchbar>
                    </ion-col>
                    <ion-col size="1.8">
                        <ion-item lines="none">
                            <ion-label position="floating">Show</ion-label>
                            <ion-select value="10">
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
                            <ion-row class="header-row">
                                <ion-col v-for="item in productHeader" :key="item">
                                    {{item.text}}
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && productSearch.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in productSearch" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col v-if="item.quantity ===  0" style="color: #eb445a;" class="data-col">
                                        {{item.quantity}}
                                    </ion-col>
                                    <ion-col v-else class="data-col">
                                        {{item.quantity}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        ₱{{numberWithCommaFormatt(item.price)}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ProductStatus :status="item.product_status" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button
                                                v-if="item.status === 'V' && item.product_status === 'Available'"
                                                class="restore-button" @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>

                            <div v-else class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in product" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col v-if="item.quantity ===  0" style="color: #eb445a;" class="data-col">
                                        {{item.quantity}}
                                    </ion-col>
                                    <ion-col v-else class="data-col">
                                        {{item.quantity}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        ₱{{numberWithCommaFormatt(item.price)}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ProductStatus :status="item.product_status" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button
                                                v-if="item.status === 'V' && item.product_status === 'Available' || item.product_status === 'Archive'"
                                                class="restore-button" @click="onClickArchiveRestore(item, $event, i)">
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
    import ProductAPI from '@/api/product'

    import ProductStatus from '@/components/ProductStatus'

    import {
        computed,
        onMounted,
        onUpdated,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    import {
        alertController
    } from '@ionic/core'
    import {
        useStore
    } from 'vuex'
    export default {
        name: 'Products',
        components: {
            ProductStatus
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
                    },
                    {
                        text: 'Action'
                    },
                ]
            }
        },
        setup() {
            onMounted(() => {
                loadProduct(userData.value.id, status.value)
            })
            onUpdated(() => {
                loadProduct(userData.value.id, status.value)
            })

            const router = useRouter()
            const store = useStore()

            let product = ref({})
            let productSearch = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            let searchInput = ref('')
            const isLoading = ref(false)

            const userData = computed(() => store.state.user.userData)

            function onClickGoToUpdate(id, ev) {
                ev.stopPropagation();
                router.push(`/vendor/dashboards/updateproduct/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/vendor/dashboards/detailsproduct/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadProduct(userData.value.id, status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadProduct(userData.value.id, status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadProduct(userData.value.id, status.value)
                }
            }

            async function onClickArchive(item, ev, i) {
                ev.stopPropagation();
                const alert = await alertController.create({
                    header: 'Archive',
                    message: '<strong>Are you sure you want to Archive this Product?</strong>',
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

                if (item.product_status === 'Available')
                    item.product_status = 'Archive'
                else if (item.product_status === 'Archive')
                    item.product_status = 'Available'
                else
                    item.product_status = 'Out Of Stocks'

                activeSelect.value !== 'All' ? product.value.splice(i, 1) : ''

                await ProductAPI.archive(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadProduct(uId, s) {
                isLoading.value = true;
                const api = userData.value.user_type === 'Admin' ? ProductAPI.listAdmin(uId, s) : ProductAPI.list(
                    uId, s)
                await api.then((response) => {
                    product.value = response.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value
                await ProductAPI.search(searchInput.value).then((response) => {
                    productSearch.value = response.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                product,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                onIonChangeGetSelectedStatus,
                status,
                onClickArchive,
                onClickArchiveRestore,
                activeSelect,
                searchInput,
                onInputSearch,
                productSearch
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/products.scss';
</style>