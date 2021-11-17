<template>
    <ion-badge v-if="status === 'Available'" color="secondary">Available</ion-badge>
    <ion-badge v-if="status === 'Out Of Stocks'" color="danger">Out Of Stocks</ion-badge>
    <ion-badge v-if="status === 'Archive'" color="tertiary">Archive</ion-badge>
</template>

<script>
export default {
    name: 'ProductStatus',
    props: {
        status: {
            type: String,
            default: ''
        },
    },
}
</script>