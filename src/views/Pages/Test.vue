<template>
    <ion-page>
        <div class="container">
            <div class="child">

            </div>
        </div>
        <ion-button @click="loftsSherlocks(11)">

        </ion-button>
    </ion-page>
</template>

<script>
    export default {
        setup() {

            function loftsSherlocks(n) {
                if (n < 10) return 1;
                let sum = 0;
                for (let i = 0; i < n; i += 1) {
                    sum += i;
                }
                return sum + loftsSherlocks(n / 2);
            }
            return {
                loftsSherlocks
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100px;
        height: 100px;
        border: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .child {
        width: 50px;
        height: 50px;
        border: 1px solid black;
    }
</style> 