/* Action about admin Account  */
  angular.module('cupid').factory('accountSettingAction', ['$rootScope', '$q' , 'global' , '$http','common', function($rootScope,$q,global,$http,common) {
    var account = {
      profile: {
        userName: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        interests: "",
        occupation: "",
        about: "",
        websiteUrl: ""
      },
      /**
       * admin获取平台所有的account信息
       *
       * @param userType {string} inArray[app,client,admin]
       * @param platformType {string}  inArray[Builder,Guppy]，暂时引用faeva平台
       * @param userId {string} 用户在数据库的唯一标识
       * @param token {string} 通行秘钥
       * @returns Object
       * @date 2016-04-07
       * @author weilewantieba@126.com
       * @todo 分页没有处理.有两个参数没有去解决
       */
      getAccountList: function (userType, platformType, userId, token) {
        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
        var parameter = {
          method: 'POST',
          url: global.localUrl + '/admin/account/listAll',
          data: {
            "ws": {
              "userType": userType,
              "platformType": platformType,
              "token": token
            },
            "ad": {
              "userId": userId
            }
          }
        };
        $http(parameter).
          success(function (data, status, headers, config) {
            console.log(data.msg.accounts)
            if (data.code === 200) {
              for (var i=0;i<data.msg.accounts.length;i++)
              {
                data.msg.accounts[i].createDate = common.unixToDate(data.msg.accounts[i].createDate);
                switch(data.msg.accounts[i].status)
                {
                  case 1:
                    data.msg.accounts[i].status = 'Active';
                    break;
                  case 0:
                    data.msg.accounts[i].status = 'unActive';
                    break;
                  default:
                    console.log('status is not 1 or 0');
                }
              }
              var result = {
              'status': status,
              'data': data,
              'headers': headers,
              'config': config
            };
              console.log(result)
            }
            else if(data.code === 605){
              console.log('token')
            }
            else{
              console.log('serve error')
            }
            deferred.resolve(result);  // 声明执行成功，即http请求数据成功，可以返回数据了
          }).
          error(function (data, status, headers, config) {
            var result = {
              'status': status,
              'data': data,
              'headers': headers,
              'config': config
            };
            console.log(result)
            deferred.resolve(result);
          });
        return deferred.promise;   // 声明执行失败，即服务器返回错误
      }
    };
    return account;

}]);
