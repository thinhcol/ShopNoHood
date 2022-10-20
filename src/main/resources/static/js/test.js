var app = angular.module("test-app", []);
app.controller("test-ctrl", function($scope, $http){
	$scope.listProvince = [];
	$scope.listDistrict = [];
	
	$scope.update = function(){
//		$scope.province.updateProvince();
		$scope.district.updateDistrict();
	}
	
	$scope.province = {
		urlRequest : 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
		headers : {token:'ebb9ad14-3d84-11ed-b824-262f869eb1a7'},
		updateProvince(){
			$http.get(this.urlRequest,{headers:this.headers}).then(resp =>{
				resp.data.data.forEach(a => {
					provice = {
						provinceid : a.ProvinceID,
						provincename : a.ProvinceName
					}
					$scope.listProvince.push(provice);
				})
				$http.post('/rest/address/province', $scope.listProvince);
			})
		}
	}
	
	$scope.district = {
			urlRequest : 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
			headers : {token:'ebb9ad14-3d84-11ed-b824-262f869eb1a7'},
			updateDistrict(){
				$http.get(this.urlRequest,{headers:this.headers}).then(resp =>{
					resp.data.data.forEach(a => {
						district = {
							districtid : a.DistrictID,
							province :{provinceid : a.ProvinceID},
							districtname : a.DistrictName
						}
						$scope.listDistrict.push(district);
					})
					console.log($scope.listDistrict);
					$http.post('/rest/address/district', $scope.listDistrict);
				})
			}
		}
})