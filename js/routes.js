angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('islemler.hayvanKayit', {
    url: '/hayvan-kayit',
    views: {
      'side-menu21': {
        templateUrl: 'templates/hayvanKayit.html',
        controller: 'hayvanKayitCtrl'
      }
    }
  })

  .state('islemler.hayvanListesi', {
    url: '/hayvan-listesi',
    views: {
      'side-menu21': {
        templateUrl: 'templates/hayvanListesi.html',
        controller: 'hayvanListesiCtrl'
      }
    }
  })

  .state('islemler', {
    url: '/side-menu',
    templateUrl: 'templates/islemler.html',
    controller: 'islemlerCtrl'
  })

$urlRouterProvider.otherwise('/side-menu/hayvan-kayit')


});