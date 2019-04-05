<template>
    <footer v-if="dataLoaded" v-cloak>
        <section class="footer_menu main_container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4 footer_hours">
                    <p class="footer_heading">DIRECTIONS</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.5050034806413!2d-117.61748678478888!3d34.13341998058389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c33743971a8557%3A0x2c1fbba344c1504d!2sAlta+Loma+Square!5e0!3m2!1sen!2sca!4v1554413797361!5m2!1sen!2sca" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-4 footer_newsletter">
                    <p class="footer_heading">NEWSLETTER SUBSCRIPTION</p>
                    <p>Stay up to date on the latest news from {{ property.name }}!</p>
                    <label for="emailAddress" class="accessibility">Enter Email Address</label>
                    <input id="emailAddress" v-model="newsletter_email" type="text" placeholder="Susbcribe to Newsletter" class="newsletter_control" required />
                    <button @click="newsletterRoute" class="newsletter_btn animated_btn">Subscribe</button>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 footer_insta">
                    <p class="footer_heading">FOLLOW US ON FACEBOOK</p>
                    <div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>
                </div>
            </div>
        </section>
        <section class="footer_privacy ">
            <div class="main_container row">
                <div class="col-md-4">
                    <p class="footer_text">
                        <router-link to="/terms-of-use" exact>Terms of Use</router-link> |
                        <router-link to="/privacy-policy" exact>Privacy Policy</router-link> |
                        <router-link to="/leasing" exact>Leasing</router-link> |
                    </p>
                </div>
                <div class="col-md-4">
                    <p class="footer_text">Powered by <a href="https://www.mallmaverick.com/" target="_blank">Mall Maverick</a></p>
                </div>
                <div class="col-md-4">
                    <p class="footer_text">&#169; {{copyright_year}} {{property.name}} | <a :href="siteInfo.propertyManagementURL" target="_blank">{{ siteInfo.propertyManagementName }}</a></p>
                    <img src="//codecloud.cdn.speedyrails.net/sites/5c9a464e6e6f6470e9060000/image/png/1554491926156/LewisRetailCentersWhite11.png" class="" alt="Lewis Retail Centers Logo">
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