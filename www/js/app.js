// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js


angular.module('app', ['ionic', 'app.controllers', 'app.services', 'firebase', 'pascalprecht.translate', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform, $window, $ionicPopup, $state) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        if ((!window.localStorage["NG_TRANSLATE_LANG_KEY"]) || (window.localStorage["NG_TRANSLATE_LANG_KEY"]==undefined)){ // first time only
            if (!navigator.globalization) {
                window.localStorage["NG_TRANSLATE_LANG_KEY"] = "en";
            } else {
                navigator.globalization.getPreferredLanguage(
                    function (language) {
                        if ((language.value != "en") && (language.value != "gr")){
                            window.localStorage["myLang991"] = "en";
                        }
                        else if ((language.value == "en") || (language.value == "gr")) {
                            window.localStorage["myLang991"] = language.value;
                        }

                    }, function (error) {
                        console.log("Couldn't get the language: -> " + error);
                    }
                );
            }
        }

        $ionicPlatform.registerBackButtonAction(function (event) {
            if($state.current.name=="trip.search"){
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }, 100);
    });
    document.addEventListener("deviceready", function () {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1) + "@"
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes()+ ":"
                        + currentdate.getSeconds();

        if(!$window.localStorage['init']) {
            $window.localStorage['init'] = true;

            var info_cordova = device.cordova;
            var info_model = device.model;
            var info_platform = device.platform;
            var info_uuid = device.uuid;
            var info_version = device.version;

            $window.localStorage['uuid'] = info_uuid;

            console.log(info_cordova, info_model, info_platform, info_uuid, info_version);


            var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+info_uuid);

            statRef.push();

            statRef.update({
                device_info: {
                    uuid : info_uuid,
                    cordova : info_cordova,
                    model : info_model,
                    platform : info_platform,
                    version : info_version
                },
                inapp_behavior : {
                    open_app : {
                        first_time : {
                            date : datetime
                        }
                    }
                }
            });
        } else {
            var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/open_app");

            var dateRef = statRef.push();
            dateRef.update({
                date : datetime
            });
        }
    }, false);
})

.factory('customStorage', function () {
    return {
        put: function (name, value) {
            console.log("put", name, value);
            window.localStorage[name] = value;
        },
        get: function (name) {
            console.log("get", name, window.localStorage[name]);
            return window.localStorage[name];
        }
    };
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive


    .state('trip', {
        url: "/trip",
        abstract: true,
        templateUrl: "templates/trip.html"
    })
    .state('trip.search', {
        url: '/search',
        views: {
            'trip-tab': {
                templateUrl: 'templates/search.html',
                controller: 'SearchPageCtrl'
            }
        }
    })
    .state('trip.results', {
        url: "/results",
        views: {
            'trip-tab': {
                templateUrl: "templates/trip-results.html",
                controller: 'TripResultsCtrl'
            }
        }
    })
    .state('trip.details', {
        url: "/details/:boatId",
        views: {
            'trip-tab': {
                templateUrl: "templates/trip-details.html",
                controller: 'TripDetailsCtrl'
            }
        }
    })

    .state('mytrip', {
        url: "/mytrip",
        abstract: true,
        templateUrl: "templates/mytrip.html"
    })
    .state('mytrip.trips', {
        url: "/mytripresults",
        cache: false,
        views: {
            'my-trip-tab': {
                templateUrl: "templates/mytrips.html",
                controller: 'MyTripsPageCtrl'
            }
        }
    })
    .state('mytrip.details', {
        url: "/mytripdetails",
        cache: false,
        views: {
            'my-trip-tab': {
                templateUrl: "templates/myTripDetails.html",
                controller: 'MyTripDetailsCtrl'
            }
        }
    })
    /*
    .state('mytrips', {
    url: "/mytrips",
    templateUrl: "templates/mytrips.html",
    controller: "MyTripsPageCtrl"
    })*/

    // .state('about', {
    //     url: "/about",
    //     cache: false,
    //     templateUrl: "templates/about.html",
    //     controller: "AboutPageCtrl"
    // })

    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/trip/search');

    $translateProvider.translations('en', {
            home: "Home",
            kos: "Kos",
            kalimnos: "Kalimnos",
            pserimos: "Pserimos",
            nisiros: "Nisiros",
            back: "Back",
            language: "Language"
        });
    $translateProvider.translations('gr', {
            home: "Αρχική",
            kos: "Κως",
            kalimnos: "Κάλυμνος",
            pserimos: "Ψέριμος",
            nisiros: "Νίσυρος",
            back: "Πίσω",
            language: "Γλώσσα"
        });
    $translateProvider.preferredLanguage("en");
    $translateProvider.useStorage("customStorage");
    $translateProvider.fallbackLanguage("en");

});
