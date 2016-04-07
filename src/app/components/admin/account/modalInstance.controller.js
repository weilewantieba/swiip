// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('cupid').controller('ModalInstanceController', function ($scope, $uibModalInstance) {
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
