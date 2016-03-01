angular.module('cupid').controller('ProfileDashboardController', function($rootScope, $scope, $http, settings,profileAction) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;

    $scope.getUserProfile = function () {
      var promise = profileAction.getUserProfile('client','Builder',sessionStorage.getItem('userId'),sessionStorage.getItem('accId'),sessionStorage.getItem('token')); // 同步调用，获得承诺接口
      promise.then(function(result) {  // 调用承诺API获取数据 .resolve
        if(result.status === 200){
          if(result.data.code === 200) {
              console.log(result.data.msg);
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
});
