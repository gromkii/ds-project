(function(){
  angular
    .module('brewApp', ['ngRoute','results','searchForm'])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider,$locationProvider){
      $routeProvider
        .when('/', {
          templateUrl:'/views/index/index.html',
        });

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();
