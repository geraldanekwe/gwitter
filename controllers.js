app.controller('LoginCtrl', function($scope, User, $rootScope, $firebaseObject, $location) {

    $scope.afAuth.$onAuth(function(data) {
      if (data) {
        $rootScope.activeUser = data;
        $rootScope.uid = data.uid;
        $rootScope.fbUser = $rootScope.fbRef.child('users/' + data.uid);
        $rootScope.fbUser.set({
          email: data.github.email,
          username: data.github.username
        });
        $rootScope.currentUser = $firebaseObject($rootScope.fbUser);
        $rootScope.currentUser.$bindTo($rootScope, "loggedUser");
        $location.path('/home')
      } else {
        $rootScope.activeUser = null;
        $rootScope.fbUser = null;
        $rootScope.afUser = null;
      }
    });
    //oauth
    $scope.oauth = function() {
      User.oauth();
    };
    //logout for both
    $scope.logout = function() {
      User.logout();
      $location.url('/');
    };
  })
  .controller('HomeCtrl', function($scope, User, Gweet, $rootScope, $firebaseObject, $firebaseArray) {
    $scope.gweetArr = [];
    $scope.gweetObj = {};
    var currentUser = $rootScope.loggedUser.username;
    $scope.gweets = $firebaseArray($rootScope.fbGweets);
    // var query = $rootScope.fbGweets.limitToLast(20);
    // $scope.recentGweets = $firebaseArray(query);
    // $scope.gweetArr = $scope.recentGweets;
    // $scope.gweetArr = $scope.gweets;
    var query = $rootScope.fbGweets.orderByChild("id").equalTo($rootScope.uid);
    $scope.gweetArr = $firebaseArray(query);

    $scope.remainingChar = function() {
      if ($scope.gweet === undefined) {
        return 140;
      }
      return Gweet.maxLength - $scope.gweet.length;
    }
    $scope.isGweetMaxed = function() {
      return $scope.remainingChar() < 0 || false;
    }
    $scope.addGweet = function() {
      $scope.gweetObj = {};
      $scope.gweetObj.username = currentUser;
      $scope.gweetObj.gweet = $scope.gweet;
      $rootScope.fbGweets = $rootScope.fbRef.child('gweets/' + $scope.gweetObj.username);
      $scope.gweets.$add({
        username: currentUser,
        gweet: $scope.gweetObj.gweet,
        id: $rootScope.uid
      });
      $scope.gweet = "";
    }
  });
