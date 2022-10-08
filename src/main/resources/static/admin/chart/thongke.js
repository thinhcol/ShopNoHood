const app = angular.module("thongke-ctrl", []);
app.controller("thongke-ctrl", function($scope, $http) {
	$scope.value = [];
	$scope.initialize = function() {
		$http.get("/admin/home/thongke").then(resp => {
			$scope.value = resp.data;
			console.log(resp.data)
		});
	}
	$scope.initialize();
});