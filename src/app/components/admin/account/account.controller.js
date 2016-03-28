'use strict';

function AdminAccountController($scope) {
  	$scope.accounts = [{name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
                    {name: "Moroni", email: 'weilewantieba@126.com', status: 1},
  	               ];

	    $scope.showItem = function(item) {
	      alert(JSON.stringify(item));
        };

}
angular
  .module('cupid')
  .controller('AdminAccountController', ['$scope', AdminAccountController]);
