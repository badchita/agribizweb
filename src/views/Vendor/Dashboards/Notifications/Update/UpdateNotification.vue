<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />

            <div class="container">
                <ion-grid>
                    <ion-item lines="none">
                        <ion-label class="header-title">{{pageTitle}}</ion-label>
                    </ion-item>
                    <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Title</ion-label>
                                <ion-input class="input-style" v-model="notification.title"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Description</ion-label>
                                <ion-input class="input-style" v-model="notification.description"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Subject</ion-label>
                                <ion-input class="input-style" v-model="notification.subject"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col />
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-item lines="none">
                            <ion-label class="label-style">Content</ion-label>
                        </ion-item>
                    </ion-row>
                    <div class="editor">
                        <QuillEditor class="quill-editor-style" v-model:value="notification.content" />
                    </div>

                    <ion-row class="ion-margin-top ion-margin-bottom">
                        <ion-buttons class="ion-margin-start">
                            <ion-button class="save-button" @click="onClickSave">
                                Save
                            </ion-button>
                            <ion-button color="danger" @click="goBack">
                                Cancel
                            </ion-button>
                        </ion-buttons>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import NotificationsUsersAPI from '@/api/notifications_users'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        name:'UpdateNotification',
        setup() {
            onMounted(() => {
                loadNotificationsDetails()
                pageTitle
            })

            const router = useRouter()

            const notification = ref({})
            const isLoading = ref(false)

            const pageTitle = computed(() => {
                if (router.currentRoute.value.params.id)
                    return 'Update Notifications'
                else
                    return 'Add Notifications'
            })

            function clearForm() {
                notification.value = {}
            }

            function goBack() {
                // clearForm()
                router.go(-1)
            }

            async function loadNotificationsDetails(id) {
                id = router.currentRoute.value.params.id
                if (id)
                    isLoading.value = true;

                if (id) {
                    await NotificationsUsersAPI.get(id)
                        .then((response) => {
                            notification.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            async function onClickSave() {
                notification.value.status = 'O'

                const api = notification.value.id ? NotificationsUsersAPI.update(notification.value) : NotificationsUsersAPI.add(notification.value)

                api.then(() => {
                    clearForm()
                    goBack()
                    setTimeout(() => {
                        router.go()
                    }, 100)
                }).catch((err) => {
                    console.error(err);
                })
            }

            return {
                pageTitle,
                isLoading,
                notification,
                goBack,
                onClickSave
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>