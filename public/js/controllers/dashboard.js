App.controller('dashboardController', ['$scope', '$http', function ($scope, $http) {

  $scope.sensor_type = {};

  $scope.init = function() {
    //Draw sensor type
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors'
    }).then(function(resp) {
      $scope.sensor_type = resp.data.metadata;
      Morris.Donut({
        element: 'morris-donut-chart1',
        data: [{
            label: "Temperature Sensor",
            value: data.temperature
        }, {
            label: "Location Sensor",
            value: data.location
        }, {
            label: "Speed Sensor",
            value: data.speed
        },{
            label: "Clipper Sensor",
            value: data.clipper
        }],
        resize: true
      });
    });
  }

}]);
