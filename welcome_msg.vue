<template>
    <div v-if="property">
        <div class="message_content">
            <h1 v-if="property.welcome_message" class="center">{{ property.welcome_message }}</h1>
            <p v-if="property.description" class="center">{{ property.description }}</p> 
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