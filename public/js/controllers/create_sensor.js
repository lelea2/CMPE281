App.controller('createSensorController', ['$scope', '$http', function ($scope, $http) {

  $scope.formSensor = {};

  $scope.sensors_type = [];

  $scope.choices = [{
    text: 'Physical Sensor',
    isEmulator: "false"
  }, {
    text: 'Emulator',
    isEmulator: "true"
  }];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors/types'
    }).then(function(resp) {
      $scope.sensors_type = resp.data;
    });
  };

  $scope.createSensors = function() {

  };

}]);
