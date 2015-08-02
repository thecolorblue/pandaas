window.angular = require('angular');
var $ = require('jQuery');

module.exports = angular
  .module('pandoc', [])
  .directive('pdUpload', ['$parse', 'pandoc', function ($parse, pandoc) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.pdUpload);
        var modelSetter = model.assign;

        element.bind('change', function(){
          pandoc.import(element[0].files[0], scope[attrs.pdFormat])
            .success(function(response) {
              modelSetter(scope, response);
            });
        });
      }
    };
  }])
  .directive('pdExport', ['$parse', 'pandoc', function ($parse, pandoc) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function(){
          pandoc.export(scope[attrs.pdExport], scope[attrs.pdFormat])
            .success(function(url) {
              $('body').append('<iframe src="' + url + '" style="display: none;"></iframe>');
            });
        });
      }
    };
  }])
  .directive('pdApp', function() {
    return {
      restrict: 'A',
      template: require('../views/app.html'),
      controller: 'appController'
    };
  });
