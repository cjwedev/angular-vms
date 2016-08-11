(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('ContactSupportController', ContactSupportController);

  ContactSupportController.$inject = ['$scope', '$state', 'sessionService'];

  /** @ngInject */
  function ContactSupportController($scope, $state, sessionService) {
    var vm = this;
    vm.me = {};

    activate();

    function activate() {
      sessionService.getUserInfo().then(function(response) {
        vm.me = response;
      }, function(error) {
        vm.me = {};
      });
    }

    /*
    * send contact email
    */
    vm.contactSupport = function() {

    }

    $scope.$watch(angular.bind(this, function() {
      return this.me;
    }), function(newVal, oldVal) {
      $scope.$emit("profile.update", vm.me);
    })
  }
})();
