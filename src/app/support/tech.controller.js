(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('TechSupportController', TechSupportController);

  TechSupportController.$inject = ['$scope', '$state', 'sessionService'];

  /** @ngInject */
  function TechSupportController($scope, $state, sessionService) {
    var vm = this;
    vm.me = {};

    activate();

    function activate() {
      sessionService.getUserInfo().then(function(response) {
        vm.me = response;
      }, function(error) {
        vm.me = {};
      });
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
