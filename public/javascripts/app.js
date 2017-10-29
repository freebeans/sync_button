(function () {
  'use strict';

  angular
    .module('app', [])
    .controller('controller', function ($scope, $http) {

      var started = false;

      $scope.toggle = function () {

        $http({
          method: 'POST',
          url: '/state'
        }).then(function success(response) {

        }, function failure(response) {
          console.error(response);
        });

      };


      function updateStatePoll() {

        $http({
          method: 'GET',
          url: started ? '/state' : '/statefast',
          timeout: 900000
        }).then(function success(response) {
          started = true;
          $scope.state = response.data.state;
          updateStatePoll();
        }, function failure(response) {
          console.error(response);
        });

      };

      updateStatePoll();


    });
})();
