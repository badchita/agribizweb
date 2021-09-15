<template>
  <ion-page>
    <ion-menu content-id="main-content" type="overlay">
      <ion-content>
        <ion-list class="inbox-list">
          <ion-menu-toggle auto-hide="false">
            <ion-item lines="none" button>
              <ion-label>Product</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      </ion-content>
    </div>
  </ion-page>
</template>

<script>
  import ProductAPI from '@/api/product'
  import {
    menuController
  } from '@ionic/core';
  import {
    onMounted
  } from '@vue/runtime-core';
  export default {
    name: 'Home',
    components: {},
    setup() {
      onMounted(() => {
        loadProduct()
      })
      async function openMenu() {
        await menuController.open();
      }
      async function loadProduct() {
        ProductAPI.list()
          .then((response) => {
            console.log(response)
          }).catch((err) => {
            console.error(err);
          })
      }

      return {
        openMenu,
      }
    }
  };
</script>

<style scoped>
  #container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
  }

  #container a {
    text-decoration: none;
  }
</style>