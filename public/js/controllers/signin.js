App.controller('signinController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;

  $scope.processSignin = function() {
    $http({
      method  : 'POST',
      url     : '/api/login',
      data    : $.param($scope.formSigninData)
    }).then(function(data) {
      window.location = '/dashboard'; //redirect to dashboard
    }, function(err) {
      alert('Fail to login. Please try again');
    });
  };

  $scope.processSignup = function() {
    $http({
      method  : 'POST',
      url     : '/api/accounts',
      data    : $.param($scope.formSignupData)
    }).then(function(data) {
      window.location = '/dashboard'; //redirect to dashboard
    }, function(err) {
      alert('Fail to login. Please try again');
    });
  };

  $scope.showSignin = function() {
    $scope.signinState = true;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
  };

}]);
