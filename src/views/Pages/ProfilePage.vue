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
                        <ion-button color="medium" slot="end">
                            <ion-label>Reset Password</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-avatar>
                    <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
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
                        <ion-col class="details-col" />
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
                        <ion-col class="details-col">
                            <ion-label>
                                Date of Birth
                            </ion-label>
                            <div class="details-label">{{userData.birthday}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                Join Date
                            </ion-label>
                            <div class="details-label">{{userData.created_at.split('T')[0]}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>
                                Modified
                            </ion-label>
                            <div class="details-label">{{userData.updated_at.split('T')[0]}}</div>
                        </ion-col>
                        <ion-col class="details-col" />
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import {
        computed
    } from '@vue/reactivity'
    import {
        useStore
    } from 'vuex'
    export default {
        name: 'ProfilePage',
        setup() {
            const store = useStore()
            const userData = computed(() => store.state.user.userData)

            return {
                userData
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/profile.scss';
</style>