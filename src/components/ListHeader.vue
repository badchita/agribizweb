<template>
    <ion-item lines="none">
        <ion-button fill="clear" @click="presentAlert(productMessage)">
            <ion-icon slot="icon-only" name="information-circle" />
        </ion-button>
        <ion-label class="header-title" >
            {{headerTitle}}
        </ion-label>
        <ion-button v-if="headerTitle !== 'Order List'" class="add-button" slot="end" @click="onClickGoToUpdate()">
            <ion-icon name="add" />
            <ion-label style="">Add</ion-label>
        </ion-button>
    </ion-item>
</template>

<script>
import { alertController } from '@ionic/core';
    import {
        useRouter
    } from 'vue-router';
    export default {
        props: {
            headerTitle: {
                type: String,
                default: ''
            },
            routerUrl: {
                type: String,
                default: ''
            },
        },
        setup(props) {
            const router = useRouter()

            const productMessage = '<p>This Page shows the list of Products you have added</p><p><br></p><p><strong><em><u>Columns</u></em></strong>:</p><ul><li><strong>Name - <em>name</em> <em>of the product</em></strong></li><li><strong>Quantity - quantity <em>of the product</em></strong></li><li><strong>Price - price <em>of the product</em></strong></li></ul><p><br></p><p><strong><em><u>Buttons:</u></em></strong></p><ul><li><strong>Add</strong></li></ul><p><br></p><p><strong><em><u>Actions:</u></em></strong></p><ul><li><strong>Edit Button - <em>once clicked, it will redirect you to update page of the Product</em></strong></li><li><strong>Archive Button - <em>archived the product you have selected</em></strong></li></ul><p>\t</p><p><br></p>'

            function onClickGoToUpdate() {
                router.push(props.routerUrl)
            }

            async function presentAlert(m) {
                const alert = await alertController.create({
                    header: 'Products Information',
                    message: m,
                    buttons: ['OK'],
                })

                await alert.present()
            }

            return {
                onClickGoToUpdate,
                presentAlert,
                productMessage
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>