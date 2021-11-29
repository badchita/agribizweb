<template>
    <ion-badge v-if="status_verification === 0" color="primary">New</ion-badge>
    <ion-badge v-if="status_verification === 1" color="tertiary">Approved</ion-badge>
    <ion-badge v-if="status_verification === 2" color="secondary">Verified</ion-badge>
</template>

<script>
    export default {
        name: 'StatusVerification',
        props: {
            status_verification: {
                type: Number,
                default: 0
            },
        },
    }
</script>