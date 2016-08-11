(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('AccountProfileController', AccountProfileController);

  AccountProfileController.$inject = ['$scope', '$state', '$stateParams', 'accountService', 'sessionService', 'elemFocusService'];

  /** @ngInject */
  function AccountProfileController($scope, $state, $stateParams, accountService, sessionService, elemFocusService) {
    var vm = this;
    vm.me = {};
    vm.profileOrigin = {};
    vm.profile = {};
    vm.profilePicture = null;
    vm.activated = false;
    vm.message = {};

    activate();

    function activate() {
      vm.activated = $stateParams.activated;
      if (vm.activated) {
        vm.message = {'success': 'Your account has been initialized however we need the following details for activation'};
      }
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
        vm.profileOrigin = angular.copy(vm.me.profile);
        if (vm.profileOrigin == null) vm.profileOrigin = {};
        vm.profile = angular.copy(vm.profileOrigin);
      }, function(error) {
        vm.me = {};
        vm.profileOrigin = {};
        vm.profile = {};
      });
    }

    /**
    * Save profile
    */
    vm.saveProfile = function() {
      sessionService.updateProfile(vm.profile, vm.profilePicture).then(function(response) {
        vm.profileOrigin = response.plain();
        vm.profile = angular.copy(vm.profileOrigin);
        vm.message = {'success': 'Your profile was updated.'};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.message = {'error': 'Failed to save your profile.'};
        elemFocusService.setFocus('message');
      });
    }

    /**
    * Discard profile on the form
    */
    vm.cancelProfile = function() {
      vm.profile = angular.copy(vm.profileOrigin);
    }

    vm.closeAlert = function() {
      vm.message = {};
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
