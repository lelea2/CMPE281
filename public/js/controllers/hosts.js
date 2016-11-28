App.controller('hostsController', ['$scope', '$http', function ($scope, $http) {

  $scope.formBus = {};
  $scope.buses = [];
  $scope.routes = [];

  $scope.createBus = function() {
    $http({
      method  : 'POST',
      url     : '/api/hosts',
      headers : APP_CLOUD.getHeaders(true),
      data    : $scope.formBus
    }).then(function(data) {
      // window.location = '/hosts'; //redirect to create payment
      window.location.reload(true);
    }, function(err) {
    });
  };

  $scope.init = function() {
    //Get all hosts
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.buses = resp.data;
    });
    //Get existing routes
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/routes'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.routes = resp.data;
    });
  };

  $scope.handleHostStatus = function() {

  };

  $scope.convertTime = function(date) {
    var d = new Date(date);
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  };

  $scope.convertStatus = function(status) {
    return (status === true) ? 'On' : 'Off';
  };

  $scope.btnStatus = function(status) {
    return 'Turn ' + ((status === true) ? 'Off' : 'On');
  };

}]);
