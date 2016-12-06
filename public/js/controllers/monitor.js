App.controller('monitorController', ['$scope', '$http', function ($scope, $http) {

  $scope.monitors = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/monitor/statistics'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.monitors = resp.data;
    });
  };

}]);
