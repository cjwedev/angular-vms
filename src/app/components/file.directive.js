(function() {
  'use strict';

  // Constellation API endpoints
  angular
    .module('stargaze')
    .directive('fileread', fileread);

    function fileread() {
      return {
        scope: {
          fileread: "="
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            scope.$apply(function () {
              scope.fileread = changeEvent.target.files[0];
              // or all selected files:
              // scope.fileread = changeEvent.target.files;
            });
          });
        }
      }
    }
})();
