var app = angular.module('brewApp', ['ngRoute']);

app.config(($routeProvider,$locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl:'/views/index/index.html',
      controller:'IndexController',
      controllerAs:'index'
    })

    .when('/search',{
      templateUrl:'/views/index/search.html',
      controller:'SearchFormController',
      controllerAs:'searchForm'
    })

    .when('/results',{
      templateUrl:'/views/index/results.html',
      controller:'ResultsController',
      controllerAs:'results'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
})

app.directive('navbar',function(){
  return {
    restrict:'E',
    templateUrl:'/views/partials/navbar.html'
  }
})

app.controller("IndexController", function(){
  this.greeting = "Connection test.";
});

app.controller("SearchFormController", function(){
  this.greeting = "Greetings another page."
});

app.controller("ResultsController", ['$http','$routeParams', function($http, $routeParams){
  this.data =
    {
      [{
        name : 'Brews',
        beers : [
          'tasty',
          'decent',
          'gross'
        ],
        rating: 4.3
      }, {
        name: 'Brew 2',
        beers:[
          'gross',
           'worse'
         ],
        rating: 2
    }]
  };
}]);
