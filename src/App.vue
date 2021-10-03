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
    cart,
    bus,
    checkmarkCircle,
    refresh,
    star,
    closeCircleOutline,
    createOutline,
    archive,
    archiveOutline,
    create,
    add,
    closeCircle,
    receipt,
    business,
    chatbubbleEllipses,
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
    'cart': cart,
    'bus': bus,
    'checkmark-circle': checkmarkCircle,
    'refresh': refresh,
    'star': star,
    'close-circle-outline': closeCircleOutline,
    'create-outline': createOutline,
    'archive': archive,
    'archive-outline': archiveOutline,
    'create': create,
    'add': add,
    'close-circle': closeCircle,
    'receipt': receipt,
    'business': business,
    'chatbubble-ellipses': chatbubbleEllipses,
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