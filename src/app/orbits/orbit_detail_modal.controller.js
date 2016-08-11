(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('OrbitDetailModalController', OrbitDetailModalController);

  /** @ngInject */
  OrbitDetailModalController.$inject = ['$scope', '$uibModalInstance', 'orbit'];

  function OrbitDetailModalController($scope, $uibModalInstance, orbit) {
    var vm = this;
    vm.orbit = {};

    activate();

    function activate() {
      vm.orbit = orbit;
    }

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.close();
    };
  }
})();
