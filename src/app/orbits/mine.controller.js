(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('OrbitMineController', OrbitMineController);

  OrbitMineController.$inject = ['$scope', 'sessionService', 'orbitService', '$uibModal', 'elemFocusService'];

  /** @ngInject */
  function OrbitMineController($scope, sessionService, orbitService, $uibModal, elemFocusService) {
    var vm = this;
    vm.me = {}
    vm.orbitList = [];
    vm.message = {};

    activate();

    function activate() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response;
      }, function(error) {
        vm.me = {};
      });

      orbitService.all().then(function(response) {
        vm.orbitList = response;
      }, function (error) {
        vm.orbitList = [];
      })
    }

    /*
    * Show/Hide Orbit detail by clicking the row
    */
    vm.selectOrbit = function(orbit) {
      if (orbit.selected) {
        orbit.selected = false;
      } else {
        orbit.selected = true;
      }
    }

    /*
    * Show orbit detail modal
    */
    vm.showDetail = function(orbit) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/orbits/orbit_detail_modal.html',
        controller: 'OrbitDetailModalController',
        controllerAs: 'orbitCtrl',
        resolve: {
          orbit: function () {
            return orbit;
          }
        },
        windowClass: 'detail-modal'
      });
    }

    /*
    * Delete Orbit
    */
    vm.deleteOrbit = function(orbit) {
      orbitService.deleteOrbit(orbit.openstack_id).then(function(response) {
        vm.message = {success: 'Orbit was removed.'};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
        elemFocusService.setFocus('message');
      })
    }

    /*
    * Start Orbit
    */
    vm.startOrbit = function(orbit) {
      orbitService.startOrbit(orbit.openstack_id).then(function(response) {
        vm.message = {success: response};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
        elemFocusService.setFocus('message');
      })
    }

    /*
    * Pause Orbit
    */
    vm.pauseOrbit = function(orbit) {
      orbitService.pauseOrbit(orbit.openstack_id).then(function(response) {
        vm.message = {success: response};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value[0];
        });
        elemFocusService.setFocus('message');
      })
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
