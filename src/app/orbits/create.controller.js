(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('OrbitCreateController', OrbitCreateController);

  OrbitCreateController.$inject = ['$scope', 'sessionService', 'orbitService', 'elemFocusService'];

  /** @ngInject */
  function OrbitCreateController($scope, sessionService, orbitService, elemFocusService) {
    var vm = this;
    vm.orbit = {
      availability_zone: 'nova', // This is hard-coded
      volume: 0,
      ssh_key_value: 0,
    };
    vm.images = [];
    vm.flavors = [];
    vm.flavor = {};
    vm.ssh_key = {};
    vm.hddList = [20, 40, 80, 160, 500, 1000];
    vm.sentRequest = false;
    vm.me = {};

    activate();

    function activate() {
      // Get user information from server
      sessionService.getUserInfo().then(function(response) {
        vm.me = response.plain();
      }, function(error) {
        vm.me = {};
      });

      // Get all images
      orbitService.getImages().then(function(response) {
        vm.images = response;
      }, function(error) {
        vm.images = [];
      })

      // Get available flavors
      orbitService.getFlavors().then(function(response) {
        vm.flavors = response;
      }, function(error) {
        vm.flavors = [];
      })
    }

    // Update selected OS image
    vm.selectImage = function(image) {
      angular.forEach(vm.images, function(value) {
        value[2] = false;
      });

      image[2] = true;
      vm.orbit.image = image[0];
    }

    // Send create MV request
    vm.createOrbit = function() {
      vm.sentRequest = true;

      vm.orbit.ram = vm.flavor.ram;
      vm.orbit.vcpus = vm.flavor.vcpus;
      vm.orbit.ssh_key_value = vm.ssh_key.keyvalue;

      orbitService.create(vm.orbit).then(function(response) {
        vm.sentRequest = false;
        vm.message = {success: 'New Orbit was created.'};
        elemFocusService.setFocus('message');
      }, function(error) {
        vm.sentRequest = false;

        vm.message = {error: ''};
        angular.forEach(error.data, function(value, key) {
          vm.message.error = value;
        });
        elemFocusService.setFocus('message');
      })
    }

    vm.cancelOrbit = function() {
      vm.orbit = {
        availability_zone: 'nova', // This is hard-coded
        volume: 0,
        ssh_key_value: 0,
      };
    }

    vm.closeAlert = function() {
      vm.message = {};
    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
