app.controller("category-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};
	$scope.initialize = function() {
		$http.get("/rest/categories").then(resp => {
			$scope.items = resp.data;
			
		});
	}

	$scope.initialize();
	$scope.reset = function() {
		$scope.form = {
		}
	}

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs button:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post('/rest/categories', item).then(resp => {
			$scope.items.push(resp.data);
			$scope.reset();
			alert("Them thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})
	}

	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/categories/${item.cateid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.cateid == item.cateid);
			$scope.items[index] = item;
			alert("cap nhat thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})

	}

	$scope.delete = function(item) {
		$http.delete(`/rest/categories/${item.cateid}`).then(resp => {
			var index = $scope.items.findIndex(p => p.cateid == item.cateid);
			$scope.items.splice(index, 1);
			$scope.reset();
			alert("Xoa thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})
	}

	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
         first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if(this.page <0){
				this.last();
			}
		},
		next() {
			this.page++;
			if(this.page >= this.count){
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}
})