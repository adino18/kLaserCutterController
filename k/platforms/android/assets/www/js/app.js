// kLaserCutterControoler
var APP_VERSION = 0.1;
angular.module('kLaserCutterController', [
	'ionic','ionic.service.core','ionic.service.push','ngCordova',
	'ngProgress',
	'pascalprecht.translate',
	'kLaserCutterController.controllers',
	'kLaserCutterController.services',
	'kLaserCutterController.languages',
	'kLaserCutterController.directive'
])

.run(["$rootScope", "$ionicPlatform", "$ionicSideMenuDelegate", "$filter", "$ionicPopup", function($rootScope, $ionicPlatform, $ionicSideMenuDelegate, $filter, $ionicPopup) {
	$rootScope.minScreenWidth = min(screen.width, screen.height);
  $ionicPlatform.ready( function() {
  	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    
    
    if (screen.lockOrientation)
    	screen.lockOrientation(($rootScope.minScreenWidth >= 400) ? 'landscape' : 'portrait');
    
    
    
    // right menu
	$rootScope.showLeftMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
	
	//alert
	$rootScope.alert = function(title, message) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: message,
			okText: $filter("translate")("OK")
		});
  	};
  	
  	
  	
  	
  	
  });
}])
.config(["$ionicConfigProvider", function($ionicConfigProvider) {
	$ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isAndroid());
}])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('_kLaserCutterController');
  // localStorageServiceProvider.setStorageType('sessionStorage');
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
