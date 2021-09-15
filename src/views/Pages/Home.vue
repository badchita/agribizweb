<template>
  <ion-page>
    <Menu :contentid="'main-content'" />
    <ion-header>
      <ion-toolbar>
        <ion-title>blank</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="main-content" class="ion-padding">
      <ion-fab horizontal="end" vertical="top" slot="fixed">
        <ion-fab-button @click="onClickOpenMenu">
          <ion-icon name="menu" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
  import ProductAPI from '@/api/product'

  import Menu from '@/components/Menu'
  import {
    onMounted
  } from '@vue/runtime-core';
  import {
    menuController
  } from '@ionic/core';
  export default {
    name: 'Home',
    components: {
      Menu
    },
    setup() {
      onMounted(() => {
        loadProduct()
      })

      async function onClickOpenMenu() {
        await menuController.open();
      }
      async function loadProduct() {
        await ProductAPI.list()
          .then((response) => {
            console.log(response)
          }).catch((err) => {
            console.error(err);
          })
      }

      return {
        onClickOpenMenu
      }
    }
  };
</script>

<style lang="scss">
</style>