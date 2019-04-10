<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30" v-if="currentPost">
                    <div class="row">
                        <div class="col-md-12" id="post_container">
                            <h3 class="promo_name">{{ currentPost.title }}</h3>
                            <p class="promo_store_name">
                                <span v-if="currentPost.author" class="blog-author">by {{ currentPost.author }}<span class="regular"> | </span></span> 
                                {{ currentPost.publish_date | moment("MMMM D", timezone) }}
                            </p>
                          
                            <!--<p class="blogpost_date">{{ published_on }} {{#author}}+ {{ author }}{{/author}}</p>-->
                            <!--<div class="blog_img_section">-->
                            <!--    <img class="blogpost_detail_img" src="{{image_url}}" />-->
                            <!--</div>-->
                            <!--<div class="blog_detail_description">-->
                            <!--{{{ html_body }}}-->
                            <!--</div>-->
                         
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, SocialSharing) {
        return Vue.component("post-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function () {
                return {
                    dataloaded: false,
                    currentPost: null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.updateCurrentBlog(this.id);
                    this.dataloaded = true;
                });
            },
            watch: {
                $route: function () {
                    this.updateCurrentBlog(this.$route.params.id);
                },
                currentPost: function () {
                    if(this.currentPost != null){
                        if (_.includes(this.currentPost.image_url, 'missing')) {
                            this.currentPost.image_url = "//codecloud.cdn.speedyrails.net/sites/5c0581a36e6f643f53050000/image/jpeg/1527006352000/bccblogplaceholder.jpg";
                        }
                    }
                } 
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogByName',
                    'findBlogPostBySlug'
                ]),
                relatedPosts () {
                    var blog_posts = _.reverse(_.orderBy(this.findBlogByName("Bramalea City Centre").posts, function (o) { return o.publish_date }));

                    var current_post_date = this.currentPost.publish_date
                    var current_post_id = this.currentPost.id

                    var prev_posts = [];
                    _.forEach(blog_posts, function(value, key) {
                        if (value.id != current_post_id) {
                            if (value.publish_date <= current_post_date){
                                prev_posts.push(value); 
                            }
                        }
                    });
                    prev_posts = _.slice(prev_posts, 0, 3)
                    return prev_posts
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "blogs")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentBlog(id) {
                    var blogName = "Bramalea City Centre";
                    this.currentPost = this.findBlogPostBySlug(blogName, id);
                    if (this.currentPost === null || this.currentPost === undefined) {
                        this.$router.replace({ name: '404' });
                    }
                },
                shareURL(slug) {
                    var share_url = "https://www.bramaleacitycentre.com/posts/" + slug
                    return share_url
                }
            }
        });
    });
</script>