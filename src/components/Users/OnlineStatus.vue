<template>
    <div v-if="isOnline === 1" lines="none">
        <ion-icon color="success" name="radio-button-on" />
        <ion-label>Online</ion-label>
    </div>
    <div v-if="isOnline === 0" lines="none">
        <ion-icon name="radio-button-off" />
        <ion-label>Offline</ion-label>
    </div>
</template>

<script>
    export default {
        name: 'OnlineStatus',
        props: {
            isOnline: {
                type: Number,
                default: 0,
            },
        },
    }
</script>

<style lang="scss" scoped>
    div {
        display: inline-block;

        ion-icon {
            font-size: 20px;
            vertical-align: middle;
            margin-right: 8px;
        }

        ion-label {
            display: inline-block;
            vertical-align: middle;
            font-size: 14px;
        }
    }
</style>