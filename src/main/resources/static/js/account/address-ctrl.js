app.controller("address-app", function($scope, $http) {
	$scope.province = {
		urlRequest : 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
		headers : {token:'ebb9ad14-3d84-11ed-b824-262f869eb1a7'},
		listProvince : [],
		show(){
			$http.get(this.urlRequest,{headers:this.headers}).then(resp =>{
				this.listProvince = resp.data.data;
			})
		}
	}
	$scope.province.show();
	
	$scope.district = {
		urlRequest : 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
		headers : {token:'ebb9ad14-3d84-11ed-b824-262f869eb1a7'},
		listDistrict : [],
		show(){
			$http.get(this.urlRequest,{headers:this.headers}).then(resp =>{
				this.listDistrict = resp.data.data;
			})
		}
	}
	$scope.district.show();
	
	
	$scope.exactFilter = function(value) {
		return value.ProvinceID === $scope.provinces;
	};
})