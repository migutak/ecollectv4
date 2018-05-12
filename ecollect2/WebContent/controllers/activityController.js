/**
 * 
 */

var app = angular.module('RDash');

app.controller('ActivityCtrl', function($scope,$cookieStore,$filter,$http,$timeout,$window,StudentDataOp,ServerAddress){
	
	$scope.showLoading = true;
	
	$timeout(function() {
		$scope.showLoading = false;
    }, 2000);
	
	var SvrIP = ServerAddress.address;
	var acc = document.getElementById("acc").value;
	var cust = document.getElementById("cust").value;
	var Region = $cookieStore.get('section');
	
	var rights= localStorage.getItem("rights");
	
	checkDemand(acc);
    
	if(rights == "User"){
    	$scope.menu = false;
    }else{
    	$scope.menu = true;
    }
    
    if(Region == "BRANCH"){
    	$scope.branch = false;
    }else{
    	$scope.branch = true;
    }
    
    function checkDemand(acc){
    	$http({
            method: 'get',
            url: ServerAddress.address + '/api/v2/demandcheck/'+acc,
            headers: {'Content-Type': 'application/json'}
          }).success(function (data) {
        	  console.log('demand due....'+data[0]);
        	  if(data.length==1){
        		  $scope.demandshow = true;
        		  $scope.ddsent = data[0].DEMAND
        	  }else{
        		  $scope.demandshow = false;
        	  }
        	  
            }).error(function () {
              
            });
    }
	
	  $scope.accdata = {};
	  $scope.dataIn = {};
	  $scope.datax = {};
	  $scope.notesData = {};
	  $scope.colOfficer = {};
	  $scope.Meta = {};
	  $scope.dataContacts = {};
	  $scope.dataSms = {};
	  $scope.Reall = {};
	  $scope.ptp = [];
	  $scope.Collateral = [];
	  $scope.dataDeptColl = [];
	  $scope.dataFiles = [];

	  $scope.inactive = false;
	  $scope.partyinactive = true;
	  $scope.ptpinactive = true;
	  
	  $scope.disableMeta = true;
	  
	  $scope.today = new Date();
	  
	  var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

	  $scope.submitHeader = "Submit";
	  
	   $scope.accnumber = document.getElementById("acc").value;
	   $scope.dataIn.owner = $cookieStore.get('username');
       $scope.dataIn.acc = document.getElementById("acc").value;
       $scope.dataIn.ptpamount = "0";
       $scope.dataIn.ptpdate = todayFormatted;
       $scope.dataIn.reviewdate = todayFormatted;
       $scope.dataIn.paymode = "NA";
       $scope.dataIn.ptp = "No";
       $scope.dataIn.party = "NA";
       $scope.dataIn.action = "Invalid";
       $scope.dataIn.demand = "N/A";
       $scope.dataIn.impvalue = "N";
       $scope.dataIn.impsrc = "Made a Comment";
       $scope.letterSpolled = "N/A";
       
       StudentDataOp.getAccount(document.getElementById("acc").value).success(function (data) {
    	   //console.log(data[0]);
    	   
    	   $scope.accdata = data;
    	   $scope.dataIn.cust = document.getElementById("cust").value;
           $scope.dataIn.cmdstatus = $scope.accdata[0].CMDSTATUS;
           $scope.dataIn.brstatus = $scope.accdata[0].BRANCHSTATUS;
           $scope.dataIn.route = $scope.accdata[0].ROUTETOSTATE;
           $scope.dataIn.reason = $scope.accdata[0].EXCUSE;
           $scope.dataIn.curing = $scope.accdata[0].CURING;
           $scope.dataSms.smsNumber = $scope.accdata[0].TELNUMBER;
           $scope.Reall.owner = $scope.accdata[0].COLOFFICER;
           
           var cust = document.getElementById("cust").value;

           $scope.addAction = function() {     
               $scope.submitHeader = "Submitting activity .....";
               $scope.mySwitch = true;
               $scope.dataIn.impvalue = document.getElementById("impvalue").value;
              // console.log('important note:...'+$scope.dataIn.impvalue);
             $http({
               method: 'POST',
               url: ServerAddress.address + '/Saveactivity',
               headers: {'Content-Type': 'application/json'},
               data : $scope.dataIn
             }).success(function (data) {
            	 console.log('test data ',data);
               $scope.message = "Activity Successfully Submitted";
               $timeout(function() {
            	   $window.close();
                  }, 1500);
               }).error(function () {
                 alert("Error submitting action data");
                 $timeout(function() {
                	 $window.close();
                   }, 1500);
               });
           };
           
           $scope.ptp = "Null";
           
           $scope.Multipleptp = function($scope){
        	   //console.log($scope.ptp);
           }
           
           $scope.AddContact = function(){
        	   $scope.submitHeader = "Submitting data ...";
        	   $scope.dataContacts.cust = document.getElementById("cust").value;
        	   $scope.dataContacts.owner = $cookieStore.get('username');;
        	   $http({
                   method: 'POST',
                   url: ServerAddress.address + '/addContacts',
                   headers: {'Content-Type': 'application/json'},
                   data : $scope.dataContacts
                 }).success(function (data) {
                   $scope.addcontactconfirm = "Contact Successfully Submitted";
                   alert("Contact Successfully Submitted");
                   $scope.dataContacts.person = "";
                   $scope.dataContacts.contact = "";
                   $scope.submitHeader = "Submit";
                   closeModal('addcontact');
                   }).error(function () {
                     alert("Error submitting action data");
                     $scope.submitHeader = "Submit";
                   });
           };
           
           $scope.dataContacts ={};
           $scope.delContacts ={};
           $scope.editContacts ={};
           $scope.deptColl = {};
           $scope.addShow=true;
           
           $scope.saveContact = function(){
        	   $scope.dataContacts.person = "Self";
        	   $scope.dataContacts.cust = document.getElementById("cust").value;
        	   $scope.dataContacts.owner = $cookieStore.get('username');
               $http({
                   url: ServerAddress.address + '/addContacts',
                   method: 'post',
                   header:'application/json',
                   data: $scope.dataContacts
               }).success(function(response){
            	   console.log('contact added');
                   $scope.dataContacts = {};
               }).error(function(){
            	   alert('Error encountered!!!!');
               })
           	}
           
           $scope.edit = function(task){
        	   $scope.addShow=false;
        	   $scope.deleteShow=false;
        	   $scope.editShow=true;
        	   $scope.editContacts.contact = task;
           }
           
           $scope.delC = function(task){
        	   $scope.addShow=false;
        	   $scope.deleteShow=true;
        	   $scope.editShow=false;
        	   $scope.delContacts.contact = task;
           }
           
           $scope.backCont = function(){
        	   $scope.addShow=true;
        	   $scope.deleteShow=false;
        	   $scope.editShow=false;
           }
           
           $scope.deleteCont = function(){
        	   console.log($scope.delContacts);
        	   var contID =  $scope.delContacts.contact;
               if(confirm("Do you want to delete this task ["+contID+"] ?")){
                          $http({
                              url:SvrIP + '/deleteContact',
                              method: 'post',
                              header:'application/json',
                              data:$scope.delContacts
                          }).success(function(response){
                              alert('Contact Deleted');
                          })
               }
          }
           
           function contactsRefresh(){
	   			StudentDataOp.getContacts(cust).success(function(data){
	   	            $scope.contactsData = data;
	   			}).error(function(err){
	   				alert('Unable to retrieve contacts');
	   			})
	   		}
           
           $scope.saveDeptColl = function(){
        	   $scope.deptColl.acc = document.getElementById("acc").value;
        	   $scope.deptColl.cust = document.getElementById("cust").value;
        	   $scope.deptColl.owner = $cookieStore.get('username');
               $http({
                   url: ServerAddress.address + '/addDeptColl',
                   method: 'post',
                   header:'application/json',
                   data: $scope.deptColl
               }).success(function(response){
                   $scope.deptColl = {};
               }).error(function(){
            	   alert('Error encountered!!!!');
               })
           	}
           
           $scope.sendSMS = function(){
        	   $scope.submitHeader = "Submitting data ...";
        	   $scope.dataSms.cust = cust;
        	   $scope.dataSms.owner = $cookieStore.get('username');
        	   $http({
	                   method: 'POST',
	                   url: ServerAddress.address + '/sendSMS',
	                   headers: {'Content-Type': 'application/json'},
	                   data : $scope.dataSms
                 }).success(function (data) {
	                   $scope.sendsmsconfirm = "SMS Successfully Sent";
	                   $scope.dataSms.smsMessage ="";
	                   $scope.submitHeader = "Submit";
	                   closeModal('sms');
                   }).error(function () {
	                   alert("Error sending sms");
	                   $scope.mySwitch = false;
	                   $scope.submitHeader = "Submit";
                   });
           };
           
           function closeModal(name){
        	   $('#' + name).modal('hide'); 
           };
           
           $scope.reAllocatefunc = function(){
	          	$scope.submitHeader = "Submitting data ...";
	          	$scope.Reall.cust = cust;
	        	$http({
	              method: 'POST',
	              url: SvrIP + '/reallocate',
	              headers: {'Content-Type': 'application/json'},
	              data : $scope.Reall
	            }).success(function (data) {
	            	
	              alert("Account successfully reallocated");
	              $scope.submitHeader = "Submit";
	              closeModal('reallocate');
	            }).error(function () {
	                alert("Error reallocating");
	                $scope.submitHeader = "Submit";
	            });
         };
         var dept = $scope.accdata[0].SECTION;
         var custname = $scope.accdata[0].FIRSTNAME;
         var address = $scope.accdata[0].ADDRESSLINE1;
         var postcode = $scope.accdata[0].POSTCODE;
         var balance = $scope.accdata[0].OUSTBALANCE;
         var arrears = $scope.accdata[0].PRINCARREARS;
         var intarr = $scope.accdata[0].INTRATEARR;
         var penarr = $scope.accdata[0].PENALARREARS;
         var days = $scope.accdata[0].DAYSINARR;
         var cust = $scope.accdata[0].CUSTNUMBER;
         var arocode = $scope.accdata[0].AROCODE;
         var branch = $scope.accdata[0].BRANCHNAME;
         var manager = $scope.accdata[0].MANAGER;
         
         var totalarr = arrears + intarr + penarr;
         
         //console.log('Before summation===>'+arrears);
         
         if(dept=='PBBSCHEME'){
        	 StudentDataOp.pbbBalance(document.getElementById("cust").value).success(function (data) {
            	 //console.log('Balance for customer');
            	 //console.log(data[0].SUMBALANCE);
            	 var balance = data[0].SUMBALANCE;
            	 var arrears = data[0].SUMARREARS;
             })
         };
         
         //console.log('After summation===>'+arrears);
         
         
	     	$scope.generatetitle = "Generate";
	         $scope.iconGenerate = "fa fa-arrow-down";//fa fa-spinner fa-pulse
	         $scope.showLetter = true;
	         $scope.showDownload = false;

	         //letter generation	         
	         $scope.generate = function(intype){
	        	 //console.log(intype);
	        	 var type = null;
	        	 switch(intype){
	        	 case 'Post listing (Card)': type = "cards"
	        		 break;
	        	 case 'Post listing (Secured)': type = "secured"
	        		 break;
	        	 case 'Post Listing(Personal)': type = "personal"
	        		 break;
	        	 case 'Post Listing(Overdrawn)': type = "overdue"
	        		 break;
	        	 case 'Post listing (MCU)': type = "mcu"
	        		 break;
	        	 case 'Notification of Sale': type = "salenotice"
	        		 break;
	        	 case 'Pre-Listing Notice': type = "prelisting"
	        		 break;
	        	 case 'Statutory Notice': type = "statutory"
	        		 break;
	        	 case 'Personal Demand 1': type = "pbb1"
	        		 break;
	        	 case 'Personal Demand 2': type = "pbb2"
	        		 break;
	        	 case 'Personal Demand 3': type = "pbb3"
	        		 break;
	        	 case 'Card Overdue': type = "ccoverdue"
	        		 break;
	        	 case 'Card Prelisting': type = "ccprelisting"
	        		 break;
	        	 case 'Repossession Notice': type = "repossession"
	        		 break;
	        	 }

	        	 
	        	 $scope.iconGenerate = "fa fa-spinner fa-pulse fa-1x";
	        	 $scope.generatetitle = "Generating Letter..."
	        		 
	        		 $http({
	        			 url : './api/generate/'+type,
	        			 method : 'get',
	        			 params:{
	        				 'acc' : acc,
	        				 'custname' : custname,
	        				 'address' : address,
	        				 'balance' : balance,
	        				 'arrears' : arrears,
	        				 'intarr' : intarr,
	        				 'cust' : cust,
	        				 'arocode' : arocode,
	        				 'branch' : branch,
	        				 'manager' : manager,
	        				 'postcode' : postcode
	        			 }
	        		 }).success(function(data){
	        			 $scope.letterSpolled = data;
	            	     $timeout(function() {
	                		 $scope.generatetitle = "Generate";
	                		 $scope.iconGenerate = "fa fa-download fa-1x";
	                		 $scope.showLetter = false;
	                         $scope.showDownload = true;
	                     },1000);
	        		 }).error(function(data){
	            		 $timeout(function() {
	                		 $scope.generatetitle = "Generate";
	                         $scope.iconGenerate = "fa fa-arrow-down";
	                		 $scope.showLetter = true;
	                         $scope.showDownload = false;
	                     },200);
	            		 alert('Error Generating Leter');
	            	 })
	        		 
	        		/* StudentDataOp.Letter(type,acc,custname, address, postcode,balance,arrears,intarr,cust,arocode,branch,manager)
	        		 .success(function (data) {
	        			 $scope.letterSpolled = data;
	            	     $timeout(function() {
	                		 $scope.generatetitle = "Generate";
	                		 $scope.iconGenerate = "fa fa-download fa-1x";
	                		 $scope.showLetter = false;
	                         $scope.showDownload = true;
	                     },1000);
	            	 }).error(function(){
	            		 $timeout(function() {
	                		 $scope.generatetitle = "Generate";
	                         $scope.iconGenerate = "fa fa-arrow-down";
	                		 $scope.showLetter = true;
	                         $scope.showDownload = false;
	                     },200);
	            		 alert('Error Generating Leter');
	            	 })*/
	         }
	         
	         	$scope.$watch("dataSms.smsTemplate", function (newval) {
	               if(newval=="LOAN"){
	                   $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
	                   $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
	                 }else if(newval=="LOANOD"){
	              	   $scope.dataSms.smsMessage = "Dear Customer, Your account is overdawn by  Kes. "+totalarr+". Please regularize within seven days.";
	              	   $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
	                 }else{
	                	 $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
		                 $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
	                 }
	            }, true);
           
       }).error(function(){
    	   alert('No customer data found');
       });
       
       StudentDataOp.Users().success(function (data) {
    	   //console.log('reallocate data');
    	   //console.log(data);
    	   $scope.colOfficer = data;
       })
       
       StudentDataOp.Reviewers().success(function (data) {
    	   $scope.Reviewer = data;
       })
       
       StudentDataOp.getCollateral(cust).success(function (data) {
    	   //console.log(data);
    	   $scope.Collateral = data;
       })
       
       StudentDataOp.getDeptCollateral(cust).success(function (data) {
    	   //console.log(data);
    	   $scope.dataDeptColl = data;
       })
       
       StudentDataOp.getFiles(cust).success(function (data) {
    	   console.log(data);
    	   $scope.dataFiles = data;
       })

       
       $scope.$watch("dataIn.action", function (newval) {
           switch (newval) {
             case 'OC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'IC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'MET':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'REVW':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'SC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'LR':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'RR':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'OA':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'RF':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'NFA':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'Invalid':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
         }
           }, true);
         
         $scope.$watch("dataIn.party", function (newval) {
           switch (newval) {
             case '1':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '2':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case '3':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case '4':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '5':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '6':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case 'NA':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
         }
           }, true);
         
         $scope.$watch("dataIn.ptp", function (newval) {
           if(newval=='Yes'){
               $scope.dataIn.ptpamount = "0";
               $scope.dataIn.ptpdate = todayFormatted;
                   $scope.dataIn.paymode = "NA";
               $scope.inactive = false;
             }else{
               $scope.dataIn.ptpamount = "0";
               $scope.dataIn.ptpdate = todayFormatted;
                 $scope.dataIn.paymode = "NA";
               $scope.inactive = true;
             }
                 
           }, true);
         
         var myDate = new Date();
         var smsDate = new Date(myDate);
         smsDate.setDate(myDate.getDate()+14);
         //var sms_Date = $filter('date')(smsDate.setDate(myDate.getDate()+14), 'dd-MM-yyyy');
         
         $scope.showEditSave = false;
         
         $scope.editMeta = function(){
        	 $scope.showEditSave = true;
         }
         $scope.cancelSave = function(){
        	 $scope.showEditSave = false;
         }
         
         
});

/*app.controller('notesCtrl', function($scope, StudentDataOp){
	$scope.refreshBtn = "fa fa-refresh";
	var cust = document.getElementById("cust").value;
	$scope.notesData = {};
	$scope.noteLength = "0";
	StudentDataOp.getNotes(cust).success(function(data){
            $scope.notesData = data;
            $scope.noteLength = data.length;
    })
    $scope.showMe = false;
    $scope.notesRefreshfnc = function(){
		$scope.showMe = true;
		$scope.refreshBtn = "fa fa-spinner fa-spin";
		StudentDataOp.getNotes(cust).success(function(data){
            $scope.notesData = data;
            $scope.refreshBtn = "fa fa-refresh";
            $scope.showMe = false;
            $scope.noteLength = data.length;
		}).error(function(err){
			$scope.refreshBtn = "fa fa-refresh";
            $scope.showMe = false;
			alert('Unable to retrieve notes'+err);
		})
	}
    
});*/

app.controller('promisesCtrl', function($scope, StudentDataOp){
	  var acc = document.getElementById("acc").value;
	  $scope.promiseData = {};
	  $scope.ptpLength = "0";
	  StudentDataOp.getPtp(acc).success(function(data){
		  $scope.promiseData = data;
		  $scope.ptpLength = data.length;
         })
	});

app.controller('Appctrl', function($scope, $stateParams, $http, StudentDataOp, ServerAddress){
	var SvrIP = ServerAddress.address;
	$scope.brstatus_src=[];
	$scope.cmdstatus_src = [];
	$scope.letters = [];
	$scope.colofficer_src = [];
	
	$http.get(SvrIP+'/api/status/cmdstatus')
	.success(function(resp){
		$scope.cmdstatus_src = resp;
	})
	.error(function(err){
		console.log('Error retrieving cmd status listings');
	});
	
	$http.get(SvrIP+'/api/status/brstatus')
	.success(function(resp){
		$scope.brstatus_src = resp;
	})
	.error(function(err){
		console.log('Error retrieving branch status listings');
	});
	
	//Letters
	$http.get(SvrIP+'/api/status/letters')
	.success(function(resp){
		$scope.letters = resp;
	})
	.error(function(err){
		console.log('Error retrieving demand listings');
	});
	
})

app.controller('contactCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	$scope.refreshBtn = "fa fa-refresh";
	  $scope.contactsData = {};
	  StudentDataOp.getContacts(cust).success(function(data){
		  $scope.contactsData = data;
       })
       $scope.contactsRefreshfnc = function(){
			$scope.refreshBtn = "fa fa-spinner fa-spin";
			StudentDataOp.getContacts(cust).success(function(data){
	            $scope.contactsData = data;
	            $scope.refreshBtn = "fa fa-refresh";
			}).error(function(err){
				$scope.refreshBtn = "fa fa-refresh";
				alert('Unable to retrieve contacts'+err);
			})
		}
})

app.controller('otheraccCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	  $scope.otheraccsData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherAccs(cust).success(function(data){
		  $scope.otheraccsData = data;
		  $scope.otherLength = data.length;
       })
          
})

app.controller('otherCtrl', function($scope,StudentDataOp){
	var cust = document.getElementById("cust").value;
	  $scope.othercardData = {};
	  $scope.otherLength = "0";
	  StudentDataOp.getOtherCards(cust).success(function(data){
		  $scope.othercardData = data;
		  $scope.otherLength = data.length;
       })
          
})

app.controller('ActivityccCtrl', function($scope,$cookieStore,$filter,$http,$timeout,$window, StudentDataOp,ServerAddress){
	
	$scope.letterSpolled = "N/A"
		
	var SvrIP = ServerAddress.address;
	var acc = document.getElementById("acc").value;
	var cust = document.getElementById("cust").value;
	var Region = $cookieStore.get('section');
	
    var rights= localStorage.getItem("rights");
    
    if(rights == "User"){
    	$scope.menu = false;
    }else{
    	$scope.menu = true;
    }
	
	  $scope.accdata = {};
	  $scope.dataIn = {};
	  $scope.datax = {};
	  $scope.notesData = {};
	  $scope.colOfficer = {};
	  $scope.Meta = {};
	  $scope.dataContacts = {};
	  $scope.dataSms = {};
	  $scope.Reall = {};

	  $scope.inactive = false;
	  $scope.partyinactive = true;
	  $scope.ptpinactive = true;
	  
	  $scope.today = new Date();
	  
	  var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

	  $scope.submitHeader = "Submit";
	  
	  	$scope.goBack = function(){
		    window.history.back();
		  };

	   $scope.accnumber = document.getElementById("acc").value;
	   $scope.dataIn.owner = $cookieStore.get('username');
       $scope.dataIn.acc = document.getElementById("acc").value;
       $scope.dataIn.ptpamount = "0";
       $scope.dataIn.ptpdate = todayFormatted;
       $scope.dataIn.reviewdate = todayFormatted;
       $scope.dataIn.paymode = "NA";
       $scope.dataIn.ptp = "No";
       $scope.dataIn.party = "NA";
       $scope.dataIn.action = "Invalid";
       $scope.dataIn.demand = "N/A";
       $scope.dataIn.impvalue = "N";
       $scope.dataIn.impsrc = "Made a Comment";
       
       
       StudentDataOp.getCard(acc).success(function (data) {
    	   //console.log(data[0]);

    	   $scope.accdata = data;
    	   $scope.dataIn.cust = document.getElementById("cust").value;
           $scope.dataIn.cmdstatus = $scope.accdata[0].CMDSTATUS;
           $scope.dataIn.brstatus = $scope.accdata[0].BRANCHSTATUS;
           $scope.dataIn.route = $scope.accdata[0].ROUTETOSTATE;
           $scope.dataIn.reason = $scope.accdata[0].EXCUSE;
           $scope.dataSms.smsNumber = $scope.accdata[0].MOBILE;
           $scope.Reall.owner = $scope.accdata[0].COLOFFICER;
           $scope.dataIn.curing = $scope.accdata[0].CURING;
           
           var cust = document.getElementById("acc").value;

           $scope.addAction = function() {     
               $scope.submitHeader = "Submitting activity data .....";
               $scope.dataIn.impvalue = document.getElementById("impvalue").value;
               $scope.mySwitch = true;
             $http({
               method: 'POST',
               url: SvrIP + '/Saveactivity',
               headers: {'Content-Type': 'application/json'},
               data : $scope.dataIn
             }).success(function (data) {
               console.log(data);
               $scope.message = "Activity Successfully Submitted";
               $timeout(function() {
            	   $window.close();
                  }, 1500);
               }).error(function () {
                 alert("Error submitting action data");
                 $timeout(function() {
                	 $window.close();
                   }, 1500);
               });
           };
           
           $scope.AddContact = function(){
        	   $scope.submitHeader = "Submitting data ...";
        	   $scope.dataContacts.cust = document.getElementById("cust").value;
        	   $scope.dataContacts.owner = $cookieStore.get('username');
        	   $http({
                   method: 'POST',
                   url: SvrIP + '/addContacts',
                   headers: {'Content-Type': 'application/json'},
                   data : $scope.dataContacts
                 }).success(function (data) {
                   $scope.addcontactconfirm = "Contact Successfully Submitted";
                   alert("Contact Successfully Saved");
                   $scope.dataContacts.person = "";
                   $scope.dataContacts.contact = "";
                   $scope.submitHeader = "Submit";
                   }).error(function () {
                     alert("Error submitting action data");
                     $scope.submitHeader = "Submit";
                   });
           };
           
           $scope.dataContacts ={};
           $scope.delContacts ={};
           $scope.editContacts ={};
           $scope.addShow=true;
           $scope.saveContact = function(){
        	   $scope.dataContacts.person = "Self";
        	   $scope.dataContacts.cust = document.getElementById("cust").value;
        	   $scope.dataContacts.owner = $cookieStore.get('username');
               $http({
                   url: SvrIP + '/addContacts',
                   method: 'post',
                   header:'application/json',
                   data: $scope.dataContacts
               }).success(function(response){
            	   console.log('contact added');
                   $scope.dataContacts = {};
               }).error(function(){
            	   alert('Error encountered!!!!');
               })
           	}
           
           $scope.edit = function(task){
        	   $scope.addShow=false;
        	   $scope.deleteShow=false;
        	   $scope.editShow=true;
        	   $scope.editContacts.contact = task;
           }
           
           $scope.delC = function(task){
        	   $scope.addShow=false;
        	   $scope.deleteShow=true;
        	   $scope.editShow=false;
        	   $scope.delContacts.contact = task;
           }
           
           $scope.backCont = function(){
        	   $scope.addShow=true;
        	   $scope.deleteShow=false;
        	   $scope.editShow=false;
           }
           
           $scope.deleteCont = function(){
        	   console.log($scope.delContacts);
                          $http({
                              url:SvrIP + '/deleteContact',
                              method: 'post',
                              header:'application/json',
                              data:$scope.delContacts
                          }).success(function(response){
                              alert('Contact Deleted');
                          }).error(function(){
                       	   	  alert('Error deleting contact');
                          })
          }
           
           function contactsRefresh(){
	   			StudentDataOp.getContacts(cust).success(function(data){
	   	            $scope.contactsData = data;
	   			}).error(function(err){
	   				alert('Unable to retrieve contacts');
	   			})
	   		}
           
           
           $scope.sendSMS = function(){
        	   $scope.submitHeader = "Submitting data ...";
        	   $scope.dataSms.cust = cust;
        	   $scope.dataSms.owner = $cookieStore.get('username');
        	   $http({
                   method: 'POST',
                   url: SvrIP + '/sendSMS',
                   headers: {'Content-Type': 'application/json'},
                   data : $scope.dataSms
                 }).success(function (data) {
                   $scope.sendsmsconfirm = "SMS Successfully Submitted";
                   alert("SMS Successfully Sent");
                   $scope.submitHeader = "Submit";
                   $scope.dataSms.smsMessage ="";
                   }).error(function () {
                     alert("Error sending sms");
                     $scope.mySwitch = false;
                     $scope.submitHeader = "Submit";
                   });
           };
           
           function closeModal(name){
        	   $('#' + name).modal('hide'); 
           };
           
           $scope.reAllocatefunc = function(){
	          	$scope.submitHeader = "Submitting data ...";
	          	$scope.Reall.cust = cust;
	        	$http({
	              method: 'POST',
	              url: SvrIP + '/reallocatecc',
	              headers: {'Content-Type': 'application/json'},
	              data : $scope.Reall
	            }).success(function (data) {
	            	
	              alert("Card successfully reallocated");
	              $scope.submitHeader = "Submit";
	              closeModal('reallocate');
	            }).error(function () {
	                alert("Error reallocating");
	                $scope.submitHeader = "Submit";
	            });
	        	
	        	
         };
           
           $scope.saveMeta = function(){
          	 	console.log($scope.Meta);
	          	$scope.submitHeader = "Submitting data ...";
	          	$scope.Meta.cust = cust;
	          	$scope.Meta.owner = $cookieStore.get('username');
          	$http({
                method: 'POST',
                url: SvrIP + '/saveMeta',
                headers: {'Content-Type': 'application/json'},
                data : $scope.Meta
              }).success(function (data) {
                console.log($scope.Meta);
                alert("Customer Data Successfully Saved");
                $scope.submitHeader = "Submit";
                }).error(function () {
                  alert("Error saving customer data");
                  $scope.submitHeader = "Submit";
                });
           };
           
           var custname = $scope.accdata[0].CARDNAME;
           var address = $scope.accdata[0].ADDRESS;
           var postcode = $scope.accdata[0].CITY;
           var balance = $scope.accdata[0].OUTBALANCE;
           var arrears = $scope.accdata[0].OUTBALANCE;
           var days = $scope.accdata[0].DAYSINARREARS;
           var cardacct = $scope.accdata[0].CARDACCT;
           var cycle = $scope.accdata[0].CYCLE;
           var branch = "CARD CENTRE";
           var manager = "ROSE KARAMBU";
           
  	     	$scope.generatetitle = "Generate";
  	         $scope.iconGenerate = "fa fa-arrow-down";//fa fa-spinner fa-pulse
  	         $scope.showLetter = true;
  	         $scope.showDownload = false;

  	         //letter generation	         
  	         $scope.generate = function(intype){
  	        	 var type = null;
  	        	 switch(intype){
  	        	 case 'Post listing (Card)': type = "cards"
  	        		 break;
  	        	 case 'Post listing (Secured)': type = "secured"
  	        		 break;
  	        	 case 'Post Listing(Personal)': type = "personal"
  	        		 break;
  	        	 case 'Post Listing(Overdrawn)': type = "overdue"
  	        		 break;
  	        	 case 'Post listing (MCU)': type = "mcu"
  	        		 break;
  	        	 case 'Notification of Sale': type = "salenotice"
  	        		 break;
  	        	 case 'Pre-Listing Notice': type = "prelisting"
  	        		 break;
  	        	 case 'Statutory Notice': type = "statutory"
  	        		 break;
  	        	 case 'Personal Demand 1': type = "pbb1"
	        		 break;
	        	 case 'Personal Demand 2': type = "pbb2"
	        		 break;
	        	 case 'Personal Demand 3': type = "pbb3"
	        		 break;
	        	 case 'Card Overdue': type = "ccoverdue"
	        		 break;
	        	 case 'Card Prelisting': type = "ccprelisting"
	        		 break;
  	        	 }

  	        	 
  	        	 $scope.iconGenerate = "fa fa-spinner fa-pulse fa-1x";
  	        	 $scope.generatetitle = "Generating Letter..."
  	        		 
  	        		 StudentDataOp.Letter(type,acc,custname, address, postcode,balance,arrears,cardacct,cycle,branch,manager)
  	        		 .success(function (data) {
  	        			 $scope.letterSpolled = data;
  	            	     $timeout(function() {
  	                		 $scope.generatetitle = "Generate";
  	                		 $scope.iconGenerate = "fa fa-download fa-1x";
  	                		 $scope.showLetter = false;
  	                         $scope.showDownload = true;
  	                     },1000);
  	            	 }).error(function(){
  	            		 $timeout(function() {
  	                		 $scope.generatetitle = "Generate";
  	                         $scope.iconGenerate = "fa fa-arrow-down";
  	                		 $scope.showLetter = true;
  	                         $scope.showDownload = false;
  	                     },200);
  	            		 alert('Error Generating Leter');
  	            	 })
  	         }
  	         
  	       $scope.$watch("dataSms.smsTemplate", function (newval) {
               if(newval=="LOAN"){
                   $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+arrears+". Please pay within seven days. ";
                   $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
               }else if(newval=="LOANOD"){
              	   $scope.dataSms.smsMessage = "Dear Customer, Your account is overdawn by  Kes . "+arrears+". Please regularize within seven days. ";
              	   $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
               }else{
              	 $scope.dataSms.smsMessage = "Dear Customer, Your credit card payment is late by "+days+" days. Amount in arrears is Kes. "+balance+". Please pay within seven days. ";
              	$scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
               }
               }, true);
          
       }).error(function(){
    	   alert('No customer data found');
       });
       
       StudentDataOp.Users().success(function (data) {
    	   //console.log('reallocate users');
    	   //console.log(data);
    	   $scope.colOfficer = data;
       })
       
       StudentDataOp.Reviewers().success(function (data) {
    	   $scope.Reviewer = data;
       })
       
       StudentDataOp.getFiles(cust).success(function (data) {
    	   $scope.dataFiles = data;
       })
       
       StudentDataOp.Meta(cust).success(function (data) {
    	   //refreshMeta();
    	   $scope.refreshMeta = function(){
    		   $scope.Meta.Employer = data[0].Employer;
        	   $scope.Meta.EmpStatus = data[0].EmpStatus;
        	   $scope.Meta.DoB = data[0].DoB;
        	   $scope.Meta.DoE = data[0].DoE;
        	   $scope.Meta.Marital = data[0].Marital;
        	   $scope.Meta.Phone = data[0].Phone;
        	   $scope.Meta.Email = data[0].Email;
        	   $scope.Meta.Residential = data[0].Residential;
        	   $scope.Meta.Salary = data[0].Salary;
        	   $scope.Meta.fileno = data[0].fileno;
    	   };
       })

       
       $scope.$watch("dataIn.action", function (newval) {
           switch (newval) {
             case 'OC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'IC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'MET':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = false;
                 break;
             case 'REVW':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'SC':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'LR':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'RR':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'OA':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'RF':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'NFA':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
             case 'Invalid':
               $scope.dataIn.party = "NA";
             $scope.partyinactive = true;
                 break;
         }
           }, true);
         
         $scope.$watch("dataIn.party", function (newval) {
           switch (newval) {
             case '1':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '2':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case '3':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case '4':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '5':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = false;
                 break;
             case '6':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
             case 'NA':
               $scope.dataIn.ptp = "No";
             $scope.ptpinactive = true;
                 break;
         }
           }, true);
         
         $scope.$watch("dataIn.ptp", function (newval) {
           if(newval=='Yes'){
               $scope.dataIn.ptpamount = "0";
               $scope.dataIn.ptpdate = todayFormatted;
                   $scope.dataIn.paymode = "NA";
               $scope.inactive = false;
             }else{
               $scope.dataIn.ptpamount = "0";
               $scope.dataIn.ptpdate = todayFormatted;
                 $scope.dataIn.paymode = "NA";
               $scope.inactive = true;
             }
                 
           }, true);
         
         
         $scope.showEditSave = false;
         $scope.editMeta = function(){
        	 $scope.showEditSave = true;
         }
         $scope.cancelSave = function(){
        	 $scope.showEditSave = false;
         }
         
         $scope.generatetitle = "Generate";
         $scope.iconGenerate = "fa fa-arrow-down";//fa fa-spinner fa-pulse
         $scope.showLetter = true;
         $scope.showDownload = false;
         
})
;

app.controller('activity_cc_Ctrl', function($scope,$stateParams,$http,$cookieStore,ServerAddress){
	var card = $stateParams.cardnumber;
	var SvrIP = ServerAddress.address;
	var rights = localStorage.getItem("rights");
	var Region = $cookieStore.get('section');
	
	 if(rights == "User"){
	    	$scope.menu = false;
	    }else{
	    	$scope.menu = true;
	    }
	    
	    if(Region == "BRANCH"){
	    	$scope.branch = false;
	    }else{
	    	$scope.branch = true;
	    }
	
	$scope.caed={};
	//console.log(card);
	getCard(card);
	
	function getCard(card){
		$http({
            method: 'get',
            url: ServerAddress.address + '/api/v2/cardnumber/'+card,
            headers: {'Content-Type': 'application/json'},
            data : $scope.dataIn
          }).success(function (data) {
            console.log(data[0]);
            $scope.caed.tel = data[0].MOBILE
            $scope.caed.name = data[0].CARDNAME
            $scope.caed.mobile = data[0].MOBILE;
            $scope.caed.dob = data[0].DOB;
            $scope.caed.nationalid = data[0].NATIONID;
            $scope.caed.email = data[0].EMAIL;
            $scope.caed.address = data[0].ADDRESS;
            $scope.caed.postcode = data[0].CITY;
            $scope.caed.colofficer = data[0].COLOFFICER;
            $scope.caed.cardnumber = data[0].CARDNUMBER;
        	document.getElementById("acc").value = data[0].CARDACCT;
        	document.getElementById("cust").value = data[0].CARDACCT;
        	
        	document.getElementById("dept").value = localStorage.getItem("division");
        	document.getElementById("username").value = localStorage.getItem("uname");
        	document.getElementById("rights").value = localStorage.getItem("rights");
        	
            }).error(function () {
              console.log("Error retrieving data");
            });
	}
})


