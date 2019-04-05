<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="inside_header_background" v-if="pageBanner" :style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
                    <div class="main_container">
                        <div class="page_container">
                            <h2>About Us</h2>
                        </div>
                    </div>
                </div>
                <div class="main_container margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <img class="img_max" src="http://placehold.it/440x1200" alt="" />    
                        </div>
                        <div class="details_col_9">
                            <div class="contact_page_body" v-html="currentPage.body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "json!site.json"], function(Vue, Vuex, site) {
        return Vue.component("about-component", {
            template: template, // the variable template will be injected
            props:['inside_banner'],
            data: function() {
                return {
                    dataLoaded: true,
                    pageBanner: null,
                    currentPage: null
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Inside Page Banner').images;
                    if (temp_repo != null) {
                        this.pageBanner = temp_repo[0];
                    } else {
                        this.pageBanner = {
                            "image_url": "//codecloud.cdn.speedyrails.net/sites/5b2925776e6f6432b6110000/image/png/1531495616000/inside_banner.png"
                        }
                    }
                    console.log("response", response)
                    this.currentPage = response[0].data;
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