(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('AccountDeactiveController', AccountDeactiveController);

  AccountDeactiveController.$inject = ['$scope', 'accountService', 'sessionService'];

  /** @ngInject */
  function AccountDeactiveController($scope, accountService, sessionService) {
    var vm = this;
    vm.me = {};

    activate();

    function activate() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
      }, function(error) {
        vm.me = {};
      });
    }

    /**
    * Save profile
    */
    vm.deactive = function() {

    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
