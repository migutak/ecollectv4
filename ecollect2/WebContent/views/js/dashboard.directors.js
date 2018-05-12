angular.module("RDash", ["ui.router", "mainService","ngIdle" ])
.config(
		[ "$stateProvider", "$urlRouterProvider", function(t, e) {
			e.otherwise("/"), 
			t.state("/", {
				url : "/",
				templateUrl : "./views/templates/dashboard.html"
			}).state("dashsummary", {
				url : "/dashsummary",
				templateUrl : "./views/templates/dashboard.html"
			}).state("regsummary",{
				url : "/regsummary",
				templateUrl : "./views/templates/regdashboard.html"
			}).state("activsummary",{
				url : "/activsummary",
				templateUrl : "./views/templates/divdashboard.html"
			}).state("amountcollected",{
				url : "/amountcollected",
				templateUrl : "./views/templates/amountcollecteddash.html"
			}).state("vintages",{
				url : "/vintages",
				templateUrl : "./views/templates/vintages.html"
			}).state("rollrates",{
				url : "/rollrates",
				templateUrl : "./views/templates/rollrates.html"
			});
		} ]);