(function() {
  'use strict';

  angular
    .module('stargaze')
    .factory('accountService', accountService);

  accountService.$inject = ['$rootScope', 'localStorageService', 'constlRestangular'];

  function accountService($rootScope, localStorageService, constlRestangular) {
    var service = {
      createAccount: createAccount
    };

    // Invoke constellation API endpoints
    var auth = constlRestangular.all('accounts');

    return service;
    ////////////////////////////////////////////

    /**
    * Register user
    */
    function createAccount(accountInfo) {
      return auth.all('new').customPOST($.param(accountInfo), undefined, undefined, {});
    }
  }
})();
