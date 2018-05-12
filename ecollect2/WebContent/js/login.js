var app = angular.module('App', []);

app.controller('loginCtrl', function($scope, $http, $location) {
	$scope.userDetails = {};
	$scope.Logged = {};
	$scope.loginMessage = "";

	$scope.login = function() {
		//console.log('---> testing login script separated');
		$scope.dataLoading = true;
		$http({
			url : urladdress + '/api/restlogin',
			method : "post",
			data : $.param({
				'username' : $scope.userDetails.username,
				'password' : $scope.userDetails.password
			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
		    }).success(function(response) {
				//console.log('response live login ', response[0].access);
				if (response[0].access === "YES") {
					//console.log('-->User authenticated');
					$scope.dataLoading = false;
					$http({ 
						url :'./api/v2/Logged/' + $scope.userDetails.username, 
						method : 'get'
						 }).success(function(response) {
							 //console.log('Login response ', response)
							 if (response.length == 0) {
								 $scope.loginMessage = "No access rights to E-Collect";
							 }else{
								 //console.log(response[0]); 
								 $scope.loginMessage = "";
								 $scope.Logged.user = response[0].USERNAME;
								 $scope.Logged.div = response[0].DIVISION; 
								 $scope.Logged.rights = response[0].ACCESSRIGHTS; 
								 $scope.Logged.role = response[0].ROLE;
								 $scope.Logged.branch = response[0].BRANCH; 
								 $scope.Logged.expiry = response[0].EXPIRYDATE;
								 
								 if (response[0].EXPIRYDATE == "" || response[0].EXPIRYDATE == undefined || response[0].EXPIRYDATE == 0 || response[0].EXPIRYDATE == '2099-01-31') {
									 $scope.Logged.expiry = "2099-12-31"; // 2016-02-06
									 localStorage.setItem("uname",$scope.userDetails.username);
									 localStorage.setItem("division",$scope.Logged.div);
									 localStorage.setItem("rights",$scope.Logged.rights);
									 localStorage.setItem("branch",$scope.Logged.branch);
									 
									 $scope.formatString = function(format) { 
										 var day = parseInt(format.substring(8)); 
										 var month = parseInt(format.substring(5, 7));
										 var year = parseInt(format.substring(0, 4)); 
										 var date = new Date(year,month - 1, day); return date; 
									 }
									 
									 var exp_date = new Date($scope.formatString($scope.Logged.expiry)); 
									 var timeDiff = exp_date.getTime() - new Date().getTime();
									 
									 if (timeDiff < 0) { 
										 $scope.loginMessage = "E-Collect access expired"; 
									 } else if (response[0].DIVISION == 'HELPDESK') {
											 logged($scope.Logged.user);
											 window.open("index_admin.html","_self"); 
										 } else if (response[0].DIVISION == 'CC') { 
											 logged($scope.Logged.user); 
											 window.open("cards.jsp","_self"); } 
										 else if (response[0].DIVISION == 'PORTFOLIO') { 
											 logged($scope.Logged.user);
											 window.open("index_portfolio.jsp","_self"); 
										 } else if (response[0].DIVISION == 'BRANCH') { 
											 logged($scope.Logged.user); 
											 window.open("index.jsp","_self"); 
										}else if(response[0].DIVISION == 'MCOOPCASH'){ 
											logged($scope.Logged.user);
											window.open("mcoopcash.jsp","_self"); 
										}else if(response[0].DIVISION == 'DIRECTOR'){ 
											logged($scope.Logged.user);
											window.open("index_directors.html","_self"); 
										}else if(response[0].DIVISION == 'REGIONALMANGERS'){ 
											logged($scope.Logged.user);
											window.open("index_directors.html","_self"); 
										}else { 
											//logged($scope.Logged.user);
											window.open("index.jsp","_self"); 
										} // end success }else {
										 $scope.loginMessage = "Successfull !!!!"; 
										 $scope.dataLoading = false; 
								 }else{
									 console.log('exit login ' + response[0].EXPIRYDATE);
								 }
							 }
						 })
					
				} else{
					$scope.loginMessage = "Invalid login credentials";
					$scope.dataLoading = false;
				}
			}).error(function(err){
				//$scope.loginMessage = "Error Logging in";
				$scope.loginMessage = "Invalid login credentials";
				$scope.dataLoading = false;
			});
	}
	//
	function logged(loginname) {
		$http({
			url : './api/whologged',
			method : 'post',
			data : $.param({
				'username' : loginname
			}),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(response) {
			//console.log('Whologged successfully updated');
		}).error(function(response) {
			console.log(response);
		})
	}
});
