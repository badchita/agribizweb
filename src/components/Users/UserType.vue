<template>
    <ion-badge v-if="user_type === 'Seller'" color="primary">Seller</ion-badge>
    <ion-badge v-if="user_type === 'Customer'" color="warning">Customer</ion-badge>
</template>

<script>
    export default {
        name: 'UserType',
        props: {
            user_type: {
                type: String,
                default: ''
            },
        },
    }
</script>