App.controller('meteringController', ['$scope', '$http', function ($scope, $http) {

  $scope.meterings = [];

  $scope.init = function() {
    $http({
      method: 'GET',
      headers: APP_CLOUD.getHeaders(true),
      url: '/api/usage'
    }).then(function(resp) {
      console.log(resp.data);
      $scope.meterings = resp.data;
    });

  }

}]);
