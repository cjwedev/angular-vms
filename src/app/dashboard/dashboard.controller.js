(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('DashboardController', dashboardController);

  dashboardController.$inject = ['$scope', '$state', 'sessionService'];

  /** @ngInject */
  function dashboardController($scope, $state, sessionService) {
    var vm = this;
    vm.me = {};
    vm.message = {};

    activate();

    function activate() {
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
      }, function(error) {
        vm.me = {};
      });
    }

    vm.newOrbit = function () {
      $state.go('orbits.create');
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
