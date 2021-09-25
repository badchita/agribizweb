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
                        Product Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button class="details-update-button" slot="end" @click="onClickGoToUpdate(product.id)">
                            <ion-label>Update</ion-label>
                        </ion-button>
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Product Information
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Name</ion-label> <br>
                            <ion-label class="details-label">{{product.name}}</ion-label>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Location</ion-label> <br>
                            <ion-label class="details-label">{{product.location}}</ion-label>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Price</ion-label> <br>
                            <ion-label class="details-label">{{product.price}}</ion-label>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Quantity</ion-label> <br>
                            <ion-label class="details-label">{{product.quantity}}</ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Category</ion-label> <br>
                            <ion-label class="details-label">{{product.category}}</ion-label>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Status</ion-label> <br>
                            <!-- <ion-label class="details-label">{{product.product_status}}</ion-label> -->
                            <ion-badge color="secondary">Available</ion-badge>
                        </ion-col>
                        <ion-col class="details-col" />
                        <ion-col class="details-col" />
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Description</ion-label> <br>
                            <ion-label class="details-label" v-html="product.description"></ion-label>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import {
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        setup() {
            onMounted(() => {
                loadProduct()
            })

            const router = useRouter()

            let product = ref({})
            const isLoading = ref(false)

            function onClickGoToUpdate(id) {
                router.push(`/dashboards/updateproduct/${id}`)
            }

            function goBack() {
                router.go(-1)
            }

            async function loadProduct(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await ProductAPI.get(id)
                        .then((response) => {
                            product.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            return {
                product,
                isLoading,
                onClickGoToUpdate,
                goBack
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/products.scss';
</style>