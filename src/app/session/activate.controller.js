(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('ActivateController', ActivateController);

  /** @ngInject */
  ActivateController.$inject = ['$scope', '$state', '$stateParams', 'sessionService'];

  function ActivateController($scope, $state, $stateParams, sessionService) {
    var vm = this;
    vm.tokenInfo = {};
    vm.activated = true;
    vm.message = {};

    activate();

    function activate() {
      vm.tokenInfo.uid = $state.params.uid;
      vm.tokenInfo.token = $state.params.token;

      sessionService.activate(vm.tokenInfo).then(function(response) {
        sessionService.setToken(response.auth_token);
        $state.go('account.profile', {activated: true});
      }, function(error) {
        vm.activated = false;
        sessionService.setToken(null);
      });
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
