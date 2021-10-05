<template>
    <ion-item lines="none">
        <ion-label class="header-title">
            {{headerTitle}}
        </ion-label>
        <ion-button class="add-button" slot="end" @click="onClickGoToUpdate()">
            <ion-icon name="add" />
            <ion-label style="">Add</ion-label>
        </ion-button>
    </ion-item>
</template>

<script>
    import {
        useRouter
    } from 'vue-router';
    export default {
        props: {
            headerTitle: {
                type: String,
                default: ''
            },
            routerUrl: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const router = useRouter()

            function onClickGoToUpdate() {
                router.push(props.routerUrl)
            }

            return {
                onClickGoToUpdate
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>