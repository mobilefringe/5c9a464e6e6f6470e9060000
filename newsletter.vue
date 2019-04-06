<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div class="details_row">
                        <div class="details_col_3 hidden_phone">
                            <img class="img_max" src="http://placehold.it/440x1200" alt="" />    
                        </div>
                        <div class="details_col_9">
                            <p class="inside_page_link">Be the first to know about upcoming events and special announcements from {{ property.name }}!</p>
                            <form class="form-horizontal" action="//mobilefringe.createsend.com/t/d/s/vuutyk/" method="post" @submit.prevent="validateBeforeSubmit">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="fieldzyklkj">First Name</label>
                                        <input id="fieldzyklkj" class="margin_20 form-control" name="cm-f-zyklkj" type="text" required placeholder="First Name" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="fieldzyklkt">Last Name</label>
                                        <input id="fieldzyklkt" class="margin_20 form-control" name="cm-f-zyklkt" type="text" required placeholder="Last Name" />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="fieldzyklki">Postal Code</label>
                                        <input id="fieldzyklki" class="margin_20 form-control" name="cm-f-zyklki" type="text" placeholder="Postal Code"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="cm-vuutyk-vuutyk">Email</label>
                                        <input id="cm-vuutyk-vuutyk" required class="margin_20 form-control" name="cm-vuutyk-vuutyk" type="email" placeholder="Email">
                                    </div>
                                    <div class="col-md-12">
                                        <div style="margin-left: 20px">
                                            <label class="checkbox">
                                                <input name="agree_newsletter" required  type="checkbox">
                                                    I agree to receive communications from {{ property.name }}.
                                            </label>
                                        </div>
            					    </div>
            					    <div class="margin_20 clearfix"></div>
                                    <div class="col-xs-12">
                                        <button class="animated_btn" type="submit" :disabled="formSuccess">Subscribe</button>
                                    </div>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "jquery", "vee-validate", "json!site.json", "vue!inside_banner.vue"], function(Vue, Vuex, $, VeeValidate, site, insideBanner) {
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
                this.form_data.email = this.$route.query.email;
                $("#cm-vuutyk-vuutyk").val(this.form_data.email);
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#cm-vuutyk-vuutyk").val(this.form_data.email);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            },
            methods: {
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            
                            if(errors.length > 0) {
                                console.log("Error");
                            } else {
                                console.log("No Error");
                                // return true;
                                form.target.submit();
                            }
                        }
                    });
                }
            }
        });
    });
</script>