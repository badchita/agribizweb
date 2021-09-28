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
                        Addresses List
                    </ion-label>
                    <ion-button class="add-button" slot="end" @click="onClickGoToUpdate()">
                        <ion-icon name="add" />
                        <ion-label style="">Add</ion-label>
                    </ion-button>
                </ion-item>
                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar></ion-searchbar>
                    </ion-col>
                    <ion-col size="1.8">
                        <ion-item lines="none">
                            <ion-label>Show</ion-label>
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
                            <ion-label>Status</ion-label>
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
                                <ion-col>
                                    Street/Building
                                </ion-col>
                                <ion-col>
                                    Barangay
                                </ion-col>
                                <ion-col>
                                    City
                                </ion-col>
                                <ion-col>
                                    Province
                                </ion-col>
                                <ion-col>
                                    Action
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div class="data-list">
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
                                                @click="onClickArchive(item, $event, i)">
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
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'Addresses',
        components: {},
        setup() {
            onMounted(() => {
                loadAddresses(status.value)
            })

            const router = useRouter()

            let addresses = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')

            const isLoading = ref(false)

            function onClickGoToUpdate(id, ev) {
                if (id) {
                    ev.stopPropagation();
                    router.push(`/dashboards/updateaddresses/${id}`)
                } else
                    router.push(`/dashboards/updateaddresses`)
            }

            function onClickRowDetails(id) {
                router.push(`/dashboards/detailsaddresses/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadAddresses(status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadAddresses(status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadAddresses(status.value)
                }
            }

            async function onClickArchive(item, ev, i) {
                ev.stopPropagation();
                isLoading.value = true;
                item.status === 'O' ? item.status = 'V' : item.status = 'O'

                activeSelect.value !== 'All' ? addresses.value.splice(i, 1) : ''

                await AddressesAPI.update(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadAddresses(s) {
                isLoading.value = true;
                await AddressesAPI.list(s)
                    .then((response) => {
                        addresses.value = response.data
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
                onClickArchive,
                activeSelect
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>