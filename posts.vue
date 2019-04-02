<template>
    <div> <!-- without an outer container div this component template will not render -->
        <div v-if="posts">
            <div class="row"  v-for="(item, index) in postList">
                <div class="col-xs-5 blogpost_img">
                    <!--<img src="{{ image_url }}" />-->
                    <div class="margin_20"></div>
                </div>
                <div class="col-xs-7 blogpost_txt">
                    <h2 class="blogpost_title">{{ item.title }}</h2>
                    <div class="blogpost_content">
                        <p class="blogpost_date">
                            <span v-if="item.author" class="blog-author">by {{ item.author }}<span class="regular">|</span></span> 
                            {{ item.published_on }}
                        </p>
                        <p class="blogpost_discription">{{ item.body_short }}</p>
                        <a :href="'/posts/' + item.slug" class="readmore">Read More</a>
                    </div>
                    <div class="margin_20"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone"], function (Vue, Vuex, moment, tz) {
        return Vue.component("blog-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataloaded: false
                }
            },
            created() {
                this.loadData().then(response => {
                    // this.firstPost
                    // this.postList
                    console.log("this.posts", this.postList)
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
                    var blog = this.findBlogByName("Blog").posts;
                    console.log("blog", blog)
                    var vm = this;
                    var temp_blog = [];
                    _.forEach(blog, function(value, key) {
                        var today = moment().tz(vm.timezone);
                        var webDate = moment(value.publish_date).tz(vm.timezone);
                        if (today >= webDate) {
                            if (_.includes(value.image_url, 'missing')) {
                                value.image_url = "//codecloud.cdn.speedyrails.net/sites/5c0581a36e6f643f53050000/image/jpeg/1527006352000/bccblogplaceholder.jpg";
                            }
                            
                            if (value.body.length > 99) {
                                value.body_short = _.truncate(value.body, { 'length': 99, 'separator': ' ' });
                            } else {
                                value.body_short = value.body;
                            }
                            
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
                // handleButton: function () {
                //     if(!this.morePostsFetched){
                //         this.morePosts = this.blogList;
                //         this.posts = this.morePosts.splice(0, 3);
                //         this.morePostsFetched = true;
                //     } else {
                //         var nextPosts = this.morePosts.splice(0, 3);
                //         // Add 3 more posts to posts array
                //         var vm = this;
                //         _.forEach(nextPosts, function(value, key) {
                //             vm.posts.push(value);
                //         });
                //     }
                //     if(this.blogList.length === 0){
                //         this.noMorePosts = true
                //         this.noPosts = true
                //     } else {

                //     }
                // }
            }
        });
    });
</script>