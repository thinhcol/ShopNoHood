app.controller("managerorder-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.cart = [];
	$scope.cates = [];
	$scope.status = [
		{
			id:1,
			name:'Chờ xác nhận đơn'
		},
		{
			id:2,
			name:'Đơn hàng đang giao'
		},
		{
			id:3,
			name:'Giao hàng thành công'
		},
		{
			id:4,
			name:'Đơn hàng bị hủy'
		}
	];
	$scope.form = {};
	$scope.initialize = function() {
		$http.get("/rest/bill").then(resp => {
			$scope.items = resp.data;
		});
	
	}
	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
 		$scope.form.diachi = item.address.streetname + ", " + item.address.ward.wardname + ", " + item.address.district.districtname +  ", " + item.address.province.provincename;
	}
	$scope.op = function(item){
		$scope.form = angular.copy(item);
		console.log(angular.copy(item))
	}	
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/bill/${item.billid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.billid == item.billid);
			$scope.items[index] = item;
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log(error);
		})

	}


	$scope.initialize();
})