<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ListHeader headerTitle="Notifications List" routerUrl="/dashboards/updatenotificationsusers" />
                
                <ion-row>
                    <ion-col size="6">
                        <ion-searchbar placeholder="Search by Title" @ionInput="onInputSearch($event)"></ion-searchbar>
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
                                <ion-col>
                                    Title
                                </ion-col>
                                <ion-col>
                                    Description
                                </ion-col>
                                <ion-col>
                                    Subject
                                </ion-col>
                                <ion-col>
                                    Action
                                </ion-col>
                            </ion-row>
                            <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>
                            <div v-if="searchInput.length !== 0 && notifications_users_search.length !== 0" class="data-list">
                                <ion-row class="data-row" v-for="(item,i) in notifications_users_search" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.title}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.description}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.subject}}
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
                                <ion-row class="data-row" v-for="(item,i) in notifications_users" :key="i"
                                    @click="onClickRowDetails(item.id)">
                                    <ion-col class="data-col">
                                        {{item.title}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.description}}
                                    </ion-col>
                                    <ion-col class="data-col">
                                        {{item.subject}}
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
    import NotificationsUsersAPI from '@/api/notifications_users'

    import {
        onMounted,
        ref
    } from '@vue/runtime-core'

    import {
        useRouter
    } from 'vue-router'
    import {
        alertController
    } from '@ionic/core'
    export default {
        name: 'NotificationsUser',
        components: {},
        setup() {
            onMounted(() => {
                loadNotificationsUsers(status.value)
            })

            const router = useRouter()

            let notifications_users = ref({})
            let notifications_users_search = ref({})
            let status = ref('O')
            let activeSelect = ref('Open')
            let searchInput = ref('')

            const isLoading = ref(false)

            function onClickGoToUpdate(id, ev) {
                ev.stopPropagation();
                router.push(`/dashboards/updatenotificationsusers/${id}`)
            }

            function onClickRowDetails(id) {
                router.push(`/dashboards/detailsaddresses/${id}`)
            }

            function onIonChangeGetSelectedStatus(ev) {
                if (ev.detail.value === 'Archived') {
                    status.value = 'V'
                    activeSelect.value = 'Archived'
                    loadNotificationsUsers(status.value)
                } else if (ev.detail.value === 'Open') {
                    status.value = 'O'
                    activeSelect.value = 'Open'
                    loadNotificationsUsers(status.value)
                } else {
                    status.value = ''
                    activeSelect.value = 'All'
                    loadNotificationsUsers(status.value)
                }
            }

            async function onClickArchive(item, ev, i) {
                ev.stopPropagation();
                const alert = await alertController.create({
                    header: 'Archive',
                    message: '<strong>Are you sure you want to Archive this Notification?</strong>',
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

                activeSelect.value !== 'All' ? notifications_users.value.splice(i, 1) : ''

                await NotificationsUsersAPI.update(item).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }
            async function loadNotificationsUsers(s) {
                isLoading.value = true;
                await NotificationsUsersAPI.list(s)
                    .then((response) => {
                        notifications_users.value = response.data
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        isLoading.value = false;
                    })
            }
            async function onInputSearch(ev) {
                isLoading.value = true;
                searchInput.value = ev.target.value
                await NotificationsUsersAPI.search(searchInput.value).then((response) => {
                    notifications_users_search.value = response.data
                }).catch((err) => {
                    console.error(err);
                }).finally(() => {
                    isLoading.value = false;
                })
            }

            return {
                notifications_users,
                onClickGoToUpdate,
                isLoading,
                onClickRowDetails,
                onIonChangeGetSelectedStatus,
                onClickArchive,
                onClickArchiveRestore,
                activeSelect,
                notifications_users_search,
                searchInput,
                onInputSearch
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>