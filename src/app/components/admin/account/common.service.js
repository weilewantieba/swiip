/* Action about admin Account  */
  angular.module('cupid').factory('common', ['global', function(global) {
    var common = {
      /**
       * 将时间戳转换为字符串日期格式
       *
       * @param Int unix
       * @returns String date
       * @date 2016-04-12
       * @author weilewantieba@126.com
       */
      unixToDate: function (unix) {
        var date = new Date(parseInt(unix) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        return date;
      }
    };
    return common;

}]);
