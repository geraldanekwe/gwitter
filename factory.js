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
  .factory('Gweet', function($rootScope) {
    function Gweet() {}

    Gweet.maxLength = 140;

    return Gweet;

  });
