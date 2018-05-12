/**
 * 
 */
//in from asset/js/global.js

angular.module('mainService', [])
	.factory('ServerAddress', function() {
	  return {
	      address : urladdress,
          upload : urlupload,
          urlsocketio : urlsocketio,
          urlreports: urlreports,
          urlemail : urlemail
	  };
	})

/*.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}])*/
	

.factory('StudentDataOp', ['$http','ServerAddress','$q', '$timeout', function ($http,ServerAddress,$q,$timeout) {

    var urlInUse = ServerAddress.address;
    
    var StudentDataOp = [];

    StudentDataOp.getStudents = function () {
        return $http.get(urlBase);
    };
    
    StudentDataOp.get_a_branch = function (branchcode) {
        return $http.get(urlInUse+'/api/status/getabranch/' + branchcode).success(function(data){
        });
    };
    
    StudentDataOp.getcardAccount = function (account) {
        return $http.get(urlInUse+'/api/v2/accountinfo/' + account).success(function(data){
        });
    };
    
    StudentDataOp.dashbranches = function () {
        return $http.get(urlInUse+'/api/status/dashbranches').success(function(data){
        });
    };
    
    StudentDataOp.dashbranches_region = function (region) {
        return $http.get(urlInUse+'/api/status/dashbranches/' + region).success(function(data){
        });
    };
    
    StudentDataOp.getAccount = function (account) {
        return $http.get(urlInUse+'/api/v2/accountinfo/' + account).success(function(data){
        });
    };
    

    StudentDataOp.getAccount2 = function (account) {
        return $http.get(urlInUse+'/api/status/accountinfo/' + account).success(function(data){
        });
    };
    
    StudentDataOp.getActivity = function (account) {
        return $http.get(urlInUse+'/api/status/getactivity/' + account).success(function(data){
        });
    };
    
    StudentDataOp.getActivitywatch = function (account) {
        return $http.get(urlInUse+'/api/status/getactivitywatch/' + account).success(function(data){
        });
    };

    StudentDataOp.getMcoop = function (account) {
        return $http.get(urlInUse+'/api/status/getmcoop/' + account).success(function(data){
        });
    };
   
    StudentDataOp.getCust = function (account) {
        return $http.get(urlInUse+'/api/v2/accountinfo/' + account).success(function(data){
        });
    };//

    StudentDataOp.getEmployercust = function (empcode) {
        return $http.get(urlInUse+'/api/status/getemployercust/' + empcode).success(function(data){
        });
    };

    StudentDataOp.getEmployer = function (empcode) {
        return $http.get(urlInUse+'/api/status/getemployer/' + empcode).success(function(data){
        });
    };
    
    StudentDataOp.getspaccount = function (sptitle) {
        return $http.get(urlInUse+'/api/status/getspaccount/'+sptitle).success(function(data){
        });
    };
    
    StudentDataOp.branchRegion = function (Region) {
        return $http.get(urlInUse+'/api/v2/Branchregions/'+Region).success(function(data){
        });
    };
    
    StudentDataOp.Colofficer = function (division) {
        return $http.get(urlInUse+'/api/v2/Colofficer/'+division).success(function(data){
        });
    };
    
    StudentDataOp.Users = function () {
        return $http.get(urlInUse+'/api/status/users').success(function(data){
        });
    };

    StudentDataOp.getSchemecolofficers = function () {
        return $http.get(urlInUse + '/api/status/getschemecolofficers').success(function(data){
        });
    };
    
    StudentDataOp.pbbUsers = function () {
        return $http.get(urlInUse+'/api/status/pbbusers').success(function(data){
        });
    };
    
    StudentDataOp.getDepartments = function () {
        return $http.get(urlInUse+'/api/status/getdepartments').success(function(data){
        });
    };

    StudentDataOp.getlettersissued = function (custnumber) {
        return $http.get(urlInUse+'/api/status/getlettersissued/'+custnumber).success(function(data){
        });
    };
    
    StudentDataOp.deptUsers = function (dept) {
        return $http.get(urlInUse+'/api/v2/deptusers/'+dept).success(function(data){
        });
    };
    
    StudentDataOp.teleUsers = function () {
        return $http.get(urlInUse+'/api/status/teleusers').success(function(data){
        });
    };
    
    StudentDataOp.cmdccUsers = function () {
        return $http.get(urlInUse+'/api/status/cmdccUsers').success(function(data){
        });
    };
    
    StudentDataOp.confirmLetter = function (branch) {
        return $http.get(urlInUse+'/api/v2/confirmdemand/'+branch).success(function(data){
        });
    };//

     StudentDataOp.getsms = function (custnumber) {
        return $http.get(urlInUse+'/api/status/getsms/' + custnumber).success(function(data){
        });
    };

    StudentDataOp.getallteles = function (custnumber) {
        return $http.get(urlInUse+'/api/status/getallteles/' + custnumber).success(function(data){
        });
    };
    
    StudentDataOp.departments = function () {
        return $http.get(urlInUse+'/api/status/departments').success(function(data){
        });
    };
    
    StudentDataOp.UserInfo = function (username) {
        return $http.get(urlInUse+'/api/v2/userinfo/'+username).success(function(data){
        });
    };
    
    StudentDataOp.arocodeInfo = function (arocode) {
        return $http.get(urlInUse+'/api/v2/arocodeinfo/'+arocode).success(function(data){
        });
    };
    
    StudentDataOp.pbbBalance = function (cust) {
        return $http.get(urlInUse+'/api/v2/pbbscheme/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getFiles = function (cust) {
        return $http.get(urlInUse+'/api/status/files/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getReviewer = function (username) {
        return $http.get(urlInUse+'/api/v2/reviewer/'+username).success(function(data){
        });
    };

    StudentDataOp.noplans = function (username) {
        return $http.get(urlInUse+'/api/v2/noplans/' + username).success(function(data){
        });
    };
    //cards notifications
    StudentDataOp.noplanscc = function (username) {
        return $http.get(urlInUse+'/api/v2/noplanscc/' + username).success(function(data){
        });
    };
    StudentDataOp.todaysworknotifycc = function (username) {
        return $http.get(urlInUse+'/api/v2/todaysworknotifycc/' + username).success(function(data){
        });
    };
    StudentDataOp.myallocnotifycc = function (username) {
        return $http.get(urlInUse+'/api/v2/myallocnotifycc/' + username).success(function(data){
        });
    };
    StudentDataOp.viewallnotifycc = function () {
        return $http.get(urlInUse+'/api/status/Allcards').success(function(data){
        });
    };
    StudentDataOp.overdueplanscc = function (username) {
        return $http.get(urlInUse+'/api/v2/overdueplanscc/' + username).success(function(data){
        });
    };
    StudentDataOp.worklistnotifycc = function (username) {
        return $http.get(urlInUse+'/api/v2/worklistnotifycc/' + username).success(function(data){
        });
    };
    //end card notifications

    StudentDataOp.overdueplans = function (username) {
        return $http.get(urlInUse+'/api/v2/overdueplans/' + username).success(function(data){
        });
    };
    
    StudentDataOp.getReviewerdata = function (username) {
        return $http.get(urlInUse+'/api/v2/reviewerdata/' + username).success(function(data){
        });
    };
    
    StudentDataOp.Regions = function (division) {
        return $http.get(urlInUse+'/api/v2/regions/'+division).success(function(data){
        });
    };
    
    StudentDataOp.getMemo = function (division) {
        return $http.get(urlInUse+'/api/v2/Memogrp/'+division).success(function(data){
        });
    };
    
    StudentDataOp.getAro = function (division) {
        return $http.get(urlInUse+'/api/v2/Arogrp/'+division).success(function(data){
        });
    };
    
    StudentDataOp.getdeptAro = function (division) {
        return $http.get(urlInUse+'/api/v2/deptAro/'+division).success(function(data){
        });
    };
    
    StudentDataOp.getManagers = function () {
        return $http.get(urlInUse+'/api/status/managers').success(function(data){
        });
    };
    
    StudentDataOp.getCollateral = function (cust) {
        return $http.get(urlInUse+'/api/v2/collateral/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getBranch = function (branchid) {
        return $http.get(urlInUse+'/api/v2/getBranch/'+branchid).success(function(data){
        });
    };
    
    StudentDataOp.getAllBranch = function () {
        return $http.get(urlInUse+'/api/status/branches').success(function(data){
        });
    };

    StudentDataOp.get_rem_branch = function () {
        return $http.get(urlInUse+'/api/status/rembranches').success(function(data){
        });
    };
    
    StudentDataOp.getaccplans = function () {
        return $http.get(urlInUse+'/api/status/accplans').success(function(data){
        });
    };
     
    StudentDataOp.getLetter = function (letterid) {
        return $http.get(urlInUse+'/api/v2/getLetter/'+letterid).success(function(data){
        });
    };
    
    StudentDataOp.getaccountplanlogs = function (acc) {
        return $http.get(urlInUse+'/api/v2/getaccountplanlogs/'+acc).success(function(data){
        });
    };
    
    
    StudentDataOp.getactivs = function (pcode) {
        return $http.get(urlInUse+'/api/v2/getactivs/'+pcode).success(function(data){
        });
    };
    
    StudentDataOp.getDeptCollateral = function (cust) {
        return $http.get(urlInUse+'/api/v2/deptcollateral/'+cust).success(function(data){
        });
    };

    StudentDataOp.getNotes = function (cust) {
        return $http.get(urlInUse+'/api/v2/notes/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getNotification = function (username) {
        return $http.get(urlInUse+'/api/v2/notifications/'+username).success(function(data){
        });
    };
    
    StudentDataOp.getSla = function () {
        return $http.get(urlInUse+'/api/status/getsla').success(function(data){
        });
    };
    
    StudentDataOp.getactcodes = function () {
        return $http.get(urlInUse+'/api/status/getactcodes').success(function(data){
        });
    };
    
    StudentDataOp.getreadNotification = function (username) {
        return $http.get(urlInUse+'/api/v2/readnotifications/'+username).success(function(data){
        });
    };
    
    StudentDataOp.getbouncedNotification = function (username) {
        return $http.get(urlInUse+'/api/v2/bouncednotifications/'+username).success(function(data){
        });
    };
    
    StudentDataOp.pendingChats = function (username) {
        return $http.get(urlInUse+'/api/v2/pendingchats/'+username).success(function(data){
        });
    };
    
    StudentDataOp.userstatus = function (username) {
        return $http({
        		method: 'get',
    	        cache: false,
    	        url : urlInUse+'/api/v2/userstatus/'+username
        	}).success(function(data){
        });
    };
    
    StudentDataOp.getContacts = function (cust) {
        return $http.get(urlInUse+'/api/v2/contacts/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.gettempplans = function (username) {
        return $http.get(urlInUse+'/api/v2/tempplans/'+username).success(function(data){
        });
    };
    
    StudentDataOp.getMeta = function (cust) {
        return $http.get(urlInUse+'/api/v2/meta/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getaddedContact = function (id) {
        return $http.get(urlInUse+'/api/v2/addedcontact/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getContacts2 = function (cust) {
        return $http.get(urlInUse+'/api/v2/contacts2/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.getPtp = function (acc) {
        return $http.get(urlInUse+'/api/v2/ptp/'+acc).success(function(data){
        });
    };
    
    StudentDataOp.getDirectors = function (acc) {
        return $http.get(urlInUse+'/api/v2/directors/'+acc).success(function(data){
        });
    };
    
    StudentDataOp.get_today_Notes = function () {
        return $http.get(urlInUse+'/api/status/notestoday').success(function(data){
        });
    };
    
    StudentDataOp.withFunds = function (cust) {
        return $http.get(urlInUse+'/api/v2/withfunds/' + cust).success(function(data){
        });
    };
    
    StudentDataOp.Meta = function (cust) {
        return $http.get(urlInUse+'/api/v2/meta/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.newcases = function (div) {
        return $http.get(urlInUse+'/api/v2/newcases/'+div).success(function(data){
        });
    };
    
    StudentDataOp.getOtherAccs = function (cust) {
        return $http.get(urlInUse + '/api/v2/views/'+cust).success(function(data){
        });
    };
    
    StudentDataOp.sameIdnumbers = function (nationalid) {
        return $http.get(urlInUse + '/api/v2/views_with_ids/' + nationalid).success(function(data){
        });
    };
    
    StudentDataOp.sameIdnumbers2 = function (nationalid) {
        return $http.get(urlInUse + '/api/status/searchbyid/' + nationalid).success(function(data){
        });
    };
    
    StudentDataOp.getCard = function (cardacct) {
        /*return $http.get(urlInUse + '/api/v2/cardInfo/'+cardacct).success(function(data){
        });*/
        return $http.get(urlInUse + '/api/status/getcard/'+cardacct).success(function(data){
        });
    };
    
    StudentDataOp.getpreCard = function (cardacct) {
        return $http.get(urlInUse + '/api/status/getprecard/'+cardacct).success(function(data){
        });
    };
    
    StudentDataOp.getCardNationID_old = function (cardacct) {
        return $http.get(urlInUse + '/api/status/getcardnationid/'+cardacct).success(function(data){
        });
    };
    
    StudentDataOp.getCardNationID = function (cardacct) {
        return $http.get(urlInUse + '/api/status/'+cardacct+'/creditcardinfo').success(function(data){
        });
    };
    
    StudentDataOp.cardnloans = function (nationid) {
        return $http.get(urlInUse + '/api/status/cardnloans/'+nationid).success(function(data){
        });
    };
    
    StudentDataOp.getOtherCards = function (cardacct) {
        return $http.get(urlInUse + '/api/v2/otherCard/'+cardacct).success(function(data){
        });
    };
    
    StudentDataOp.Reviewers = function () {
        return $http.get(urlInUse + '/api/status/reviewers').success(function(data){
        });
    };
    
    StudentDataOp.getdatainvestigators = function () {
        return $http.get(urlInUse + '/api/status/investigators').success(function(data){
        });
    };
    
    StudentDataOp.TotalReviewers = function (rev) {
        return $http.get(urlInUse + '/api/v2/reviewerdata/'+rev).success(function(data){
        });
    };
    
    StudentDataOp.searchCustnumber = function (custnumber) {
        //return $http.get(urlInUse +'/api/v2/searchbycustnumber/'+custnumber).success(function(data){
        //});
    	var deferred = $q.defer();
    	$timeout(function(){
    		deffered.resolve(custnumber);
    	},5000)
    	return deferred.promise;
    };
    
    StudentDataOp.TotalReviewerscc = function (rev) {
        return $http.get(urlInUse + '/api/v2/reviewerdatacc/'+rev).success(function(data){
        });
    };
    
    StudentDataOp.get_a_provider = function (sptype) {
        return $http.get(urlInUse + '/api/v2/get_a_provider/'+sptype).success(function(data){
        });
    };

    StudentDataOp.get_all_providers = function () {
        return $http.get(urlInUse + '/api/status/get_all_providers').success(function(data){
        });
    };

    StudentDataOp.get_sp_provider = function (spcode,sptitle) {
        return $http.get(urlInUse + '/api/v2/get_sp_provider/'+spcode+'/'+sptitle).success(function(data){
        });
    };
    
    StudentDataOp.getinvintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getinvintructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getinvintructions2 = function (id) {
        return $http.get(urlInUse + '/api/v2/getinvintructions2/'+id).success(function(data){
        });
    };

    StudentDataOp.getyardsintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getyardsinstructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getnotices40daysinstructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getnotices40daysinstructions/'+id).success(function(data){
        });
    };

    StudentDataOp.gettransferinstructions = function (id) {
        return $http.get(urlInUse + '/api/v2/gettransferinstructions/'+id).success(function(data){
        });
    };
   // 
    StudentDataOp.getrepointructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getrepointructions/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getauctintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getauctintructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getauctintructions2 = function (id) {
        return $http.get(urlInUse + '/api/v2/getauctintructions2/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getinvoice = function (id) {
        return $http.get(urlInUse + '/api/status/getinvoice/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getmktintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getmktintructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getmktintructions2 = function (id) {
        return $http.get(urlInUse + '/api/v2/getmktintructions2/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getvaluerintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getvaluerintructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getvaluerintructions2 = function (id) {
        return $http.get(urlInUse + '/api/v2/getvaluerintructions2/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getdebtintructions = function (id) {
        return $http.get(urlInUse + '/api/v2/getdebtintructions/'+id).success(function(data){
        });
    };

    StudentDataOp.getdebtintructions2 = function (id) {
        return $http.get(urlInUse + '/api/v2/getdebtintructions2/'+id).success(function(data){
        });
    };

    StudentDataOp.getcmdaccinfo = function (custnumber) {
        return $http.get(urlInUse + '/api/v2/getcmdaccinfo/'+custnumber).success(function(data){
        });
    };
    
    StudentDataOp.getspaccinfo = function (custnumber) {
        return $http.get(urlInUse + '/api/status/spaccinfo/'+custnumber).success(function(data){
        });
    };

    StudentDataOp.getcmdacc = function (custnumber) {
        return $http.get(urlInUse + '/api/status/getcmdacc/' + custnumber).success(function(data){
        });
    };
    
    StudentDataOp.Letter = function (type, acc, custname ,address, postcode,balance,arrears,intarr,cust,arocode,branch,manager) {
        return $http.get(urlInUse + '/api/generate/'+type+'/'+acc+'/'+custname+'/'+address+'/'+postcode+'/'+balance+'/'+arrears+'/'+cust+'/'+arocode+'/'+branch+'/'+manager+'/'+intarr).success(function(){
        });
    };
    
    StudentDataOp.excel = function (filepath) {
        return $http.get(urlInUse + '/api/excel/'+filepath).success(function(){
        });
    };
    
    StudentDataOp.getproviders = function () {
        return $http.get(urlInUse+'/api/status/getproviders').success(function(data){
        });
    };

    StudentDataOp.getbranchregion = function () {
        return $http.get(urlInUse+'/api/status/getbranchregion').success(function(data){
        });
    };

    StudentDataOp.getregion = function () {
        return $http.get(urlInUse+'/api/status/getregion').success(function(data){
        });
    };
    
    StudentDataOp.getanote = function (id) {
        return $http.get(urlInUse+'/api/status/getanote/'+id).success(function(data){
        });
    };
    
    StudentDataOp.getBuckets = function () {
        return $http.get(urlInUse+'/api/status/getbuckets').success(function(data){
        });
    };
    
    StudentDataOp.getdeptBuckets = function (dept) {
        return $http.get(urlInUse+'/api/v2/getdeptbuckets/'+dept).success(function(data){
        });
    };
    
    StudentDataOp.getClosed = function (dept) {
        return $http.get(urlInUse+'/api/v2/closed/'+dept).success(function(data){
        });
    };
    
    StudentDataOp.addStudent = function (stud) {
        return $http.post(urlBase + '/AddStudent', stud);
    };
    //charts
    StudentDataOp.chart_investigators = function () {
        return $http.get(urlInUse+'/api/status/chart_investigators').success(function(data){
        });
    };

    StudentDataOp.chart_marketors = function () {
        return $http.get(urlInUse+'/api/status/chart_marketors').success(function(data){
        });
    };

    StudentDataOp.chart_yards = function () {
        return $http.get(urlInUse+'/api/status/chart_yards').success(function(data){
        });
    };

    StudentDataOp.chart_repossessors = function () {
        return $http.get(urlInUse+'/api/status/chart_repossessors').success(function(data){
        });
    };

    StudentDataOp.chart_auctioneers = function () {
        return $http.get(urlInUse+'/api/status/chart_auctioneers').success(function(data){
        });
    };

    StudentDataOp.chart_debtcollectors = function () {
        return $http.get(urlInUse+'/api/status/chart_debtcollectors').success(function(data){
        });
    };

    StudentDataOp.chart_valuers = function () {
        return $http.get(urlInUse+'/api/status/chart_valuers').success(function(data){
        });
    };


    
    return StudentDataOp;

}])

