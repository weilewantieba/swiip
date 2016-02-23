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
        templateUrl: 'app/components/common/layout.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
              files: [
                '../../assets/scripts/profile/app.min.js',
                '../../assets/styles/profile/components.min.css'
              ]
            });
          }]
        }
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
      // UI Routes
      .state('app.ui', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/ui'
      })
      // Todo
      .state('app.todo', {
        url: "/todo",
        templateUrl: "app/components/task/task-todo.html",
        data: {pageTitle: 'Todo'},
        controller: "TodoController",
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
              files: [
                '../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css',
                '../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                '../../assets/styles/todo/todo-2.css',
                '../bower_components/select2/dist/css/select2.min.css',
                '../bower_components/select2/dist/js/select2.full.min.js',
                '../../assets/scripts/todo/todo-2.min.js',
                'app/components/task/todo.controller.js'


              ]
            });
          }]
        }
      })
      // Profile
  .state("app.profile", {
      url: "/profile",
      templateUrl: "app/components/profile/profile-main.html",
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            files: [
              '../bower_components/font-awesome/css/font-awesome.min.css',
              '../bower_components/bootstrap/dist/css/bootstrap.min.css',
              '../bower_components/simple-line-icons/css/simple-line-icons.css',
              '../bower_components/jquery.uniform/themes/default/css/uniform.default.css',
              '../bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
              '../bower_components/bootstrap-fileinput/css/fileinput.min.css',
              '../../assets/styles/profile/layout.min.css',
              '../../assets/styles/profile/plugins-md.css',
              '../../assets/styles/profile/profile.min.css',
              '../../assets/styles/profile/darkblue.min.css',
              '../../assets/styles/profile/custom.min.css',
              '../../assets/scripts/profile/demo.min.js',
              '../../assets/scripts/profile/excanvas.min.js',
              '../../assets/scripts/profile/jquery.sparkline.min.js',
              '../../assets/scripts/profile/layout.min.js',
              '../../assets/scripts/profile/profile.min.js',
              '../../assets/scripts/profile/quick-sidebar.min.js',
              '../../assets/scripts/profile/respond.min.js',
              '../../assets/scripts/profile/timeline.min.js',
              '../bower_components/bootstrap/dist/js/bootstrap.min.js',
              '../bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
              '../bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
              '../bower_components/jquery.uniform/jquery.uniform.min.js',
              '../bower_components/jquery-slimscroll/jquery.slimscroll.min.js',
              '../bower_components/malsup.github.com/min/jquery.blockUI.min.js',
              '../bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
              '../bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
              '../bower_components/bootstrap-fileinput/js/fileinput.min.js'
            ]
          });
        }]
      },
      data: {pageTitle: 'User Profile'}
    })
      // User Profile Help
      .state("app.profile.help", {
        url: "/help",
        templateUrl: "app/components/profile/profile-help.html",
        data: {pageTitle: 'Profile Help'}
      })
      // User Profile Dashboard
      .state("app.profile.dashboard", {
        url: "/dashboard",
        templateUrl: "app/components/profile/profile-dashboard.html",
        data: {pageTitle: 'Profile Dashboard'}
      })
      // User Profile Account
      .state("app.profile.account", {
        url: "/account",
        templateUrl: "app/components/profile/profile-account.html",
        data: {pageTitle: 'Account'}
      });
    $urlRouterProvider.otherwise('/signin');
  }

})();
