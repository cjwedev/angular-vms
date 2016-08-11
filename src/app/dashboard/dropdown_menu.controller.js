(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('DropdownMenuController', DropdownMenuController);

  DropdownMenuController.$inject = ['$state', 'sessionService', '$window', '$rootScope'];

  /** @ngInject */
  function DropdownMenuController($state, sessionService, $window, $rootScope) {
    var vm = this;
    vm.me = {};

    activate();

    function activate() {
    }

    vm.logout = function() {
      sessionService.logout().then(function(response) {
        sessionService.setToken(null);
        $state.go('home');
      }, function(error) {
        $state.go('home');
      });
    }

    $rootScope.$on('profile.update', function(event, me) {
      vm.me = me;
    });
  }
})();
