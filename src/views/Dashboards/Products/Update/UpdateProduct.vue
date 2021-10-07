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
                        <ion-col>
                            <ion-img :src="thumbnailPath" class="ion-margin-bottom"
                                style="width:50%; margin-left: 16px;" />
                            <ion-label class="ion-margin-start" style="color: rgb(128, 128, 128);">Thumbnail</ion-label>
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

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Name</ion-label>
                                <ion-input class="input-style" v-model="product.name"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item class="ion-margin-top" lines="none">
                                <ion-label class="label-style" position="floating">Location</ion-label>
                                <ion-select class="select-style" cancelText="Cancel" okText="Ok"
                                    :value="initialLocation[0]" @ionChange="onIonChangeGetSelectedLocation($event)">
                                    <ion-select-option v-for="(item, i) in location" :key="i" :value="item">
                                        {{item.street_building}} {{item.barangay}}, {{item.city}}, {{item.province}}
                                    </ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Quantity</ion-label>
                                <ion-input class="input-style" v-model="product.quantity" type="number"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Price</ion-label>
                                <ion-input class="input-style" v-model="product.price" type="number"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item class="ion-margin-top" lines="none">
                                <ion-label class="label-style" position="floating">Category</ion-label>
                                <ion-select class="select-style" multiple="true" cancelText="Cancel" okText="Ok"
                                    v-model="categories" @ionChange="onIonChangeGetSelectedCategories($event)">
                                    <ion-select-option v-for="(item, i) in categories" :key="i" :value="item.value">
                                        {{item.value}}</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item class="ion-margin-top" lines="none">
                                <ion-label class="label-style" position="floating">Status</ion-label>
                                <ion-select class="select-style" cancelText="Cancel" okText="Ok"
                                    :value="product.product_status"
                                    @ionChange="onIonChangeGetSelectedProductStatus($event)">
                                    <ion-select-option v-for="(item, i) in product_status" :key="i" :value="item.value">
                                        {{item.value}}</ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-item lines="none">
                            <ion-label class="label-style">Description</ion-label>
                        </ion-item>
                    </ion-row>
                    <div class="editor">
                        <QuillEditor class="quill-editor-style" v-model:value="product.description" />
                    </div>
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
    import ProductAPI from '@/api/product'
    import AddressesAPI from '@/api/addresses'
    import 'quill/dist/quill.snow.css'

    import {
        computed,
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        toastController
    } from '@ionic/core'
    export default {
        name: 'UpdateProduct',
        components: {},
        setup() {
            onMounted(() => {
                loadProductDetails()
                loadAddressesDetails()
                pageTitle,
                getThumbnail() 
            })

            const data = reactive({
                price: '',
            })

            const categories = [{
                value: 'Fruit',
            }, {
                value: 'Vegetable',
            }, {
                value: 'Sugarcane',
            }, {
                value: 'Rice',
            }, {
                value: 'Dairy',
            }, {
                value: 'Poultry',
            }, {
                value: 'Livestock',
            }]

            const product_status = [{
                value: 'Available',
            }, {
                value: 'Out Of Stocks',
            }]

            const router = useRouter()

            const product = ref({})
            const isLoading = ref(false)
            const location = ref([])
            let thumbnailPath = ref('')

            const pageTitle = computed(() => {
                if (router.currentRoute.value.params.id)
                    return 'Update Product'
                else
                    return 'Add Product'
            })

            const initialLocation = computed(() => {
                return location.value.filter(function (l) {
                    return l.id == product.value.product_location_id
                })
            })

            function clearForm() {
                product.value = {}
            }

            function goBack() {
                // clearForm()
                router.go(-1)
            }

            function onIonChangeGetSelectedCategories(ev) {
                product.value.category = ev.detail.value
            }

            function onIonChangeGetSelectedProductStatus(ev) {
                return product.value.product_status = ev.detail.value
            }

            function onIonChangeGetSelectedLocation(ev) {
                const street_building = ev.detail.value.street_building
                const barangay = ev.detail.value.barangay
                const city = ev.detail.value.city
                const province = ev.detail.value.province
                product.value.product_location = street_building + ' ' + barangay + ', ' + city + ', ' + province
                product.value.product_location_id = ev.detail.value.id
            }

            function getThumbnail() {
                return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
            }

            function onClickChooseFile(ev) {
                const file = ev.target.files[0]
                document.getElementById("uploadFile").value = file.name
                thumbnailPath.value = URL.createObjectURL(file)

                product.value.thumbnail_name = file.name
            }

            function test() {
                console.log(product.value);
            }

            async function presentToast(m) {
                const toast = await toastController.create({
                    header: 'Warning',
                    message: m,
                    position: 'top',
                    color: 'danger',
                    duration: 2500,
                })

                await toast.present()
            }
            async function loadAddressesDetails() {
                await AddressesAPI.list('O')
                    .then((response) => {
                        location.value = response.data
                    })
            }
            async function loadProductDetails(id) {
                id = router.currentRoute.value.params.id
                if (id)
                    isLoading.value = true;

                if (id) {
                    await ProductAPI.get(id)
                        .then((response) => {
                            product.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            async function onClickSave() {
                const message =
                    'Status must be <strong>Out of Stocks</strong> if <strong>Quantity</strong> is <strong>0</strong>'

                if (+product.value.quantity === 0 && product.value.product_status === 'Available') {
                    presentToast(message)
                } else {
                    product.value.price = +product.value.price
                    product.value.quantity = +product.value.quantity
                    product.value.category = product.value.category.toString()

                    console.log('product status', product.value.product_status);

                    if (product.value.product_status == 'Available')
                        product.value.status = 'O'
                    else if (product.value.product_status == 'Out Of Stocks')
                        product.value.status = 'V'
                    else
                        product.value.status = 'O'

                    const api = product.value.id ? ProductAPI.update(product.value) : ProductAPI.add(product.value)

                    api.then(() => {
                        clearForm()
                        goBack()
                        setTimeout(() => {
                            router.go()
                        }, 100)
                    }).catch((err) => {
                        console.error(err);
                    })
                }
            }
            return {
                product,
                data,
                onClickSave,
                goBack,
                pageTitle,
                categories,
                test,
                onIonChangeGetSelectedCategories,
                onIonChangeGetSelectedProductStatus,
                isLoading,
                product_status,
                location,
                onIonChangeGetSelectedLocation,
                initialLocation,
                onClickChooseFile,
                thumbnailPath
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/update-product.scss';
</style>