/* Setup global settings */
angular.module('cupid').factory('profileAction', ['$rootScope', function($rootScope) {
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
    getProfile: function ( book ) {
      return user.profile
    }
  }
  return user;
}]);
