app.controller('LoginCtrl', function($scope, User, $rootScope, $firebaseObject, $location) {

    $scope.afAuth.$onAuth(function(data) {
      if (data) {
        $rootScope.activeUser = data;
        $rootScope.uid = data.uid;
        $rootScope.fbUser = $rootScope.fbRef.child('users/' + data.uid);
        $rootScope.fbUser.update({
          email: data.github.email,
          username: data.github.username
        });
        $rootScope.currentUser = $firebaseObject($rootScope.fbUser);
        $rootScope.currentUser.$bindTo($rootScope, "loggedUser");
        // $location.path('/profile');
      } else {
        $rootScope.activeUser = null;
        $rootScope.fbUser = null;
        $rootScope.afUser = null;
      }
    });
    //oauth
    $scope.oauth = function() {
      User.oauth().then(function(data) {
        $location.url('/home')
      });
    };
    //logout for both
    $scope.logout = function() {
      User.logout();
      $location.url('/');
    };
  })
  .controller('HomeCtrl', function($scope, User, Gweet, $rootScope, $firebaseObject, $firebaseArray) {
    $scope.gweetObj = {};
    $scope.gweets = Gweet.getGweets();

    $scope.addGweet = function() {
      $scope.gweetObj.username = $rootScope.loggedUser.username;
      $scope.gweetObj.gweet = $scope.gweet;
      Gweet.addGweet($scope.gweetObj);
      $scope.gweet = "";
    };

    $scope.follow = function(index) {
      var arrLength = $scope.gweets.length - 1;
      var realIndex = arrLength - index;
      var key = $scope.gweets.$keyAt(realIndex);
      var clickedGweet = $scope.gweets.$getRecord(key);
      Gweet.follow($rootScope.loggedUser, clickedGweet.id);
    };

    $scope.isFollowing = function(obj) {
      if ($rootScope.currentUser.following) {
        var followArr = $rootScope.currentUser.following;
        return followArr.some(function(github) {
          return github === obj.id;
        });
      }
    };

    $scope.remainingChar = function() {
      if ($scope.gweet === undefined) {
        return 140;
      }
      return Gweet.maxLength - $scope.gweet.length;
    };

    $scope.isGweetMaxed = function() {
      return $scope.remainingChar() < 0 || false;
    };
  })
  .controller('ProfileCtrl', function($scope, User, Gweet, $rootScope, $firebaseObject, $firebaseArray) {
    $scope.gweetObj = {};
    $scope.gweets = Gweet.getGweets();

    $scope.addGweet = function() {
      $scope.gweetObj.username = $rootScope.loggedUser.username;
      $scope.gweetObj.gweet = $scope.gweet;
      Gweet.addGweet($scope.gweetObj);
      $scope.gweet = "";
    };

    $scope.remainingChar = function() {
      if ($scope.gweet === undefined) {
        return 140;
      }
      return Gweet.maxLength - $scope.gweet.length;
    };

    $scope.isFollowing = function(obj) {
      var followArr = $rootScope.currentUser.following;
      if ($rootScope.uid === obj.id) {
        return true;
      } else if ($rootScope.currentUser.following) {
        $scope.following = followArr.length;
        return followArr.some(function(github) {
          return github === obj.id;
        });
      }
    };

    $scope.isGweetMaxed = function() {
      return $scope.remainingChar() < 0 || false;
    };
  });
