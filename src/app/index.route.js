(function() {
  'use strict';

  angular
    .module('cupid')
    .config(routerConfig);

  /** @ngInject */
  /*
   $urlRouterProvider  路由重定向
   $stateProvider      路由状态配置
   */
  function routerConfig($stateProvider, $urlRouterProvider) {
    // For unmatched route
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/components/common/layout.html'
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/components/dashboard/dashboard.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                insertBefore: '#load_styles_before',
                files: [
                  'assets/styles/climacons-font.css',
                  '../bower_components/rickshaw/rickshaw.min.css'
                ]
              },
              {
                serie: true,
                files: [
                  '../bower_components/d3/d3.min.js',
                  '../bower_components/rickshaw/rickshaw.min.js',
                  '../bower_components/Flot/jquery.flot.js',
                  '../bower_components/Flot/jquery.flot.resize.js',
                  '../bower_components/Flot/jquery.flot.pie.js',
                  '../bower_components/Flot/jquery.flot.categories.js'
                ]
              },
              {
                name: 'angular-flot',
                files: [
                  '../bower_components/angular-flot/angular-flot.js'
                ]
              }]).then(function () {
              return $ocLazyLoad.load('app/components/dashboard/dashboard.controller.js');
            });
          }]
        },
        data: {
          title: 'Dashboard'
        }
      })
      .state('user', {
        templateUrl: 'app/components/common/session.html'
      })
      .state('user.signin', {
        url: '/signin',
        templateUrl: 'app/components/user/extras-signin.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/components/user/session.controller.js');
          }]
        },
        data: {
          appClasses: 'bg-white usersession',
          contentClasses: 'full-height'
        }
      })

      .state('user.signup', {
        url: '/signup',
        templateUrl: 'app/components/user/extras-signup.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/components/user/session.controller.js');
          }]
        },
        data: {
          appClasses: 'bg-white usersession',
          contentClasses: 'full-height'
        }
      })
      .state('user.forgot', {
        url: '/forgot',
        templateUrl: 'app/components/user/extras-forgot.html',
        resolve: {
          deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('app/components/user/session.controller.js');
          }]
        },
        data: {
          appClasses: 'bg-white usersession',
          contentClasses: 'full-height'
        }
      })
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      // UI Routes
      .state('app.ui', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/ui'
      });

    $urlRouterProvider.otherwise('/signin');
  }

})();
