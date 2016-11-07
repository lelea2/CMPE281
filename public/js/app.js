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

APP_CLOUD = function() {};
APP_CLOUD.prototype.getHeaders = function() {
  return {
    'Content-Type': 'application/json'
  }
};
