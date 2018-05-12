var app = angular.module("App", ["ui.router",'mainService',"ngMaterial","angular-ladda",'ui-notification','ngFileUpload','ng-fusioncharts']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/notes")
	$stateProvider
	.state('notes', {
		url : "/notes",
		templateUrl : "views/templates/notesj.html"
	}).state('action', {
		url : "/action",
		templateUrl : "actionpage.html",
		controller : 'ActivityCtrl'
	}).state('ptps', {
		url : "/ptps",
		templateUrl : "views/templates/ptps.html",
		controller : 'promisesCtrl'
	}).state('otheraccs', {
		url : "/otheraccs",
		templateUrl : "views/templates/otheraccs.html",
		controller : 'otheraccCtrl'
	}).state('sameidnumbers', {
		url : "/sameidnumbers",
		templateUrl : "views/templates/sameidnumbers2.html",
		controller : 'sameidnumbersCtrl'
	}).state('accountinfo', {
		url : "/accountinfo",
		templateUrl : "views/templates/accountinfocc.html"
	}).state('customerinfo', {
		url : "/customerinfo",
		templateUrl : "views/templates/customerinfo3.html",
		controller : "customerinfoCtrl"
	}).state('editnote', {
		url : "/editnote/:id",
		templateUrl : "views/templates/editnotes.html",
		controller : 'editnoteCtrl'
	}).state('contacts', {
		url : "/contacts",
		templateUrl : "views/templates/contactss.html",
		controller : "contactssCtrl"
	}).state('files', {
    url : "/files",
    templateUrl : "views/templates/filesj.html",
    controller : 'filesCtrl2'
  }).state('email', {
    url : "/email",
    templateUrl : "views/templates/email2.html",
    controller : 'emailCtrl'
  }).state('collateral', {
    url : "/collateral",
    templateUrl : "views/templates/collateral.html",
    controller : 'collateralCtrl'
  }).state('addcontacts', {
    url : "/addcontacts",
    templateUrl : "views/templates/addcontact.html",
    controller : 'addcontactCtrl'
  }).state('editcontacts', {
    url : "/editcontacts/:id",
    templateUrl : "views/templates/editcontacts.html",
    controller : 'editcontactsCtrl'
  }).state('activityaccplan', {
    url : "/activityaccplan",
    templateUrl : "views/templates/activityaccplan.html",
    controller : 'activityaccplanCtrl'
  }).state('updateaccplan', {
    url : "/updateaccplan/:pcode/:activcode/:acc/:owner",
    templateUrl : "views/templates/updateaccplan.html",
    controller : 'updateaccplanCtrl'
  }).state('reallocate', {
   url : "/reallocate",
   templateUrl : "views/templates/reallocate.html",
   controller : 'reallocateCtrl'
 }).state('sms', {
   url : "/sms",
   templateUrl : "views/templates/sms.html",
   controller : 'smsCtrl'
 }).state('custprofile', {
   url : "/custprofile",
   templateUrl : "views/templates/custprofile.html",
   controller : 'custprofileCtrl'
  })
});

app.controller('otheraccCtrl', function($scope,StudentDataOp){
  var cust = custnumber;//document.getElementById("cust").value;
  //console.log(cust);
  $scope.otheraccsData = [];
  $scope.otherLength = "0";
  StudentDataOp.getCardNationID(cust).success(function(data){
    var nationid = data[0].NATIONID;
    StudentDataOp.cardnloans(nationid).success(function(data){
        //console.log('cards n loans data ', data);
      $scope.otheraccsData = data;
        //$scope.otherLength = data.length;
      })
  })         
});

app.controller('promisesCtrl', function($scope, StudentDataOp){
 var acc = accnumber;//document.getElementById("acc").value;
 $scope.promiseData = [];
 $scope.ptpLength = "0";
 StudentDataOp.getPtp(acc).success(function(data){
	  $scope.promiseData = data;
	  $scope.ptpLength = data.length;
  })
});

app.controller('sameidnumbersCtrl', function($scope,StudentDataOp){
	var acc = accnumber;//document.getElementById("acc").value;
	 $scope.sameidnumbers = [];
	 StudentDataOp.getAccount(acc).success(function(data){
	  var nationalid = data[0].NATIONID;
	  StudentDataOp.sameIdnumbers(nationalid).success(function(data){
	   $scope.sameidnumbers = data;
	 })
	})	  
});

app.controller('otherCtrl', function($scope,StudentDataOp){
	var cust = custnumber;//document.getElementById("cust").value;
 $scope.othercardData = {};
 $scope.otherLength = "0";
 StudentDataOp.getOtherCards(cust).success(function(data){
  $scope.othercardData = data;
  $scope.otherLength = data.length;
})

});

app.controller('ActivityCtrl', function($scope,$filter,$http,$window,StudentDataOp,ServerAddress,$timeout,$mdDialog){
	
	var cust = custnumber;//document.getElementById("cust").value;
	var dept = localStorage.getItem("division");
	var username = gusername;//document.getElementById("username").value;
	
	//console.log('--> in ActivityCtrl ...'+username);
	
	$scope.dataIn = [];
	$scope.dataSms = [];
	$scope.Reall = []
	$scope.today = new Date();
	$scope.rfd_other = false;

	var todayFormatted = $filter('date')($scope.today, 'dd-MM-yyyy');

  $scope.accnumber = accnumber;//document.getElementById("acc").value;
  $scope.dataIn.owner = localStorage.getItem("username");
  $scope.dataIn.acc = accnumber;//document.getElementById("acc").value;
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

//accnumber is global variable
  StudentDataOp.getCard(accnumber).success(function (data) {
   console.log('accinformation -->', data);
   $scope.accdata = data;


   var owner = $scope.accdata[0].COLOFFICER;
   $scope.dataIn.owner = $scope.accdata[0].COLOFFICER;
   $scope.dataIn.cust = $scope.accdata[0].ACCOUNTNO;
   $scope.dataIn.cmdstatus = $scope.accdata[0].CMDSTATUS;
   $scope.dataIn.brstatus = $scope.accdata[0].BRANCHSTATUS;
   $scope.dataIn.route = $scope.accdata[0].ROUTETOSTATE;
   $scope.dataIn.reason = $scope.accdata[0].EXCUSE;
   $scope.dataIn.curing = $scope.accdata[0].CURING;
   $scope.dataSms.smsNumber = $scope.accdata[0].MOBILE;
   $scope.Reall.owner = $scope.accdata[0].COLOFFICER;
   $scope.dataIn.arrearsamount = $scope.accdata[0].TOTALARREARS;
   $scope.dataIn.oustbalance = $scope.accdata[0].OUTBALANCE;
   $scope.dataIn.reviewdate = $scope.accdata[0].REVIEWDATE;
  /* $scope.dataIn.rfd_other = $scope.accdata[0].EXCUSE_OTHER;

        //show other field
        if($scope.accdata[0].EXCUSE_OTHER !== null || $scope.accdata[0].EXCUSE_OTHER !== undefined){
          $scope.rfd_other = true;
        }
   */ //  removed on 8-11-2017 to confirm 
      //disable review date for none owner
      console.log(owner +' owner -- username ='+username);
      if(owner == undefined){
        	//console.log('am here')
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        } else if(username !== owner){
        	document.getElementById("reviewdate").disabled = true;
        	document.getElementById('divspan').style.display = 'none';
        } else{
        	document.getElementById("reviewdate").disabled = false;
        	document.getElementById('divspan').style.display = 'block';
        }
        
        $scope.addAction = function() { 

          $scope.Loading = true;

          if($scope.dataIn.ptpamount == null){
            $scope.dataIn.ptpamount = 0;
          };

          //$scope.dataLoading = true;
          $scope.dataIn.impvalue = 'Y';
          //console.log('activity data ',$scope.dataIn);
          var action_data = {
            'acc' : $scope.dataIn.acc,
            'cust' : $scope.dataIn.acc,
            'action' : $scope.dataIn.action,
            'brstatus' : $scope.dataIn.brstatus,
            'cmdstatus' : $scope.dataIn.cmdstatus,
            'curing' : $scope.dataIn.curing,
            'demand' : $scope.dataIn.demand,
            'impsrc' : $scope.dataIn.impsrc,
            'impvalue' : $scope.dataIn.impvalue,
            'notemade' : $scope.dataIn.notemade,
            'owner' : username,
            'party' : $scope.dataIn.party,
            'paymode' : $scope.dataIn.paymode,
            'ptp' : $scope.dataIn.ptp,
            'ptpamount' : $scope.dataIn.ptpamount,
            'ptpdate' : document.getElementById("ptpdate").value,
            'reason' : $scope.dataIn.reason,
            'reviewdate' : document.getElementById("reviewdate").value,
            'route' : $scope.dataIn.route,
            'arrearsamount' : $scope.dataIn.arrearsamount,
            'oustbalance' : $scope.dataIn.oustbalance,
            'rfd_other' : $scope.dataIn.rfd_other
          };
          
          $.ajax({
           url: ServerAddress.address + '/api/save_activity',
           type: "post", 
           data:action_data,
           success: function(response) {
            // console.log(response);
            $timeout(function() {
             $mdDialog.show(
              $mdDialog.alert()
              .title('Success')
              .textContent('Action successfully submitted.')
              .ok('OK')
              ).then(function(){
               $scope.dataLoading = false;
               $window.close();
             });
            }, 1500);
          },
          error: function(xhr) {
           alert('Error');
         }
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
        var accnumber = $scope.accdata[0].ACCNUMBER;
        var totalarr = arrears + intarr + penarr;
        
        //$scope.generatetitle = "Generate";
        $scope.iconGenerate = "fa fa-arrow-down";//fa fa-spinner fa-pulse
        //document.getElementById('a_generate2').style.display = 'none';
        document.getElementById('a_download').style.display = 'none';
        document.getElementById('a_download2').style.display = 'none';
        
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

         var letter_data = {
          "acc" : accnumber,
          "custname" : custname,
          "address" : address,
          "balance" : balance,
          "arrears" : arrears,
          "intarr" : intarr,
          "cust" : cust,
          "arocode" : arocode,
          "branch" : branch,
          "manager" : manager,
          "postcode" : postcode
        };


        $.ajax({
          url : './api/generate/' + type,
          type: "get", 
          data:letter_data,
          success: function(response) {
            document.getElementById('reportname').value = response;
            document.getElementById('a_download').style.display = 'block';
            document.getElementById('a_download2').style.display = 'block';
            document.getElementById('a_generate').style.display = 'none';
            document.getElementById('a_generate2').style.display = 'none';
          },
          error: function(xhr) {
           console.log('Error');
         }
       });

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
      $scope.$watch("dataIn.reason", function (newval) {
        if(newval=="Other"){
         $scope.rfd_other = true;
       }else{
         $scope.rfd_other = false;
       }
     }, true);

    }).error(function(){
     alert('No customer data found');
   });
    
    StudentDataOp.Users().success(function (data) {
      $scope.colOfficer = data;
    })

    StudentDataOp.Reviewers().success(function (data) {
      $scope.Reviewer = data;
    })
    
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
  }}, true);

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
});

app.controller('mainCtrl', function($scope,$timeout,$http,StudentDataOp,ServerAddress, Notification){
	var cust = custnumber;//document.getElementById("cust").value;
	var acc = accnumber;//document.getElementById("acc").value;
	var dept = localStorage.getItem("division");
	var username = gusername;//document.getElementById("username").value;

  $scope.callingtitle = "Click here to call"
  $scope.callingicon = "fa fa-phone"
	
	$scope.directorsnotification = 0;
	$scope.sameidnotification = 0;
	$scope.notesnotification = 0;
	$scope.collateralnotification = 0;
	$scope.promisesnotification = 0;
	$scope.customcontactsnotification = 0;
	$scope.plannotification = 0;
  $scope.allteles = [];

  getallteles(cust);

 function getallteles(cust){
   StudentDataOp.getallteles(cust).success(function(data){
     $scope.allteles = data;
   })
 }
	
	  /*StudentDataOp.getOtherAccs(cust).success(function(data){
		  $scope.otherLength = data.length;
   })*/

$scope.callingfunc = function(){
   $scope.callingicon = "fa fa-spinner fa-pulse fa-fw";
   $scope.callingtitle = "Calling ...";

   $timeout(function() {
    $scope.callingtitle = "Click here to call"
    $scope.callingicon = "fa fa-phone"
  }, 1500);
}

 $scope.changeNumber = function(newnumber){
  $scope.phonenumber = newnumber;
}

/*StudentDataOp.getCardNationID(cust).success(function(data){
  console.log(data);
  var nationid = data[0].NATIONID;
  StudentDataOp.cardnloans(nationid).success(function(data){
        //console.log('cards n loas data ', data);
        //$scope.otheraccsData = data;
        $scope.otherLength = data.length;
      })
})*/

$http.get(ServerAddress.address + '/api/status/'+acc+'/creditcardinfo').success(function(data){
	console.log(data);
	  var nationid = data[0].NATIONID;
	  StudentDataOp.cardnloans(nationid).success(function(data){
	        $scope.otherLength = data.length;
	      })
});

/*StudentDataOp.getaccountplanlogs(acc).success(function(data){
  $scope.plannotification = data.length;
  if(data.length === 0){
   Notification.error({message: 'This account has no account plan', delay: 5000});
 }
})*/

     /*StudentDataOp.getDirectors(cust).success(function(data){
		  $scope.directorsnotification = data.length;
   })*/

StudentDataOp.getNotes(cust).success(function(data){
  $scope.notesnotification = data.length;
})

StudentDataOp.getPtp(acc).success(function(data){
  $scope.promisesnotification = data.length;
})

StudentDataOp.getContacts2(cust).success(function(data){
 $scope.customcontactsnotification = data.length;
})

});

app.controller('contactssCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog){
	var cust = custnumber;//document.getElementById("cust").value;
	var username = gusername;//document.getElementById("username").value;
	var acc = accnumber;//document.getElementById("acc").value;
	
	//console.log('cust from session '+cust);
	
	$scope.contactsData = [];
	$scope.contact= [];
	
	StudentDataOp.getCard(acc).success(function(data){
		//console.log(data);
		if(data.length !== 0)
      $scope.contact=data[0];
  })
	getContacts();
	function getContacts(){
		StudentDataOp.getContacts(cust).success(function(data){
			//console.log('getContacts data ',data.length);
			if(data.length !==0)
       $scope.contactsData=data;
   })
	}
	
	$scope.delC = function(id){
		var confirm = $mdDialog.confirm()
    .title('Confirm')
    .textContent('Would you like to delete this contact?')
    .ok('OK Confirmed')
    .cancel('No Cancel');
    $mdDialog.show(confirm).then(function() {
     $.ajax({
       url: ServerAddress.address + '/api/del_contact',
       type: "post", 
       data:{'id':id},
       success: function(response) {
         $mdDialog.show(
          $mdDialog.alert()
          .title('Success')
          .textContent('Contact successfully deleted.')
          .ariaLabel('Success')
          .ok('OK')
          ).then(function(){
						    	//getContacts();
                  $state.reload();
                });
        },
        error: function(xhr) {
          alert('Error');
        }
      });
   }, function() {
    console.log('delete cancelled');
  });
  }

  $scope.edit = function(id){
		//console.log(id);
		$state.go('editcontacts',{'id':id})
	}
});

app.controller('customerinfoCtrl', function($scope,$timeout,$mdDialog,$http,StudentDataOp,ServerAddress){
	var cust = custnumber;//document.getElementById("cust").value;
	var acc= accnumber;//document.getElementById("acc").value;
	var dept= document.getElementById("s_in_division").value; // localStorage.getItem("division");
	var user= gusername;//ocalStorage.getItem("username");
	
	console.log('customerinfoCtrl ... '+ cust);
	
	$scope.meta = [];
	
	getMeta();
	
	function getMeta(){
		// for cc read meta from tblcard_static
		//
		/*StudentDataOp.getMeta(cust).success(function(data){
			//console.log('getMeta data ',data);
			if(data.length > 0){
				$scope.meta = data[0];
				$scope.meta.MetaEmployer = data[0].EMPLOYER;
				$scope.meta.MetaDob = data[0].DOB
				$scope.meta.MetaDoe = data[0].DOE
				$scope.meta.MetaMarital = data[0].MARITAL
				$scope.meta.MetaPhone = data[0].PHONE
				$scope.meta.MetaSalary = data[0].SALARY
				$scope.meta.MetaResidential = data[0].RESIDENTIAL
				$scope.meta.MetaFileno = data[0].FILENO
				$scope.meta.MetaEmpstatus = data[0].EMPSTATUS
				$scope.meta.MetaEmail = data[0].EMAIL
			}
		})*/
		$http.get(ServerAddress.address + '/api/status/metacc/'+cust)
	    .success(function(resp){
	    	if(resp.length > 0){
				$scope.meta.MetaEmployer = resp[0].EMPLOYER;
				$scope.meta.MetaDob = resp[0].DOB
				$scope.meta.MetaDoe = resp[0].EMPDATE
				$scope.meta.MetaMarital = resp[0].MARITAL
				$scope.meta.MetaPhone = resp[0].PHONE
				$scope.meta.MetaSalary = resp[0].SALARY
				$scope.meta.MetaResidential = resp[0].RESIDENTIAL
				$scope.meta.MetaFileno = resp[0].FILENO
				$scope.meta.MetaEmpstatus = resp[0].EMPSTATUS
				$scope.meta.MetaEmail = resp[0].EMAIL
			}
	    }).error(function(err){
	      alert('Error on getMeta : cannot retrieve meta info ');
	    });
	}
	
	$scope.showedit = true;
	$scope.editMeta = function(){
		//console.log('showing update button ... ...');
		$scope.showedit = false;
	}
	
	$scope.editMetadata = function(){
		$scope.showedit = true;
		sendData();
	}
	
	$scope.canceleditMeta = function(){
		getMeta();
		$scope.showedit = true;
	}
	
	
function sendData(){
	   var metasaveData = { 
	     'custnumber' : cust,
	     'txtemployeredit' : $scope.meta.MetaEmployer,
	     'txtdobedit' : $scope.meta.MetaDob,
	     'txtdateempedit' : $scope.meta.MetaDoe,
	     'txtmaritaledit' : $scope.meta.MetaMarital,
	     'txtphoneedit' : $scope.meta.MetaPhone,
	     'txtaddressedit' : $scope.meta.MetaResidential,
	     'txtfileno' : $scope.meta.MetaFileno,
	     'txtstatusedit' : $scope.meta.MetaEmpstatus,
	     'txtemailedit' : $scope.meta.MetaEmail,
	     'txtsalaryedit' : $scope.meta.MetaSalary
	   }; 
	   console.log('saving meta ', metasaveData);
	   $.ajax({
	    type: "POST",
	    url: "Meta",
	    data:metasaveData 
	  }).done(function( msg ) {
	   $timeout(function() {
	    $mdDialog.show(
	     $mdDialog.alert()
				.title('Success')
				.textContent('Customer information updated.')
				.ariaLabel('Success')
				.ok('OK')
	       ).then(function(){
	            $scope.Loading = false;
	            getMeta();
	       });
	   }, 1500);
	 });
 }
});

app.controller('filesCtrl2', function($scope,$http,$window,$state,Upload,StudentDataOp,ServerAddress){
 var acc = accnumber;//document.getElementById("acc").value;
 var cust = custnumber;//document.getElementById("cust").value;
 var username = gusername;//document.getElementById("username").value;

 getFiles(cust);

 function getFiles(cust){
	 $http.get(ServerAddress.address+'/api/status/files/'+cust).success(function(data){
		  $scope.dataFiles = data;
	      $("#filesid").removeClass("loading");
     });
  }


 var vm = this;
	        vm.submit = function(){ //function to call on form submit
	            if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
	                vm.upload(vm.file); //call upload function
               }
             }

             vm.upload = function (file) {
               Upload.upload({
	                url: ServerAddress.upload + '/re_upload', //webAPI exposed to upload the file
	                data:{file:file} //pass file as data, should be user ng-model
	            }).then(function (resp) { //upload function returns a promise
	                //console.log('this is response from upload ',resp)
	                if(resp.data.error_code === 0){ //validate success
                   $window.alert('Success ' + resp.config.data.file.name + ' uploaded.');
                   $.ajax({
                       url: ServerAddress.address + '/api/addfile?custnumber='+custnumber+'&accnumber='+accnumber+'&doctype='+$scope.up.doctype+'&docdesc='+$scope.up.uploadnote+'&destpath='+resp.data.data_resp.path+'&colofficer='+username+'&filetype='+resp.data.data_resp.mimetype+'&filename='+resp.data.data_resp.filename+'&filesize='+resp.data.data_resp.size,
                       type: "get",
                       success: function(response) {
                        getFiles(custnumber);
                          //refresh list
                          $state.reload();
                        },
                        error: function(xhr) {
                         alert('Error ');
                       }
                     });
                 } else {
                   $window.alert('an error occured during upload');
                 }
	            }, function (resp) { //catch error
               console.log('Error status: ' + resp.status);
               $window.alert('Error status: ' + resp.status);
             }, function (evt) { 
               var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
               console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	                vm.progress = 'Progress: ' + progressPercentage + '% '; // capture upload progress
               });
           };

	//download function
	$scope.download = function(infile){
	   var file = ServerAddress.upload+'/download/'+infile;
	   $window.open(file,"_self");
	 }

});

app.controller('addcontactCtrl', function($scope,$state,StudentDataOp,ServerAddress,$timeout,$mdDialog){
	var cust = custnumber;//document.getElementById("cust").value;
	var username = localStorage.getItem("uname");
	
	$scope.addcontactData = [];
	$scope.addcontactData.fullname = 0;
	$scope.addcontactData.rel = 0;
	$scope.addcontactData.contact = 0;
	
	$scope.addContact = function(){
		$scope.Loading = true;
		addData();

	}
	
	$scope.cancelAdd = function(){
		$state.go('contacts');
	}
	
	function addData(){
   var contacts_data = { 
     'cust' : cust,
     'fullname' : $scope.addcontactData.fullname,
     'contact' : $scope.addcontactData.contact,
     'rel' : $scope.addcontactData.rel,
     'owner' : username
   }; 
		   //console.log('cust '+ contacts_data.cust+ 'full name '+contacts_data.fullname+' contacts '+ contacts_data.contact+ ' owner '+contacts_data.owner+ ' rel '+contacts_data.rel);
       $.ajax({
        type: "POST",
        url: "addContacts2",
        data:contacts_data 
      }).done(function( msg ) {
       $timeout(function() {
        $mdDialog.show(
         $mdDialog.alert()
         .title('Success')
         .textContent('Customer contact updated.')
         .ariaLabel('Success')
         .ok('OK')
         ).then(function(){
          $scope.Loading = false;
          $scope.cancelAdd();
        });
       }, 1500);
     });
    }
  });

app.controller('editcontactsCtrl', function($scope,$state,$stateParams,StudentDataOp,ServerAddress,$timeout,$mdDialog){
	var id = $stateParams.id;
	$scope.editContact = {};
	StudentDataOp.getaddedContact(id).success(function(data){
		//$scope.editContact = data[0];
		$scope.editContact.id = data[0].ID;
		$scope.editContact.person = data[0].PERSON;
		$scope.editContact.contact = data[0].CONTACT;
		$scope.editContact.rel = data[0].REL;
		
		console.log('edit contacts data ',$scope.editContact);
	})
	$scope.cancelAdd = function(){
		$state.go('contacts');
	}
	
	$scope.editContactfunc = function(){
		$scope.Loading = true;
		editData();
	}
	
	function editData(){
   var contacts_data = { 
     'id' : $scope.editContact.id,
     'fullname' : $scope.editContact.fullname,
     'contact' : $scope.editContact.contact,
     'rel' : $scope.editContact.rel
   }; 
   $.ajax({
    type: "POST",
    url: "editContacts",
    data:contacts_data 
  }).done(function( msg ) {
   $timeout(function() {
    $mdDialog.show(
     $mdDialog.alert()
     .title('Success')
     .textContent('Customer contact updated.')
     .ariaLabel('Success')
     .ok('OK')
     ).then(function(){
      $scope.Loading = false;
      $scope.cancelAdd();
    });
   }, 1500);
 });
}
});

app.controller('emailCtrl', function($scope){
  $scope.send = [];

  $scope.sendEmail = function(){
   $scope.Loading = true;
   console.log('sending this email ',$scope.send);
 }
});

app.controller('updateaccplanCtrl', function($scope,$state,$stateParams,$mdDialog,$timeout,ServerAddress){
  $scope.dataIn = [];
  var acc = $stateParams.acc;
  $scope.dataIn.pcode = $stateParams.pcode;
  $scope.dataIn.activcode = $stateParams.activcode;
  var owner = $stateParams.owner;

  $scope.updatePlan = function(){
   $scope.Loading = true;
   var dateupdated = document.getElementById("dateupdated").value;
   var pcomment = document.getElementById("pcomment").value;
   $.ajax({
    url: ServerAddress.address + '/api/update_accplan',
    type: "post", 
    data:{'accnumber':acc,'actcode':$scope.dataIn.activcode,'pcode':$scope.dataIn.pcode,'pcomment':pcomment,'owner':owner,'dateupdated':dateupdated},
    success: function(response) {
     $timeout(function() {
      $mdDialog.show(
       $mdDialog.alert()
       .clickOutsideToClose(true)
       .title('Success')
       .textContent('account plan successfully updated.')
       .ok('OK')
       ).then(function(){
        $scope.Loading = false;
        $state.go('activityaccplan')
      });
     }, 1500);
   },
   error: function(xhr) {
    alert('Error');
  }
});
 }
})
	//,,,
	app.controller('activityaccplanCtrl', function($scope,$state,$timeout,$mdDialog,StudentDataOp,ServerAddress){
		var username = gusername;//document.getElementById("username").value;
		var cust = custnumber;//document.getElementById("cust").value;
		var acc = accnumber;//document.getElementById("acc").value;
		
		//console.log(username+ ' acc: '+acc+' cust'+cust);
		
		$scope.plans = [];
		$scope.activs = [];
		$scope.dataIn = [];
		$scope.accountplan = [];
		$scope.showPlan = false;
		
		getaccplans();
		getaccountplanlogs(acc);
		get_rfd(acc);
		
		function getaccplans(){
			StudentDataOp.getaccplans().success(function(data){
				$scope.plans = data;
			})
		}
		
		function getactivs(pcode){
			StudentDataOp.getactivs(pcode).success(function(data){
				$scope.activs = data;
			})
		}
		
		function get_rfd(acc){
			StudentDataOp.getcardAccount(acc).success(function(data){
				//console.log(data);
				$scope.dataIn.rfd = data[0].EXCUSE;
			})
		}
		
		function getaccountplanlogs(acc){
			StudentDataOp.getaccountplanlogs(acc).success(function(data){
				$scope.accountplan = data;
				if(data.length !== 0){
					$scope.showPlan = true;
					//notification
				}
			})
		}
		
		
		$scope.$watch("dataIn.accplan", function (newval) {
			getactivs(newval);
    }, true);
		
		$scope.addaccplan = function(){
      console.log($scope.dataIn);
      $scope.Loading = true;
      for(var i = 0; i<$scope.activs.length;i++){
        var indate = $scope.activs[i].ACTIVCODE
        $.ajax({
         url: ServerAddress.address + '/api/save_accplan',
         type: "post", 
         data:{'accnumber':acc,'custnumber':cust,'actcode':$scope.activs[i].ACTIVCODE,'pcode':$scope.activs[i].PCODE,'excuse':$scope.dataIn.rfd,
         'dateofexec':document.getElementById(indate).value,'owner':username},
         success: function(response) {
          $timeout(function() {
           $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Success')
            .textContent('Account plan successfully submitted.')
            .ok('OK')
            ).then(function(){
             $scope.Loading = false;
             updateRfd();
             $state.go('action');
           });
          }, 1500);
        },
        error: function(xhr) {
         alert('Error');
       }
     });
      }

      function updateRfd(){
        if($scope.dataIn.rfd !== null || $scope.dataIn.rfd === undefined){
         $.ajax({
          url: ServerAddress.address + '/api/update_excuse',
          type: "post", 
          data:{'excuse':$scope.dataIn.rfd,'accnumber':acc},
          success: function(response) {
          },
          error: function(xhr) {
            alert('Error');
          }
        });
       }
     }
   }
 })

app.controller('smsCtrl', function($scope,$mdDialog,$timeout,StudentDataOp,ServerAddress){
  var cust = custnumber;//document.getElementById("cust").value;
  var acc = accnumber;//document.getElementById("acc").value;
  var dept = document.getElementById("s_in_division").value; //localStorage.getItem("division");
  var username = gusername;//document.getElementById("username").value;
  
  $scope.showSendsms = true;

  $scope.dataSms = [];
  $scope.sentsms = [];

  sentsms(cust);

  StudentDataOp.getCard(acc).success(function(data){
	   $scope.dataSms.smsNumber = data[0].MOBILE;
	   var days = data[0].DAYSINARR;
	   var totalarr = data[0].EXPPMNT;
	
	   $scope.$watch("dataSms.smsTemplate", function (newval) {
	    if(newval=="LOAN"){
	      $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
	      $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
	    }else if(newval=="LOANOD"){
	      $scope.dataSms.smsMessage = "Dear Customer, Your account is overdawn by Kes. "+totalarr+". Please regularize within seven days.";
	      $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
	    }else if(newval=="CC"){
	      $scope.dataSms.smsMessage = "Dear Customer, Your Credit card payment is overdue. The expected payment is Kes." + totalarr + ". Please regularize within seven days.";
	      $scope.dataSms.smsCallback = " Enquire details on 0711049000/ 020-3276000";
	    }else {
	      $scope.dataSms.smsMessage = "Dear Customer, Your loan payment is late by "+days+" days. Amount in arrears is Kes. "+totalarr+". Please pay within seven days. ";
	      $scope.dataSms.smsCallback = " Enquire details on 0711049000/020-3276000.";
	    }
	  }, true);
  }) 

	function sentsms(cust){
	  StudentDataOp.getsms(cust).success(function(data){
	    $scope.sentsms = data;
	  }) 
	}
	
	$scope.sendsmsfunc = function(){
	  $scope.Loading = true;
	  $.ajax({
	    url: ServerAddress.address + '/api/sendsms',
	    type: "post", 
	    data:{'cust':cust,'smsnumber':$scope.dataSms.smsNumber,'smsmessage':$scope.dataSms.smsMessage,'smscallback':$scope.dataSms.smsCallback,'owner':username},
	    success: function(response) {
	      $timeout(function() {
	        $mdDialog.show(
	          $mdDialog.alert()
	          .title('Success')
	          .textContent('SMS Message successfully queued for sending')
	          .ok('OK')
	          ).then(function(){
	            $scope.Loading = false;
	            sentsms(cust);
	          });
	        }, 1500);
	    },
	    error: function(xhr) {
	      alert('Error sendsmsfunc');
	    }
	  });
	}         
});

app.controller('reallocateCtrl', function($scope,$timeout,$mdDialog,StudentDataOp,ServerAddress){
  var cust = custnumber;//document.getElementById("cust").value;
  var acc = accnumber;//document.getElementById("acc").value;
  var division = localStorage.getItem("division");
  var username = gusername;//document.getElementById("username").value;

  $scope.dataIn = [];
  $scope.collectors = []

  StudentDataOp.getCard(acc).success(function(data){
    $scope.dataIn.colofficer = data[0].COLOFFICER;
    $scope.dataIn.acc = data[0].ACCOUNTNO;
  })

  /*StudentDataOp.deptUsers(division).success(function(data){
    $scope.collectors = data;
  })*/
  
  StudentDataOp.cmdccUsers().success(function(data){
    $scope.collectors = data;
  })

  $scope.reallocatefunct = function(){
    $scope.Loading = true;
    $.ajax({
      url: ServerAddress.address + '/api/reallocatecc',
      type: "post", 
      data:{'acc':$scope.dataIn.acc,'newcolofficer':$scope.dataIn.newcolofficer},
      success: function(response) {
        $timeout(function() {
          $mdDialog.show(
            $mdDialog.alert()
            .title('Success')
            .textContent('account is reallocated to : ' + $scope.dataIn.newcolofficer)
            .ok('OK')
            ).then(function(){
              $scope.dataIn = [];
              $scope.Loading = false;
            });
          }, 1500);
      },
      error: function(xhr) {
        alert('Error');
      }
    });
  } 

});

app.controller('editnoteCtrl', function($scope,$state,$stateParams,$timeout,$mdDialog,StudentDataOp,ServerAddress){
  var id = $stateParams.id;
  $scope.dataIn = [];

  StudentDataOp.getanote(id).success(function(data){
      //console.log(data);
      $scope.dataIn.noteid = data[0].ID;
      $scope.dataIn.notemade = data[0].NOTEMADE;

      $scope.editnote = function(){
        $scope.Loading = true;
        $.ajax({
          url: ServerAddress.address + '/api/editnote',
          type: "post", 
          data:{'noteid':id,'notemade':$scope.dataIn.notemade},
          success: function(response) {
            $timeout(function() {
              $mdDialog.show(
                $mdDialog.alert()
                .title('Success')
                .textContent('Note successfully updated!')
                .ok('OK')
                ).then(function(){
                  $scope.Loading = false;
                  $state.go('notes')
                });
              }, 1500);
          },
          error: function(xhr) {
            alert('Error');
          }
        });
      }
    })
});

app.controller('custprofileCtrl', function($scope){
  // chart data source
  $scope.dataSource = {
    "chart": {
      "caption": "Customer profile",
      "subCaption": "activities within the year",
      "captionFontSize": "30",
      "subcaptionFontSize": "14",
      "subcaptionFontBold": "0",
      "paletteColors": "#0075c2,#1aaf5d",
      "bgcolor": "#ffffff",
      "showBorder": "0",
      "showShadow": "0",
      "showCanvasBorder": "0",
      "usePlotGradientColor": "0",
      "legendBorderAlpha": "0",
      "legendShadow": "0",
      "showAxisLines": "0",
      "showAlternateHGridColor": "0",
      "divlineThickness": "1",
      "divLineIsDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "xAxisName": "Activity",
      "yAxisName": "Values",
      "showValues": "1",
      "theme": "fint",            
    },
    "data": [
      {
        "label": "Call attempts",
        "value": "42"
      },
      {
        "label": "RPC",
        "value": "42"
      },
      {
        "label": "PTP",
        "value": "42"
      },
    ]
  };

  $scope.dataSource1 = {
    "chart": {
            "caption": "Best time-to-contact",
            "subCaption": "2016",
            "numberPrefix": "$",
            "showBorder": "0",
            "use3DLighting": "0",
            "enableSmartLabels": "0",
            "startingAngle": "310",
            "showLabels": "0",
            "showPercentValues": "1",
            "showLegend": "1",
            "defaultCenterLabel": "Best time-to-contact",
            "centerLabel": "Time $label: $value",
            "centerLabelBold": "1",
            "showTooltip": "0",
            "decimals": "0",
            "useDataPlotColorForLabels": "1",
            "theme": "fint"
        },
        "data": [{
            "label": "Morning",
            "value": "285"
        }, {
            "label": "Mid morning",
            "value": "146"
        }, {
            "label": "Afternoon",
            "value": "105"
        }, {
            "label": "Evening",
            "value": "49"
        }]
  }

  $scope.dataSource2 = {
    "chart": {
            "caption": "Balance by product categories",
            "subCaption": "2016",
            "numberPrefix": "KES",
            "showPercentInTooltip": "0",
            "decimals": "1",
            "useDataPlotColorForLabels": "1",
            //Theme
            "theme": "fint"
        },
        "data": [{
            "label": "Mortgage",
            "value": "285040"
        }, {
            "label": "AssetFinance",
            "value": "146330"
        }, {
            "label": "Personal Loan",
            "value": "105070"
        }, {
            "label": "Overdraft",
            "value": "49100"
        }]
  }

  $scope.dataSource3 = {
    "chart": {
            "caption": "Account status indicator",
            "upperlimit": "-5",
            "lowerlimit": "-60",
            "captionPadding": "30",
            "showshadow": "0",
            "showvalue": "1",
            "useColorNameAsValue": "1",
            "placeValuesInside": "1",
            "valueFontSize": "16",
            //Tooltext
            "plottooltext": "<span id='headerdiv' style='font-family:\"Arial\", \"Helvetica\";font-size: 13px;font-weight: bold;'>Current Risk:</span>{br}<div id='valueDiv' style=' color: #EEEEEE; text-align:center;font-size: 25px; padding: 10px;  margin-top:5px; font-family:\"Arial\", \"Helvetica\"; font-weight: bold;'>$value</div>",
            //Theme
            "theme": "fint"
        },
        "colorrange": {
            "color": [{
                "minvalue": "-60",
                "maxvalue": "-35",
                "label": "Mission control, <br> we have a situation!",
                "code": "#ff0000"
            }, {
                "minvalue": "-35",
                "maxvalue": "-25",
                "label": "Something is just  not right!",
                "code": "#ff9900"
            }, {
                "minvalue": "-25",
                "maxvalue": "-5",
                "label": "All well ahoy!",
                "code": "#00ff00"
            }]
        },

        "value": "-45"
  }

})//end custprofileCtrl

