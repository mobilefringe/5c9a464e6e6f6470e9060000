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
                        if (_.includes(this.page_name, "Jobs")) {
                            this.sideImage = _.filter(temp_repo, function(o) { return o.name === "Jobs"; });
                        } else if (_.includes(this.page_name, "Sales")) {
                            this.sideImage = _.filter(temp_repo, function(o) { return o.name === "Sales"; });
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