<template>
    <ion-avatar>
        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
    </ion-avatar>
    <ion-label>
        <h2>name</h2>
        <h3>email</h3>
    </ion-label>
    <ion-button class="manage-account-button" fill="clear" expand="block">Manage Your Account</ion-button>
    <ion-button class="signout-button" fill="clear" expand="block">Sign Out</ion-button>
</template>

<script>
    export default {
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/user-popover.scss';
</style>