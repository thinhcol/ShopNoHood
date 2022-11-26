app = angular.module("admin-app", ["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
		.when("/product", {
			templateUrl: "../admin/product/productform.html",
			controller: "product-ctrl"
		})
		.when("/authorize", {
			templateUrl: "../admin/authority/index.html",
			controller: "authority-ctrl"
		})
		.when("/unauthorized", {
			templateUrl: "../admin/authority/unauthorized.html",
			controller: "authority-ctrl"
		})
		.when("/account", {
			templateUrl: "../admin/account/accountform.html",
			controller: "account-ctrl"
		})
		.when("/category", {
			templateUrl: "../admin/categories/categoryform.html",
			controller: "category-ctrl"
		})
		.when("/system/address", {
			templateUrl: "../admin/system/address/address.html",
			controller: "address-ctrl"
		})
		.when("/managerorder", {
			templateUrl: "../admin/managerorder/donhang.html",
			controller: "managerorder-ctrl"
		})
		.otherwise({
			templateUrl: "../admin/chart/thongke.html",
			controller: "thongke-ctrl"
		});
});
// function generateColor() {
// 	let r = parseInt(Math.random() * 255);
// 	let g = parseInt(Math.random() * 255);
// 	let b = parseInt(Math.random() * 255);
// 	return `rgb(${r},${g},${b}, 0.5)`
// }
// function bodermau() {
// 	let r = parseInt(Math.random() * 255);
// 	let g = parseInt(Math.random() * 255);
// 	let b = parseInt(Math.random() * 255);
// 	return `rgb(${r},${g},${b}, 1)`
// }

// function linechart(id, view = [], tittle = []) {
// 	let colors = []
// 	for (let i = 0; i < view.length; i++) {
// 		colors.push(generateColor())
// 	}
// 	const data = {
// 		labels: tittle,
// 		datasets: [{
// 			label: 'Lượt mua ',
// 			data: view,
// 			fill: false,
// 			backgroundColor: colors,
// 			borderWidth: 1,
// 			borderColor: 181616
// 		}]
// 	};
// 	const config = {
// 		type: 'bar',
// 		data: data,
// 		options: {
// 			scales: {
// 				yAxes: [{
// 					ticks: {
// 						beginAtZero: true
// 					},
// 					gridLines: {
// 						color: "rgba(204, 204, 204,0.1)"
// 					}
// 				}],
// 				xAxes: [{
// 					gridLines: {
// 						color: "rgba(204, 204, 204,0.1)"
// 					}
// 				}]
// 			},
// 			legend: {
// 				display: false
// 			},
// 			elements: {
// 				point: {
// 					radius: 0
// 				}
// 			}
// 		},
// 	};
// 	let ctx = document.getElementById(id).getContext("2d")
// 	new Chart(ctx, config)
// }
