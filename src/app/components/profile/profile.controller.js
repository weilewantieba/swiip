angular.module('cupid').controller('ProfileDashboardController', function($rootScope, $scope, $http, settings,profileAction,sweet) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
    $scope.data = {
      newPassword:"",
      oldPassword:"",
      repeatPassword:"",
    };
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
     $scope.getUserProfile = function () {
      var promise = profileAction.getUserProfile('client','Builder',sessionStorage.getItem('userId'),sessionStorage.getItem('accId'),sessionStorage.getItem('token')); // 同步调用，获得承诺接口
      promise.then(function(result) {  // 调用承诺API获取数据 .resolve
        if(result.status === 200){
          if(result.data.code === 200) {
            $scope.profile = result.data.msg;
          }else{
            console.log(result.data);
          }
        }else{
          console.log("serve error");
        }
      }, function(data) {  // 处理错误 .reject
        console.log(data);
      })
    };
    $scope.updatePwd = function () {
      //todo 处理重复密码
      var promise = profileAction.updatePwd('client','Builder',sessionStorage.getItem('userId'),sessionStorage.getItem('accId'),sessionStorage.getItem('token'),$scope.data.oldPassword,$scope.data.newPassword); // 同步调用，获得承诺接口
      promise.then(function(result) {  // 调用承诺API获取数据 .resolve
        if(result.status === 200){
          if(result.data.code === 200) {
            sweet.show('Successful', 'You\'ve done it', 'success');
          }else if(result.data.code === 611){
            sweet.show('Error', 'your password is wrong!', 'error');
          }
        }else{
          console.log("serve error");
        }
      }, function(data) {  // 处理错误 .reject
        console.log(data);
      })
    };
});
