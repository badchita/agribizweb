import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/index.js'

import {
  IonApp,
  IonBackdrop,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonIcon,
  IonicVue,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  IonPage,
  IonPicker,
  IonRow,
  IonSplitPane,
  IonVirtualScroll,
  IonNavLink,
  IonLoading,
  IonProgressBar,
  IonSkeletonText,
  IonSpinner,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonRefresher,
  IonRefresherContent,
  IonReorder,
  IonReorderGroup,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonSlides,
  IonSlide,
  IonTabs,
  // IonTab,
  IonTabBar,
  IonTabButton,
  IonToggle,
  IonToolbar,
  IonBackButton,
  IonHeader,
  IonFooter,
  IonTitle,
  IonText,
  IonNav,
  IonInput,
  IonImg,
  IonAvatar,
  IonRouterOutlet,
  IonTextarea,
  IonRippleEffect,
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import MenuFabButton from '@/components/MenuFabButton'
import NavBar from '@/components/NavBar'
import ListHeader from '@/components/ListHeader'

import {
  quillEditor
} from 'vue3-quill'

/* Theme variables */
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
app.component('NavBar', NavBar)
app.component('MenuFabButton', MenuFabButton)
app.component('ListHeader', ListHeader)
app.component('QuillEditor', quillEditor)

app.component('ion-badge', IonBadge)
app.component('ion-button', IonButton)
app.component('ion-buttons', IonButtons)
app.component('ion-card', IonCard)
app.component('ion-card-content', IonCardContent)
app.component('ion-card-header', IonCardHeader)
app.component('ion-card-subtitle', IonCardSubtitle)
app.component('ion-card-title', IonCardTitle)
app.component('ion-checkbox', IonCheckbox)
app.component('ion-chip', IonChip)
app.component('ion-app', IonApp)
app.component('ion-page', IonPage)
app.component('ion-content', IonContent)
app.component('ion-datetime', IonDatetime)
app.component('ion-picker', IonPicker)
app.component('ion-fab', IonFab)
app.component('ion-fab-button', IonFabButton)
app.component('ion-fab-list', IonFabList)
app.component('ion-grid', IonGrid)
app.component('ion-row', IonRow)
app.component('ion-col', IonCol)
app.component('ion-infinite-scroll', IonInfiniteScroll)
app.component('ion-infinite-scroll-content', IonInfiniteScrollContent)
app.component('ion-icon', IonIcon)
app.component('ion-item', IonItem)
app.component('ion-item-divider', IonItemDivider)
app.component('ion-item-group', IonItemGroup)
app.component('ion-item-sliding', IonItemSliding)
app.component('ion-item-options', IonItemOptions)
app.component('ion-item-option', IonItemOption)
app.component('ion-label', IonLabel)
app.component('ion-note', IonNote)
app.component('ion-list', IonList)
app.component('ion-list-header', IonListHeader)
app.component('ion-virtual-scroll', IonVirtualScroll)
app.component('ion-menu', IonMenu)
app.component('ion-menu-button', IonMenuButton)
app.component('ion-menu-toggle', IonMenuToggle)
app.component('ion-split-pane', IonSplitPane)
app.component('ion-backdrop', IonBackdrop)
app.component('ion-nav', IonNav)
app.component('ion-nav-link', IonNavLink)
app.component('ion-loading', IonLoading)
app.component('ion-progress-bar', IonProgressBar)
app.component('ion-skeleton-text', IonSkeletonText)
app.component('ion-spinner', IonSpinner)
app.component('ion-radio', IonRadio)
app.component('ion-radio-group', IonRadioGroup)
app.component('ion-range', IonRange)
app.component('ion-refresher', IonRefresher)
app.component('ion-refresher-content', IonRefresherContent)
app.component('ion-reorder', IonReorder)
app.component('ion-reorder-group', IonReorderGroup)
app.component('ion-searchbar', IonSearchbar)
app.component('ion-segment', IonSegment)
app.component('ion-segment-button', IonSegmentButton)
app.component('ion-select', IonSelect)
app.component('ion-select-option', IonSelectOption)
app.component('ion-slides', IonSlides)
app.component('ion-slide', IonSlide)
app.component('ion-tabs', IonTabs)
app.component('ion-ripple-effect', IonRippleEffect)
app.component('ion-tab-bar', IonTabBar)
app.component('ion-tab-button', IonTabButton)
app.component('ion-toogle', IonToggle)
app.component('ion-toolbar', IonToolbar)
app.component('ion-header', IonHeader)
app.component('ion-footer', IonFooter)
app.component('ion-title', IonTitle)
app.component('ion-back-button', IonBackButton)
app.component('ion-text', IonText)
app.component('ion-input', IonInput)
app.component('ion-img', IonImg)
app.component('ion-avatar', IonAvatar)
app.component('ion-router-outlet', IonRouterOutlet)
app.component('ion-textarea', IonTextarea)

router.isReady().then(() => {
  app.mount('#app');
});