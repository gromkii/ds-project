(function(){
  angular
    .module('results',['ngRoute','brewApp'])
    .controller('ResultsController', ResultsController)
    .factory('Locations', Locations)
    .directive('navbar', navbar)
    .config(routeConfig);

    ResultsController.$inject = ['$http', '$routeParams', 'Locations'];
    Locations.$inject = ['$http']
    navbar.$inject = ['Locations'];
    routeConfig.$inject = ['$routeProvider','$locationProvider'];

    function ResultsController($http, $routeParams, Locations){
      var store = this;
      this.found = true;

      if (!$routeParams.beer1){
        Locations.locationOnly($routeParams.locationOnly)
          .success(function(results){
            if (results.brewery_results){
              if (!results.brewery_results[0].name){
                store.found = false
              } else {
                store.found = true;
                store.data = results.brewery_results;

                var map = Locations.newMap(store);
              }
            }

          }).catch(function(error){
            store.found = false;
          });
      } else if ($routeParams.beer1){
        Locations.locationAndBeer($routeParams).success(function(results){
          if (results.response){
            store.data = results.response;
            var map = Locations.showMap(store, store.data[0].long,store.data[0].lat,'long','lat');
          } else {
            store.found = false;
          }
        }).catch(function(error){
          store.found = false;
        });
      }

      this.expand = function(brew){
        if (brew.collapse === true){
          brew.collapse = false;
        } else {
          brew.collapse = true;
        }
      }

      this.getMarker = function(getDiv) {

      }

    }
    function Locations($http){
      var locationFunctions = {
        locationOnly: locationOnly,
        locationAndBeer: locationAndBeer,
        showMap:showMap,
        newMap:newMap
      }

      function locationOnly(zipCode){
        return $http({
          method:'GET',
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          },
          url:`https://dax-cors-anywhere.herokuapp.com/https://brew_hound.rhobota.com/v1.0.0/location_only_recommendation?city%2Cstate=${zipCode}`
        });
      }
      function locationAndBeer(form){
        return $http({
          method:'GET',
          url:`https://dax-cors-anywhere.herokuapp.com/https://brew_hound.rhobota.com/v1.0.0/make_recommendation?preferred_beers=%5B"${form.beer1}"%2C%20"${form.beer2}"%2C%20"${form.beer3}"%5D&location=${form.city}`
        });
      }
      function showMap(store, originLong, originLat,markerLong, markerLat){
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvbWtpaSIsImEiOiJjaXFzYjNkMmswMnN5ZnlubnY3dzhxNnhxIn0.20bB0tw4QqbThJkaDj4Dxg';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/basic-v9',
            zoom: 13,
            center: [originLong, originLat]
        });

        map.on('load', function(){
          map.resize();

          store.data.forEach(function(element,index){
            var marker = new mapboxgl.Marker()
              .setLngLat([element[markerLong],element[markerLat]])
              .addTo(map);
              $(marker._el).attr('id',index).addClass('brew-marker');
          })
        })

        store.flyTo = function(longi,lati,getDiv){
          map.flyTo({center:[longi,lati], zoom:13});
          console.log(getDiv);
          $('.brew-marker').css('border-top', '40px solid #de541e')
          $(`#${getDiv}`).css('border-top','40px solid #3f3f37');
        }
      }
      function newMap(store){
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JvbWtpaSIsImEiOiJjaXFzYjNkMmswMnN5ZnlubnY3dzhxNnhxIn0.20bB0tw4QqbThJkaDj4Dxg';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/basic-v9',
          zoom: 13,
          center: [store.data[0].location.lon, store.data[0].location.lat]
        });

        map.on('load', loadMap);

        function loadMap(){
          map.resize();
          store.data.forEach(addMarkers);
          store.flyTo = flyToMakrer;

          function addMarkers(element, index) {
            var marker = new mapboxgl.Marker()
            .setLngLat([element.location.lon,element.location.lat])
            .addTo(map);
            $(marker._el).attr('id',index).addClass('brew-marker');
          }
          function flyToMakrer(longi,lati,getDiv){
            map.flyTo({center:[longi,lati], zoom:13});
            $('.brew-marker').css('border-top', '40px solid #de541e')
            $(`#${getDiv}`).css('border-top','40px solid #3f3f37');
          }
        }
        return map;
      }
      return locationFunctions;
    }
    function navbar(Locations){
      var navElement =  {
        restrict:'E',
        templateUrl:'/views/partials/navbar.html',
        // controller: function($routeParams){
        //   var store = this;
        // }
      }
      return navElement;
    }
    function routeConfig($routeProvider,$locationProvider){
      $routeProvider
        .when('/results',{
        templateUrl:'/views/index/results.html',
        controller:'ResultsController',
        controllerAs:'results'
      });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
})();
