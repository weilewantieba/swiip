'use strict';

function AdminAccountController($scope,$uibModal,$aside) {
  //aside plugin useful
    $scope.asideState = {
      open: false
    };
    $scope.openAside = function(position, backdrop) {
      $scope.asideState = {
        open: true,
        position: position
      };

      function postClose() {
        $scope.asideState.open = false;
      }

      $aside.open({
        templateUrl: 'app/components/admin/account/aside.html',
        placement: position,
        size: 'lg',
        backdrop: backdrop,
        controller: function($scope, $uibModalInstance) {
          $scope.ok = function(e) {
            $uibModalInstance.close();
            e.stopPropagation();
          };
          $scope.cancel = function(e) {
            $uibModalInstance.dismiss();
            e.stopPropagation();
          };
        }
      }).result.then(postClose, postClose);
    };
  //data
    $scope.item = "";
  	$scope.accounts = [{name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
  	               ];
	    $scope.getItem = function(item) {
        $scope.item = item;
        };
  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'app/components/admin/account/myModalContent.html',
      controller: 'ModalInstanceController',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
}
angular
  .module('cupid')
  .controller('AdminAccountController', ['$scope','$uibModal','$aside', AdminAccountController]);
