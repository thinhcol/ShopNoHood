var app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $http) {
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
    $scope.cart.LoadFromLocalStorage();
    $scope.ordercart = {
        datecart: new Date(),
        phone: "",
        address: "",
        account: {username: $("#nguoidung").text()},
        get bill() {
            return $scope.cart.items.map(item => {
                return {
                    product: {productid: item.productid},
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
});
// Điều khiển trang chi tiết sản phẩm////////////////////////////////////////////////////////////////
app.controller("detail-ctrl", function ($scope, $http) {    
    $scope.favorite = {
    	user: $("#username").text(),
    	proid: $("#productid").text(),
    	isLike: false,
    	checkLike(){
    		$http.get(`/rest/favorite/checkexist?p=${this.proid}&u=${this.user}`).then(resp => {
    			this.isLike = resp.data;
    		})
    	},
   		triggle() {
   			 $http.get(`/rest/favorite?p=${this.proid}&u=${this.user}`).then(resp =>{ 
   				 if(resp.data != ""){
   					$http.delete(`/rest/favorite/${resp.data.favid}`)
   					this.isLike = false;
   				 }else{
   					this.isLike = true;
   					var f = {
   						favdate: new Date(),
   						product: {productid: this.proid},
   						account: {username: this.user}
   					}
   					$http.post(`/rest/favorite`, f)
   				 }
   			 });
   	     }
   	 }
	$scope.favorite.checkLike()
    
    $scope.comment = {
    	add(productid, username){
    		cmt = {
				content : $scope.content,
		    	cmtdate : new Date(),
		    	product: {productid: productid}, 
		    	account: {username: username},
    		}
    		$http.post(`/rest/comment?p=${productid}&u=${username}`, cmt)
    		this.clear();
    	},
    	clear() {
    		$scope.content = "";
        }
    }
    
    
    $scope.account = {
    	update(username){
    		info = {
    			username : username,
    			password : $scope.password,
    			email : $scope.email,
    			phone : $scope.phone,
    			gender : $scope.gender,
    			address : $scope.address,
    			photo : $scope.photo
    		}
    	}
    }
});

//Điều khiển trang danh sách địa chỉ của người dùng////////////////////////////////////////////////////////////////
app.controller("address-ctrl", function ($scope, $http) {
    $scope.Provinces = [];
	$scope.Districts = [];
	$scope.Wards = [];
	$scope.Addresses = [];
	
	$scope.initialize = function() {
		$http.get("/rest/system/address/province").then(resp => {
			$scope.Provinces = resp.data;
		});
		$scope.loadAddress();
	}
	
	$scope.loadAddress = function(){
		$http.get("/rest/address").then(resp => {
			$scope.Addresses = resp.data;
		});
	}
	
	$scope.initialize();
	
	$scope.viewDistrict = {
			selectProvince(){
				var province = $scope.selectedProvince;
				if(province !== null){
					$http.get(`/rest/system/address/district/${province.provinceid}`).then(resp => {
						$scope.Districts = resp.data;
					});
				}else{
					$scope.Districts = [];
				}
			}
		}
	
	$scope.viewWard = {
			selectDistrict(){
				var district = $scope.selectedDistrict;
				if(district !== null){
					$http.get(`/rest/system/address/ward/${district.districtid}`).then(resp => {
						$scope.Wards = resp.data;
					});
				}else{
					$scope.Wards = [];
				}
			}
		}
	
	$scope.createAddress = function(){
		form = {
			streetname : $scope.streetname,
			fullname : $scope.fullname,
			phonenumber : $scope.numberphone,
			isdefault : $scope.Addresses.length > 0 ? false : true,
			province : {provinceid : $scope.selectedProvince.provinceid},
			district : {districtid : $scope.selectedDistrict.districtid},
			ward : {wardid : $scope.selectedWard.wardid},
			account: {username: $("#userremost").text()}
		}
		$http.post(`/rest/address/`, form).then(resp => {
			$scope.loadAddress();
		});
	}
	$scope.eidtAddress = function(addressId){
		var form = {};
		$http.get(`/rest/address/${addressId}`).then(resp =>{
			$scope.fullname = resp.data.fullname;
			$scope.streetname = resp.data.streetname;
			$scope.numberphone = resp.data.phonenumber;
			console.log($scope.selectedProvince);
		});
	}
});