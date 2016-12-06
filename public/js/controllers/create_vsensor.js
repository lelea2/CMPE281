App.controller('createVSensorController', ['$scope', '$http', function ($scope, $http) {

  $scope.sensors_type = [];
  $scope.buses_type = [];

  $scope.init = function() {
    //Get sensors type
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors/types'
    }).then(function(resp) {
      $scope.sensors_type = resp.data;
    });
    //Get bus
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/hosts'
    }).then(function(resp) {
      // console.log(resp.data);
      $scope.buses_type = resp.data;
    });
  };

}]);
