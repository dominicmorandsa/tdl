/* App Module */
angular.module('tdlApp', [])
  .controller('TDLController', function($scope) {

    $scope.getTodos = function() {

      if (localStorage.length != 0) 
        {
          return JSON.parse(localStorage.getItem('tdl'));
        } else {
          return [];
        }

      return JSON.parse(localStorage.getItem('tdl'));
    }

    $scope.todos = $scope.getTodos();
    $scope.filterShow = null;
    $scope.show = 'all';
    $scope.help = false;
    $scope.edit = null;
    $scope.index = 0;
    $scope.priorities = [            //Name/Value for priorities
      {name:'H', value:'0'},
      {name:'M', value:'1'},
      {name:'L', value:'2'}
      ]; 
    $scope.todoPriorityValue = 2;
    $scope.myPriority = $scope.priorities[2];
    
// Add todo to list
    $scope.addTodo = function() {
      if ($scope.todoTitle) {        // not empty
        $scope.todos.push({
          title:$scope.todoTitle, 
          complete:false,
          priorityName:$scope.myPriority.name,
          priorityValue:$scope.myPriority.value
        });
      };      
      $scope.todoTitle = '';         // clear input
      
      $scope.saveTodos($scope.todos);  // save to localStorage
    };


// Edit todo item
    $scope.editTodo = function(todo, index) {
      $scope.edit = "editing";       // show edit form
      $scope.index = $scope.todos.indexOf(todo);
      $scope.todoTitle = todo.title;
      $scope.todoPriorityValue = todo.priorityValue;
      $scope.myPriority = $scope.priorities[todo.priorityValue];
    };

// Update todo item
    $scope.updateTodo = function(todo) {
      $scope.todos[$scope.index].title = $scope.todoTitle;
      $scope.todos[$scope.index].priorityName = $scope.myPriority.name;
      $scope.todos[$scope.index].priorityValue = $scope.myPriority.value;
      $scope.edit = null;                // hide edit form
      $scope.saveTodos($scope.todos);  // save to localStorage
      $scope.todoTitle = '';
    };

// Update todo complete status
    $scope.completeTodo = function(todo) {
      $scope.index = $scope.todos.indexOf(todo);
      $scope.todos[$scope.index].complete = todo.complete;
      $scope.saveTodos($scope.todos);  // save to localStorage
    };

// Cancel update todo item
    $scope.cancelUpdateTodo = function() {      
      $scope.edit = null;                 // hide edit form
      $scope.todoTitle = '';
    };

// Delete todo item
    $scope.deleteTodo = function(todo) {
      $scope.todos.splice($scope.todos.indexOf(todo),1);
      $scope.saveTodos($scope.todos);  // save to localStorage
    };

// Filter todos by selector
    $scope.filterTodo = function(todo) {
      if ($scope.show =='all') {
        return true;
      } else if ($scope.show =='done' && todo.complete == true) {
        return true;
      } else if ($scope.show == 'notdone' && todo.complete == false) {
        return true;
      } else {
        return false;
      }      
    };

// Save todos to localStorage
  $scope.saveTodos = function(data) {
    localStorage.setItem('tdl', JSON.stringify(data));
  }

});