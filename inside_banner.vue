<template>
    <div class="inside_header_background" v-if="pageBanner" :style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
        <div class="main_container">
            <div class="page_container">
                <h2>About Us</h2>
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
                }
            },
            mounted() {
                this.$nextTick(function() {
                    var temp_repo = this.findRepoByName('Inside Page Banner').images;
                    if (temp_repo != null) {
                        this.pageBanner = temp_repo[0];
                    } else {
                        this.pageBanner = {
                            "image_url": "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554588744991/default_inside_banner.png"
                        }
                    }
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ])
            }
        })
    });
</script>