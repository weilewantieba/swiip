'use strict';

function SessionController($scope, $state,userAction) {
  $scope.signin = function () {
    var promise = userAction.register('client','Builder',$scope.email,$scope.pwd); // 同步调用，获得承诺接口
    promise.then(function(result) {  // 调用承诺API获取数据 .resolve
       if(result.status === 200){
         if(result.data.code ===200) {
           $scope.userId = result.data.msg.id;
           $state.go('user.signin');
         }else{
           console.log(result.data);
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
        if(result.data.code ===200) {
          localStorage.setItem('token', result.data.msg.token);
          localStorage.setItem('userId', result.data.msg.userId);
          $state.go('app.dashboard');
        }else{
          console.log(result.data);
        }
      }else{
        console.log("serve error");
      }
    }, function(data) {  // 处理错误 .reject
      console.log(data);
    });
    $state.go('user.signin');
  };
}
angular
  .module('cupid')
  .controller('SessionController', ['$scope', '$state','userAction', SessionController]);
