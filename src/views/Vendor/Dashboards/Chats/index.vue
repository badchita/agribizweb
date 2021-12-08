<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>
        <ion-content>
            <MenuFabButton />
            <ion-split-pane content-id="main">
                <ion-content>
                    <ion-header class="ion-no-border">
                        <ion-toolbar>
                            <ion-title>
                                Chats
                            </ion-title>
                        </ion-toolbar>
                        <ion-toolbar>
                            <ion-searchbar v-model="searchUsername" mode="ios"></ion-searchbar>
                        </ion-toolbar>

                    </ion-header>
                    <ion-list v-if="searchUsername === ''">
                        <ion-item v-for="(item, i) in chats" :key="i"
                            :router-link="`/vendor/dashboards/chats/${item.id}`" router-direction="root" lines="none"
                            detail="false" class="hydrated" :class="{ selected: selectedIndex === i }" button
                            @click="selectedItems(item, false)">
                            <ion-avatar>
                                <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                            </ion-avatar>
                            <ion-label class="ion-margin-start" v-if="item.sender_id === userData.id">
                                {{item.from_username}} <p class="ion-text-wrap">message</p>
                            </ion-label>
                            <ion-label class="ion-margin-start" v-else>{{item.sender_username}} <p
                                    class="ion-text-wrap">message</p>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                    <ion-list v-else>
                        <ion-item v-for="(item, i) in searchedUsers" :key="i"
                            :router-link="`/vendor/dashboards/chats/${item.id}`" router-direction="root" lines="none"
                            detail="false" class="hydrated" :class="{ selected: selectedIndex === i }" button
                            @click="selectedItems(item, true)">
                            <ion-avatar>
                                <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                            </ion-avatar>
                            <ion-label class="ion-margin-start">{{item.username}} <p class="ion-text-wrap">message</p>
                            </ion-label><br>
                        </ion-item>
                    </ion-list>
                </ion-content>

                <ion-page id="main">
                    <ion-header>
                        <ion-toolbar>
                            <ion-avatar slot="start">
                                <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                            </ion-avatar>
                            <ion-title v-if="Object.keys(selectedChat).length > 0">
                                {{selectedUsername}}
                            </ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content>
                        <section ref="chatArea" class="chat-area">
                            <ion-item lines="none" v-for="(item, i) in conversation" :key="i">
                                <div v-if="item.sender_id === userData.id" class="message-out" slot="end">
                                    <ion-label class="ion-text-wrap">
                                        {{item.message}}
                                    </ion-label>
                                </div>

                                <div v-else-if="item.from_id === userData.id" class="message-in">
                                    <ion-label class="ion-text-wrap">
                                        {{item.message}}
                                    </ion-label>
                                </div>
                            </ion-item>
                        </section>
                    </ion-content>
                    <ion-footer>
                        <ion-toolbar>
                            <ion-item lines="none" colors="none">
                                <ion-textarea autoGrow="true" v-model="userMessage" maxlength="500" rows="1"
                                    placeholder="Type message here..."></ion-textarea>
                                <ion-button @click="sendMessage">
                                    <ion-icon slot="icon-only" name="send-sharp" />
                                </ion-button>
                            </ion-item>
                        </ion-toolbar>
                    </ion-footer>
                </ion-page>
            </ion-split-pane>
        </ion-content>
    </ion-page>
</template>

<script>
    import ChatsAPI from '@/api/chats'
    import ConversationsAPI from '@/api/conversations'

    import {
        computed,
        ref
    } from '@vue/reactivity';
    import {
        menuController
    } from '@ionic/core';
    import {
        nextTick,
        onMounted,
        watch
    } from '@vue/runtime-core';
    import {
        useRouter
    } from 'vue-router';
    import {
        useStore
    } from 'vuex';

    export default {
        components: {
            // Conversation,
        },
        setup() {
            onMounted(() => {
                loadChats()
            })
            const router = useRouter()
            const store = useStore()

            const routerId = ref(router.currentRoute.value.params.id)
            let senderMessage = ref('')
            let userMessage = ref('')
            let searchUsername = ref('')
            let searchedUsers = ref([])
            let chats = ref([])
            let selectedIndex = ref(0)
            let selectedUsername = ref('')
            let selectedChat = ref({})
            let conversation = ref([])

            const userData = computed(() => store.state.user.userData)

            watch(searchUsername, function (val) {
                loadUsername(val)
            })

            function selectedItems(item, n) {
                if (n === false) {
                    selectedChat.value = item
                    if (item.sender_id === userData.value.id) {
                        selectedUsername.value = item.from_username
                    }
                    loadConversation(selectedChat.value.conversation_id)
                } else if (n === true) {
                    selectedUsername.value = item.username
                    selectedChat.value = {
                        conversation_id: 0,
                        from_id: item.id,
                        from_username: item.username,
                        sender_id: userData.value.id,
                        sender_username: userData.value.username,
                    }
                    loadConversation(selectedChat.value.conversation_id)
                }

                console.log(selectedChat.value);
            }

            async function openMenu() {
                await menuController.open();
            }

            function loadChats() {
                let params = {
                    id: userData.value.id
                }
                ChatsAPI.list(params).then((response) => {
                    chats.value = response.data.data
                    selectedChat.value = response.data.data[0]
                    console.log(response.data.data[0].sender_id);
                    if (response.data.data[0].sender_id === userData.value.id) {
                        selectedUsername.value = response.data.data[0].from_username
                    } else {
                        selectedUsername.value = response.data.data[0].sender_username
                    }
                    loadConversation(response.data.data[0].conversation_id)
                })
            }
            async function loadUsername(username) {
                await ChatsAPI.search(username).then((response) => {
                    searchedUsers.value = response.data.data
                })
            }
            async function loadConversation(cId) {
                const params = {
                    id: cId
                }
                await ConversationsAPI.list(params).then((response) => {
                    conversation.value = response.data.data
                })
            }
            async function sendMessage() {
                var fId
                var fUsername
                if (selectedChat.value.from_id === userData.value.id) {
                    fId = selectedChat.value.sender_id
                    fUsername = selectedChat.value.sender_username
                } else {
                    fId = selectedChat.value.from_id
                    fUsername = selectedChat.value.from_username
                }
                let params = {
                    sender_id: userData.value.id,
                    from_id: fId,
                    from_username: fUsername,
                    sender_username: userData.value.username,
                    message: userMessage.value,
                    conversation_id: selectedChat.value.conversation_id
                }

                await ConversationsAPI.add(params).then(() => {
                    userMessage.value = ''
                    nextTick(() => {
                        loadConversation(selectedChat.value.conversation_id)
                        loadChats()
                    })
                })
            }

            return {
                selectedIndex,
                senderMessage,
                userMessage,
                openMenu,
                routerId,
                searchUsername,
                searchedUsers,
                chats,
                selectedUsername,
                selectedItems,
                userData,
                selectedChat,
                conversation,
                sendMessage
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/menu.scss';
    @import '@/assets/css/chat.scss';
</style>