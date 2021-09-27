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
                <SearchShowStatusListing />
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
                                            <ion-button class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button class="archive-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="archive" />
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

    import SearchShowStatusListing from '@/components/SearchShowStatusListing'

    import {
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'Addresses',
        components: {
            SearchShowStatusListing
        },
        setup() {
            onMounted(() => {
                loadAddresses()
            })

            const router = useRouter()

            let addresses = ref({})
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

            async function loadAddresses() {
                isLoading.value = true;
                await AddressesAPI.list()
                    .then((response) => {
                        addresses.value = response.data.data
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
                onClickRowDetails
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>