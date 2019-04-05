<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="inside_header_background" :style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
                    <div class="main_container">
                        <h2 v-html="currentPage.title"></h2>
                    </div>
                </div>
                <div class="main_container mobile_padding margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <img class="img_max" src="//codecloud.cdn.speedyrails.net/sites/5b2925776e6f6432b6110000/image/jpeg/1531500156000/sidebanner4.jpg" alt="" />    
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
    define(["Vue", "vuex", "lightbox"], function (Vue, Vuex, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("page-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function data() {
                return {
                    dataLoaded: false,
                    pageBanner: null,
                    currentPage: null
                }
            },
            created() {
                var temp_repo = this.findRepoByName('Inside Page Banner').images;
                if (temp_repo != null) {
                    this.pageBanner = temp_repo[0];
                } else {
                    this.pageBanner = {
                        "image_url": "//codecloud.cdn.speedyrails.net/sites/5b2925776e6f6432b6110000/image/png/1531495616000/inside_banner.png"
                    }
                } 
                            
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
                        if (_.includes(this.$route.path, "leasing")) {  
                            route_url = this.property.mm_host + "/pages/" + this.property.slug + "-leasing.json";
                        } else if (_.includes(this.$route.path, "privacy-policy")) {
                            route_url = this.property.mm_host + "/pages/" + this.property.slug + "-leasing.json"
                        } else if (_.includes(this.$route.path, "terms-of-use")) {
                            route_url = this.property.mm_host + "/pages/" + this.property.slug + "-leasing.json"
                        } else {
                            route_url = this.id;
                        }
                        
                        var _this = this;
                        this.property.mm_host = this.property.mm_host.replace("http:", "");
                        this.$store.dispatch('LOAD_PAGE_DATA', { url: route_url }).then(function (response) {
                            _this.currentPage = response.data;
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