<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <image-component :page_name="pageName"></image-component>
                        </div>
                        <div class="details_col_9">
                            <div class="contact_page_body" v-if="currentPage" v-html="currentPage.body"></div>
                            <hr v-if="aboutPage.body">
                            <div class="contact_page_body" v-if="aboutPage" v-html="aboutPage.body"></div>
                            <p>Visit Lewis Retail Centers</p>
                            <div class="about_social_icons">
                                <a href="" target="_blank">
                                    <p class="accessibility">Visit Lewis Retail on Facebook</p>
                                    <i class="fab fa-facebook-square"></i>
                                </a>
                                <a href="" target="_blank">
                                    <p class="accessibility">Visit Lewis Retail on LinkedIn</p>
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="" target="_blank">
                                    <p class="accessibility">Visit Lewis Retail website</p>
                                    <i class="fas fa-globe"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "json!site.json", "vue!inside_banner.vue", "vue!side_image.vue"], function(Vue, Vuex, site, insideBanner, sideImage) {
        return Vue.component("about-component", {
            template: template, // the variable template will be injected
            props:['inside_banner'],
            data: function() {
                return {
                    dataLoaded: false,
                    pageName: "About Us",
                    currentPage: null,
                    currentImage: null,
                    aboutPage: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    this.aboutPage = response[1].data;
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function () {
                    this.property.mm_host = this.property.mm_host.replace("http:", "");
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/"+ this.property.slug + "-about-us.json" }),
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/"+ this.property.slug + "-about-lewis-retail.json" })
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>