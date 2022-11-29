app.controller("product-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};
	$scope.initialize = function() {
		$http.get("/rest/products").then(resp => {
			$scope.items = resp.data;
			$scope.items.forEach(item => {
				item.datecreate = new Date(item.datecreate)
			});
		});
		$http.get("/rest/categories").then(resp => {
			$scope.cates = resp.data;
			
		});
	}

	$scope.initialize();
	$scope.reset = function() {
		$scope.form = {
			datecreate: new Date(),
			image: ""
		}
	}

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
 		$(".nav-tabs button:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post('/rest/products', item).then(resp => {
			resp.data.datecreate = new Date(resp.data.datecreate)
			$scope.items.push(resp.data);
			alert("Them thanh cong");
			$scope.reset();
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})
	}

	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/products/${item.productid}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.productid == item.productid);
			$scope.items[index] = item;
			alert("cap nhat thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})

	}

	$scope.delete = function(item) {
		$http.delete(`/rest/products/${item.productid}`).then(resp => {
			var index = $scope.items.findIndex(p => p.productid == item.productid);
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

	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		console.log("ok")
		$http.post('/rest/upload/products', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.image = resp.data.name;
		}).catch(error => {
			alert("Lỗi upload hình ảnh");
			console.log("Error", error);
		})
	}
})