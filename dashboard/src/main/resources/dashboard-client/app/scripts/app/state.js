/* States */
dashboardappApp
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                .when('/home', '/')
                .otherwise('/login');

            // State Configurations
            $stateProvider

                // Login Page
                .state("login", {
                    page_title: 'Yoruba Names - Admin - Login',
                    url: "/login",
                    templateUrl: 'tmpls/login.html',
                    controller: 'loginCtrl',
                    data:{
                      requiresLogout:true
                    }
                })
                // Errors
                .state("error", {
                    url: "/error",
                    abstract: true,
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                // Errors > 404
                .state("error.404", {
                    page_title: 'Yoruba Names - Admin - Error 404',
                    url: "/404",
                    templateUrl: 'tmpls/error.404.html'
                })
                // Authenticated
                .state("auth", {
                    abstract: true,
                    // this state url
                    url: "",
                    templateUrl: 'tmpls/authenticated.html',
                    data:{
                      requiresLogin:true,
                      requiresAdminPriviledge:true
                    }
                })
                // Dashboard
                .state("auth.home", {
                    // this state page title
                    page_title: 'Yoruba Names - Admin - Dashboard',
                    // this state url
                    url: "/",
                    templateUrl: 'tmpls/dashboard.html',
                    data: {
                        ncyBreadcrumbLabel: 'Home'
                    },
                    // load state specific js/css
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    // c3 charts
                                    'bower_components/d3/d3.min.js',
                                    'bower_components/c3/c3.min.js',
                                    // countUp animation
                                    'scripts/libs/countUp.min.js'
                                ]);
                            }
                        ]
                    },
                    controller: 'dashboardCtrl'
                })
                // Names (parent state)
                .state('auth.names', {
                    // With abstract set to true, that means this state can not be explicitly activated.
                    abstract: true,
                    url: '/names',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                // Names > New Entries
                .state('auth.names.add_entries', {
                    page_title: 'Yoruba Names - Admin - Add Name Entries',
                    data: {
                        ncyBreadcrumbLabel: 'Add Name Entries'
                    },
                    url: '/new',
                    templateUrl: 'tmpls/names/new.html',
                    
                    resolve: {
                        files: [
                           'uiLoad',
                           function(uiLoad){
                              return uiLoad.load([
                                 // select2
                                 'bower_components/select2/dist/css/select2.min.css',
                                 'bower_components/select2/dist/js/select2.min.js',
                                 // selectize.js
                                 'bower_components/selectize/dist/css/selectize.css',
                                 'bower_components/selectize/dist/js/standalone/selectize.min.js'
                              ])
                           }
                        ]    
                    },
                    controller:'namesAddEntriesCtrl'
                })

                // edit Name Entry
                .state('auth.names.edit_entries', {
                    page_title: 'Yoruba Names - Admin - Edit Entry',
                    data: {
                        ncyBreadcrumbLabel: 'Edit Entry'
                    },
                    url: '/edit/:entry',
                    templateUrl: 'tmpls/names/edit.html',
                    
                    resolve: {
                        files: [
                           'uiLoad',
                           function(uiLoad){
                              return uiLoad.load([
                                 // select2
                                 'bower_components/select2/dist/css/select2.min.css',
                                 'bower_components/select2/dist/js/select2.min.js',
                                 // selectize.js
                                 'bower_components/selectize/dist/css/selectize.css',
                                 'bower_components/selectize/dist/js/standalone/selectize.min.js'
                              ])
                           }
                        ]    
                    },
                    controller:'namesEditEntryCtrl'
                })


                // Names > Published Names
                .state('auth.names.list_entries', {
                    page_title: 'Yoruba Names - Admin - Names',
                    data: {
                        ncyBreadcrumbLabel: 'Names Entries'
                    },
                    url: '/lists/:status',
                    templateUrl: 'tmpls/names/lists.html',
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'bower_components/footable/css/footable.core.min.css',
                                    'bower_components/footable/dist/footable.min.js',
                                    'bower_components/footable/dist/footable.paginate.min.js',
                                    'bower_components/footable/dist/footable.filter.min.js'
                                ]);
                            }
                        ]
                    },
                    controller: 'namesListEntriesCtrl'
                })
                
                // Names > Name Search
                .state('auth.names.search', {
                    page_title: 'Yoruba Names - Admin - Name Search',
                    data: {
                        ncyBreadcrumbLabel: 'Search'
                    },
                    url: '/search',
                    templateUrl: 'tmpls/names/search.html',
                    controller: 'namesSearchCtrl'
                })
                
                // Pages (parent state)
                .state('auth.profile', {
                    abstract: true,
                    url: '/profile',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })
                
                // Pages > Contact List
                .state('auth.profile.index', {
                    page_title: 'Yourba Names Admin - User Profile',
                    data: {
                        ncyBreadcrumbLabel: 'User Profile'
                    },
                    url: '/',
                    templateUrl: 'tmpls/profile/index.html',
                    controller: 'profileIndexCtrl'
                })

                // Pages > Faq/Help
                .state('auth.profile.edit', {
                    page_title: 'Yoruba Names Admin - Update User Profile',
                    data: {
                        ncyBreadcrumbLabel: 'Update Profile'
                    },
                    abstract: true,
                    url: '/edit',
                    templateUrl: 'tmpls/profile/edit.html',
                    controller: 'profileEditCtrl'
                })

                // Pages (parent state)
                .state('auth.users', {
                    abstract: true,
                    url: '/users',
                    template: '<div ui-view autoscroll="false" class="mainView-animate"></div>'
                })

                // Pages > Faq/Help > Categories
                .state('auth.users.add_user', {
                    page_title: 'Yoruba Names Admin - Admin Users (All)',
                    data: {
                        ncyBreadcrumbLabel: 'Add New User'
                    },
                    url: '/new',
                    templateUrl: 'tmpls/users/new.html',
                    controller: 'userAddCtrl'
                })

                .state('auth.users.list_users', {
                    page_title: 'Yoruba Names Admin - Volunteers',
                    data: {
                        ncyBreadcrumbLabel: 'All Users'
                    },
                    url: '/lists/:role',
                    templateUrl: 'tmpls/users/lists.html',
                    resolve: {
                        files: [
                            'uiLoad',
                            function (uiLoad) {
                                return uiLoad.load([
                                    'bower_components/footable/css/footable.core.min.css',
                                    'bower_components/footable/dist/footable.min.js',
                                    'bower_components/footable/dist/footable.paginate.min.js',
                                    'bower_components/footable/dist/footable.filter.min.js'
                                ]);
                            }
                        ]
                    },
                    controller: 'userListCtrl'
                })

        }
    ]);