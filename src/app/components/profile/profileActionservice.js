/* Setup global settings */
angular.module('cupid').factory('profileAction', ['$rootScope', '$q' , 'global' , '$http', function($rootScope,$q,global,$http) {
  // supported languages
  var user = {
    profile: {
      userName:"",
      email:"",
      password:"",
      firstName: "",
      lastName: "",
      mobileNumber:"",
      interests: "",
      occupation: "",
      about: "",
      websiteUrl: ""
      },
    setProfile:function(profile){
      user.profile.userName = profile.msg.name;
      user.profile.email = profile.msg.email;
      user.profile.createDate = profile.msg.createDate;
      user.profile.country = profile.msg.country;
      user.profile.gender = profile.msg.gender;
      user.profile.province = profile.msg.province;
      user.profile.city = profile.msg.city;
      user.profile.address = profile.msg.address;
      user.profile.givenName = profile.msg.givenName;
      user.profile.familyName = profile.msg.familyName;
      user.profile.lastLoginTime = profile.msg.lastLoginTime;
      user.profile.lastLogoutTime = profile.msg.lastLogoutTime;
      user.profile.birthday = profile.msg.birthday;
      return user.profile;
    },
    /**
     * 获取用户信息
     *
     * @param userType {string} inArray[app,client,admin]
     * @param platformType {string}  inArray[Builder,Guppy]，暂时引用faeva平台
     * @param userId {string} 用户在数据库的唯一标识
     * @param accId {string} 账户在数据库的唯一标识
     * @param token {string} 通行秘钥
     * @returns Object
     * @date 2016-03-01
     * @author weilewantieba@126.com
     */
    getUserProfile : function (userType,platformType,userId,accId,token) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      var parameter ={
        method: 'POST',
        url: global.localUrl+'/user/user/viewProfile',
        data:{
          "ws":{
            "userType":userType,
            "platformType":platformType,
            "token":token
          },
          "fe":{
            "userId":userId,
            "accId": accId
          }
        }
      };
      $http(parameter).
        success(function(data, status, headers, config) {
          if(data.code === 200){
            data.msg = user.setProfile(data);
          }
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
     * 更改密码
     *
     * @param userType {string} inArray[app,client,admin]
     * @param platformType {string}  inArray[Builder,Guppy]，暂时引用faeva平台
     * @param userId {string} 用户在数据库的唯一标识
     * @param accId {string} 账户在数据库的唯一标识
     * @param token {string} 通行秘钥
     * @returns Object
     * @date 2016-03-01
     * @author weilewantieba@126.com
     */
    updatePwd : function (userType,platformType,userId,accId,token,oldPwd,newPwd) {
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      var parameter ={
        method: 'POST',
        url: global.localUrl+'/user/user/updatePwd',
        data:{
          "ws":{
            "userType":userType,
            "platformType":platformType,
            "token":token
          },
          "fe":{
            "userId":userId ,
            "accId":accId,
            "oldPwd":oldPwd,
            "newPwd":newPwd
          }
        }
      };
      $http(parameter).
        success(function(data, status, headers, config) {
          if(data.code === 200){
            data.msg = user.setProfile(data);
          }
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
