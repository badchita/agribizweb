<template>
    <div>

    </div>
</template>

<script>
    import ProductAPI from '@/api/product'
    import {
        onMounted
    } from '@vue/runtime-core'
    export default {
        setup() {
            onMounted(() => {
                loadProduct()
            })

            async function loadProduct() {
                await ProductAPI.list()
                    .then((response) => {
                        console.log(response)
                    }).catch((err) => {
                        console.error(err);
                    })
            }

            return {}
        }
    }
</script>

<style lang="scss" scoped>

</style>