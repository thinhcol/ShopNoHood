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
    
    
    // Bắt đầu điều khiển phần yêu thích trong chi tiết sản phẩm ///////////////////////////////////////////////////////////////////
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
   // Kết thúc điều khiển phần yêu thích trong chi tiết sản phẩm ///////////////////////////////////////////////////////////////////
    
    
    
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
    
//    Điều khiển account.address  /////////////////////////////////////////////////////////////////////////////////
    // Tỉnh/Thành Phố
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
    // Quận/huyện
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
    // Phường, Xã
	$scope.ward = {
		urlRequest : 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
		headers : {token:'ebb9ad14-3d84-11ed-b824-262f869eb1a7'},
		params : {district_id : 3695},
		listWard : [],
		show(d){
			console.log(d);
			$http.get(this.urlRequest,{headers:this.headers, params : this.params}).then(resp =>{
				this.listWard = resp.data.data;
			})
		}
	}
    //Thực thi khi truy cập trang web
	$scope.province.show();
	$scope.district.show();
	$scope.ward.show();
	// Hàm filter dữ liệu khi thay đổi Tỉnh thành phố
	$scope.exactFilter = function(value) {
		return value.ProvinceID === $scope.provinces;
	};
//	Kết thúc phần điều khiển account.address /////////////////////////////////////////////////////////////////////////////////
});