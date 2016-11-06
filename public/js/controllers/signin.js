App.controller('signinController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;

  $scope.processSignin = function() {
    $http({
      method  : 'POST',
      url     : '/api/login',
      headers : APP_CLOUD.getHeaders(),
      data    : $scope.formSigninData
    }).then(function(data) {
      window.location = '/instances'; //redirect to dashboard
    }, function(err) {
    });
  };

  $scope.processSignup = function() {
    $http({
      method  : 'POST',
      url     : '/api/accounts',
      headers : APP_CLOUD.getHeaders(),
      data    : $scope.formSignupData
    }).then(function(data) {
      window.location = '/payments'; //redirect to create payment
    }, function(err) {
    });
  };

  $scope.showSignin = function() {
    $scope.signinState = true;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
  };

}]);
