(function(){
  angular
    .module('searchForm',[])
    .controller('SearchFormController', SearchFormController)
    .config(routeConfig);


  function SearchFormController(){
    var store = this;
    this.autoFill = [];

    $('#beer1,#beer2,#beer3').autocomplete({
      source: function(req, res){
        $.getJSON({
          url:`https://dax-cors-anywhere.herokuapp.com/https://brew_hound.rhobota.com/v1.0.0/autocomplete?q=${req.term}`,
          success: function(results){
            store.autoFill.beers = results.response;
            res(results.response);
          }
        })
      },
      minLength:3
    });
  }
  function routeConfig($routeProvider,$locationProvider){
    $routeProvider
      .when('/search',{
        templateUrl:'/views/index/search.html',
        controller:'SearchFormController',
        controllerAs:'search'
      })

    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
  }
})();
