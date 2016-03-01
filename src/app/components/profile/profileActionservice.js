/* Setup global settings */
angular.module('cupid').factory('profileAction', ['$rootScope', '$q' , 'global' , '$http', function($rootScope,$q,global,$http) {
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
    getProfile: function () {
      return user.profile
    },
    setProfile:function(profile){
      user.profile.userName = profile.name;
      user.profile.email = profile.email;
      user.profile.createDate = profile.createDate;
      user.profile.country = profile.country;
      user.profile.gender = profile.gender;
      user.profile.province = profile.province;
      user.profile.city = profile.city;
      user.profile.address = profile.address;
      user.profile.givenName = profile.givenName;
      user.profile.familyName = profile.familyName;
      user.profile.lastLoginTime = profile.lastLoginTime;
      user.profile.lastLogoutTime = profile.lastLogoutTime;
      user.profile.birthday = profile.birthday;
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
     * 更新用户资料
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

    }
  return user;
}]);
