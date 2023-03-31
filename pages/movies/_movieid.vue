<!-- eslint-disable vue/no-template-shadow -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<template>

    <!-- Loading -->
    <LoadingComponent v-if="$fetchState.pending" />

    <!-- Movie Info -->
    <div v-else>
        <!-- Navbar -->
        <NavbarComponent />
        <div class="single-movie container">
            <NuxtLink class="button" :to="{ name: 'index' }"> Back </NuxtLink>
            <div class="movie-info">
                <div class="movie-img">
                    <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
                </div>
                <div class="movie-content">
                    <h1>Title: {{ movie.title }}</h1>
                    <p class="movie-fact tagline">
                        <span>Tagline:</span> "{{ movie.tagline }}"
                    </p>
                    <p class="movie-fact">
                        <span>Released:</span>
                        {{
                            new Date(movie.release_date).toLocaleString('en-us', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })
                        }}
                    </p>
                    <p class="movie-fact">
                        <span>Duration:</span> {{ movie.runtime }} minutes
                    </p>
                    <p class="movie-fact">
                        <span>Revenue:</span>
                        {{
                            movie.revenue.toLocaleString('en-us', {
                                style: 'currency',
                                currency: 'USD',
                            })
                        }}
                    </p>
                    <p class="movie-fact"><span>Overview:</span> {{ movie.overview }}</p>
                    <div>
                    </div>
                </div>
            </div>
            <div class="reviews-data">
                <div v-if="reviews.length === 0">
                    <p>No reviews are available for now</p>
                </div>
                <div v-else class="container my-5">
                    <h1>Reviews: </h1>
                    <div class="card p-3">
                        <div v-for="(review, index) in reviews.results" :key="index">
                            <div v-for="(authDetail, i) in review " :key="i">
                                <div class="col-6">
                                    <div v-if="authDetail.avatar_path">
                                        <img :src="`https://image.tmdb.org/t/p/w200/${authDetail.avatar_path}`"
                                            alt="Author Avatar" class="mr-3">
                                    </div>
                                </div>
                            </div>
                            <p class="text-color"> <span>Author:</span> {{ review.author }}</p>
                            <div v-for="(authDetail, i) in review " :key="i">
                                <div v-if="authDetail.rating" class="d-flex">
                                    <p class="text-color"> <span>Note:</span></p>
                                    <div class="rating pl-2">
                                        <span v-for="i in 10" :key="i" class="star"
                                            :class="{ 'filled': i < Math.round(authDetail.rating), 'black-star': i > Math.round(authDetail.rating) }"></span>
                                    </div>
                                </div>
                            </div>
                            <p class="text-color my-3"> <span>Content:</span> {{ review.content.slice(0, 350) }} <span
                                    v-if="review.content.length > 350">...</span></p>
                            <hr>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import NavbarComponent from '../../components/NavbarComponent.vue'
import LoadingComponent from '../../components/LoadingComponent.vue'
export default {
    name: 'SingleMovie',
    components: { LoadingComponent, NavbarComponent },
    middleware: 'auth',
    data() {
        return {
            movie: '',
            reviews: '',
        }
    },
    async fetch() {
        await this.getSingleMovie()
        // eslint-disable-next-line no-console

        await this.getMovieReview()
    },
    // delay for fetching
    fetchDelay: 1000,
    head() {
        return {
            title: this.movie.title,
        }
    },
    methods: {
        async getSingleMovie() {
            const data = axios.get(
                `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=c3973a7fdda35b0058bef3411c380b1d`
            )

            const result = await data
            this.movie = result.data
        },
        async getMovieReview() {
            const data = axios.get(
                `https://api.themoviedb.org/3/movie/${this.$route.params.movieid}/reviews?api_key=c3973a7fdda35b0058bef3411c380b1d`
            )

            const result = await data

            this.reviews = result.data
            // eslint-disable-next-line no-console
            console.log(this.reviews);

        },
    },

}
</script>

<style lang="scss">
.rating {
    display: inline-block;
    font-size: 1.5rem;
}

.star {
    display: inline-block;
    color: #ffc107;
    cursor: pointer;
}

.star::before {
    content: '\2605';
}

.filled {
    color: #ffc107;
}

.black-star {
    color: black;
}

.text-color {
    color: black;

}

.single-movie {
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 16px;

    .button {
        align-self: flex-start;
        margin-bottom: 32px;
    }

    .movie-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        color: #fff;

        @media (min-width: 800px) {
            flex-direction: row;
            align-items: flex-start;
        }

        .movie-img {
            img {
                max-height: 500px;
                width: 100%;

                @media (min-width: 800px) {
                    max-height: 700px;
                    width: initial;
                }
            }
        }

        .movie-content {
            h1 {
                font-size: 56px;
                font-weight: 400;
            }

            .movie-fact {
                margin-top: 12px;
                font-size: 20px;
                line-height: 1.5;

                span {
                    font-weight: 600;
                    text-decoration: underline;
                }
            }

            .tagline {
                font-style: italic;

                span {
                    font-style: normal;
                }
            }
        }
    }
}

img {
    border-radius: 50%;
}

.card-title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.text-warning {
    color: #ffc107;
}
</style>