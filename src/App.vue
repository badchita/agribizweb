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
    bagHandle,
    eye,
    logoFacebook,
    logoGoogle,
    logoApple,
    eyeOff,
    leaf,
    notifications,
  } from 'ionicons/icons';
  import {
    useRoute
  } from 'vue-router';

  addIcons({
    'menu': menu,
    'cube': cube,
    'bag-handle': bagHandle,
    'eye': eye,
    'logo-facebook': logoFacebook,
    'logo-google': logoGoogle,
    'logo-apple': logoApple,
    'eye-off': eyeOff,
    'leaf': leaf,
    'notifications': notifications,
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
        selectedIndex,
      }
    }
  });
</script>

<style lang="scss">
  * {
    font-family: Helvetica, sans-serif;
  }
</style>