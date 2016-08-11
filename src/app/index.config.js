(function() {
  'use strict';

  angular
    .module('stargaze')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, RestangularProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    RestangularProvider.setBaseUrl('http://108.53.145.165:8080');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHeaders({});

    // Set API response interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;

      if (operation === "getList") {
        extractedData = data;
      } else {
         extractedData = data;
      }

      return extractedData;
    });

    // Stripe
    Stripe.setPublishableKey('pk_test_FDheSwyIdC4fql48ohl34Rr3');
  }

})();
