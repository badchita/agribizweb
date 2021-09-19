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
                <ion-note color="primary">0</ion-note>
                <ion-icon name="cart" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>ONGOING ORDERS</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
                <ion-icon name="bus" slot="end" />
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item lines="none">
                <strong>COMPLETED ORDERS</strong>
              </ion-item>
              <ion-item lines="none">
                <ion-note color="primary">0</ion-note>
                <ion-icon name="checkmark-circle" slot="end" />
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
                <ion-note color="primary">₱10,00.00</ion-note>
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

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  @import '@/assets/css/home-page.scss';
</style>