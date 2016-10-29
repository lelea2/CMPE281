App.controller('signinController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSigninData = {};
  $scope.formSignupData = {};

  $scope.signinState = true;

  $scope.processSignin = function() {

  };

  $scope.processSignup = function() {

  };

  $scope.showSignin = function() {
    $scope.signinState = true;
  };

  $scope.showSignup = function() {
    $scope.signinState = false;
  };

}]);
