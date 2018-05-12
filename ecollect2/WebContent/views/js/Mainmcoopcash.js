/**
 * 
 */

var app = angular.module("RDash",["ui.router", "mainService","angular-loading-bar",'ngIdle',"ngMaterial","ui.grid",'ui.grid.selection', 'ui.grid.exporter',
    'ui.grid.moveColumns','ui.grid.resizeColumns','ui.grid.saveState',"angular-ladda",'ui-notification','ngFileUpload','ng-fusioncharts']);

app.config(
		[ "$stateProvider", "$urlRouterProvider", function(t, e) {
			e.otherwise("/");
			
			t.state("/", {
				url : "/",
				templateUrl : "./views/templates/dashboardmcoop.html",
				controller : "dashCtrl"
			}).state("dashboard", {
				url : "/dashboard",
				templateUrl : "./views/templates/dashboardmcoop.html",
				controller : "dashCtrl"
			}).state("viewall",{
				url : "/viewall",
				templateUrl : "./views/templates/viewallmcoop2.html",
				controller : "viewallmcoopCtrl"
			}).state("myallocations",{
				url : "/myallocations",
				templateUrl : "./views/templates/myallocations.html",
				controller : "allocationsCtrl"
			}).state("myworklist",{
				url : "/myworklist",
				templateUrl : "./views/templates/worklist.html",
				controller : "worklistCtrl"
			}).state("act",{
				url : "/act/:accnumber",
				templateUrl : "./views/templates/activity.html",
				controller : "activity_Ctrl"
			}).state("teamreview",{
				url : "/teamreview",
				templateUrl : "./views/templates/teamreviewer.html",
				controller : "teamreviewCtrl"
			}).state("funds",{
				url : "/funds",
				templateUrl : "./views/templates/funds.html"
				//controller : "fundsCtrl"
			}).state("broken",{
				url : "/broken",
				templateUrl : "./views/templates/broken.html"
			}).state("woffs",{
				url : "/woffs",
				templateUrl : "./views/templates/woff.html",
				controller : "woffCtrl"
			}).state("regions",{
				url : "/regions",
				templateUrl : "./views/templates/regions.html",
				controller : "RegionCtrl"
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
			}).state("sla",{
				url : "/sla",
				templateUrl : "./views/templates/sla.html",
				controller : "slaCtrl"
			}).state("newaro",{
				url : "/newaro",
				templateUrl : "./views/templates/newaro.html",
				controller : "aroCtrl"
			}).state("updatearo",{
				url : "/updatearo/:arocode",
				templateUrl : "./views/templates/updatearo.html",
				controller : "aroupdateCtrl"
			}).state("searchbyarocode",{
				url : "/searchbyarocode/:arocode",
				templateUrl : "./views/templates/searchbyarocode.html",
				controller : "searchbyarocodeCtrl"
			}).state("searchbyname",{
				url : "/searchbyname/:name",
				templateUrl : "./views/templates/searchbyname.html",
				controller : "searchbynameCtrl"
			}).state("searchbycustnumber",{
				url : "/searchbycustnumber/:custnumber",
				templateUrl : "./views/templates/searchbycustnumber.html",
				controller : "searchbycustnumberCtrl"
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
			}).state("newbuckets",{
				url : "/newbuckets",
				templateUrl : "./views/templates/newbuckets.html",
				controller : "bucketsCtrl"
			}).state("todayswork",{
				url : "/todayswork",
				templateUrl : "./views/templates/todayswork.html",
				controller : "todaysworkCtrl"
			}).state("serviceproviders",{
				url : "/serviceproviders",
				templateUrl : "./views/templates/serviceproviders.html",
				controller : "serviceptodaysworkrovidersCtrl"
			}).state("action",{
				url : "/action/:id",
				templateUrl : "./views/templates/action.html",
				controller : "ActivityCtrl"
			}).state('searchid', {
				url : "/searchid",
				templateUrl : "./views/templates/searchid.html",
				controller : "searchidCtrl"
			}).state('actcodes', {
				url : "/actcodes",
				templateUrl : "views/templates/actcodes.html",
				controller : 'actcodesCtrl'
			}).state('accplans', {
				url : "/accplans",
				templateUrl : "views/templates/accplans.html",
				controller : 'accplansCtrl'
			}).state('newactcode', {
				url : "/newactcode",
				templateUrl : "views/templates/newactcode.html",
				controller : 'actcodesCtrl'
			}).state('newaccplan', {
				url : "/newaccplan",
				templateUrl : "views/templates/newaccplan.html",
				controller : 'accplansCtrl'
			}).state('editactcode', {
				url : "/editactcode/:actcode",
				templateUrl : "views/templates/editactcode.html",
				controller : 'editactcodesCtrl'
			}).state('noplans', {
				url : "/noplans",
				templateUrl : "views/templates/noplans.html", //
				controller : "noplansCtrl"
			}).state('overdueplans', {
				url : "/overdueplans",
				templateUrl : "views/templates/overdueplans.html",
				controller : "overdueplansCtrl"
			}).state('bankregions', {
				url : "/bankregions",
				templateUrl : "views/templates/bankregions.html",//
				controller : "bankregionsCtrl"
			}).state('newregion', {
				url : "/newregion",
				templateUrl : "views/templates/newregion.html",
				controller : "bankregionsCtrl"
			}).state('newbranchregion', {
				url : "/newbranchregion",
				templateUrl : "views/templates/newbranchregion.html",
				controller : "bankregionsCtrl"
			}).state('invoices', {
				url : "/invoices",
				templateUrl : "views/templates/invoices.html",
				controller : "invoicesCtrl"
			}).state('payments', {
				url : "/payments",
				templateUrl : "views/templates/payments.html",
				controller : "paymentsCtrl"
			}).state('nocreditwatch', {
			    url : "/nocreditwatch",
			    templateUrl : "views/templates/nocreditwatchmcoop.html",
			    controller : 'nocreditwatchCtrl'
			}).state('creditwatch', {
			    url : "/creditwatch",
			    templateUrl : "views/templates/creditwatchmcoop.html",
			    controller : 'creditwatchCtrl'
			});
		} ]);