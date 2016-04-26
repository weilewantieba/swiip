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
    $scope.openAside = function(position, backdrop,item,index) {
      console.log(index);
      $scope.asideState = {
        open: true,
        position: position,
      };
      function postClose() {
        $scope.asideState.open = false;
      }
     //console.log( $scope.asideState)
      var callback=$aside.open({
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
          $scope.item = item;
          $scope.master = angular.copy(item);
          $scope.updateAccount_admin= function () {
            //todo 处理重复密码
            var promise = accountSettingAction.updateAccount('admin','Builder',sessionStorage.getItem('adminId'),sessionStorage.getItem('token'), $scope.master.id, $scope.master.email, $scope.master.name, $scope.master.desc); // 同步调用，获得承诺接口
            promise.then(function(result) {  // 调用承诺API获取数据 .resolve
              if(result.status === 200){
                if(result.data.code === 200) {
                  item = angular.copy($scope.master);
                  console.log(item);
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
            $uibModalInstance.close($scope.master);
            e.stopPropagation();
          };
          $scope.cancel = function(e) {
            //解决双向绑定的数据问题
            $uibModalInstance.dismiss();
            e.stopPropagation();
          };
        }
      });

      callback.result.then(function(res){
        $scope.accounts[index]=res;
      });

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
