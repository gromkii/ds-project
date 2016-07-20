var app = angular.module('brewApp', ['ngRoute', 'ngAnimate']);

app.config(($routeProvider,$locationProvider, $httpProvider) => {
  $routeProvider
    .when('/', {
      templateUrl:'/views/index/index.html',
      controller:'IndexController',
      controllerAs:'index'
    })

    .when('/search',{
      templateUrl:'/views/index/search.html',
      controller:'SearchFormController',
      controllerAs:'search'
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
      var store = this;
    }
  }
}]);

app.controller("IndexController", function(){
  this.greeting = "Connection test.";
});

app.controller("SearchFormController", function(){
  var store = this;
  this.autoFill = [];

  $('#beer1,#beer2,#beer3').autocomplete({
    source: function(req, res){
      $.getJSON({
        url:`http://dax-cors-anywhere.herokuapp.com/http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/autocomplete?q=${req.term}`,
        success: function(results){
          store.autoFill.beers = results.response;
          res(results.response);
        }
      })
    },
    minLength:3
  });
});

app.controller("ResultsController", ['$http','$routeParams', 'Locations', function($http, $routeParams, Locations){
  var store = this;
  this.found = true;

  if (!$routeParams.beer1){
    // TODO: make this call without using cors-anywhere. It's hacky and bad.
    Locations.locationOnly($routeParams.locationOnly).success(function(results){
      if (results.brewery_results){
        store.found = true;
        store.data = results.brewery_results;
        Locations.showMap(store.data[0].location.lon, store.data[0].location.lat);
      } else {
        this.found = false;
      }
    });
  } else if ($routeParams.beer1){
    Locations.locationAndBeer($routeParams).success(function(results){
      console.log(results.response);
      if (results.response){
        store.data = results.response;
        console.log(store.data.length);
        Locations.showMap(store.data[0].long, store.data[0].lat);
      } else {
        this.found = false;
      }
    });
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
    locationOnly: function(zipCode){
      return $http({
        method:'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        url:`http://dax-cors-anywhere.herokuapp.com/http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/location_only_recommendation?city%2Cstate=${zipCode}`
      });
    },
    locationAndBeer: function(form){
      return $http({
        method:'GET',
        url:`http://dax-cors-anywhere.herokuapp.com/http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/make_recommendation?preferred_beers=%5B'${form.beer1}'%2C%20'${form.beer2}'%2C%20'${form.beer3}'%5D&location=${form.city}`
      });
    },
    showMap:function(longi, lati){
      mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvbWtpaSIsImEiOiJjaXFzYjNkMmswMnN5ZnlubnY3dzhxNnhxIn0.20bB0tw4QqbThJkaDj4Dxg';

      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/basic-v9',
          zoom: 13,
          center: [longi, lati]
      });

      return map;
    },
    showPoints:function(resultsArray){
      // Loop through resultsArray
        // Use each longitutde and latitude to make a new point on the map.

      // Return the collection of points to place.
    }

  }
}]);
