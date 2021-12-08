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
                        User Information
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button color="medium" slot="end" @click="onClickUpdateProfile">
                            <ion-label>Update Profile</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-avatar>
                    <img :src="thumbnailPath" style="width: 300px; height: 250px; margin:0; object-fit: fill;">
                </ion-avatar>
                <ion-grid class="ion-margin-bottom details-grid">
                    <ion-row>
                        <ion-col class="details-col">
                            <ion-label>
                                Username
                            </ion-label>
                            <div class="details-label">{{userData.username}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                Name
                            </ion-label>
                            <div class="details-label">{{userData.name}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                User Type
                            </ion-label>
                            <div class="details-label">{{userData.user_type}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                Status Verification
                            </ion-label>
                            <div class="details-label">
                                <StatusVerification :status_verification="userData.status_verification" />
                            </div>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Contact Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="details-col">
                            <ion-label>
                                Email
                            </ion-label>
                            <div class="details-label">{{userData.email}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                Mobile
                            </ion-label>
                            <div class="details-label">{{userData.mobile}}</div>
                        </ion-col>
                        <ion-col class="details-col" />
                        <ion-col class="details-col" />
                    </ion-row>
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Other Information
                            </ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="details-col" size="3">
                            <ion-label>
                                Date of Birth
                            </ion-label>
                            <div class="details-label">{{userData.birthday}}</div>
                        </ion-col>
                        <ion-col class="details-col" size="3">
                            <ion-label>
                                Date Joined
                            </ion-label>
                            <div class="details-label">{{formatDate(userData.created_at)}}</div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import ResourceURL from '@/api/resourceURL'

    import StatusVerification from '@/components/Users/StatusVerification'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useStore
    } from 'vuex'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    export default {
        name: 'ProfilePage',
        components: {
            StatusVerification,
        },
        setup() {
            onMounted(() => {
                getThumbnail(userData.value.profile_picture)
            })

            const router = useRouter()
            const store = useStore()

            let thumbnailPath = ref('')

            const userData = computed(() => store.state.user.userData)

            function onClickUpdateProfile() {
                router.push(`/update-profile`)
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png'
                }
            }

            return {
                userData,
                onClickUpdateProfile,
                getThumbnail,
                thumbnailPath
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/profile.scss';
</style>