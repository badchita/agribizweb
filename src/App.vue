<template>
  <ion-app>
    <Menu />
  </ion-app>
</template>

<script>
  import Menu from '@/components/Menu'
  import {
    IonApp,
  } from '@ionic/vue';
  import {
    defineComponent,
    ref
  } from 'vue';

  import {
    addIcons
  } from 'ionicons';

  import {
    menu,
    cube,
  } from 'ionicons/icons';
  import {
    useRoute
  } from 'vue-router';

  addIcons({
    'menu': menu,
    'cube': cube,
  })
  export default defineComponent({
    name: 'App',
    components: {
      IonApp,

      Menu
    },
    setup() {
      const router = useRoute()
      const selectedIndex = ref(0);

      const appPages = [{
        title: 'Products',
        url: '/dashboards/products',
      }]

      function selectedItem(url) {
        url === router.path ? 'selected' : ''
      }

      return {
        selectedItem,
        appPages,
        selectedIndex
      }
    }
  });
</script>

<style lang="scss">
  * {
    font-family: Helvetica, sans-serif;
  }
</style>