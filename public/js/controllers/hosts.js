App.controller('hostsController', ['$scope', '$http', function ($scope, $http) {

  $scope.formBus = {};
  $scope.buses = [];

  $scope.createBus = function() {
    $http({
      method  : 'POST',
      url     : '/api/hosts',
      headers : APP_CLOUD.getHeaders(true),
      data    : $scope.formBus
    }).then(function(data) {
      window.location = '/hosts'; //redirect to create payment
    }, function(err) {
    });
  };

  $scope.init = function() {
    $scope.buses = [];
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.buses = resp.data;
    });
  };

}]);
