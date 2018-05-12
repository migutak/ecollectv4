var app = angular.module("RDash",["ui.router", "mainService","angular-loading-bar",'ngIdle',"ngMaterial","ui.grid",'ui.grid.selection', 'ui.grid.exporter',
	'ui.grid.moveColumns','ui.grid.resizeColumns','ui.grid.saveState',"angular-ladda",'ui-notification','ng-fusioncharts','ngFileUpload']);

app.config(["$stateProvider", "$urlRouterProvider", function(t, e) {
		e.otherwise("/");
		t.state("/", {
			url : "/",
			templateUrl : "./views/templates/dashcc.html",
			controller : "dashccCtrl"
		}).state("/dash", {
			url : "/dash",
			templateUrl : "./views/templates/dashcc.html",
			controller : "dashccCtrl"
		}).state("viewall",{
			url : "/viewall",
			templateUrl : "./views/templates/viewallcc.html",
			controller : "viewallccCtrl"
		}).state("precards",{
			url : "/precards",
			templateUrl : "./views/templates/precards.html",
			controller : "precardsCtrl"
		}).state("todaywork",{
			url : "/todaywork",
			templateUrl : "./views/templates/todaysworkcc.html",
			controller : "todaysworkccCtrl"
		}).state("myworklist",{
			url : "/myworklist",
			templateUrl : "./views/templates/worklistcc.html",
			controller : "worklistccCtrl"
		}).state("myallocations",{
			url : "/myallocations",
			templateUrl : "./views/templates/myallocationscc.html",
			controller : "myallocationsccCtrl"
		}).state("closed",{
			url : "/closed",
			templateUrl : "./views/templates/closedcc.html",
			controller : "closedccCtrl"
		}).state("overdueplans",{
			url : "/overdueplans",
			templateUrl : "./views/templates/overdueplanscc.html",
			controller : "overdueplansccCtrl"
		}).state("noplans",{
			url : "/noplans",
			templateUrl : "./views/templates/noplans.html",
			controller : "noplansccCtrl"
		}).state('investigators', {
			url : "/investigators",
			templateUrl : "views/templates/investigators.html",
			controller : 'investigatorsCtrl'
		}).state('debtcollectors', {
			url : "/debtcollectors",
			templateUrl : "views/templates/debtcollectors.html",
			controller : 'debtcollectorsCtrl'
		}).state('newdebtcollectors', {
			url : "/newdebtcollectors",
			templateUrl : "views/templates/newdebtcollectors.html",
			controller : 'newdebtcollectorsCtrl'
		}).state('newinvestigate', {
			url : "/newinvestigate",
			templateUrl : "views/templates/newinvestigate.html",
			controller : 'newinvestigateCtrl'
		}).state('assigndebtcollector', {
			url : "/assigndebtcollector/:id",
			templateUrl : "views/templates/assigndebtcollector.html",
			controller : 'assigndebtcollectorsCtrl'
		}).state('assigninvestigator', {
			url : "/assigninvestigator/:id",
			templateUrl : "views/templates/assigninvestigator.html",
			controller : 'assigninvestigatorsCtrl'
		}).state('updatedebtcollectors', {
			url : "/updatedebtcollectors/:id",
			templateUrl : "views/templates/updatedebtcollectors.html",
			controller : 'updatedebtcollectorsCtrl'
		}).state('updateinvestigators', {
			url : "/updateinvestigators/:id",
			templateUrl : "views/templates/updateinvestigators.html",
			controller : 'updateinvestigatorsCtrl'
		}).state("viewall_loan",{
			url : "/viewall_loan",
			templateUrl : "./views/templates/viewall_lazy.html", //changed from viewall.html
			controller : "viewallCtrl"
		}).state('searchbyarocode', {
			url : "/searchbyarocode/:arocode",
			templateUrl : "./views/templates/searcharocode.html",
			controller : "searcharocodeCtrl"
		}).state("searchbycustnumber",{
			url : "/searchbycustnumber/:custnumber",
			templateUrl : "./views/templates/searchbycustnumber.html",
			controller : "searchbycustnumberCtrl"
		}).state("searchbyname",{
			url : "/searchbyname/:name",
			templateUrl : "./views/templates/searchbyname.html",
			controller : "searchbynameCtrl"
		}).state('searchempcode', {
			url : "/searchempcode/:empcode",
			templateUrl : "./views/templates/searchempcode.html",
			controller : "searchempcodeCtrl"
		}).state('searchbyidnumber', {
			url : "/searchbyidnumber/:idnumber",
			templateUrl : "./views/templates/searchidnumber.html",
			controller : "searchidnumberCtrl"
		}).state('invoices', {
			url : "/invoices",
			templateUrl : "views/templates/invoices2.html",
			controller : "invoicesCtrl"
		}).state('payments', {
			url : "/payments",
			templateUrl : "views/templates/payments.html",
			controller : "paymentsCtrl"
		}).state("aro",{
			url : "/aro",
			templateUrl : "./views/templates/aro.html",
			controller : "aroCtrl"
		}).state("updatearo",{
			url : "/updatearo/:arocode",
			templateUrl : "./views/templates/updatearo.html",
			controller : "aroupdateCtrl"
		}).state("allocate",{
			url : "/allocate",
			templateUrl : "./views/templates/allocate_uploads.html",
			controller : "allocate_Ctrl"
		})
	}]);