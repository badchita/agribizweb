<template>
  <ion-page>
    <ion-header>
      <NavBar />
    </ion-header>
    <ion-content class="ion-padding">
      <MenuFabButton />
      home
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
</style>