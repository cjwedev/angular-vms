(function() {
  'use strict';

  // Constellation API endpoints
  angular
    .module('stargaze')
    .factory('constlRestangular', constlRestangular);

  constlRestangular.$inject = ['Restangular', 'localStorageService'];

  function constlRestangular(Restangular, localStorageService) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setDefaultHeaders({
        Authorization: 'Token ' + localStorageService.get('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      RestangularConfigurer.setBaseUrl('http://108.53.145.165:5000');
    });
  }

  // Ripple API endpoints
  angular
    .module('stargaze')
    .factory('rippleRestangular', rippleRestangular);

  rippleRestangular.$inject = ['Restangular', 'localStorageService'];

  function rippleRestangular(Restangular, localStorageService) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://108.53.145.165:8080');
    });
  }

  // Tangent API endpoints
  angular
    .module('stargaze')
    .factory('tangentRestangular', tangentRestangular);

  tangentRestangular.$inject = ['Restangular', 'localStorageService'];

  function tangentRestangular(Restangular, localStorageService) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setDefaultHeaders({
        Authorization: 'Token ' + localStorageService.get('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      RestangularConfigurer.setBaseUrl('http://108.53.145.165');
    });
  }
})();
