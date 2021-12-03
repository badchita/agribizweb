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
                        <ion-col v-if="add === true" size="6">
                            <ion-item class="ion-margin-top" lines="none">
                                <ion-label class="label-style" position="floating">New Sellers</ion-label>
                                <ion-select class="select-style" cancelText="Cancel" okText="Ok"
                                    @ionChange="onIonChangeGetSelectedNewUser($event)">
                                    <ion-select-option v-for="(item, i) in newUsers" :key="i" :value="item.id">
                                        {{item.name}}
                                    </ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>


                    <ion-row>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">This Week's Income
                                </ion-label>
                                <ion-input class="input-style" v-model="dashboard.week_income" :disabled="add ? true : false" type="number">
                                </ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Weekly Income</ion-label>
                                <ion-input class="input-style" v-model="dashboard.weekly_income" :disabled="add ? true : false" type="number">
                                </ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">This Year's Income
                                </ion-label>
                                <ion-input class="input-style" v-model="dashboard.year_income" :disabled="add ? true : false" type="number">
                                </ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Yearly Income</ion-label>
                                <ion-input class="input-style" v-model="dashboard.yearly_income" :disabled="add ? true : false" type="number">
                                </ion-input>
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
import DashboardAPI from '@/api/dashboard'
    import UserAPI from '@/api/user'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    import {
        useStore
    } from 'vuex'
    export default {
        setup() {
            onMounted(() => {
                pageTitle
                if (!router.currentRoute.value.params.id)
                    loadUsers(user_id)
                if (router.currentRoute.value.params.id > 0)
                    loadDashboards()
            })

            const router = useRouter()
            const store = useStore()

            const isLoading = ref(false)
            let users = ref({})
            let dashboard = ref({})
            let newUsers = ref([])
            let add = ref(false)

            const user_id = computed(() => store.state.user.userData.id)

            const pageTitle = computed(() => {
                if (router.currentRoute.value.params.id)
                    return 'Update Dashboard'
                else
                    return 'Add Dashboard'
            })

            function onIonChangeGetSelectedNewUser(ev) {
                dashboard.value.user_id = ev.detail.value
            }

            function clearForm() {
                newUsers.value = []
                users.value = {}
                add.value = false
                dashboard.value = {}
            }

            function goBack() {
                clearForm()
                router.go(-1)
            }

            async function loadUsers(uId, s) {
                const params = {
                    user_id: uId,
                    status: s,
                }
                await UserAPI.list(params).then((response) => {
                    add.value = true
                    users.value = response.data.data

                    users.value.forEach((value) => {
                        if (value.status_verification === 0 && value.status === 'O' && value
                            .user_type === 'Seller') {
                            newUsers.value.push(value)
                        }
                    })
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadDashboards() {
                isLoading.value = true;
                let id = router.currentRoute.value.params.id
                await DashboardAPI.get(id)
                    .then((response) => {
                        dashboard.value = response.data.data
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        isLoading.value = false;
                    })
            }
            async function onClickSave() {
                console.log(dashboard);
                const api = dashboard.value.id ? DashboardAPI.update(dashboard.value) : DashboardAPI.add(dashboard.value)

                api.then(() => {
                    goBack()
                }).catch((err) => {
                    console.error(err);
                })
            }

            return {
                pageTitle,
                isLoading,
                newUsers,
                onIonChangeGetSelectedNewUser,
                add,
                goBack,
                dashboard,
                onClickSave
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>