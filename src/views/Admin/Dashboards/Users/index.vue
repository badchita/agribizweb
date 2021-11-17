<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Users List" routerUrl="/vendor/dashboards/updateaddresses" />

                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Name" @ionInput="onInputSearch($event)"></ion-searchbar>
                    </ion-col>
                    <ion-col size="1.8">
                        <ion-item lines="none">
                            <ion-label position="floating">Show</ion-label>
                            <ion-select value="10">
                                <ion-select-option value="10">10</ion-select-option>
                                <ion-select-option value="25">25</ion-select-option>
                                <ion-select-option value="50">50</ion-select-option>
                                <ion-select-option value="100">100</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                    <ion-col size="2.1">
                        <ion-item lines="none">
                            <ion-label position="floating">Status</ion-label>
                            <ion-select :value="activeSelect" @ionChange="onIonChangeGetSelectedStatus($event)">
                                <ion-select-option value="All">All</ion-select-option>
                                <ion-select-option value="Open">Open</ion-select-option>
                                <ion-select-option value="Archived">Archived</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-card style="overflow: visible">
                    <ion-card-content>
                        <ion-grid>
                            <ion-row class="header-row">
                                <ion-col v-for="item in userHeader" :key="item">
                                    {{item.text}}
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && usersSearch.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in usersSearch" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.email}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.username}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <UserType :user_type="item.user_type" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <OnlineStatus :isOnline="item.isOnline" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'V'" class="restore-button"
                                                @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>

                            <div v-else class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in users" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.name}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.email}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.username}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <UserType :user_type="item.user_type" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <OnlineStatus :isOnline="item.isOnline" />
                                    </ion-col>
                                    <ion-col class="data-col">
                                        <ion-buttons>
                                            <ion-button v-if="item.status === 'O'" class="update-button"
                                                @click="onClickGoToUpdate(item.id, $event)">
                                                <ion-icon size="small" name="create" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'O'" class="archive-button"
                                                @click="onClickArchive(item, $event, i)">
                                                <ion-icon size="small" name="archive" />
                                            </ion-button>
                                            <ion-button v-if="item.status === 'V'" class="restore-button"
                                                @click="onClickArchiveRestore(item, $event, i)">
                                                <ion-icon size="small" name="refresh" />
                                            </ion-button>
                                        </ion-buttons>
                                    </ion-col>
                                </ion-row>
                            </div>
                        </ion-grid>
                    </ion-card-content>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import UserAPI from '@/api/user'

    import UserType from '@/components/Users/UserType'
    import OnlineStatus from '@/components/Users/OnlineStatus'

    import {
        computed,
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    import {
        alertController
    } from '@ionic/core'
    import {
        useStore
    } from 'vuex'
    export default {
        name: 'Addresses',
        components: {
            UserType,
            OnlineStatus
        },
        setup() {
            onMounted(() => {
                loadUsers(user_id.value, status.value)
            })

            const userHeader = [{
                    text: 'Name'
                },
                {
                    text: 'Email'
                },
                {
                    text: 'Username'
                },
                {
                    text: 'User Type'
                },
                {
                    text: 'Active'
                },
                {
                    text: 'Action'
                },
            ]

            const router = useRouter()
            const store = useStore()

            let users = ref({})
            let usersSearch = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            let searchInput = ref('')

            const isLoading = ref(false)

            const user_id = computed(() => store.state.user.userData.id)

            function onClickGoToUpdate(id, ev) {
                ev.stopPropagation();
                router.push(`/vendor/dashboards/updateaddresses/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/admin/dashboards/detailsusers/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadUsers(user_id.value, status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadUsers(user_id.value, status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadUsers(user_id.value, status.value)
                }
            }

            async function onClickArchive(item, ev, i) {
                ev.stopPropagation();
                const alert = await alertController.create({
                    header: 'Archive',
                    message: '<strong>Are you sure you want to Archive this Address?</strong>',
                    buttons: [{
                        text: 'Yes',
                        handler: () => {
                            onClickArchiveRestore(item, ev, i)
                        }
                    }, {
                        text: 'No',
                        role: 'cancel'
                    }]
                })

                return alert.present();
            }
            async function onClickArchiveRestore(item, ev, i) {
                ev.stopPropagation();
                isLoading.value = true;
                item.status === 'O' ? item.status = 'V' : item.status = 'O'

                activeSelect.value !== 'All' ? users.value.splice(i, 1) : ''

                await UserAPI.archive(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadUsers(uId, s) {
                isLoading.value = true;
                await UserAPI.list(uId, s)
                    .then((response) => {
                        users.value = response.data.data
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        isLoading.value = false;
                    })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value
                await UserAPI.search(user_id.value, searchInput.value).then((response) => {
                    usersSearch.value = response.data.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                users,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                onIonChangeGetSelectedStatus,
                status,
                onClickArchive,
                onClickArchiveRestore,
                activeSelect,
                usersSearch,
                searchInput,
                onInputSearch,
                userHeader
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>