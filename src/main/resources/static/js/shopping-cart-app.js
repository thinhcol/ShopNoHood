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
    
    
    
    
    
    $scope.favorite = {
    	user:'thinh',
    	proid: 3,
    	check = [],
    	checkLike(){
    		$http.get(`/rest/favorite/checkexist?p=3&u=thinh`).then(resp =>{
    			check = resp.data;
    			}
    		)
    	},
    	isLike = check[0],
   		triggle(productid, username) {
   			 $http.get(`/rest/favorite?p=${productid}&u=${username}`).then(resp =>{
   				 if(resp.data!=""){
   					$http.delete(`/rest/favorite/${resp.data.favid}`)
   					isLike = true;
//   					location.href = "/product/detail/" + productid;
   				 }else{
   					console.log("Chạy rồi");
   					isLike = false;
   					var f = {
   						favdate: new Date(),
   						product: {productid: productid},
   						account: {username: username}
   					}
   					$http.post('/rest/favorite', f)
   				 }
   			 });
   	     }
   	 }
    $scope.favorite.checkLike();
   
    
    
    
    $scope.comment = {
    	add(productid, username){
    		console.log("OKOKOK")
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
});