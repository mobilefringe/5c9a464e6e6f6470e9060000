<template>
    <div> <!-- without an outer container div this component template will not render -->
        <img class="img_max" v-if="sideImage" :src="sideImage" alt="" /> 
    </div>
</template>

<script>
    define(["Vue", "vuex"], function(Vue, Vuex){
        return Vue.component("banner-component", {
            template: template, // the variable template will be injected
            props:['page_name'],
            data: function() {
                return {
                    sideImage: null,
                    pageName: null
                }
            },
            mounted() {
                this.$nextTick(function() {
                    // var temp_repo = this.findRepoByName('Inside Page Banner').images;
                    // if (temp_repo != null) {
                    //     this.pageBanner = temp_repo[0];
                    // } else {
                        this.sideImage = {
                            "image_url": "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554587000151/default_side_banner.png"
                        }
                    // }
                    
                    this.pageName = this.page_name;
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