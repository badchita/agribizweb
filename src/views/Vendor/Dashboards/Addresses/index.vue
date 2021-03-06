<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Addresses List" routerUrl="/vendor/dashboards/updateaddresses" />

                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by City" @ionInput="onInputSearch($event)"></ion-searchbar>
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
                                <ion-col v-for="item in addressesHeader" :key="item">
                                    {{item.text}}
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && addressesSearch.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in addressesSearch" :key="i"
                                    @click="onClickRowDetails(item.id)">
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
                                            <ion-button v-if="item.status === 'V'" class="restore-button"
                                                @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>

                            <div v-else class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in addresses" :key="i"
                                    @click="onClickRowDetails(item.id)">
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
    import AddressesAPI from '@/api/addresses'

    import {
        computed,
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
        name: 'Addresses',
        components: {},
        data() {
            return {
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
                    {
                        text: 'Action'
                    },
                ]
            }
        },
        setup() {
            onUpdated(() => {
                if (router.currentRoute.value.path === '/vendor/dashboards/addresses')
                    loadAddresses(userData.value.id, status.value)
            })

            const router = useRouter()
            const store = useStore()

            let addresses = ref({})
            let addressesSearch = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            let searchInput = ref('')

            const isLoading = ref(false)

            const userData = computed(() => store.state.user.userData)

            function onClickGoToUpdate(id, ev) {
                ev.stopPropagation();
                router.push(`/vendor/dashboards/updateaddresses/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/vendor/dashboards/detailsaddresses/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadAddresses(userData.value.id, status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadAddresses(userData.value.id, status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadAddresses(userData.value.id, status.value)
                }
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

                activeSelect.value !== 'All' ? addresses.value.splice(i, 1) : ''

                await AddressesAPI.archive(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadAddresses(uId, s) {
                isLoading.value = true;
                const params = {
                    offset: 0,
                    limit: 10,
                    user_id: uId,
                    status: s,
                }
                const api = userData.value.user_type === 'Admin' ? AddressesAPI.listAdmin(params) : AddressesAPI
                    .list(params)
                await api.then((response) => {
                    addresses.value = response.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value

                const api = userData.value.user_type === 'Admin' ? AddressesAPI.searchAll(searchInput.value) :  AddressesAPI.search(searchInput.value, userData.value.id)

                await api.then((response) => {
                    addressesSearch.value = response.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                addresses,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                onIonChangeGetSelectedStatus,
                status,
                onClickArchive,
                onClickArchiveRestore,
                activeSelect,
                addressesSearch,
                searchInput,
                onInputSearch,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>