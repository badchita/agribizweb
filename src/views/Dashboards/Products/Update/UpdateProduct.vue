<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ion-grid>
                    <ion-item lines="none">
                        <ion-label class="header-title">{{pageTitle}}</ion-label>
                    </ion-item>
                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Name</ion-label>
                                <ion-input class="input-style" v-model="product.name"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Price</ion-label>
                                <ion-input class="input-style" v-model="product.price" type="number"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label position="floating">Description</ion-label>
                                <ion-textarea v-model="product.description"></ion-textarea>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-button @click="onClickSave">
                            Save
                        </ion-button>
                        <ion-button @click="goBack">
                            Cancel
                        </ion-button>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'

    import {
        computed,
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    export default {
        name: 'UpdateProduct',
        setup() {
            onMounted(() => {
                loadProductDetails()
                pageTitle
            })
            const data = reactive({
                price: '',
            })

            const router = useRouter()

            const product = ref({
                id: '',
                name: '',
                price: '',
                description: '',
                status: 'O'
            })

            const pageTitle = computed(() => {
                if (router.currentRoute.value.params.id)
                    return 'Update Product'
                else
                    return 'Add Product'
            })

            function goBack() {
                router.go(-1)
            }

            async function loadProductDetails(id) {
                id = router.currentRoute.value.params.id
                if (id) {
                    await ProductAPI.get(id)
                        .then((response) => {
                            product.value = response.data.data
                        })
                }
            }
            async function onClickSave() {
                product.value.price = +product.value.price

                const api = product.value.id ? ProductAPI.update(product.value) : ProductAPI.add(product.value)

                api.then(() => {
                    goBack()
                    setTimeout(() => {
                        router.go()
                    }, 100)
                }).catch((err) => {
                    console.error(err);
                })
            }
            return {
                product,
                data,
                onClickSave,
                goBack,
                pageTitle
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/update-product.scss';
</style>