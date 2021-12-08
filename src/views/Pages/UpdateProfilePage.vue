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
                        <ion-col size="5">
                            <img :src="thumbnailPath" style="width: 300px; height: 200px;  object-fit: contain;" />
                            <ion-button class="upload-button" style="margin-top: -24px;" @click="onClickUpload($event)">
                                Upload
                            </ion-button>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Username</ion-label>
                                <ion-input class="input-style" v-model="userData.username"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Name</ion-label>
                                <ion-input class="input-style" v-model="userData.name"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">User Type</ion-label>
                                <ion-input class="input-style" v-model="userData.user_type" disabled></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Email</ion-label>
                                <ion-input class="input-style" v-model="userData.email"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Mobile</ion-label>
                                <ion-input class="input-style" v-model="userData.mobile"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Date of Birth</ion-label>
                                <ion-input class="input-style" v-model="userData.birthday"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="4">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Date Joined</ion-label>
                                <ion-input class="input-style" v-model="userData.created_at" disabled></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

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
    import UserAPI from '@/api/user'
    import ResourceURL from '@/api/resourceURL'

    import UploadImage from '@/modals/UploadImage'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        modalController
    } from '@ionic/core'
    import {
        useStore
    } from 'vuex'
    import {
        useRouter
    } from 'vue-router'
    export default {
        components: {},
        setup() {
            onMounted(() => {
                getThumbnail(userData.value.profile_picture)
            })
            const router = useRouter()
            const store = useStore()
            let thumbnailPath = ref('')

            const isLoading = ref(false)

            const userData = computed(() => store.state.user.userData)
            const pageTitle = computed(() => {
                return 'Update Profile'
            })

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png'
                }
            }

            function goBack() {
                router.go(-1)
            }

            async function onClickUpload(ev) {
                let modal = await modalController.create({
                    component: UploadImage,
                    componentProps: {
                        title: 'Upload Profile Photo'
                    },
                    event: ev
                })

                modal.onDidDismiss().then((returned) => {
                    userData.value.profile_picture = returned.data.fileName
                    getThumbnail(userData.value.profile_picture)
                })

                await modal.present();
            }
            async function onClickSave() {
                isLoading.value = true;
                await UserAPI.update(userData.value).then(() => {
                        store.dispatch('user/loadUserData', userData.value.id).then(() => {
                            setTimeout(() => {
                                goBack()
                            }, 500)
                        })
                    })
                    .finally(() => {
                        isLoading.value = false;
                    })
            }

            return {
                pageTitle,
                isLoading,
                getThumbnail,
                thumbnailPath,
                userData,
                onClickUpload,
                goBack,
                onClickSave
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>