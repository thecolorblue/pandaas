
angular.module('pandoc')
  .service('pandoc', ['$http', function($http) {
  	return {
      export: function(text, format){
        return $http.post('/api/export', {
            md: text,
            format: format
          })
          .error(function(){});
      },
      import: function(file, format) {
         var fd = new FormData();
        fd.append('import', file);
        fd.append('format', format);
        return $http.post('/api/import', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
          })
          .error(function(){});
      }
    }
  }]);
