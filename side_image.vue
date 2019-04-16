<template>
    <div> <!-- without an outer container div this component template will not render -->
        <img class="img_max" v-if="sideImage" :src="sideImage" alt="" /> 
    </div>
</template>

<script>
    define(["Vue", "vuex"], function(Vue, Vuex){
        return Vue.component("image-component", {
            template: template, // the variable template will be injected
            props:['page_name'],
            data: function() {
                return {
                    sideImage: null,

                }
            },
            mounted() {
                this.$nextTick(function() {
                    var temp_repo = this.findRepoByName('Inside Page Side Image').images;
                    if (temp_repo != null) {
                        console.log("temp_repo", temp_repo)
                        if (_.includes(this.page_name, "Jobs")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Jobs"); });
                            this.sideImage = item[0].image_url;
                        } else if (_.includes(this.page_name, "Sales")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Sales"); });
                            this.sideImage = item[0].image_url;
                        }
                    } else {
                        this.sideImage = "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554587000151/default_side_banner.png"
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