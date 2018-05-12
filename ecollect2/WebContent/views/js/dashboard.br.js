angular.module("RDash", [ "ui.bootstrap", "ui.router", "ngCookies", "mainService", "ngResource","jqwidgets","angular-loading-bar",'ngIdle']);
"use strict";
angular.module("RDash").config(
		[ "$stateProvider", "$urlRouterProvider", function(t, e) {
			e.otherwise("/"), t.state("index", {
				url : "/",
				templateUrl : "./views/templates/viewallbranch.html",
				controller : "viewallCtrlbranch"
			}).state("dashboard",{
				url : "/dashboard",
				templateUrl : "./views/templates/dashboard.html",
				controller : "dashCtrl"
			}).state("viewportfolio",{
				url : "/viewportfolio",
				templateUrl : "./views/templates/viewallportfolio.html",
				controller : "viewallportCtrl"
			}).state("myallocations",{
				url : "/myallocations",
				templateUrl : "./views/templates/myallocations.html",
				controller : "allocationsCtrl"
			}).state("myallocationsportfolio",{
				url : "/myallocationsportfolio",
				templateUrl : "./views/templates/myallocations.html",
				controller : "allocationsCtrlport"
			}).state("myallocatcards",{
				url : "/myallocatcards",
				templateUrl : "./views/templates/myallocations_cards.html",
				controller : "allocatcardsCtrl" 
			}).state("myworklist",{
				url : "/myworklist",
				templateUrl : "./views/templates/worklist.html",
				controller : "worklistCtrl"
			}).state("myworklistbranch",{
				url : "/myworklistbranch",
				templateUrl : "./views/templates/worklistbranch.html",
				controller : "worklistCtrlbranch"
			}).state("myworklistportfolio",{
				url : "/myworklistportfolio",
				templateUrl : "./views/templates/worklist.html",
				controller : "worklistCtrlport"
			}).state("worklistcc",{
				url : "/worklistcc",
				templateUrl : "./views/templates/worklistcc.html",
				controller : "worklistccCtrl"
			}).state("closed",{
				url : "/closed",
				templateUrl : "./views/templates/closed.html",
				controller : "closedCtrl"
			}).state("activitycc",{
				url : "/activitycc/:cardnumber",
				templateUrl : "./views/templates/activitycc.html",
				controller : "activity_cc_Ctrl"
			}).state("act",{
				url : "/act/:accnumber",
				templateUrl : "./views/templates/activity.html",
				controller : "activity_Ctrl"
			}).state("teamreview",{
				url : "/teamreview",
				templateUrl : "./views/templates/teamreviewer.html",
				controller : "teamreviewCtrl"
			}).state("teamreviewcc",{
				url : "/teamreviewcc",
				templateUrl : "./views/templates/teamreviewer_cc.html",
				controller : "teamreviewccCtrl"
			}).state("users",{
				url : "/users",
				templateUrl : "./views/templates/users.html",
				controller : "usersCtrl"
			}).state("funds",{
				url : "/funds",
				templateUrl : "./views/templates/funds.html"
			}).state("new",{
				url : "/new",
				templateUrl : "./views/templates/new2.html",
				controller : "newCtrl"
			}).state("broken",{
				url : "/broken",
				templateUrl : "./views/templates/broken.html"
			}).state("letters",{
				url : "/letters",
				templateUrl : "./views/templates/letters.html",
				controller : "duelettersCtrl"
			}).state("branches",{
				url : "/branches",
				templateUrl : "./views/templates/branches.html",
				controller : "branchesCtrl"
			}).state("woffs",{
				url : "/woffs",
				templateUrl : "./views/templates/woff.html",
				controller : "woffCtrl"
			}).state("portfolio",{
				url : "/portfolio",
				templateUrl : "./views/templates/portfolio.html",
				controller : "portfolioCtrl"
			}).state("regions",{
				url : "/regions",
				templateUrl : "./views/templates/regions.html",
				controller : "RegionCtrl"
			}).state("demands",{
				url : "/demands",
				templateUrl : "./views/templates/demands.html",
				controller : "demandsCtrl"
			}).state("branch",{
				url : "/branch",
				templateUrl : "./views/templates/branch.html",
				controller : "branchRegionCtrl"
			}).state("managers",{
				url : "/managers",
				templateUrl : "./views/templates/managers.html",
				controller : "managersCtrl"
			}).state("editmanager",{
				url : "/editmanager/:branchid",
				templateUrl : "./views/templates/editmanager.html",
				controller : "editmanagerCtrl"
			}).state("editbranch",{
				url : "/editbranch/:branchid",
				templateUrl : "./views/templates/editbranch.html",
				controller : "editmanagerCtrl"
			}).state("confirmletter",{
				url : "/confirmletter/:letterid",
				templateUrl : "./views/templates/confirmletter.html",
				controller : "confirmletterCtrl"
			}).state("memo",{
				url : "/memo",
				templateUrl : "./views/templates/memo.html",
				controller : "memoCtrl"
			}).state("allocate",{
				url : "/allocate",
				templateUrl : "./views/templates/allocate.html",
				controller : "allocateCtrl"
			}).state("aro",{
				url : "/aro",
				templateUrl : "./views/templates/aro.html",
				controller : "aroCtrl"
			}).state("newaro",{
				url : "/newaro",
				templateUrl : "./views/templates/newaro.html",
				controller : "aroCtrl"
			}).state("updatearo",{
				url : "/updatearo/:arocode",
				templateUrl : "./views/templates/updatearo.html",
				controller : "aroupdateCtrl"
			}).state("deletearo",{
				url : "/deletearo/:arocode",
				templateUrl : "./views/templates/deletearo.html",
				controller : "arodeleteCtrl"
			}).state("cards",{
				url : "/cards",
				templateUrl : "./views/templates/cards.html",
				controller : "cardsCtrl"
			}).state("buckets",{
				url : "/buckets",
				templateUrl : "./views/templates/buckets.html",
				controller : "bucketsCtrl"
			});
		} ]);
function rdLoading() {
	var d = {
		restrict : "AE",
		template : '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
	};
	return d;
}

//for user timeout
angular.module("RDash").config(function(IdleProvider, KeepaliveProvider) {
    KeepaliveProvider.interval(1);
    IdleProvider.timeout(60);
    IdleProvider.idle(60*2);
  })
  .run(function($rootScope, Idle, $log, Keepalive){
    Idle.watch();
    $log.debug('app started.');
    $rootScope.$on('$locationChangeStart',function(){
    	var loggeduser = localStorage.getItem("uname");
        if(loggeduser=="" || loggeduser == undefined){
        	window.open("login2.html","_self");
        }
    })
  });
//end user timeout
angular.module("RDash").directive("rdLoading", rdLoading);
function rdWidgetBody() {
	var d = {
		requires : "^rdWidget",
		scope : {
			loading : "@?",
			classes : "@?"
		},
		transclude : !0,
		template : '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
		restrict : "E"
	};
	return d;
}
angular.module("RDash").directive("rdWidgetBody", rdWidgetBody);
function rdWidgetFooter() {
	var e = {
		requires : "^rdWidget",
		transclude : !0,
		template : '<div class="widget-footer" ng-transclude></div>',
		restrict : "E"
	};
	return e;
}
angular.module("RDash").directive("rdWidgetFooter", rdWidgetFooter);
function rdWidgetTitle() {
	var e = {
		requires : "^rdWidget",
		scope : {
			title : "@",
			icon : "@"
		},
		transclude : !0,
		template : '<div class="widget-header"><i class="fa" ng-class="icon"></i> {{title}} <div class="pull-right" ng-transclude></div></div>',
		restrict : "E"
	};
	return e;
}
angular.module("RDash").directive("rdWidgetHeader", rdWidgetTitle);
function rdWidget() {
	var d = {
		transclude : !0,
		template : '<div class="widget" ng-transclude></div>',
		restrict : "EA"
	};
	return d;
}
angular.module("RDash").directive("rdWidget", rdWidget);
function AlertsCtrl(e) {
			e.alerts = [
					{
						type : "success",
						msg : "Thanks for visiting! Feel free to create pull requests to improve the dashboard!"
					},
					{
						type : "danger",
						msg : "Found a bug? Create an issue with as many details as you can."
					} ], e.addAlert = function() {
				e.alerts.push({
					msg : "Another alert!"
				});
			}, e.closeAlert = function(t) {
				e.alerts.splice(t, 1);
			};
}
angular.module("RDash").controller("AlertsCtrl", [ "$scope", AlertsCtrl ]);
function MasterCtrl(t, e) {
	var o = 992;
	t.getWidth = function() {
		return window.innerWidth;
	}, t.$watch(t.getWidth, function(g) {
		t.toggle = g >= o ? angular.isDefined(e.get("toggle")) ? e
				.get("toggle") ? !0 : !1 : !0 : !1;
	}), t.toggleSidebar = function() {
		t.toggle = !t.toggle, e.put("toggle", t.toggle);
	}, window.onresize = function() {
		t.$apply();
	};
}
angular.module("RDash").controller("MasterCtrl",
		[ "$scope", "$cookieStore", MasterCtrl ]);