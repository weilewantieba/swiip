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
    /**
     * 注册用户
     *
     * @param userType {string} inArray[app,client,admin]
     * @param platformType {string}  inArray[Builder,Guppy]，暂时引用faeva平台
     * @param name {string} 注册用户的账户名 email,name,phone都可以
     * @returns
     * {"code":200, "msg":{"id":"56d5ba19af0741a818000033"}}
     * @date 2016-03-01
     * @author weilewantieba@126.com
     */
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

    /**
     * 登录
     *
     * @param userType {string} inArray[app,client,admin]
     * @param platformType {string}  inArray[Builder,Guppy]，暂时引用faeva平台
     * @param name {string} 注册用户的账户名 email,name,phone都可以
     * @returns
     * {
     *    "code": 200,
     *    "msg": {
     *      "userId": "56c988f8af0741c421000043",
     *      "token": "5B438F2183EA1D94F6C97FC6765AACF1",
     *      "accId": "56cc7cfeaf0741c81600003a"
     *     }
     *   }
     *
     * @date 2016-03-01
     * @author weilewantieba@126.com
     */
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
