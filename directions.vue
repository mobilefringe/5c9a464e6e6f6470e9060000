<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="inside_header_background" :style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
                    <div class="main_container">
                        <div class="page_container">
                            <h2>Directions</h2>
                        </div>
                    </div>
                </div>
                <div class="main_container margin_30">
                    <div class="row">
                        <div class="col-md-12">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5050034806413!2d-117.61748678478888!3d34.13341998058389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c33743971a8557%3A0x2c1fbba344c1504d!2sAlta+Loma+Square!5e0!3m2!1sen!2sca!4v1554413797361!5m2!1sen!2sca" width="100%" height="350" frameborder="0" style="border:0" allowfullscreen></iframe>
                            <hr>
                            <div class="contact_page_body" v-if="currentPage" v-html="currentPage.body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "json!site.json"], function(Vue, Vuex, site) {
        return Vue.component("directions-component", {
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
                    if(temp_repo != null) {
                        this.pageBanner = temp_repo[0];
                    } else {
                        this.pageBanner = {
                            "image_url": "//codecloud.cdn.speedyrails.net/sites/5b2925776e6f6432b6110000/image/png/1531495616000/inside_banner.png"
                        }
                    }
                    
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
                            this.$store.dispatch('LOAD_PAGE_DATA', { url: this.property.mm_host + "/pages/"+ this.property.slug + "directions.json"})
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