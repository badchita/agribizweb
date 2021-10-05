<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />

            <div class="container">
                <ion-item lines="none">
                    <ion-label class="header-title">
                        Notification Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button class="details-update-button" slot="end"
                            @click="onClickGoToUpdate(noitification.id)">
                            <ion-label>Update</ion-label>
                        </ion-button>
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Notification Information
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Title</ion-label>
                            <div class="details-label">{{noitification.title}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Description</ion-label>
                            <div class="details-label">{{noitification.description}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Subject</ion-label>
                            <div class="details-label">{{noitification.subject}}</div>
                        </ion-col>
                        <ion-col class="details-col" />
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Content</ion-label>
                            <div class="description-text" v-html="noitification.content"></div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import NotificationsUsersAPI from '@/api/notifications_users'

    import {
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    export default {
        name: 'DetailsNotification',
        setup() {
            onMounted(() => {
                loadNotification()
            })

            const router = useRouter()

            let noitification = ref({})
            const isLoading = ref(false)

            function goBack() {
                router.go(-1)
            }

            function onClickGoToUpdate(id) {
                router.push(`/dashboards/updatenotification/${id}`)
            }

            async function loadNotification(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await NotificationsUsersAPI.get(id)
                        .then((response) => {
                            noitification.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }

            return {
                onClickGoToUpdate,
                noitification,
                goBack,
                isLoading
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>