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
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Street/Building
                                </ion-label>
                                <ion-input class="input-style" v-model="address.street_building"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Brangay</ion-label>
                                <ion-input class="input-style" v-model="address.barangay"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">City</ion-label>
                                <ion-input class="input-style" v-model="address.city"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Province</ion-label>
                                <ion-input class="input-style" v-model="address.province"></ion-input>
                            </ion-item>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-item lines="none">
                                <ion-label class="label-style" mode="ios" position="floating">Shipping Cost</ion-label>
                                <ion-input class="input-style" type="number" v-model="address.shipping_fee"></ion-input>
                            </ion-item>
                        </ion-col>
                        <ion-col />
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
    import AddressesAPI from '@/api/addresses'
    import 'quill/dist/quill.snow.css'

    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        useRouter
    } from 'vue-router'
    import {
        onMounted
    } from '@vue/runtime-core'
import { useStore } from 'vuex'
    export default {
        name: 'UpdateAddresses',
        components: {},
        setup() {
            onMounted(() => {
                loadAddressDetails()
                pageTitle
            })

            const router = useRouter()
            const store = useStore()

            const address = ref({})
            const isLoading = ref(false)

            const userData = computed(() => store.state.user.userData)
            const pageTitle = computed(() => {
                if (router.currentRoute.value.params.id)
                    return 'Update Address'
                else
                    return 'Add Address'
            })

            function clearForm() {
                address.value = {}
            }

            function goBack() {
                clearForm()
                router.go(-1)
            }

            async function loadAddressDetails(id) {
                if (id) {
                    isLoading.value = true;
                    await AddressesAPI.get(id)
                        .then((response) => {
                            address.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            async function onClickSave() {
                if (typeof(router.currentRoute.value.params.id) === 'undefined')
                    address.value.user_id = userData.value.id
                const api = address.value.id ? AddressesAPI.update(address.value) : AddressesAPI.add(address.value)

                api.then(() => {
                    goBack()
                }).catch((err) => {
                    console.error(err);
                })
            }
            return {
                address,
                onClickSave,
                goBack,
                pageTitle,
                isLoading,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>