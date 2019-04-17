<template>
    <div v-if="property" class="main_container">
        <div class="message_content">
            <p class="center">{{ property.description }}</p> 
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex"], function(Vue, Vuex){
        return Vue.component("messages-component", {
            template: template, // the variable template will be injected
            computed: {
                ...Vuex.mapGetters([
                    'property'
                ])
            }
        })
    });
</script>