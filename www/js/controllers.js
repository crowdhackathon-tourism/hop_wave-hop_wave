angular.module('app.controllers', ['firebase'])

.controller('SideMenuCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('SearchPageCtrl', function($window, $scope, $location, $ionicSlideBoxDelegate, $ionicPopup, $translate){
    $scope.next = function() {
        $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
        $ionicSlideBoxDelegate.previous();
    };
    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
    };
    $scope.slideTo = function(index) {
        $ionicSlideBoxDelegate.slide(index);
    };

    $scope.showDatePicker = function($event) {
        //$scope.datePicked = true; //TEMPORARY for the browser

        var options = {
            date: new Date(),
            minDate: new Date(),
            maxDate: new Date("2015-09-30"),
            mode: 'date'
        };
        datePicker.show(options, function(date){
            if(date != 'Invalid Date') {
                var dateString = date.toString();
                $window.localStorage["datePicked"] = dateString.substr(4,3) + dateString.substr(8,2);
                $scope.datePicked = true;
            } else {
                console.log(date);
            }
        });
        // $event.stopPropagation();
    };


    $scope.goToResults = function() {
        function stat_fetch_results(status){
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1) + "@"
            + currentdate.getHours() + ":"
            + currentdate.getMinutes()+ ":"
            + currentdate.getSeconds();

            var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/go_to_results/"+status);

            var dateRef = statRef.push();
            dateRef.update({
                date : datetime
            });
        };

        if (!$scope.datePicked) {
            stat_fetch_results('fail_cal');

            if ($translate.use() ==='en'){
                $scope.datePopup = ["Undefined Date", 'Choose the date you want to travel'];
            }
            else if ($translate.use() ==='gr'){
                $scope.datePopup = ["", 'Επίλεξε πρώτα την ημερομηνία που θες να ταξιδέψεις.'];
            }

            var alertPopup = $ionicPopup.alert({
                title: $scope.datePopup[0],
                template: $scope.datePopup[1]
            });
        }
        else if ($scope.datePicked) {
            if ($window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    stat_fetch_results('fail_net');

                    if ($translate.use() ==='en'){
                        $scope.internetPopup = ["No internet connection", 'Make sure you are connected to the internet so as to see the available trips.'];
                    }
                    else if ($translate.use() ==='gr'){
                        $scope.internetPopup = ["Δεν υπάρχει σύνδεση στο internet", 'Για να μπορέσεις να δεις τα διαθέσιμα δρομολόγια πρέπει να υπάρχει σύνδεση στο ίντερνετ.'];
                    }

                    $ionicPopup.alert({
                        title: $scope.internetPopup[0],
                        template: $scope.internetPopup[1]
                    })
                    .then(function(result) {
                        $location.path('/trip/search');
                    });
                }
                else {
                    stat_fetch_results('success');
                    $location.path('/trip/results');
                }
            }
            else {
                stat_fetch_results('success');
                $location.path('/trip/results');
            }
        }
    };
})


.controller('TripAwayResultsCtrl', function($window, $scope, $location, CheckConnectivity, $ionicLoading, $translate, $ionicPlatform) {
    cur_day = $window.localStorage["datePicked"];
    
    console.log("test away");


    // var ref = new Firebase("https://hopwave-boat.firebaseio.com/");

    // ref.orderByChild("boat_time_departure").once('value', function(snapshot) {
    //     angular.element(document.querySelector('#TripResultsSpinner')).addClass("myHide");
    //     $scope.trips = snapshot.val();
    //     $scope.$apply();
    // });





    // $scope.doRefresh = function() {
    //     setTimeout(function(){
    //         $scope.$broadcast('scroll.refreshComplete');
    //     },
    //     3000);

    //     $scope.$apply();
    // };

    // $scope.goTo = function(path, trip) {
    //     var currentdate = new Date();
    //     var datetime = currentdate.getDate() + "/"
    //     + (currentdate.getMonth()+1) + "@"
    //     + currentdate.getHours() + ":"
    //     + currentdate.getMinutes()+ ":"
    //     + currentdate.getSeconds();

    //     var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/go_to_trip_away");

    //     var goRef = statRef.push();

    //     goRef.update({
    //         trip_id : trip.boat_name,
    //         date : datetime
    //     });

    //     $window.localStorage["LastClickedTrip"] = JSON.stringify(trip);
    //     $location.path(path);
    // };

    // $scope.getLanguage = function() {
    //     return ($translate.use() === 'en') ? true : false;
    // };

    // $ionicPlatform.onHardwareBackButton(function () {
    //     $location.path('/trip/search');
    // });
})

.controller('TripResultsCtrl', function($window, $scope, $location, CheckConnectivity, $ionicLoading, $translate, $ionicPlatform) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    cur_day = $window.localStorage["datePicked"];
    var ref = new Firebase("https://hopwave-boat.firebaseio.com/");

    ref.orderByChild("boat_time_departure").on('value', function(snapshot) {
        angular.element(document.querySelector('#TripResultsSpinner')).addClass("myHide");
        $scope.trips = snapshot.val();
        $scope.$apply();
    });

    $scope.doRefresh = function() {
        setTimeout(function(){
            $scope.$broadcast('scroll.refreshComplete');
            },
        3000);

        $scope.$apply();
    };

    $scope.goTo = function(path, trip) {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1) + "@"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()+ ":"
        + currentdate.getSeconds();

        var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/go_to_trip");

        var goRef = statRef.push();

        goRef.update({
            trip_id : trip.boat_name,
            date : datetime
        });

        $window.localStorage["LastClickedTrip"] = JSON.stringify(trip);
        $location.path(path);
    };

    $scope.getLanguage = function() {
        return ($translate.use() === 'en') ? true : false;
    };

    $ionicPlatform.onHardwareBackButton(function () {
        $location.path('/trip/search');
    });

    $scope.fixDate = function(trip) {
        var dateTMP = cur_day;  //Fix Date
        if ($translate.use() ==='en'){
            if (dateTMP.substr(0,3) == "Aug")
                date = "August "
            else if (dateTMP.substr(0,3) == "Sep")
                date = "September "
            else if (dateTMP.substr(0,3) == "Oct")
                date = "October "
            date += dateTMP.substr(3,2);
        }
        else if ($translate.use() ==='gr'){
            date = dateTMP.substr(3,2);
        }

        return date;
    };
})

.controller('TripDetailsCtrl', function($window, $scope, $stateParams, $location, $translate, $ionicPopup, $ionicLoading, $ionicPlatform, $http){
    $scope.trip = JSON.parse($window.localStorage["LastClickedTrip"]);

    if ($translate.use() ==='en'){
        $scope.internetPopup = ["No internet connection", 'Make sure you are connected to the internet so as to see the map and the boat images.'];
        $scope.contactPopup = ['Contact boat for details', 'You can also call via the WhatsApp application.'];
        $scope.confirmPopup = ["Confirm your reservation", "You can find your reservation code(s) in 'My Trips' at the options menu. Don't forget to confirm your reservation! If you don't confirm now, you can do it later through the 'My Trips' tab and you will have to connected to the internet."];
        $scope.confirmButtons = ["Now", "Later"];
        $scope.emailText = ["Reservation Confirmed", "<b> You have just booked your wave! </b><br> You can see your reservation codes in the 'My Trips' tab in the sidemenu. Show the provided codes the boat owners.<small>(You can view your trips even when offline)</small> <br><br>Hopwave Team"];
        $scope.internetPopup2 = ["No internet connection", 'Make sure you are connected to the internet so as to confirm your reservation.'];
    }
    else if ($translate.use() ==='gr'){
        $scope.internetPopup = ["Δεν υπάρχει σύνδεση στο internet", 'Για να μπορέσεις να δεις το χάρτη και τις σχετικές φωτογραφίες πρέπει να υπάρχει σύνδεση στο ίντερνετ.'];
        $scope.contactPopup = ["Επικοινώνησε με το καραβάκι για λεπτομέρειες", 'Μπορείς να καλέσεις και μέσω WhatsApp.'];
        $scope.confirmPopup = ['Επιβεβαίωσε την κράτησή σου!', 'Οι κωδικοί της κράτησης σου είναι αποθηκευμένοι στην καρτέλα "Τα Ταξίδια μου" στο πλαϊνό μενού. Μην ξεχάσεις να επιβεβαιώσεις την κράτησή σου! Αν επιλέξεις να κάνεις την επιβεβαίωση αργότερα, μπορείς να το κάνεις μέσω της καρτέλας "Τα Ταξίδια μου" αλλά θα πρέπει να είσαι συνδεδεμένος στο ίντερνετ.']
        $scope.confirmButtons = ["Τώρα", "Αργότερα"];
        $scope.emailText = ["Η κράτησή σας επιβεβαιώθηκε", "<b> Καλό σας ταξίδι! </b><br> Μπορείτε να δείτε τους κωδικούς της κράτησής σας στην καρτέλα 'Τα ταξίδια μου' στο αριστερό μενού της εφαρμογής. Μην ξεχάσετε να δείξετε τους κωδικούς στους ιδιοκτήτες του καραβιού.<small>(Μπορείτε να δείτε τα ταξίδια σας και χωρίς σύνδεση στο ίντερνετ)</small>  <br><br>Η ομάδα του hopwave"];
        $scope.internetPopup2 = ["Δεν υπάρχει σύνδεση στο internet", 'Για να μπορέσεις να επιβεβαίωσεις την κράτησή σου πρέπει να υπάρχει σύνδεση στο ίντερνετ.'];
    }

    var imageRef = new Firebase("https://hopwave-boa.firebaseio.com/"+$scope.trip.boat_name+"/boat_images");
    if ($window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.alert({
                title: $scope.internetPopup[0],
                template: $scope.internetPopup[1]
            })
            .then(function(result) {
            });
        }
        else {
            imageRef.once('value', function(snapshot) {
                angular.element(document.querySelector('#imageSpinner')).addClass("hide");
                $scope.boat_images = snapshot.val();
                if (!$scope.boat_images) {
                    angular.element(document.querySelector('#noImagesID')).removeClass("hide");
                }
                $scope.$apply();
            });
        }
    }


    var dateTMP = $window.localStorage["datePicked"];
    if ($translate.use() ==='en'){
        $scope.ticketLang = ["Tickets: ", 'Enter your email and how many tickets you want', ' '];
        if (dateTMP.substr(0,3) == "Aug")
            $scope.date = "August "
        else if (dateTMP.substr(0,3) == "Sep")
            $scope.date =  "September ";
        else if (dateTMP.substr(0,3) == "Oct")
            $scope.date =  "October ";
        $scope.date += dateTMP.substr(3,2);
    }
    else if ($translate.use() ==='gr'){
        $scope.ticketLang = ["Εισιτήρια: ", 'Γράψε το mail σου και επίλεξε πόσα εισιτήρια θες για τη διαδρομή', 'Όλες οι λεπτομέρειες του ταξιδιού καθώς και οι κωδικοί κράτησης θα αποθηκευτούν στην καρτέλα "Τα Ταξίδια μου".'];
        $scope.date = dateTMP.substr(3,2);
    }

    $scope.marker = {
        longitude: $scope.trip.boat_starting_point_latitude,
        latitude: $scope.trip.boat_starting_point_longitude
    };

    $scope.map = {
        center: {
            longitude: $scope.trip.boat_starting_point_latitude,
            latitude: $scope.trip.boat_starting_point_longitude
        },
        zoom: 14
    };

    $scope.getLanguage = function() {
        return ($translate.use() === 'en') ? true : false;
    };

    $scope.goBack = function() {
        $location.path('/trip/results');
    };

    $ionicPlatform.onHardwareBackButton(function () {
        $location.path('/trip/results');
    });


    $scope.data = {}
    $scope.enterEmail = function() {
        if ($scope.trip.boat_phone != '') {
            var myPopup = $ionicPopup.show({
                template: '<p>Phone number: ' + $scope.trip.boat_phone + '</p>',
                title: $scope.contactPopup[0],
                subTitle: $scope.contactPopup[1],
                scope: $scope,
                buttons: [
                    { text: 'OK' }
                ]
            }).then(function(email) {
                if (email) {
                    if (!email.value) {
                        email.value = "1";
                    }

                    $scope.book($scope.trip, '', 'phone');
                }
                else {
                    console.log('No mail entered');
                }
            });
        } else {
            var myPopup = $ionicPopup.show({
                template: '<input ng-model="data.email" type="email" placeholder="Email"><br><div><label>' + $scope.ticketLang[0] + '</label><select data-ng-model="data.value"><option disabled style="display:none" value="">1</option><option value="1">1</option><option selected value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>',
                title: $scope.ticketLang[1],
                subTitle: $scope.ticketLang[2],
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.email) {
                                e.preventDefault();
                            } else {
                                return $scope.data;
                            }
                        }
                    }
                ]
            }).then(function(email) {
                if (email) {
                    if (!email.value) {
                        email.value = "1";
                    }

                    //Confirm now or later
                    var myPopup = $ionicPopup.confirm({
                        title: $scope.confirmPopup[0],
                        subTitle: $scope.confirmPopup[1],
                        buttons: [
                            { text: $scope.confirmButtons[1],
                                onTap: function(e) {
                                    ($scope.trip).confirmed = false;
                                    ($scope.trip).email = email.email;
                                    $scope.book($scope.trip, email.email, email.value);
                                }
                            },
                            {
                                text: $scope.confirmButtons[0],
                                type: 'button-positive',
                                onTap: function(e) {
                                    ($scope.trip).confirmed = true;
                                    ($scope.trip).email = email.email;
                                    $scope.book($scope.trip, email.email, email.value);
                                }
                            }
                        ]
                    });
                }
                else {
                    console.log('No mail entered');
                }
            });
        }
    }

    $scope.book = function(trip, email, tickets) {
        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1) + "@"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes()+ ":"
        + currentdate.getSeconds();

        var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/booked_trip/");
        var datePicked_temp = $window.localStorage["datePicked"];

        //update new db - boat statistics
        var statRef2 = new Firebase("https://hopwave-bo.firebaseio.com/" + trip.boat_name);

        var bookedRef = statRef.push();
        var bookedRef2 = statRef2.push();

        bookedRef.update({
            trip_id : trip.boat_name,
            email : trip.email,
            tickets : tickets,
            date : datetime,
            confirmed : trip.confirmed
        });

        bookedRef2.update({
            email : trip.email,
            tickets : tickets,
            booking_timestamp : datetime,
            booking_date: datePicked_temp,
            confirmed : trip.confirmed
        });


        // generate codes
        var codes = [];

        var code_first_half = $scope.trip.boat_name;
        code_first_half = code_first_half.substr(0,3);

        var code_second_half = $window.localStorage["datePicked"];
        code_second_half = code_second_half[0] + code_second_half.substr(3, 2);

        for (i=0; i < tickets; i++) {
            var code_rand = Math.floor(Math.random()*900) + 100;
            codes.push(code_first_half+code_second_half+code_rand);
        }

        trip.booked_codes = codes;

        // push new trip to booked ones
        if ($window.localStorage["BookedTrips"]){
            trips = JSON.parse($window.localStorage["BookedTrips"]);
        } else {
            trips = [];
        };
        trips.push(trip);

        // update local storage
        $window.localStorage["BookedTrips"] = angular.toJson(trips);

        // if confirmed, send mail
        if (trip.confirmed) {
            var url = "https://sendgrid.com/api/mail.send.json?api_user=hopwave&api_key=hopwave123&from=random@randommail.com&to=";
            template = '{ "filters": { "templates": { "settings": { "enable": 1, "template_id": "2f3d12f1-1ba9-4b86-bb7f-5ab4da7716f2" } } } };'

            if ($window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: $scope.internetPopup2[0],
                        template: $scope.internetPopup2[1]
                    })
                    .then(function(result) {
                        
                    });
                }
                else {
                    $http({
                        method: 'POST',
                        url: url + email + "&subject=" + $scope.emailText[0] + "&x-smtpapi=" + template + "&html=" + $scope.emailText[1]
                    }).then(function(res){
                        console.log(res);
                    });
                }
            }
        }
    };
})

.controller('TripDetailsSlider', function($scope, $ionicSlideBoxDelegate){
    $scope.disableSwipe = function() {
        $ionicSlideBoxDelegate.enableSlide(false);
    };

    $scope.slideChanged = function(index) {
        $scope.slideIndex = index;
        console.log("slidechanged " + index);
    };
    $scope.slideTo = function(index) {
        $ionicSlideBoxDelegate.slide(index);
        console.log("slideto " + index);
    };
})

.controller('TripImagesSliderCtrl', function($scope, $stateParams, $ionicModal, $ionicLoading) {
    $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('image-pop.html');
    }

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'ease-in-out'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
    };
})

.controller('MyTripsPageCtrl', function($scope, $window, $translate, $location, $ionicPlatform) {
    $scope.getLanguage = function() {
        return ($translate.use() === 'en') ? true : false;
    }

    $scope.isLocalStorageEmpty = function() {
        return $window.localStorage["BookedTrips"] ;
    }

    $scope.isLocalStorageEmpty = function() {
        return $window.localStorage["BookedTrips"] ;
    }

    if ($scope.isLocalStorageEmpty()) {
        $scope.trips = JSON.parse($window.localStorage["BookedTrips"]);
    }

    $scope.fixDate = function(trip) {
        var dateTMP = $window.localStorage["datePicked"];
        if ($translate.use() ==='en'){
            date = (dateTMP.substr(0,3) == "Aug") ? "August " : "September ";
            date += dateTMP.substr(3,2);
        }
        else if ($translate.use() ==='gr'){
            date = dateTMP.substr(3,2);
        }

        return date;
    }

    $scope.goTo = function(path, index) {
        $window.localStorage["LastClickedMyTrip"] = index;
        $location.path(path);
    };

    $scope.doRefresh = function() {
        setTimeout(function(){
            if ($scope.isLocalStorageEmpty()) {
                $scope.trips = JSON.parse($window.localStorage["BookedTrips"]);
            }
            $scope.$broadcast('scroll.refreshComplete');
        }, 3000);

        $scope.$apply();
    };

    $ionicPlatform.onHardwareBackButton(function () {
        $location.path('/trip/search');
    })
})


.controller('MyTripDetailsCtrl', function($scope, $window, $translate, $ionicPlatform, $http) {
    var clickedIndex = JSON.parse($window.localStorage["LastClickedMyTrip"]);
    var allTrips = JSON.parse($window.localStorage["BookedTrips"]);
    $scope.trip = allTrips[clickedIndex];

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1) + "@"
    + currentdate.getHours() + ":"
    + currentdate.getMinutes()+ ":"
    + currentdate.getSeconds();

    var statRef = new Firebase("https://hopwave-st.firebaseio.com/"+$window.localStorage['uuid']+"/inapp_behavior/checked_trips");

    var checkedRef = statRef.push();

    checkedRef.update({
        trip_id : $scope.trip.boat_name,
        date : datetime
    });

    var dateTMP = $window.localStorage["datePicked"];
    if ($translate.use() ==='en'){
        $scope.date = (dateTMP.substr(0,3) == "Aug") ? "August " : "September ";
        $scope.date += dateTMP.substr(3,2);
        $scope.internetPopup = ["No internet connection", 'Make sure you are connected to the internet so as to confirm your reservation.'];
        $scope.emailText = ["Reservation Confirmed", "<b>Have a nice trip!</b> When you reach the boat remember to show your reservation code(s) from the 'My Trips' tab in the sidemenu to the ship owners.<br><br>Hopwave Team"];
    }
    else if ($translate.use() ==='gr'){
        $scope.date = dateTMP.substr(3,2);
        $scope.internetPopup = ["Δεν υπάρχει σύνδεση στο internet", 'Για να μπορέσεις να επιβεβαίωσεις την κράτησή σου πρέπει να υπάρχει σύνδεση στο ίντερνετ.'];
        $scope.emailText = ["Η κράτησή σας επιβεβαιώθηκε", "<b>Καλό σας ταξίδι!</b> Μην ξεχάσετε να δείξετε τους κωδικούς που θα βρείτε στο πλαϊνό μενού 'Τα ταξίδια μου' στους ιδιοκτήτες του καραβιού. <br><br>Η ομάδα του hopwave"];
    }

    $scope.marker = {
        longitude: $scope.trip.boat_starting_point_latitude,
        latitude: $scope.trip.boat_starting_point_longitude
    };

    $scope.map = {
        center: {
            longitude: $scope.trip.boat_starting_point_latitude,
            latitude: $scope.trip.boat_starting_point_longitude
        },
        zoom: 14
    };


    $scope.getLanguage = function() {
        return ($translate.use() === 'en') ? true : false;
    };

    $scope.sendEmail = function() {
        if ($window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.alert({
                    title: $scope.internetPopup[0],
                    template: $scope.internetPopup[1]
                })
                .then(function(result) {
                });
            }
            else {
                var url = "https://sendgrid.com/api/mail.send.json?api_user=hopwave&api_key=hopwave123&from=random@randommail.com&to=";
                template = '{ "filters": { "templates": { "settings": { "enable": 1, "template_id": "2f3d12f1-1ba9-4b86-bb7f-5ab4da7716f2" } } } };'

                $http({
                    method: 'POST',
                    url: url + $scope.trip.email + "&subject=" + $scope.emailText[0] + "&x-smtpapi=" + template + "&html=" + $scope.emailText[1]
                }).then(function(res){
                    console.log(res);
                });

                allTrips[clickedIndex].confirmed = true;
                $window.localStorage["BookedTrips"] = JSON.stringify(allTrips);
            }
        }
    }

    $ionicPlatform.onHardwareBackButton(function () {
        $location.path('/mytrip/mytripresults');
    });
})

.controller('MyTripImagesSliderCtrl', function($scope, $stateParams, $ionicModal, $window, $ionicPopup, $translate) {
    var clickedIndex = JSON.parse($window.localStorage["LastClickedMyTrip"]);
    var allTrips = JSON.parse($window.localStorage["BookedTrips"]);
    $scope.trip = allTrips[clickedIndex];

    var imageRef = new Firebase("https://hopwave-boa.firebaseio.com/"+$scope.trip.boat_name+"/boat_images");


    if ($translate.use() ==='en'){
        $scope.internetPopup = ["No internet connection", 'Make sure you are connected to the internet  see the map and the boat images.'];
    }
    else if ($translate.use() ==='gr'){
        $scope.internetPopup = ["Δεν υπάρχει σύνδεση στο internet", 'Για να μπορέσεις να δεις το χάρτη και τις σχετικές φωτογραφίες πρέπει να υπάρχει σύνδεση στο ίντερνετ.'];
    }

    var imageRef = new Firebase("https://hopwave-boa.firebaseio.com/"+$scope.trip.boat_name+"/boat_images");
    if ($window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.alert({
                title: $scope.internetPopup[0],
                template: $scope.internetPopup[1]
            })
            .then(function(result) {
            });
        }
        else {
            imageRef.once('value', function(snapshot) {
                angular.element(document.querySelector('#myImageSpinner')).addClass("hide");
                $scope.boat_images = snapshot.val();
                if (!$scope.boat_images) {
                    angular.element(document.querySelector('#noImagesID')).removeClass("hide");
                }
                $scope.$apply();
            });
        }
    }

    $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('image-pop.html');
    }

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'ease-in-out'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
    };
})

;
