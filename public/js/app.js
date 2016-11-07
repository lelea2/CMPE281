window.App = angular.module('cloudApp', ['ui.mask']);

App.run(['$window', '$rootScope', function($window, $rootScope) {
  $rootScope.online = navigator.onLine;
  $window.addEventListener('offline', function () {
    $rootScope.$apply(function() {
      $rootScope.online = false;
    });
  }, false);
  $window.addEventListener('online', function () {
    $rootScope.$apply(function() {
      $rootScope.online = true;
    });
  }, false);
}]);

APP_CLOUD = {};
APP_CLOUD.getHeaders = function(setCookies) {
  return {
    'Content-Type': 'application/json',
    'setCookie': setCookies || false,
    'u': ''
  }
};
