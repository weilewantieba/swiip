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
    /**
     * 打开模块对话框
     *
     * @param position {string} 模块对话框弹出位置
     * @param backdrop
     * @param item {object} 展示数据
     * @param index {number} 数组下表
     * @date 2016-04-07
     * @author weilewantieba@126.com
     */
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
      var callback = $aside.open({
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
          //item赋值给模块对话框的控制器
          $scope.item = item;
          //拷贝一份元数据
          $scope.master = angular.copy(item);
          //更新Account信息Api调用
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
          //成功调用
          $scope.ok = function(e) {
            //讲元数组返回到上级controller
            $uibModalInstance.close($scope.master);
            e.stopPropagation();
          };
          //失败调用
          $scope.cancel = function(e) {
            //解决双向绑定的数据问题
            $uibModalInstance.dismiss();
            e.stopPropagation();
          };
        }
      });
      //获取callback数据更新account信息
      callback.result.then(function(res){
        $scope.accounts[index]= res;
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
