(function() {
  'use strict';

  angular
    .module('swiip')
    .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function () {
          window.scrollTo(0, 0);
        });
        FastClick.attach(document.body);
      }
    ])

})();
