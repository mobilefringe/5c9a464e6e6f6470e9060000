<template>
    <div> <!-- without an outer container div this component template will not render -->
        <div id="fb-root"></div>
        <div @click="showFb" id="facebook-clicker"></div>
        <div style="display: none;" id="hidden-fb">
            <div class="fb-page" :data-href="dataHref" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote :cite="dataHref" class="fb-xfbml-parse-ignore"><a :href="dataHref">{{linkText}}</a></blockquote></div>
        </div>
    </div>
</template>

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
                    
                this.showFb();
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

<style>
  .fb-page {
    z-index: 1000;
    position: fixed!important;
    top: calc(50% - 130px);
    left: 0;
  }

#facebook-clicker {
  cursor: pointer;
  z-index: 1000;
  width: 170px;
  height: 60px;
  position: fixed;
  top: calc(50% - 75px);
  left: -59px;
  /*background-image: url('./assets/facebook.png');*/
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotate(-90deg);
  border-radius: 0px 0px 15px 15px;
}

@media screen and (max-width: 615px) {
  #facebook-clicker {
    display: none;
  }
}
</style>