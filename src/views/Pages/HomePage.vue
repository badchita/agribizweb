<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <NavBar />
    </ion-header>
    <ion-content class="ion-padding">
      <MenuFabButton />
      <div class="container">
        <ion-grid>
          <ion-row class="row-orders">
            <ion-col>
              <ion-item lines="none">
                <strong>NEW ORDER</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
                <ion-icon name="cart" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>ONGOING ORDER</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
                <ion-icon name="bus" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>COMPLETED ORDER</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
                <ion-icon name="checkmark-circle" slot="end" />
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import MenuFabButton from '@/components/MenuFabButton'
  import NavBar from '@/components/NavBar'
  import {
    onMounted,
  } from '@vue/runtime-core';

  export default {
    name: 'Home',
    components: {
      MenuFabButton,
      NavBar,
    },
    setup() {
      onMounted(() => {})

      return {}
    }
  };
</script>

<style lang="scss">
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home-page.scss';
</style>