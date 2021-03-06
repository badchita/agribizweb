<template>
    <ion-page>
        <ion-header>
            <NavBar />
        </ion-header>

        <ion-content>
            <MenuFabButton />
            <div class="container">
                <ion-item lines="none">
                    <ion-label class="header-title">
                        Product Details
                    </ion-label>
                    <ion-buttons class="details-buttons">
                        <ion-button class="details-update-button" slot="end" @click="onClickGoToUpdate(product.id)">
                            <ion-label>Update</ion-label>
                        </ion-button>
                        <ion-button color="danger" slot="end" @click="goBack()">
                            <ion-label>Close</ion-label>
                        </ion-button>
                    </ion-buttons>
                </ion-item>
                <ion-progress-bar v-if="isLoading" type="indeterminate"></ion-progress-bar>

                <ion-grid class="details-grid">
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label class="details-header-label">
                                Product Information
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="2.7">
                            <img :src="thumbnailPath"
                                style="margin-left: 8px; width: 300px; height: 200px;  object-fit: contain;" />
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Name</ion-label>
                            <div class="details-label">{{product.name}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Location</ion-label>
                            <div class="details-label">{{product.product_location}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Price</ion-label>
                            <div class="details-label">₱{{numberWithCommaFormatt(product.price)}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Quantity</ion-label>
                            <div v-if="product.quantity === 0" style="color: #eb445a" class="details-label">
                                {{product.quantity}}</div>
                            <div v-else class="details-label">{{product.quantity}}</div>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Category</ion-label>
                            <div class="details-label">{{product.category}}</div>
                        </ion-col>
                        <ion-col class="details-col">
                            <ion-label>Status</ion-label> <br>
                            <ProductStatus :status="product.product_status" />
                        </ion-col>
                        <ion-col class="details-col" />
                        <ion-col class="details-col" />
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Description</ion-label>
                            <div class="description-text" v-html="product.description"></div>
                        </ion-col>
                    </ion-row>

                    <div class="ion-margin-top" />
                    <ion-row class="ion-margin-top">
                        <ion-col>
                            <ion-label>
                                Product Rating
                            </ion-label>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-top">
                        <ion-col class="details-col">
                            <ion-label>Rating & Reviews ({{product_ratings.length}})</ion-label>
                            <StarRating :rating="4.8" :read-only="true" :increment="0.01" :star-size="20" />
                        </ion-col>
                    </ion-row>
                    <div class="ion-margin-bottom description-text">
                        <ion-row v-for="(item,i) in product_ratings" :key="i" class="ion-margin-bottom">
                            <ion-col size="12">
                                <ion-item lines="none">
                                    <ion-avatar slot="start">
                                        <img src="https://pickaface.net/gallery/avatar/unr_test_180821_0925_9k0pgs.png">
                                    </ion-avatar>
                                    <ion-label>
                                        <h2 v-if="item.anonymous === 0">{{item.user.username}}</h2>
                                        <h2 v-else>{{anonymousWord(item.user.username)}}</h2>
                                        <StarRating :rating="item.rating" :show-rating="false" :read-only="true"
                                            :increment="0.01" :star-size="20" />
                                    </ion-label>
                                </ion-item>
                            </ion-col>
                            <ion-col style="margin-left: 70px;">
                                <ion-label>
                                    <p class="ion-text-wrap">{{item.review}}</p>
                                    <p style="margin-top: 16px;">
                                        {{formatDate(item.created_at)}}
                                    </p>
                                </ion-label>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
    import ProductAPI from '@/api/product'
    import ResourceURL from '@/api/resourceURL'

    import ProductStatus from '@/components/ProductStatus'
    import StarRating from 'vue-star-rating'

    import {
        ref
    } from '@vue/reactivity'
    import {
        // onMounted,
        onUpdated, watch
    } from '@vue/runtime-core'
    import {
        useRouter
    } from 'vue-router'
    export default {
        name: 'DetailProduct',
        components: {
            ProductStatus,
            StarRating,
        },
        setup() {
            // onMounted(() => {
            //     loadProduct()
            // })

            onUpdated(() => {
                if (router.currentRoute.value.path ===`/vendor/dashboards/detailsproduct/${router.currentRoute.value.params.id}`)
                    loadProduct()
            })

            const router = useRouter()

            const ratingAndReviews = [{
                'rating': 3.8,
                'customerName': 'Erika Labayen',
                'review': 'I love science fiction. My first science-fiction novel was Ray Bradbury’s “451 Fahrenheit,” and it is still one of my favorites. I started with the classics: Isaac Asimov, Arthur Clarke, Philip K. Dick, Ursula Le Guin–and gradually moved to modern authors such as Ted Chiang or Max Brooks.',
            }, {
                'rating': 4.5,
                'customerName': 'Val Bachita',
                'review': 'There is a saying that lightning never strikes the same place twice. Many of us, however, probably experienced a series of misfortunes at least once in our lives. When something bad happens, you think, “Alright, that should be it. Nothing worse can happen to me now”–and then it happens. But I guess few people have had a day (or night) as bad as Connie Nikas, the main character of an American criminal drama called “Good Time.” Really, just how unfortunate can a man be? Filmed in 2017 by Josh and Benny Safdie, the movie is their debut.Starring Robert Pattinson as Connie, the film reveals him not only as a brilliant actor, but also redeems him of his role in the“ Twilight” saga.In other words, Connie looks totally different from what you would have expected of Pattinson, considering his previous characters.I will get to this aspect later; for now, let me briefly review the movie’ s plot.So, spoilers ahead— consider yourself warned.',
            }]

            let product = ref({})
            let product_ratings = ref({})
            let thumbnailPath = ref('')
            const isLoading = ref(false)

            watch(router, function(val) {
                console.log(val);
            })

            function onClickGoToUpdate(id) {
                router.push(`/vendor/dashboards/updateproduct/${id}`)
            }

            function goBack() {
                router.go(-1)
            }

            function getThumbnail(fileName) {
                if (fileName) {
                    return thumbnailPath.value = ResourceURL.api + fileName
                } else {
                    return thumbnailPath.value = 'https://www.fcprop.net/images/noimage.png'
                }
            }

            async function loadProduct(id) {
                isLoading.value = true;
                id = router.currentRoute.value.params.id
                if (id) {
                    await ProductAPI.get(id).then((response) => {
                            product.value = response.data.data
                            product_ratings.value = response.data.data.product_ratings
                            if (product.value.thumbnail_name === "")
                                getThumbnail()
                            else
                                getThumbnail(product.value.thumbnail_name)
                        })
                        .finally(() => {
                            isLoading.value = false;
                        })
                }
            }

            return {
                product,
                isLoading,
                onClickGoToUpdate,
                goBack,
                ratingAndReviews,
                getThumbnail,
                thumbnailPath,
                product_ratings
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    @import '@/assets/css/products.scss';
</style>