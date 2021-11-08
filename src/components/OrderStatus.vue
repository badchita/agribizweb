<template>
    <ion-badge v-if="status === '0'" :style="`background-color: #007bff; color: #fff`">New</ion-badge>
    <ion-badge v-if="status === '1'" :style="`background-color: #7044ff; color: #fff`">Accepted</ion-badge>
    <ion-badge v-if="status === '2'" :style="`background-color: #ffc107; color: #fff`">Processed</ion-badge>
    <ion-badge v-if="status === '3'" :style="`background-color: #6c757d; color: #fff`">Delivered</ion-badge>
    <ion-badge v-if="status === '3'" :style="`background-color: #28a745; color: #fff`">Recieved By Customer</ion-badge>
</template>

<script>
    export default {
        name: 'OrderStatus',
        props: {
            status: {
                type: String,
                default: ''
            },
        },
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>

</style>