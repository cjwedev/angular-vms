(function() {
  'use strict';

  angular
    .module('stargaze')
    .factory('orbitService', orbitService);

  orbitService.$inject = ['$rootScope', 'tangentRestangular'];

  function orbitService($rootScope, tangentRestangular) {
    var service = {
      create: create,
      getImages: getImages,
      getFlavors: getFlavors,
      all: all,
      deleteOrbit: deleteOrbit,
      startOrbit: startOrbit,
      pauseOrbit: pauseOrbit
    };

    // Invoke constellation API endpoints
    var vms = tangentRestangular.all('vms');

    return service;
    ////////////////////////////////////////////

    /**
    * Retrieve all images
    */
    function getImages() {
      return vms.get('images');
    }

    /**
    * Retrieve all flavors
    */
    function getFlavors() {
      return vms.get('flavors');
    }

    /**
    * Register user
    */
    function create(orbitInfo) {
      return vms.customPOST($.param(orbitInfo), undefined, undefined, {});
    }

    /**
    * Get all VMs
    */
    function all() {
      return vms.getList();
    }

    /*
    * Delete Orbit
    */
    function deleteOrbit(vm_stack_id) {
      var param = {vms_id: vm_stack_id};
      return vms.all('delete_vms').post($.param(param));
    }

    /*
    * Start Orbit
    */
    function startOrbit(vm_stack_id) {
      var param = {vms_id: vm_stack_id};
      return vms.all('start_vms').post($.param(param));
    }

    /*
    * Pause Orbit
    */
    function pauseOrbit(vm_stack_id) {
      var param = {vms_id: vm_stack_id};
      return vms.all('pause_vms').post($.param(param));
    }
  }
})();
