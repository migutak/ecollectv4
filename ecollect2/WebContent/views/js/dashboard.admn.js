angular.module("RDash", ["ui.router", "mainService","ngIdle" ])
//"use strict";
//angular.module("RDash")
.config(
		[ "$stateProvider", "$urlRouterProvider", function(t, e) {
			e.otherwise("/"), 
			t.state("/", {
				url : "/",
				templateUrl : "./views/templates/users.html", //dash-admin.html
				controller : "usersCtrl" //MasterCtrl
			}).state("users", {
				url : "/users",
				templateUrl : "./views/templates/users.html",
				controller : "usersCtrl"
			}).state("newuser",{
				url : "/newuser",
				templateUrl : "./views/templates/newuser.html",
				controller : "newuserCtrl"
			}).state("branches",{
				url : "/branches",
				templateUrl : "./views/templates/branches.html",
				controller : "branchesCtrl"
			}).state("editbranch",{
				url : "/editbranch/:branchcode",
				templateUrl : "./views/templates/editbranchadmin.html",
				controller : "editbranchCtrl"
			}).state("departments",{
				url : "/departments",
				templateUrl : "./views/templates/departments.html",
				controller : "departmentCtrl"
			}).state("newdepartment",{
				url : "/newdepartment",
				templateUrl : "./views/templates/newdepartment.html",
				controller : "departmentCtrl"
			});
		} ])

/*.config(function(IdleProvider, KeepaliveProvider) {
    KeepaliveProvider.interval(1);
    IdleProvider.timeout(60);
    IdleProvider.idle(60*10);
})

.run(function($rootScope, Idle, $log){
    Idle.watch();
    $log.debug('app started...');
    $rootScope.$on('$locationChangeStart',function(){
    	var loggeduser = localStorage.getItem("uname");
        if(loggeduser==="" || loggeduser === undefined){
        	window.open("login.html","_self");
        }
    })
  });*/