angular.module('app.controllers', [])
  
.controller('hayvanKayitCtrl', ['$scope', '$state', '$stateParams', '$cordovaCamera', '$http', '$ionicPlatform',
function ($scope, $state, $stateParams, $cordovaCamera, $http, $ionicPlatform) {
	
	$ionicPlatform.ready(function() {
	
		$scope.islemYapiliyor = [];

		$scope.irklar = [];
		$http({
			method: 'GET',
			url: 'http://bizimkuzu.com/api/irk-listesi',
			headers: {
				"Content-Type": "application/json"				
			}			
		})
		.then(function (response) {		
			if (response.data.result == 'success') {
				$scope.irklar = response.data.data;
			}		
		});	
		
		$scope.cihazID = 0;
		
		$scope.yeni = {
			'kupeNo': '',
			'anneKupeNo': '',
			'irkID': '',
			'dogumTarihi': '',
			'kilo': '',
			'fotograf': '',
			'cihazID': device.uuid || device.platform
		};
	
		$scope.yeniKayitFotografCek = function () {
			var options = {
				quality: 80,
				destinationType : 0,				
				allowEdit : true,
				targetWidth: 1024,
				targetHeight: 1024,								
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,				
				encodingType: Camera.EncodingType.JPEG,				
				correctOrientation: true,
				saveToPhotoAlbum: false
			};
			$cordovaCamera.getPicture(options).then(function (imageData) {
				$scope.imgURI = "data:image/jpeg;base64," + imageData;				
				$scope.yeni['fotograf'] = $scope.imgURI;
				
				//$state.go('islemler.hayvanKayit', null, {reload: true});
				
			}, function (err) {
				alert(err);
			});
		};
	
		$scope.yeniKayitKaydetClick = function() {
			$scope.islemYapiliyor['yeniKayitKaydetClick'] = true;
			$http({
				method: 'GET',
				url: 'http://bizimkuzu.com/api/hayvan-kayit',
				headers: {
					"Content-Type": "application/json"				
				}
			})
			.then(function (success) {
				$http({
					method: 'POST',
					url: 'http://bizimkuzu.com/api/hayvan-kayit',
					data: $scope.yeni,
					headers: {
						"Content-Type": "application/json"				
					}
				})
				.then(function (success) {
					$scope.islemYapiliyor['yeniKayitKaydetClick'] = false;
					if (success.data.result == 'success') {
						alert('Kayıt başarılı.');
						$scope.yeniKayitVazgecClick();
					} else {
						alert('Kayıt edilemedi. Tekrar deneyin.');
					}
				}, function (error) {
					$scope.islemYapiliyor['yeniKayitKaydetClick'] = false;
					alert('Kayıt edilemedi. Tekrar deneyin.');
					console.log(error);
				});
			});		
		}
		
		$scope.yeniKayitVazgecClick = function() {
			$scope.yeni.kupeNo = '';
			$scope.yeni.anneKupeNo = '';
			$scope.yeni.irkID = '';
			$scope.yeni.dogumTarihi = '';
			$scope.yeni.kilo = '';
			$scope.yeni.fotograf = '';
			$scope.imgURI = null;
		}
	
	});

}])
   
.controller('hayvanListesiCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {

	$scope.data = [];
	$scope.islemYapiliyor = [];
	$scope.input = {};
	
	$scope.kupeNoBul = function(prop, val) {
		return function(item) {
			if (item[prop] == val) return true;
		}
	}
	
	$scope.hayvanListesiYenileClick = function() {
		$scope.islemYapiliyor['hayvanListesi'] = true;
		$http({
			method: 'GET',
			url: 'http://bizimkuzu.com/api/hayvan-listesi',
			headers: {
				"Content-Type": "application/json"				
			}			
		})
		.then(function (success) {		
			$scope.$broadcast('scroll.refreshComplete');
			$scope.islemYapiliyor['hayvanListesi'] = false;
			if (success.data.result == 'success') {
				$scope.data['hayvanListesi'] = success.data.data;
			}		
		}, function (error) {
			$scope.islemYapiliyor['hayvanListesi'] = false;	
			$scope.$broadcast('scroll.refreshComplete');			
			console.log(error);
		});	
	}
	$scope.hayvanListesiYenileClick();

}])
   
.controller('islemlerCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
 