app.factory('User', function($rootScope) {
    function User() {}

    User.oauth = function(provider) {
      return $rootScope.afAuth.$authWithOAuthPopup('github');
    };
    User.login = function(user) {
      return $rootScope.afAuth.$authWithPassword(user);
    };
    User.logout = function() {
      return $rootScope.afAuth.$unauth();
    };

    return User;
  })
  .factory('Gweet', function($rootScope, $firebaseArray) {
    function Gweet() {}
    Gweet.addGweet = function(obj) {
      $rootScope.fbGweets = $rootScope.fbRef.child('gweets/');
      var gweets = Gweet.getGweets();
      gweets.$add({
        username: obj.username,
        gweet: obj.gweet,
        id: $rootScope.uid,
        dateCreated: Firebase.ServerValue.TIMESTAMP
      });
      return false;
    };

    Gweet.getGweets = function() {
      return $firebaseArray($rootScope.fbGweets);
    };

    Gweet.isFollowing = function() {

    };

    Gweet.follow = function(user, userId) {
      user.following = user.following || [];
      user.following.push(userId);
    };

    Gweet.maxLength = 140;

    return Gweet;

  });



// $rootScope.fbGweets = $rootScope.fbRef.child('gweets/' + $rootScope.uid);

// $scope.gweets.$add({
//   username: currentUser,
//   gweet: $scope.gweetObj.gweet,
//   id: $rootScope.uid
// });
