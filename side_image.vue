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
                    sideImage: null
                }
            },
            mounted() {
                this.$nextTick(function() {
                    var default_image = "//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554587000151/default_side_banner.png"
                    var temp_repo = this.findRepoByName('Inside Page Side Image').images;
                    if (temp_repo != null) {
                        if (_.includes(this.page_name, "About Us")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "About Us"); });
                            this.sideImage = item[0].image_url;
                        } else if (_.includes(this.page_name, "Contact Us")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Contact Us"); });
                            this.sideImage = item[0].image_url;
                        } else if (_.includes(this.page_name, "Jobs")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Jobs"); });
                            this.sideImage = item[0].image_url;
                        } else if (_.includes(this.page_name, "Newsletter")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Newsletter"); });
                            this.sideImage = item[0].image_url;
                        } else if (_.includes(this.page_name, "Sales")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Sales"); });
                            console.log("item", _.filter(temp_repo, function(o) { return _.includes(o.name, "Sales"); }))
                            if (item != 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                            console.log("this.sideImage", this.sideImage)
                        } else {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Default"); });
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