<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <img src="@/assets/images/logo.png" />
        </ion-header>
        <ion-content>
            <ion-card v-if="router.currentRoute.value.name === 'SignUp'" class="signup-card">
                <ion-card-content>
                    <ion-list>
                        <ion-list-header>
                            <ion-label>Sign Up</ion-label>
                        </ion-list-header>
                        <ion-item class="input-item">
                            <ion-input v-model="register.name" placeholder="Name"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="register.username" placeholder="Username"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="register.email" placeholder="Email"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="register.mobile" placeholder="Mobile"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-datetime display-format="MM/DD/YYYY" placeholder="Birth Date"
                                @ionChange="onChangeGetBithday($event)"></ion-datetime>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="register.password" placeholder="Password" :type="passwordVisibility">
                            </ion-input>
                            <ion-buttons slot="end">
                                <ion-button v-if="passwordVisibility === 'text'" @click="hidePassword()">
                                    <ion-icon name="eye" />
                                </ion-button>
                                <ion-button v-if="passwordVisibility === 'password'" @click="showPassword()">
                                    <ion-icon name="eye-off" />
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="register.password_confirmation" placeholder="Confirm Password"
                                :type="confirmPasswordVisibility">
                            </ion-input>
                            <ion-buttons slot="end">
                                <ion-button v-if="confirmPasswordVisibility === 'text'" @click="hideConfirmPassword()">
                                    <ion-icon name="eye" />
                                </ion-button>
                                <ion-button v-if="confirmPasswordVisibility === 'password'"
                                    @click="showConfirmPassword()">
                                    <ion-icon name="eye-off" />
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item v-if="showError" class="error-message-item" lines="none">
                            <ion-button fill="clear" slot="end" @click="onClickCloseErrorIcon">
                                <ion-icon name="close-circle" />
                            </ion-button>
                            <span>{{errorMessage}}</span>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-button class="login-button" expand="full" strong="true" @click="onClickSignUp">
                                <ion-spinner v-if="loadingStatus"></ion-spinner>
                                <span v-else>Sign Up</span>
                            </ion-button>
                        </ion-item>
                        <ion-item class="signup-link" lines="none">
                            <ion-label>Have an account yet? <router-link to="/vendor/login"><strong>Login
                                        Here</strong></router-link>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
            <ion-card v-else-if="router.currentRoute.value.name === 'Login'" class="login-card">
                <ion-card-content>
                    <ion-list>
                        <ion-list-header>
                            <ion-label>Login</ion-label>
                        </ion-list-header>
                        <ion-item class="input-item">
                            <ion-input v-model="auth.email" placeholder="Email"></ion-input>
                        </ion-item>
                        <ion-item class="input-item">
                            <ion-input v-model="auth.password" placeholder="Password" :type="passwordVisibility">
                            </ion-input>
                            <ion-buttons slot="end">
                                <ion-button v-if="passwordVisibility === 'text'" @click="hidePassword()">
                                    <ion-icon name="eye" />
                                </ion-button>
                                <ion-button v-if="passwordVisibility === 'password'" @click="showPassword()">
                                    <ion-icon name="eye-off" />
                                </ion-button>
                            </ion-buttons>
                        </ion-item>
                        <ion-item v-if="showError" class="error-message-item" lines="none">
                            <ion-button fill="clear" slot="end" @click="onClickCloseErrorIcon">
                                <ion-icon name="close-circle" />
                            </ion-button>
                            <span>{{errorMessage}}</span>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-button class="login-button" expand="full" strong="true" @click="onClickLogin">
                                <ion-spinner v-if="loadingStatus"></ion-spinner>
                                <span v-else>LOG IN</span>
                            </ion-button>
                        </ion-item>
                        <ion-item lines="none">
                            <ion-label><a style="text-decoration: none; font-size:14px;" href="">Forgot Password</a>
                            </ion-label>
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
                            <ion-label>Don't have a account yet? <router-link to="/vendor/sign-up"><strong>Sign Up
                                        Here</strong></router-link>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-label>© 2021 Negros Agribiz. All Rights Reserved</ion-label>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
    import {
        computed,
        reactive,
        ref
    } from '@vue/reactivity';
    import {
        useRouter
    } from 'vue-router';
    import {
        useStore
    } from 'vuex'
    import {
        toastController
    } from '@ionic/core';
    export default {
        setup() {
            let auth = reactive({
                email: '',
                password: '',
                password_confirmation: '',
            })

            let register = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                mobile: '',
                birthday: '',
                user_type: 'Seller',
                type: 0
            })

            const router = useRouter()
            const store = useStore()

            let passwordVisibility = ref('password')
            let confirmPasswordVisibility = ref('password')
            let showError = ref(false)

            let loadingStatus = computed(() => store.state.loading.status)
            let errorMessage = computed(() => store.state.auth.errorMessage)

            function showPassword() {
                passwordVisibility.value = 'text'
            }

            function hidePassword() {
                passwordVisibility.value = 'password'
            }

            function showConfirmPassword() {
                confirmPasswordVisibility.value = 'text'
            }

            function hideConfirmPassword() {
                confirmPasswordVisibility.value = 'password'
            }

            function onClickCloseErrorIcon() {
                showError.value = false
            }

            function onChangeGetBithday(ev) {
                register.birthday = ev.detail.value
                register.birthday = new Date(register.birthday).toISOString().substring(0, 10)
            }

            async function onToast() {
                const toast = await toastController.create({
                    message: 'Account Created',
                    color: 'success',
                    position: 'top',
                    duration: 2000,
                    cssClass: 'toast-style',
                })
                return toast.present();
            }
            async function onClickLogin() {
                auth.password_confirmation = auth.password
                store.dispatch('loading/start')
                store.dispatch('auth/login', auth).then(() => {
                        router.push('/vendor/home')
                    }).catch((err) => {
                        console.error(err);
                        showError.value = true
                    })
                    .finally(() => {
                        store.dispatch('loading/finish')
                    })
            }
            async function onClickSignUp() {
                register.mobile = +register.mobile
                store.dispatch('loading/start')
                store.dispatch('auth/register', register).then(() => {
                        onToast()
                    }).catch((err) => {
                        console.error(err);
                        showError.value = true
                    })
                    .finally(() => {
                        store.dispatch('loading/finish')
                    })
            }
            return {
                passwordVisibility,
                showPassword,
                hidePassword,
                auth,
                onClickLogin,
                loadingStatus,
                errorMessage,
                onClickCloseErrorIcon,
                showError,
                router,
                register,
                showConfirmPassword,
                hideConfirmPassword,
                confirmPasswordVisibility,
                onClickSignUp,
                onChangeGetBithday,
                onToast
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/login-page.scss';
</style>