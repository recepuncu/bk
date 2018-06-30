angular.module('app.controllers', [])
  
.controller('hayvanKayitCtrl', ['$scope', '$stateParams', '$cordovaCamera', '$http',
function ($scope, $stateParams, $cordovaCamera, $http) {

	$scope.islemYapiliyor = [];

	$scope.irklar = [
		{ 'irkID': 1, 'irkAdi': 'Merinos'},
		{ 'irkID': 2, 'irkAdi': 'Kara Koyun'},
	];
	
	$scope.cihazID = 0;
	
	$scope.yeni = {
		'kupeNo': '',
		'anneKupeNo': '',
		'irkID': '',
		'dogumTarihi': '',
		'kilo': '',
		'fotograf': ''		
	};	
	
	document.addEventListener("deviceready", function () {
		
		$scope.cihazID = device.uuid || device.platform;
		
		$scope.yeniKayitFotografCek = function () {
			var options = {
				quality: 60,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: false,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 512,
				targetHeight: 512,
				popoverOptions: CameraPopoverOptions,
				correctOrientation: true,
				saveToPhotoAlbum: false
			};
			$cordovaCamera.getPicture(options).then(function (imageData) {
				$scope.imgURI = "data:image/jpeg;base64," + imageData;
				$scope.yeni.cihazID = $scope.cihazID;
				$scope.yeni.fotograf = $scope.imgURI.length;
			}, function (err) {
				// An error occured. Show a message to the user
			});
		};
	}, false);
	
	$scope.yeniKayitKaydetClick = function() {		
		$scope.yeni.cihazID = $scope.cihazID;
		$scope.islemYapiliyor['yeniKayitKaydetClick'] = true;
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
	}
	
	$scope.yeniKayitVazgecClick = function() {
		$scope.yeni = {
			'kupeNo': '',
			'anneKupeNo': '',
			'irkID': '',
			'dogumTarihi': '',
			'kilo': '',
			'fotograf': '',
			'cihazID': $scope.cihazID
		};
		$scope.imgURI = null;
	}

}])
   
.controller('hayvanListesiCtrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {

	$scope.data = [];
	$scope.islemYapiliyor = [];	
	
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
			$scope.islemYapiliyor['hayvanListesi'] = false;
			$scope.$broadcast('scroll.refreshComplete');
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
 