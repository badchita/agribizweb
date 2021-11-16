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
    ellipsisVertical,
    informationCircle,
    cloudUpload,
    personOutline,
    mailOutline,
    phonePortraitOutline,
    calendarOutline,
    lockClosedOutline,
    people,
    radioButtonOn,
    radioButtonOff,
  } from 'ionicons/icons';

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
    'ellipsis-vertical': ellipsisVertical,
    'information-circle': informationCircle,
    'cloud-upload': cloudUpload,
    'person-outline': personOutline,
    'mail-outline': mailOutline,
    'phone-portrait-outline': phonePortraitOutline,
    'calendar-outline': calendarOutline,
    'lock-closed-outline': lockClosedOutline,
    'people': people,
    'radio-button-on': radioButtonOn,
    'radio-button-off': radioButtonOff,
  })
  export default defineComponent({
    name: 'App',
    components: {
      IonApp,

      Menu
    },
  });
</script>

<style lang="scss">
  * {
    font-family: Helvetica, sans-serif;
  }
</style>