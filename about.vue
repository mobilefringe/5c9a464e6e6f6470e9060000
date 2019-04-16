<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div  v-if="currentImage" class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <img class="img_max" :src="currentImage" alt="" />    
                        </div>
                        <div class="details_col_9">
                            <div class="contact_page_body" v-if="currentPage" v-html="currentPage.body"></div>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-md-12">
                            <div class="page_body" v-html="currentPage.body"></div>
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
                    dataLoaded: true,
                    pageName: "About Us",
                    currentPage: null,
                    currentImage: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    if (this.currentPage.image_url === null) {
                        var img_repo = this.findRepoByName('Inside Page Default Side Image').images;
                        if (img_repo != null) {
                            var image_url = img_repo[0].image_url;
                            this.currentImage = image_url;
                        }
                    } else {
                        this.currentImage = this.currentPage.image_url;
                    }
                    
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
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/"+ this.property.slug + "-about-us.json" })
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