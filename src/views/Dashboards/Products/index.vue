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
                        Product List
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
                                    Name
                                </ion-col>
                                <ion-col>
                                    Quantity
                                </ion-col>
                                <ion-col>
                                    Price
                                </ion-col>
                                <ion-col>
                                    Action
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in product" :key="i"
                                    @click="onClickRowDetails(item.id)">
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
    import ProductAPI from '@/api/product'

    import SearchShowStatusListing from '@/components/SearchShowStatusListing'

    import {
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'Products',
        components: {
            SearchShowStatusListing
        },
        setup() {
            onMounted(() => {
                loadProduct()
            })

            const router = useRouter()

            let product = ref({})
            const isLoading = ref(false)

            function onClickGoToUpdate(id, ev) {
                if (id) {
                    ev.stopPropagation();
                    router.push(`/dashboards/updateproduct/${id}`)
                } else
                    router.push(`/dashboards/updateproduct`)
            }

            function onClickRowDetails(id) {
                router.push(`/dashboards/detailsproduct/${id}`)
            }

            async function loadProduct() {
                isLoading.value = true;
                await ProductAPI.list()
                    .then((response) => {
                        product.value = response.data.data
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
                onClickRowDetails
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/products.scss';
</style>