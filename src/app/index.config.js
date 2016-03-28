(function() {
  'use strict';

  angular
    .module('cupid')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig,stConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    stConfig.pagination.template = 'app/components/admin/user/pagination.custom.html';
  }

})();
