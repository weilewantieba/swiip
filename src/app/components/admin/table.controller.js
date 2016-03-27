'use strict';

function TableController($scope) {
  // this variable will contains all data after loading
  $scope.exportDataVariable =[];
  $scope.showItem = function(item){
    alert(json.stringify(item))
  }


}
angular
  .module('cupid')
  .controller('TableController', ['$scope', TableController]);
