<template>
    <div> <!-- without an outer container div this component template will not render -->
        <loading-spinner v-if="!dataLoaded"></loading-spinner>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <banner-component :page_name="pageName"></banner-component>
                <div class="main_container margin_30">
                    <div class="details_row">
                        <div class="details_col_3">
                            <div v-if="currentStore.no_logo" class="store_details_image center-block">
                                <div class="no_logo">
                                    <p class="store_details_name">{{ currentStore.name }}</p>
                                </div>    
                            </div>
                            <div v-else class="store_details_image center-block">
                                <img :src="currentStore.store_front_url_abs" :alt="currentStore.name + ' Logo'" />
                            </div>
                            <div v-if="currentStore.phone">
                                <h3 class="inside_page_title">Phone</h3>
                                <a class="store_details_phone" :href="'tel:' + currentStore.phone">{{ currentStore.phone }}</a>    
                            </div>
                            <a v-if="currentStore.website" class="animated_btn" :href="'http://' + currentStore.website" target="_blank">Visit Website</a>
                        </div>
                        <div class="details_col_9">
                            <div id="map" class="margin_20">
                                <mapplic-map ref="svgmap_ref" :height="300" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="processedStores" :floorlist="floorList" :svgWidth="2500" :svgHeight="2500" @updateMap="updateSVGMap" :key="currentStore.id"></mapplic-map>
                            </div>
                            <div class="inside_page_header">Store Hours & Information</div>
                            <ul v-if="storeHours" class="store_details_hours_list">
                                <li v-for="hour in storeHours" :class="{ today: hour.todays_hours }">
                                    <div v-if="hour.is_closed">
                                        <span class="hours_list_day">{{ hour.day_of_week | moment("dddd", timezone) }} </span>CLOSED
                                    </div>
                                    <div v-else-if="hour.open_full_day">
                                        <span class="hours_list_day">{{hour.day_of_week | moment("dddd", timezone)}} </span>Open 24 Hours
                                    </div>
                                    <div v-else>
                                        <span class="hours_list_day">{{hour.day_of_week | moment("dddd", timezone)}} </span>{{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}
                                    </div>
                                </li>
                            </ul>
                            <div class=" margin_30 store_details_desc" v-html="currentStore.rich_description"></div>
                            <div v-if="currentStore.promotions">
                                <b-card no-body class="mb-1 inside_page_toggle">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-btn block @click="togglePromos = !togglePromos" :aria-expanded="togglePromos ? 'true' : 'false'" aria-controls="togglePromotions">
                                            Promotions
                                            <i v-if="togglePromos"  class="fa fa-minus f"></i>
                                            <i v-else  class="fa fa-plus"></i>
                                        </b-btn>
                                    </b-card-header>
                                    <b-collapse v-for="promo in storePromotions" v-model="togglePromos" role="tabpanel" id="togglePromotions" class="accordion_body">
                                        <b-card-body>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h3 class="promo_name">{{promo.name}}</h3>
                                                    <p class="promo_date" v-if="isMultiDay(promo)">
                        							    {{ promo.start_date | moment("MMMM D", timezone)}} to {{ promo.end_date | moment("MMMM D", timezone)}}
                                                    </p>
                                                    <p class="promo_date" v-else>{{ promo.start_date | moment("MMMM D", timezone)}}</p>
                                                    <div class="promo_desc" v-html="promo.description_short"></div>
                                                    <router-link :to="'/promotions/'+ promo.slug" >
							                            <i class="fa fa-caret-right"></i> <span class="read_more">View Promotion Details</span>
					                                </router-link>
                                                </div>
                                            </div>
                                            <hr class="promo_separator" />
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                            <div v-if="currentStore.jobs">
                                <b-card no-body class="mb-1 inside_page_toggle">
                                    <b-card-header header-tag="header" class="p-1" role="tab">
                                        <b-btn block @click="toggleJobs = !toggleJobs" :aria-expanded="toggleJobs ? 'true' : 'false'" aria-controls="toggleJobs">
                                            Jobs
                                            <i v-if="toggleJobs"  class="fa fa-minus f"></i>
                                            <i v-else  class="fa fa-plus"></i>
                                        </b-btn>
                                    </b-card-header>
                                    <b-collapse v-for="job in storeJobs" v-model="toggleJobs" role="tabpanel" id="toggleJobs" class="accordion_body">
                                        <b-card-body>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <h3 class="promo_name">{{job.name}}</h3>
                                                    <p class="promo_date" v-if="isMultiDay(job)">
                        							    {{ job.start_date | moment("MMMM D", timezone)}} to {{ job.end_date | moment("MMMM D", timezone)}}
                                                    </p>
                                                    <p class="promo_date" v-else>{{ job.start_date | moment("MMMM D", timezone)}}</p>
                                                    <router-link :to="'/jobs/'+ job.slug" >
							                            <i class="fa fa-caret-right"></i> <span class="read_more">View Job Details</span>
					                                </router-link>
                                                </div>
                                            </div>
                                            <hr class="promo_separator" />
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
    .mapplic-popup-link {
        display: none;
    }
</style>

<script>
    define(['Vue', 'vuex', 'moment', "moment-timezone", "vue!mapplic-map", "vue!inside_banner.vue"], function(Vue, Vuex, moment, tz, MapplicComponent, insideBanner) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    dataLoaded: false,
                    pageName: null,
                    currentStore: null,
                    storePromotions: null,
                    togglePromos: false,
                    storeJobs: null,
                    toggleJobs: false,
                    storeHours: [],
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(to.params.id);
                });
                next();
            },
            created (){
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(this.id);
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'processedPromos',
                    'processedJobs',
                    'findStoreBySlug',
                    'findHourById',
                    'findPromoById',
                    'findJobById',
                    'findRepoByName'
                ]),
                getSVGurl() {
                    return "https://www.mallmaverick.com" + this.property.svg_map_url;
                },
                svgMapRef() {
                    return this.$refs.svgmap_ref;
                },
                allStores() {
                    this.processedStores.map(function(store){
                        store.zoom = 4;
                    })
                    return this.processedStores;
                },
                floorList () {
                    var floor_list = [];
                    // Get SVG Maps from Repo
                    var floor_maps_repo = this.findRepoByName('SVG Maps');
                    
                    if(floor_maps_repo !== null && floor_maps_repo !== undefined && floor_maps_repo.images.length > 0){
                        floor_maps = floor_maps_repo.images;
                        if (this.currentStore.z_coordinate == 1) {
                            var floor_1 = {};
                            floor_1.id = "first-floor";
                            floor_1.title = "Level 1";
                            floor_1.map = _.find(floor_maps, function(o){ return _.toNumber(o.id) == _.toNumber(41084);}).image_url;
                            floor_1.z_index = 1;
                            floor_1.show = true;
                            
                            floor_list.push(floor_1);
                        } else if (this.currentStore.z_coordinate == 2) {
                            var floor_2 = {};
                            floor_2.id = "second-floor";
                            floor_2.title = "Level 2";
                            floor_2.map = _.find(floor_maps, function(o){ return _.toNumber(o.id) == _.toNumber(41085);}).image_url;
                            floor_2.z_index = 2;
                            floor_2.show = true;
                            
                            floor_list.push(floor_2);
                        }
                    }
                    
                    return floor_list;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData","promotions"), this.$store.dispatch("getData", "jobs"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentStore(id) {
                    this.currentStore = this.findStoreBySlug(id);
                    if (this.currentStore === null || this.currentStore === undefined) {
                        this.$router.replace({ path: '/'});
                    } else {
                        this.pageName = this.currentStore.name;
                        
                        this.currentStore.zoom = 2;
                        // if ( _.includes(this.currentStore.store_front_url_abs, 'missing')) {
                        //     this.currentStore.store_front_url_abs = this.property.default_logo_url;
                        // }
                        if (_.includes(this.currentStore.store_front_url_abs, 'missing')) {
                            this.currentStore.no_logo = true
                        } else {
                            this.currentStore.no_logo = false
                        }
                        
                        var vm = this;
                        if (this.currentStore.store_hours) {
                            var hours = this.currentStore.store_hours;
                            var store_hours = [];
                            _.forEach(hours, function (value, key) {
                                console.log("value", vm.findHourById(value))
                                store_hours.push(vm.findHourById(value));
                            });
                            this.storeHours = store_hours;
                        }
                        
                        var vm = this;
                        var temp_promo = [];
                        _.forEach(this.currentStore.promotions, function(value, key) {
                            var current_promo = vm.findPromoById(value);
                            
                            if (_.includes(current_promo.image_url, 'missing')) {
                                current_promo.image_url = "http://placehold.it/1560x800/757575";
                            }
                            current_promo.description_short = _.truncate(current_promo.description, { 'length': 150, 'separator': ' ' });
    
                            temp_promo.push(current_promo);
                        }); 
                        this.storePromotions = temp_promo;
                        this.togglePromos = true;
                        
                        var vm = this;
                        var temp_job = [];
                        _.forEach(this.currentStore.jobs, function(value, key) {
                            var current_job = vm.findJobById(value);
                            temp_job.push(current_job);
                        }); 
                        this.storeJobs = temp_job;
                        this.toggleJobs = true;
                    }
                },
                updateSVGMap(map) {
                    this.map = map;
                    this.svgMapRef.showLocation(this.currentStore.svgmap_region);
                    this.svgMapRef.addActiveClass(this.currentStore.svgmap_region);
                },
                dropPin(store) {
                    this.svgMapRef.showLocation(store.svgmap_region);
                },
                isMultiDay(promo) {
                    var timezone = this.timezone
                    var start_date = moment(promo.start_date).tz(timezone).format("MM-DD-YYYY")
                    var end_date = moment(promo.end_date).tz(timezone).format("MM-DD-YYYY")
                    if (start_date === end_date) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        });
    });
</script>
