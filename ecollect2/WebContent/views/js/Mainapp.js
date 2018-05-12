/**
 * 
 */

var app = angular.module("RDash",["ui.router", "mainService","angular-loading-bar",'ngIdle',"ngMaterial","ui.grid",'ui.grid.selection', 'ui.grid.exporter',
	'ui.grid.moveColumns','ui.grid.resizeColumns','ui.grid.saveState',"angular-ladda",'ui-notification','ngFileUpload',
	'angularjs-dropdown-multiselect',"ng-fusioncharts","angularSpinner"]);

app.config([
	"$stateProvider", "$urlRouterProvider", function(t, e) {
		e.otherwise("/");
			t.state("index", {
				url : "/",
				templateUrl : "./views/templates/user_dashboard.html",//changed from dashboard.html
				controller : "dashCtrl"
			}).state("dashboard", {
				url : "/dashboard",
				templateUrl : "./views/templates/user_dashboard.html",
				controller : "dashCtrl"
			}).state("regionaldashboard", {
				url : "/regionaldashboard",
				templateUrl : "./views/templates/regdashboard.html",
				controller : 'regionaldashboardCtrl'
			}).state("par", {
				url : "/par",
				templateUrl : "./views/templates/par.html",
				controller : 'parCtrl'
			}).state("activitydashboard", {
				url : "/activitydashboard",
				templateUrl : "./views/templates/activitydashboard.html",
				controller :'activitydashboardCtrl'
			}).state("spdashboard", {
				url : "/spdashboard",
				templateUrl : "./views/templates/spdashboard.html",
				controller:'spdashboardCtrl'
			}).state("branchdashboard", {
				url : "/branchdashboard",
				templateUrl : "./views/templates/branchdashboard.html"
			}).state("notes_dash", {
				url : "/notes_dash",
				templateUrl : "./views/templates/notes_dash.html",
				controller : 'notesdashCtrl'
			}).state("sms_dash", {
				url : "/sms_dash",
				templateUrl : "./views/templates/sms_dash.html",
				controller : 'smsdashCtrl'
			}).state("vintages", {
				url : "/vintages",
				templateUrl : "./views/templates/vintages.html"
			}).state("rollrates", {
				url : "/rollrates",
				templateUrl : "./views/templates/rollrates.html"
			}).state("curerate", {
				url : "/curerate",
				templateUrl : "./views/templates/curerate.html"
			}).state("viewallport_r",{
				url : "/viewallport_r",
				templateUrl : "./views/templates/viewallport_r.html",
				controller : "viewallportCtrl"
			}).state("viewall",{
				url : "/viewall/:from",
				templateUrl : "./views/templates/ngwidgets.html",
				controller : "viewallCtrl" //viewallazy
			}).state("viewallmcoop",{
				url : "/viewallmcoop",
				templateUrl : "./views/templates/viewallmcoop2.html"
				//controller : "viewallmcoopCtrl"
			}).state("viewallbranch",{
				url : "/viewallbranch",
				templateUrl : "./views/templates/viewallbranch.html",
				controller : "viewallCtrlbranch"
			}).state("myallocationsport",{
				url : "/myallocationsport",
				templateUrl : "./views/templates/myallocationsport.html",
				controller : "myallocationsportCtrl"
			}).state("myallocations",{
				url : "/myallocations",
				templateUrl : "./views/templates/myallocations.html",
				controller : "allocationsCtrl"
			}).state("myallocationsmcoop",{
				url : "/myallocationsmcoop",
				templateUrl : "./views/templates/myallocations.html",
				controller : "allocationsmcoopCtrl"
			}).state("todaysworkport",{
				url : "/todaysworkport",
				templateUrl : "./views/templates/todaysworkport.html",
				controller : "todaysworkportCtrl"
			}).state("myallocatcards",{
				url : "/myallocatcards",
				templateUrl : "./views/templates/myallocations_cards.html",
				controller : "allocatcardsCtrl" 
			}).state("myworklist",{
				url : "/myworklist",
				templateUrl : "./views/templates/worklist.html",
				controller : "worklistCtrl"
			}).state("predelinq",{
				url : "/predelinq",
				templateUrl : "./views/templates/predelinq.html",
				controller : "predelinqCtrl"
			}).state("myworklistmcoop",{
				url : "/myworklistmcoop",
				templateUrl : "./views/templates/worklist.html",
				controller : "worklistmcoopCtrl"
			}).state("myworklistbranch",{
				url : "/myworklistbranch",
				templateUrl : "./views/templates/worklistbranch.html",
				controller : "worklistCtrlbranch"
			}).state("myworklistport",{
				url : "/myworklistport",
				templateUrl : "./views/templates/myworklistport.html",
				controller : "myworklistportCtrl"
			}).state("worklistcc",{
				url : "/worklistcc",
				templateUrl : "./views/templates/worklistcc.html",
				controller : "worklistccCtrl"
			}).state("closed",{
				url : "/closed",
				templateUrl : "./views/templates/closed.html",
				controller : "closedCtrl"
			}).state("closedcc",{
				url : "/closedcc",
				templateUrl : "./views/templates/closedcc.html",
				controller : "closedccCtrl"
			}).state("activitycc",{
				url : "/activitycc/:cardnumber",
				templateUrl : "./views/templates/activitycc.html",
				controller : "activity_cc_Ctrl"
			}).state('invoices', {
				url : "/invoices",
				templateUrl : "views/templates/invoices_c.html",
				controller : "invoicesCtrl"
			}).state('newinvoice', {
				url : "/newinvoice",
				templateUrl : "views/templates/newinvoice.html",
				controller : "invoicesCtrl"
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
			}).state("allocate",{
				url : "/allocate",
				templateUrl : "./views/templates/allocate_uploads.html",
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
			}).state("todayswork",{
				url : "/todayswork",
				templateUrl : "./views/templates/todayswork.html",
				controller : "todaysworkCtrl"
			}).state("todaysworkmcoop",{
				url : "/todaysworkmcoop",
				templateUrl : "./views/templates/todayswork.html",
				controller : "todaysworkmcoopCtrl"
			}).state('searchid', {
				url : "/searchid",
				templateUrl : "./views/templates/searchid.html",
				controller : "searchidCtrl"
			}).state('searchempcode', {
				url : "/searchempcode/:empcode",
				templateUrl : "./views/templates/searchempcode.html",
				controller : "searchempcodeCtrl"
			}).state('searchbyarocode', {
				url : "/searchbyarocode/:arocode",
				templateUrl : "./views/templates/searcharocode.html",
				controller : "searcharocodeCtrl"
			}).state('searchbyrrocode', {
				url : "/searchbyrrocode/:rrocode",
				templateUrl : "./views/templates/searchrrocode.html",
				controller : "searchrrocodeCtrl"
			}).state('searchbyidnumber', {
				url : "/searchbyidnumber/:idnumber",
				templateUrl : "./views/templates/searchidnumber.html",
				controller : "searchidnumberCtrl"
			}).state('searchaccnumber', {
				url : "/searchaccnumber/:acc",
				templateUrl : "./views/templates/searchaccnumber.html",
				controller : "searchaccnumberCtrl"
			}).state('assignallocateflags', {
				url : "/assignallocateflags/:acc",
				templateUrl : "./views/templates/assignallocateflags.html",
				controller : "assignallocateflagsCtrl"
			}).state('actcodes', {
				url : "/actcodes",
				templateUrl : "views/templates/actcodes.html",
				controller : 'actcodesCtrl'
			}).state('allocateflags', {
				url : "/allocateflags",
				templateUrl : "views/templates/allocateflags.html",
				controller : 'allocateflagsCtrl'
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
			}).state('sptype', {
				url : "/sptype",
				templateUrl : "views/templates/sptypes.html",
				controller : 'sptypeCtrl'
			}).state('editsptype', {
				url : "/editsptype/:spcode/:sptitle",
				templateUrl : "views/templates/editsptype.html",
				controller : 'editsptypeCtrl'
			}).state('newsptype', {
				url : "/newsptype",
				templateUrl : "views/templates/newsptype.html",
				controller : 'sptypeCtrl'
			}).state('investigators', {
				url : "/investigators",
				templateUrl : "views/templates/investigators.html",
				controller : 'investigatorsCtrl'
			}).state('auctioneers', {
				url : "/auctioneers1",
				templateUrl : "views/templates/auctioneers2.html",
				controller : 'auctioneersCtrl'
			}).state('repossessors', {
				url : "/repossessors",
				templateUrl : "views/templates/repossessors.html",
				controller : 'repossessorsCtrl'
			}).state('marketors', {
				url : "/marketors",
				templateUrl : "views/templates/marketors.html",
				controller : 'marketorsCtrl'
			}).state('debtcollectors', {
				url : "/debtcollectors",
				templateUrl : "views/templates/debtcollectors.html",
				controller : 'debtcollectorsCtrl'
			}).state('yards', {
				url : "/yards",
				templateUrl : "views/templates/yards.html",
				controller : 'yardsCtrl'
			}).state('valuers', {
				url : "/valuers",
				templateUrl : "views/templates/valuers.html",
				controller : 'valuersCtrl'
			}).state('newinvestigate', {
				url : "/newinvestigate",
				templateUrl : "views/templates/newinvestigate.html",
				controller : 'newinvestigateCtrl'
			}).state('newmarketors', {
				url : "/newmarketors",
				templateUrl : "views/templates/newmarketors.html",
				controller : 'newmarketorsCtrl'
			}).state('newauctioneers', {
				url : "/newauctioneers",
				templateUrl : "views/templates/newauctioneers.html",
				controller : 'newauctioneersCtrl'
			}).state('newdebtcollectors', {
				url : "/newdebtcollectors",
				templateUrl : "views/templates/newdebtcollectors.html",
				controller : 'newdebtcollectorsCtrl'
			}).state('newvaluer', {
				url : "/newvaluer",
				templateUrl : "views/templates/newvaluer.html",
				controller : 'newvaluerCtrl'
			}).state('newrepo', {
				url : "/newrepo",
				templateUrl : "views/templates/newrepo.html",
				controller : 'newrepoCtrl'
			}).state('newyard', {
				url : "/newyard",
				templateUrl : "views/templates/newyard.html",
				controller : 'newyardCtrl'
			}).state('discharge', {
				url : "/discharge",
				templateUrl : "views/templates/discharge.html",
				controller : 'dischargeCtrl'
			}).state('transfer', {
				url : "/transfer",
				templateUrl : "views/templates/transfer.html",
				controller : 'transferCtrl'
			}).state('notices40days', {
				url : "/notices40days",
				templateUrl : "views/templates/notices40days.html",
				controller : 'notices40daysCtrl'
			}).state('noplans', {
				url : "/noplans",
				templateUrl : "views/templates/noplans.html", //
				controller : "noplansCtrl"
			}).state('noplansmcoop', {
				url : "/noplansmcoop",
				templateUrl : "views/templates/noplans.html", //
				controller : "noplansmcoopCtrl"
			}).state('overdueplans', {
				url : "/overdueplans",
				templateUrl : "views/templates/overdueplans.html",
				controller : "overdueplansCtrl"
			}).state('assignauctioneers', {
			    url : "/assignauctioneers/:id",
			    templateUrl : "views/templates/assignauctioneer.html",
			    controller : 'assignauctioneerCtrl'
			}).state('assignrepossessor', {
			    url : "/assignrepossessor/:id",
			    templateUrl : "views/templates/assignrepossessor.html",
			    controller : 'assignrepossessorsCtrl'
			}).state('assignmarketor', {
			    url : "/assignmarketor/:id",
			    templateUrl : "views/templates/assignmarketor.html",
			    controller : 'assignmarketorCtrl'
			}).state('assigninvestigator', {
			    url : "/assigninvestigator/:id",
			    templateUrl : "views/templates/assigninvestigator.html",
			    controller : 'assigninvestigatorsCtrl'
			}).state('assigndebtcollector', {
			    url : "/assigndebtcollector/:id",
			    templateUrl : "views/templates/assigndebtcollector.html",
			    controller : 'assigndebtcollectorsCtrl'
			}).state('assignvaluer', {
			    url : "/assignvaluer/:id",
			    templateUrl : "views/templates/assignvaluer.html",
			    controller : 'assignvaluersCtrl'
			}).state('updateauctioneers', {
			    url : "/updateauctioneers/:id",
			    templateUrl : "views/templates/updateauctioneers.html",
			    controller : 'updateauctioneersCtrl'
			}).state('updaterepossessors', {
			    url : "/updaterepossessors/:id",
			    templateUrl : "views/templates/updaterepossessors.html",
			    controller : 'updaterepossessorsCtrl'
			}).state('updatemarketors', {
			    url : "/updatemarketors/:id",
			    templateUrl : "views/templates/updatemarketors.html",
			    controller : 'updatemarketorsCtrl'
			}).state('updatedebtcollectors', {
			    url : "/updatedebtcollectors/:id",
			    templateUrl : "views/templates/updatedebtcollectors.html",
			    controller : 'updatedebtcollectorsCtrl'
			}).state('updateinvestigators', {
			    url : "/updateinvestigators/:id",
			    templateUrl : "views/templates/updateinvestigators.html",
			    controller : 'updateinvestigatorsCtrl'
			}).state('updatevaluers', {
			    url : "/updatevaluers/:id",
			    templateUrl : "views/templates/updatevaluers.html",
			    controller : 'updatevaluersCtrl'
			}).state('deletemarketors', {
			    url : "/deletemarketors/:id/:cust",
			    templateUrl : "views/templates/deletemarketors.html",
			    controller : 'deletemarketorsCtrl'
			}).state('deleteinvestigators', {
			    url : "/deleteinvestigators/:id/:cust",
			    templateUrl : "views/templates/deleteinvestigators.html",
			    controller : 'deleteinvestigatorsCtrl'
			}).state('deletedebtcollectors', {
			    url : "/deletedebtcollectors/:id/:cust",
			    templateUrl : "views/templates/deletedebtcollectors.html",
			    controller : 'deletedebtcollectorsCtrl'
			}).state('deleteauctioneers', {
			    url : "/deleteauctioneers/:id/:cust",
			    templateUrl : "views/templates/deleteauctioneers.html",
			    controller : 'deleteauctioneersCtrl'
			}).state('deleterepos', {
			    url : "/deleterepos/:id/:cust",
			    templateUrl : "views/templates/deleterepos.html",
			    controller : 'deletereposCtrl'
			}).state('deletevaluers', {
			    url : "/deletevaluers/:id/:cust",
			    templateUrl : "views/templates/deletevaluers.html",
			    controller : 'deletevaluersCtrl'
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
				templateUrl : "./views/templates/funds.html",
				controller : "fundsCtrl"
			}).state("lettersdue",{
				url : "/lettersdue",
				templateUrl : "./views/templates/lettersdue.html",
				controller : "duelettersCtrl"
			}).state("predeliq",{
				url : "/predeliq",
				templateUrl : "./views/templates/predeliq.html",
				controller : "predeliqCtrl"
			}).state("new",{
				url : "/new",
				templateUrl : "./views/templates/new2.html",
				controller : "newCtrl"
			}).state("broken",{
				url : "/broken",
				templateUrl : "./views/templates/broken.html"
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
			}).state("serviceproviders",{
				url : "/serviceproviders",
				templateUrl : "./views/templates/serviceproviders.html",
				controller : "serviceprovidersCtrl"
			}).state("action",{
				url : "/action/:id",
				templateUrl : "./views/templates/action.html",
				controller : "ActivityCtrl"
			}).state('overdueplansmcoop', {
				url : "/overdueplansmcoop",
				templateUrl : "views/templates/overdueplans.html",
				controller : "overdueplansmcoopCtrl"
			}).state('bankregions', {
				url : "/bankregions",
				templateUrl : "views/templates/bankregions.html",//
				controller : "bankregionsCtrl"
			}).state('newregion', {
				url : "/newregion",
				templateUrl : "views/templates/newregion.html",
				controller : "bankregionsCtrl"
			}).state('deleteinvoice', {
				url : "/deleteinvoice/:id/:cust",
				templateUrl : "views/templates/deleteinvoice.html",
				controller : "ammendinvoicesCtrl"
			}).state('payinvoice', {
				url : "/payinvoice/:id/:cust",
				templateUrl : "views/templates/payinvoice2.html",
				controller : "ammendinvoicesCtrl"
			}).state("diary", {
				url : "/diary",
				templateUrl : "./views/templates/diary.html"
			}).state('newbranchregion', {
				url : "/newbranchregion",
				templateUrl : "views/templates/newbranchregion.html",
				controller : "bankregionsCtrl"
			}).state('payments', {
				url : "/payments",
				templateUrl : "views/templates/payments.html",
				controller : "paymentsCtrl"
			}).state('ammendinvoice', {
				url : "/ammendinvoice/:id/:cust",
				templateUrl : "views/templates/ammendinvoice.html",
				controller : "ammendinvoicesCtrl"
			}).state('paynoalert', {
				url : "/paynoalert",
				templateUrl : "views/templates/creditwatch.html",
				controller : "paynoalertCtrl"
			}).state('no_creditwatch', {
				url : "/no_creditwatch",
				templateUrl : "views/templates/no_creditwatch.html",
				controller : "nocreditwatchCtrl"
			}).state('creditwatch', {
				url : "/creditwatch",
				templateUrl : "views/templates/no_creditwatch.html",
				controller : "nocreditwatchCtrl"
			}).state('searchbyregion', {
				url : "/searchbyregion",
				templateUrl : "views/templates/nocreditwatch.html",
				controller : "nocreditwatchCtrl"
			}).state('amntcollected', {
				url : "/amntcollected",
				templateUrl : "views/templates/amntcollected.html",
				controller : "amntcollectedCtrl"
			})
		;
	}
])
