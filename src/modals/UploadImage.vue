<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar>
                <ion-title>{{title}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-row>
                <ion-col size="12">
                    <div class="image-container">
                        <img :src="thumbnailPath" />
                    </div>
                    <div class="ion-margin-top" />
                    <ion-item class="ion-margin-top" lines="none">
                        <input id="uploadFile" placeholder="Choose File" disabled="disabled" />
                        <div size="default" class="fileUpload">
                            <ion-icon name="cloud-upload" />
                            <span>Choose File</span>
                            <input class="upload" type="file" accept="image/png, image/jpeg"
                                @change="onClickChooseFile($event)" />
                        </div>
                    </ion-item>
                </ion-col>
                <ion-col />
            </ion-row>
        </ion-content>
        <ion-footer class="ion-no-border">
            <ion-toolbar>
                <ion-buttons class="ion-margin-start">
                    <ion-button class="save-button" @click="onClickSave">
                        Save
                    </ion-button>
                    <ion-button color="danger" @click="onClickCancel">
                        Close
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'

    import {
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        modalController
    } from '@ionic/core'
    export default {
        props: {
            title: {
                type: String,
                default:  ''
            },
        },
        setup() {
            onMounted(() => {
                getThumbnail()
            })
            let fileUpload = ref('')
            let thumbnailPath = ref('')

            function onClickChooseFile(ev) {
                const file = ev.target.files[0]
                fileUpload.value = file
                thumbnailPath.value = URL.createObjectURL(file)
                console.log(thumbnailPath.value);
            }

            function getThumbnail() {
                return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
            }

            function onClickCancel() {
                modalController.dismiss()
            }

            function onClickSave() {
                let formFile = new FormData()
                formFile.append('file', fileUpload.value)
                ProductAPI.upload(formFile).then((response) => {
                    modalController.dismiss({
                        'fileName': response.data.message
                    })
                })
            }
            return {
                onClickChooseFile,
                getThumbnail,
                thumbnailPath,
                onClickCancel,
                onClickSave
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/update-product.scss';

    ion-content {
        --background: white;
    }

    .image-container {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 9%;
        width: 400px;
        height: 300px;
    }
    img {
        width: 400px;
        height: 300px;
        object-fit: contain;
    }

    ion-item {
        width: 66%;
        margin: auto;
    }
</style>