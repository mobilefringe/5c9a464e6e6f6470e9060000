<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <image-component :page_name="pageName"></image-component>
                        </div>
                        <div class="details_col_9">
                            <p class="inside_page_link">Be the first to know about upcoming events and special announcements from {{ property.name }}!</p>
                            <form id="mktoForm_3265"></form>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "jquery", "vee-validate", "json!site.json", "vue!inside_banner.vue", "vue!side_image.vue"], function(Vue, Vuex, $, VeeValidate, site, insideBanner, sideImage) {
        Vue.use(VeeValidate);
        return Vue.component("newsletter-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: true,
                    pageName: "Newsletter",
                    siteInfo: site,
                    form_data : {},
                    formSuccess : false,
                    formError: false
                }
            },
            mounted () {
                window.MktoForms2.loadForm("//app-sj03.marketo.com", "561-LJY-710", 3265);
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            }
        });
    });
</script>