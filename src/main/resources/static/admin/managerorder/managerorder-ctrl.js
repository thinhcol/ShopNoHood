app.controller("managerorder-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.cart = [];
	$scope.cates = [];
	$scope.status = [];
	$scope.form = {};
	$scope.initialize = function() {
		$http.get("/rest/bill").then(resp => {
			$scope.items = resp.data;
			console.log($scope.items);
		});
		$http.get("/rest/status").then(resp => {
			$scope.status = resp.data;
			
		});
		$http.get("/rest/orders").then(resp => {
			$scope.cart = resp.data;
			console.log($scope.items);
		});


	}
	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
 		
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
			alert("cap nhat thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log(error);
		})

	}


	$scope.initialize();
})