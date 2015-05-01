'use strict';

/* Controllers */

var tdlControllers = angular.module('tdlControllers', []);

tdlControllers.controller('TodoListCtrl', ['$scope', 'Todo',
  function($scope, Todo) {
    //console.log(Todo);
    $scope.todos = Todo.query();
    console.log('in controller List', $scope.todos);
    $scope.orderProp = 'priority';
  }]);

tdlControllers.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todo',
  function($scope, $routeParams, Todo) {
    console.log('in controller Detail', $routeParams);
    console.log($scope, '-', $scope.todos);
    $scope.todos = Todo.query();
    $scope.todoId = $routeParams;
    console.log('--------------->', $scope.todoId.todoId);
    // var x = Todo.query();
    // console.log('--------', x[0];
    console.log($scope, '-', $scope.todos,'-', $scope.todos);
    //console.log('scope.todos',$scope.todos, $scope.todos[0].title);
    // $scope.todo = Todo.get({todoId: $routeParams.todoId}, function(todo) {
    //   $scope.mainImageUrl = todo.images[0];
    // });
    $scope.todod = $scope.todos[$routeParams.todoId];
    // $scope.dtitle = $scope.todos[0].title;
    console.log('>>>>', $scope.todod,$routeParams.todoId );
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
