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
		loggedout(username);
		localStorage.clear();
		window.open("login.html", "_self");
	}

	function loggedout(loginname) {
		if (confirm('Are you sure you want to logout?')) {
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
	}
})

app.controller('usersCtrl', function($scope, $http, StudentDataOp,
		ServerAddress) {
	$scope.dataIn = {};
	$scope.userInfo = {};
	$scope.pic = "fa fa-repeat";
	$scope.lookup = "Lookup";

	$scope.branch = [];
	StudentDataOp.getAllBranch().success(function(data) {
		$scope.branch = data;
	})

	$scope.lookupfn = function() {
		StudentDataOp.UserInfo($scope.dataIn.username).success(function(data) {
			if (data.length > 0) {
				$scope.userInfo = data;

				$scope.dataIn.fname = $scope.userInfo[0].FIRSTNAME;
				$scope.dataIn.lname = $scope.userInfo[0].SURNAME;
				$scope.dataIn.dept = $scope.userInfo[0].DIVISION;
				$scope.dataIn.email = $scope.userInfo[0].EMAIL;
				$scope.dataIn.rights = $scope.userInfo[0].ACCESSRIGHTS;
				$scope.dataIn.active = $scope.userInfo[0].ACTIVE;
				$scope.dataIn.cdate = $scope.userInfo[0].CREATEDATE;
				$scope.dataIn.branch = $scope.userInfo[0].BRANCH;
				$scope.dataIn.expiry = $scope.userInfo[0].EXPIRYDATE;

			} else {
				alert('User not found');
				$scope.dataIn = {};
			}

		}).error(function(err) {
			alert('Error retrieving user');
		});
	};

	$scope.updtUser = function() {

		if ($scope.dataIn.expiry == "" || $scope.dataIn.expiry == undefined) {
			$scope.dataIn.expiry = '2099-01-31';
		}
		console.log($scope.dataIn.expiry);
		// ;
		$http({
			method : 'POST',
			url : ServerAddress.address + '/updateUser',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : $scope.dataIn
		}).success(function(data) {
			console.log('Update user ....');
			console.log($scope.dataIn);
			alert('User Updated');
			// $scope.message = "User Updated";
			$scope.dataIn = {};
		}).error(function() {
			alert("Error Updating User");
		});
	};

	$scope.dataIn = {};

})

app.controller('branchesCtrl', function($scope, $http, ServerAddress) {
	$scope.dataIn = {};
	$scope.showadd = false;
	$scope.showupdate = false;
	$scope.showme = true;
	$scope.branches = [];

	$scope.submitHeader = "Submit";

	$scope.showlist = function() {
		$scope.showadd = false;
		$scope.showupdate = false;
		$scope.showme = true;
	};
	$scope.addbr = function() {
		$scope.showadd = true;
		$scope.showupdate = false;
		$scope.showme = false;
	};
	$scope.updatebr = function() {
		$scope.showadd = false;
		$scope.showupdate = true;
		$scope.showme = false;
	};

	$http({
		cache : true,
		method : 'get',
		url : ServerAddress.address + '/api/status/branches'
	}).success(function(data) {
		$scope.branches = data;
	}).error(function(error) {
		console.log('Unable to retrieve Branch list');
	});

	$scope.addBranch = function() {
		$scope.submitHeader = "Submitting Request .....";
		$scope.mySwitch = true;
		$http({
			method : 'POST',
			url : ServerAddress.address + '/addBranch',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : $scope.dataIn
		}).success(function(data) {
			$scope.message = "Branch Created";
			alert('Branch Created');
			$scope.mySwitch = false;
			$scope.submitHeader = "Submit";
		}).error(function() {
			alert("Error Creating Branch");
			$scope.mySwitch = false;
			$scope.submitHeader = "Submit";
		});
	};
	$scope.updateBranch = function() {
		$scope.submitHeader = "Submitting Request .....";
		$scope.mySwitch = true;
		$http({
			method : 'POST',
			url : ServerAddress.address + '/updateBranch',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : $scope.dataIn
		}).success(function(data) {
			$scope._message = "Branch Updated";
			alert('Branch Updated');
			$scope.mySwitch = false;
			$scope.submitHeader = "Submit";
		}).error(function() {
			alert("Error Updating Branch");
			$scope.mySwitch = false;
			$scope.submitHeader = "Submit";
		});
	};
})

// editbranchCtrl
app.controller('editbranchCtrl', function($scope, $state, $stateParams, $http,
		$window, ServerAddress, StudentDataOp) {
	var branchcode = $stateParams.branchcode
	$scope.dataIn = [];

	StudentDataOp.get_a_branch(branchcode).success(function(data) {
		$scope.dataIn = data[0];
	});

	$scope.branchedit = function() {
		console.log($scope.dataIn);
		$http({
			method : 'POST',
			url : ServerAddress.address + '/editbranch',
			data : {
				'branchcode' : $scope.dataIn.BRANCHCODE,
				'branchname' : $scope.dataIn.BRANCHNAME,
				'manager' : $scope.dataIn.MANAGER
			}
		}).success(function(data) {
			alert('Branch details ammended');
			$scope.dataIn = [];
			$state.go('branches');
		}).error(function() {
			alert("Error ammending branch");
		});
	}
})
app.controller('newuserCtrl', function($scope, $http, $window, ServerAddress, StudentDataOp) {
	$scope.branch = [];
	$scope.departments = [];
	StudentDataOp.getAllBranch().success(function(data) {
		$scope.branch = data;
	})
	StudentDataOp.getDepartments().success(function(data) {
		$scope.departments = data;
	})
	$scope.createUser = function() {
		$scope.mySwitch = true;
		$http({
			method : 'POST',
			url : ServerAddress.address + '/addUser',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : $scope.dataIn
		}).success(function(data) {
			$scope._message = "User Created";
			alert('User Created');
			$scope.dataIn = {};
		}).error(function() {
			alert("Error Creating User");
			$scope.dataIn = {};
		});
	};

	$scope.usernamecheck = function() {
		$http(
				{
					url : ServerAddress.address + '/api/v2/checkuserifexists/'
							+ $scope.dataIn._username,
					method : 'get',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					}
				}).success(function(response) {
			if (response.length > 0) {
				alert("User already exists");
				$scope.dataIn = {};
				// $window.document.getElementById('username').setfocus();
			}
		}).error(function() {
			console.log('Error finding if user exists');
		})
	}
})

app.controller('departmentCtrl', function($scope,$state,$http, ServerAddress, StudentDataOp){
	$scope.departments = [];
	$scope.dataIn = [];
	
	StudentDataOp.getDepartments().success(function(data){
		$scope.departments = data;
	})
	
	$scope.deleteDepartment = function(deptcode){
		if(confirm('Do you want to delete dept '+deptcode +' ?')){
			$http({
				method : 'post',
				url : ServerAddress.address + '/deletedepartment',
				data : {
					'deptcode' : deptcode
				}
			}).success(function(data) {
				alert('Department deleted !');
				//reload page
				$state.reload();
			}).error(function() {
				alert("Error deleting department");
			});
		}
	}
	
	$scope.adddepartmentfunc = function(){
		$http({
			method : 'post',
			url : ServerAddress.address + '/adddepartment',
			data : {
				'deptname' : $scope.dataIn.deptname
			}
		}).success(function(data) {
			alert('Dept '+$scope.dataIn.deptname+' added');
			$scope.dataIn = [];
			$state.go('departments');
		}).error(function() {
			alert("Error creating department");
		});
	}
	
})