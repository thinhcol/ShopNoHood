app.controller("account-ctrl", function($scope, $http) {
	$scope.items = [];
	$scope.form = {};
	$scope.initialize = function() {
		$http.get("/rest/users").then(resp => {
			$scope.items = resp.data;
			
		});
		
	}

	$scope.initialize();
	$scope.reset = function() {
		$scope.form = {
			datecreate: new Date(),
			gender: ""
		}
	}

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$(".nav-tabs button:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post('/rest/users', item).then(resp => {
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
		$http.put(`/rest/users/${item.username}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
			alert("cap nhat thanh cong");
			$scope.initialize();
		}).catch(error => {
			alert("loi");
			console.log("Error", error);
		})

	}

	$scope.delete = function(item) {
		$http.delete(`/rest/users/${item.username}`).then(resp => {
			var index = $scope.items.findIndex(p => p.username == item.username);
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
		$http.post('/rest/upload/images', data, {
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