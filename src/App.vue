<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
  import {
    IonApp,
    IonRouterOutlet
  } from '@ionic/vue';
  import {
    defineComponent
  } from 'vue';

  import {
    addIcons
  } from 'ionicons';

  import {
    menu
  } from 'ionicons/icons';

  addIcons({
    'menu': menu,
  })
  export default defineComponent({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet
    }
  });
</script>