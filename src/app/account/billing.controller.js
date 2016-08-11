(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('AccountBillingController', AccountBillingController);

  AccountBillingController.$inject = ['$scope', '$stateParams', 'accountService', 'sessionService', 'elemFocusService'];

  /** @ngInject */
  function AccountBillingController($scope, $stateParams, accountService, sessionService, elemFocusService) {
    var vm = this;
    vm.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    vm.years = [];
    vm.account = {};
    vm.me = {};
    vm.message = {};
    vm.redirect = false;

    activate();

    function activate() {
      $scope.expMonth = '00'; // don't use controller as syntax
      $scope.expYear = 0; // don't use controller as syntax

      // Show info message about redirect reason
      vm.redirect = $stateParams.redirect;
      if (vm.redirect) {
        vm.message = {'info': 'You should add credit card to manage Orbits.'};
      }

      var currentYear = new Date().getFullYear();
      for (var i = currentYear; i < currentYear + 20; i++) {
        vm.years.push(i);
      }

      vm.account.is_default = false;

      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response;
      }, function(error) {
        vm.me = {};
      });
    }

    /**
    * Stripe call back handler
    * After callback, post billing information to server API endpoint
    */
    $scope.addBillingInfo = function(status, response) {
      if (response.error) {
        vm.message = {'error': response.error.message};
      } else {
        // create new account
        vm.account.stripeToken = response.id;
        accountService.createAccount(vm.account).then(function(response) {
          if (!vm.me.credit_card) {
            vm.message = {success: 'Your account is now activated'};
          } else {
            vm.message = {success: 'Credit Card was added to your account.'};
          }
          elemFocusService.setFocus('message');
        }, function(error) {
          vm.message = {error: ''};
          angular.forEach(error.data, function(value, key) {
            vm.message.error = value[0];
            elemFocusService.setFocus('message');
          });
          elemFocusService.setFocus('message');
        });
      }
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })

    vm.closeAlert = function() {
      vm.message = {};
    }
  }
})();
