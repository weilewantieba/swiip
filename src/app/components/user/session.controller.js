'use strict';

function SessionController($scope, $state,userAction,sweet) {
  $scope.signin = function () {
    var promise = userAction.register('client','Builder',$scope.email,$scope.pwd); // 同步调用，获得承诺接口
    promise.then(function(result) {  // 调用承诺API获取数据 .resolve
       if(result.status === 200){
         if(result.data.code ===200) {
           $scope.userId = result.data.msg.id;
           $state.go('user.signin');
         }else{
           console.log(result.data);
           sweet.show('Error code', 'Error code is '.result.data.code);
         }
       }else{
         console.log("serve error");
       }
    }, function(data) {  // 处理错误 .reject
      console.log(data);
    });
    $state.go('user.signin');
  };

  $scope.login = function () {
    var promise = userAction.login('client','Builder',$scope.email,$scope.pwd); // 同步调用，获得承诺接口
    promise.then(function(result) {  // 调用承诺API获取数据 .resolve
      if(result.status === 200){
        if(result.data.code === 200) {
          sessionStorage.setItem('token', result.data.msg.token);
          sessionStorage.setItem('userId', result.data.msg.userId);
          sessionStorage.setItem('accId', result.data.msg.accId);
          sweet.show({
            title: 'Login Successful',
            text: 'I will close in 1 seconds.',
            timer: 2000,
            showConfirmButton: false
          });
          $state.go('app.dashboard');
        }else{
          console.log(result.data);
          sweet.show('Error code', 'error code is '+result.data.code,'error');
        }
      }else{
        console.log("serve error");
      }
    }, function(data) {  // 处理错误 .reject
      console.log(data);
    });
    $state.go('user.signin');
  };

  $scope.adminLogin = function () {
    var promise = userAction.login('admin','Builder',$scope.email,$scope.pwd); // 同步调用，获得承诺接口
    promise.then(function(result) {
      console.log(result)// 调用承诺API获取数据 .resolve
      if(result.status === 200){
        if(result.data.code === 200) {
          sessionStorage.setItem('token', result.data.msg.token);
          sessionStorage.setItem('adminId', result.data.msg.userId);
          sweet.show({
            title: 'Login Successful',
            text: 'I will close in 1 seconds.',
            timer: 2000,
            showConfirmButton: false
          });
          $state.go('admin.dashboard');
        }else{
          console.log(result.data);
          sweet.show('Error code', 'error code is '+result.data.code,'error');
        }
      }else{
        console.log("serve error");
      }
    }, function(data) {  // 处理错误 .reject
      console.log(data);
    });
  };
}
angular
  .module('cupid')
.controller('SessionController', ['$scope', '$state','userAction','sweet', SessionController]);
