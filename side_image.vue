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
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        } else if (_.includes(this.page_name, "Contact Us")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Contact Us"); });
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        } else if (_.includes(this.page_name, "Jobs")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Jobs"); });
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        } else if (_.includes(this.page_name, "Newsletter")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Newsletter"); });
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        } else if (_.includes(this.page_name, "Sales")) {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Sales"); });
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        } else {
                            var item = _.filter(temp_repo, function(o) { return _.includes(o.name, "Default"); });
                            if (_.isEmpty(item) || item.length === 0) {
                                this.sideImage = default_image;
                            } else {
                                this.sideImage = item[0].image_url;
                            }
                        }
                    } else {
                        this.sideImage = default_image;
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