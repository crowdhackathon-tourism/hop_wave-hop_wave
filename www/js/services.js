angular.module('app.services', ['firebase'])

//.factory('Boats', ['$firebaseArray', function($firebaseArray) {
  // Might use a resource here that returns a JSON array

  //var boatsRef = new Firebase("https://hopwave-routes.firebaseio.com/boats");

//  return $firebaseArray(boatsRef);

  // Some fake testing data
  // var boats = [{
  //   id: 0,
  //   name: 'Ben Sparrow',
  //   lastText: 'You on your way?',
  //   face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  // }, {
  //   id: 1,
  //   name: 'Max Lynx',
  //   lastText: 'Hey, it\'s me',
  //   face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  // }, {
  //   id: 2,
  //   name: 'Adam Bradleyson',
  //   lastText: 'I should buy a boat',
  //   face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  // }, {
  //   id: 3,
  //   name: 'Perry Governor',
  //   lastText: 'Look at my mukluks!',
  //   face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  // }, {
  //   id: 4,
  //   name: 'Mike Harrington',
  //   lastText: 'This is wicked good ice cream.',
  //   face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  // }];
  //
  // return {
  //   all: function() {
  //     return boats;
  //   },
  //   remove: function(boat) {
  //     boats.splice(boats.indexOf(boat), 1);
  //   },
  //   get: function(boatId) {
  //     for (var i = 0; i < boats.length; i++) {
  //       if (boats[i].id === parseInt(boatId)) {
  //         return boats[i];
  //       }
  //     }
  //     return null;
  //   }
  // };
//}])

.factory('CheckConnectivity', ['$firebaseArray', function($firebaseArray) {
    var connectedRef = new Firebase("https://hopwave-routes.firebaseio.com/.info/connected");

    return connectedRef;
}])
;
