'use strict';

function AdminAccountController($scope,$uibModal,$aside,accountSettingAction,sweet) {
  //定义数据
  var sourItem = null;
  $scope.accounts = [];
  //getAllAccount by admim
  $scope.getAccountList_admin= function () {
    //todo 处理重复密码
    var promise = accountSettingAction.getAccountList('admin','Builder',sessionStorage.getItem('adminId'),sessionStorage.getItem('token')); // 同步调用，获得承诺接口
    promise.then(function(result) {  // 调用承诺API获取数据 .resolve
      if(result.status === 200){
        if(result.data.code === 200) {
          $scope.accounts = result.data.msg.accounts;
        }else{
          sweet.show('error', '参数错误');
      }
      }else{
        console.log("serve error");
      }
    }, function(data) {  // 处理错误 .reject
      console.log(data);
    })}

  //aside plugin useful
    $scope.asideState = {
      open: false
    };
    $scope.openAside = function(position, backdrop,item) {
      $scope.asideState = {
        open: true,
        position: position,
      };
      function postClose() {
        $scope.asideState.open = false;
      }
     //console.log( $scope.asideState)
      $aside.open({
        templateUrl: 'app/components/admin/account/aside.html',
        placement: position,
        size: 'lg',
        backdrop: backdrop,
        resolve: {
          item: function () {
            return item;
          }
        },
        controller: function($scope, $uibModalInstance,item) {
          sourItem = item;
          $scope.item = item;
          $scope.updateAccount_admin= function () {
            //todo 处理重复密码
            var promise = accountSettingAction.updateAccount('admin','Builder',sessionStorage.getItem('adminId'),sessionStorage.getItem('token'),item.id,item.email,item.name,item.desc); // 同步调用，获得承诺接口
            promise.then(function(result) {  // 调用承诺API获取数据 .resolve
              if(result.status === 200){
                if(result.data.code === 200) {
                  sweet.show('successful', '更新成功');
                }else{
                  sweet.show('error', '参数错误');
                }
              }else{
                console.log("serve error");
              }
            }, function(data) {  // 处理错误 .reject
              console.log(data);
            })}
          $scope.ok = function(e) {
            //调用更新Account资料的服务
            $uibModalInstance.close();
            e.stopPropagation();
          };
          $scope.cancel = function(e) {
            //解决双向绑定的数据问题
            $uibModalInstance.dismiss();
            e.stopPropagation();
          };
        }
      }).result.then(postClose, postClose);
    };
  ////data
  //	$scope.accounts = [{name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533, status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //                  {name: "Moroni", email: 'weilewantieba@126.com',phone: 13590052533,  status: 1},
  //	               ];
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
  .controller('AdminAccountController', ['$scope','$uibModal','$aside','accountSettingAction','sweet', AdminAccountController]);
