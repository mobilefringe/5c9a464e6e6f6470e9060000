<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30" v-if="postList">
                    <transition-group name="list" tag="div">
                        <div class="row margin_40"  v-for="(item, index) in postList" v-if="showMore > index" :key="index">
                            <div class="col-xs-12 col-sm-4">
                                <img class="max-width blog_image" :src="item.image_url" alt="" />
                            </div>
                            <div class="col-xs-12 col-sm-8">
                                <h3 class="promo_name">{{ item.title }}</h3>
                                <p class="promo_store_name">
                                    <span v-if="item.author" class="blog-author">by {{ item.author }}<span class="regular"> | </span></span> 
                                    {{ item.publish_date | moment("MMM D, YYYY", timezone) }}
                                </p>
                                <div class="promo_desc" v-html="item.body_short"></div>
                                <router-link :to="'/posts/'+ item.slug" >
                                    <i class="fa fa-caret-right"></i> <span class="read_more">View Post</span>
                                </router-link>
                            </div>
                        </div>
                    </transition-group>
                    <div class="row" v-if="postList && showMore <= postList.length" @click ="loadMore()">
                        <div class="col-sm-4 col-md-2">
                            <div class="animated_btn">Load More Posts</div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue!inside_banner.vue", "json!site.json"], function (Vue, Vuex, moment, tz, VueMoment, insideBanner, site) {
        return Vue.component("blog-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    siteInfo: site,
                    pageName: "What's New",
                    showMore: 3,
                    incrementBy: 3
                }
            },
            created() {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogByName'
                ]),
                postList() {
                    var blog = this.findBlogByName("Main Blog").posts;
                    var vm = this;
                    var temp_blog = [];
                    _.forEach(blog, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.publish_date).tz(vm.timezone);
                        if (today >= webDate) {
                            if (_.includes(value.image_url, 'missing')) {
                                value.image_url = "//codecloud.cdn.speedyrails.net/sites/5c0581a36e6f643f53050000/image/jpeg/1527006352000/bccblogplaceholder.jpg";
                            }
                            value.body_short = _.truncate(value.body, { 'length': 100, 'separator': ' ' });
                            
                            temp_blog.push(value);
                        }
                    });
                    blog = _.reverse(_.sortBy(temp_blog, function (o) { return o.publish_date }));
                    return blog
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "blogs")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                loadMore() {
                    if (this.showMore <= this.postList.length) {
                        var num = this.showMore + this.incrementBy;
                        this.showMore = num;
                    }
                },
            }
        });
    });
</script>