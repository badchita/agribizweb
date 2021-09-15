<template>
    <ion-menu :content-id="contentid" type="overlay">
        <ion-content>
            <ion-list class="inbox-list">
                <ion-menu-toggle auto-hide="false">
                    <ion-item lines="none" button>
                        <ion-label>Product</ion-label>
                    </ion-item>
                </ion-menu-toggle>
            </ion-list>
        </ion-content>
    </ion-menu>
</template>

<script>
    export default {
        props: {
            contentid: {
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