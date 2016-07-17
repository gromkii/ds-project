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
  var store = this;

  this.data = [
    {
      name : 'Brews',
      collapse: false,

      description:'Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I’m never giving up, I’m just getting started. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Congratulations, you played yourself.',

      beers : [
        {name:'tasty', img:'http://placecage.com/150/150'},
        {name:'decent', img:'http://fillmurray.com/150/150'},
        {name:'gross', img:'http://stevensegallery.com/150/150'}
      ],
      rating: 4.3
    },
    {
      name: 'Brew 2',
      collapse: true,

      description:'Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I’m never giving up, I’m just getting started. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Congratulations, you played yourself.',

      beers:[
        {name:'gross'},
         {name:'worse'}
       ],
      rating: 2
    },
    {
      name : 'Brews',
      collapse: false,

      description:'Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I’m never giving up, I’m just getting started. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Congratulations, you played yourself.',

      beers : [
        {name:'tasty', img:'http://placecage.com/150/150'},
        {name:'decent', img:'http://fillmurray.com/150/150'},
        {name:'gross', img:'http://stevensegallery.com/150/150'}
      ],
      rating: 4.3
    },
    {
      name : 'Brews',
      collapse: false,

      description:'Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I’m never giving up, I’m just getting started. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Congratulations, you played yourself.',

      beers : [
        {name:'tasty', img:'http://placecage.com/150/150'},
        {name:'decent', img:'http://fillmurray.com/150/150'},
        {name:'gross', img:'http://stevensegallery.com/150/150'}
      ],
      rating: 4.3
    }
  ];

  this.expand = function(brew){
    if (brew.collapse === true){
      brew.collapse = false;
    } else {
      brew.collapse = true;
    }
  }

  console.log($routeParams);
  // $http({
  //   method:'GET',
  //   url:`http://ec2-54-235-57-99.compute-1.amazonaws.com:5000/v1.0.0/location_only_recommendation?city%2Cstate=${$routeParams.body.locationOnly}`
  // }).then(function(results){
  //   console.log(results.data);
  // });
}]);
