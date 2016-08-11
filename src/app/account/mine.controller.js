(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('AccountMineController', AccountMineController);

  AccountMineController.$inject = ['$scope', 'accountService', 'sessionService', 'elemFocusService'];

  /** @ngInject */
  function AccountMineController($scope, accountService, sessionService, elemFocusService) {
    var vm = this;
    vm.me = {}
    vm.profileEmail = {};
    vm.profilePassword = {};
    vm.message = {};

    activate();

    function activate() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
        vm.profileEmail = angular.copy(vm.me);
      }, function(error) {
        vm.me = {}
        vm.profileEmail = {};
        vm.profilePassword = {};
      });
    }

    vm.saveEmail = function() {
      if (vm.profileEmail.email == vm.profileEmail.emailConfirm) {
        sessionService.updateUserInfo(vm.profileEmail).then(function(response) {
          vm.me = response.plain();
          vm.profileEmail = angular.copy(vm.me);
        });
      }
    }

    vm.savePassword = function() {
      sessionService.updatePassword(vm.profilePassword).then(function(response) {
        vm.message = {'success': 'Password has been updated.'};
        vm.profilePassword = {};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
          elemFocusService.setFocus('message');
        });
      });
    }

    /**
    * Discard email changes on the form
    */
    vm.cancelEmail = function () {
      vm.profileEmail = angular.copy(vm.me);
    }

    /**
    * Discard password changes on the form
    */
    vm.cancelPassword = function () {
      vm.profilePassword = {};
    }

    vm.checkEmail = function () {
      vm.correctEmail = vm.profileEmail.email == vm.profileEmail.emailConfirm;
    }

    vm.checkPassword = function () {
      vm.correctPassword = vm.profilePassword.new_password == vm.profilePassword.re_new_password;
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
