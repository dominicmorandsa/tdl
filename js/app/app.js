/* App Module */
angular.module('tdlApp', [])
  .controller('TDLController', function($scope) {
    
    // $scope.todos = [
    //   {title:'first thing to do', complete:false, priorityValue:"0"},
    //   {title:'second thing to do', complete:false, priorityValue:"1"},
    //   {title:'third thing to do', complete:false, priorityValue:"2"}
    // ];
    $scope.getTodos = function() {
      //localStorage.removeItem('tdl');
      //console.log(JSON.parse(localStorage.getItem('tdl')));

      console.log(localStorage.length);
      if (localStorage.length != 0) 
        {
          return JSON.parse(localStorage.getItem('tdl'));
        } else {
          return [];
        }
      console.log([]);
      console.log(JSON.parse(localStorage.getItem('tdl')));
      return JSON.parse(localStorage.getItem('tdl'));
    }

    $scope.todos = $scope.getTodos();
    $scope.filterShow = null;
    $scope.show = 'all';
    $scope.sort = null;
    $scope.edit = null;
    $scope.index = 0;
    $scope.priorities = [            //Name/Value for priorities
      {name:'H', value:'0'},
      {name:'M', value:'1'},
      {name:'L', value:'2'}
      ]; 
    $scope.todoPriorityValue = 2;
    $scope.myPriority = $scope.priorities[2];
    console.log($scope.myPriority.value);
    console.log($scope.myPriority.name);
    
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
      console.log(todo);
      $scope.edit = "editing";       // show edit form
      $scope.index = $scope.todos.indexOf(todo);
      console.log($scope.index);
      $scope.todoTitle = todo.title;
      $scope.todoPriorityValue = todo.priorityValue;
      $scope.myPriority = $scope.priorities[todo.priorityValue];
      console.log($scope.myPriority.value, $scope.myPriority.name);
      //$scope.todoPriorityValue = todo.priorityValue;

    };

// Update todo item
    $scope.updateTodo = function(todo) {      
      console.log('...in updateTodo', $scope.todoPriorityValue);
      console.log('..>>>', $scope.myPriority.value, $scope.myPriority.name);
      $scope.todos[$scope.index].title = $scope.todoTitle;
      //$scope.todos[$scope.index].complete = $scope.todoComplete;
      //$scope.todos[$scope.index].priorityName = $scope.todoPriorityName;
      console.log('---> ', $scope.todoPriorityValue, $scope.index);
      $scope.todos[$scope.index].priorityName = $scope.myPriority.name;
      $scope.todos[$scope.index].priorityValue = $scope.myPriority.value;
      $scope.edit = null;                // hide edit form
      $scope.saveTodos($scope.todos);  // save to localStorage
      $scope.todoTitle = '';
    };

// Cancel update todo item
    $scope.cancelUpdateTodo = function() {      
      //console.log('...in cancelUpdateTodo', $scope.todoTitle, $scope.index);
      //console.log($scope.todos);
      $scope.edit = null;                 // hide edit form
      $scope.todoTitle = '';
    };

// Delete todo item
    $scope.deleteTodo = function(todo) {
      //console.log('...in deleteTodo',$scope.todos.indexOf(todo));
      $scope.todos.splice($scope.todos.indexOf(todo),1);
      //console.log($scope.todos);
      $scope.saveTodos($scope.todos);  // save to localStorage
    };

// Filter todos by selector
    $scope.filterTodo = function(todo) {
      //console.log(todo, $scope.show, todo.complete);
      
      if ($scope.show =='all') {
        return true;
      } else if ($scope.show =='done' && todo.complete == true) {
        return true;
      } else if ($scope.show == 'notdone' && todo.complete == false) {
        return true;
      } else {
        return false;
      }

      console.log($scope.todos);
    };

// Save todos to localStorage
  $scope.saveTodos = function(data) {
    localStorage.setItem('tdl', JSON.stringify(data));
  }

// Get todos from localStorage
  // $scope.getTodos = function() {
  //   return JSON.parse(localStorage.getItem('tdl'));

  // }
// console.log($scope.todos[0].priority);
// console.log($scope.priorities[1]);
  });