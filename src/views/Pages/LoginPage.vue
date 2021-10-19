<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <img src="@/assets/images/logo.png" />
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-list v-if="router.currentRoute.value.name === 'SignUp'">
                        <ion-list-header>
                            <ion-label>Sign Up</ion-label>
                        </ion-list-header>
                        <ion-item class="input-item">
                            <ion-input v-model="auth.email" placeholder="Name"></ion-input>
                        </ion-item>
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
                        <ion-item class="input-item">
                            <ion-input v-model="auth.password" placeholder="Confirm Password"
                                :type="passwordVisibility">
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
                        <ion-item lines="none">
                            <ion-button class="login-button" expand="full" strong="true" @click="onClickLogin">
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

                    <ion-list v-else-if="router.currentRoute.value.name === 'Login'">
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
    // import AuthAPI from '@/api/auth'
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
    export default {
        setup() {
            let auth = reactive({
                email: '',
                password: '',
                password_confirmation: '',
            })

            const router = useRouter()
            const store = useStore()

            let passwordVisibility = ref('password')
            let showError = ref(false)

            let loadingStatus = computed(() => store.state.loading.status)
            let errorMessage = computed(() => store.state.auth.errorMessage)

            function showPassword() {
                passwordVisibility.value = 'text'
            }

            function hidePassword() {
                passwordVisibility.value = 'password'
            }

            function onClickCloseErrorIcon() {
                showError.value = false
            }

            async function onClickLogin() {
                auth.password_confirmation = auth.password
                store.dispatch('loading/start')
                store.dispatch('auth/login', auth)
                    .then(() => {
                        router.push('/home')
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/login-page.scss';
</style>