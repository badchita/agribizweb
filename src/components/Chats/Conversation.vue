<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button @click="onClickOpenChatMenu">
                        <ion-icon name="ellipsis-vertical" />
                    </ion-button>
                </ion-buttons>
                <ion-label>
                    Name
                </ion-label>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <!-- <MenuFabButton /> -->
            <section ref="chatArea" class="chat-area">
                <ion-item lines="none" v-for="(message, i) in messages" :key="i">
                    <div v-if=" message.author === 'user'" class="message-out" slot="end">
                        <p>
                            {{message.body}}
                        </p>
                    </div>

                    <ion-item lines="none" v-else-if=" message.author !== 'user'">

                        <p class="message-in">
                            {{message.body}}
                        </p>
                    </ion-item>
                </ion-item>
            </section>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-item lines="none" colors="none">
                    <ion-textarea autoGrow="true" :value="userMessage" maxlength="500"
                        placeholder="Type message here..."></ion-textarea>
                    <ion-button @click.prevent="sendMessage('out')">send</ion-button>
                </ion-item>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import {
        ref
    } from '@vue/reactivity'
    import {
        menuController
    } from '@ionic/core'
    export default {
        setup() {
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
                senderMessage,
                userMessage,
                messages,
                onClickOpenChatMenu
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>