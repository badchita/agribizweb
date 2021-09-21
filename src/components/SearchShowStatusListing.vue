<template>
    <ion-row>
        <ion-col size="6">
            <ion-searchbar></ion-searchbar>
        </ion-col>
        <ion-col size="1.8">
            <ion-item lines="none">
                <ion-label>Show</ion-label>
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
                <ion-label>Status</ion-label>
                <ion-select value="Open">
                    <ion-select-option value="All">All</ion-select-option>
                    <ion-select-option value="Open">Open</ion-select-option>
                    <ion-select-option value="Archived">Archived</ion-select-option>
                </ion-select>
            </ion-item>
        </ion-col>
    </ion-row>
</template>

<script>
    export default {
        name: 'SearchShowStatusListing',
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>

</style>