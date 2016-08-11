(function() {
  'use strict';

  // Constellation API endpoints
  angular
    .module('stargaze')
    .factory('elemFocusService', elemFocusService);

  elemFocusService.$inject = ['$timeout', '$window'];

  function elemFocusService($timeout, $window) {
    var service = {
      setFocus: setFocus
    }

    return service;

    function setFocus(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.scrollIntoView({block: "end", behavior: "smooth"});
      });
    }
  }
})();
