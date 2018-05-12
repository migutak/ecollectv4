var app = angular.module('RDash');

app.controller('MasterCtrl', function($scope, $http, StudentDataOp,
		ServerAddress) {
	$scope.username = localStorage.getItem("uname");

	var username = localStorage.getItem("uname");
	var division = localStorage.getItem("division");
	var rights = localStorage.getItem("rights");

	// Open reports
	$scope.openUsersrpt = function() {
		window.open(ServerAddress.urlreports
				+ "/frameset?__report=users.rptdesign&__title=User List",
				"_blank");
	}

	$scope.logout = function() {
		if (confirm('Are you sure you want to logout?')) {
			loggedout(username);
			localStorage.clear();
			window.open("login.html", "_self");
		}
	}

	function loggedout(loginname) {
			// TODO: Do something here if the answer is "Ok".
			$http({
				url : './api/whologgedout',
				method : 'post',
				data : $.param({
					'username' : loginname
				}),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function(response) {
				console.log('user logged out');
			})		
	}
})