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
                        Order List
                    </ion-label>
                    <ion-button class="add-button" slot="end" @click="onClickGoToUpdate()">
                        <ion-icon name="add" />
                        <ion-label style="">Add</ion-label>
                    </ion-button>
                </ion-item>
                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Order Number"></ion-searchbar>
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
                                    Action
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div class="data-list">
                                <ion-row v-for="(item,i) in order" :key="i">
                                    <ion-col class="data-col">
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col class="data-col" v-html="item.quantity">
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.price}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button class="update-button" @click="onClickGoToUpdate(item.id)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button class="archive-button" @click="onClickGoToUpdate(item.id)">
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
    import OrderAPI from '@/api/orders'

    import {
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'Order',
        components: {},
        setup() {
            onMounted(() => {
                loadOrder(status.value)
            })

            const router = useRouter()

            let order = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            const isLoading = ref(false)

            function onClickGoToUpdate(id) {
                if (id)
                    router.push(`/dashboards/updateorder/${id}`)
                else
                    router.push(`/dashboards/updateorder`)
            }

            async function loadOrder(s) {
                isLoading.value = true;
                await OrderAPI.list(s)
                    .then((response) => {
                        order.value = response.data.data
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
                activeSelect
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>