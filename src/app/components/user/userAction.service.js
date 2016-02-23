/* Setup global settings */
angular.module('cupid').factory('userAction', ['$rootScope','global','$http','$q',function($rootScope,global,$http,$q) {
  // supported languages
  var user = {
    profile: {
      userName:"siyuan",
      email:"siyuanuser@qq.com",
      password:"12345678",
      firstName: "Jhone",
      lastName: "Doe",
      mobileNumber: 13232592025,
      interests: "design,sport,game",
      occupation: "Developer",
      about: "I am a developer,i love beautiful girl",
      websiteUrl: "www.websit.com"
      },
    register: function (userType,platformType,name,pwd) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      var parameter ={
        method: 'POST',
        url: global.localUrl+'/user/user/register',
        data:{
          "ws":{
            "userType":userType,
            "platformType":platformType
          },
          "fe":{
            "name":name,
            "pwd":pwd
          }
        }
      };
      $http(parameter).
        success(function(data, status, headers, config) {
          var result = {
            'status':status,
            'data':data,
            'headers':headers,
            'config':config
            };
          deferred.resolve(result);  // 声明执行成功，即http请求数据成功，可以返回数据了
        }).
        error(function(data, status, headers, config) {
          var result = {
            'status':status,
            'data':data,
            'headers':headers,
            'config':config
          };
          deferred.resolve(result);
        });
      return deferred.promise;   // 声明执行失败，即服务器返回错误
    },
    login: function (userType,platformType,name,pwd) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      var parameter ={
        method: 'POST',
        url: global.localUrl+'/user/user/login',
        data:{
          "ws":{
            "userType":userType,
            "platformType":platformType
          },
          "fe":{
            "name":name,
            "pwd":pwd
          }
        }
      };
      $http(parameter).
        success(function(data, status, headers, config) {
          var result = {
            'status':status,
            'data':data,
            'headers':headers,
            'config':config
          };
          deferred.resolve(result);  // 声明执行成功，即http请求数据成功，可以返回数据了
        }).
        error(function(data, status, headers, config) {
          var result = {
            'status':status,
            'data':data,
            'headers':headers,
            'config':config
          };
          deferred.resolve(result);
        });
      return deferred.promise;   // 声明执行失败，即服务器返回错误
    }
  }
  return user;
}]);
