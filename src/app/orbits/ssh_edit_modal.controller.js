(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('SSHEditModalController', SSHEditModalController);

  /** @ngInject */
  SSHEditModalController.$inject = ['$scope', '$uibModalInstance', 'sessionService', 'ssh'];

  function SSHEditModalController($scope, $uibModalInstance, sessionService, ssh) {
    var vm = this;
    vm.ssh = {};

    activate();

    function activate() {
      vm.ssh = ssh;
    }

    vm.updateKey = function() {
      sessionService.updateSSH(vm.ssh).then(function(response) {
        $uibModalInstance.close(null);
      }, function(error) {
        $uibModalInstance.close(error);
      });
    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
