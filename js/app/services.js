'use strict';

/* Services */

var tdlServices = angular.module('tdlServices', ['ngResource']);

tdlServices.factory('Todo', ['$resource',
  function($resource){
  	console.log("in tdlServices");
    return $resource('todos/todos.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);
