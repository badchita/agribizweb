<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-row>
                <ion-col size="4.4">
                    <ion-item class="logo-container" lines="none">
                        <ion-icon name="bag-handle" />
                        <ion-label class="title-label">Negros Agribiz</ion-label>
                        <ion-label>Log In</ion-label>
                    </ion-item>
                </ion-col>
            </ion-row>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-list>
                        <ion-list-header>
                            <ion-label>Login</ion-label>
                        </ion-list-header>
                        <ion-item lines="none">
                            <ion-input placeholder="Email"></ion-input>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-input placeholder="Password" type="password"></ion-input>
                            <ion-buttons slot="end">
                                <ion-button>
                                    <ion-icon name="eye" />
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item lines="none" >
                            <ion-button expand="full" strong="true">LOG IN</ion-button>
                        </ion-item>
                        <ion-item lines="none" button>
                            <ion-label>Forgot Password</ion-label>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-buttons>
                                <ion-button>
                                    <ion-icon name="eye" /> Facebook
                                </ion-button>
                                <ion-button>
                                    <ion-icon name="eye" /> Google
                                </ion-button>
                                <ion-button>
                                    <ion-icon name="eye" /> Apple
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label>Don't have a account yet? <a href="">Sign Up Here</a></ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
    export default {
        setup() {


            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/login-page.scss';
</style>