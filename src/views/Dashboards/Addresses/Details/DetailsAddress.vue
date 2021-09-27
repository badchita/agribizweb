<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ion-item lines="none">
                    <ion-label class="header-title">
                        Address Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button class="details-update-button" slot="end" @click="onClickGoToUpdate(address.id)">
                            <ion-label>Update</ion-label>
                        </ion-button>
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Address Information
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Street/Building</ion-label>
                            <div class="details-label">{{address.street_building}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Barangay</ion-label>
                            <div class="details-label">{{address.barangay}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>City</ion-label> 
                            <div class="details-label">{{address.city}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Province</ion-label> 
                            <div class="details-label">{{address.province}}</div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import AddressesAPI from '@/api/addresses'

    import {
        ref
    } from '@vue/reactivity'
    import {
        onMounted
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'DetailProduct',
        components: {
        },
        setup() {
            onMounted(() => {
                loadAddress()
            })

            const router = useRouter()

            let address = ref({})
            const isLoading = ref(false)

            function onClickGoToUpdate(id) {
                router.push(`/dashboards/updateaddresses/${id}`)
            }

            function goBack() {
                router.go(-1)
            }

            async function loadAddress(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await AddressesAPI.get(id)
                        .then((response) => {
                            address.value = response.data.data
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }
            return {
                address,
                isLoading,
                onClickGoToUpdate,
                goBack
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
</style>