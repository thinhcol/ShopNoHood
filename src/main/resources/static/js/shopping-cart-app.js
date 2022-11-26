var app = angular.module("shopping-cart-app", ["ngRoute", "ngResource"]);
app.controller("shopping-cart-ctrl", function($scope, $http) {
	$scope.pro = [];
	$scope.view = {};
	$scope.sanpham = {};
	$scope.favorite = [];
	$scope.account = {};
	$scope.products = function() {
		$http.get("/rest/products").then(resp => {
			$scope.pro = resp.data;
		});
		$http.get("/rest/accounts/getone").then(resp => {
			$scope.account = resp.data;
			
		});
		$http.get("/rest/favorite/all").then(resp => {
			$scope.favorite = resp.data;
		});
	}
	$scope.pros = function(item) {
		$scope.sanpham = item;
	}
	
	$scope.cart = {
		items: [],
		add(id) {
			var item = this.items.find(item => item.productid == id);

			for (var i = 0; i <= this.items.length - 1; i++) {
				console.log(this.items[i].productid + "  " + id)

			}
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
			} else {
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
		},
		remove(id) {
			var index = this.items.findIndex(item => item.productid == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
		},
		clear() {
			this.items = [];
			this.saveToLocalStorage();
		},
		amt_of(item) {
		},
		get count() {
			return this.items.map(item => item.qty).reduce((total, qty) => total += qty, 0);
		},
		get amount() {
			return this.items.map(item => item.qty * item.price).reduce((total, qty) => total += qty, 0);
		},
		saveToLocalStorage() {
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
			console.log(json)
		},
		LoadFromLocalStorage() {
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];

		}
	}
	$scope.checkfav = function(pro, acc) {
		var chfav = $scope.favorite.find(ur => ur.account.username == acc.username && ur.product.productid == pro.productid);
		if (chfav) {
			return true;
			
		} else {
			return false;
		}
	}
	 $scope.actionfav = function (pro, acc) {
       var chfav = $scope.favorite.find(ur => ur.account.username == acc.username && ur.product.productid == pro.productid);
        if (chfav) {
            console.log(chfav);
            $http.delete(`/rest/favorite/${chfav.favid}`).then(resp => {
                var index = $scope.favorite.findIndex(a => a.favid == chfav.favid);
                $scope.favorite.splice(index, 1);
                console.log("xoa thanh cong");
            }).catch(error => {
                console.log("Error", error);
            })

        } else {
            var f = {
                favdate: new Date(), account: {username: acc.username}, product: {productid: pro.productid}
            }
            $http.post(`/rest/favorite`, f).then(resp => {
                $scope.favorite.push(resp.data);
                console.log("thanh cong");
            }).catch(error => {
                console.log("Error", error);
            })
        }
    }
	$scope.cart.LoadFromLocalStorage();
	$scope.ordercart = {
		datecart: new Date(),
		phone: "",
		address: "",
		account: { username: $("#nguoidung").text() },
		get bill() {
			return $scope.cart.items.map(item => {
				return {
					product: { productid: item.productid },
					sumprice: item.price,
					quantity: item.qty,
					status: "Đang xác nhận đơn hàng"
				}
			});
		},
		purchase() {
			var orders = angular.copy(this);
			console.log(orders)
			$http.post("/rest/orders", orders).then(resp => {
				alert("Đặt hàng thành công");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.cartid;
			}).catch(error => {
				alert("Đặt hàng lỗi")
				console.log(error)
			})
		}
	}
	$scope.register = function() {
		var username = document.getElementById("username").value;
		var email = document.getElementById("email").value;
		var fullname = document.getElementById("fullname").value;
		var password = document.getElementById("password").value;
		var phone = document.getElementById("number").value;
		var address = $scope.address;
		var re = {
			username: username,
			email: email,
			fullname: fullname,
			password: password,
			phone: phone,
			address: address
		}
		$http.post("/rest/accounts", re).then(resp => {
			$scope.acc.push(resp.data);
			alert("Dang ky thanh cong");
		}).catch(error => {
			console.log("Error", error);
		})
	}
	$scope.findone = function(item) {
		$scope.view = item;
	}
	$scope.products();
});
// Điều khiển trang chi tiết sản phẩm////////////////////////////////////////////////////////////////
app.controller("detail-ctrl", function($scope, $http) {
	$scope.favorite = {
		user: $("#username").text(),
		proid: $("#productid").text(),
		isLike: false,
		checkLike() {
			$http.get(`/rest/favorite/checkexist?p=${this.proid}&u=${this.user}`).then(resp => {
				this.isLike = resp.data;
			})
		},
		triggle() {
			$http.get(`/rest/favorite?p=${this.proid}&u=${this.user}`).then(resp => {
				if (resp.data != "") {
					$http.delete(`/rest/favorite/${resp.data.favid}`)
					this.isLike = false;
				} else {
					this.isLike = true;
					var f = {
						favdate: new Date(),
						product: { productid: this.proid },
						account: { username: this.user }
					}
					$http.post(`/rest/favorite`, f)
				}
			});
		}
	}
	$scope.favorite.checkLike()

	$scope.comment = {
		add(productid, username) {
			cmt = {
				content: $scope.content,
				cmtdate: new Date(),
				product: { productid: productid },
				account: { username: username },
			}
			$http.post(`/rest/comment?p=${productid}&u=${username}`, cmt)
			this.clear();
		},
		clear() {
			$scope.content = "";
		}
	}


	$scope.account = {
		update(username) {
			info = {
				username: username,
				password: $scope.password,
				email: $scope.email,
				phone: $scope.phone,
				gender: $scope.gender,
				address: $scope.address,
				photo: $scope.photo
			}
		}
	}
});

//Điều khiển trang danh sách địa chỉ của người dùng////////////////////////////////////////////////////////////////
app.controller("address-ctrl", function($scope, $http) {
	$scope.Provinces = [];
	$scope.Districts = [];
	$scope.Wards = [];
	$scope.Addresses = [];

	$scope.initialize = function() {
		$http.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
			{ headers: { token: 'ebb9ad14-3d84-11ed-b824-262f869eb1a7' } }).then(resp => {
				resp.data.data.forEach(item => {
					var province = {
						provinceid: item.ProvinceID,
						provincename: item.ProvinceName
					}
					$scope.Provinces.push(province);
				})
			});
		$scope.loadAddress();
	}

	$scope.loadAddress = function() {
		$http.get("/rest/address").then(resp => {
			$scope.Addresses = resp.data;
		});
	}

	$scope.initialize();


	$scope.viewDistrict = {
		selectProvince() {
			$scope.address.district.districtid = 0;
			$scope.address.ward.wardid = 0;
			$scope.Districts = [];
			$scope.Wards = [];
			var provinceid = $scope.address.province.provinceid;
			if (provinceid != 0) {
				$http.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
					{ headers: { token: 'ebb9ad14-3d84-11ed-b824-262f869eb1a7' }, params: { "province_id": provinceid } }).then(resp => {
						resp.data.data.forEach(item => {
							var district = {
								districtid: item.DistrictID,
								districtname: item.DistrictName,
								province: { provinceid: item.ProvinceID }
							}
							$scope.Districts.push(district);
						})
					});
			} else {
				$scope.Districts = [];
			}
		}
	}

	$scope.viewWard = {
		selectDistrict() {
			$scope.address.ward.wardid = 0;
			$scope.Wards = [];
			var districtid = $scope.address.district.districtid;
			if (districtid != 0) {
				$http.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtid}`,
					{ headers: { token: 'ebb9ad14-3d84-11ed-b824-262f869eb1a7' } }).then(resp => {

						resp.data.data.forEach(item => {
							var ward = {
								wardid: parseInt(item.WardCode),
								wardname: item.WardName,
								district: { districtid: item.DistrictID }
							}
							$scope.Wards.push(ward);
						})
					});
			} else {
				$scope.Wards = [];
			}
		}
	}

	$scope.address = {
		province: { provinceid: 0 },
		district: { districtid: 0 },
		ward: { wardid: 0 }
	};


	//  Show form đăng kí address
	$scope.addAddress = function() {
		$scope.address = {
			province: { provinceid: 0 },
			district: { districtid: 0 },
			ward: { wardid: 0 }
		};
	}
	// Show form để sửa address
	$scope.editAddress = function(addr) {
		$scope.address = angular.copy(addr);
		$scope.showDistrict(addr.province.provinceid);
		$scope.showWard(addr.district.districtid);
	}


	$scope.showDistrict = function(provinceid) {
		$http.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
			{ headers: { token: 'ebb9ad14-3d84-11ed-b824-262f869eb1a7' }, params: { "province_id": provinceid } }).then(resp => {
				resp.data.data.forEach(item => {
					var district = {
						districtid: item.DistrictID,
						districtname: item.DistrictName,
						province: { provinceid: item.ProvinceID }
					}
					$scope.Districts.push(district)
				})
			});
	}

	$scope.showWard = function(districtid) {
		$http.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtid}`,
			{ headers: { token: 'ebb9ad14-3d84-11ed-b824-262f869eb1a7' } }).then(resp => {

				resp.data.data.forEach(item => {
					var ward = {
						wardid: parseInt(item.WardCode),
						wardname: item.WardName,
						district: { districtid: item.DistrictID }
					}
					$scope.Wards.push(ward);
				})
			});
	}


	$scope.createAddress = function() {
		$scope.checkAddress($scope.address);

		$scope.address.account = { username: $("#userremost").text() };
		$scope.address.isdefault = $scope.Addresses.length == 0 || $scope.address.isdefault ? true : false;
		$http.post(`/rest/address/`, $scope.address).then(resp => {
			$scope.loadAddress();
		});
	}
	$scope.deleteAddress = function(addressid) {
		$http.delete(`/rest/address/${addressid}`).then(resp => {
			$scope.loadAddress();
		})
	}
});