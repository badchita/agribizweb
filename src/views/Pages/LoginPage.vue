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
                        <ion-item class="input-item">
                            <ion-input @ionFocus="onFocusCheckInput($event)" placeholder="Email"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input placeholder="Password" type="password">
                            </ion-input>
                            <ion-buttons slot="end">
                                <ion-button>
                                    <ion-icon name="eye" />
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-button class="login-button" expand="full" strong="true">LOG IN</ion-button>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label><a style="text-decoration: none; font-size:14px;" href="">Forgot Password</a></ion-label>
                        </ion-item>
                        <ion-item lines="none">
                            <h5><span>OR</span></h5>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-buttons class="social-buttons">
                                <ion-button class="facebook-button">
                                    <ion-icon name="logo-facebook" />
                                    <ion-label>Facebook</ion-label>
                                </ion-button>
                                <ion-button class="google-button">
                                    <ion-icon name="logo-google" />
                                    <ion-label>Google</ion-label>
                                </ion-button>
                                <ion-button class="apple-button">
                                    <ion-icon name="logo-apple" />
                                    <ion-label>Apple</ion-label>
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item class="signup-link" lines="none">
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
            function onFocusCheckInput(ev) {
                console.log(ev);
            }

            return {
                onFocusCheckInput
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/login-page.scss';
</style>