(function() {
  'use strict';

  angular
    .module('stargaze')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $state, $window, localStorageService) {

    // Check authentication token
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      var requireCC = toState.data.requireCC;

      // If not authorized, redirect to signin page
      if (requireLogin && localStorageService.get('token') == null) {
        event.preventDefault();
        $state.go('auth.signin');
      } else if (requireCC && $rootScope.me.credit_card != true) { // User doesn't have credit card, redirect to billing page
        event.preventDefault();
        $state.go('account.billing', {redirect: true});
      }
    });

    // Store user profile
    $rootScope.$on('profile.update', function(event, me) {
      $rootScope.me = me;
    });

    // Remove authentication token when close all tabs
    $rootScope.onExit = function() {
      if (localStorageService.get('tabs') != null) {
        localStorageService.set('tabs', localStorageService.get('tabs') - 1);
      }

      if (localStorageService.get('tabs') == 0 || localStorageService.get('tabs') == null) {
        localStorageService.clearAll();
      }
    };

    // Count opened tabs
    $rootScope.countTabs = function() {
      if (localStorageService.get('tabs')) {
        localStorageService.set('tabs', localStorageService.get('tabs') + 1);
      } else {
        localStorageService.set('tabs', 1);
      }
    }

    $window.onunload =  $rootScope.onExit;
    $window.onload = $rootScope.countTabs;
  }

})();
