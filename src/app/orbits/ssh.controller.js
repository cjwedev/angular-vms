(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('SshController', SshController);

  SshController.$inject = ['$scope', 'sessionService', 'orbitService', '$uibModal'];

  /** @ngInject */
  function SshController($scope, sessionService, orbitService, $uibModal) {
    var vm = this;
    vm.me = {}
    vm.ssh = {};
    vm.message = {};

    activate();

    function getMe() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response;
      }, function(error) {
        vm.me = {};
      });
    }

    function activate() {
      getMe();
    }

    /*
    * Create ssh key
    */
    vm.createKey = function() {
      sessionService.addSSH(vm.ssh).then(function(response) {
        vm.message = {success: 'SSH Key was added.'};
        vm.ssh = {};
        // Retrieve ssh key list
        getMe();
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
      })
    }

    /*
    * Delete SSH key
    */
    vm.deleteKey = function(keyID) {
      sessionService.deleteSSH(keyID).then(function(response) {
        vm.message = {success: 'SSH Key was deleted.'};

        getMe();
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
      })
    }

    vm.showEditModal = function(key) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/orbits/ssh_edit_modal.html',
        controller: 'SSHEditModalController',
        controllerAs: 'sshEditCtrl',
        resolve: {
          ssh: function () {
            return key;
          }
        },
        windowClass: 'detail-modal'
      });

      modalInstance.result.then(function(error) {
        if (error != null) {
          vm.message = {error: ''};
          angular.forEach(error.data, function(value, key) {
            vm.message.error = value[0];
          });
        } else {
          vm.message = {success: 'SSH Key was updated.'};
        }
      });
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    });

    vm.closeAlert = function() {
      vm.message = {};
    }
  }
})();
