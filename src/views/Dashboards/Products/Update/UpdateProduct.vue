<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ion-grid>
                    <ion-row>
                        <ion-label>Add Product</ion-label>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label position="floating">Name</ion-label>
                                <ion-input v-model="product.name"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label position="floating">Price</ion-label>
                                <ion-input v-model="product.price"></ion-input>
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
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'

    import {
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'UpdateProduct',
        setup() {
            const data = reactive({
                price: ''
            })

            const router = useRouter()

            const product = ref({
                name: '',
                price: '',
                description: '',
            })

            function gotoBack() {
                router.go(-1)
            }

            async function onClickSave() {
                product.value.price = +product.value.price

                await ProductAPI.add(product.value)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
                    .finally(() => {
                        gotoBack()
                    })
            }
            return {
                product,
                data,
                onClickSave
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/update-product.scss';
</style>