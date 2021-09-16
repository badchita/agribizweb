<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ion-item lines="none">
                    <ion-label>
                        Product List
                    </ion-label>
                    <ion-button slot="end" @click="onClickGoToUpdate()">Add</ion-button>
                </ion-item>
                <ion-card>
                    <ion-card-content>
                        <ion-grid>
                            <ion-row class="row-header">
                                <ion-col>
                                    Name
                                </ion-col>
                                <ion-col>
                                    Description
                                </ion-col>
                                <ion-col>
                                    Price
                                </ion-col>
                                <ion-col>
                                    Action
                                </ion-col>
                            </ion-row>
                            <div class="data-list">
                                <ion-row v-for="(item,i) in product" :key="i">
                                    <ion-col>
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col>
                                        {{item.description}}
                                    </ion-col>
                                    <ion-col>
                                        {{item.price}}
                                    </ion-col>
                                    <ion-col>
                                        <ion-button @click="onClickGoToUpdate(item.id)">edit</ion-button>
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

    import {
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'Products',
        components: {},
        setup() {
            onMounted(() => {
                loadProduct()
            })

            const router = useRouter()

            let product = ref({})

            function onClickGoToUpdate(id) {
                if (id)
                    router.push(`/dashboards/updateproduct/${id}`)
                else
                    router.push(`/dashboards/updateproduct`)
            }

            async function loadProduct() {
                await ProductAPI.list()
                    .then((response) => {
                        product.value = response.data.data
                    }).catch((err) => {
                        console.error(err);
                    })
            }

            return {
                product,
                onClickGoToUpdate
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/products.scss';
</style>