(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('SessionController', sessionController);

  /** @ngInject */
  sessionController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', '$uibModal', 'sessionService'];

  function sessionController($scope, $state, $rootScope, $stateParams, $uibModal, sessionService) {
    var vm = this;
    vm.user = {};
    vm.errorMessage = null;
    vm.correctPassword = true;

    activate();

    function activate() {
      vm.user.username = $state.params.username;
      vm.user.email = $state.params.email;
    }

    /**
    * Register
    */
    vm.register = function() {
      // If password confirmation is correct, create user account
      if (vm.user.password == vm.user.confirm_password) {
        sessionService.register(vm.user).then(function(response) {
          vm.message = {success: 'Please activate your account to sign in the system.'};
          vm.user = {}
        }, function(error) {
          sessionService.setToken(null);

          vm.message = {error: ''};
          angular.forEach(error.data, function(value, key) {
            vm.message.error = value[0];
          });
        });
      }
    }

    /**
    * Login
    */
    vm.login = function() {
      sessionService.login(vm.user).then(function(response) {
        sessionService.setToken(response.auth_token);
        $rootScope.token = response.auth_token;

        $state.go('dashboard');
      }, function(error) {
        sessionService.setToken(null);
        delete $rootScope.token;

        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
      });
    }

    /**
    * Reset request
    */
    vm.resetRequest = function() {
      sessionService.resetRequest(vm.user).then(function(response) {
        $state.go('auth.reset-confirm');
      });
    }

    /**
    * Reset password
    */
    vm.resetPassword = function() {
      vm.user.uid = $state.params.uid;
      vm.user.token = $state.params.token;
      sessionService.resetPassword(vm.user).then(function(response) {
        $state.go('auth.reset-confirm');
      }, function (error) {
        $state.go('auth.reset-failed', {uid: vm.user.uid, token: vm.user.token});
      });
    }

    /**
    * Go to reset password page back
    */
    vm.tryReset = function() {
      $state.go('auth.reset', {uid: vm.user.uid, token: vm.user.token});
    }

    /*
    * Check if password and confirm password are equal
    */
    vm.checkPassword = function () {
      vm.correctPassword = vm.user.password == vm.user.confirm_password;
    }

    /*
    * Show terms modal
    */
    vm.showModal = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/session/terms_modal.html',
        controller: 'TermsModalController',
        controllerAs: 'termsModalCtrl'
      });
    };
  }
})();
