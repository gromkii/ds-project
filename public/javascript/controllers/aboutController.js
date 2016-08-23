(function(){
  angular
    .module('about', [])
    .config(routeConfig)
    .controller('AboutController',AboutController);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];
    AboutController.$inject = [];

    function routeConfig($routeProvider, $locationProvider){
      $routeProvider
        .when('/about', {
          templateUrl:'/views/index/about.html',
          controller:'AboutController',
          controllerAs:'about'
        })

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      })
    }

    function AboutController(){
      var store = this;

      store.greeting = 'hello';
    }
})();
