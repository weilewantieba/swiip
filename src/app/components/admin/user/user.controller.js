'use strict';

function AdminUserController($scope,$filter) {
  var
    nameList = ['Pierre', 'Aol', 'Jacques', 'Robert', 'Elisa'],
    statusList = [1,2,3,4],
    groupsList = [1,2,3];

  $scope.statuses = [
    {value: 1, text: 'Active'},
    {value: 2, text: 'Ban'},
    {value: 3, text: 'disActive'},
    {value: 4, text: 'Arrear'}
  ];
  $scope.groups = [
    {id : 1, text: 'appUser'},
    {id : 2, text: 'Client'},
    {id : 3, text: 'Admin'}
  ];
  function createRandomItem() {
    var
      name = nameList[Math.floor(Math.random() * 4)],
      status = statusList[Math.floor(Math.random() * 4)],
      group = groupsList[Math.floor(Math.random() * 3)];
      return{
        name: name,
        status: status,
        group: group,
      };
  }
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null
    };
    $scope.users.push($scope.inserted);
  };

  $scope.users = [];

  for (var j = 0; j < 100; j++) {
    $scope.users.push(createRandomItem());
  }
}
angular
  .module('cupid')
  .controller('AdminUserController', ['$scope','$filter',AdminUserController]);
