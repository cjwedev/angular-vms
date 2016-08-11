(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('TermsModalController', TermsModalController);

  /** @ngInject */
  TermsModalController.$inject = ['$scope', '$uibModalInstance'];

  function TermsModalController($scope, $uibModalInstance) {
    var vm = this;

    activate();

    function activate() {
    }

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.close();
    };
  }
})();
