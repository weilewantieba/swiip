'use strict';

function SessionController($scope, $state) {

  $scope.signin = function () {
    $state.go('user.signin');
  };

  $scope.submit = function () {
    $state.go('app.dashboard');
  };
}

angular
  .module('swiip')
  .controller('SessionController', ['$scope', '$state', SessionController]);
