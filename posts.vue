<template>
    <div v-if="dataloaded"> <!-- without an outer container div this component template will not render -->
     {{ postList }}
        <!--<div v-if="postList">-->
        <!--    <div class="row"  v-for="(item, index) in postList">-->
        <!--        <div class="col-xs-5 blogpost_img">-->
                    <!--<img src="{{ image_url }}" />-->
        <!--            <div class="margin_20"></div>-->
        <!--        </div>-->
        <!--        <div class="col-xs-7 blogpost_txt">-->
        <!--            <h2 class="blogpost_title">{{ item.title }}</h2>-->
        <!--            <div class="blogpost_content">-->
        <!--                <p class="blogpost_date">-->
        <!--                    <span v-if="item.author" class="blog-author">by {{ item.author }}<span class="regular">|</span></span> -->
        <!--                    {{ item.published_on }}-->
        <!--                </p>-->
        <!--                <p class="blogpost_discription">{{ item.body_short }}</p>-->
        <!--                <a :href="'/posts/' + item.slug" class="readmore">Read More</a>-->
        <!--            </div>-->
        <!--            <div class="margin_20"></div>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</div>-->
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-lazy-load", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, VueLazyload, SocialSharing) {
        Vue.use(VueLazyload);
        return Vue.component("blog-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataloaded: false,
                    posts: [],
                    morePosts: [],
                    morePostsFetched: false,
                    noMorePosts: false,
                    noPosts: false
                }
            },
            created() {
                this.loadData().then(response => {
                    this.firstPost
                    this.posts
                    this.dataloaded = true;
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
                    var blog = this.findBlogByName("Bramalea City Centre").posts;
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
                },
                firstPost() {
                    var first_post = _.slice(this.blogs, 0, 1);
                    return first_post
                },
                blogList() {
                    var blog_list = _.drop(this.blogs);
                    return blog_list
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "blogs")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                handleButton: function () {
                    if(!this.morePostsFetched){
                        this.morePosts = this.blogList;
                        this.posts = this.morePosts.splice(0, 3);
                        this.morePostsFetched = true;
                    } else {
                        var nextPosts = this.morePosts.splice(0, 3);
                        // Add 3 more posts to posts array
                        var vm = this;
                        _.forEach(nextPosts, function(value, key) {
                            vm.posts.push(value);
                        });
                    }
                    if(this.blogList.length === 0){
                        this.noMorePosts = true
                        this.noPosts = true
                    } else {

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