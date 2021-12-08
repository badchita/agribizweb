<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-avatar slot="start">
                    <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                </ion-avatar>
                <!-- <ion-title v-if="Object.keys(selectedChat).length > 0">
                    {{selectedChat.selectedUsername}}
                </ion-title> -->
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
</template>

<script>
    import ConversationsAPI from '@/api/conversations'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        nextTick,
        onMounted,
        watch
    } from '@vue/runtime-core'
    import {
        useStore
    } from 'vuex'
    export default {
        props: {
            selectedConversationId: {
                type: Number,
                default: 0
            }
        },
        setup(props) {
            onMounted(() => {
                console.log(props.selectedConversationId);
                loadConversation(props.selectedConversationId)
            })
            const store = useStore()

            let userMessage = ref('')
            let conversation = ref([])

            const userData = computed(() => store.state.user.userData)

            watch(props.selectedChat, function () {
                loadConversation(props.selectedConversationId)
            })

            async function loadConversation(cId) {
                const params = {
                    id: cId
                }
                await ConversationsAPI.list(params).then((response) => {
                    conversation.value = response.data.data
                })
            }
            async function sendMessage() {
                let params = {
                    sender_id: userData.value.id,
                    from_id: props.from_id,
                    from_username: props.from_username,
                    sender_username: userData.value.username,
                    message: userMessage.value,
                    conversation_id: props.selectedChat.conversation_id
                }
                await ConversationsAPI.add(params).then(() => {
                    nextTick(() => {
                        loadConversation(props.selectedChat.conversation_id)
                    })
                })
            }

            return {
                userMessage,
                conversation,
                sendMessage,
                userData
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/conversation.scss';
</style>