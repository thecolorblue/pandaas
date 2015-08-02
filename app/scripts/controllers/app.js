
angular.module('pandoc')
  .controller('appController', [
  '$scope',
  function ($scope) {
    $scope.editorText = '';

    $scope.$watch('file', function(value) {
      if(value && typeof value === 'string') {
        $scope.editorText = value;
      }
    });
  }]);
