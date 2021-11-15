<template>
    <ion-page>
        <!-- <ion-header>
            <NavBar />
        </ion-header> -->
        <!-- <ion-content>
            <MenuFabButton /> -->
        <ion-split-pane content-id="chat-content" when="md">
            <ion-menu content-id="chat-content" menu-id="chat-menu">
                <ion-list id="inbox-list">
                    <ion-list-header>
                        <ion-label>Chats</ion-label>
                    </ion-list-header>
                    <ion-menu-toggle auto-hide="false" v-for="(item, i) in 20" :key="i">
                        <ion-item class="hydrated" :class="{ selected: selectedIndex === i }" router-direction="root"
                            router-link="/dashboards/chats/1" lines="none" button>
                            <ion-avatar slot="start">
                                <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                            </ion-avatar>
                            <ion-row class="sender-details">
                                <ion-col size="12">
                                    <ion-label>
                                        Vr Bachita
                                    </ion-label>
                                </ion-col>
                                <ion-col>
                                    <ion-label class="sender-message">
                                        We admire the dedication to high-quality work and service that goes into
                                        building a
                                        successful freelance business on Upwork. When you’re great at what you
                                        do,
                                        you
                                        only
                                        can create a good marketing plan to show potential clients the value you
                                        offer.
                                    </ion-label>
                                </ion-col>
                            </ion-row>
                            <div slot="end" class="unread"></div>
                        </ion-item>
                    </ion-menu-toggle>
                </ion-list>
            </ion-menu>

            <!-- <Conversation id="chat-content" /> -->
            <ion-router-outlet id="chat-content" />
        </ion-split-pane>
    </ion-page>
    <!-- </ion-content> -->
</template> 

<script>
    // import Conversation from '@/components/Chats/Conversation'

    import {
        ref
    } from '@vue/reactivity';
    import {
        menuController
    } from '@ionic/core';
    import {
        onMounted
    } from '@vue/runtime-core';

    export default {
        components: {
            // Conversation,
        },
        setup() {
            onMounted(() => {
                // onClickOpenChatMenu()
            })
            const selectedIndex = ref(0)

            let senderMessage = ref('')
            let userMessage = ref('')

            let messages = ref([{
                    body: "Hello",
                    author: "sender",
                },
                {
                    body: "Hi",
                    author: "user",
                },
                {
                    body: "How are you?",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "sender",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "user",
                },
                {
                    body: "Hire TikTok part-time employees, Work easily and earn money while watching TikTok, No handling fee, the task can be completed in ten minutes, Working 1 hour a day, you can get 300-3000 PHP (20-100USDT) What are you waiting for? As long as you have a bank card, you can join our team and only hire friends who have a bank card. Hurry up and register as a Telegram user to join us and make money while playing on your phone 👉If you are interested, you can add telegram search: tiktok0220 to send messages. To join us, please reply 1 Click on the link to send the message directly Telegram ID: https://t.me/Tiktok0220",
                    author: "user",
                },
            ], )

            async function onClickOpenChatMenu() {
                await menuController.enable(true, 'chat-menu')
                await menuController.open('chat-menu')
            }

            return {
                selectedIndex,
                senderMessage,
                userMessage,
                messages,
                onClickOpenChatMenu
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/menu.scss';
    @import '@/assets/css/chats.scss';
</style>