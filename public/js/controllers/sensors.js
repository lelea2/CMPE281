App.controller('sensorsController', ['$scope', '$http', function ($scope, $http) {

  var types = ['Location', 'Clipper', 'Speed', 'Temperature'];

  $scope.sensors = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/sensors'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.sensors = resp.data;
    });
  };

  $scope.convertType = function(type) {
    return types[type + 1];
  };

}]);
