<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div v-if="postList">
                    <div class="row"  v-for="(item, index) in postList">
                        <div class="col-xs-5 blogpost_img">
                            <img :src="item.image_url" :alt="item.title" />
                            <!--<div class="margin_20"></div>-->
                        </div>
                        <div class="col-xs-7 blogpost_txt">
                            <h2 class="blogpost_title">{{ item.title }}</h2>
                            <div class="blogpost_content">
                                <p class="blogpost_date">
                                    <span v-if="item.author" class="blog-author">by {{ item.author }}<span class="regular">|</span></span> 
                                    {{ item.published_on }}
                                </p>
                                <p class="blogpost_discription">{{ item.body_short }}</p>
                                <router-link :to="'/posts/'+ item.slug" >
	                                <i class="fa fa-caret-right"></i> <span class="read_more">View Post</span>
                                </router-link>
                            </div>
                            <div class="margin_20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue!inside_banner.vue", "vue-lazy-load", "vue-social-sharing"], function (Vue, Vuex, moment, tz, insideBanner, VueLazyload, SocialSharing) {
        Vue.use(VueLazyload);
        return Vue.component("blog-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataLoaded: false,
                    pageName: "What's New",
                    // posts: [],
                    // morePosts: [],
                    // morePostsFetched: false,
                    // noMorePosts: false,
                    // noPosts: false
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
                            value.body_short = _.truncate(value.body, { 'length': 99, 'separator': ' ' });
                            
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
                }
            }
        });
    });
</script>