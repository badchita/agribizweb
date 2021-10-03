<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import {
        onMounted,
        ref
    } from '@vue/runtime-core';
    export default {
        name: 'UpdateOrder',
        setup() {
            onMounted(() => {
                loadProduct(status.value)
            })

            let product = ref({})
            let status = ref('O')
            const isLoading = ref(false)

            async function loadProduct(s) {
                isLoading.value = true;
                await ProductAPI.list(s).then((response) => {
                    product.value = response.data
                    console.log(product.value);
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            return {
                product
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>