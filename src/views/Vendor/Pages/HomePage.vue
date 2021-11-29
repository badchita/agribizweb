<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <NavBar />
    </ion-header>
    
    <ion-content class="ion-padding">
      <MenuFabButton />
      <div class="container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item lines="none">
                <strong>NEW ORDERS</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">{{newOrders.length}}</ion-note>
                <ion-icon color="primary" name="cart" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>ONGOING ORDERS</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="warning">{{ongoingOrders.length}}</ion-note>
                <ion-icon color="warning" name="bus" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>COMPLETED ORDERS</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="success">{{completedOrders.length}}</ion-note>
                <ion-icon color="success" name="checkmark-circle" slot="end" />
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>THIS WEEK'S INCOME</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary" v-if="dashboard.week_income">
                  ₱{{numberWithCommaFormatt(dashboard.week_income)}}</ion-note>
                <ion-note color="primary" v-else>₱0</ion-note>
              </ion-item>
            </ion-col>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>WEEKLY INCOME</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">₱23,450.23</ion-note>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>THIS YEAR'S INCOME</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">₱500,00.00</ion-note>
              </ion-item>
            </ion-col>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>YEARLY INCOME</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">₱200,980.20</ion-note>
              </ion-item>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>TOTAL ORDERS</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
              </ion-item>
            </ion-col>
            <ion-col class="income-rating-col">
              <ion-item lines="none">
                <strong>CUSTOMER RATINGS</strong>
                <ion-button fill="clear" slot="end">
                  <ion-icon slot="icon-only" name="refresh" />
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <ion-icon class="star-icon" name="star" />
                <ion-icon class="star-icon" name="star" />
                <ion-icon class="star-icon" name="star" />
                <ion-icon class="star-icon" name="star" />
                <ion-icon class="star-icon" name="star" />
              </ion-item>
              <ion-item lines="none">
                <ion-note class="rating-note" color="primary">4.5
                  <ion-icon class="star-rating-icon" name="star" />
                </ion-note>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
  import DashboardAPI from '@/api/dashboard'
  import MenuFabButton from '@/components/MenuFabButton'
  import NavBar from '@/components/NavBar'
  import {
    computed,
    onMounted,
    ref,
  } from '@vue/runtime-core';
  import {
    useStore
  } from 'vuex';

  export default {
    name: 'Home',
    components: {
      MenuFabButton,
      NavBar,
    },
    setup() {
      onMounted(() => {
        store.dispatch('user/loadUserData', userId.value)
        loadDashboard()
      })

      const store = useStore()

      let orders = ref([])
      let newOrders = ref([])
      let ongoingOrders = ref([])
      let completedOrders = ref([])
      let dashboard = ref({})

      const userId = computed(() => store.state.auth.userId)

      function loadDashboard() {
        DashboardAPI.get(userId.value).then((response) => {
          dashboard.value = response.data.data
          orders.value = response.data.data.orders
          getOrdersLength(orders.value)
        })
      }

      function getOrdersLength(o) {
        o.forEach((value) => {
          if (value.order_status === '0') {
            newOrders.value.push(value)
          } else if (value.order_status === '1' || value.order_status === '2' || value.order_status === '3') {
            ongoingOrders.value.push(value)
          } else if (value.order_status === '4') {
            completedOrders.value.push(value)
          }
        })
      }

      return {
        orders,
        newOrders,
        ongoingOrders,
        completedOrders,
        dashboard
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home-page.scss';
</style>