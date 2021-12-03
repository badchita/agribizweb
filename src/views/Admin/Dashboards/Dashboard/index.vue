<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Dashboard List" routerUrl="/admin/dashboards/updatedashboard" />

                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Name" @ionInput="onInputSearch($event)"></ion-searchbar>
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
                    </ion-col>
                </ion-row>
                <ion-card style="overflow: visible">
                    <ion-card-content>
                        <ion-grid>
                            <ion-row class="header-row">
                                <ion-col v-for="item in dashboardHeader" :key="item">
                                    {{item.text}}
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && usersSearch.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in usersSearch" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.user_id}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.seller.name}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.seller.username}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.orders.length}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>

                            <div v-else class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in dashboard" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.user_id}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.seller.name}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.seller.username}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.orders.length}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
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
    import DashboardAPI from '@/api/dashboard'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    export default {
        name: 'Addresses',
        components: {},
        data() {
            return {
                dashboardHeader: [{
                        text: 'Seller ID'
                    },
                    {
                        text: 'Seller Name'
                    },
                    {
                        text: 'Seller Username'
                    },
                    {
                        text: 'Number Of Orders'
                    },
                    {
                        text: 'Action'
                    },
                ]
            }
        },
        setup() {
            onMounted(() => {
                loadDashboards(user_id.value, 10)
            })

            const router = useRouter()
            const store = useStore()

            let dashboard = ref({})
            let usersSearch = ref({})
            let searchInput = ref('')

            const isLoading = ref(false)

            const user_id = computed(() => store.state.user.userData.id)

            function onClickGoToUpdate(id, ev) {
                ev.stopPropagation();
                router.push(`/admin/dashboards/updatedashboard/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/admin/dashboards/detailsusers/${id}`)
            }

            function onIonChangeShowLimit(ev) {
                loadDashboards(user_id.id, ev.detail.value)
            }

            async function loadDashboards(uId, limit) {
                isLoading.value = true;
                const params = {
                    user_id: uId,
                    limit: limit,
                    offset: 0
                }
                await DashboardAPI.list(params)
                    .then((response) => {
                        dashboard.value = response.data.data
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        isLoading.value = false;
                    })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value
                await DashboardAPI.search(user_id.value, searchInput.value).then((response) => {
                    usersSearch.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                dashboard,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                usersSearch,
                searchInput,
                onInputSearch,
                onIonChangeShowLimit
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>