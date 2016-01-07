(function() {
  'use strict';
//声明和定义一个angularJs模块 swiip
  angular
    .module('cupid', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'oc.lazyLoad',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'ngTouch',
      'ngStorage',
      'ui.utils'
    ])
  .constant('COLORS', {
    'default': '#e2e2e2',
    primary: '#09c',
    success: '#2ECC71',
    warning: '#ffc65d',
    danger: '#d96557',
    info: '#4cc3d9',
    white: 'white',
    dark: '#4C5064',
    border: '#e4e4e4',
    bodyBg: '#e0e8f2',
    textColor: '#6B6B6B'
  })
})
();
