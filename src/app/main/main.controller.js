(function() {
  'use strict';

  angular
    .module('stargaze')
    .controller('MainController', MainController);

  MainController.$inject = ['$timeout'];

  /** @ngInject */
  function MainController($timeout) {
    var vm = this;

    activate();

    function activate() {
    }
  }
})();
