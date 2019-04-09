<template>
    <footer v-if="dataLoaded" v-cloak>
        <section class="footer_menu main_container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4 footer_hours">
                    <p class="footer_heading">DIRECTIONS</p>
                    <iframe :src="siteInfo.googleMapURL" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4 footer_newsletter">
                    <p class="footer_heading">NEWSLETTER SUBSCRIPTION</p>
                    <p>Stay up to date on the latest news from {{ property.name }}!</p>
                    <label for="emailAddress" class="accessibility">Enter Email Address</label>
                    <input id="emailAddress" v-model="newsletter_email" type="text" placeholder="Susbcribe to Newsletter" class="newsletter_control" required />
                    <button @click="newsletterRoute" class="newsletter_btn animated_btn caps">Subscribe</button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 footer_insta">
                    <p class="footer_heading">FOLLOW US ON FACEBOOK</p>
                    <div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>
                </div>
            </div>
        </section>
        <section class="footer_privacy ">
            <div class="main_container row">
                <div>
                    <p class="footer_text">
                        <router-link to="/leasing" exact>Leasing</router-link> |
                        <router-link to="/terms-of-use" exact>Terms of Use</router-link> |
                        <router-link to="/privacy-policy" exact>Privacy Policy</router-link>
                    </p>
                </div>
                <div>
                    <p class="footer_text text-center">Powered by <a href="https://www.mallmaverick.com/" target="_blank">Mall Maverick</a></p>
                </div>
                <div>
                    <div class="footer_logo">
                        <p class="footer_text">&#169; {{copyright_year}} {{property.name}}</p>
                        <a :href="siteInfo.propertyManagementURL" target="_blank">
                            <img src="//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554491926156/LewisRetailCentersWhite11.png" class="property_mgmt" alt="Lewis Retail Centers Logo">
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </footer>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "json!site.json"], function (Vue, Vuex, moment, tz, site) {
        return Vue.component("footer-component", {
            template: template, // the variable template will be injected,
            data: function data() {
                return {
                    dataLoaded: false,
                    siteInfo: site,
                    newsletter_email: ""
                }
            },
            created () {
                this.dataLoaded = true;
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ]),
                copyright_year() {
                    return moment().year();
                },
                getPropertyAddress() {
                    return this.property.address1 + ' ' + this.property.city + ' ' + this.property.country + ' ' + this.property.province_state
                }
            },
            methods: {
                newsletterRoute() {
                    this.show_menu = false;
                    this.$router.push("/newsletter?email=" + this.newsletter_email);
                    this.newsletter_email = "";
                }
            }
        });
    });
</script>