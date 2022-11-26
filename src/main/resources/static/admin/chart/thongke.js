app.controller("thongke-ctrl", function($scope, $http) {
	$scope.value = [];
	$scope.name = [];
	$scope.data = [];
	$scope.initialize = function() {
		$http.get("/rest/TKDT").then(resp => {
			$scope.value = resp.data;
			for (let i = 0; i < $scope.value.length; i++) {
				$scope.name.push($scope.value[i].name);
				$scope.data.push($scope.value[i].tien);
			}
			console.log($scope.name)
			console.log($scope.data)
			Highcharts.chart('thongkedt', {
				chart: {
					type: 'column'
				},
				title: {
					align: 'center',
					text: 'Doanh thu sản phẩm'
				},
				subtitle: {
					align: 'left',
					text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
				},
				accessibility: {
					announceNewData: {
						enabled: true
					}
				},
				xAxis: {
					categories: $scope.name,
					crosshair: true
				},
				yAxis: {
					title: {
						text: 'Doanh thu bán sản phẩm'
					}

				},
				legend: {
					enabled: false
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							format: '{point.y:.0f} VNĐ'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f} VNĐ</b> of total<br/>'
				},

				series: [
					{
						name: "Browsers",
						colorByPoint: true,
						data: $scope.data
					}
				],
				drilldown: {
					breadcrumbs: {
						position: {
							align: 'right'
						}
					}
				}
			});
		});

	}
	$scope.valuesl = [];
	$scope.namesl = [];
	$scope.datasl = [];
	$scope.thongkesoluong = function() {
		$http.get("/rest/TKSP").then(resp => {
			$scope.valuesl = resp.data;
			for (let i = 0; i < $scope.valuesl.length; i++) {
				$scope.namesl.push($scope.valuesl[i].name);
				$scope.datasl.push($scope.valuesl[i].soluong);
			}
			Highcharts.chart('thongkesp', {
				chart: {
					type: 'column'
				},
				title: {
					align: 'center',
					text: 'Số lượng sản phẩm bán ra'
				},
				subtitle: {
					align: 'left',
					text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
				},
				accessibility: {
					announceNewData: {
						enabled: true
					}
				},
				xAxis: {
					categories: $scope.namesl,
					crosshair: true
				},
				yAxis: {
					title: {
						text: 'Sản phẩm bán ra'
					}

				},
				legend: {
					enabled: false
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							format: '{point.y:.0f} '
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f} </b> of total<br/>'
				},

				series: [
					{
						name: "Browsers",
						colorByPoint: true,
						data: $scope.datasl
					}
				],
				drilldown: {
					breadcrumbs: {
						position: {
							align: 'right'
						}
					}
				}
			});
		});
	}


	$scope.initialize();
	$scope.thongkesoluong();





});