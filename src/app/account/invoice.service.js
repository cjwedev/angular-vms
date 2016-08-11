(function() {
  'use strict';

  angular
    .module('stargaze')
    .factory('invoiceService', invoiceService);

  invoiceService.$inject = ['$rootScope', 'localStorageService', 'constlRestangular'];

  function invoiceService($rootScope, localStorageService, constlRestangular) {
    var service = {
      invoiceList: invoiceList
    };

    // Invoke constellation API endpoints
    var invoice = constlRestangular.all('invoice');

    return service;
    ////////////////////////////////////////////

    /**
    * Retrieve invoice list
    */
    function invoiceList() {
      return invoice.getList();
    }
  }
})();
