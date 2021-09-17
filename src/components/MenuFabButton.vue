<template>
    <ion-fab horizontal="end" vertical="top" slot="fixed" edge>
        <ion-fab-button style="--background: #4c9069;" @click="onClickOpenMenu">
            <ion-icon name="menu" />
        </ion-fab-button>
    </ion-fab>
</template>

<script>
    import {
        menuController
    } from '@ionic/core';
    export default {
        name: 'MenuFabButton',
        setup() {
            async function onClickOpenMenu() {
                await menuController.open();
            }

            return {
                onClickOpenMenu
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>