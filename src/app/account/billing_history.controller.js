(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('BillingHistoryController', BillingHistoryController);

  BillingHistoryController.$inject = ['$scope', 'invoiceService', 'sessionService', '$uibModal'];

  /** @ngInject */
  function BillingHistoryController($scope, invoiceService, sessionService, $uibModal) {
    var vm = this;
    vm.me = {};
    vm.invoiceList = [];
    vm.orderBy = 'created_at';

    activate();

    function activate() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
      }, function(error) {
        vm.me = {};
      });

      invoiceService.invoiceList().then(function(response) {
        vm.invoiceList = response;
      }, function(error) {
        vm.invoiceList = [];
      });
    }

    vm.orderNewest = function() {
      vm.orderBy = 'created_at';
    }

    vm.orderOldest = function() {
      vm.orderBy = '-created_at';
    }

    /*
    * Show invoice detail modal
    */
    vm.showDetail = function(invoice) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/account/invoice_modal.html',
        controller: 'InvoiceModalController',
        controllerAs: 'invoiceCtrl',
        resolve: {
          invoice: function () {
            return invoice;
          }
        }
      });
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
