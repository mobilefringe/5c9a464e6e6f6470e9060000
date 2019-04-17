<template>
    <div class="inside_header_background" v-if="pageBanner" :style="{ background: 'linear-gradient(0deg, rgba(255, 119, 0, 0.8), rgba(255, 119, 0, 0.8)), url(' + pageBanner.image_url + ') center center' }">
        <div class="main_container">
            <div class="page_container">
                <h2 v-html="pageName"></h2>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex"], function(Vue, Vuex){
        return Vue.component("banner-component", {
            template: template, // the variable template will be injected
            props:['page_name'],
            data: function() {
                return {
                    pageBanner: null,
                    pageName: null
                }
            },
            mounted() {
                this.updateBanner(this.page_name)
                // this.$nextTick(function() {
                //     console.log("page_name", this.page_name)
                //     var temp_repo = this.findRepoByName('Inside Page Banner').images;
                //     if (temp_repo != null) {
                //         this.pageBanner = temp_repo[0];
                //     } else {
                //         this.pageBanner = {
                //             "image_url": "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554588744991/default_inside_banner.png"
                //         }
                //     }
                    
                //     this.pageName = this.page_name;
                // });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            },
            methods: {
                updateBanner(page_name) {
                    this.$nextTick(function() {
                        console.log("page_name", this.page_name)
                        var temp_repo = this.findRepoByName('Inside Page Banner').images;
                        if (temp_repo != null) {
                            this.pageBanner = temp_repo[0];
                        } else {
                            this.pageBanner = {
                                "image_url": "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554588744991/default_inside_banner.png"
                            }
                        }
                        
                        this.pageName = this.page_name;
                    });
                    
                }
            }
        })
    });
</script>