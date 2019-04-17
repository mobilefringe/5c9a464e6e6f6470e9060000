<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container mobile_padding margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <image-component :page_name="pageName"></image-component>  
                        </div>
                        <div class="details_col_9">
                            <div class="page_body" v-html="currentPage.body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "vue!inside_banner.vue", "vue!side_image.vue", "lightbox"], function (Vue, Vuex, insideBanner, sideImage, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function data() {
                return {
                    dataLoaded: false,
                    pageName: "",
                    currentPage: null,
                    currentImage: null
                }
            },
            created() {
                this.updateCurrentPage(this.id);
            },
            watch: {
                $route: function () {
                    this.updateCurrentPage(this.$route.params.id);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            },
            methods: {
                updateCurrentPage(id) {
                    this.$nextTick(function() {
                        // Determine the incoming route
                        var route_url = "";
                        if (_.includes(this.$route.path, "privacy-policy")) {
                            route_url = "/pages/" + this.property.slug + "-privacy-policy.json"
                        } else if (_.includes(this.$route.path, "terms-of-use")) {
                            route_url = "/pages/" + this.property.slug + "-terms-of-use.json"
                        } else {
                            route_url = this.id;
                        }
                        
                        var _this = this;
                        this.property.mm_host = this.property.mm_host.replace("http:", "");
                        this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host +   route_url }).then(function (response) {
                            _this.currentPage = response.data;
                            console.log(_this.currentPage)
                            _this.pageName = _this.currentPage.title;
        
                            _this.dataLoaded = true;
                        }, function (error) {
                            console.error( "Could not retrieve data from server. Please check internet connection and try again.");
                            _this.$router.replace({ name: 'home' });
                        });
                    });
                }
            }
        });
    });
</script>