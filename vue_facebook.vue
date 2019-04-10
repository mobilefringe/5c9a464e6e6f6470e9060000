<template>
    <div> <!-- without an outer container div this component template will not render -->
        <div id="fb-root"></div>
        <div @click="showFb" id="facebook-clicker"></div>
        <div id="hidden-fb">
            <div class="fb-page" :data-href="dataHref" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote :cite="dataHref" class="fb-xfbml-parse-ignore"><a :href="dataHref">{{linkText}}</a></blockquote></div>
        </div>
    </div>
</template>

<style>
    #facebook-clicker {
        opacity: 0;
        visibility: hidden;
    }
    .fb-page {
        width: 100%;
    }
</style>

<script>
    define(["Vue", "jquery"], function (Vue, $) {
        return Vue.component("VueFacebookPage", {
            template: template, // the variable template will be injected,
            props: ['data-href', 'link-text'],
            mounted() {
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: '1987015024884837',
                        xfbml: true,
                        autoLogAppEvents: true,
                        version: 'v3.2'
                    });
                };
                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
                    
                // this.showFb();
            },
            methods: {
                showFb() {
                    let clicker = $('#facebook-clicker')
                    if(clicker[0].style.left === '') {
                        $('#hidden-fb').toggle()
                        clicker.animate({left: "+=340"}, 400, () => console.log('done'))
                        $('#hidden-fb').animate({left: "500px"}, 1000, () => console.log('done'))
                    } else {
                        clicker[0].style.left = ''
                        $('#hidden-fb')[0].style.left = '-400px'
                        $('#hidden-fb').toggle()
                    }
                }
            }
        });
    });
</script>