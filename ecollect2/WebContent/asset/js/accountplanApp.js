var app = angular.module("App",[]);

//
app.controller('mainCtrl', function($scope, $http){
	$scope.otheraccsData = [];
	$http.get(urladdress + '/api/v2/views/' + custnumber).success(function(data){
		$scope.otheraccsData = data;
	})
})