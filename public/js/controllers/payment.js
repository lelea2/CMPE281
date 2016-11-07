App.controller('paymentController', ['$scope', '$http', function ($scope, $http) {

  $scope.formPayment = {};

  function generatePaymentObj() {

  }

  $scope.processPayment = function() {
     $http({
      method  : 'POST',
      url     : '/api/payment',
      headers : APP_CLOUD.getHeaders(),
      data    : generatePaymentObj(),
    }).then(function(data) {
      window.location = '/payments'; //redirect to create payment
    }, function(err) {
    });
  };

}]);
