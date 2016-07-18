var app = angular.module('brewApp', ['ngRoute', 'ngAnimate']);

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

app.directive('navbar',['Locations', function(Locations){
  return {
    restrict:'E',
    templateUrl:'/views/partials/navbar.html',
    controller: function($routeParams){
      console.log();
      var store = this;
      this.submit = function(){
        Locations.locationsOnly(form.locationOnly).success(function(results){
          console.log(results);
        })
      }
    }
  }
}]);

app.controller("IndexController", function(){
  this.greeting = "Connection test.";
});

app.controller("SearchFormController", function(){
  this.greeting = "Greetings another page."
});

app.controller("ResultsController", ['$http','$routeParams', function($http, $routeParams){
  var store = this;
  this.found = true;

  if ($routeParams){
    $http({
      method:'GET',
      url:`https://dax-cors-anywhere.herokuapp.com/http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/location_only_recommendation?city%2Cstate=${$routeParams.locationOnly}`
    }).then(function(results){
      if (results.data.brewery_results){
        store.found = true;
        store.data = results.data.brewery_results;
      } else {
        this.found = false;
      }
    });
  } else {
    this.found = false;
  }

  this.expand = function(brew){
    if (brew.collapse === true){
      brew.collapse = false;
    } else {
      brew.collapse = true;
    }
  }
}]);

app.factory('Locations', ['$http', function($http){
  return {
    locationsOnly: function(zipCode){
      return $http({
        method:'GET',
        url:`http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/location_only_recommendation?city%2Cstate=${zipCode}`
      });
    }

  }
}]);
