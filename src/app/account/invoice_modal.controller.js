(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('InvoiceModalController', InvoiceModalController);

  /** @ngInject */
  InvoiceModalController.$inject = ['$scope', '$uibModalInstance', 'invoice'];

  function InvoiceModalController($scope, $uibModalInstance, invoice) {
    var vm = this;
    vm.invoice = {};

    activate();

    function activate() {
      vm.invoice = invoice;
    }

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.close();
    };
  }
})();
