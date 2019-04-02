define([], function () {
    return [
        {
            path: '/',
            name:'home',
            component: view('home')
        },
        {
            path: '/contact-us',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('contact'),
                    meta: {
                        pageName: 'Contact Us',
                    },
                    name: 'contact'
                }
            ]
        },
        {
            path: '/events',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('events'),
                    meta: {
                        pageName: 'Events',
                    },
                    name: 'events'
                },
                {
                    path: ':id',
                    component: view('event_details'),
                    meta: {
                        pageName: 'Events',
                    },
                    name: 'eventDetails',
                    props: true
                }
            ]
        },
        {
            path: '/jobs',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('jobs'),
                    meta: {
                        pageName: 'Careers',
                    },
                    name: 'jobs'
                },
                {
                    path: ':id',
                    component: view('job_details'),
                    meta: {
                        pageName: 'Careers',
                    },
                    name: 'jobDetails',
                    props: true
                }
            ]
        },
        {
            path: '/newsletter',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('newsletter'),
                    meta: {
                        pageName: 'Newsletter',
                    },
                    name: 'newsletter'
                }
            ]
        },
        {
            path: '/pages',
            component: view('default'),
            children: [
                {
                    path: ':id',
                    component: view('page_details'),
                    name: 'pageDetails',
                    props: true
                }
            ]
        },
        {
            path: '/posts',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('posts'),
                    name: 'postList'
                },
                {
                    path: ':id',
                    component: view('post_details'),
                    name: 'postDetails',
                    props: true
                }
            ]
        },
        {
            path: '/promotions',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('promotions'),
                    meta: {
                        pageName: 'Promotions',
                    },
                    name: 'promotions='
                },
                {
                    path: ':id',
                    component: view('promotion_details'),
                    meta: {
                        pageName: 'Promotions',
                    },
                    name: 'promotionDetails',
                    props: true
                }
            ]
        },
        // {
        //     path: '/promotions',
        //     component: view('default'),
        //     children: [
        //         {
        //             path: ':id',
        //             component: view('promotion_details'),
        //             meta: {
        //                 pageName: 'Promotions',
        //             },
        //             name: 'promotionDetails',
        //             props: true
        //         }
        //     ]
        // },
        {
            path: '/stores',
            component: view('default'),
            children: [
                {   
                    path: '',
                    component: view('stores'),
                    meta: {
                        pageName: 'Store Directory',
                    },
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    meta: {
                        pageName: 'Store Details',
                    },
                    name: 'storeDetails',
                    props: true
                }
            ]
        },
        {
            path: '/search-results',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('search_results'),
                    meta: {
                        pageName: 'Search Results',
                    },
                    name: 'search-results'
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]

    /*
    * Asynchronously load view (lazy-loading)
    * @param {string} name the filename (basename) of the view to load.
    */
    function view(name) {
        return function(resolve) { require(['vue!' + name + '.vue'], resolve); }
    };
});
